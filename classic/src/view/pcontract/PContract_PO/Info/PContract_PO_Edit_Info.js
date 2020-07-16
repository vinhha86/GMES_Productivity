Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_Info',
    layout: 'border',
    controller: 'PContract_PO_Edit_InfoController',
    poid: null,
    items: [
        {
            region: 'south',
            xtype: 'tagfield',
            margin: 1,
            height: 50,
            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
            fieldStyle: 'font-size:11px;',
            xtype: 'tagfield',
            labelWidth: 78,
            labelAlign: 'left',
            fieldLabel:'Đóng gói:',
            bind: {
                store: '{PackingTypeStore}',
                value: '{po.packingnotice}'
            },
            displayField: 'code',
            valueField: 'id',
            filterPickList: true,
            queryMode: 'local',          
            publishes: 'po.packingnotice',   
            style: {
                background: 'white'
            }
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
                            xtype: 'checkboxfield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            fieldLabel: 'Chưa xác định:',
                            hideTrigger:true,
                            labelAlign: 'left',
                            labelWidth: 78,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.is_tbd}'
                            },
                            listeners: {
                                change: 'onIs_Tbd_Change'
                            }
                        },                            
                        {
                            xtype: 'textfield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'PO Buyer:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.po_buyer}',
                                disabled: '{isPO_BuyerDisable}'
                            },
                            listeners: {
                                focusleave: 'onPOBuyerChange'
                            }                               
                        }, 
                        {
                            xtype: 'numberfield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            fieldLabel: 'Số lượng:',
                            hideTrigger:true,
                            labelAlign: 'left',
                            labelWidth: 78,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.po_quantity}'
                            },
                            listeners: {
                                focusleave: 'onPOQuantityChange'
                            }           
                        },    
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày NPL về:',
                            reference: 'poinfo_matdate',
                            labelAlign: 'left',
                            labelWidth: 78,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/y',
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
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            readOnly: true,
                            fieldLabel: 'Số ngày SX:',
                            hideTrigger:true,
                            reference: 'poinfo_productiondays',
                            labelAlign: 'left',
                            labelWidth: 78,
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
                            xtype: 'numberfield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            fieldLabel: 'Sew Target %:',
                            hideTrigger:true,
                            labelAlign: 'left',
                            labelWidth: 78,
                            width: '100%',
                            margin: 1,
                            minValue: 0,
                            maxValue: 100,
                            bind: {
                                value: '{po.sewtarget_percent}'
                            }
                        },    
                        {
                            xtype: 'textfield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'PO Vendor:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{po.po_vendor}',
                                disabled: '{isPO_VendorDisable}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày giao:',
                            reference: 'poinfo_shipdate',
                            labelAlign: 'left',
                            labelWidth: 78,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/y',
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
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày VC:',
                            readOnly: true,
                            reference: 'poinfo_productiondate',
                            labelAlign: 'left',
                            labelWidth: 78,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{po.productiondate}'
                            }
                        },     
                        {
                            xtype: 'textfield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Đơn vị QC:',
                            reference: 'poinfo_qcorgname',
                            labelAlign: 'left',
                            labelWidth: 78,
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