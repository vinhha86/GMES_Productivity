Ext.define('GSmartApp.view.systemmenu.SystemMenuView', {
    extend: 'Ext.tree.Panel',
    xtype: 'SystemMenuView',
    id: 'SystemMenuView',
    controller: 'SystemMenuViewController',
    reference: 'SystemMenuView',
    viewModel: {
        type: 'SystemMenuViewModel'
    },
    rootVisible: false,
    bind: {
        store: '{MenuStore}'
    },
    columns: [{
        text: 'Menu chức năng',
        dataIndex: 'text',
        xtype: 'treecolumn',

        flex: 1
    },{
        text:'id',
        dataIndex:'id',
        flex: 1
    },{
        text:'xtype',
        dataIndex:'viewType',
        flex: 1
    },{
        text:'icon',
        dataIndex:'iconCls',
        flex: 1
    }
],
    dockedItems:[
        {
            dock:'bottom',
            items:[
                {
                    xtype:'button',
                    text:'Thêm mới',
                    iconCls:'x-fa fa-plus',
                    itemId:'onThemMoi',
                    margin:5
                }
            ]
        }
    ]
});

