Ext.define('GSmartApp.view.planporder.PContract_PO_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit',
    layout: 'border',
    controller: 'PContract_PO_Edit_Controller',
    // requires: ['Ext.ux.TreePicker'],
    // viewModel: {
    //     type: 'PlanEdit_ViewModel'
    // },
    items: [
        {
            region: 'west',
            id: 'panel_po',
            // title: 'Giao hàng - Chào giá',
            layout: 'border',
            width: '40%',
            border: true,
            margin: 1,
            // collapsible: true,
            items:[
                {
                    region: 'north',
                    height: 30,
                    // xtype: 'treepicker',
                    xtype: 'combobox',
                    fieldLabel: 'Sản phẩm/Bộ:',
                    margin: 1,
                },
                {
                    region: 'center',
                    layout: 'border',
                    items:[
                        {
                            region: 'west',
                            width: 225,
                            xtype: 'PContract_PO_Edit_Info',
                            border: true,
                            margin: 1,
                        },
                        {
                            region: 'center',
                            xtype: 'PContract_PO_Edit_Factories',
                            border: true,
                            margin: 1,
                        }
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 280,
                    items:[
                        {
                            region: 'north',
                            height: 70,
                            xtype: 'PContract_PO_Edit_PriceSumUp',
                        },
                        {
                            region: 'center',
                            border: true,
                            xtype: 'PContract_PO_Edit_Price',
                        }
                    ],
                    border: true,
                    margin: 1,
                }
            ]
        }, 
        {
            region: 'center',
            xtype: 'PContract_porder_gantt',
            border: true,
            margin: 1,
            // hidden: true
        },
    ],
    dockedItems:[{
        dock:'bottom',
        layout: 'hbox',
        items:[{
            flex:1
        },{
            xtype:'button',
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