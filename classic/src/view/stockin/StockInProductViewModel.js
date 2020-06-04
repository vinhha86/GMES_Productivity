Ext.define('GSmartApp.view.stockin.StockInProductViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.stockinproduct',
	data: {
		urlback:'',
		IsformMaster:false,
		isTabEpc:true,
		clsbtn:'red-button',
		clsbtnStart:'blue-button',
		clsbtnStop:'',
		isStart:false,
		clsbtnSkuError:""
    },
})