Ext.define('GSmartApp.view.endbuyer.EndBuyerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.EndBuyerViewModel',
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
                return 'Thêm mới end buyer'
            }
            else {
                return 'Thông tin end buyer ' + this.get('name');
            }
        }
    }
})