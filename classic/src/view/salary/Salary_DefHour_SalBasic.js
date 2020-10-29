Ext.define('GSmartApp.view.salary.Salary_DefHour_SalBasic', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_DefHour_SalBasic',
    id: 'Salary_DefHour_SalBasic',
    itemId: 'Salary_DefHour_SalBasic',
    IdPContract: 0,
    layout: 'border',
    height: 100,
    items: [
    {
        region: 'center',
        xtype: 'panel',
        layout:'hbox',
        items: [
            {
                xtype: 'textfield',
                itemId: 'sal_basic',
                labelWidth: 70,
                fieldLabel: 'Lương cơ sở',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                width: 180,
                margin: 5,
                bind: {
                    value: '{org_sal_basic.sal_basic}'
                },
                vtype: 'dollar',
                textAlign: 'right',
                labelAlign: 'left',
                listeners:{
                    focusleave: 'onUpdateSalBasic'
                }
            },
            {
                xtype: 'textfield',
                itemId: 'sal_min',
                labelWidth: 110,
                fieldLabel: 'Lương tối thiểu vùng',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                width: 220,
                margin: 5,
                bind: {
                    value: '{org_sal_basic.sal_min}'
                },
                vtype: 'dollar',
                textAlign: 'right',
                labelAlign: 'left',
                listeners:{
                    focusleave: 'onUpdateSalBasic'
                }
            },
            {
                xtype: 'numberfield',
                allowDecimals: false,
                minValue: 0,
                maxValue: 30,
                itemId: 'workingdays',
                labelWidth: 140,
                fieldLabel: 'Số ngày làm việc (1 tháng)',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                width: 220,
                margin: 5,
                bind: {
                    value: '{org_sal_basic.workingdays}'
                },
                listeners:{
                    focusleave: 'onUpdateSalBasic'
                }

            }
        ]            
    }]

})