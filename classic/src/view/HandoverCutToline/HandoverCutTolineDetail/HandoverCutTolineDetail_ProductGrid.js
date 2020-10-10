Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineDetail_ProductGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverCutTolineDetail_ProductGrid',
    id: 'HandoverCutTolineDetail_ProductGrid',
    reference: 'HandoverCutTolineDetail_ProductGrid',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEditProductTotalPackage'
            } 
        }
    },
    bind: {
        store: '{HandoverProductStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã SP(Buyer)',
        dataIndex: 'buyercode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Tên SP(Buyer)',
        dataIndex: 'buyername',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Số lượng',
        dataIndex: 'totalpackage',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        flex: 1,
        align: 'end'
    }, {
        text: 'Đơn vị tính',
        dataIndex: 'unitName',
        flex: 1,
    }, {
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu'
            },            
        ]
    }]
});

