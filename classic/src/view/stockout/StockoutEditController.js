Ext.define('GSmartApp.view.stockout.StockoutEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockouttedit_controller',
	listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
				urlBack:'onUrlBack'
            }
        }
    },
    onActivate: function(e, eOpts){
        var store_userfunctions = Ext.data.StoreManager.lookup('store_userfunctions');
        if (null != store_userfunctions){
            var me = this;
            form = me.getView();
            // store_userfunctions.loadFunctions(form,App.Ajax.access_token(),function(records, operation, success){
            //     store_userfunctions.each(function(record) {
            //         var iObject = me.lookupReference(record.get('refid_item'));
            //         if (null != iObject){
            //             if (Ext.isDefined(iObject.hidden)){
            //                 if (record.get('ishidden')){
            //                     iObject.setHidden(true);
            //                 }
            //             }
            //             if (Ext.isDefined(iObject.disabled)){
            //                 if (record.get('isreadonly')){
            //                     iObject.setDisabled(true);
            //                 }
            //             }
            //         }
            //     });                
            // });
        }
    },
    onMaterialFilterKeyup: function() {
        var store_stockout_d = Ext.data.StoreManager.lookup('store_stockout_d'); 
        if (store_stockout_d) {        
            filterField = this.lookupReference('materialFilterField');
            filters = store_stockout_d.getFilters();

            if (filterField.value) {
                this.materialFilter = filters.add({
                    id: 'materialFilter',
                    property: 'sku_name',
                    value: filterField.value,
                    anyMatch: true,
                    caseSensitive: false
                });
            }
            else if (this.materialFilter) {
                filters.remove(this.materialFilter);
                this.materialFilter = null;
            }
        }
    },    
    onCheckDetail: function(grid, rowIndex, colIndex){
        var record = grid.store.getAt(rowIndex);
        var form =Ext.create({
            xtype: 'stockouttocutdwindow',
            reference:'stockouttocutdwindow'
        });
        var viewModel = form.getViewModel();
        viewModel.set('stockout_d',record);
        var store_stockout_pklist_available = Ext.data.StoreManager.lookup('store_stockout_pklist_available');
        if (store_stockout_pklist_available){
            store_stockout_pklist_available.loadAvailable(record.get('skuid_link'),record.get('skucode'),record.get('skutypeid_link'));
        }
        var store_stockout_pklist_tocut = Ext.data.StoreManager.lookup('store_stockout_pklist_tocut');
        if (store_stockout_pklist_tocut){
            store_stockout_pklist_tocut.loadByStockoutDId(record.get('id'));
        }
        form.show();
     },
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    },
    onUrlBack:function(type){
        var store_stockout = Ext.data.StoreManager.lookup('store_stockout'); 
        if (store_stockout) {
            store_stockout.reload();
        }  
        this.redirectTo("stockouttocutmain");
    },
    onLoadData:function(id,type){
        console.log("Load Item Data");
        var store_stockout_d = Ext.data.StoreManager.lookup('store_stockout_d'); 
        if (store_stockout_d) {
            store_stockout_d.loadByStockoutID(id);
        }
    },
    onPushToIVYERP: function(){
        var store_stockout_d = Ext.data.StoreManager.lookup('store_stockout_d');
        
        if (store_stockout_d) {
            //Lay danh sach cac ma vai chinh
            var pushStore = Ext.create('Ext.data.Store', {
                model: 'GSmartApp.model.Stockout_push_ivyerp'
            });            
            var ordercode = '';
            Ext.Array.each(store_stockout_d.data.items, function(rc) {
                if (null != rc.data.listpackage){
                    pushStore.filter('mainskucode', rc.data.mainskucode);
                    if (pushStore.getCount() > 0){
                        pushStore.getAt(0).set('comment', pushStore.getAt(0).get('comment') + rc.data.listpackage + '\r\n');
                    }
                    else {
                        var newRecord =new GSmartApp.model.Stockout_push_ivyerp({
                            mainskucode: rc.data.mainskucode, 
                            comment: rc.data.listpackage + '\r\n'      
                        });        
                        pushStore.insert(0,newRecord);            
                    }

                    //     listStockout = listStockout + rc.data.listpackage + '\n';
                }
                ordercode = rc.data.pordercode;
            });
            pushStore.clearFilter();
            // console.log(pushStore);
            
            var form =Ext.create({
                xtype: 'stockoutedit_pushivyerp',
                reference:'stockoutedit_pushivyerp'
            });
            var viewModel = form.getViewModel();
            viewModel.set('ordercode',ordercode);
            viewModel.set('listStockout',pushStore);
            form.show();
        }
    }
});
