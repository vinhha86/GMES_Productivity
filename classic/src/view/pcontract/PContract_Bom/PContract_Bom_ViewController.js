Ext.define('GSmartApp.view.pcontract.PContract_Bom_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_ViewController',
    control: {
        '#cmbSanPham': {
            select: 'onChangeProduct'
        }
    },
    init: function () {
    },
    onChangeProduct: function (combo, rec, eOpts) {
        if (rec != null) {
            var me = this;
            me.CreateColumns();
            // common.Check_Object_Permission();
        }

    },
    checkActionColumnPermission: function (view, rowIndex, colIndex, item, record) {
        return common.Check_ActionColum_Permission(item.itemId);
    },
    renderUnit: function (value, metaData, record, rowIdx, colIdx, store) {
        var me = this;
        var storeUnit = me.getViewModel().getStore('UnitStore');
        if (value != null) {
            var rec = storeUnit.findRecord("id", value, 0, false, false, true);
            if (rec != null) {
                return rec.data.code;
            } else {
                return record.data.unitName;
            }
        } else {
            return '';
        }
    },
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 10;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
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
                        if (!listid.includes(data.sizeid_link)) {
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
                                maskRe: /[0-9.]/
                            },
                            renderer: function (value, metaData, record) {
                                if (value == 0) return "";
                                return Ext.util.Format.number(value, '0.0000')
                            }
                        });
                        grid.headerCt.insert(length, column);
                        length++;
                    }

                    var storeBOM = grid.getStore();

                    var model = storeBOM.getModel();
                    var fields = model.getFields();
                    for (var i = 0; i < fields.length; i++) {
                        if (i > 24) {
                            model.removeFields(fields[i].name);
                        }
                    }

                    var fieldnew = [];
                    for (var i = 0; i < listid.length; i++) {
                        fieldnew.push({ name: listid[i], type: 'number' });
                    }

                    model.addFields(fieldnew);
                    storeBOM.removeFilter();

                    storeBOM.load_bom_by_product(pcontractid_link, productid_link);
                }
            })
    }
})