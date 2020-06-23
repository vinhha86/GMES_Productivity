Ext.define('GSmartApp.view.pcontract.PContract_POrder_PorderSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_PorderSKU',
    id:'PContract_POrder_PorderSKU',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            // listeners: {
            //     edit: 'onEdit'
            // } 
        }
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{porderSKUStore}'
    },
    columns:[
        { header: 'SKU', dataIndex: 'skucode', flex: 1},
        { header: 'Màu', dataIndex: 'mauSanPham', width: 70},
        { header: 'Cỡ', dataIndex: 'coSanPham', width: 70},  
        { header: 'Số lượng', dataIndex: 'pquantity_total', width: 80,
            editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 100000, selectOnFocus: false},
        },
        {
            xtype: 'actioncolumn',
            width: 20,
            menuDisabled: true,
            sortable: false,
            items: [{
                iconCls: 'x-fa fas fa-trash',
                tooltip: 'Xóa',
                handler: 'onXoaSKU'
            }]
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                itemId:'btnSKUAutoCalculate',
                tooltip: 'Tính tự động theo dải cỡ',
                iconCls: 'x-fa fa-calculator',
                weight: 30
            },
            {
                xtype: 'button',
                itemId:'btnSKUSelect',
                tooltip: 'Chi tiết màu, cỡ',
                iconCls: 'x-fa fa-list-ol',
                weight: 30
            },
            
        ]
    }]      
});

