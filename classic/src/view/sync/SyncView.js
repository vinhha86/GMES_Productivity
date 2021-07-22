Ext.define('GSmartApp.view.sync.SyncView', {
    extend: 'Ext.tab.Panel',
    xtype: 'SyncView',
    id: 'SyncView',
    controller: 'SyncViewController',
    viewModel: {
        type: 'SyncViewModel'
    },
    items: [{
        title: '[1] Đồng bộ',
        xtype: 'FolderMainView'
    },
    {
        title: '[2] Mã hóa/In nhãn'
    }
    ]
})