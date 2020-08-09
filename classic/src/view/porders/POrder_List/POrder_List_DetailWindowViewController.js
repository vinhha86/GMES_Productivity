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
        '#btnThoat' : {
            click: 'onThoat'
        }
    },
    onThoat: function(){
        this.getView().close();
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        let me = this.getView();
        let viewmodel = this.getViewModel();

        if (newCard.xtype == "POrder_Tab_Info") {
            let infoView = me.down('#POrder_InfoView');
            infoView.IdPOrder = me.IdPOrder;
            infoView.getController().loadInfo(me.IdPOrder);

            let productSkuView = me.down('#POrder_ProductSKUView');
            productSkuView.IdPOrder = me.IdPOrder;
            let porderSKUStore = viewmodel.getStore('porderSKUStore');
            porderSKUStore.loadByPorderIDandNotGrantId(me.IdPOrder, me.IdGrant);

            let storeGrantSKUTabInfo = viewmodel.getStore('POrder_ListGrantSKUStoreForWindow');
            storeGrantSKUTabInfo.loadStore(me.IdGrant);
        }
        if (newCard.xtype == "POrder_Tab_Grant") {
            let listGrantView = me.down('#POrder_List_GrantView');
            listGrantView.IdPOrder = me.IdPOrder;
            listGrantView.getController().loadInfo(me.IdPOrder);

            let storeGrantSKU = viewmodel.getStore('POrder_ListGrantSKUStore');
            storeGrantSKU.removeAll();
        }
    },
    onLoadData: function () {
        let me = this.getView();
        let viewmodel = this.getViewModel();

        let infoView = me.down('#POrder_InfoView');
        infoView.IdPOrder = me.IdPOrder;
        infoView.getController().loadInfo(me.IdPOrder);

        let productSkuView = me.down('#POrder_ProductSKUView');
        productSkuView.IdPOrder = me.IdPOrder;
        // productSkuView.getController().loadInfo(me.IdPOrder);
        let porderSKUStore = viewmodel.getStore('porderSKUStore');
        porderSKUStore.loadByPorderIDandNotGrantId(me.IdPOrder, me.IdGrant);
        productSkuView.setWidth('47%');

        let grantSKUViewTabInfo = me.down('#POrder_List_GrantSKUViewTabInfo');
        grantSKUViewTabInfo.IdPOrder = me.IdPOrder;
        grantSKUViewTabInfo.setHidden(false);
        let storeGrantSKUTabInfo = viewmodel.getStore('POrder_ListGrantSKUStoreForWindow');
        storeGrantSKUTabInfo.loadStore(me.IdGrant);

        let tabInfoArrow = me.down('#POrder_List_TabInfo_Arrow');
        tabInfoArrow.setHidden(false);

        let listGrantView = me.down('#POrder_List_GrantView');
        listGrantView.IdPOrder = me.IdPOrder;
        listGrantView.getController().loadInfo(me.IdPOrder);

        this.setTitleGrantSKUViewTabInfo(me.IdGrant);
    },

    onBtnAddToGrantSku: function(){
        let me = this.getView();
        let viewmodel = this.getViewModel();

        let productSkuView = me.down('#POrder_ProductSKUView');

        let data = [];
        let select = productSkuView.getSelectionModel().getSelection();

        if(select.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn ít nhất một SKU",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        // console.log(select);
        for (let i = 0; i < select.length; i++) {
            // data.push({'id': select[i].data.id});
            data.push(select[i].data.id);
        }

        let params = new Object();
        params.idSkus = data;
        params.idGrant = me.IdGrant;
        params.idPOrder = me.IdPOrder;

        GSmartApp.Ajax.post('/api/v1/porderlist/addskutogrant', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode == 200) {
                        viewmodel.getStore('porderSKUStore').loadByPorderIDandNotGrantId(me.IdPOrder, me.IdGrant);
                    viewmodel.getStore('POrder_ListGrantSKUStoreForWindow').load();
                    me.fireEvent('UpdatePorder',response.porderinfo, response.amount);
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
            })

    },
    setTitleGrantSKUViewTabInfo: function(idgrant){
        let viewModel = this.getViewModel();

        let params = new Object();
        let idPorderGrant = idgrant;

        params.idPorderGrant = idPorderGrant;

        // console.log(idgrant);
        // console.log(params);

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