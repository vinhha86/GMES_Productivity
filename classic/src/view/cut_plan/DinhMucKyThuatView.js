Ext.define('GSmartApp.view.cut_plan.DinhMucKyThuatView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DinhMucKyThuatView',
    id: 'DinhMucKyThuatView',
    controller: 'DinhMucKyThuatViewController',
    bind: {
        store: '{POrderBom2Store}'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    columns: [
        {
            text: 'Mã NPL',
            dataIndex: 'materialCode',
            width: 80,
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                margin: 1,
                reference: 'ValueFilterFieldMaNPL',
                width: '98%',
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onFilterValueMaNPLKeyup',
                    buffer: 500
                }
            }
        }, 
        {
            text: 'Nguyên phụ liệu',
            dataIndex: 'materialName',
            width: 120,
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            }
        }, 
        {
            text: 'Màu NPL',
            dataIndex: 'tenMauNPL',
            menuDisabled: true,
            sortable: false,
            width: 120,
            enableTextSelection: true,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            }
        }, 
        {
            text: 'Cỡ/khổ',
            dataIndex: 'coKho',
            menuDisabled: true,
            sortable: false,
            width: 70,
            enableTextSelection: true,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            }
        }, 
        {
            text: 'Màu SP',
            dataIndex: 'color_name',
            width: 110,
            sortable: false,
            menuDisabled: true,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                margin: 1,
                reference: 'ValueFilterField',
                width: '99%',
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onFilterValueKeyup',
                    buffer: 500
                }
            }
        }, 
        {
            text: 'ĐVT',
            dataIndex: 'unitName',
            width: 70,
        },
        {
            text: 'Tiêu hao',
            dataIndex: 'lost_ratio',
            menuDisabled: true,
            sortable: false,
            width: 70,
            xtype: 'numbercolumn',
            format: '0.000',
            editor: {
                xtype: 'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true
            },
            renderer: function (value, metaData, record) {
                return value;
            }
        }
    ]
})