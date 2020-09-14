Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_DetailWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_DetailWindowViewController',
    init: function () {
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
        let me = this.getView();
        let viewmodel = this.getViewModel();
        let IdPOrder = viewmodel.get('IdPOrder');
        let IdGrant = viewmodel.get('IdGrant');

        if (newCard.xtype == "POrder_Tab_Info") {
            let infoView = me.down('#POrder_InfoView');
            infoView.getController().loadInfo(IdPOrder);

            let productSkuView = me.down('#POrder_ProductSKUView');
            let porderSKUStore = viewmodel.getStore('porderSKUStore');
            porderSKUStore.loadByPorderID(IdPOrder,IdGrant);

            let storeGrantSKUTabInfo = viewmodel.getStore('POrder_ListGrantSKUStoreForWindow');
            storeGrantSKUTabInfo.loadStore(IdGrant);
        }
        if (newCard.xtype == "POrder_Tab_Grant") {
            let listGrantView = me.down('#POrder_List_GrantView');
            listGrantView.getController().loadInfo(IdPOrder);

            let storeGrantSKU = viewmodel.getStore('POrder_ListGrantSKUStore');
            storeGrantSKU.removeAll();
        }
    },
    onLoadData: function () {
        let me = this.getView();
        let viewmodel = this.getViewModel();
        let IdPOrder = viewmodel.get('IdPOrder');
        let IdGrant = viewmodel.get('IdGrant');

        let infoView = me.down('#POrder_InfoView');
        infoView.getController().loadInfo(IdPOrder);

        let productSkuView = me.down('#POrder_ProductSKUView');
        let porderSKUStore = viewmodel.getStore('porderSKUStore');
        porderSKUStore.loadByPorderID(IdPOrder, IdGrant);
        productSkuView.setWidth('47%');

        let grantSKUViewTabInfo = me.down('#POrder_List_GrantSKUViewTabInfo');
        grantSKUViewTabInfo.setHidden(false);
        let storeGrantSKUTabInfo = viewmodel.getStore('POrder_ListGrantSKUStoreForWindow');
        storeGrantSKUTabInfo.loadStore(IdGrant);

        let tabInfoArrow = me.down('#POrder_List_TabInfo_Arrow');
        tabInfoArrow.setHidden(false);

        let listGrantView = me.down('#POrder_List_GrantView');
        listGrantView.getController().loadInfo(IdPOrder);

        this.setTitleGrantSKUViewTabInfo(IdGrant);
    },

    onBtnAddToGrantSku: function(){
        let me = this.getView();
        me.setLoading(true);
        let viewmodel = this.getViewModel();
        let IdPOrder = viewmodel.get('IdPOrder');
        let IdGrant = viewmodel.get('IdGrant');

        let productSkuView = me.down('#POrder_ProductSKUView');

        let data = [];
        let select = productSkuView.getSelectionModel().getSelection();

        if(select.length == 0){
            me.setLoading(false);
            return;
        }
        // console.log(select);
        for (let i = 0; i < select.length; i++) {
            if(select[i].data.remainQuantity < 1){
                continue;
            }
            data.push(select[i].data.id);
        }

        let params = new Object();
        params.idSkus = data;
        params.idGrant = IdGrant;
        params.idPOrder = IdPOrder;

        GSmartApp.Ajax.post('/api/v1/porderlist/addskutogrant', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode == 200) {
                        viewmodel.getStore('porderSKUStore').load();
                        viewmodel.getStore('POrder_ListGrantSKUStoreForWindow').load();
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
            })

    },
    onBtnRemoveFromGrantSku: function(){
        let me = this.getView();
        me.setLoading(true);
        let viewmodel = this.getViewModel();
        let IdPOrder = viewmodel.get('IdPOrder');
        let IdGrant = viewmodel.get('IdGrant');

        let GrantSKUView = me.down('#POrder_List_GrantSKUViewTabInfo');

        let data = [];
        let select = GrantSKUView.getSelectionModel().getSelection();

        if(select.length == 0){
            me.setLoading(false);
            return;
        }
        for (let i = 0; i < select.length; i++) {
            data.push(select[i].data.id);
        }

        let params = new Object();
        params.idSkus = data;
        params.idGrant = IdGrant;
        params.idPOrder = IdPOrder;

        GSmartApp.Ajax.post('/api/v1/porderlist/removeskufromgrant', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode == 200) {
                        viewmodel.getStore('porderSKUStore').load();
                        viewmodel.getStore('POrder_ListGrantSKUStoreForWindow').load();
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
            })

    },
    setTitleGrantSKUViewTabInfo: function(idgrant){
        let viewModel = this.getViewModel();

        let params = new Object();
        let idPorderGrant = idgrant;

        params.idPorderGrant = idPorderGrant;

        GSmartApp.Ajax.post('/api/v1/porder_grant/findone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        viewModel.set('grantSKUViewTabInfoTitle', 'Chi tiết màu, cỡ - ' + res.data.granttoorgname);
                    }
                } 
            })
    }
})