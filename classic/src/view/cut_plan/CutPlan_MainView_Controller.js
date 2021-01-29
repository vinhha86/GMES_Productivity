Ext.define('GSmartApp.view.cut_plan.CutPlan_MainView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_MainView_Controller',
    init: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder');
        
        var productStore = viewmodel.getStore('ProductStore');
        productStore.load_by_type_and_pcontract(20, porder.pcontractid_link);
        productStore.setGroupField('producttype_name');

        
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