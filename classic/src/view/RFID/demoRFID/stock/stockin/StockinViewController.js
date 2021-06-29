Ext.define('GSmartApp.view.RFID.demoRFID..stock.stockin.StockinViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockinViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var deviceStore = viewmodel.getStore('device_store');
        deviceStore.loadStore();
    },
    control: {
        '#btnStart': {
            click: 'onStart'
        },
        '#btnStop': {
            click: 'onStop'
        }
    },
    onStart: function () {
        var viewmodel = this.getViewModel();
        var deviceid = viewmodel.get('deviceid');
        var id_invstore = viewmodel.get('id_invstore');

        if (deviceid == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn thiết bị",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else if (id_invstore == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn kho",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            viewmodel.set('isStart', true);
        }

    },
    onStop: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('isStart', false);
    }
})