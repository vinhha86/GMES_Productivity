Ext.define('GSmartApp.view.cut_plan.Detail.ThemLoaiPhoiView', {
    extend: 'Ext.form.Panel',
    xtype: 'ThemLoaiPhoiView',
    itemId: 'ThemLoaiPhoiView',
    controller: 'ThemLoaiPhoiViewController',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Tên kế hoạch cắt',
            flex:1,
            labelWidth: 110,
            margin: 5,
            bind: {
                value: '{loaiphoi}'
            }
        },
        {
            xtype: 'checkboxfield',
            fieldLabel: 'Viền',
            flex:1,
            labelWidth: 110,
            margin: 5,
            bind: {
                value: '{isvien}'
            }
        }
    ],
    dockedItems: [{
        layout: 'hbox',
        dock: 'bottom',
        border: false,
        items: [{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }, {
            xtype: 'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save'
        }]
    }]
});

