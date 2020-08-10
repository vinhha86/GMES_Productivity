Ext.define('GSmartApp.store.TaskBoard.TaskUser_Store', {
    extend  : 'Kanban.data.TaskStore',
    storeId : 'TaskUser_Store',
    proxy   : 'memory',
    data : [
        { Id : 1, Name : 'Mats' },
        { Id : 2, Name : 'Homer' },
        { Id : 3, Name : 'Brian' },
        { Id : 8, Name : 'Lee' }
    ]
});