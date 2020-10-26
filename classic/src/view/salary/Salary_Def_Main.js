Ext.define('GSmartApp.view.salary.Salary_Def_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_Def_Main',
    id: 'Salary_Def_Main',
    itemId: 'Salary_Def_Main',
    // controller: 'PContractViewController',
    IdPContract: 0,
    layout: 'border',
    height: 500,
    items: [
    {
        region: 'center',
        margin: 1,
        xtype: 'tabpanel',
        items: [
            {
                title: 'Lương giờ',
                xtype: 'Salary_DefHour_Main'
            },
            {
                title: 'Lương sản phẩm',
                xtype: 'panel'
            },
            {
                title: 'Phụ cấp',
                xtype: 'panel'
            }
        ]            
    }],
    dockedItems: [{
        layout: 'hbox',
        reference: 'dockBottomBar',
        border: false,
        dock: 'bottom',
        items: [{
            flex: 1,
            border: false
        }, 
        {
            xtype: 'button',
            text: 'Lưu',
            margin: 1,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true,
            bind: {
                hidden: '{isHidden_btnLuu}'
            }
        }]
    }]
})