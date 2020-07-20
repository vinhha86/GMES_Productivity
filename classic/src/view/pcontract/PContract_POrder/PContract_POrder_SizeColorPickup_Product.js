Ext.define('GSmartApp.view.pcontract.PContract_POrder_SizeColorPickup_Product', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_SizeColorPickup_Product',
    id:'PContract_POrder_SizeColorPickup_Product',
    
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    }, 
    bind:{
        store:'{PContractProduct_PO_Store}'
    },
    columns:[
        {
            text:'Style',
            dataIndex:'code',
            width: 100
        },{
            text:'Tên SP',
            dataIndex:'name',
            flex: 1
        },
        {
            text:'SL',
            dataIndex:'pquantity',
            width: 90
        }
    ]     
});

