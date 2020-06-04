Ext.define('GSmartApp.view.stockout.POrderWaitingListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.porderwaitinglist',
    init: function() {
        // this.callParent(arguments);
        var store_stockout_waitinglist = Ext.data.StoreManager.lookup('store_stockout_waitinglist'); 
        if (store_stockout_waitinglist) {
            store_stockout_waitinglist.loadByDate();
        }  
    },

    onPOrderFilterKeyup: function() {
        var store_stockout_waitinglist = Ext.data.StoreManager.lookup('store_stockout_waitinglist'); 
        if (store_stockout_waitinglist) {

            filterField = this.lookupReference('porderFilterField');
            filters = store_stockout_waitinglist.getFilters();

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
        var store_stockout_waitinglist = Ext.data.StoreManager.lookup('store_stockout_waitinglist'); 
        if (store_stockout_waitinglist) {
            store_stockout_waitinglist.reload();
        }  
    }, 
    
    onOrderListTap: function(){
        //var panel_orderwaiting = this.getView().up().items.get('panel_orderwaiting');
        var panel_ordergranted = this.getView().items.get('panel_ordergranted');
        if (null != panel_ordergranted){
            if (panel_ordergranted.getHidden())
                panel_ordergranted.setHidden(false);
            else
                panel_ordergranted.setHidden(true);
        }
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
        console.log(dropPosition);
        var parmdata =new Array();
        var order=new Object();
        order.porderid = data.records[0].get('porderid_link');
        order.ordercode = data.records[0].get('ordercode');
        order.productiondate = new Date();
        parmdata.push(order);

        var params=new Object();
        params.granttoorgid_link = data.records[0].get('granttoorgid_link');
        params.data = parmdata;

        Ext.Ajax.request({
            url: App.Utils.url+'/ivyadmin/api/v1/pprocess/setready_erp',
            method:'POST',
            cors: true,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json",
				'authorization': 'Bearer ' + access_token
			 },
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode(params),
            success : function(response,options ) {
                var store_stockout_waitinglist = Ext.data.StoreManager.lookup('store_stockout_waitinglist'); 
                if (store_stockout_waitinglist) {
                    store_stockout_waitinglist.reload();
                }  
            },
            failure :function(response,options){
                Ext.Msg.show({ 
                    title: 'Chuẩn bị sản xuất lệnh thất bại',
                    msg: null, 
                    buttons: [{
                        itemId: 'cancel',   
                        text: "Đóng", 
                    }]
                    });
            }
        });            
    },
    onStockoutItemDelete: function(rid, rowIndex, colIndex){
        var store_stockout = Ext.data.StoreManager.lookup('store_stockout');
        var record = store_stockout.getAt(rowIndex);
        if (record.get('status') == 0){
            var access_token = App.Ajax.access_token();
                    
            var params=new Object();
            params.stockoutid = record.get('id');

            Ext.Ajax.request({
                url: App.Utils.url+'/ivyadmin/api/v1/stockout/delete',
                method:'POST',
                cors: true,
                headers :{
                    'Accept': "application/json", 
                    'Content-Type':"application/json",
                    'authorization': 'Bearer ' + access_token
                },
                useDefaultXhrHeader: false,
                params: Ext.JSON.encode(params),
                success : function(response,options ) {
                    var store_stockout = Ext.data.StoreManager.lookup('store_stockout');
                    store_stockout.reload();
                },
                failure :function(response,options){
                    console.log(response.responseText);
                    console.log(response);
                }
            });
        }  
    },    
    onSearchOrderTap: function(){
        var ordercode = this.lookupReference('txtorderwaiting_ordercode').getValue();
        //Tim kiem theo ordercode
        var store_waiting = Ext.data.StoreManager.lookup('store_waiting'); 
        if (store_waiting) {
            store_waiting.loadFilter(ordercode,'0,1,2','','','','','','','');
        }
    },
    onRemoveReady: function(rid, rowIndex, colIndex){
        Ext.Msg.confirm('Phiếu xuất kho', 'Bạn có thực sự muốn xóa phiếu? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var store_stockout_waitinglist = Ext.data.StoreManager.lookup('store_stockout_waitinglist');
                    var record = store_stockout_waitinglist.getAt(rowIndex);

                    var access_token = App.Ajax.access_token();
        
                    var data =new Array();
                    var order=new Object();
                    order.porderid = record.get('porderid_link');
                    order.ordercode = record.get('pordercode');
                    order.comment = '';
                    data.push(order);
            
                    var params=new Object();
                    params.granttoorgid_link = -1;
                    params.data = data;
            
                    Ext.Ajax.request({
                        url: App.Utils.url+'/ivyadmin/api/v1/pprocess/unready_erp',
                        method:'POST',
                        cors: true,
                        headers :{
                            'Accept': "application/json", 
                            'Content-Type':"application/json",
                            'authorization': 'Bearer ' + access_token
                         },
                        useDefaultXhrHeader: false,
                        params: Ext.JSON.encode(params),
                        success : function(response,options ) {
                            store_stockout_waitinglist.reload();
                        },
                        failure :function(response,options){
                            Ext.Msg.show({ 
                                title: 'Hủy chuẩn bị sản xuất thất bại',
                                msg: null, 
                                buttons: [{
                                  itemId: 'cancel',   
                                  text: "Đóng", 
                                }]
                              });
                        }
                    }); 
                }
            }
        );    
    },
    onSTTEdit: function(editor, e){
        console.log(e.record.get('priority'));
        var access_token = App.Ajax.access_token();
        
        var params=new Object();
        params.ordercode = e.record.get('pordercode');
        params.priority = e.record.get('priority');

        Ext.Ajax.request({
            url: App.Utils.url+'/ivyadmin/api/v1/porders/updatepriority',
            method:'POST',
            cors: true,
            headers :{
                'Accept': "application/json", 
                'Content-Type':"application/json",
                'authorization': 'Bearer ' + access_token
             },
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode(params),
            success : function(response,options ) {
                console('update priority sucess');
            },
            failure :function(response,options){
                console('update priority fail');
            }
        }); 
    }
});
