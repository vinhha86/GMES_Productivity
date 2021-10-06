Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_SKU_Plan_Controller',
    init: function () {

    },
    control: {
        '#POrder_Grant_SKU_Plan_View': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat',
        },
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
        var startDate = eventRecord.get('startDate');
        var endDate = eventRecord.get('endDate');

        var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
        if(sourceView == 'SchedulePlan'){
            me.setLoading(true);
            POrderGrant_SKU_PlanStore.loadStore_byPorderGrant(porder_grantid_link, startDate, endDate);
        }
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
        var viewmodel = this.getViewModel();
        var POrderGrant_SKU_PlanStore = viewmodel.getStore('POrderGrant_SKU_PlanStore');
        for (i=0;i<POrderGrant_SKU_PlanStore.data.items.length;i++){
            var record = POrderGrant_SKU_PlanStore.data.items[i];
            // console.log(record);
            if (null != record.modified){
                // me.setLoading(true);
                //Update to DB
                var params = new Object();
                params.data = record.data;
        
                GSmartApp.Ajax.post('/api/v1/porder_grant_sku_plan/porder_grant_sku_plan_update', Ext.JSON.encode(params),
                    function (success, response, options) {
                        // me.setLoading(false);
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
    onAmount_Edit:function(editor, context){
        // e.record.data[e.field] = e.value;
        console.log(context);
        if (context.record.get('leftAxisKey') == "grandtotal" || context.column.text == "Tổng") {
            context.cancel = true;
            return false;
        }
        // context.record.commit();
    },
})