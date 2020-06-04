Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_Info',
    layout: 'vbox',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'PO Buyer:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'PO Vendor:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1
        }, 
        {
            xtype: 'numberfield',
            fieldLabel: 'Số lượng:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1
        }, 
        {
            xtype: 'datefield',
            fieldLabel: 'Ngày giao:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1,
            format: 'd/m/Y',
        }, 
        {
            xtype: 'datefield',
            fieldLabel: 'Ngày NPL về:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1,
            format: 'd/m/Y',
        }, 
        {
            xtype: 'datefield',
            fieldLabel: 'Ngày VC:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1,
            format: 'd/m/Y',
        }, 
        {
            xtype: 'numberfield',
            fieldLabel: 'Số ngày SX:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1
        }, 
    ]
})