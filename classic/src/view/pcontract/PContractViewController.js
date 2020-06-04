Ext.define('GSmartApp.view.pcontract.PContractViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractViewController',
    init: function () {
        this.onActivate();
        if (this.getView().IdPContract > 0){
           this.onLoadData(this.getView().IdPContract,null);
           dockBottomBar = this.lookupReference('dockBottomBar');
           dockBottomBar.setHidden(true);
        }
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#PContractView': {
            activate: 'onActivate'
        },
        '#tabmain': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        if (newCard.xtype == "PContractProduct_BomColor_MainView") {
            viewmodel.set('ishiddenActionColumn', true);
        }
        else {
            viewmodel.set('ishiddenActionColumn', false);
            if(newCard.xtype == 'PContract_PO_Main'){
                var storeproduct = viewmodel.getStore('PContractProductTreeStore');
                storeproduct.loadStore(viewmodel.get('PContract.id'));
            }
        }
    },
    onLoadData: function (id, type) {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        me.IdPContract = id;

        var infoView = me.down('#PContractInfoView');
        infoView.IdPContract = id;
        infoView.getController().loadInfo(me.IdPContract);

        var listProducView = me.down('#PContractListProductView');
        listProducView.IdPContract = id;

        var productpair = me.down('#PContractPairProductView');
        productpair.IdPcontract = id;

        var storepair = viewmodel.getStore('PContractProductPairStore');
        var store = viewmodel.getStore('PContractProductStore');
        if (id > 0) {
            store.loadStore(id);
            storepair.loadStore(id);
        }
        else {
            store.removeAll();
        }
    },
    onQuayLai: function () {
        this.redirectTo('lspcontract');
    },
    onActivate: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var KHStore = viewmodel.getStore('CustomerStore');
        var VenderStore = viewmodel.getStore('Vender');
        var EndBuyerStore = viewmodel.getStore('EndBuyer');
        var BranchStore = viewmodel.getStore('BranchStore');
        var SeasonStore = viewmodel.getStore('SeasonStore');

        KHStore.loadStore(10, false);
        VenderStore.loadStore(11, false);
        EndBuyerStore.loadStore(12, false);
        BranchStore.loadStore(false);
        SeasonStore.loadStore(false);
    },
    onLuu: function () {
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var t = this;
        var viewmodel = this.getViewModel();

        var params = new Object();
        var data = new Object();

        data = viewmodel.get('PContract');
        data.id = me.IdPContract;
        data.orgrootid_link = 0;
        data.status = 1;
        data.usercreatedid_link = 0;
        data.datecreated = '';

        params.data = data;
        params.msgtype = "PContract_CREATE";
        params.message = "Tạo đơn hàng";

        GSmartApp.Ajax.post('/api/v1/pcontract/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lưu thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        if (data.id == 0) {
                            t.redirectTo("lspcontract/" + response.id + "/edit");
                        }
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var viewInfo = me.down('#PContractInfoView');
                        viewInfo.down('#contractcode').focus();
                    }

                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    }     
})