Ext.define('GSmartApp.view.pcontract.PContractList_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContractList_Main_ViewModel',
    requires: ['GSmartApp.store.pcontract.PContractStore', 'GSmartApp.store.org.ListOrgStore',
            'GSmartApp.branch.BranchStore','GSmartApp.season.SeasonStore'],
    stores: {
        PContractStore: {
            type: 'PContractStore'
        },
        PContractPOList: {
            type: 'PContractPOStore'
        },        
        CustomerStore:{
            type : 'ListOrgStore'
        },
        BranchStore:{
            type :'BranchStore'
        },
        SeasonStore:{
            type :'SeasonStore'
        },
        EndBuyer:{
            type : 'ListOrgStore'
        },
        Vendor:{
            type : 'ListOrgStore'
        }
    }
})