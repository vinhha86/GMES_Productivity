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
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },    
                    items:[
                        {
                            xtype: 'checkboxfield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            fieldLabel: 'Chưa xác định:',
                            hideTrigger:true,
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
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
                            allowBlank: false,
                            blankText: 'Không được để trống',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: "PO Buyer (<span style = 'color: red'>*</span>):",
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
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
                            xtype: 'textfield',
                            textAlign: 'right',
                            allowDecimals: false,
                            decimalSeparator: ',',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            fieldLabel: 'Số lượng:',
                            maskRe: /[0-9]/,
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            vtype: 'dollar',
                            enforceMaxLength: true,
                            maxLength: 9,
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
                            flex: 1,
                            margin: 1,
                            format: 'd/m/y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{po.matdate}'
                            },
                            listeners: {
                                collapse: 'onMatDateChange'
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
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{po.productiondays}'
                            }
                        },                                                  
                    ]
                },
                {
                    region: 'center',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },                    
                    items:[
                        {
                            xtype: 'numberfield',
                            id: 'PContract_PO_Edit_Info_sewtarget_percent',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            fieldLabel: 'Sew Target %:',
                            hideTrigger:true,
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex:1,
                            margin: 1,
                            minValue: 0,
                            maxValue: 100,
                            bind: {
                                value: '{po.sewtarget_percent}'
                            },
                            listeners: {
                                focusleave: 'onSewTarget_PercentChange'
                            }    
                        },  
                        {
                            xtype: 'panel',
                            flex:1,
                            // height: 31,
                            id: 'PContract_PO_Edit_Info_sewtarget_hidepanel',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'PO Vendor:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex:1,
                            margin: 1,
                            bind: {
                                value: '{po.po_vendor}',
                                disabled: '{isPO_VendorDisable}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            allowBlank: false,
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: "Ngày giao (<span style = 'color: red'>*</span>):",
                            reference: 'poinfo_shipdate',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex:1,
                            margin: 1,
                            format: 'd/m/y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{po.shipdate}'
                            },
                            listeners: {
                                collapse: 'onShipDateChange'
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
                            flex:1,
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
                            flex:1,
                            margin: 1,
                            bind: {
                                value: '{po.qcorgname}'
                            }
                        },                                           
                    ]
                }
            ]
        },
        {
            region: 'south',
            id: 'PContract_PO_Edit_Info_PortFromTo',
            layout: 'hbox',
            height: 35,
            items:[
                {
                    xtype: 'combo',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',            
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 1,
                    fieldLabel: "Cảng xuất:",
                    labelAlign: 'left',
                    labelWidth: 78,
                    bind: {
                        value: '{po.portfromid_link}',
                        store: '{PortStore}'
                    },
                    itemId: 'portfromid_link',
                    flex: 1
                },    
                {
                    xtype: 'combo',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',           
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 1,
                    fieldLabel: "Cảng đến:",
                    labelAlign: 'left',
                    labelWidth: 78,
                    bind: {
                        value: '{po.porttoid_link}',
                        store: '{PortStore}'
                    },
                    itemId: 'porttoid_link',
                    flex: 1
                },  
            ]
        }
    ]
})