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
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        columnLines: true,
        getRowClass: function (record, index) {
            if (record.get('orgtypeid_link') == 166) {
                return 'po_offer';
            }
        }
    },
    columns: [{
        dataIndex: 'org_name',
        text: 'Tổ',
        flex: 1
    }, {
        dataIndex: 'ca1',
        // text: 'Ca 1',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        },
        bind: {
            // text: '{column_Ca1_title}',
            text: '{column_Ca1_time}'
        }
    }, {
        dataIndex: 'ca2',
        // text: 'Ca 2',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        },
        bind: {
            // text: '{column_Ca2_title}'
            text: '{column_Ca2_time}'
        }
    }, {
        dataIndex: 'ca3',
        // text: 'Ca 3',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        },
        bind: {
            // text: '{column_Ca3_title}'
            text: '{column_Ca3_time}'
        }
    }, {
        dataIndex: 'ca4',
        // text: 'Ca 4',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        },
        bind: {
            // text: '{column_Ca4_title}'
            text: '{column_Ca4_time}'
        }
    }, {
        dataIndex: 'ca5',
        // text: 'Ca 5',
        width: 70,
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return (value == null || value == 0) ? "" : value;
        },
        bind: {
            // text: '{column_Ca5_title}'
            text: '{column_Ca5_time}'
        }
    }]
});

