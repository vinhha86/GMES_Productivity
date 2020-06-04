Ext.define('GSmartApp.view.pcontract.PContractMainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContractMainViewModel',
    requires: ['GSmartApp.store.pcontract.PContractStore', 'GSmartApp.store.org.ListOrgStore',
            'GSmartApp.branch.BranchStore','GSmartApp.season.SeasonStore'],
    stores: {
        PContractStore: {
            type: 'PContractStore'
        },
        CustomerStore:{
            type : 'ListOrgStore'
        },
        BranchStore:{
            type :'BranchStore'
        },
        SeasonStore:{
            type :'SeasonStore'
        }
    }
})