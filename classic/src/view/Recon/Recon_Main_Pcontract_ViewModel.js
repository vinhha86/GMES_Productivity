Ext.define('GSmartApp.view.Recon.Recon_Main_Pcontract_ViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Recon_Main_Pcontract_ViewModel',
	stores: {
		ReconMaterial_Store: {
			type: 'SKUReconStore'
		},
		ReconProduct_Store: {
            type: 'PContractSKUStore'
        },
	},
	data: {
		pcontractid_link: null,
		recondate_to: Ext.Date.add(new Date(), Ext.Date.DAY, 7),
        recondate_from: Ext.Date.add(new Date(), Ext.Date.DAY, -10),

	}
})