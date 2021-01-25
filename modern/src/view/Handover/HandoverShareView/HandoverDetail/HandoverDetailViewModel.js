Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverDetail.HandoverDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverDetailViewModel',
    requires: [
        'GSmartApp.store.handover.HandoverStore',
    ],
    stores: {
        UserListStore: {
            type: 'userliststore'
        },
        ListOrgStore_To: {
            type: 'ListOrgStore'
        },
        ListOrgStore_From: {
            type: 'ListOrgStore'
        },
        HandoverSkuStore: {
            type: 'HandoverSkuStore'
        },
        HandoverProductStore:{
            type: 'HandoverProductStore'
        },
    },
    data: {
        id: 0,
        currentRec: {
            id: null,
            handovertypeid_link: null,
            handover_code: null,
            handover_date: null,
            handover_userid_link: null,
            receiver_userid_link: null,
            orgid_from_link: null,
            orgid_to_link: null,
            reason: null,
            extrainfo: null,
            porderid_link: null,
            pordergrantid_link: null,
            status: null,
            handoverProducts: [{
                
            }]
        },
        pordercode: '',
        isCreateNew: false,
        isIn: false, // view nhap
        isOut: false, // view xuat
        viewId: '', // id view HandoverDetail ex: handover_cut_toline_detail
        viewIdParent: '', // id view parent HandoverDetail ex: handover_cut_toline_edit
        viewIdList: '', //  id view list, for btnQuayLai ex: handover_cut_toline
        radioVal: 1,

        // PACK TO STOCK values:
        ptsBuyerCode: '',
        ptsQuantity: null,
        ptsSkuCode: '',
    },
    formulas: {
        isBtnConfirmOutHidden: function(get){ // btn xac nhan xuat

        },
        isBtnConfirmInHidden: function(get){ // btn xac nhan nhan
        
        }
    }
})