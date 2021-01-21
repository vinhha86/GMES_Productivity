Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_Detail_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_Detail_MainViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        
        
    },
    control: {
        '#btnShowNPL' : {
            click: 'onShowNPL'
        }
    },
    onShowNPL: function(){
        var viewmodel = this.getViewModel();
        var main = this.getView();
        viewmodel.set('isHiddenNPL', false);
        var form_npl = main.down('#CutPlan_NPL_View');
        form_npl.expand();
    }
})