Ext.define('GSmartApp.view.holiday.HolidayFormViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HolidayFormViewController',
    init: function () {
        let startField = this.lookupReference('startdate');
        let endField = this.lookupReference('enddate');
        startField.getPicker().monthYearFormat = 'm-Y';
        endField.getPicker().monthYearFormat = 'm-Y';
        // Ext.Date.monthNames = ['01', '02', '03', '04', '05','06', '07', '08', '09', '10','11', '12'];
        // startField.getPicker().monthNames = ['1', '2', '3', '4', '5','6', '7', '8', '9', '10','11', '12'];
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
        let me = this.getView();
        let params = new Object();
        params.startTime = startTime;
        params.endTime = endTime;
        params.comment = comment;

        params.msgtype = "HOLIDAY_CREATE";
        params.message = "Tạo ngày nghỉ lễ";

        GSmartApp.Ajax.post('/api/v1/holiday/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
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
        let startField = this.lookupReference('startdate');
        let endField = this.lookupReference('enddate');
        let commentField = this.lookupReference('comment');
        let startTime = startField.getValue().getTime();
        let endTime = endField.getValue().getTime();
        let comment = commentField.getValue();

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
            let m = this;
            let startDate = startField.getValue().getTime();
            let endDate = endField.getValue().getTime();
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