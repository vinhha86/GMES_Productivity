Ext.define('GSmartApp.view.systemmenu.SystemMenuAddViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SystemMenuAddViewModel',
    requires: ['GSmartApp.store.groupuser.GroupUser_Menu_TreeStore'],
    stores: {
        MenuStore: {
            type: 'GroupUser_Menu_TreeStore'
        }
    },
    data: {
        roleid_link: 0,
        menuid_link: ''
    }
})