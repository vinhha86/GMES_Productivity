Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        
        
    },
    control: {
        '#btnThemSoDo' : {
            click: 'onThemSoDo'
        }
    },
    onXoa: function(){

    },
    onEdit: function(editor, context, e){
        if(context.colIdx >= 6){
            this.UpdateSizeAmount(context);            
        }
        else {

        }
    },
    UpdateSizeAmount: function(context){
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
        params.name = context.record.get('name');

        GSmartApp.Ajax.post('/api/v1/cutplan/update_size_amount', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode == 200) {
                        var rec_catdu = store.getAt(1);
                        rec_catdu.set(context.field, parseInt(rec_catdu.get(context.field)) +parseInt(context.value));
                        store.commitChanges();
                    }
                    else {
                        Ext.Msg.alert({
                            title: "Thông báo",
                            msg: 'Có lỗi trong quá trình xử lý dữ liệu! Bạn hãy thử lại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                store.rejectChanges();
                            }
                        }); 
                    }
                }
            })
    },
    onThemSoDo: function(){
        var viewmodel = this.getViewModel();
        var npl = viewmodel.get('npl');

        if (npl.id == null) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn nguyên liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
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
                    if(response.respcode == 200) {
                        var store = viewmodel.getStore('CutPlanRowStore');
                        store.load();
                    }
                }
            })
        }
    },
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 7
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length -1 ) {
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
                            editor: {
                                xtype: 'textfield',
                                selectOnFocus: true,
                                maskRe: /[0-9]/
                            },
                            renderer: function (value, metaData, record) {
                                if (value == 0) return "";
                                return value;
                            }
                        });
                        grid.headerCt.insert(grid.columns.length, column);
                        length++;
                    }
            
                    var storeBOM = grid.getStore();

                    var model = storeBOM.getModel();
                    var fields = model.getFields();
                    for (var i = 0; i < fields.length; i++) {
                        if (i > 8) {
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