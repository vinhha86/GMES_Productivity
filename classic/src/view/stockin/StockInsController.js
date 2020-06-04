Ext.define('GSmartApp.view.stockin.StockInController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockins',
    init: function() {
        this.callParent(arguments);
    },
	onMenuChildTap: function(menu, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record.getId());
        }
    },

});
