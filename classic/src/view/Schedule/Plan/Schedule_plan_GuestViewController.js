Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_GuestViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Schedule_plan_GuestViewController',
    init: function(){
        // var grid = this.getView().down('treeplanguest');
        // var crud = grid.getCrudManager();
        // crud.load();
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
        var panel_guessview = this.getView().items.get('panel_guessview');
        if (null != panel_guessview){
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
    }    
})