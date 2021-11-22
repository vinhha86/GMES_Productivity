Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_Edit_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_StockoutOrder_Edit_D_Controller',
    init: function () {
        
    },
    control: {
        '#POrder_Grant_Plan_StockoutOrder_Edit_D': {
            afterrender: 'onAfterrender',
            itemclick: 'onItemclick'
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date_list = viewModel.get('date_list');
        var pordergrantid_link = viewModel.get('pordergrantid_link');
        var id = viewModel.get('id');

        // 
        if(id == null){ // create new stockout_order
            m.loadNewInfo();
        }else{ // old stockout_order detail
            m.loadInfo();
        }
    },
    loadNewInfo: function(){
        // load danh sách vải dựa theo ngày chọn, pordergrant
        // dựa theo số lượng sản phẩm tính ra số m yêu cầu
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date_list = viewModel.get('date_list');
        var pordergrantid_link = viewModel.get('pordergrantid_link');
        var id = viewModel.get('id');

        me.setLoading(true);
        var params = new Object();
        params.date_list = date_list;
        params.pordergrantid_link = pordergrantid_link;
        params.balance_limit = 1;

        GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bypordergrant_date', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        console.log(response);
                        var responseData = response.data;
                        m.setStoreData(responseData);
                    }
                }
            }
        )
    },
    setStoreData: function(responseData){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date = m.getEarliestDate();
        var dateXuat = new Date().setDate(date.getDate()-3);
        var dateTo = new Date().setDate(date.getDate()-2);
        dateXuat = new Date(dateXuat);
        dateTo = new Date(dateTo);

        var storeData = new Array();
        for(var i = 0; i < responseData.length; i++) {
            var responseObj = responseData[i];
            var storeObj = new Object();
            storeObj.id = null;
            storeObj.stockoutorderid_link = null;
            storeObj.material_skuid_link = responseObj.mat_skuid_link;
            storeObj.colorid_link = responseObj.mat_sku_color_id;
            storeObj.unitid_link = 1;
            storeObj.totalpackage = 0;
            storeObj.totalmet = responseObj.mat_sku_demand == null ? 0 : responseObj.mat_sku_demand;
            storeObj.totalyds = storeObj.totalmet * 1.094;
            storeObj.skucode = responseObj.mat_sku_code;
            storeObj.skuname = responseObj.mat_sku_name;
            storeObj.sku_product_desc = responseObj.mat_sku_desc;
            storeObj.coKho = responseObj.mat_sku_size_name;
            storeObj.color_name = responseObj.mat_sku_color_name;
            storeObj.date_to_vai_yc = dateTo;
            storeObj.date_xuat_yc = dateXuat;
            storeData.push(storeObj);
        }

        var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
        Stockout_order_d_store.removeAll();
        Stockout_order_d_store.insert(0, storeData);
        Stockout_order_d_store.commitChanges();
    },
    loadInfo: function(){},
    onEdit: function(editor, context, e){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();
        // console.log(context);

        var Stockout_order_d_store = viewModel.getStore('Stockout_order_d_store');
        if(context.value instanceof Date || context.value == null){
            Stockout_order_d_store.commitChanges();
        }else{
            Stockout_order_d_store.rejectChanges();
        }
    },
    getEarliestDate: function(){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var date_list = viewModel.get('date_list');
        // console.log(date_list);
        var date = date_list[0];
        for(var i=0;i<date_list.length;i++){
            if(date > date_list[i]){
                date = date_list[i];
            }
        }
        return new Date(date);
    },
    onItemclick: function( grid, record, item, index, e, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = m.getViewModel();

        var pordergrantid_link = viewModel.get('pordergrantid_link');
        var skuid_link = record.get('material_skuid_link');
        var stockoutorderid_link = record.get('stockoutorderid_link');
        // console.log(record);
        // console.log(stockoutorderid_link);
        // console.log(skuid_link);
        // console.log(pordergrantid_link);

        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.loadBySku_pordergrant_stockoutorder(stockoutorderid_link, skuid_link, pordergrantid_link);
        // loadBySku_pordergrant_stockoutorder
    }
})