Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_DetailWindowViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('is_poline_hidden', false);
        viewmodel.set('is_poline_sku_hidden', false);
        viewmodel.set('is_addremovesku_hidden', false);
        viewmodel.set('is_poline_skugranted_hidden', false);
        
        this.onLoadData();
    },
    control: {
        '#tabmain': {
            tabchange: 'onTabChange'
        },
        '#btnAddToGrantSku': {
            click: 'onBtnAddToGrantSku'
        },
        '#btnRemoveFromGrantSku': {
            click: 'onBtnRemoveFromGrantSku'
        },
        '#btnThoat' : {
            click: 'onThoat'
        }
    },
    onThoat: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var amount = viewmodel.get('amount');
        var porderinfo = viewmodel.get('porderinfo');

        me.fireEvent('Thoat',porderinfo, amount);
        // this.getView().close();
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var IdPOrder = viewmodel.get('IdPOrder');
        var IdGrant = viewmodel.get('IdGrant');

        if (newCard.xtype == "POrder_Tab_Info") {
            var infoView = me.down('#POrder_InfoView');
            infoView.getController().loadInfo(IdPOrder);

            var porderSKUStore = viewmodel.getStore('porderSKUStore');
            // porderSKUStore.load();
            porderSKUStore.removeAll();

            var storeGrantSKUTabInfo = viewmodel.getStore('POrder_ListGrantSKUStore');
            storeGrantSKUTabInfo.loadStore(IdGrant);
        }
        if (newCard.xtype == "POrder_Tab_Grant") {
            var listGrantView = me.down('#POrder_List_GrantView');
            listGrantView.getController().loadInfo(IdPOrder);

            var storeGrantSKU = viewmodel.getStore('POrder_ListGrantSKUStore');
            storeGrantSKU.removeAll();
        }
    },
    onLoadData: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        // var IdPOrder = viewmodel.get('IdPOrder');
        // var IdPContractPO = viewmodel.get('IdPContractPO');

        //Lay thong tin chung Porder_grant cho to chuyen
        var IdGrant = viewmodel.get('IdGrant');
        var infoView = me.down('#POrder_Grant_InfoView');
        infoView.getController().loadInfo(IdGrant);

        //Lay danh sach PO Line thuc te
        // var PContract_PO = viewmodel.getStore('PContract_PO');
        // PContract_PO.loadPOLine_Confirm(IdPContractPO);

        var storePOrder = viewmodel.getStore('porderSKUStore');
        storePOrder.loadByPorderID(viewmodel.get('porder.id'));

        //Lay danh sach SKU cua POrder_Grant
        var storeGrantSKUTabInfo = viewmodel.getStore('POrder_ListGrantSKUStore');
        storeGrantSKUTabInfo.loadStore(IdGrant);

        // var listGrantView = me.down('#POrder_List_GrantView');
        // listGrantView.getController().loadInfo(IdPOrder);

        this.setTitleGrantSKUViewTabInfo(IdGrant);
    },

    onBtnAddToGrantSku: function(){
        var me = this.getView();
        me.setLoading(true);
        var viewmodel = this.getViewModel();
        var IdPOrder = viewmodel.get('IdPOrder');
        var IdGrant = viewmodel.get('IdGrant');
        var IdPcontractPo = viewmodel.get('IdPcontractPo');

        var productSkuView = me.down('#POrder_ProductSKUView');

        var data = [];
        var select = productSkuView.getSelectionModel().getSelection();

        if(select.length == 0){
            me.setLoading(false);
            return;
        }
        // console.log(select);
        for (var i = 0; i < select.length; i++) {
            if(select[i].data.pquantity_ungranted < 1){
                continue;
            }
            data.push(select[i].data.id);
        }

        var params = new Object();
        params.idSkus = data;
        params.idGrant = IdGrant;
        params.idPOrder = IdPOrder;
        params.idPcontractPo = IdPcontractPo;

        GSmartApp.Ajax.post('/api/v1/porderlist/addskutogrant', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode == 200) {
                        viewmodel.getStore('porderSKUStore').load();
                        viewmodel.getStore('POrder_ListGrantSKUStore').load();
                        viewmodel.set('porderinfo', response.porderinfo);
                        viewmodel.set('amount', response.amount);

                        me.fireEvent('UpdatePorder',viewmodel.get('porderinfo'), viewmodel.get('amount'));
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
                //Lay thong tin chung Porder_grant cho to chuyen
                var IdGrant = viewmodel.get('IdGrant');
                var infoView = me.down('#POrder_Grant_InfoView');
                infoView.getController().loadInfo(IdGrant);
            })

    },
    onBtnRemoveFromGrantSku: function(){
        var me = this.getView();
        me.setLoading(true);
        var viewmodel = this.getViewModel();
        var IdPOrder = viewmodel.get('IdPOrder');
        var IdGrant = viewmodel.get('IdGrant');

        var GrantSKUView = me.down('#POrder_List_GrantSKUViewTabInfo');

        var data = [];
        var select = GrantSKUView.getSelectionModel().getSelection();

        if(select.length == 0){
            me.setLoading(false);
            return;
        }
        for (var i = 0; i < select.length; i++) {
            data.push(select[i].data.id);
        }

        var params = new Object();
        params.idSkus = data;
        params.idGrant = IdGrant;
        params.idPOrder = IdPOrder;

        GSmartApp.Ajax.post('/api/v1/porderlist/removeskufromgrant', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode == 200) {
                        viewmodel.getStore('porderSKUStore').load();
                        viewmodel.getStore('POrder_ListGrantSKUStore').load();
                        viewmodel.set('porderinfo', response.porderinfo);
                        viewmodel.set('amount', response.amount);

                        me.fireEvent('UpdatePorder',viewmodel.get('porderinfo'), viewmodel.get('amount'));
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Lưu thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xoá thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
                //Lay thong tin chung Porder_grant cho to chuyen
                var IdGrant = viewmodel.get('IdGrant');
                var infoView = me.down('#POrder_Grant_InfoView');
                infoView.getController().loadInfo(IdGrant);                
            })

    },
    setTitleGrantSKUViewTabInfo: function(idgrant){
        var viewModel = this.getViewModel();

        var params = new Object();
        var idPorderGrant = idgrant;

        params.idPorderGrant = idPorderGrant;

        GSmartApp.Ajax.post('/api/v1/porder_grant/findone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        viewModel.set('grantSKUViewTabInfoTitle', 'Chi tiết màu, cỡ - giao cho ' + res.data.granttoorgname);
                    }
                } 
            })
    }
})