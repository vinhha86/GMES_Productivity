Ext.define('GSmartApp.view.sync.Folder.CreatedJobView', {
    extend: 'Ext.form.Panel',
    xtype: 'CreatedJobView',
    id: 'CreatedJobView',
    layout: 'vbox',
    controller: 'CreatedJobViewController',
    viewModel: {
        type: 'CreatedJobViewModel'
    },
    items: [{
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Tên job',
        bind: {
            value: '{jobname}'
        }
    }, {
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Thư mục nguồn',
        editable: false,
        bind: {
            value: '{src_path}'
        }
    }, {
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Thư mục đích',
        editable: false,
        bind: {
            value: '{des_path}'
        }
    }, {
        xtype: 'combo',
        margin: 5,
        width: '100%',
        fieldLabel: 'Loại Job',
        editable: false,
        bind: {
            value: '{classname}',
            store: '{JobTypeStore}'
        },
        valueField: 'id',
        displayField: 'classname'
    }, {
        xtype: 'textfield',
        margin: 5,
        width: '100%',
        fieldLabel: 'Thời gian',
        bind: {
            value: '{time_format}'
        }
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            flex: 1
        }, {
            xtype: 'button',
            text: 'Xác nhận',
            margin: 5,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-check'
        }, {
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})