Ext.define('GSmartApp.view.Recon.Recon_Main_Pcontract_ViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.Recon_Main_Pcontract_ViewModel',
	stores: {
		SKUReconStore: {
			type: 'SKUReconStore'
		},
		ReconProductTree_Store: {
            type: 'PContractProductTreeStore'
        },
	},
	data: {
		pcontractid_link: null
	}
})