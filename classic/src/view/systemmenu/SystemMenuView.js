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
    }]
});

