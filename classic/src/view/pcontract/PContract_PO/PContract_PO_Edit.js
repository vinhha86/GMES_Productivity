Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit',
    id: 'PContract_PO_Edit',
    layout: 'fit',
    controller: 'PContract_PO_Edit_Controller',
    requires: ['GSmartApp.view.Schedule.Plan.Schedule_plan_View'],
    viewModel: {
        type: 'PContract_PO_Edit_ViewModel'
    },
    items: [
        {
            id: 'panel_cmp',
            xtype: 'Report_CMP',
            border: true,
            margin: 1,
            hidden: true
        },
        {
            id: 'panel_salaryfund',
            xtype: 'Report_SalaryFund',
            border: true,
            margin: 1,
            hidden: true
        },
        {
            region: 'center',
            id: 'panel_schedule',
            layout: 'border',
            hidden: true,
            items:[
                {
                    xtype: 'FilterBar',
                    region: 'north',
                    height: 45,
                    margin: 1
                },
                {
                    region: 'center',
                    xtype: 'Schedule_plan_View',
                    readOnly: true,
                    border: true,
                    margin: 1,
                    // hidden: true
                }
            ]

        },                
        {
            id: 'panel_po',
            layout: 'border',
            items:[
                {
                    region: 'west',
                    // title: 'Giao hàng - Chào giá',
                    layout: 'border',
                    width: 450,
                    // border: true,
                    // margin: 1,
                    // collapsible: true,
                    items:[
                        {
                            region: 'north',
                            height: 42,
                            layout: 'hbox',
                            // padding: 5,
                            items: [
                                {
                                    xtype: 'combobox',
                                    labelStyle: "font-weight: bold;font-size:13px;",
                                    fieldStyle: "font-weight: bold;font-size:13px;",                                    
                                    fieldLabel: 'Sản phẩm/Bộ SP',
                                    labelWidth: 120,
                                    editable: false,
                                    itemId: 'cboProduct',
                                    margin: 5,
                                    bind: {
                                        store: '{ProductStore}',
                                        value: '{product_selected_id_link}'
                                    },
                                    displayField: 'code',
                                    valueField: 'id',
                                    queryMode : 'local',
                                    flex: 1
                                },{
                                    xtype:'button',
                                    width: 20,
                                    itemId:'btnProductInfoCopy',
                                    ui: 'header',
                                    margin: '5 5 0 0',
                                    tooltip: 'Copy',
                                    iconCls: 'x-fa fa-copy',
                                    hidden: true,
                                    bind: {
                                        hidden: '{obj_copy_btn_hidden}'
                                    }
                                },
                                {
                                    xtype:'button',
                                    width: 20,
                                    itemId:'btnProductInfoPaste',
                                    ui: 'header',
                                    margin: '5 5 0 0',
                                    tooltip: 'Dán',
                                    iconCls: 'x-fa fa-paste',
                                    hidden: true,
                                    bind: {
                                        hidden: '{obj_paste_btn_hidden}'
                                    }
                                }
                            ]
                        },
                        {
                            region: 'north',
                            height: 280,
                            layout: 'border',
                            items:[
                                {
                                    region: 'center',
                                    // width: '60%',
                                    xtype: 'PContract_PO_Edit_Info',
                                    border: true,
                                    margin: 1,
                                },
                                // {
                                //     region: 'east',
                                //     width: 200,
                                //     xtype: 'PContract_PO_Edit_Porder_Req',
                                //     border: true,
                                //     margin: 1,
                                // }
                            ]
                        },
                        {
                            region: 'center',
                            xtype: 'PContract_PO_Edit_Sizeset',
                            border: true,
                            margin: 1,      
                        }
                    ]
                }, 
                {
                    region: 'center',
                    layout: 'border',
                    // border: true,
                    items:[
                        {
                            region: 'north',
                            border: true,
                            margin: 1, 
                            // height: 72,
                            height: 40,
                            xtype: 'PContract_PO_Edit_PriceSumUp',
                        },
                        {
                            region: 'center',
                            border: true,
                            margin: 1,
                            xtype: 'PContract_PO_Edit_Price',
                        },
                        {
                            region: 'south',
                            border: true,
                            margin: 1,
                            height: 150,
                            xtype: 'PContract_PO_Edit_Price_D_SKU',
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        },{
            xtype:'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            flex:1
        },
        {
            xtype: 'button',
            margin: 5,
            iconCls: 'x-fa fa-bars',
            menu      : [
                {
                    text: 'Chào giá',
                    iconCls: 'x-fa fa-shopping-basket',
                    weight: 30,
                    handler: 'onShowKHGH'
                },
                {
                    text: 'Tổng hợp CMP',
                    iconCls: 'x-fa fa-dollar',
                    weight: 30,
                    handler: 'onShowCMP'
                },
                {
                    text: 'Tổng hợp Salary Fund',
                    iconCls: 'x-fa fa-money',
                    weight: 30,
                    handler: 'onShowSalaryFund'
                },
                {
                    text: 'Bảng kế hoạch',
                    iconCls: 'x-fa fa-sliders',
                    weight: 30,
                    handler: 'onShowSchedule'
                },
            ]
        },        
    ]
    }]
})