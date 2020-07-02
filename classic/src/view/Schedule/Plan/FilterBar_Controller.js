Ext.define('GSmartApp.view.Schedule.Plan.FilterBar_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FilterBar_Controller',
    init: function(){
        // var viewmodel = this.getViewModel();
        // var OrgStore = viewmodel.getStore('OrgStore');  
        // OrgStore.loadStore(14, false);

        // var POrderUnGranted = viewmodel.getStore('POrderUnGranted'); 
        // var golive_from = new Date('01-jan-2020');
        // var golive_to = new Date('31-dec-2020'); 
        // POrderUnGranted.loadFree_bygolivedate(golive_from,golive_to);
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
        console.log(panel_main);
        var panel_guessview = panel_main.down('Schedule_plan_GuestView');
        if (null != panel_guessview) {
            if (panel_guessview.getHidden())
                panel_guessview.setHidden(false);
            else
                panel_guessview.setHidden(true);
        }
    },   
    onExport: function(){
        var me = this.getView().down('#panel_plan');
        me.getPlugin('export').setFileFormat('pdf');
        me.showExportDialog();
    }    ,
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

        crud.transport.load.params = params;
        crud.load();
    }
})