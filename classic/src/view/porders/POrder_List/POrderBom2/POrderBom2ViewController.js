Ext.define('GSmartApp.view.porders.POrder_List.POrderBom2.POrderBom2ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderBom2ViewController',
    init: function () {

    },
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 5;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var porderid_link = viewmodel.get('IdPOrder');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        var params = new Object();
        params.porderid_link = porderid_link;

        GSmartApp.Ajax.post('/api/v1/porder/getsku_by_porder', Ext.JSON.encode(params),
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
                        if ("" + listtitle[i] == "") continue;

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

                    storeBOM.getbom_by_porder(porderid_link);
                }
            })
    }
})