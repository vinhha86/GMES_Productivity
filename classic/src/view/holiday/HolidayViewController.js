Ext.define('GSmartApp.view.holiday.HolidayViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HolidayViewController',
    isActivate: false,
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnXoa': {
            click: 'onXoaNhieu'
        }
    },
    onThemMoi: function(){
        var viewModel = this.getViewModel();
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 250,
            width: 600,
            closable: true,
            title: 'Thêm mới ngày nghỉ',
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
                xtype: 'HolidayFormView'
            }]
        });
        form.show();
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var storeHoliday = viewmodel.getStore('HolidayStore');
        storeHoliday.loadStore();
        storeHoliday.sort('day', 'DESC');

        var storeHolidayYears = viewmodel.getStore('HolidayYearStore');
        storeHolidayYears.loadStore();
    },
    onChange: function( cbbox, newValue, oldValue, eOpts ) {
        // console.log(newValue);
        var viewmodel = this.getViewModel();
        var storeHoliday = viewmodel.getStore('HolidayStore');
        if(newValue == 'Tất cả')
            storeHoliday.loadStore();
        else
            storeHoliday.loadStoreByYear(newValue);
        storeHoliday.sort('day', 'DESC');
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

        GSmartApp.Ajax.post('/api/v1/holiday/delete', Ext.JSON.encode(params),
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
                    me.getViewModel().getStore('HolidayYearStore').load();
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
                msg: "Xóa thất bại",
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
    }
})