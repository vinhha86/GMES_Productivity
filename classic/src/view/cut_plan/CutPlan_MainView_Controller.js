Ext.define('GSmartApp.view.cut_plan.CutPlan_MainView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_MainView_Controller',
    init: function () {
        var viewmodel = this.getViewModel();
        
        
    },
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        }
    },
    onThoat: function(){
       this.fireEvent('Thoat');
    }
})