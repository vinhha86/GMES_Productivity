Ext.define('GSmartApp.view.stockoutforcheck.stockout_forcheck_edit.stockout_forcheck_edit_tovai.Stockout_ForCheck_Warehouse_Select_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_ForCheck_Warehouse_Select_Controller',
	init: function () {
		
	},
	control: {
        '#Stockout_ForCheck_Warehouse_Select':{
            childtap: 'onChildTap'
        },
	},
    onChildTap: function(list, location, eOpts){
        // console.log(location);
        this.fireEvent('onSelectValue', location.record)
    }
})