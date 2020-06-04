Ext.define('GSmartApp.view.pcontract.PContractInfoViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractInfoViewCotroller',
    init: function () {
        var me = this.getView();

        if (this.getView().IdPContract == 0) {
            this.getView().getForm().reset();
        }

        me.down('#contractcode').focus();
    },
    loadInfo: function (id) {
        var me = this.getView();
        if (id == 0) {
            me.getForm().reset();
            return;
        }

        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/pcontract/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewModel.set('PContract', response.data);
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: [{
                            itemId: 'cancel',
                            text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                        }]
                    });
                }
            })
    }
})