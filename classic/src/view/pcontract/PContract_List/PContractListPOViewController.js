Ext.define('GSmartApp.view.pcontract.PContractListPOViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractListPOViewController',
    isActivate: false,
    control: {
        '#PContractListPOView': {
            select: 'onPOSelect'
        }
    },
    onPOSelect: function(e, selected, eOpts){
        console.log(selected);
        if (null != selected){
            //redirect den PContract_PO o day
        }
    }
})