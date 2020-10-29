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
                xtype: 'Salary_DefProductivity_Main'
            },
            {
                title: 'Phụ cấp',
                xtype: 'panel'
            }
        ]            
    }]
})