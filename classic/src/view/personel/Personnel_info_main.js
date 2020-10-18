Ext.define('GSmartApp.view.personel.Personnel_info_main', {
    extend: 'Ext.form.Panel',
    xtype: 'Personnel_info_main',
    id: 'Personnel_info_main',
    controller: 'Personnel_info_main_ViewController',
    viewModel: {
        type: 'Personnel_info_main_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'north',
        title: 'Thông tin chung',
        xtype: 'Personnel_info',
        height: 225,
        border: true,
        margin: 1
    },{
        region: 'south',
        title: 'Điều chuyển',
        height: 200,
        border: true,
        margin: 1
    }, {
        region: 'center',
        margin: 1,
        layout: 'border',
        items: [{
            region: 'center',
            title: 'Chức vụ',
            margin: 1,
            border: true
        }, {
            region: 'west',
            title: 'Cấp bậc',
            width: '50%',
            margin: 1
        }]
    }],
    dockedItems: [{
        layout: 'hbox',
        reference: 'dockBottomBar',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            margin: 1,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }, 
        {
            xtype: 'button',
            text: 'Lưu',
            margin: 1,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
})