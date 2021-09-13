Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsenceDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetAbsenceDetailController',
    init: function () {
        var viewModel = this.getViewModel();
        var id = viewModel.get('id');
        this.loadInfo(id);

        var ListOrgStore = viewModel.getStore('ListOrgStore');
        ListOrgStore.loadStore(13, null);
        var TimeSheetAbsenceTypeStore = viewModel.getStore('TimeSheetAbsenceTypeStore');
        TimeSheetAbsenceTypeStore.loadStore();

        // console.log(id);

        // test
        // var me = this.getView();
        // me.down('#timefrom').setValue('16:45');
        // me.down('#timeto').setValue('6:00');
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnConfirm': {
            click: 'onConfirm'
        },
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var TimeSheetAbsenceView = Ext.getCmp('TimeSheetAbsence');
        var TimeSheetAbsenceStore = TimeSheetAbsenceView.getViewModel().getStore('TimeSheetAbsenceStore');
        
        var id = viewModel.get('id');
        var personnelid_link = viewModel.get('personnelid_link');
        // var absencedate_from = viewModel.get('absencedate_from');
        // var absencedate_to = viewModel.get('absencedate_to');
        var absencedate_from = me.down('#absencedate_from').getValue();
        var absencedate_to = me.down('#absencedate_to').getValue();
        // var timefrom = viewModel.get('timefrom');
        // var timeto = viewModel.get('timeto');
        var timefrom = me.down('#timefrom').getValue();
        var timeto = me.down('#timeto').getValue();
        var absence_reason = viewModel.get('absence_reason');
        var absencetypeid_link = viewModel.get('absencetypeid_link');

        var params = new Object();
        params.id = id;
        params.personnelid_link = personnelid_link;
        params.absencedate_from = absencedate_from;
        params.absencedate_to = absencedate_to;
        params.timefrom = timefrom;
        params.timeto = timeto;
        params.absence_reason = absence_reason;
        params.absencetypeid_link = absencetypeid_link;

        console.log(params);
        GSmartApp.Ajax.post('/api/v1/timesheetabsence/save', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thành công',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    TimeSheetAbsenceStore.load();
                    m.onThoat();
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
    loadInfo: function (id){
        var me = this;
        if(id == 0 || id == null){
            //me.loadNew();
        }else{
            me.loadRecord(id);
        }
    },
    loadNew: function(){
        var viewModel = this.getViewModel();
        var m = this;
        m.setDefaultTime();
    },
    loadRecord: function(id){
        // console.log(id);
        var me = this.getView();
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/timesheetabsence/getOne', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    console.log(response);
                    // id: null,
                    // personnelid_link: null,
                    // absencedate_from: null,
                    // absencedate_to: null,
                    // absence_reason: null,
                    // absencetypeid_link: null,

                    // orgFactoryId: null, // hiển thị đơn vị
                    // orgProductionLineId: null, // hiẻn thị tổ
                    viewModel.set('personnelid_link', response.personnelid_link);
                    // viewModel.set('absencedate_from', response.absencedate_from);
                    // viewModel.set('absencedate_to', response.absencedate_to);
                    viewModel.set('absence_reason', response.absence_reason);
                    viewModel.set('absencetypeid_link', response.absencetypeid_link);
                    viewModel.set('orgFactoryId', response.orgFactoryId);
                    viewModel.set('orgProductionLineId', response.orgProductionLineId);
                    viewModel.set('isConfirm', response.isConfirm);

                    var ListProductionLineStore = viewModel.getStore('ListProductionLineStore');
                    ListProductionLineStore.getbyParent(response.orgFactoryId);

                    var Personnel_Store = viewModel.getStore('Personnel_Store');
                    Personnel_Store.loadStore_byOrg(response.orgProductionLineId, false, false);

                    var startDate = Ext.Date.parse(response.absencedate_from, 'c');
                    if (null == startDate) startDate = new Date(response.absencedate_from);
                    startDate = Ext.Date.format(startDate, 'd/m/Y');
                    viewModel.set('absencedate_from', startDate);

                    var endDate = Ext.Date.parse(response.absencedate_to, 'c');
                    if (null == endDate) endDate = new Date(response.absencedate_to);
                    endDate = Ext.Date.format(endDate, 'd/m/Y');
                    viewModel.set('absencedate_to', endDate);

                    me.down('#timefrom').setValue(response.timefrom);
                    me.down('#timeto').setValue(response.timeto);

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
    },
    onFactoryListChange: function(cbbox, newValue, oldValue, eOpts){
        // console.log(newValue);
        // load ds tổ
        var viewModel = this.getViewModel();
        var ListProductionLineStore = viewModel.getStore('ListProductionLineStore');
        ListProductionLineStore.getbyParent(newValue);
    },
    onProductionLineListChange: function(cbbox, newValue, oldValue, eOpts){
        // console.log(newValue);
        var viewModel = this.getViewModel();
        var Personnel_Store = viewModel.getStore('Personnel_Store');
        Personnel_Store.loadStore_byOrg(newValue, false, false);
    },
    onPersonnelCodeListChange: function(cbbox, newValue, oldValue, eOpts){
        // console.log(newValue);
        var me = this.getView();
        me.down('#personnelNameList').setValue(newValue);
    },
    onPersonnelNameListChange: function(cbbox, newValue, oldValue, eOpts){
        // console.log(newValue);
        var me = this.getView();
        me.down('#personnelCodeList').setValue(newValue);
    },
    // setDefaultTime: function(){
    //     var me = this.getView();
    //     GSmartApp.Ajax.post('/api/v1/timesheetshifttype/getShift1ForAbsence', Ext.JSON.encode(),
    //         function (success, response, options) {
    //             var response = Ext.decode(response.responseText);
    //             if (success) {
    //                 // console.log(response);
    //                 me.down('#timefrom').setValue(response.timeFrom);
    //                 me.down('#timeto').setValue(response.timeTo);
    //             }
    //         })
    // },
    onConfirm: function(){
        var me = this;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xác nhận ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Confirm();
                }
            }
        });
    },
    Confirm: function(){
        var viewModel = this.getViewModel();
        var id = viewModel.get('id');
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/timesheetabsence/confirm', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Xác nhận thành công',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    viewModel.set('isConfirm', true);
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Xác nhận thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})