Ext.define('GSmartApp.view.Schedule.Plan.FilterBar_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FilterBar_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        
        var VenderStore = viewmodel.getStore('Vender');
        var EndBuyerStore = viewmodel.getStore('EndBuyer');

        VenderStore.loadStore(11, false);
        EndBuyerStore.loadStore(12, false);
    },
    control: {
        '#checkYCSX' : {
            change: 'onSearch'
        },
        '#checkAllGrant' : {
            change: 'onSearch'
        }
    },
    onZoomIn : function () {
        var panel_plan = this.getView().items.get('panel_plan');
        panel_plan.zoomIn();
    },

    onZoomOut: function () {
        var panel_plan = this.getView().items.get('panel_plan');
        panel_plan.zoomOut();
    },   
    onGrantToOrgTap: function(){
        //var panel_orderwaiting = this.getView().up().items.get('panel_orderwaiting');
        var panel_orderungranted = this.getView().items.get('panel_orderungranted');
        if (null != panel_orderungranted){
            if (panel_orderungranted.getHidden())
                panel_orderungranted.setHidden(false);
            else
                panel_orderungranted.setHidden(true);
        }
    },   
    onGuessView: function(){
        //var panel_orderwaiting = this.getView().up().items.get('panel_orderwaiting');
        var panel_main = Ext.getCmp('Schedule_plan_Main');
        var panel_guessview = panel_main.down('Schedule_plan_GuestView');
        if (null != panel_guessview) {
            if (panel_guessview.getHidden())
                panel_guessview.setHidden(false);
            else
                panel_guessview.setHidden(true);
        }
    },   
    onExport: function(){
        var me = Ext.getCmp('Schedule_plan_View');
        me.print();
    },
    onSearch: function(){
        var sch = Ext.getCmp('Schedule_plan_View');
        var viewmodel = this.getViewModel();
        
        sch.setStartDate(viewmodel.get('schedule.startDate'));
        sch.setEndDate(viewmodel.get('schedule.endDate'));
        

        var crud = sch.getCrudManager();

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
    }
})