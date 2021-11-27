Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.ChiTietBaoAnView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ChiTietBaoAnView',
    id: 'ChiTietBaoAnView',
    controller: 'ChiTietBaoAnViewController',
    bind: {
        store: '{BaoAnStore}',
        title: '{title_detail}'
    },
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
    columns: [{
        dataIndex: 'org_name',
        text: 'Tổ',
        flex: 1
    }, {
        dataIndex: 'ca1',
        text: 'Ca 1',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }, {
        dataIndex: 'ca2',
        text: 'Ca 2',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }, {
        dataIndex: 'ca3',
        text: 'Ca 3',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }, {
        dataIndex: 'ca4',
        text: 'Ca 4',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }, {
        dataIndex: 'ca5',
        text: 'Ca 5',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum'
    }]
});

