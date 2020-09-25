Ext.define('GSmartApp.view.pcontract.FOBPricePODetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FOBPricePODetailController',
    init: function(){
        var viewmodel = this.getViewModel();
        var store  =  viewmodel.getStore('FOBPricePODetailStore');
        // console.log(viewmodel);
        var pcontract_poid_link = viewmodel.get('record.id');
        // console.log(viewmodel.get('record.data.id'));
        store.loadStore(pcontract_poid_link);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
})