Ext.define('GSmartApp.view.planporder.PContract_PO_Edit_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_Info',
    layout: 'border',
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
                            }
                        }, 
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Số lượng:',
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
                            fieldLabel: 'Số ngày SX:',
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
                            xtype: 'combobox',
                            fieldLabel: 'Đơn vị QC:',
                            reference: 'poinfo_qcorgid_link',
                            labelAlign: 'left',
                            labelWidth: 90,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{plan.qcorgid_link}'
                            }
                        },                                           
                    ]
                }
            ]
        }
    ]
})