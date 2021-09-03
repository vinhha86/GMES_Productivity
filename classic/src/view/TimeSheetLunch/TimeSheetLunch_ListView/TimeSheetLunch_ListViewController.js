Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_ListViewController',
    init: function () {
        var viewModel = this.getViewModel();
    },
    control: {
        '#btnConfirm': {
            click: 'onConfirm'
        },
        '#btnUnconfirm': {
            click: 'onUnconfirm'
        }
    },
    CreateColumns:function(data){
       
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 4;
        //xóa cột sinh động
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
     //   var listid = [];
        var params = new Object();
        params.orgid_link = data;
        GSmartApp.Ajax.post('/api/v1/timesheetshifttypeorg/getbyorgid_link', Ext.JSON.encode(params),
        function (success, response, options) {
            grid.setLoading(false);
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                  
                    for (var i = 0; i < response.data.length; i++){
                        var data = response.data[i];
                        listtitle.push(data.name.trim());

                    }

                    for (var i = 0; i < listtitle.length; i++) {
                        if ("" + listtitle[i] == "") continue;

                        var column = Ext.create('Ext.grid.column.Column', {
                            text: listtitle[i],
                            columns: [ {
                                xtype: 'checkcolumn',
                                text: 'Đi làm',
                                dataIndex: 'workingShift1',
                                headerCheckbox: true,
                                flex: 1,
                                // width: 75,
                                listeners: {
                                    beforecheckchange: 'onBeforecheckchange',
                                    checkchange: 'onCheckchange',
                                    headerclick: 'onHeaderClick'
                                }
                            },
                            {
                                xtype: 'checkcolumn',
                                text: 'Ăn',
                                dataIndex: 'lunchShift1',
                                // headerCheckbox: true,
                                flex: 1,
                                // width: 50,
                                listeners: {
                                    beforecheckchange: 'onBeforecheckchange',
                                    checkchange: 'onCheckchange',
                                    // headerclick: 'onHeaderClick'
                                }
                            }]
                        })
                        grid.headerCt.insert(length, column);
                        length++;
                    }
                }
            } 
        })


    },
    onEditCheckBox: function (editor, context, e) { },
    onBeforecheckchange: function (column, rowIndex, checked, record, e, eOpts) { },
    onHeaderClick: function (grid, column, e, t, eOpts) {
        var m = this;
        var viewModel = this.getViewModel();

        var checked = column.allChecked;
        var dataIndex = column.dataIndex;

        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');
        TimeSheetLunchStore.rejectChanges();

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn chọn tất cả nhân viên ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    m.onHeaderClickConfirm(column, checked, dataIndex);
                }
            }
        });
    },
    onHeaderClickConfirm: function (column, checked, dataIndex) {
        var m = this;
        var viewModel = this.getViewModel();

        console.log('Header:' + checked);

        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');
        // TimeSheetLunchStore.rejectChanges();

        // store empty
        if (TimeSheetLunchStore.getData().items.length == 0) {
            return;
        }
        // neu ngay la hom qua thi khong duoc edit
        // var isToday = viewModel.get('isToday');
        // if(!isToday) {
        //     return;
        // }
        // neu da xac nhan thi khong duoc edit
        var status = TimeSheetLunchStore.getData().items[0].data.status;
        if (status == 1) {
            return;
        }

        // checked workingShift
        if (dataIndex == 'workingShift1' || dataIndex == 'workingShift2' || dataIndex == 'workingShift3') {
            var lunchShift = '';
            switch (dataIndex) {
                case 'workingShift1':
                    lunchShift = 'lunchShift1';
                    break;
                case 'workingShift2':
                    lunchShift = 'lunchShift2';
                    break;
                case 'workingShift3':
                    lunchShift = 'lunchShift3';
                    break;
            }
            TimeSheetLunchStore.each(function (rec) {
                // console.log(rec);
                rec.set(dataIndex, checked);
                rec.set(lunchShift, checked);
            });
        }

        // checked lunchShift
        // if(dataIndex == 'lunchShift1' || dataIndex == 'lunchShift2' || dataIndex == 'lunchShift3'){
        //     var workingShift = '';
        //     switch(dataIndex){
        //         case 'lunchShift1':
        //             workingShift = 'workingShift1';
        //             break;
        //         case 'lunchShift2':
        //             workingShift = 'workingShift2';
        //             break;
        //         case 'lunchShift3':
        //             workingShift = 'workingShift3';
        //             break;
        //     }
        //     TimeSheetLunchStore.each(function(rec){
        //         // console.log(rec);
        //         // chi edit lunch khi working == true
        //         if(rec.get(workingShift)){
        //             rec.set(dataIndex, checked);
        //             // rec.set(workingShift, checked);
        //         }
        //     });
        // }

        var data = new Array();
        TimeSheetLunchStore.each(function (rec) {
            var recData = rec.data;
            var obj = new Object();
            obj.lunchShift1 = recData.lunchShift1;
            obj.lunchShift2 = recData.lunchShift2;
            obj.lunchShift3 = recData.lunchShift3;
            obj.personnelCode = recData.personnelCode;
            obj.personnelFullname = recData.personnelFullname;
            obj.personnelid_link = recData.personnelid_link;
            obj.workingShift1 = recData.workingShift1;
            obj.workingShift2 = recData.workingShift2;
            obj.workingShift3 = recData.workingShift3;
            obj.workingdate = recData.workingdate;
            obj.dataIndex = dataIndex;
            data.push(obj);
        });
        m.saveRecord(data);
    },
    onCheckchange: function (column, rowIndex, checked, record, e, eOpts) {
        // console.log(column);
        // console.log(record);
        var m = this;
        var viewModel = this.getViewModel();
        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');

        var dataIndex = column.dataIndex;

        // neu ngay la hom qua thi khong duoc edit
        // var isToday = viewModel.get('isToday');
        // if(!isToday) {
        //     TimeSheetLunchStore.rejectChanges();
        //     return;
        // }

        // neu da xac nhan thi khong duoc edit
        if (record.get('status') == 1) {
            TimeSheetLunchStore.rejectChanges();
            return;
        }

        // neu chua check ca thi khong check an
        if (dataIndex == 'lunchShift1' && record.get('workingShift1') == false) {
            TimeSheetLunchStore.rejectChanges();
            return;
        }
        if (dataIndex == 'lunchShift2' && record.get('workingShift2') == false) {
            TimeSheetLunchStore.rejectChanges();
            return;
        }
        if (dataIndex == 'lunchShift3' && record.get('workingShift3') == false) {
            TimeSheetLunchStore.rejectChanges();
            return;
        }

        // neu check ca thi check an
        if (dataIndex == 'workingShift1') {
            record.set('lunchShift1', checked);
        }
        if (dataIndex == 'workingShift2') {
            record.set('lunchShift2', checked);
        }
        if (dataIndex == 'workingShift3') {
            record.set('lunchShift3', checked);
        }

        // neu check tu 2 ca tro len
        if (
            (dataIndex == 'workingShift1' || dataIndex == 'workingShift2' || dataIndex == 'workingShift3')
            &&
            (
                (record.get('workingShift1') && record.get('workingShift2')) ||
                (record.get('workingShift2') && record.get('workingShift3')) ||
                (record.get('workingShift1') && record.get('workingShift3'))
            )
            &&
            checked
        ) {
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
                    } else {
                        var recData = record.data;
                        var data = new Array();
                        var obj = new Object();
                        obj.lunchShift1 = recData.lunchShift1;
                        obj.lunchShift2 = recData.lunchShift2;
                        obj.lunchShift3 = recData.lunchShift3;
                        obj.personnelCode = recData.personnelCode;
                        obj.personnelFullname = recData.personnelFullname;
                        obj.personnelid_link = recData.personnelid_link;
                        obj.workingShift1 = recData.workingShift1;
                        obj.workingShift2 = recData.workingShift2;
                        obj.workingShift3 = recData.workingShift3;
                        obj.workingdate = recData.workingdate;
                        obj.dataIndex = dataIndex;
                        data.push(obj);

                        m.saveRecord(data);
                    }
                }
            });
        } else {
            var recData = record.data;
            var data = new Array();
            var obj = new Object();
            obj.lunchShift1 = recData.lunchShift1;
            obj.lunchShift2 = recData.lunchShift2;
            obj.lunchShift3 = recData.lunchShift3;
            obj.personnelCode = recData.personnelCode;
            obj.personnelFullname = recData.personnelFullname;
            obj.personnelid_link = recData.personnelid_link;
            obj.workingShift1 = recData.workingShift1;
            obj.workingShift2 = recData.workingShift2;
            obj.workingShift3 = recData.workingShift3;
            obj.workingdate = recData.workingdate;
            obj.dataIndex = dataIndex;
            data.push(obj);

            m.saveRecord(data);
        }
        // TimeSheetLunchStore.rejectChanges();
    },
    saveRecord: function (data) {
        // console.log(dataIndex);
        // console.log(recData);

        var viewModel = this.getViewModel();
        var me = this.getView();
        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');

        var params = new Object();
        params.data = data;
        // params.dataIndex = dataIndex;
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
    onConfirm: function () {
        var status = 1;
        this.updateStatus(status);
    },
    onUnconfirm: function () {
        var status = 0;
        this.updateStatus(status);
    },
    updateStatus: function (status) {
        var viewModel = this.getViewModel();
        var me = this.getView();
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
                        if (status == 1) {
                            viewModel.set('isBtnConfirmHidden', true);
                            viewModel.set('isBtnUnconfirmHidden', false);
                        } else {
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
    },
    onPersonnelCodeFilterKeyup: function () {
        var filterField = this.lookupReference('personnelCodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.personnelCodeFilter = filters.add({
                id: 'personnelCodeFilter',
                property: 'personnelCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.personnelCodeFilter) {
            filters.remove(this.personnelCodeFilter);
            this.personnelCodeFilter = null;
        }
    },
    onPersonnelRegCodeFilterKeyup: function () {
        var filterField = this.lookupReference('personnelRegCodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.personnelRegCodeFilter = filters.add({
                id: 'personnelRegCodeFilter',
                property: 'register_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.personnelRegCodeFilter) {
            filters.remove(this.personnelRegCodeFilter);
            this.personnelRegCodeFilter = null;
        }
    },
    onPersonnelFullnameFilterKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('personnelFullnameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.personnelFullnameFilter = filters.add({
                id: 'personnelFullnameFilter',
                property: 'personnelFullname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.personnelFullnameFilter) {
            filters.remove(this.personnelFullnameFilter);
            this.personnelFullnameFilter = null;
        }
    }
})