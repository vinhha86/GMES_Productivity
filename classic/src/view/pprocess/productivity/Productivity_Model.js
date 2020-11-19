Ext.define('GSmartApp.view.pprocess.Productivity_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Productivity_Model',
    stores: {
        OrgStore: {
            type: 'ListOrgMenuTreeStore'
        },
        SalarySumStore:{
            type: 'SalarySumStore'
        }                
    },
    data: {
        record: null
    }
})