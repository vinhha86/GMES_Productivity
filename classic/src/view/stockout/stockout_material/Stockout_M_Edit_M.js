Ext.define('GSmartApp.view.stockout.Stockout_M_Edit_M', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_M_Edit_M',
    controller: 'Stockout_M_Edit_M_Controller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    reference: 'cbostockouttype',
                    width: 375,
                    labelWidth: 80,
                    fieldLabel: 'Loại xuất:',
                    readOnly: true,
                    editable: false,
                    displayField: 'name',
                    valueField: 'id',
                    bind: {
                        store: '{StockoutTypeStore}',
                        value: '{stockout.stockouttypeid_link}'
                    },
                    queryMode: 'local',
                    anyMatch: true,
                    margin: '5 5 0 5',
                },
                {
                    xtype: 'textfield',
                    margin: '5 5 0 5',
                    reference: 'txtstockoutcode',
                    width: 235,
                    labelWidth: 85,
                    fieldLabel: 'Số phiếu:',
                    readOnly: true,
                    bind: {
                        value:'{stockout.stockoutcode}'
                    }
                },
                {
                    xtype: 'datefield',
                    margin: '5 5 0 5',
                    reference: 'txtstockoutdate',
                    width: 200,
                    labelWidth: 70,
                    fieldLabel: 'Ngày xuất:',
                    editable: false,
                    format:'d/m/Y',
			        altFormats: "Y-m-d\\TH:i:s.uO",
                    bind: {
                        value: '{stockout.stockoutdate}'
                    }
                },
                {
                    xtype: 'combo',
                    margin: '5 5 0 5',
                    reference: 'stockout_usercreateid_link',
                    flex: 1,
                    labelWidth: 85,
                    valueField: 'id',
			        displayField: 'fullName',
                    fieldLabel: 'Người xuất:',
                    readOnly: true,
                    bind: {
                        value: '{stockout.usercreateid_link}',
                        store: '{UserStore}'
                    },
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '1 0 0 0',
            items: [
                {
                    xtype: 'combobox',
                    reference: 'stockout_orgid_from_link',
                    width: 375,
                    labelWidth: 80,
                    fieldLabel: 'Nơi xuất:',
                    editable: false,
                    bind: {
                        store: '{OrgFromStore}',
                        value: '{stockout.orgid_from_link}'
                    },
                    queryMode: 'local',
                    anyMatch: true,
                    margin: '0 5 0 5',
                    displayField: 'name',
                    valueField: 'id'
                },
                {
                    xtype: 'combobox',
                    reference: 'stockout_orgid_to_link',
                    width: 445,
                    labelWidth: 85,
                    fieldLabel: 'Nơi nhận:',
                    editable: false,
                    margin: '0 5 0 5',
                    bind: {
                        store: '{OrgToStore}',
                        value: '{stockout.orgid_to_link}'
                    },
                    displayField: 'nameParent',
                    valueField: 'id'
                },
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    reference: 'stockout_shipperson',
                    flex: 1,
                    labelWidth: 85,
                    fieldLabel: 'Người nhận:',
                    readOnly: true,
                    hideLabel: false,
                    bind: {
                        value:'{stockout.shipperson}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '1 0 0 0',
            items: [
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    reference: 'stockout_reason',
                    width: 375,
                    labelWidth: 80,
                    fieldLabel: 'Lý do xuất:',
                    hideLabel: false,
                    bind: {value:'{stockout.reason}'}
                },
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    reference: 'stockout_extrainfo',
                    flex: 1,
                    labelWidth: 85,
                    fieldLabel: 'Kèm theo:',
                    hideLabel: false,
                    bind: {
                        value:'{stockout.extrainfo}'
                    }
                }
            ]
        },
        {
            layout: 'hbox',
            xtype: 'container',
            margin: '1 0 0 0',
            items: [
                {
                    layout: 'hbox',
                    xtype: 'container',
                    margin: '0 5 0 5',
                    border: false,
                    width: 375,
                    items:[
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{stockout.stockout_order_code}'
                            },
                            fieldLabel: 'Số yêu cầu',					
                            labelWidth: 80,
                            width: 343,
                            enableKeyEvents : true,
                            listeners: {
                                keypress: 'onPressEnterBtnStockoutOrder_Search'
                            }
                        },
                        // {
                        // 	xtype:'button',
                        // 	margin: '0 0 0 2',
                        // 	itemId:'btnInvoice_Plus',
                        // 	iconCls: 'x-fa fa-plus',
                        // 	width: 30
                        // },
                        {
                            xtype:'button',
                            margin: '0 0 0 2',
                            itemId:'btnStockoutOrder_Search',
                            iconCls: 'x-fa fa-search',
                            width: 30
                        }
                    ]
                },
                // {
                //     margin: '0 5 0 5',
                //     xtype: 'datefield',
                //     format: GSmartApp.util.State.get('dataFormat'),
                //     altFormats: "Y-m-d\\TH:i:s.uO",
                //     bind: {
                //         value: '{stockout.invoice_date}'
                //     },
                //     editable: false,
                //     labelWidth: 85,
                //     width: 235,
                //     fieldLabel: "Ngày yêu cầu"
                // },
                {
                    xtype:'combo',
                    fieldLabel: 'Đ/vị tính',
                    bind:{
                        store: '{UnitStore}',
                        value: '{stockout.unitid_link}'
                    },
                    valueField: 'id',
                    displayField: 'name',
                    margin: '0 5 0 5',
                    labelWidth: 85,
                    width: 235,
                    queryMode: 'local',
                    anyMatch: true,
                    listeners: {
                        select: 'onSelectUnit'
                    },
                },
                {
                    margin: '0 5 0 5',
                    xtype: 'textfield',
                    itemId: 'statusString',
                    bind: {
                        value: '{stockout.statusString}'
                    },
                    readOnly: true,
                    fieldLabel: "Trạng thái",
                    width: 200,
                    labelWidth: 70
                }
            ]
        }
    ]
});
