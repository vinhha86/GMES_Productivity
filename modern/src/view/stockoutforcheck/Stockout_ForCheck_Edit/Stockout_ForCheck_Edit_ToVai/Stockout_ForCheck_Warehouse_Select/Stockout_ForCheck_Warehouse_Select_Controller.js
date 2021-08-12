Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit.Stockout_ForCheck_Edit_ToVai.Stockout_ForCheck_Warehouse_Select_Controller', {
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