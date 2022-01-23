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
        '#cmbDonVi': {
            select: 'onSelectDonVi'
        }
    },
    listen: {
        store: {
            'TimeSheetDailyStore': {
                'loadStore_done': 'onloadStore_done'
            }
        }
    },
    onSelectDonVi: function (cmb, rec, e) {
        var viewmodel = this.getViewModel();
        var grantStore = viewmodel.getStore('GrantStore');
        grantStore.getbyParent(rec.get('id'));
    },
    onloadStore_done: function (records) {
        var me = this.getView();
        me.setLoading(false);
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('TimeSheetDailyStore');
        var count = 1;
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i];
            if (data.get('sortvalue') == 0) {
                data.set('stt', count);
                count++;
            }
        }
        store.commitChanges();
    },
    Search: function () {
        var me = this.getView();
        me.setLoading("Đang tải dữ liệu");
        var viewmodel = this.getViewModel();
        var month = viewmodel.get('timesheetdaily.month');
        var year = viewmodel.get('timesheetdaily.year');
        var orgid_link = viewmodel.get('timesheetdaily.orgid_link');
        var grantid_link = viewmodel.get('timesheetdaily.grantid_link');

        var store = viewmodel.getStore('TimeSheetDailyStore');
        store.loadStore(month, year, orgid_link, grantid_link);
    },
    onCodeFilter: function () {
        var filterField = this.lookupReference('CodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'personnel_code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onNameFilter: function () {
        var filterField = this.lookupReference('NameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.NameFilter = filters.add({
                id: 'NameFilter',
                property: 'fullname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.NameFilter) {
            filters.remove(this.NameFilter);
            this.NameFilter = null;
        }
    },
    onExport: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();

        var month = viewmodel.get('timesheetdaily.month');
        var year = viewmodel.get('timesheetdaily.year');
        var donvi = grid.down('#cmbDonVi').getRawValue();
        var bophan = grid.down('#cmbBoPhan').getRawValue();

        var cfg = Ext.merge({
            title: donvi + "-" + bophan + " Tháng " + month + " năm " + year,
            fileName: donvi + "-" + bophan + " Tháng " + month + " năm " + year + '.' + "xlsx"
        }, {
            type: 'excel07',
            ext: 'xlsx',
            includeGroups: false,
            includeSummary: false
        });

        grid.saveDocumentAs(cfg);
    }
})