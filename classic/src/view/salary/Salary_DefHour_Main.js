Ext.define('GSmartApp.view.salary.Salary_DefHour_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_DefHour_Main',
    id: 'Salary_DefHour_Main',
    itemId: 'Salary_DefHour_Main',
    controller: 'Salary_DefHour_Controller',
    layout: 'border',
    height: 500,
    items: [
        {
            region: 'north',
            height: 40,
            xtype: 'Salary_DefHour_SalBasic'
        },
        {
            region: 'center',
            xtype: 'panel',
            layout: 'border',
            items:[
                {
                    region: 'west',
                    width: '80%',
                    border: true,
                    xtype: 'Salary_DefHour_SalTypeLevel'
                },
                {
                    region: 'center',
                    xtype: 'panel',
                }
            ]
        }
    ]

})