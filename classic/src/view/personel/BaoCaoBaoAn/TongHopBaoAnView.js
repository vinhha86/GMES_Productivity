Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnView', {
    extend: 'Ext.form.Panel',
    xtype: 'TongHopBaoAnView',
    id: 'TongHopBaoAnView',
    viewModel: {
        type: 'TongHopBaoAnViewModel'
    },
    controller: 'TongHopBaoAnViewController',
    layout: 'border',
    items: [{
        region: 'west',
        width: 220,
        title: 'Danh sách đơn vị',
        xtype: 'BaoCaoVangMat_listOrgView',
        border: true,
        margin: 1

    }, {
        region: 'center',
        xtype: 'BaoCaoVangMat_DetailView',
        border: true,
        margin: 1
    }]
})