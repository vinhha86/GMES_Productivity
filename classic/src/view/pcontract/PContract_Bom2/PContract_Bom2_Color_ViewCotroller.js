Ext.define('GSmartApp.view.pcontract.PContract_Bom2_Color_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom2_Color_ViewCotroller',
    length: 11,
    ischange: false,
    init: function () {

    },
    CreateColumns: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 11;
        // console.log(grid.headerCt.items.length);
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }      
        // console.log(grid.headerCt.items.length);
        var listtitle = [];
        var listid = [];

        var productid_link = viewmodel.get('IdProduct');
        var pcontractid_link = viewmodel.get('PContract.id');

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
                            format: '0.0000',
                            align: 'right',
                            editor: {
                                xtype: 'textfield',
                                selectOnFocus: true,
                                maskRe: /[0-9.]/,
                                listeners: {
                                    change: 'onChange'
                                }
                            },
                            renderer: function (value, metaData, record) {
                                if (value == 0) return "";
                                return Ext.util.Format.number(value, '0.0000')
                            }
                        });   
                        grid.headerCt.insert(grid.columns.length, column);
                        length++;
                    }
            
                    var storeBOM = grid.getStore();

                    var model = storeBOM.getModel();
                    var fields = model.getFields();
                    for (var i = 0; i < fields.length; i++) {
                        if (i > 20) {
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
    onChange: function (grid, newValue, oldValue, eOpts) {
        this.ischange = true;
    },
    onEdit: function (editor, context, e) {
        var me = this;
        var viewmodel = this.getViewModel();
        if (!me.ischange) {
            var store = viewmodel.getStore('PContractBom2ColorStore');
            store.rejectChanges();
            return;
        }

        if (context.field == "amount") {
            me.updateBOM(context.record);
        }
        else if (context.field == "amount_color") {
            me.updateColor(context.record);
        }
        else {
            me.updateSKU(context);
        }
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa nguyên phụ liệu "' + rec.data.materialName + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'no') {
                    return;
                }
                else {
                    var params = new Object();
                    params.pcontractid_link = viewmodel.get('PContract').id;
                    params.productid_link = viewmodel.get('IdProduct');
                    params.materialid_link = rec.data.materialid_link;

                    GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/deletematerial', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                                else {
                                    grid.getStore().removeAt(rowIndex);
                                    var storebom = viewmodel.getStore('PContractProductBom2Store');
                                    storebom.load();
                                }
                            }
                        })
                }
            }
        });
    },
    updateColumnSize: function (record) {
        var me = this;
        var grid = this.getView();
        var column = grid.getColumns();
        for (var i = 0; i < column.length; i++) {
            if (i > me.length) {
                record.set(column[i].dataIndex, 0);
            }
        }
    },
    updateBOM: function (record) {
        var grid = this.getView();
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = record.data;
        params.isUpdateBOM = true;
        console.log(params);
        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/update_pcontract_productbom', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    me.ischange = false;
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractBom2ColorStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        me.updateColumnSize(record);
                        record.set("amount_color", 0);
                        store.commitChanges();
                    }
                }
            })
    },
    updateColor: function (record) {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = record.data;
        params.colorid_link = grid.colorid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/update_pcontract_productbomcolor', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    me.ischange = false;
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractBom2ColorStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        record.set("amount", 0);
                        me.updateColumnSize(record);
                        store.commitChanges();
                    }
                }
            })
    },
    updateSKU: function (record) {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = record.record.data;
        params.colorid_link = grid.colorid_link;
        params.sizeid_link = record.field;
        params.value = record.value;

        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/update_pcontract_productbomsku', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    me.ischange = false;
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractBom2ColorStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        //Thanh cong thi commit de bo dau do trong grid
                        record.record.set("amount", 0);
                        record.record.set("amount_color", 0);
                        store.commitChanges();
                    }
                }
            })
    }
})