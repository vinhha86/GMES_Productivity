Ext.define('GSmartApp.view.personel.ShiftAddViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ShiftAddViewController',
    init: function (view) {
        var viewmodel= view.getViewModel();
        var TimesheetShiftTypeStore = viewmodel.getStore('TimesheetShiftTypeStore');
        TimesheetShiftTypeStore.loadStore();
    },
    control: {
        '#exit': {
            click: 'onClick'
        },
        '#Luu': {
            click: 'onLuu'
        },
    },
    onClick: function (m, e, eOpts) {
        this.getView().up('window').close();
    },
    onLuu:function(){
        var form = this.getView();
        var viewmodel = this.getViewModel();
        var timesheet_absence_type_id_link= viewmodel.get('Shift.id');
        var selected =viewmodel.get('select');
       
        var data = [];
        for(var i = 0; i< selected.length ; i++){
            data.push(selected[i].data.code)
        }
        var params = new Object();
        params.data = data;
        params.timesheet_absence_type_id_link =timesheet_absence_type_id_link;

        GSmartApp.Ajax.post('/api/v1/personnel/addshift_personnel', Ext.JSON.encode(params),
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
                        form.fireEvent('Thanhcong');
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
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