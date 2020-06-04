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
            border: true,
            margin: 1,
            items:[
                {
                    layout: 'border',
                    items:[
                        {
                            region: 'north',
                            height: 50,
                            // xtype: 'treepicker',
                            xtype: 'combobox',
                            fieldLabel: 'Sản phẩm/Bộ:',
                            flex: 1
                        },
                        {
                            region: 'center',
                            layout: 'border',
                            items:[
                                {
                                    region: 'west',
                                    width: '50%',
                                    xtype: 'PContract_PO_Edit_Info'
                                },
                                {
                                    region: 'center',
                                    xtype: 'PContract_PO_Edit_Factories'
                                }
                            ]
                        },
                        {
                            region: 'south',
                            height: 200,
                            xtype: 'PContract_PO_Edit_Price'
                        }
                    ]
                }
            ]
        }, 
        {
            region: 'west',
            width: '70%',
            xtype: 'panel',
            border: true,
            margin: 1,
            hidden: true
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