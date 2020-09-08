Ext.define('GSmartApp.view.pcontract.PContractInfoViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractInfoViewCotroller',
    control: {
        '#orgbuyerid_link' : {
            select: 'onSelectBuyer'
        }
    },
    init: function () {
        var me = this.getView();

        if (this.getView().IdPContract == 0) {
            this.getView().getForm().reset();
        }

        me.down('#orgbuyerid_link').focus();
    },
    onSelectBuyer: function(combo, record) {
        var viewmodel  = this.getViewModel();
        viewmodel.set('PContract.contractcode', record.get('code'));

        var storeContractBuyer = viewmodel.get('ContractBuyerStore');
        storeContractBuyer.loadStore();
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
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})