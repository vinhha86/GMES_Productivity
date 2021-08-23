Ext.define('GSmartApp.view.salary.TimesheetShiftTypeMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimesheetShiftTypeMainViewController',

    init:function(view){
        this.onload();
        
    },
    control:{
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#TimesheetShiftTypeMainView':{
            itemdblclick: 'CapNhat'
        }
    },
    onload: function () {
        var viewModel = this.getViewModel();
        var TimesheetShiftTypeStore = viewModel.getStore('TimeShiftStore');
        TimesheetShiftTypeStore.loadStore();

    },
    onloadAfter:function(){
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('selected_orgid');
        var TimesheetShiftTypeStore = viewmodel.getStore('TimeShiftStore');
        TimesheetShiftTypeStore.loadStorebyOrgid_link(orgid_link);
    },
  
    onThemMoi:function(){
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('selected_orgid');
        
        console.log(viewmodel.get('selected_orgid'));
      //  console.log(x);
        this.Showinfo(null,orgid_link);
    },
    onCapNhat:function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('selected_orgid');
        var rec = grid.getStore().getAt(rowIndex);
        this.itemDetail(rec.data,orgid_link);
    },
    CapNhat:function(m, record, item, index, e, eOpts){
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('selected_orgid');
        this.itemDetail(record.data,orgid_link)
    },
    itemDetail: function(data,orgid_link){
        var me =this;
        var id = data.id;
        var name = data.name;
        var datefrom = data.datefrom;
        var dateto = data.dateto;
        var checkboxfrom = data.checkboxfrom;
        var checkboxto = data.checkboxto;

        var viewModel = this.getViewModel();
        //var me = this.getView();
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
                xtype: 'TimesheetShiftTypeAddView',
                viewModel: {
                    type: 'Salary_MainView_Model',
                    data:{
                        id: id,
                        name: name,
                        timefrom: datefrom,
                        timeto: dateto,
                        checkboxfrom: checkboxfrom,
                        checkboxto: checkboxto,
                        orgid_link:orgid_link
                    }
                },
            }]
        });
        form.show();
        form.down('#TimesheetShiftTypeAddView').on("updatethanhcong", function () {
            console.log('tat')
            form.close();
            //load lai trang.
            me.onloadAfter();
        })
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
    
    Showinfo:function(rec,orgid_link){
        var me =this;
      
        var form = Ext.create('Ext.window.Window', {
            height: 230,
            width: 400,
            closable: true,
            title: rec == null ? 'Thêm mới ca làm việc' : 'Cập nhật ca mới làm việc',
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
                xtype: 'TimesheetShiftTypeAddView',
                viewModel: {
                    type: 'Salary_MainView_Model',
                    
                    data:{
                        Tid: 0,
                        name: null,
                        timefrom: null,
                        timeto: null,
                        checkboxfrom: -1,
                        checkboxto: -1,
                        orgid_link:orgid_link
                        } 
                },
            }]
        });
        form.show();
        form.down('#TimesheetShiftTypeAddView').on("thanhcong", function () {
            form.close();
            //load lai trang.
            me.onloadAfter();
        })
    }
})