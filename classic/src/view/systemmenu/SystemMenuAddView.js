Ext.define('GSmartApp.view.systemmenu.SystemMenuAddView', {
    extend: 'Ext.form.Panel',
    xtype: 'SystemMenuAddView',
   
    controller:'SystemMenuAddViewController',
    viewModel:{
        type:'SystemMenuAddViewModel'
    },
    items:[
        {
            xtype: 'combobox',
            fieldLabel: 'Menu Cha',
            queryMode: 'local',
            bind:{
                store:'{MenuStore}',
                value: '{Menu.parent_id}'
            },
            displayField:'text_vi',
            valueField: 'id',
            margin : 5,
        },
        {
            xtype:'textfield',
            fieldLabel:'Menu thêm mới:',
            margin: 5,
            bind:'{Menu.text_vi}'
        },
        {
            xtype:'textfield',
            margin: 5,
            fieldLabel:'ID:',
            bind:'{Menu.id}'
        },{
            xtype:'textfield',
            margin: 5,
            fieldLabel:'Xtype:',
            bind:'{Menu.xtype}'
        },{
            xtype:'textfield',
            margin: 5,
            fieldLabel:'Icon:',
            bind:'{Menu.icon}'
        },
    ],
    dockedItems:[
        {
            dock: 'bottom',
            layout: 'hbox',
            items: [{
                xtype: 'button',
                align: 'center',
                iconCls: 'x-fa fa-save',
                margin: 5,
                itemId: 'onThemMoi',
                formBind: true
            },
            {
                xtype: 'button',
                align: 'center',
                iconCls: 'x-fa fa-sign-out',
                margin: 5,
                itemId: 'exit'
            }
            ]
        }
    ]
})