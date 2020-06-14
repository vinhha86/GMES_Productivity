Ext.define('GSmartApp.view.vendor.VendorViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.VendorViewModel',
    requires: ['GSmartApp.store.OrgStore'],
    stores: {
        OrgStore: {
            type: 'orgstore'
        }
    },
    data: {
        id: 0,
        name: '',
        currentRec : null
    },
    formulas: {
        title: function (get) {
            if (get('id') == 0) {
                return 'Thêm mới vendor'
            }
            else {
                return 'Thông tin vendor ' + this.get('name');
            }
        }
    }
})