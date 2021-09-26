Ext.define('GSmartApp.view.Recon.Recon_Main_Pcontract', {
    extend: 'Ext.container.Container',
    xtype: 'Recon_Main_Pcontract',
    id: 'Recon_Main_Pcontract',
    itemId: 'Recon_Main_Pcontract',
    controller: 'Recon_Main_Pcontract_Controller',
    viewModel: {
        type: 'Recon_Main_Pcontract_ViewModel'
    },
    layout: {
        type: 'border'
    },
    items: [
        {
            region: 'west',
            width: 300,
            xtype: 'Recon_ProductTree'
        },
        {
            region: 'center',
            xtype: 'Recon_D_Pcontract'
        }
    ]
});
