Ext.define('GSmartApp.view.handover.HandoverDetail_SkuGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverDetail_SkuGrid',
    id: 'HandoverDetail_SkuGrid',
    reference: 'HandoverDetail_SkuGrid',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                // edit: 'onEditProductTotalPackage'
            } 
        }
    },
    bind: {
        // store: '{HandoverProductStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skuCode', flex: 1},
        { header: 'Mã vạch', dataIndex: 'barcode', width: 150},
        { header: 'Màu', dataIndex: 'skuColor', width: 100},
        { header: 'Cỡ', dataIndex: 'skuSize', width: 70},  
        { header: 'Số lượng giao', dataIndex: 'totalpackage', width: 80, summaryType: 'sum', align: 'end', 
            summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return Ext.util.Format.number(value, '0,000');
            },
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                listeners: {
                    // specialkey: 'onSpecialkey'
                }
            },
        },
        { header: 'Số lượng nhận', dataIndex: 'totalpackagecheck', width: 80, summaryType: 'sum', align: 'end', 
            summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return Ext.util.Format.number(value, '0,000');
            },
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                listeners: {
                    // specialkey: 'onSpecialkey'
                }
            },
        }
    ]
});

