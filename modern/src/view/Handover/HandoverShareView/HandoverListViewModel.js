Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverListViewModel',
    requires: [
        'GSmartApp.store.handover.HandoverStore',
    ],
    stores: {
        HandoverStore: {
            type: 'HandoverStore'
        },
    },
    data: {
        // viewId: ''
    },
    formulas: {
        // isBtnThemMoiHidden : function (get) {
        //     var viewId = get('viewId');
        //     if (
        //         viewId == 'handover_line_fromcut' ||
        //         viewId == 'handover_pack_fromline'
        //     ) {
        //         return true;
        //     }
        //     return false;
        // }
    }
})