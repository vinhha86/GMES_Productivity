Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Dashboard_KhoTP_MainController',
    init: function () {
    },
    control: {
        '#Dashboard_KhoTP_Main': {
            tabchange: 'onTabChange'
        },
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        if (newCard.xtype == "Dashboard_KhoTP_POLine_Main") { //tab nhịp giao hàng
            // ds poline
            var POLineStore = viewModel.getStore('POLineStore');
            if(POLineStore) POLineStore.load();
            // ds màu cỡ poline
            var PContractSKUStore  = viewModel.getStore('PContractSKUStore');
            if(PContractSKUStore) PContractSKUStore.removeAll();
            // ds phân xưởng poline
            var POLine_Orgs_Store  = viewModel.getStore('POLine_Orgs_Store');
            if(POLine_Orgs_Store) POLine_Orgs_Store.removeAll();
        }else
        if (newCard.xtype == "Stockout_P_Order_Main") { //tab lệnh xuất kho
            var Stockout_P_Order_Main = me.down('#Stockout_P_Order_Main');
            if(Stockout_P_Order_Main){
                // ds lệnh xuất kho
                var Stockout_P_Order_Store = Stockout_P_Order_Main.getViewModel().getStore('Stockout_P_Order_Store');
                if(Stockout_P_Order_Store) Stockout_P_Order_Store.load();
                // ds màu cỡ lệnh xuất kho
                var Stockout_P_Order_D = Stockout_P_Order_Main.down('#Stockout_P_Order_D');
                if(Stockout_P_Order_D){
                    var Stockout_P_Order_D_Store = Stockout_P_Order_D.getStore();
                    if(Stockout_P_Order_D_Store) Stockout_P_Order_D_Store.removeAll();
                }
            }
        }
    }
});
