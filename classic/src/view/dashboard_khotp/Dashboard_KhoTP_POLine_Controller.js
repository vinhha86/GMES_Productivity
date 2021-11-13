Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Dashboard_KhoTP_POLine_Controller',
    init: function () {
        this.loadPO_HavetoShip();
    },
    control: {
        '#Dashboard_KhoTP_POLine_List': {
            itemclick: 'onSelectProduct'
        }
    },
    loadPO_HavetoShip: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POLineStore');
        store.getpo_havetoship(viewmodel.get('shipdate_from'), viewmodel.get('shipdate_to'));
    },
    onSelectProduct: function (t, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontract_poid_link = record.data.id;
        // console.log(record);
        storeSku.load_by_pcontract_po(pcontract_poid_link);
    },
});
