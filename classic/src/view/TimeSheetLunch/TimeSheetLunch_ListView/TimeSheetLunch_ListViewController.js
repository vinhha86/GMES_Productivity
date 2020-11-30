Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_ListViewController',
    init: function () {
        var viewModel = this.getViewModel();
    },
    control: {
        '#btnConfirm' : {
            click: 'onConfirm'
        },
        '#btnUnconfirm' : {
            click: 'onUnconfirm'
        }
    },
    onEditCheckBox: function(editor, context, e){},
    onBeforecheckchange:function(column, rowIndex, checked, record, e, eOpts){},
    onCheckchange:function(column, rowIndex, checked, record, e, eOpts){
        // console.log(column);
        // console.log(record);
        var m = this;
        var viewModel = this.getViewModel();
        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');

        var dataIndex = column.dataIndex;

        // neu ngay la hom qua thi khong duoc edit
        var isToday = viewModel.get('isToday');
        if(!isToday) {
            TimeSheetLunchStore.rejectChanges();
            return;
        }

        // neu da xac nhan thi khong duoc edit
        if(record.get('status') == 1){
            TimeSheetLunchStore.rejectChanges();
            return;
        }

        // neu chua check ca thi khong check an
        if(dataIndex == 'lunchShift1' && record.get('workingShift1') == false){
            TimeSheetLunchStore.rejectChanges();
            return;
        }
        if(dataIndex == 'lunchShift2' && record.get('workingShift2') == false){
            TimeSheetLunchStore.rejectChanges();
            return;
        }
        if(dataIndex == 'lunchShift3' && record.get('workingShift3') == false){
            TimeSheetLunchStore.rejectChanges();
            return;
        }

        // neu check ca thi check an
        if(dataIndex == 'workingShift1'){
            record.set('lunchShift1', checked);
        }
        if(dataIndex == 'workingShift2'){
            record.set('lunchShift2', checked);
        }
        if(dataIndex == 'workingShift3'){
            record.set('lunchShift3', checked);
        }

        // neu check tu 2 ca tro len
        if(
            (dataIndex == 'workingShift1' || dataIndex == 'workingShift2' || dataIndex == 'workingShift3') 
            &&
            (
            (record.get('workingShift1') && record.get('workingShift2')) ||
            (record.get('workingShift2') && record.get('workingShift3')) ||
            (record.get('workingShift1') && record.get('workingShift3'))
            )
            && 
            checked
            ){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Nhân viên đã đi làm 1 ca, tiếp tục?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    buttonText: {
                        yes: 'Có',
                        no: 'Không'
                    },
                    fn: function (btn) {
                        if (btn === 'no') {
                            TimeSheetLunchStore.rejectChanges();
                            isOk = false;
                            return;
                        }else{
                            m.saveRecord(dataIndex, record.data);
                        }
                    }
                });
        }else{
            m.saveRecord(dataIndex, record.data);
        }
        // TimeSheetLunchStore.rejectChanges();
    },
    saveRecord: function(dataIndex, recData){
        // console.log(dataIndex);
        // console.log(recData);

        var viewModel = this.getViewModel();
        var me=this.getView();
        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');

        var params = new Object();
        var data = new Object();
        data.lunchShift1 = recData.lunchShift1;
        data.lunchShift2 = recData.lunchShift2;
        data.lunchShift3 = recData.lunchShift3;
        data.personnelCode = recData.personnelCode;
        data.personnelFullname = recData.personnelFullname;
        data.personnelid_link = recData.personnelid_link;
        data.workingShift1 = recData.workingShift1;
        data.workingShift2 = recData.workingShift2;
        data.workingShift3 = recData.workingShift3;
        data.workingdate = recData.workingdate;
        
        params.data = data;
        params.dataIndex = dataIndex;
        me.setLoading(true);
        GSmartApp.Ajax.post('/api/v1/timesheetlunch/save', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        TimeSheetLunchStore.commitChanges();
                    }
                    me.setLoading(false);
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    TimeSheetLunchStore.rejectChanges();
                    me.setLoading(false);
                }
        })
    },
    onConfirm: function(){
        var status = 1;
        this.updateStatus(status);
    },
    onUnconfirm: function(){
        var status = 0;
        this.updateStatus(status);
    },
    updateStatus: function(status){
        var viewModel = this.getViewModel();
        var me=this.getView();
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var workingdate = TimeSheetLunch_MainView.down('#txtdatefield').getValue();
        var orgid_link = viewModel.get('orgid_link');

        var params = new Object();
        params.orgid_link = orgid_link;
        params.workingdate = workingdate;
        params.status = status;

        GSmartApp.Ajax.post('/api/v1/timesheetlunch/updateStatus', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');
                        TimeSheetLunchStore.load();

                        // set hidden btnConfirm
                        if(status == 1){
                            viewModel.set('isBtnConfirmHidden', true);
                            viewModel.set('isBtnUnconfirmHidden', false);
                        }else{
                            viewModel.set('isBtnConfirmHidden', false);
                            viewModel.set('isBtnUnconfirmHidden', true);
                        }
                    }
                    me.setLoading(false);
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    me.setLoading(false);
                }
        })
    }
})