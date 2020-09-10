Ext.define('GSmartApp.view.pcontract.PContractListPOViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractListPOViewController',
    isActivate: false,
    control: {
        'PContractListPOView': {
            itemdblclick: 'onPOSelect'
        }
    },
    onPOSelect: function( grid, record, item, index, e, eOpts){
        if (null != record){
            var pcontractid_link = record.get('pcontractid_link');
            var poid_link = record.get('id');
            var productid_link = record.get('productid_link');

            this.redirectTo('lspcontract/'+pcontractid_link+"/edit_"+poid_link+"_"+productid_link);
        }
    }
})