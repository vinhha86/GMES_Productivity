Ext.define('GSmartApp.view.pcontract.PContract_Product_SKU.InsertPO.InsertPO_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'InsertPO_Main',
    id: 'InsertPO_Main',
    controller: 'InsertPO_Main_Controller',
    viewModel: {
        type: 'InsertPO_Main_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'center',
        border: true,
        margin: 1,
        xtype: 'PContract_PO_Edit_Info_Main',
        id: 'PContract_PO_Edit_Info_Main'
    }
    ]
})