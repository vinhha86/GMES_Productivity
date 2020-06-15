Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Sizeset', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Sizeset',
    id:'PContract_PO_Edit_Sizeset',
    controller: 'PContract_PO_Edit_SizesetController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{po.pcontract_price}'
    },
    columns:[{
        // text:'Dải cỡ',
        dataIndex:'sizesetname',
        flex: 1
    },{
        xtype: 'actioncolumn',
        width: 25,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 12px; color: black;",
            labelWidth : 0,
            value: 'Dải cỡ'
        },
		'->'
		,
		{
            xtype:'button',
            itemId:'btnSizesetSelect',
            ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm sản phẩm',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

