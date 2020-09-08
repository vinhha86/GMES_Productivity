Ext.define('GSmartApp.view.pcontract.PContractList_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractList_Main',
    reference: 'PContractList_Main',
    layout: {
        type: 'border'
    },
    // controller: 'PContractViewController',
    // viewModel: {
    //     type: 'PContractViewModel'
    // },
    items:[
        {
            region: 'north',
            height: '50%',
            xtype: 'PContractMainView'
        },
        {
            region: 'center',
            xtype: 'PContractListPOView',
        }    
    ]   
})