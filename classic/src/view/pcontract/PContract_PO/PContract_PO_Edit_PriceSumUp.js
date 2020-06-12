Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_PriceSumUp', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_PriceSumUp',
    layout: 'hbox',
    items: [
        {
            xtype: 'container',
            layout: 'vbox',
            items:[
                {
                    xtype: 'numberfield',
                    hideTrigger:true,
                    fieldLabel: 'Giá CMP:',
                    labelAlign: 'left',
                    labelWidth: 90,
                    width: 170,
                    margin: 1,
                    bind: {
                        value: '{plan.cmpt_price}'
                    }
                }, 
                {
                    xtype: 'numberfield',
                    hideTrigger:true,
                    fieldLabel: 'Sewing Target:',
                    labelAlign: 'left',
                    labelWidth: 90,
                    width: 170,
                    margin: 1
                }                
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            items:[
                {
                    xtype: 'numberfield',
                    hideTrigger:true,
                    fieldLabel: 'Giá FOB:',
                    labelAlign: 'left',
                    labelWidth: 90,
                    width: 170,
                    margin: 1,
                    bind: {
                        value: '{plan.fob_price}'
                    }
                }, 
                {
                    xtype: 'numberfield',
                    hideTrigger:true,
                    fieldLabel: 'Sewing Cost:',
                    labelAlign: 'left',
                    labelWidth: 90,
                    width: 170,
                    margin: 1
                }                
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            items:[
                {
                    xtype: 'numberfield',
                    hideTrigger:true,
                    fieldLabel: 'Tổng chào:',
                    labelAlign: 'left',
                    labelWidth: 90,
                    width: 170,
                    margin: 1,
                    bind: {
                        value: '{plan.total_price}'
                    }
                }, 
                {
                    xtype: 'numberfield',
                    hideTrigger:true,
                    fieldLabel: 'Salary Fund:',
                    labelAlign: 'left',
                    labelWidth: 90,
                    width: 170,
                    margin: 1
                }                
            ]
        }
    ]
})