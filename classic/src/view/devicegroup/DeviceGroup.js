Ext.define('GSmartApp.view.devicegroup.DeviceGroup', {
    extend: 'Ext.grid.Panel',
    xtype: 'DeviceGroup',
    id: 'DeviceGroup',
    viewModel: {
        type: 'DeviceGroupViewModel'
    },
    controller: 'DeviceGroupController',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 2
        }
    },
    reference: 'DeviceGroup',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{DeviceGroupStore}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên loại thiết bị',
        dataIndex:'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'deviceGroupNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onDeviceGroupNameFilterKeyup',
                buffer: 500
            }
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên loại thiết bị',
                itemId:'txtName',
                listeners:{
                    change:'onChange',
                    focusleave:'onFocusLeave'
                }
            }
        }
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 90,
            itemId: 'btnThemMoi'
        },{
            xtype:'textfield',
            itemId:'txtThemMoi',
            margin: 5,
            flex: 1,
            allowBlank: false,
            blankText: 'Nhập tên loại thiết bị để thêm mới'
        }]
    }],
    listeners:{
        rowclick: 'onRowClick',
        dblclick: 'onRowClick'
    }
});