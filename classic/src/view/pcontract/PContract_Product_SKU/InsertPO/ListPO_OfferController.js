Ext.define('GSmartApp.view.pcontract..PContract_Product_SKU.InsertPO.ListPO_OfferController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListPO_OfferController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractProductPOStore');
        var pcontractid_link = viewmodel.get('po.pcontractid_link');
        store.loadAccept_ByContract(pcontractid_link);
    },
    control:{
        'ListPO_Offer' : {
            select: 'onSelectOffer'
        }
    },
    onSelectOffer: function( grid, record, index, eOpts){
        var viewmodel = this.getViewModel();
        viewmodel.set('po.parentpoid_link', record.get('id'));
        viewmodel.set('po.po_buyer', record.get('po_buyer'));
        viewmodel.set('po.po_vendor', record.get('po_vendor'));
        viewmodel.set('po.productid_link', record.get('productid_link'));
    }
})