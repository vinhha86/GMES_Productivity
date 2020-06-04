Ext.define('GSmartApp.view.pcontract.PContractSKUMainView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractSKUMainView',
    id: 'PContractSKUMainView',
    IdProduct: 0,
    pcontractid_link: 0,
    controller: 'PContractSKUMainViewController',
    layout: 'border',
    items: [{
        region: 'center',
        xtype: 'PContractSKUView',
        border: true,
        margin: 1
    }, {
        region: 'west',
        xtype: 'PContractSKU_ListProductView',
        border: true,
        margin: 1,
        width: '30%'
    }]
})