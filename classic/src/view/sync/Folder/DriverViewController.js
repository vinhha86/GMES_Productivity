Ext.define('GSmartApp.view.sync.Folder.DriverViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DriverViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('FolderDriverStore');
        store.loadFolderDriver("");

    },
    control: {
        'DriverView': {
            itemdblclick: 'onEntryFolder',
            select: 'onSelectFolder'
        },
        '#btnReload' : {
            click: 'onReload'
        }
    },
    listen: {
        store: {
            'FolderTreeStore': {
                'loadFolderDriverSuccess': 'onloadFolderDriverSuccess'
            }
        }
    },
    onReload: function(){
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('FolderDriverStore');
        store.loadFolderDriver(viewmodel.get('pathDriver'));
    },
    onloadFolderDriverSuccess: function (path) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pathDriver', path);
    },
    onSelectFolder: function (grid, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pathDriver', record.gte('Path'));
    },
    onEntryFolder: function (grid, record, item, index, e, eOpts) {
        if (record.get('IsDir')) {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('FolderDriverStore');
            var path = record.get('Path');
            if (path == "..") {
                var currentPath = viewmodel.get('pathDriver');
                var lst = currentPath.split('/');
                path = "";
                if (lst.length > 1) {
                    for (var i = 0; i < lst.length - 1; i++) {
                        path += "/" + lst[i];
                    }
                    path = path.substr(1);
                }
            }
            store.loadFolderDriver(path);

        }
    }
})