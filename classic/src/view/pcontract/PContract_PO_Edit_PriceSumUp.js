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
                    fieldLabel: 'Giá CMPT:',
                    labelAlign: 'left',
                    labelWidth: 75,
                    width: 155,
                    margin: 1,
                    bind: {
                        value: '{plan.cmpt_price}'
                    }
                }, 
                {
                    xtype: 'numberfield',
                    hideTrigger:true,
                    fieldLabel: 'Sew Target:',
                    labelAlign: 'left',
                    labelWidth: 75,
                    width: 155,
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
                    labelWidth: 70,
                    width: 155,
                    margin: 1,
                    bind: {
                        value: '{plan.fob_price}'
                    }
                }, 
                {
                    xtype: 'numberfield',
                    hideTrigger:true,
                    fieldLabel: 'Sew Fact:',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width: 155,
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
                    labelWidth: 70,
                    width: 155,
                    margin: 1,
                    bind: {
                        value: '{plan.total_price}'
                    }
                }, 
                {
                    xtype: 'numberfield',
                    hideTrigger:true,
                    fieldLabel: 'Salary:',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width: 155,
                    margin: 1
                }                
            ]
        }
    ]
})