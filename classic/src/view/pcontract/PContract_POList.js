Ext.define('GSmartApp.view.pcontract.PContract_POList', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POList',
    id:'PContract_POList',

    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
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
        store:'{PContractPOList}'
    },
    columns:[{
        text:'PO Buyer',
        dataIndex:'po_buyer',
        width: 75
    },{
        text:'PO Vendor',
        dataIndex:'po_vendor',
        width: 75
    },{
        text:'Ngày giao',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        width: 75
    },{
        text:'SL',
        dataIndex:'po_quantity',
        flex: 1
    }]
});

