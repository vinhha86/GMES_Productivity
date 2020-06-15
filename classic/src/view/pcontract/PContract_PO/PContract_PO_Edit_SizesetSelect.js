Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_SizesetSelect', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_SizesetSelect',
    id: 'PContract_PO_Edit_SizesetSelect',
    controller: 'PContract_PO_Edit_SizesetController',
    IdAttribute: 0,
    IdProduct : 0,
    IdPContract: 0,
    viewModel: {
        type : 'ProductDetailViewModel'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        scrollable: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{SizeSetStore}'
    },
    columns: [{
        text: 'Giá trị',
        dataIndex: 'value',
        flex: 1
    }],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            border: false,
            flex : 1
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

