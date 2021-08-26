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
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.setGroupField(null);

        if(record.get('type') == 5){ // khoang
            var spaceepc = record.get('spaceepc');
            var stockid_link = record.get('orgid_link');
            WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
        }
        if(record.get('type') == 3 && record.get('khoangKhongXacDinh') == true){ // khoang KXD
            var spaceepc = null;
            var stockid_link = record.get('orgid_link');
            WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
        }
        
        // 
        this.filterWarehouseStore();
        
    },
    filterWarehouseStore: function(){
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('WarehouseStore');

        var maHangFilter = viewModel.get('maHangFilter');
        var donHangFilter = viewModel.get('donHangFilter') == null ? '' : viewModel.get('donHangFilter').toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            var isOK = true;
            var contractcode = rec.get('contractcode') == null ? '' : rec.get('contractcode').toLowerCase();
            if(
                !contractcode.includes(donHangFilter)
            ){
                isOK = false;
                return isOK;
            }
            if(maHangFilter != null && rec.get('skuid_link') != maHangFilter){
                isOK = false;
                return isOK;
            }

            return isOK;
        });
    }
})