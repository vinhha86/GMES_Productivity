Ext.define('GSmartApp.view.stockout.Balance_Main', {
    extend: 'Ext.container.Container',
    xtype: 'Balance_Main',
    controller: 'Balance_Main_ViewController',
    viewModel: 'Balance_ViewModel',
	layout: {
        type: 'border'
    },
    items: [
        {
            region: 'west',
            width: 200,
            xtype: 'Balance_Group',
            id: 'Balance_Group',
        },
        {
            region: 'center',
            xtype: 'Balance_D'
        }
    ] 
});
