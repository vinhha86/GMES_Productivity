Ext.define('GSmartApp.view.balance.Balance_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Balance_Main',
    controller: 'Balance_Main_Controller',
    viewModel: {
        type: 'Balance_ViewModel'
    },    
	layout: {
        type: 'border'
    },
    items: [
        {
            region: 'west',
            width: 250,
            xtype: 'Balance_Product',
            id: 'Balance_Product',
        },
        {
            region: 'center',
            xtype: 'Balance_D'
        }
    ] 
});
