Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TongHopBaoAnViewModel',
    requires: ['GSmartApp.store.org.ListOrgStore', 'GSmartApp.store.BaoCaoBaoAn.BaoAnStore'],
    stores: {
        OrgStore: {
            type: 'ListOrgStore'
        },
        BaoAnStore: {
            type: 'BaoAnStore'
        }
    },
    data: {
        date_from: new Date(),
        date_to: new Date(),
        org_name: '',
        orgid_link: 0,
        
        column_Ca1_time: '',
        column_Ca2_time: '',
        column_Ca3_time: '',
        column_Ca4_time: '',
        column_Ca5_time: '',
    },
    formulas: {
        title_detail: function (data) {
            var name = 'Tổng hợp báo ăn lao động chính thức';
            name = data('org_name') == '' ? name : name + " đơn vị " + data('org_name');
            return name;
        },
        column_Ca1_title: function (get) {
            var result  = 'Ca 1';
            var column_Ca1_time = get('column_Ca1_time');
            result += column_Ca1_time == null ? '' : column_Ca1_time;
            return result;
        },
        column_Ca2_title: function (get) {
            var result  = 'Ca 2';
            var column_Ca2_time = get('column_Ca2_time');
            result += column_Ca2_time == null ? '' : column_Ca2_time;
            return result;
        },
        column_Ca3_title: function (get) {
            var result  = 'Ca 3';
            var column_Ca3_time = get('column_Ca3_time');
            result += column_Ca3_time == null ? '' : column_Ca3_time;
            return result;
        },
        column_Ca4_title: function (get) {
            var result  = 'Ca 4';
            var column_Ca4_time = get('column_Ca4_time');
            result += column_Ca4_time == null ? '' : column_Ca4_time;
            return result;
        },
        column_Ca5_title: function (get) {
            var result  = 'Ca 5';
            var column_Ca5_time = get('column_Ca5_time');
            result += column_Ca5_time == null ? '' : column_Ca5_time;
            return result;
        },
    },
})