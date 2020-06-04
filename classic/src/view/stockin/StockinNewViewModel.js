Ext.define('GSmartApp.view.stockin.StockinNewViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.stockinnew',
	data: {
        isEdit: false,
		urlback:'',
		stockintypeid_link:1,
		IsformMaster:false,
		isTabEpc:true,
		isNhapMoi:true,
		isEdit:true,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
		clsbtnSkuError:'',
		isStart:false
    },
})