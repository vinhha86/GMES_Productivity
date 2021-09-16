Ext.define('GSmartApp.view.balance.Balance_Main_Pcontract', {
    extend: 'Ext.container.Container',
    xtype: 'Balance_Main_Pcontract',
    id: 'Balance_Main_Pcontract',
    itemId: 'Balance_Main_Pcontract',
    controller: 'Balance_Main_Pcontract_Controller',
    layout: {
        type: 'border'
    },
    items: [
        {
            region: 'west',
            width: 200,
            xtype: 'PContractProductTreeView'
        },
        {
            region: 'center',
            xtype: 'Balance_D_Pcontract'
        }
    ]
});
