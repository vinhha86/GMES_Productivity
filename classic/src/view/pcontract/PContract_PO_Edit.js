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
            region: 'center',
            layout: 'border',
            border: true,
            margin: 1,
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
                    height: 150,
                    xtype: 'PContract_PO_Edit_Price',
                    border: true,
                    margin: 1,
                }
            ]
        }, 
        {
            region: 'east',
            width: '60%',
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