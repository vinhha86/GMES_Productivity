Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_Info',
    layout: 'hbox',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'PO Buyer:',
            labelAlign: 'left',
            labelWidth: 100,
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'PO Vendor:',
            labelAlign: 'left',
            labelWidth: 100,
        }, 
    ]
})