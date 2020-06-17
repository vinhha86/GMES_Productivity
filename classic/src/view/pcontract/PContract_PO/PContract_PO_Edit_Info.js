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
                    xtype: 'textarea',
                    labelWidth: 90,
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
                            fieldLabel: 'PO Buyer:',
                            labelAlign: 'left',
                            labelWidth: 90,
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
                            fieldLabel: 'Số lượng:',
                            hideTrigger:true,
                            fieldStyle: 'text-align: right',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.po_quantity}'
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
                                value: '{po.matdate}'
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
                            fieldLabel: 'PO Vendor:',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.po_vendor}'
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
                                value: '{po.shipdate}'
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
                                value: '{po.productiondate}'
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
                                value: '{po.qcorgname}'
                            }
                        },                                           
                    ]
                }
            ]
        }
    ]
})