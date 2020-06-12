Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_Info',
    layout: 'border',
    controller: 'PContract_PO_Edit_InfoController',
    items: [
        {
            region: 'south',
            height: 40,
            layout: 'hbox',
            align: 'stretch',
            items:[
                {
                    xtype: 'textarea',
                    labelWidth: 90,
                    labelAlign: 'left',
                    fieldLabel:'Đóng gói:',
                    flex: 1,
                    height: 40,
                    bind: {
                        value: '{plan.packingnotice}'
                    }
                }
            ]

        },
        {
            region: 'center',
            layout: 'border',
            items:[
                {
                    region: 'west',
                    width: '50%',
                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'textfield',
                            fieldLabel: 'PO Buyer:',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{plan.po_buyer}'
                            },
                            listeners: {
                                focusleave: 'onPOBuyerChange'
                            }                               
                        }, 
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Số lượng:',
                            hideTrigger:true,
                            fieldStyle: 'text-align: right',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{plan.po_quantity}'
                            }
                        },    
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Ngày NPL về:',
                            reference: 'poinfo_matdate',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{plan.matdate}'
                            },
                            listeners: {
                                select: 'onMatDateChange'
                            }            
                        },      
                        {
                            xtype: 'numberfield',
                            readOnly: true,
                            fieldLabel: 'Số ngày SX:',
                            hideTrigger:true,
                            fieldStyle: 'text-align: right',                            
                            reference: 'poinfo_productiondays',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{plan.productiondays}'
                            }
                        },                                                  
                    ]
                },
                {
                    region: 'center',
                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'textfield',
                            fieldLabel: 'PO Vendor:',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{plan.po_vendor}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Ngày giao:',
                            reference: 'poinfo_shipdate',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{plan.shipdate}'
                            },
                            listeners: {
                                select: 'onShipDateChange'
                            }
                        },   
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Ngày VC:',
                            readOnly: true,
                            reference: 'poinfo_productiondate',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{plan.productiondate}'
                            }
                        },     
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Đơn vị QC:',
                            reference: 'poinfo_qcorgname',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{plan.qcorgname}'
                            }
                        },                                           
                    ]
                }
            ]
        }
    ]
})