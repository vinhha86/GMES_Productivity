Ext.define('GSmartApp.view.stockout.StockoutToCutController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockouttocut',
    init: function() {
        this.callParent(arguments);
       
        var store_waiting = Ext.data.StoreManager.lookup('store_waiting'); 
        if (store_waiting) {
            store_waiting.loadFilter(
                null,//ordercode
                '2',//orderstatus
                null,//granttoorgid_link
                null,//collection
                null,//season
                null,//salaryyear
                null,//salarymonth
                null,//processingdate_from
                null//processingdate_to
                );
            // store_waiting.loadFilter('','0,1,2,3','','','','','','','');
        }   
        var store_stockout = Ext.data.StoreManager.lookup('store_stockout'); 
        if (store_stockout) {
            store_stockout.loadByDate(2, new Date(),new Date(), '');
        }          
    },
    onActivate: function(e, eOpts){
        // var store_waiting = Ext.data.StoreManager.lookup('store_waiting'); 
        // if (store_waiting) {
        //     store_waiting.loadByDate(new Date());
        //     //console.log(store_waiting);
        // }   
        // var store_stockout = Ext.data.StoreManager.lookup('store_stockout'); 
        // if (store_stockout) {
        //     store_stockout.loadByDate(2, new Date(),new Date(), '');
        // }  

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
    onOrderWaitingRefreshTap: function(){
        var store_waiting = Ext.data.StoreManager.lookup('store_waiting'); 
        if (store_waiting) {
            store_waiting.loadFilter(
                null,//ordercode
                '2',//orderstatus
                null,//granttoorgid_link
                null,//collection
                null,//season
                null,//salaryyear
                null,//salarymonth
                null,//processingdate_from
                null//processingdate_to
                );
        }   
    },

    onPOrderFilterKeyup: function() {
        var panel_stockoutlist = this.getView().items.get('panel_stockoutlist');
        filterField = this.lookupReference('porderFilterField');
        filters = panel_stockoutlist.store.getFilters();

        if (filterField.value) {
            this.porderFilter = filters.add({
                id: 'porderFilter',
                property: 'pordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter) {
            filters.remove(this.porderFilter);
            this.porderFilter = null;
        }
    },
    onMaterialFilterKeyup: function() {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('materialFilterField'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.materialFilter = filters.add({
                id: 'materialFilter',
                property: 'skucode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.materialFilter) {
            filters.remove(this.materialFilter);
            this.materialFilter = null;
        }
    },    

    //When pressing get latest data
    onSearchTap: function(){
        var stockoutdate_from = this.lookupReference('stockoutdate_from');
        var stockoutdate_to = this.lookupReference('stockoutdate_to');
        var store_stockout = Ext.data.StoreManager.lookup('store_stockout'); 
        if (store_stockout) {
            store_stockout.loadByDate(2, stockoutdate_from.getValue(),stockoutdate_to.getValue());
            //console.log(store_waiting);
        }  

        // var store_stockout_d_tocut = Ext.data.StoreManager.lookup('store_stockout_d_tocut'); 
        // if (store_stockout_d_tocut) {
        //     store_stockout_d_tocut.loadByDate(2, stockoutdate_from.getValue(),stockoutdate_to.getValue(),'');
        //     //console.log(store_waiting);
        // }  
    }, 
    
    onOrderListTap: function(){
        //var panel_orderwaiting = this.getView().up().items.get('panel_orderwaiting');
        var panel_orderwaiting = this.getView().items.get('panel_orderwaiting');
        if (null != panel_orderwaiting){
            if (panel_orderwaiting.getHidden())
            panel_orderwaiting.setHidden(false);
            else
            panel_orderwaiting.setHidden(true);
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
    onDrop: function(node, data, dropRec, dropPosition){
        cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
        txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');

        //var params=new Object();
        var params =new GSmartApp.model.Stockout({
            id: null, 
            orgrootid_link: null,
            stockoutorderid_link: null,
            stockoutcode: null,
            stockoutdate: null,
            stockouttypeid_link: null,
            orgid_from_link: null,
            orgid_to_link: 25,
            porderid_link: data.records[0].get('id'),
            pordercode: data.records[0].get('ordercode'),
            shipperson: null,
            totalpackage: null,
            totalyds: null,
            totalpackagecheck: null,
            totalydscheck: null,
            totalpackageprocessed: null,
            totalydsprocessed: null,
            totalm3: null,
            totalnetweight: null,
            totalgrossweight: null,
            p_skuid_link: null,
            extrainfo: null,
            status: null,
            usercreateid_link: null,
            timecreate: null,
            lastuserupdateid_link: null,
            lasttimeupdate: null            
        });

		GSmartApp.Ajax.post('/api/v1/stockout/createstockouttocut', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
				if (success) {
                    var store_stockout = Ext.data.StoreManager.lookup('store_stockout');
                    store_stockout.reload();
				} else {
                    Ext.MessageBox.show({
                        title: "Xuất cắt",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    var store_stockout = Ext.data.StoreManager.lookup('store_stockout');
                    store_stockout.reload();     
                }
            });         
    },
    onStockoutItemDelete: function(rid, rowIndex, colIndex){
        Ext.Msg.confirm('Phiếu xuất kho', 'Bạn có thực sự muốn xóa phiếu? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var store_stockout = Ext.data.StoreManager.lookup('store_stockout');
                    var record = store_stockout.getAt(rowIndex);
                    if (record.get('status') == 0){
                               
                        var params=new Object();
                        params.stockoutid = record.get('id');

                        GSmartApp.Ajax.post('/api/v1/stockout/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                var store_stockout = Ext.data.StoreManager.lookup('store_stockout');
                                store_stockout.reload();
                            } else {
                                Ext.MessageBox.show({
                                    title: "Xuất cắt",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        });                
                    }
                }
            }
        );        
  
    },    
    onSearchOrderTap: function(){
        var ordercode = this.lookupReference('txtorderwaiting_ordercode').getValue();
        //Tim kiem theo ordercode
        var store_waiting = Ext.data.StoreManager.lookup('store_waiting'); 
        if (store_waiting) {
            store_waiting.loadFilter(ordercode,'0,1,2,3','','','','','','','');
        }
    },
    onStockoutEdit: function(grid, rowIndex, colIndex){
        var store_stockout = Ext.data.StoreManager.lookup('store_stockout'); 
        if (store_stockout) {
            var record = store_stockout.getAt(rowIndex);
            this.redirectTo("stockouttocutmain/"+record.get('id')+"/edit");
        }  

    }    
});
