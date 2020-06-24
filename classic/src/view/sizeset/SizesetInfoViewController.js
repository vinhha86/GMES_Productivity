Ext.define('GSmartApp.view.sizeset.SizesetInfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SizesetInfoViewController',
    init: function () {
        var me = this.getView();
        if (this.getView().IdSizeset == 0) {
            this.getView().getForm().reset();
        }
    },
    loadInfo: function (id) {
        if (id == 0) {
            this.getView().getForm().reset();
            return;
        }

        var me = this.getView();
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/sizeset/getById', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewModel.set('sizeset', response.data);
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