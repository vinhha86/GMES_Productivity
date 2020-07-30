Ext.define('GSmartApp.view.porders.PorderBom.PorderBom_TabColor', {
    extend: 'Ext.tab.Panel',
    xtype: 'PorderBom_TabColor',
    id: 'PorderBom_TabColor',
    controller: 'PorderBom_TabColor_ViewController',
    tabPosition: 'right',
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items:[{
            xtype:'button',
            text:'Đồng bộ định mức',
            margin: 3,
            itemId: 'btnDongBo'
        }]
    }]
})