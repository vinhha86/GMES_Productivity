Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TongHopBaoAnViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
        }
    },
    data: {
        date: new Date(),
        org_name: '',
        orgid_link: 0
    },
    formulas: {
        title_detail: function (data) {
            var name = 'Tổng hợp báo ăn ';
            name = data('org_name') == '' ? name : name + " đơn vị " + data('org_name');
            return name;
        }
    }
})