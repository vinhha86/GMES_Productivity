Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit',
    id: 'PContract_PO_Edit',
    layout: 'border',
    controller: 'PContract_PO_Edit_Controller',
    requires: ['GSmartApp.view.Schedule.Plan.Schedule_plan_View'],
    viewModel: {
        type: 'PContract_PO_Edit_ViewModel'
    },
    items: [
        {
            region: 'west',
            id: 'panel_cmp',
            width: '55%',
            xtype: 'Report_CMP',
            border: true,
            margin: 1,
            hidden: true
        },
        {
            region: 'west',
            id: 'panel_salaryfund',
            width: '55%',
            xtype: 'Report_SalaryFund',
            border: true,
            margin: 1,
            hidden: true
        },        
        {
            region: 'west',
            id: 'panel_po',
            // title: 'Giao hàng - Chào giá',
            layout: 'border',
            width: '55%',
            // border: true,
            // margin: 1,
            // collapsible: true,
            items:[
                {
                    region: 'north',
                    height: 30,
                    xtype: 'combobox',
                    fieldLabel: 'Sản phẩm/Bộ:',
                    editable: false,
                    itemId: 'cboProduct',
                    margin: 1,
                    bind: {
                        store: '{ProductStore}',
                        value: '{product_selected_id_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    queryMode : 'local'
                },
                {
                    region: 'north',
                    height: 230,
                    layout: 'border',
                    items:[
                        {
                            region: 'center',
                            // width: '60%',
                            xtype: 'PContract_PO_Edit_Info',
                            border: true,
                            margin: 1,
                        },
                        {
                            region: 'east',
                            width: 250,
                            xtype: 'PContract_PO_Edit_Porder_Req',
                            border: true,
                            margin: 1,
                        }
                    ]
                },
                {
                    region: 'center',
                    layout: 'border',
                    // height: 280,
                    items:[
                        {
                            region: 'west',
                            width: 180,
                            xtype: 'PContract_PO_Edit_Sizeset',
                            border: true,
                            margin: 1,                            
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
                                }
                            ]
                        }

                    ]
                }
            ]
        }, 
        {
            region: 'center',
            id: 'panel_schedule',
            layout: 'border',
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
    ],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            flex:1
        },{
            xtype:'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})