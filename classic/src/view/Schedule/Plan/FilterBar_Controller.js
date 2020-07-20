Ext.define('GSmartApp.view.Schedule.Plan.FilterBar_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FilterBar_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        
        var VendorStore = viewmodel.getStore('Vender');
        var EndBuyerStore = viewmodel.getStore('EndBuyer');

        VendorStore.loadStore(11, false);
        EndBuyerStore.loadStore(12, false);
    },
    control: {
        '#checkYCSX' : {
            change: 'onSearch'
        },
        // '#checkAllGrant' : {
        //     change: 'onSearch'
        // }
    },
    onZoomIn : function () {
        var viewmodel = this.getViewModel();
        var panel_plan = Ext.getCmp('treeplan');
        panel_plan.zoomIn();
        panel_plan.setStartDate(viewmodel.get('schedule.startDate'));
        panel_plan.setEndDate(viewmodel.get('schedule.endDate'));
    },

    onZoomOut: function () {
        var viewmodel = this.getViewModel();
        var panel_plan = Ext.getCmp('treeplan');
        panel_plan.zoomOut();
        panel_plan.setStartDate(viewmodel.get('schedule.startDate'));
        panel_plan.setEndDate(viewmodel.get('schedule.endDate'));
    },   
    onGrantToOrgTap: function(){
        var viewmodel = this.getViewModel();
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        if (null != panel_orderungranted){
            if (panel_orderungranted.getHidden()){
                var store = viewmodel.getStore('POrderUnGranted');
                var golive_from = viewmodel.get('schedule.startDate');
                var golive_to = viewmodel.get('schedule.endDate');
                store.loadFree_bygolivedate(golive_from,golive_to);

                var store_req = viewmodel.getStore('Porder_Req_Store');
                store_req.load_byOrg();

                panel_orderungranted.setHidden(false);
                panel_guessview.setHidden(true);
            }
            else{
                panel_orderungranted.setHidden(true);
            }
        }
    },   
    onGuessView: function(){
        var panel_guessview = Ext.getCmp('Schedule_plan_Schedule_plan_GuestView');
        var panel_orderungranted = Ext.getCmp('Schedule_plan_POrderUnGranted');
        if (null != panel_guessview) {
            if (panel_guessview.getHidden()){
                panel_guessview.setHidden(false);
                panel_orderungranted.setHidden(true);

                var crud = panel_guessview.down('#treeplanguest').getCrudManager();
                crud.load();
            }
            else
                panel_guessview.setHidden(true);
        }
    },   
    onExport: function(){
        var me = Ext.getCmp('treeplan');
        me.print();
    },
    onSearch: function(){
        console.log(123);
        var sch = Ext.getCmp('treeplan');
        var crud = sch.getCrudManager();

        var viewmodel = this.getViewModel();
        
        sch.setStartDate(viewmodel.get('schedule.startDate'));
        sch.setEndDate(viewmodel.get('schedule.endDate'));
        
        var params = new Object();
        params.listid = viewmodel.get('schedule.listid');
        params.startDate = viewmodel.get('schedule.startDate');
        params.endDate = viewmodel.get('schedule.endDate');
        params.PO_code = viewmodel.get('schedule.PO');
        params.Buyer = viewmodel.get('schedule.buyer');
        params.Vendor = viewmodel.get('schedule.vendor');
        params.isReqPorder = viewmodel.get('schedule.isReqPorder');
        params.isAllgrant = viewmodel.get('schedule.isAllgrant');

        crud.transport.load.requestConfig.params = params;
        crud.load();
    },
    onShowKHGH: function(){
        var panel_po = Ext.getCmp('PContract_PO_Edit');
        var west = panel_po.down('#panel_po');
        west.setHidden(!west.getHidden());
    }
})