Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();


    },
    control: {
        '#btnThemSoDo': {
            click: 'onThemSoDo'
        },
        '#btnShowNPL' : {
            click: 'onShowNPL'
        }
    },
    onShowNPL: function(){
        var viewmodel = this.getViewModel();
        var main = this.getView();
        viewmodel.set('isHiddenNPL', false);
        viewmodel.set('width_npl', "30%");
        // var form_npl = main.down('#CutPlan_NPL_View');
        // form_npl.expand();
    },
    onLock: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Giữ cây vải cho sơ đồ ',
            closeAction: 'destroy',
            height: 600,            
            width: 900,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Cutplan_Warehouse_MainView',
                viewModel : {
                    data: {
                        cutplanrowid_link : rec.get('id'),
                        material_skuid_link: rec.get('material_skuid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#Cutplan_Warehouse_MainView').getController().on('Thoat', function () {
            
            form.close();
        });
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.get('type') == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có chắc chắn xóa sơ đồ ?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        var porder = viewmodel.get('porder');
                        var npl = viewmodel.get('npl');

                        var params = new Object();
                        params.cutplanrowid_link = rec.get('id');
                        params.porderid_link = porder.id;
                        params.material_skuid_link = npl.id;

                        GSmartApp.Ajax.post('/api/v1/cutplan/delete_row', Ext.JSON.encode(params),
                            function (success, response, options) {
                                if (success) {
                                    var response = Ext.decode(response.responseText);
                                    if (response.respcode == 200) {
                                        var store = viewmodel.getStore('CutPlanRowStore');
                                        store.remove(rec);
                                        store.load();
                                    }
                                    else {
                                        Ext.Msg.alert({
                                            title: "Thông báo",
                                            msg: 'Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại',
                                            buttons: Ext.MessageBox.YES,
                                            buttonText: {
                                                yes: 'Đóng'
                                            }
                                        });
                                    }
                                }
                            })
                    }
                }
            });
        }
    },
    onEdit: function (editor, context, e) {
        if (context.originalValue == context.value) return;

        if (context.colIdx >= 8) {
            this.UpdateSizeAmount(context);
        }
        else {
            this.UpdateRow(context);
        }
    },
    UpdateRow: function(context){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('CutPlanRowStore');

        var params = new Object();
        params.data = context.record.data;

        if(context.field != 'ngay'){
            var arr = context.record.get('ngay').split('-');
            var ngay = new Date(arr[2], parseInt(arr[0]) - 1, arr[1]);

            params.data.ngay = ngay;
        }
        

        GSmartApp.Ajax.post('/api/v1/cutplan/update_row', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        store.load();
                    }
                    else {
                        Ext.Msg.alert({
                            title: "Thông báo",
                            msg: 'Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                store.rejectChanges();
                            }
                        });
                    }
                }
            })
    },
    UpdateSizeAmount: function (context) {
        if(context.value == context.originalValue) return;
        
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder');
        var npl = viewmodel.get('npl');
        var store = viewmodel.getStore('CutPlanRowStore');

        var params = new Object();
        params.porderid_link = porder.id;
        params.material_skuid_link = npl.id;
        params.productid_link = porder.productid_link;
        params.colorid_link = viewmodel.get('colorid_link_active');
        params.sizeid_link = parseInt(context.field);
        params.amount = parseInt(context.value);
        params.cutplanrowid_link = context.record.get('id');
        params.amount_old = parseInt(context.originalValue);

        GSmartApp.Ajax.post('/api/v1/cutplan/update_size_amount', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        store.load();
                    }
                    else {
                        Ext.Msg.alert({
                            title: "Thông báo",
                            msg: 'Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                store.rejectChanges();
                            }
                        });
                    }
                }
                else{
                    store.rejectChanges();
                }
            })
    },
    onThemSoDo: function () {
        var viewmodel = this.getViewModel();
        var npl = viewmodel.get('npl');
        var store = viewmodel.getStore('CutPlanRowStore');

        if (npl.id == null) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn nguyên liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        }

        // if (store.data.items.length == 0) {
        //     Ext.Msg.alert({
        //         title: "Thông báo",
        //         msg: 'Nguyên liệu chưa tạo kế hoạch cắt! Bạn phải tạo kế hoạch trước khi thêm sơ đồ',
        //         buttons: Ext.MessageBox.YES,
        //         buttonText: {
        //             yes: 'Đóng'
        //         }
        //     });
        //     return;
        // }

        var params = new Object();
        var porder = viewmodel.get('porder');
        params.porderid_link = porder.id;
        params.material_skuid_link = npl.id;
        params.productid_link = porder.productid_link;
        params.pcontractid_link = porder.pcontractid_link;
        params.colorid_link = viewmodel.get('colorid_link_active');

        GSmartApp.Ajax.post('/api/v1/cutplan/add_row', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var store = viewmodel.getStore('CutPlanRowStore');
                        store.load();
                    }
                }
            })
    },
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 9;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var productid_link = viewmodel.get('porder.productid_link');
        var pcontractid_link = viewmodel.get('porder.pcontractid_link');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);

                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listid.includes(data.sizeid_link) && data.color_id == grid.colorid_link) {
                            listid.push(data.sizeid_link);
                            listtitle.push(data.coSanPham);
                        }
                    }

                    for (var i = 0; i < listtitle.length; i++) {

                        var column = Ext.create('Ext.grid.column.Number', {
                            text: listtitle[i],
                            xtype: 'numbercolumn',
                            dataIndex: listid[i].toString(),
                            width: 65,
                            align: 'right',
                            getEditor: function (record) {
                                if (record.get('type') == 0) {
                                    return Ext.create('Ext.grid.CellEditor', {
                                        field: {
                                            xtype: 'textfield',
                                            selectOnFocus: true,
                                            maskRe: /[0-9]/
                                        }
                                    })
                                }
                            },
                            renderer: function (value, metaData, record) {
                                if (value == 0) return "";
                                return Ext.util.Format.number(value, '0,000')
                            }
                        });
                        grid.headerCt.insert(length, column);
                        length++;
                    }

                    var storeBOM = grid.getStore();

                    var model = storeBOM.getModel();
                    var fields = model.getFields();
                    for (var i = 0; i < fields.length; i++) {
                        if (i > 9) {
                            model.removeFields(fields[i].name);
                        }
                    }

                    var fieldnew = [];
                    for (var i = 0; i < listid.length; i++) {
                        fieldnew.push({ name: listid[i], type: 'number' });
                    }

                    model.addFields(fieldnew);
                }
            })
    },
})