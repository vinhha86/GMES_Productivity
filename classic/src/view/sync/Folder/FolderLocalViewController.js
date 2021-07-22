Ext.define('GSmartApp.view.sync.Folder.FolderLocalViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FolderLocalViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('FolderTreeStore');
        var path = viewmodel.get('pathLocal');
        store.loadFolderLocal(path);
    },
    control: {
        'FolderLocalView': {
            itemdblclick: 'onEntryFolder'
        },
        '#textpathLocal': {
            specialkey: 'onSpecialkey'
        },
        '#btnUpload': {
            click: 'onUpload'
        }
    },
    listen: {
        store: {
            'FolderTreeStore': {
                'loadFolderLocalSuccess': 'onloadFolderLocalSuccess'
            }
        }

    },
    onSpecialkey: function (field, e) {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('FolderTreeStore');
        if (e.getKey() == e.ENTER) {
            var value = field.getValue();
            if (!value.includes("/"))
                value += "/";
            store.loadFolderLocal(value);
        }
    },
    onloadFolderLocalSuccess: function (path) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pathLocal', path);
    },
    onEntryFolder: function (grid, record, item, index, e, eOpts) {
        if (record.get('IsDir')) {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('FolderTreeStore');
            var path = record.get('Path');
            if (path == "..") {
                var currentPath = viewmodel.get('pathLocal');
                var lst = currentPath.split('/');
                path = "";
                if (lst.length > 2) {
                    for (var i = 0; i < lst.length - 2; i++) {
                        path += lst[i] + "/";
                    }
                }
            }
            store.loadFolderLocal(path);
        }
    },
    onUpload: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('FolderTreeStore');
        if (store.data.length == 1) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Thư mục gốc không có File bạn hãy chọn lại thư mục',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            var params = new Object();

        }
    }
})