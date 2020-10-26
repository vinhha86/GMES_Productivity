Ext.define('GSmartApp.view.salary.Salary_MainView_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Salary_MainView_Model',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        SalTypeLevelStore: {
            type: 'SalTypeLevelStore'
        }
    },
    data: {
        isMenuHide_SalType: false,
        org_sal_basic: {
            id: null,
            sal_basic: null,
            sal_min: null,
            workingdays: null,
            overtime_normal: null,
            overtime_weekend: null,
            overtime_holiday: null,
            overtime_night: null,
        }
    }
})