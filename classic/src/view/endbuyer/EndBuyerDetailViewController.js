Ext.define('GSmartApp.view.endbuyer.EndBuyerDetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EndBuyerDetailViewController',
    Id: 0,
    init: function () {
        var me = this.getView();
        var viewmodel = me.getViewModel();
        var storeColor = viewmodel.getStore('ColorStore');
        storeColor.loadStore();
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
        }
    },
    onLuu: function () {
        var viewMain = Ext.getCmp('EndBuyerView');

        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = this.Id;
        data.orgtypeid_link = 12;
        data.status = 1;

        params.data = data;
        params.msgtype = "END_BUYER_CREATE";
        params.message = "Tạo end buyer";

        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            // buttons: [{
                            //     itemId: 'cancel',
                            //     text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                            // }]
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        if (data.id == 0) {
                            if(viewMain)
                            viewMain.getStore().load();
                        }
                        me.Id = response.id;
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            // buttons: [{
                            //     itemId: 'cancel',
                            //     text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                            // }]
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        me.down('#code').focus();
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: null,
                        // buttons: [{
                        //     itemId: 'cancel',
                        //     text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                        // }]
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onQuayLai: function () {
        var me = this.getView();
        //me.getForm().reset();
        this.redirectTo('lsendbuyer');
    },
    onLoadData: function (id, type) {
        var me = this;
        var viewMain = Ext.getCmp('EndBuyerView');
        var viewmodel = me.getViewModel();
        viewmodel.set('id', id);
        if (id == 0) {
            viewmodel.set('currentRec', null);
            me.getView().getForm().reset();
        }
        else {
            if(viewMain){
                var data = viewMain.getStore().getById(id).data;
                viewmodel.set('currentRec', data);
                viewmodel.set('name', data.name);
            }
            else{
                me.loadInfo(id, viewmodel);
            }
        }

        me.Id = id;
    },
    loadInfo: function(id, viewmodel ){
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/org/getOrgById', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;
                    viewmodel.set('currentRec', data);
                    viewmodel.set('name', data.name);
                }
            })
    }
})