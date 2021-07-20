Ext.define('GSmartApp.view.dm_loaithietbi.DeviceType_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'DeviceType_View',

    
    controller:'DeviceType_ViewController',
    viewModel:{
        type:  'DeviceType_ViewModel'
      },
    bind:{
        store: '{devices_store}'
    },
    
    
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }, {
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã thiết bị',
        dataIndex: 'code',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'Devices_TypeCodeFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onDevices_TypeCodeFilter',
                buffer: 500
            }
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,
          
            },
    }, {
        text: 'Tên thiết bị',
        dataIndex: 'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'Devices_TypeNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onDevices_TypeNameFilter',
                buffer: 500
            }
        },
        editor: {
           
            xtype: 'textfield',
            selectOnFocus: true
            },
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 90,
            itemId: 'btnThemMoi'
        },{
            xtype:'textfield',
            itemId:'txtCode',
            margin: 5,
          
            width: 250,
            allowBlank: true,
            emptyText: 'Mã thiết bị',
            bind:{
                value:'{device.code}'
            }
        },{
            xtype:'textfield',
            itemId:'txtName',
            margin: 5,
            width: 250,
            allowBlank: false,
            emptyText: 'Tên thiết bị',
            bind:{
                value:'{device.name}'
            }
        }]
    }],
})