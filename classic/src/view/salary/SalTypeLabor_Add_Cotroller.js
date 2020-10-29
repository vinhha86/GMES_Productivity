Ext.define('GSmartApp.view.product.SalTypeLabor_Add_Cotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalTypeLabor_Add_Cotroller',
    init: function () {
        var me = this.getView();
        var store = this.getViewModel().getStore('LaborLevelStore');
        store.loadStore();
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onAccept'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onAccept: function () {
        var viewmodel = this.getViewModel();
        var myview = this.getView();
        var me = this;

        var params = new Object();
        params.orgid_link = viewmodel.get('orgid_link');
        params.saltypeid_link = viewmodel.get('saltypeid_link');

        var obj = [];
        var select = myview.getSelectionModel().getSelection();
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            obj.push(data.id);
        }

        params.listId = obj;

        GSmartApp.Ajax.post('/api/v1/salary/saltype_laborlevel_create', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    me.fireEvent('AcceptSuccess');
                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})