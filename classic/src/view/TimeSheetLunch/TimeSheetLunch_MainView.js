Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'TimeSheetLunch_MainView',
    id:'TimeSheetLunch_MainView',
    viewModel:{
        type:'TimeSheetLunch_MainViewModel'
    },
    controller: 'TimeSheetLunch_MainViewController',
    layout: 'border',
    items: [{
        region: 'west',
        width: '30%',
        title: 'Danh sách đơn vị',
        xtype: 'TimeSheetLunch_ListOrgView',
        border: true,
        margin: 1
    
    }, {
        region: 'center',
        width: '70%',
        title: 'Danh sách nhân viên',
        xtype: 'TimeSheetLunch_ListView',
        border: true,
        margin: 1
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype:'datefield',
                margin: 5,
                fieldLabel: 'Ngày làm việc',
                // allowBlank: true,
                reference: 'txtdatefield',
                format: 'd/m/Y',
                value: new Date(),
                width: 300,
                itemId: 'txtdatefield',
                labelWidth: 100,
                listeners: {
                    change: 'onChange'
                }
            },
            {
                flex: 1,
                border: false
            }
        ]
    }]
})