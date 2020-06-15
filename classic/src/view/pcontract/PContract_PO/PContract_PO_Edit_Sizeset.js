Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Sizeset', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Sizeset',
    id:'PContract_PO_Edit_Sizeset',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{SizeSetStore}'
    },
    columns:[{
        // text:'Dải cỡ',
        dataIndex:'name',
        flex: 1
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
            itemId:'btnThemMoi',
            ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm sản phẩm',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

