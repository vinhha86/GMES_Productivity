Ext.define('GSmartApp.view.DashboardMer.DashboardMer_Balance.DashboardMer_BalanceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DashboardMer_BalanceViewController',
    init: function () {

    },
    control: {
        '#DashboardMer_BalanceView': {
            afterrender: 'onAfterrender'
        },
        '#btnNhapMuaMoiNguyenLieu': {
            click: 'onBtnNhapMuaMoiNguyenLieu'
        },
        '#btnNhapMuaMoiPhuLieu': {
            click: 'onBtnNhapMuaMoiPhuLieu'
        },
    },
    listen: {
        controller: {
            'Dashboard_Mer_ViewController': {
                'dashboard_search': 'on_dashboard_search'
            },
            'BarChartProductShipDateViewController': {
                'dashboard_selectBarChartProduct': 'on_selectBarChartProduct'
            },
            'Dashboard_KhoTP_POLine_Controller': {
                'dashboard_select_poline': 'on_dashboard_select_poline'
            }
        }
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        SKUBalanceStore.setGroupField('mat_sku_product_typename');
    },
    on_dashboard_search: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        SKUBalanceStore.removeAll();
        me.setDisabled(true);
    },
    on_selectBarChartProduct: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        SKUBalanceStore.removeAll();
        me.setDisabled(true);
    },
    on_dashboard_select_poline: function(record){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        me.setDisabled(false);
        
        // set poline đã chọn vào viewModel
        viewModel.set('selectedPoline', record);

        var productid_link = record.get('productid_link');
        var pcontractid_link = record.get('pcontractid_link');
        var pcontract_poid_link = record.get('id');
        var ls_po = '';
        var list_productid = '';
        list_productid += productid_link + ';';
        ls_po += pcontract_poid_link;

        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.list_productid = list_productid;
        params.ls_po = ls_po;
        params.materialid_link = null;
        params.pcontract_poid_link = null;

        me.setLoading(true);
        GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bycontract', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        SKUBalanceStore.setData(response.data);
                    }
                }
            })
    },
    onBtnNhapMuaMoiNguyenLieu: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var selectedPoline = viewModel.get('selectedPoline');
        var pcontractid_link = selectedPoline.get('pcontractid_link');
        var pcontract_poid_link = selectedPoline.get('id');
        var productid_link = selectedPoline.get('productid_link');
        var product_typeid_link = selectedPoline.get('product_typeid_link');
        // console.log(selectedPoline);
        // return;

        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        var storeData = SKUBalanceStore.getDataSource().items;
        var skuNplIdList = new Array();
        for(var i=0;i<storeData.length;i++){
            var mat_skuid_link = storeData[i].get('mat_skuid_link');
            skuNplIdList.push(mat_skuid_link);
        }

        // console.log(storeData);
        // return;

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu nhập kho nguyên liệu',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockin_M_Edit',
                viewModel: {
                    data: {
                        isNewStockin: true,
                        isAdd_DashboardMer_Stockin: true,
                        pcontractid_link: pcontractid_link,
                        pcontract_poid_link: pcontract_poid_link,
                        skuNplIdList: skuNplIdList,
                        productid_link: productid_link,
                        product_typeid_link: product_typeid_link,
                        stockintypeid_link: 1,
                    }
                }
            }]
        });            
        form.show();

        // bắt event load lại store, LuuPhieuNhapThanhCong
        if(form.down('#Stockin_M_Edit')){
            form.down('#Stockin_M_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                console.log('LuuPhieuNhapThanhCong nguyên liệu');
            });
        }
        if(form.down('#Stockin_SubM_Edit')){
            form.down('#Stockin_SubM_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                console.log('LuuPhieuNhapThanhCong phụ liệu');
            });
        }  
    },
    onBtnNhapMuaMoiPhuLieu: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var selectedPoline = viewModel.get('selectedPoline');
        var pcontractid_link = selectedPoline.get('pcontractid_link');
        var pcontract_poid_link = selectedPoline.get('id');
        var productid_link = selectedPoline.get('productid_link');
        var product_typeid_link = selectedPoline.get('product_typeid_link');
        // console.log(selectedPoline);
        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');
        var storeData = SKUBalanceStore.getDataSource().items;
        var skuNplIdList = new Array();
        for(var i=0;i<storeData.length;i++){
            var mat_skuid_link = storeData[i].get('mat_skuid_link');
            skuNplIdList.push(mat_skuid_link);
        }

        // console.log(storeData);
        // return;

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Phiếu nhập kho phụ liệu',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockin_SubM_Edit',
                viewModel: {
                    data: {
                        isNewStockin: true,
                        isAdd_DashboardMer_Stockin: true,
                        pcontractid_link: pcontractid_link,
                        pcontract_poid_link: pcontract_poid_link,
                        skuNplIdList: skuNplIdList,
                        productid_link: productid_link,
                        product_typeid_link: product_typeid_link,
                        stockintypeid_link: 11,
                    }
                }
            }]
        });            
        form.show();

        // bắt event load lại store, LuuPhieuNhapThanhCong
        if(form.down('#Stockin_M_Edit')){
            form.down('#Stockin_M_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                console.log('LuuPhieuNhapThanhCong nguyên liệu');
            });
        }
        if(form.down('#Stockin_SubM_Edit')){
            form.down('#Stockin_SubM_Edit').getController().on('LuuPhieuNhapThanhCong', function () {
                console.log('LuuPhieuNhapThanhCong phụ liệu');
            });
        }  
    },

    onFilterMaNPLKeyup: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.get('SKUBalanceStore');
        var filterField = this.lookupReference('filterMaNPL');
        var filters = store.getFilters();

        if (filterField.value) {
            this.filterMaNPL = filters.add({
                id: 'filterMaSP',
                property: 'mat_sku_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.filterMaNPL) {
            filters.remove(this.filterMaNPL);
            this.filterMaNPL = null;
        }
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
});
