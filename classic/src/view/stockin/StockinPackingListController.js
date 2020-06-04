Ext.define('GSmartApp.view.stockin.StockinPackingListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockinpackinglist',
	init: function() {
        this.callParent(arguments);
    },
	onPackingListClose:function(){
		var view = this.getView().up('window');
		view.close();
	}
})