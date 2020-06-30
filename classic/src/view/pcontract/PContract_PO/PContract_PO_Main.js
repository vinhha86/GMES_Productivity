Ext.define('GSmartApp.view.pcontract.PContract_PO_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Main',
    id: 'PContract_PO_Main',
    controller: 'PContract_POController',    
    // viewModel: {
    //     type: 'PContract_POViewModel'
    // },    
    IdProduct: 0,
    pcontractid_link: 0,
    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'border',
            items:[
                {
                    region: 'north',
                    height: '50%',
                    xtype: 'PContract_PO',
                    border: true,
                    margin: 1
                },
                {
                    region: 'center',
                    xtype: 'PContract_PO_Delivery',
                    border: true,
                    margin: 1
                }
            ]

        }, 
        {
            region: 'west',
            width: '30%',
            xtype: 'PContract_PO_ProductList',
            border: true,
            margin: 1
        },
        // {
        //     xtype: 'PContract_PO_Factories',
        //     id: 'panel_factories',
        //     width: '30%',
        //     region: 'east',
        //     border: true,
        //     hidden: true  
        // }  
    ]
})