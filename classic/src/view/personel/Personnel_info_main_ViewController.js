Ext.define('GSmartApp.view.personel.Personnel_info_main_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_info_main_ViewController',
    init: function () {

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onSave'
        }
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    },
    onSave: function () {
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var viewmodel = this.getViewModel();

        var params = new Object();
        params.data = viewmodel.get('personnel');

        GSmartApp.Ajax.post('/api/v1/personnel/create', Ext.JSON.encode(params),
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
                            },
                            fn: function () {
                                viewmodel.set('personnel.id', response.id);
                                viewmodel.set('personnel.bike_number', response.bike_number);
                            }
                        });
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function () {
                                var viewInfo = me.down('#Personnel_info');
                                viewInfo.down('#code').focus();
                            }
                        });

                    }

                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                        fn: function () {
                            var viewInfo = me.down('#Personnel_info');
                            viewInfo.down('#code').focus();
                        }
                    });
                }
                me.setLoading(false);
            })
    }
})