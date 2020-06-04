Ext.define('GSmartApp.view.salebill.SalebillCreateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.salebillcreate',
	data: {
        btnplus: true,
        isbtnclose: false,
		isAddnew:true,
		invoice_id:null,
		IsformMaster:false,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
		isStart:false,
		isTabEpc:true
    },
})