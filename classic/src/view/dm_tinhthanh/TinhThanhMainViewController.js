Ext.define('GSmartApp.view.dm_tinhthanh.TinhThanhMainViewController',{
    extend:'Ext.app.ViewController',
    alias:'controller.TinhThanhMainViewController',

    init : function(view){
        var viewmodel = view.getViewModel();
        var tinh_store = viewmodel.getStore('org_store');
        var tinh_type_code = 25;
        tinh_store.GetOrg_By_type(tinh_type_code);
    }

})