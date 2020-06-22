Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_Info',
    layout: 'border',
    controller: 'PContract_PO_Edit_InfoController',
    items: [
        {
            region: 'south',
            height: 50,
            layout: 'hbox',
            items:[
                {
                    region: 'center',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;',
                    xtype: 'textarea',
                    labelWidth: 75,
                    labelAlign: 'left',
                    fieldLabel:'Đóng gói:',
                    width: '100%',
                    margin: 1,
                    bind: {
                        value: '{po.packingnotice}'
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
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'PO Buyer:',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.po_buyer}'
                            },
                            listeners: {
                                focusleave: 'onPOBuyerChange'
                            }                               
                        }, 
                        {
                            xtype: 'numberfield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            fieldLabel: 'Số lượng:',
                            hideTrigger:true,
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.po_quantity}'
                            }
                        },    
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày NPL về:',
                            reference: 'poinfo_matdate',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{po.matdate}'
                            },
                            listeners: {
                                select: 'onMatDateChange'
                            }            
                        },      
                        {
                            xtype: 'numberfield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            readOnly: true,
                            fieldLabel: 'Số ngày SX:',
                            hideTrigger:true,
                            reference: 'poinfo_productiondays',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.productiondays}'
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
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'PO Vendor:',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.po_vendor}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày giao:',
                            reference: 'poinfo_shipdate',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{po.shipdate}'
                            },
                            listeners: {
                                select: 'onShipDateChange'
                            }
                        },   
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày VC:',
                            readOnly: true,
                            reference: 'poinfo_productiondate',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{po.productiondate}'
                            }
                        },     
                        {
                            xtype: 'textfield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Đơn vị QC:',
                            reference: 'poinfo_qcorgname',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.qcorgname}'
                            }
                        },                                           
                    ]
                }
            ]
        }
    ]
})