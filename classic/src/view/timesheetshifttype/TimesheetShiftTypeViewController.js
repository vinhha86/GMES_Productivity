Ext.define('GSmartApp.view.timesheetshifttype.TimesheetShiftTypeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimesheetShiftTypeViewController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnXoa': {
            click: 'onXoaNhieu'
        },
        '#TimesheetShiftTypeView': {
            itemdblclick: 'onItemdblclick'
        }
    },
    onThemMoi: function(m, record, item, index, e, eOpts){
        var viewModel = this.getViewModel();
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 230,
            width: 400,
            closable: true,
            title: 'Thêm mới ca làm việc',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TimesheetShiftTypeFormView',
                viewModel: {
                    type: 'TimesheetShiftTypeViewModel',
                    data:{
                        id: 0,
                        name: null,
                        timefrom: null,
                        timeto: null,
                        checkboxfrom: -1,
                        checkboxto: -1
                    }
                },
            }]
        });
        form.show();
    },
    onItemdblclick: function(m, record, item, index, e, eOpts){
        console.log(record.data);
        var id = record.data.id;
        var name = record.data.name;
        var datefrom = record.data.datefrom;
        var dateto = record.data.dateto;
        var checkboxfrom = record.data.checkboxfrom;
        var checkboxto = record.data.checkboxto;

        var viewModel = this.getViewModel();
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 230,
            width: 400,
            closable: true,
            title: 'Thông tin ca làm việc',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TimesheetShiftTypeFormView',
                viewModel: {
                    type: 'TimesheetShiftTypeViewModel',
                    data:{
                        id: id,
                        name: name,
                        timefrom: datefrom,
                        timeto: dateto,
                        checkboxfrom: checkboxfrom,
                        checkboxto: checkboxto
                    }
                },
            }]
        });
        form.show();
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var TimesheetShiftTypeStore = viewmodel.getStore('TimesheetShiftTypeStore');
        TimesheetShiftTypeStore.loadStore();
        TimesheetShiftTypeStore.getSorters().add('name');
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var data = [];
        data.push({'id': id});
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(data);
                }
            }
        });
    },
    Xoa: function (data) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/timesheetshifttype/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });

                    var store = me.getStore();
                    store.load();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onXoaNhieu: function(){
        var m = this.getView();
        var me = this;
        var data = [];
        var select = m.getSelectionModel().getSelection();
        if(select.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn ít nhất một ca làm việc",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        for (var i = 0; i < select.length; i++) {
            data.push({'id': select[i].data.id});
        }
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(data);
                }
            }
        });
    },
})