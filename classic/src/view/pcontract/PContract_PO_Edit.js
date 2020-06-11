Ext.define('GSmartApp.view.planporder.PContract_PO_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit',
    layout: 'border',
    controller: 'PContract_PO_Edit_Controller',
    // requires: ['Ext.ux.TreePicker'],
    viewModel: {
        type: 'PContract_PO_Edit_ViewModel'
    },
    items: [
        {
            region: 'west',
            id: 'panel_po',
            // title: 'Giao hàng - Chào giá',
            layout: 'border',
            width: '50%',
            // border: true,
            // margin: 1,
            // collapsible: true,
            items:[
                {
                    region: 'north',
                    height: 30,
                    xtype: 'combobox',
                    fieldLabel: 'Sản phẩm/Bộ:',
                    margin: 1,
                    bind: {
                        store: '{ProductStore}',
                        value: '{productpairid_link}'
                    },
                    displayField: 'name',
                    valueField: 'id',
                    queryMode : 'local'
                },
                {
                    region: 'center',
                    layout: 'border',
                    items:[
                        {
                            region: 'west',
                            width: '70%',
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
                    height: 320,
                    items:[
                        {
                            region: 'west',
                            width: 100,
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
                                    height: 70,
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