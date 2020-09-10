Ext.define('GSmartApp.view.pcontract.PContractListPOViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractListPOViewController',
    isActivate: false,
    control: {
        '#PContractListPOView': {
            itemdblclick: 'onPOSelect'
        }
    },
    onPOSelect: function(e, selected, eOpts){
        console.log(selected);
        if (null != selected){
            console.log(select);
            // this.redirectTo('lspcontract/');
        }
    }
})