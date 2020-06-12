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
        text:'Dải cỡ',
        dataIndex:'name',
        flex: 1
    }]
});

