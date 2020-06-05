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
            margin: 1,
            bind: {
                value: '{plan.po_buyer}'
            }
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'PO Vendor:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1,
            bind: {
                value: '{plan.po_vendor}'
            }
        }, 
        {
            xtype: 'numberfield',
            fieldLabel: 'Số lượng:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1,
            bind: {
                value: '{plan.po_quantity}'
            }
        }, 
        {
            xtype: 'datefield',
            fieldLabel: 'Ngày giao:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            bind: {
                value: '{plan.shipdate}'
            }
        }, 
        {
            xtype: 'datefield',
            fieldLabel: 'Ngày NPL về:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            bind: {
                value: '{plan.matdate}'
            }
        }, 
        {
            xtype: 'datefield',
            fieldLabel: 'Ngày VC:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            bind: {
                value: '{plan.productiondate}'
            }
        }, 
        {
            xtype: 'numberfield',
            fieldLabel: 'Số ngày SX:',
            labelAlign: 'left',
            labelWidth: 90,
            width: 220,
            margin: 1,
            bind: {
                value: '{plan.productiondate}'
            }
        }, 
    ]
})