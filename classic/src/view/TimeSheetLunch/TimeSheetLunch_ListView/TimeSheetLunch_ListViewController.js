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
        },
        '#btnAutoGetInfo': {
            click: 'onBtnAutoGetInfo'
        },
        '#btnSave': {
            click: 'onSave'
        },
        '#btnTest': {
            click: 'onTest'
        },
    },
    listen: {
        store: {
            'TimeSheetLunchStore': {
                'TimeSheetLunchStore_Done': 'onTimeSheetLunchStore_Done'
            }
        }
    },
    onTimeSheetLunchStore_Done: function () {
        var me = this;
        me.sumInfo();
        this.getView().setLoading(false);
    },
    CreateColumns: function (data) {
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
        params.is_ca_an = true;
        GSmartApp.Ajax.post('/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        for (var i = 0; i < response.data.length; i++) {
                            var data = response.data[i];
                            listtitle.push(data.name.trim());

                        }
                        viewmodel.set('numberShift', response.data.length);
                        for (var i = 0; i < listtitle.length; i++) {
                            if ("" + listtitle[i] == "") continue;
                            // console.log(listtitle[i]);
                            var column = Ext.create('Ext.grid.column.Column', {
                                text: listtitle[i],
                                sortable: false,
                                menuDisabled: true,
                                columns: [
                                    // {
                                    //     xtype: 'checkcolumn',
                                    //     text: 'Đi làm',
                                    //     dataIndex: 'workingShift' + (i + 1),
                                    //     headerCheckbox: true,
                                    //     flex: 1,
                                    //     // width: 75,
                                    //     listeners: {
                                    //         beforecheckchange: 'onBeforecheckchange',
                                    //         checkchange: 'onCheckchange',
                                    //         headerclick: 'onHeaderClick'
                                    //     }
                                    // },
                                    {
                                        xtype: 'checkcolumn',
                                        // text: 'Ăn',
                                        dataIndex: 'lunchShift' + (i + 1),
                                        headerCheckbox: true,
                                        sortable: false,
                                        menuDisabled: true,
                                        // flex: 1,
                                        width: 70,
                                        listeners: {
                                            beforecheckchange: 'onBeforecheckchange',
                                            checkchange: 'onCheckchange',
                                            headerclick: 'onHeaderClick'
                                        }
                                    }
                                ]
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
        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');
        var isConfirm = viewModel.get('isConfirm');
        if (isConfirm) {
            TimeSheetLunchStore.rejectChanges();
            return;
        }

        var checked = column.allChecked;
        var dataIndex = column.dataIndex;

        // var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');
        // TimeSheetLunchStore.rejectChanges();

        // Ext.Msg.show({
        //     title: 'Thông báo',
        //     msg: 'Bạn có chắc chắn chọn tất cả nhân viên ?',
        //     buttons: Ext.Msg.YESNO,
        //     icon: Ext.Msg.QUESTION,
        //     buttonText: {
        //         yes: 'Có',
        //         no: 'Không'
        //     },
        //     fn: function (btn) {
        //         if (btn === 'yes') {
        //             m.onHeaderClickConfirm(column, checked, dataIndex);
        //         }
        //     }
        // });

        m.onHeaderClickConfirm(column, checked, dataIndex);
    },
    onHeaderClickConfirm: function (column, checked, dataIndex) {
        var m = this;
        var viewModel = this.getViewModel();

        // console.log('Header:' + checked);

        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');
        // TimeSheetLunchStore.rejectChanges();

        // store empty
        if (TimeSheetLunchStore.getData().items.length == 0) {
            return;
        }
        // neu ngay la hom qua thi khong duoc edit
        var isToday = viewModel.get('isToday');
        if (!isToday) {
            return;
        }
        // neu da xac nhan thi khong duoc edit
        var status = TimeSheetLunchStore.getData().items[0].data.status;
        if (status == 1) {
            return;
        }
        // console.log(dataIndex);
        var col = dataIndex.substr(dataIndex.length - 1);

        var lunchShift = "lunchShift" + col;
        var workingShift = "workingShift" + col;
        // console.log(lunchShift);


        // checked lunchShift
        // chọn tất cả ăn 
        if (dataIndex == lunchShift) {
            TimeSheetLunchStore.each(function (rec) {
                rec.set(lunchShift, checked);
            });
        } else {
            // checked workingShift
            //chọn tất cả (header)đi làm - ăn cũng được chọn theo
            TimeSheetLunchStore.each(function (rec) {
                rec.set(workingShift, checked);
                rec.set(lunchShift, checked);
            });
        }



        // checked workingShift
        // if (dataIndex == 'workingShift1' || dataIndex == 'workingShift2' || dataIndex == 'workingShift3') {
        //     var lunchShift = '';
        //     switch (dataIndex) {
        //         case 'workingShift1':
        //             lunchShift = 'lunchShift1';
        //             break;
        //         case 'workingShift2':
        //             lunchShift = 'lunchShift2';
        //             break;
        //         case 'workingShift3':
        //             lunchShift = 'lunchShift3';
        //             break;
        //     }
        //     TimeSheetLunchStore.each(function (rec) {
        //          console.log(rec);
        //         rec.set(dataIndex, checked);
        //         rec.set(lunchShift, checked);
        //     });
        // }

        // // checked lunchShift
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
        // TimeSheetLunchStore.each(function(rec){
        //     // console.log(rec);
        //     // chi edit lunch khi working == true

        //         rec.set(dataIndex, checked);
        //         // rec.set(workingShift, checked);

        // });

        var data = new Array();
        TimeSheetLunchStore.each(function (rec) {
            var recData = rec.data;
            var obj = new Object();

            for (var i = 1; i <= col; i++) {
                var lunchShift = "lunchShift" + i;
                var workingShift = "workingShift" + i;
                obj.lunchShift = recData[lunchShift];
                obj.workingShift = recData[workingShift];
            }
            obj.personnelCode = recData.personnelCode;
            obj.personnelFullname = recData.personnelFullname;
            obj.personnelid_link = recData.personnelid_link;
            obj.workingdate = recData.workingdate;
            obj.dataIndex = col;
            data.push(obj);
        });
        // console.log(data);
        // m.saveRecord(data);
    },
    onCheckchange: function (column, rowIndex, checked, record, e, eOpts) {
        // console.log(column);
        console.log(checked);
        var m = this;
        var viewModel = this.getViewModel();
        var isConfirm = viewModel.get('isConfirm');
        var TimeSheetLunchStore = viewModel.get('TimeSheetLunchStore');

        if (isConfirm) {
            TimeSheetLunchStore.rejectChanges();
            return;
        }

        var dataIndex = column.dataIndex;

        // // neu ngay la hom qua thi khong duoc edit
        // var isToday = viewModel.get('isToday');
        // if (!isToday) {
        //     TimeSheetLunchStore.rejectChanges();
        //     return;
        // }

        // neu da xac nhan thi khong duoc edit
        if (record.get('status') == 1) {
            TimeSheetLunchStore.rejectChanges();
            return;
        }
        // lấy số ca làm
        var numberShift = viewModel.get('numberShift');
        for (var i = 1; i <= numberShift; i++) {
            // neu check ca đi làm thi check an luôn
            if (dataIndex == 'workingShift' + i) {
                record.set('lunchShift' + i, checked);
            }
        }

        // // neu check ca thi check an
        // if (dataIndex == 'workingShift1') {
        //     record.set('lunchShift1', checked);
        // }
        // if (dataIndex == 'workingShift2') {
        //     record.set('lunchShift2', checked);
        // }
        // if (dataIndex == 'workingShift3') {
        //     record.set('lunchShift3', checked);
        // }
        //cột đang check 
        var col = dataIndex.substr(dataIndex.length - 1);
        var recData = record.data;
        var data = new Array();
        var obj = new Object();

        // console.log(dataIndex);
        // console.log(col);

        for (var i = 1; i <= col; i++) {
            var lunchShift = "lunchShift" + i;
            var workingShift = "workingShift" + i;
            obj.lunchShift = recData[lunchShift];
            obj.workingShift = recData[workingShift];
        }
        obj.personnelCode = recData.personnelCode;
        obj.personnelFullname = recData.personnelFullname;
        obj.personnelid_link = recData.personnelid_link;

        obj.workingdate = recData.workingdate;
        obj.dataIndex = col;
        // console.log(obj);
        data.push(obj);

        // m.saveRecord(data);


        // neu check tu 2 ca tro len
        // if (
        //     (dataIndex == 'workingShift1' || dataIndex == 'workingShift2' || dataIndex == 'workingShift3')
        //     &&
        //     (
        //         (record.get('workingShift1') && record.get('workingShift2')) ||
        //         (record.get('workingShift2') && record.get('workingShift3')) ||
        //         (record.get('workingShift1') && record.get('workingShift3'))
        //     )
        //     &&
        //     checked
        // ) {
        //     Ext.Msg.show({
        //         title: 'Thông báo',
        //         msg: 'Nhân viên đã đi làm 1 ca, tiếp tục?',
        //         buttons: Ext.Msg.YESNO,
        //         icon: Ext.Msg.QUESTION,
        //         buttonText: {
        //             yes: 'Có',
        //             no: 'Không'
        //         },
        //         fn: function (btn) {
        //             if (btn === 'no') {
        //                 TimeSheetLunchStore.rejectChanges();
        //                 isOk = false;
        //                 return;
        //             } else {
        //                 var recData = record.data;
        //                 var data = new Array();
        //                 var obj = new Object();
        //                 obj.lunchShift1 = recData.lunchShift1;
        //                 obj.lunchShift2 = recData.lunchShift2;
        //                 obj.lunchShift3 = recData.lunchShift3;
        //                 obj.personnelCode = recData.personnelCode;
        //                 obj.personnelFullname = recData.personnelFullname;
        //                 obj.personnelid_link = recData.personnelid_link;
        //                 obj.workingShift1 = recData.workingShift1;
        //                 obj.workingShift2 = recData.workingShift2;
        //                 obj.workingShift3 = recData.workingShift3;
        //                 obj.workingdate = recData.workingdate;
        //                 obj.dataIndex = dataIndex;
        //                 data.push(obj);

        //                 m.saveRecord(data);
        //             }
        //         }
        //     });
        // } else {
        //     var recData = record.data;
        //     var data = new Array();
        //     var obj = new Object();
        //     obj.lunchShift1 = recData.lunchShift1;
        //     obj.lunchShift2 = recData.lunchShift2;
        //     obj.lunchShift3 = recData.lunchShift3;
        //     obj.personnelCode = recData.personnelCode;
        //     obj.personnelFullname = recData.personnelFullname;
        //     obj.personnelid_link = recData.personnelid_link;
        //     obj.workingShift1 = recData.workingShift1;
        //     obj.workingShift2 = recData.workingShift2;
        //     obj.workingShift3 = recData.workingShift3;
        //     obj.workingdate = recData.workingdate;
        //     obj.dataIndex = dataIndex;
        //     data.push(obj);

        //     m.saveRecord(data);
        // }
        // TimeSheetLunchStore.rejectChanges();
    },
    saveRecord: function (data) {
        // console.log(dataIndex);
        // console.log(recData);

        var viewModel = this.getViewModel();
        var me = this.getView();
        var th = this;
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
                    th.sumInfo();
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
                            viewModel.set('isConfirm', true);
                        } else {
                            viewModel.set('isBtnConfirmHidden', false);
                            viewModel.set('isBtnUnconfirmHidden', true);
                            viewModel.set('isConfirm', false);
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
    },
    sumInfo: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('TimeSheetLunchStore');
        var ca1 = 0, ca2 = 0, ca3 = 0, ca4 = 0;
        for (var i = 0; i < store.data.length; i++) {
            var rec = store.data.items[i].data;
            if (rec.lunchShift1)
                ca1++;
            if (rec.lunchShift2)
                ca2++;
            if (rec.lunchShift3)
                ca3++;
            if (rec.lunchShift4)
                ca4++;
        }
        viewmodel.set('sumCa1', ca1);
        viewmodel.set('sumCa2', ca2);
        viewmodel.set('sumCa3', ca3);
        viewmodel.set('sumCa4', ca4);
    },
    onSave: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var data = new Array();

        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        var storeData = TimeSheetLunchStore.getData().items;
        var modifiers = TimeSheetLunchStore.getModifiedRecords();

        // console.log(storeData);
        // console.log(modifiers); 

        for (var i = 0; i < modifiers.length; i++) {
            var recData = modifiers[i].data;

            // console.log(modifiers[i]);
            var modified = modifiers[i].modified;
            var arr = new Array();
            if (modified.lunchShift1 != null) {
                var o = new Object();
                o.dataIndex = 1;
                o.lunchShift = modified.lunchShift1;
                arr.push(o);
            }
            if (modified.lunchShift2 != null) {
                var o = new Object();
                o.dataIndex = 2;
                o.lunchShift = modified.lunchShift2;
                arr.push(o);
            }
            if (modified.lunchShift3 != null) {
                var o = new Object();
                o.dataIndex = 3;
                o.lunchShift = modified.lunchShift3;
                arr.push(o);
            }
            if (modified.lunchShift4 != null) {
                var o = new Object();
                o.dataIndex = 4;
                o.lunchShift = modified.lunchShift4;
                arr.push(o);
            }

            for (var j = 0; j < arr.length; j++) {
                var obj = new Object();
                var lunchShift = "lunchShift" + arr[j].dataIndex;
                var workingShift = "workingShift" + arr[j].dataIndex;
                obj.lunchShift = recData[lunchShift];
                obj.workingShift = recData[workingShift];
                obj.personnelCode = recData.personnelCode;
                obj.personnelFullname = recData.personnelFullname;
                obj.personnelid_link = recData.personnelid_link;
                obj.workingdate = recData.workingdate;
                obj.dataIndex = arr[j].dataIndex;
                data.push(obj);
            }

            // for (var j = 1; j <= col; j++) {
            //     var lunchShift = "lunchShift" + j;
            //     var workingShift = "workingShift" + j;
            //     obj.lunchShift = recData[lunchShift];
            //     obj.workingShift = recData[workingShift];
            // }
            // obj.personnelCode = recData.personnelCode;
            // obj.personnelFullname = recData.personnelFullname;
            // obj.personnelid_link = recData.personnelid_link;
            // obj.workingdate = recData.workingdate;
            // obj.dataIndex = col;
            // data.push(obj);
        }

        // dataIndex: "1"
        // lunchShift: true
        // personnelCode: "101010"
        // personnelFullname: "Phạm Thị Quân"
        // personnelid_link: 3584
        // workingShift: false
        // workingdate: "2021-10-28T17:00:00.000+0000"

        m.saveRecord(data);
    },
    onBtnAutoGetInfo: function () { 
        // popup window danh sach ca -> chon
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var orgid_link = viewModel.get('orgid_link');
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();
        //
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách ca ăn',
            closeAction: 'destroy',
			// height: Ext.getBody().getViewSize().height * .95,
			// width: Ext.getBody().getViewSize().width * .95,
            height: 300,
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Shift_List_View',
                viewModel: {
                    data: {
                        orgid_link: orgid_link,
                        date: date,
                    }
                }
            }],
        });
        form.show();

        form.down('#Shift_List_View').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#Shift_List_View').getController().on('Select', function (listCa, data) {
            // console.log(listCa);
            // console.log(data);
            viewModel.set('personnelCodeFilterValue', null);
            viewModel.set('personnelRegCodeFilterValue', null);
            viewModel.set('personnelFullnameFilterValue', null);
            m.personnelCodeFilter = null;
            m.personnelRegCodeFilter = null;
            m.personnelFullnameFilter = null;

            var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
            TimeSheetLunchStore.clearFilter();
            TimeSheetLunchStore.rejectChanges();
            var items = TimeSheetLunchStore.getData().items;

            for(var i = 0; i < items.length; i++){
                for(var j = 0; j < listCa.length; j++){
                    if(listCa[j].name == 'Ca ăn 1'){
                        items[i].set('lunchShift1', true);
                    }
                    if(listCa[j].name == 'Ca ăn 2'){
                        items[i].set('lunchShift2', true);
                    }
                    if(listCa[j].name == 'Ca ăn 3'){
                        items[i].set('lunchShift3', true);
                    }
                    if(listCa[j].name == 'Ca ăn 4'){
                        items[i].set('lunchShift4', true);
                    }
                }
            }

            for(var i = 0; i < data.length; i++){
                var gridRecord = TimeSheetLunchStore.findRecord('personnelid_link', data[i].personnelid_link, 0, false, false, true);
                // console.log(gridRecord);
                if(gridRecord){
                    gridRecord.set('lunchShift' + data[i].lunchShift, false);
                }
            }

            form.close();
        });
    },
    onTest: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        var items = TimeSheetLunchStore.getData().items;
        console.log(items);

        for(var i = 0; i < items.length; i++){
            items[i].set('lunchShift2', true);
        }
    }
})