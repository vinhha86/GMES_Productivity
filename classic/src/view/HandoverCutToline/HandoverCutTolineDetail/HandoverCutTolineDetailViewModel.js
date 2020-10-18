Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutTolineDetailViewModel',
    requires: [
        'GSmartApp.store.UserListStore',
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.pprocess.POrderGrantStore',
        'GSmartApp.store.handover.HandoverProductStore'
    ],
    stores: {
        UserListStore: {
            type: 'userliststore'
        },
        ListOrgStore: {
            type: 'ListOrgStore'
        },
        POrder_ListStore: {
            type: 'POrder_ListStore'
        },
        POrderGrantStore:{
            type: 'POrderGrantStore'
        },
        HandoverProductStore:{
            type: 'HandoverProductStore'
        }
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
    },
    formulas: {
        isBtnConfirmOutHidden : function (get) {
            if (get('isIn')) {
                return true;
            }
            if (get('isCreateNew')) {
                return true;
            }
            if (get('currentRec.status') != 0) {
                return true;
            }
            return false;
        },
        isBtnConfirmInHidden : function (get) {
            if (get('isOut')) {
                return true;
            }
            if (get('isCreateNew')) {
                return true;
            }
            if (get('currentRec.status') != 1) {
                return true;
            }
            return false;
        },
    }
})