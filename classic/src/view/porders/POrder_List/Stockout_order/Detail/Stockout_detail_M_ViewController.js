Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_detail_M_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_detail_M_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var order = viewmodel.get('order');

        var orgFromStore = viewmodel.getStore('OrgFromStore');

        var OrgToStore = viewmodel.getStore('OrgToStore');
        if(order.stockouttypeid_link == 1){
            OrgToStore.GetOrg_By_type(17);
            orgFromStore.GetOrg_By_type(3);
        }
        else {
            orgFromStore.GetOrg_By_type(19);
            OrgToStore.GetOrg_By_type(14);
        }

        var userStore = viewmodel.getStore('UserStore');
        userStore.loadUserbyOrg(-1);

        if(order.id == null){
            var sesion = GSmartApp.util.State.get('session');
            viewmodel.set('order.timecreate', new Date());
            viewmodel.set('order.usercreateid_link', sesion.id);
        }
    },
    control: {
        
    }
})