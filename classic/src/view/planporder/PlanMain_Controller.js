Ext.define('GSmartApp.view.planporder.PlanMain_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PlanMain_Controller',
    init: function(){
        var OrgStore = this.getViewModel().getStore('OrgStore');  
        OrgStore.loadStore(14, false);
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
        var panel_tosx = this.getView().items.get('panel_tosx');
        if (null != panel_tosx){
            if (panel_tosx.getHidden())
                panel_tosx.setHidden(false);
            else
                panel_tosx.setHidden(true);
        }
    },   
    onExport: function(){
        var me = this.getView().down('#panel_plan');
        me.getPlugin('export').setFileFormat('pdf');
        me.showExportDialog();
    }    
})