Ext.define('GSmartApp.view.holiday.HolidayFormViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HolidayFormViewController',
    init: function () {
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    Luu: function (startTime, endTime, comment) {
        var me = this.getView();
        var params = new Object();
        params.startTime = startTime;
        params.endTime = endTime;
        params.comment = comment;

        params.msgtype = "HOLIDAY_CREATE";
        params.message = "Tạo ngày nghỉ lễ";

        GSmartApp.Ajax.post('/api/v1/holiday/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        mainView = Ext.getCmp('HolidayView');
                        mainView.getStore().load();
                        mainView.getViewModel().getStore('HolidayYearStore').load();
                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onLuu: function () {
        var startField = this.lookupReference('startdate');
        var endField = this.lookupReference('enddate');
        var commentField = this.lookupReference('comment');
        var startTime = startField.getValue().getTime();
        var endTime = endField.getValue().getTime();
        var comment = commentField.getValue();

        if(startTime > endTime){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Lỗi: Ngày bắt đầu sau ngày kết thúc",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            var m = this;
            var startDate = startField.getValue().getTime();
            var endDate = endField.getValue().getTime();
            m.Luu(startDate, endDate, comment);
        }
    },
    onChange: function( datefield, newValue, oldValue, eOpts){
        let enddatefield = this.lookupReference('enddate');
        enddatefield.setDisabled(false);
        enddatefield.setMinValue(newValue);
        enddatefield.setValue(newValue);
    }
})