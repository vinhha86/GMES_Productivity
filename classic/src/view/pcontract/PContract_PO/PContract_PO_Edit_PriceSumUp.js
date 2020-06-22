Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_PriceSumUp', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_PriceSumUp',
    layout: 'hbox',
    id: 'PContract_PO_Edit_PriceSumUp',
    items: [
        {
            xtype: 'container',
            layout: 'vbox',
            margin: 1,
            flex:1,
            items:[
                {
                    xtype: 'numberfield',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;text-align:right',
                    hideTrigger:true,
                    readOnly: true,
                    fieldLabel: 'Giá CMP:',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width:'100%',
                    margin: 1,
                    bind: {
                        value: '{po_price.price_cmp}'
                    },
                }, 
                {
                    xtype: 'numberfield',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;text-align:right',
                    hideTrigger:true,
                    fieldLabel: 'Sew Target:',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width:'100%',
                    margin: 1,
                    bind: {
                        value: '{po_price.price_sewingtarget}',
                        readOnly: '{isSewPriceReadonly}'
                    }                    
                }                
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            margin: 1,
            flex:1,
            items:[
                {
                    xtype: 'numberfield',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;text-align:right',
                    hideTrigger:true,
                    readOnly: true,
                    fieldLabel: 'Giá FOB:',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width:'100%',
                    margin: 1,
                    bind: {
                        value: '{po_price.price_fob}'
                    }
                }, 
                {
                    xtype: 'numberfield',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;text-align:right',
                    hideTrigger:true,
                    fieldLabel: 'Sew Cost:',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width:'100%',
                    margin: 1,
                    bind: {
                        value: '{po_price.price_sewingcost}',
                        readOnly: '{isSewPriceReadonly}'
                    },
                    listeners: {
                        focusleave: 'onSewCostChange'
                    }   
                }                
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            margin: 1,
            flex:1,
            items:[
                {
                    xtype: 'numberfield',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;text-align:right',
                    hideTrigger:true,
                    readOnly: true,
                    fieldLabel: 'Tổng chào:',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width:'100%',
                    margin: 1,
                    bind: {
                        value: '{po_price.totalprice}'
                    }
                }, 
                {
                    xtype: 'numberfield',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;text-align:right',
                    hideTrigger:true,
                    readOnly: true,
                    fieldLabel: 'Salary Fund:',
                    labelAlign: 'left',
                    labelWidth: 70,
                    width:'100%',
                    margin: 1,
                    bind: {
                        value: '{po_price.salaryfund}'
                    }                    
                }                
            ]
        }
    ]
})