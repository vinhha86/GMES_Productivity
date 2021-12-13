

Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_SKU_Plan_Controller',
    init: function () {
    },

    control: {
        '#POrder_Grant_SKU_Plan_View': {
            afterrender: 'onAfterrender',
            // itemclick: 'onItemclick',
            pivotitemclick: 'onPivotitemclick'
        },
        '#btnThoat': {
            click: 'onThoat',
        },
        // '#slTong': {
        //     afterrender: 'onAfterrenderSltong',
        // },
        // '#lineinfo': {
        //     afterrender: 'onAfterrenderLineinfo',
        // },
    },
    listen: {
        store: {
            'POrderGrant_SKU_PlanStore': {
                'loadStore_byPorderGrant_Done': 'onloadStore_byPorderGrant_Done'
            }
        }
    },

    onThoat: function(){
        this.getView().up('window').close();
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var sourceView = viewModel.get('sourceView');
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');
        // var startDate = eventRecord.get('startDate');
        // var endDate = eventRecord.get('endDate');
        var startDate = eventRecord.get('StartDate');
        var endDate = eventRecord.get('EndDate');

        console.log(eventRecord);
        viewModel.set('lineinfo', eventRecord.get('lineinfo'));

        var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
        if(sourceView == 'SchedulePlan'){
            me.setLoading(true);
            // POrderGrant_SKU_PlanStore.loadStore_byPorderGrant(porder_grantid_link, startDate, endDate);
            POrderGrant_SKU_PlanStore.loadStore_byPorderGrant_async(porder_grantid_link, startDate, endDate);
            POrderGrant_SKU_PlanStore.load({
                scope: this,
                callback: function (records, operation, success) {
                    if (success) {
                        var items = POrderGrant_SKU_PlanStore.getData().items;
                        console.log(items);
                        var porder_grant_skuid_link_arr = new Array();
                        var total_porderGrant_SKU_grantamount = 0;
                        for(var i=0; i<items.length; i++){
                            var porder_grant_skuid_link = items[i].get('porder_grant_skuid_link');
                            if(!porder_grant_skuid_link_arr.includes(porder_grant_skuid_link)){
                                porder_grant_skuid_link_arr.push(porder_grant_skuid_link);
                                total_porderGrant_SKU_grantamount += items[i].get('porderGrant_SKU_grantamount');
                            }
                        }
                        viewModel.set('total_porderGrant_SKU_grantamount', total_porderGrant_SKU_grantamount);
                    }
                    POrderGrant_SKU_PlanStore.fireEvent('loadStore_byPorderGrant_Done');
                }
            });
        }

        // console.log(sourceView);
        // console.log(eventRecord);
        // console.log(porder_grantid_link);
        // console.log(startDate);
        // console.log(endDate);
    },
    onloadStore_byPorderGrant_Done: function () {
        this.getView().setLoading(false);
    },

    onPivotGroupExpand: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    },

    onPivotGroupCollapse: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" collapsed on ' : 'All groups collapsed on ') + type);
    },
    onPivotUpdate: function(editor, context) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        // Ext.log('Event "pivotupdate" fired');
        var viewModel = this.getViewModel();
        var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
        for (i=0;i<POrderGrant_SKU_PlanStore.data.items.length;i++){
            var record = POrderGrant_SKU_PlanStore.data.items[i];
            // console.log(record);
            if (null != record.modified){
                // console.log(record);
                me.setLoading(true);
                //Update to DB
                var params = new Object();
                params.data = record.data;
        
                GSmartApp.Ajax.post('/api/v1/porder_grant_sku_plan/porder_grant_sku_plan_update', Ext.JSON.encode(params),
                    function (success, response, options) {
                        me.setLoading(false);
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if(response.respcode == 200){
                                POrderGrant_SKU_PlanStore.commitChanges();
                            }else{
                                POrderGrant_SKU_PlanStore.rejectChanges();
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });            
                            }            
                        }else{
                            POrderGrant_SKU_PlanStore.rejectChanges();
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: "Lưu thất bại. Xin kiểm tra lại kết nối mạng.",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });          
                        }
                    })                
            }
        }
    }, 
    onBeforeedit: function ( editor, context, eOpts ) {
        if (context.record.get('leftAxisKey') == "grandtotal" || context.column.text == "Tổng") {
            context.cancel = true;
            return false;
        }
    },
    onAmount_Edit:function(editor, context){
        // e.record.data[e.field] = e.value;
        // console.log(context);
        if (context.record.get('leftAxisKey') == "grandtotal" || context.column.text == "Tổng") {
            context.cancel = true;
            return false;
        }
        // context.record.commit();
    },

    onItemclick: function( thisView, record, item, index, e, eOpts ){
        console.log(record);
        // console.log(item);
        var viewModel = this.getViewModel();
        var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
        for (i=0;i<POrderGrant_SKU_PlanStore.data.items.length;i++){
            var record = POrderGrant_SKU_PlanStore.data.items[i];
            console.log(record);
        }
    },
    onPivotitemclick: function(params, e, eOpts){
        // console.log(params);
        var name = params.leftItem.name;
        var viewModel = this.getViewModel();
        var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
        var porder_grant_skuid_link = null;

        for (i=0;i<POrderGrant_SKU_PlanStore.data.items.length;i++){
            var record = POrderGrant_SKU_PlanStore.data.items[i];
            if(record.get('skuCode_string') == name){
                // console.log(record);
                porder_grant_skuid_link = record.get('porder_grant_skuid_link');
                break;
            }
        }

        if(porder_grant_skuid_link != null){
            // CODE HERE
        }
    },

    onAfterrenderSltong: function(component){

    },
    onAfterrenderLineinfo: function(component){

    },
})