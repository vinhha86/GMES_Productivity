Ext.define('GSmartApp.view.planporder.PlanMain_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PlanMain_Controller',
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