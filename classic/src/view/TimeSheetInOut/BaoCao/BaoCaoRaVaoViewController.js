Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVaoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoRaVaoViewController',
    init: function (view) {
        var viewmodel = this.getViewModel();
        var ListOrgStore = viewmodel.getStore('ListOrgStore');
        ListOrgStore.loadOrg_ByOrgType(13);

        var session = GSmartApp.util.State.get('session');
        if (session.orgid_link != 1) {
            viewmodel.set('timesheetdaily.orgid_link', session.orgid_link);

            me.onSearch();
        }


    },
    control: {

    },
    Search: function () {
        var viewmodel = this.getViewModel();
        var month = viewmodel.get('timesheetdaily.month');
        var year = viewmodel.get('timesheetdaily.year');
        var orgid_link = viewmodel.get('timesheetdaily.orgid_link');

        var store = viewmodel.getStore('TimeSheetDailyStore');
        store.loadStore(month, year, orgid_link);
    }
})