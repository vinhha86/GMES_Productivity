Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_StockoutOrder_Edit_ViewController',
    init: function () {
        
    },
    control: {
        '#POrder_Grant_Plan_StockoutOrder_Edit_View': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat',
        },
        '#btnCreate': {
            click: 'onCreate',
        },
        '#btnAdd': {
            click: 'onAddWarehouse',
        },
        '#btnRemove': {
            click: 'onRemovePkl',
        },
        '#btnTest': {
            click: 'onTest',
        },
    },
    onTest: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date_list = viewModel.get('date_list');
        var pordergrantid_link = viewModel.get('pordergrantid_link');
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');

        console.log(WarehouseStore.getData().items);
        console.log(Stockout_order_pkl_Store.getData().items);
        
        // console.log(date_list);
        // console.log(pordergrantid_link);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onCreate: function(){
        console.log('btn create pressed');
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date_list = viewModel.get('date_list');
        var pordergrantid_link = viewModel.get('pordergrantid_link');
    },
    onAddWarehouse: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var Warehouse_View = me.down('#POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Warehouse');
        var Pkl_View = me.down('#POrder_Grant_Plan_StockoutOrder_Edit_Pkl');

        var warehouse_selection = Warehouse_View.getSelectionModel().getSelection();
        console.log(warehouse_selection);

        // add vao danh sach pkl, remove o danh sach warehouse
        
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');

        // console.log(WarehouseStore.getData().items);
        // console.log(Stockout_order_pkl_Store.getData().items);

        var newPkl_list = new Array();
        for(var i=0;i<warehouse_selection.length;i++){
            var warehouse_obj = warehouse_selection[i];
            var newPkl = new Object();
            newPkl.id = null;
            newPkl.stockoutorderid_link = null;
            newPkl.stockoutorderdid_link = null;
            newPkl.spaceString = warehouse_obj.get('spaceString');
            newPkl.lotnumber = warehouse_obj.get('lotnumber');
            newPkl.packageid = warehouse_obj.get('packageid');
            newPkl.epc = warehouse_obj.get('epc');
            newPkl.skuid_link = warehouse_obj.get('skuid_link');
            newPkl.colorid_link = warehouse_obj.get('colorid_link');
            newPkl.width = warehouse_obj.get('width_met');
            newPkl.width_met = warehouse_obj.get('width_met');
            newPkl.width_met_check = 0;
            newPkl.width_yds = warehouse_obj.get('width_yds');
            newPkl.width_yds_check = 0;
            newPkl.metorigin = warehouse_obj.get('met');
            newPkl.metcheck = 0;
            newPkl.ydsorigin = warehouse_obj.get('yds');
            newPkl.ydscheck = 0;
            newPkl.netweight = warehouse_obj.get('netweight');
            newPkl.grossweight = warehouse_obj.get('grossweight');
            newPkl.spaceepc_link = warehouse_obj.get('spaceepc_link');
            newPkl.status = 1;
            newPkl_list.push(newPkl);
        }
        WarehouseStore.remove(warehouse_selection);
        WarehouseStore.commitChanges();
        Stockout_order_pkl_Store.insert(0, newPkl_list);
        Stockout_order_pkl_Store.commitChanges();
    },
    onRemovePkl: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var Warehouse_View = me.down('#POrder_Grant_Plan_StockoutOrder_Edit_Pkl_Warehouse');
        var Pkl_View = me.down('#POrder_Grant_Plan_StockoutOrder_Edit_Pkl');

        var pkl_selection = Pkl_View.getSelectionModel().getSelection();
        console.log(pkl_selection);

        // add vao danh sach pkl, remove o danh sach warehouse
        
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');

        // console.log(WarehouseStore.getData().items);
        // console.log(Stockout_order_pkl_Store.getData().items);
        return;

        var newWarehouse_list = new Array();
        for(var i=0;i<pkl_selection.length;i++){
            var pkl_obj = pkl_selection[i];
            var newWarehouse = new Object();
            newWarehouse.id = null;
            newWarehouse.stockoutorderid_link = null;
            newWarehouse.stockoutorderdid_link = null;
            newWarehouse.spaceString = pkl_obj.get('spaceString');
            newWarehouse.lotnumber = pkl_obj.get('lotnumber');
            newWarehouse.packageid = pkl_obj.get('packageid');
            newWarehouse.epc = pkl_obj.get('epc');
            newWarehouse.skuid_link = pkl_obj.get('skuid_link');
            newWarehouse.colorid_link = pkl_obj.get('colorid_link');
            newWarehouse.width = pkl_obj.get('width_met');
            newWarehouse.width_met = pkl_obj.get('width_met');
            newWarehouse.width_met_check = 0;
            newWarehouse.width_yds = pkl_obj.get('width_yds');
            newWarehouse.width_yds_check = 0;
            newWarehouse.metorigin = pkl_obj.get('met');
            newWarehouse.metcheck = 0;
            newWarehouse.ydsorigin = pkl_obj.get('yds');
            newWarehouse.ydscheck = 0;
            newWarehouse.netweight = pkl_obj.get('netweight');
            newWarehouse.grossweight = pkl_obj.get('grossweight');
            newWarehouse.spaceepc_link = pkl_obj.get('spaceepc_link');
            newWarehouse.status = 1;
            newWarehouse_list.push(newWarehouse);
        }
        Stockout_order_pkl_Store.remove(pkl_selection);
        Stockout_order_pkl_Store.commitChanges();
        WarehouseStore.insert(0, newWarehouse_list);
        WarehouseStore.commitChanges();
    },
})