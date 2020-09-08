Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_PriceSumUp', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_PriceSumUp',
    layout: 'hbox',
    id: 'PContract_PO_Edit_PriceSumUp',
    items: [
        {
            xtype: 'container',
            layout: 'vbox',
            margin: 1,
            // flex:1,
            width: 95,
            items:[
                {
                    xtype: 'new_numberfield',
                    labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                    fieldStyle: 'font-size:11px;text-align:right;background-color:azure',
                    hideTrigger:true,
                    readOnly: true,
                    fieldLabel: 'CMP:',
                    labelAlign: 'left',
                    labelWidth: 30,
                    width:'100%',
                    margin: 1,
                    bind: {
                        value: '{po_price.price_cmp}'
                    },
                    decimalPrecision: 3
                }, 
                // {
                //     xtype: 'numberfield',
                //     labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                //     fieldStyle: 'font-size:11px;text-align:right',
                //     hideTrigger:true,
                //     fieldLabel: 'Sew Target:',
                //     labelAlign: 'left',
                //     labelWidth: 70,
                //     width:'100%',
                //     margin: 1,
                //     bind: {
                //         value: '{po_price.price_sewingtarget}',
                //         readOnly: '{isSewPriceReadonly}'
                //     }                    
                // }                
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            margin: 1,
            // flex:1,
            width: 95,
            items:[
                {
                    xtype: 'new_numberfield',
                    labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                    fieldStyle: 'font-size:11px;text-align:right;background-color:azure',
                    hideTrigger:true,
                    readOnly: true,
                    fieldLabel: 'FOB:',
                    labelAlign: 'left',
                    labelWidth: 30,
                    width:'100%',
                    margin: 1,
                    bind: {
                        value: '{po_price.price_fob}'
                    },
                    decimalPrecision: 3
                }, 
                // {
                //     xtype: 'numberfield',
                //     labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                //     fieldStyle: 'font-size:11px;text-align:right',
                //     hideTrigger:true,
                //     fieldLabel: 'Sew Cost:',
                //     labelAlign: 'left',
                //     labelWidth: 70,
                //     width:'100%',
                //     margin: 1,
                //     bind: {
                //         value: '{po_price.price_sewingcost}',
                //         readOnly: '{isSewCostPriceReadonly}'
                //     },
                //     disalbled: true
                //     // listeners: {
                //     //     focusleave: 'onSewCostChange'
                //     // }   
                // }                
            ]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            margin: 1,
            // flex:1,
            width: 115,
            items:[
                {
                    xtype: 'new_numberfield',
                    labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                    fieldStyle: 'font-size:11px;text-align:right;background-color:azure',
                    hideTrigger:true,
                    readOnly: true,
                    fieldLabel: 'Giá chào:',
                    labelAlign: 'left',
                    labelWidth: 52,
                    width:'100%',
                    margin: 1,
                    bind: {
                        value: '{po_price.totalprice}'
                    },
                    decimalPrecision: 3,
                    allowOnlyWhitespace: false
                }, 
                // {
                //     xtype: 'numberfield',
                //     labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                //     fieldStyle: 'font-size:11px;text-align:right',
                //     hideTrigger:true,
                //     readOnly: true,
                //     fieldLabel: 'Salary Fund:',
                //     labelAlign: 'left',
                //     labelWidth: 70,
                //     width:'100%',
                //     margin: 1,
                //     bind: {
                //         value: '{po_price.salaryfund}'
                //     }                    
                // }                
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: 1,
            flex:1,
            // width: '35%',
            items:[
                {
                    xtype: 'textfield',
                    allowBlank: true,
                    labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                    fieldStyle: 'font-size:11px;text-align:right;background-color:azure',
                    fieldLabel: 'Target Sew:',
                    labelAlign: 'left',
                    labelWidth: 63,
                    width: 126,
                    margin: 1,
                    bind: {
                        value: '{po_price.price_sewingtarget}',
                        readOnly: '{isSewPriceReadonly}'
                    },
                    vtype: 'dollar'
                },
                {
                    xtype: 'numberfield',
                    defaultValue: 0,
                    allowBlank: true,
                    labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                    fieldStyle: 'font-size:11px;text-align:right;background-color:white',
                    hideTrigger:true,
                    readOnly: false,
                    fieldLabel: 'Buy:',
                    labelAlign: 'left',
                    labelWidth: 30,
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{po_price.price_vendortarget}'
                    },
                    decimalPrecision: 3
                },         
            ]
        },        
    ]
})