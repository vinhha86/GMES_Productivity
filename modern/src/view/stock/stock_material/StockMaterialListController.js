Ext.define('GSmartApp.view.stock.stock_material.StockMaterialListController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.StockMaterialListController',
	init: function () {
		this.onLoad();
	},
	control: {
        // '#Stockout_ForCheck_Warehouse_Select':{
        //     childtap: 'onChildTap'
        // },
	},
    onChildTap: function(list, location, eOpts){
        // console.log(location);
        this.fireEvent('onSelectValue', location.record)
    },
    onLoad: function(){
        var viewModel = this.getViewModel();
        var record = viewModel.get('record');

        if(record.get('type') == 5){ // khoang
            var spaceepc = record.get('spaceepc');
            var stockid_link = record.get('orgid_link');
            var WarehouseStore = viewModel.getStore('WarehouseStore');
            WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
        }
        if(record.get('type') == 3 && record.get('khoangKhongXacDinh') == true){ // khoang KXD
            var spaceepc = null;
            var stockid_link = record.get('orgid_link');
            var WarehouseStore = viewModel.getStore('WarehouseStore');
            WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
        }
    }
})