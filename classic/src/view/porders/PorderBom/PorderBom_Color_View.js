Ext.define('GSmartApp.view.porders.PorderBom.PorderBom_Color_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'PorderBom_Color_View',
    controller: 'PorderBom_Color_ViewCotroller',
    colorid_link : 0,
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind:{
        store:'{POrderBomColorStore}'
    },
    columns:[{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        width: 120
    },{
        text: 'Nguyên phụ liệu',
        dataIndex: 'materialName',
        width: 150
    },{
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        width: 80
    },{
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 80
    },{
        text: 'Thành phần vải',
        dataIndex: 'thanhPhanVai',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'ĐVT',
        dataIndex: 'unitName',
        width: 70
    }, {
        text: 'Tiêu hao',
        dataIndex: 'lost_ratio',
        width: 70,
        xtype: 'numbercolumn',
        format: '0.000',
        renderer: function (value, metaData, record) {
            return value+" %";
        }
    },{
        text: 'Chung',
        dataIndex: 'amount',
        width: 65,
        xtype: 'numbercolumn',
        format: '0.0000',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            return Ext.util.Format.number(value, '0.0000')
        }
    },{
        text: 'Màu',
        dataIndex: 'amount_color',
        width: 65,
        xtype: 'numbercolumn',
        format: '0.0000',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            if(value ==0) return "";
            return Ext.util.Format.number(value, '0.0000')
        }
    }]
});

