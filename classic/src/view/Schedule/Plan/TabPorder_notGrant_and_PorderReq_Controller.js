Ext.define('GSmartApp.view.Schedule.Plan.TabPorder_notGrant_and_PorderReq_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TabPorder_notGrant_and_PorderReq_Controller',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        var store_req = viewmodel.getStore('Porder_Req_Store');
        var Porder_Req_Granted_Store = viewmodel.getStore('Porder_Req_Granted_Store');
        store.getSorters().add('productiondate');
        store_req.getSorters().add('po_Productiondate');
        Porder_Req_Granted_Store.getSorters().add('po_Productiondate');
    },
    control : {
        'TabPorder_notGrant_and_PorderReq' : {
            'tabchange' : 'onTabChange'
        }
    },
    onTabChange: function(tabPanel, newCard, oldCard, eOpts){
        console.log(newCard);
    },
    onSearchTap: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        var golive_from = viewmodel.get('schedule.startDate');
        var golive_to = viewmodel.get('schedule.endDate');
        store.loadFree_bygolivedate(golive_from, golive_to);
    },
    onSearchPorderReq: function () {
        var viewmodel = this.getViewModel();
        var store_req = viewmodel.getStore('Porder_Req_Store');
        store_req.load_byOrg();
    },
    onPOrderFilterKeyup: function () {
        var grid = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('porderFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.porderFilter = filters.add({
                id: 'porderFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter) {
            filters.remove(this.porderFilter);
            this.porderFilter = null;
        }
    },
    onUnGrantedPoBuyerFilterKeyup: function () {
        var grid = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('unGrantedPoBuyerFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.poBuyerFilterUnGranted = filters.add({
                id: 'ungrantedPoBuyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.poBuyerFilterUnGranted) {
            filters.remove(this.poBuyerFilterUnGranted);
            this.poBuyerFilterUnGranted = null;
        }
    },
    onUnGrantedBuyerCodeFilterKeyup: function () {
        var grid = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('unGrantedBuyerCodeFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.codeFilterUnGranted = filters.add({
                id: 'ungrantedBuyerCodeFilter',
                property: 'buyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilterUnGranted) {
            filters.remove(this.codeFilterUnGranted);
            this.codeFilterUnGranted = null;
        }
    },
    onCodeFilterKeyup: function () {
        var grid = Ext.getCmp('Porder_Req');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('codeFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'product_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onPoBuyerFilterKeyup: function () {
        var grid = Ext.getCmp('Porder_Req');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('poBuyerFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.pobuyerFilter = filters.add({
                id: 'pobuyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.pobuyerFilter) {
            filters.remove(this.pobuyerFilter);
            this.pobuyerFilter = null;
        }
    },
    onHiddenList: function () {
        var filter = Ext.getCmp('FilterBar').getController();
        filter.onGrantToOrgTap();
    },
    onHiddenListReq: function () {
        var filter = Ext.getCmp('FilterBar').getController();
        filter.onGrantToOrgTap();
    },

    // tab Yêu cầu đã xếp
    onSearchPorderReqGranted: function () {
        var viewmodel = this.getViewModel();
        var Porder_Req_Granted_Store = viewmodel.getStore('Porder_Req_Granted_Store');
        Porder_Req_Granted_Store.load_reqGranted();
    },
    onDeleteReqGranted: function (btn, e, eOpts) {
        // console.log(btn);
        var msgConfirm = "";
        var isDeleteReq = false;
        if(btn.itemId == 'btnDeleteReqAndReqGranted'){
            isDeleteReq = true;
            msgConfirm = "Bạn có chắc chắn muốn xóa các Yêu cầu xếp kế hoạch được chọn?"
        }
        if(btn.itemId == 'btnDeleteReqGranted'){
            isDeleteReq = false;
            msgConfirm = "Bạn có chắc chắn muốn xóa lệnh ướm thử trên biểu đồ của các Yêu cầu xếp kế hoạch được chọn?"
        }
        var m = Ext.getCmp('Porder_Req_Granted');
        var me = this;
        var data = [];
        var select = m.getSelectionModel().getSelection();
        if(select.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn phải chọn ít nhất một yêu cầu",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        for (var i = 0; i < select.length; i++) {
            data.push({'id': select[i].data.id});
        }
        Ext.Msg.show({
            title: 'Thông báo',
            msg: msgConfirm,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.deleteReqGranted(data, isDeleteReq);
                }
            }
        });
    },
    deleteReqGranted: function (data, isDeleteReq) {
        var m = this;
        var me = Ext.getCmp('Porder_Req_Granted');
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.data = data;
        params.isDeleteReq = isDeleteReq;

        GSmartApp.Ajax.post('/api/v1/porder_req/deleteReqGranted', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    m.onSearchPorderReq();
                    m.onSearchPorderReqGranted();
                    var panel = Ext.getCmp('FilterBar').getController();
                    panel.onSearch();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onCodeReqGrantedFilterKeyup: function () {
        var grid = Ext.getCmp('Porder_Req_Granted');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Granted_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('codeReqGrantedFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.codeReqGrantedFilter = filters.add({
                id: 'codeReqGrantedFilter',
                property: 'product_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeReqGrantedFilter) {
            filters.remove(this.codeReqGrantedFilter);
            this.codeReqGrantedFilter = null;
        }
    },
    onPoBuyerReqGrantedFilterKeyup: function () {
        var grid = Ext.getCmp('Porder_Req_Granted');
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Granted_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('poBuyerReqGrantedFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.poBuyerReqGrantedFilter = filters.add({
                id: 'poBuyerReqGrantedFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.poBuyerReqGrantedFilter) {
            filters.remove(this.poBuyerReqGrantedFilter);
            this.poBuyerReqGrantedFilter = null;
        }
    },
    //
    onUnGrantedBuyernameFilterKeyup: function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('unGrantedBuyernameFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.unGrantedBuyernameFilter = filters.add({
                id: 'unGrantedBuyernameFilter',
                property: 'buyername',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.unGrantedBuyernameFilter) {
            filters.remove(this.unGrantedBuyernameFilter);
            this.unGrantedBuyernameFilter = null;
        }
    },
    onUnGrantedVendornameFilterKeyup: function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderUnGranted');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('unGrantedVendornameFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.unGrantedVendornameFilter = filters.add({
                id: 'unGrantedVendornameFilter',
                property: 'vendorname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.unGrantedVendornameFilter) {
            filters.remove(this.unGrantedVendornameFilter);
            this.unGrantedVendornameFilter = null;
        }
    },
    onUnGrantedReqBuyernameFilterKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('unGrantedReqBuyernameFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.unGrantedReqBuyernameFilter = filters.add({
                id: 'unGrantedReqBuyernameFilter',
                property: 'buyername',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.unGrantedReqBuyernameFilter) {
            filters.remove(this.unGrantedReqBuyernameFilter);
            this.unGrantedReqBuyernameFilter = null;
        }
    },
    onUnGrantedReqVendornameFilterKeyup: function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('unGrantedReqVendornameFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.unGrantedReqVendornameFilter = filters.add({
                id: 'unGrantedReqVendornameFilter',
                property: 'vendorname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.unGrantedReqVendornameFilter) {
            filters.remove(this.unGrantedReqVendornameFilter);
            this.unGrantedReqVendornameFilter = null;
        }
    },
    onGrantedReqBuyernameFilterKeyup: function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Granted_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('grantedReqBuyernameFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.grantedReqBuyernameFilter = filters.add({
                id: 'grantedReqBuyernameFilter',
                property: 'buyername',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.grantedReqBuyernameFilter) {
            filters.remove(this.grantedReqBuyernameFilter);
            this.grantedReqBuyernameFilter = null;
        }
    },
    onGrantedReqVendornameFilterKeyup: function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Req_Granted_Store');
        // Access the field using its "reference" property name.
        filterField = this.lookupReference('grantedReqVendornameFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.grantedReqVendornameFilter = filters.add({
                id: 'grantedReqVendornameFilter',
                property: 'vendorname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.grantedReqVendornameFilter) {
            filters.remove(this.grantedReqVendornameFilter);
            this.grantedReqVendornameFilter = null;
        }
    },
    onMenuPorderReqList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        console.log(record);
        var menu_grid = new Ext.menu.Menu({
            items: [
            {
                text: 'Sản phẩm',
                itemId: 'PorderReqList_ProductInfo',
                iconCls: 'x-fa fa-shopping-bag',
                handler: function () {
                    var window = Ext.create('GSmartApp.view.PContract.PContract_General_InfoView', {
                        IdPContract: record.data.pcontractid_link,
                        IdProduct: record.data.productid_link,
                        viewModel: {
                            data: {
                                IdPContract: record.data.pcontractid_link,
                                IdProduct: record.data.productid_link,
                                isWindow: true
                            }
                        }
                    });
                    window.show();
                    // console.log(eventRecord);
                }
            },
            {
                text: 'Đơn hàng (PO)',
                itemId: 'PorderReqList_EditPO',
                iconCls: 'x-fa fa-cart-plus',
                handler: function () {
                    var form = Ext.create('Ext.window.Window', {
                        closable: false,
                        resizable: false,
                        modal: true,
                        border: false,
                        title: 'Thông tin PO',
                        closeAction: 'destroy',
                        height: 400,
                        width: 800,
                        bodyStyle: 'background-color: transparent',
                        layout: {
                            type: 'fit', // fit screen for window
                            padding: 5
                        },
                        items: [{
                            xtype: 'PContract_PO_Edit_Info_Main',
                            viewModel: {
                                type: 'PContract_PO_Edit_Info_Main_ViewModel',
                                data: {
                                    id: record.data.pcontract_poid_link,
                                    productid_link: record.data.productid_link,
                                    isedit: true,
                                    productpairid_link: record.data.productid_link,
                                    isHidden_req: false
                                }
                            }
                        }]
                    });
                    form.show();

                    form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
                        
                        form.close();
                    })

                    form.down('#PContract_PO_Edit_Info_Main').getController().on('LuuThanhCong', function () {
                        // console.log('ok');
                        var viewmodel = me.getViewModel();
                        var store_req = viewmodel.getStore('Porder_Req_Store');
                        if(store_req != null){
                            store_req.load();
                        }
                        // form.close();
                    })
                }
            }]
        })

          var position = [e.getX()-10, e.getY()-10];
          e.stopEvent();
          menu_grid.showAt(position);
          common.Check_Menu_Permission(menu_grid);
    },
})