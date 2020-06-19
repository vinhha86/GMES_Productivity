Ext.define('GSmartApp.view.currency.CurrencyGridView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CurrencyGridView',
    id: 'CurrencyGridView',
    controller: 'CurrencyGridViewController',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    reference: 'CurrencyGridView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{CurrencyStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên viết tắt',
        dataIndex: 'code',
        width: 100
    }, {
        text: 'Tên',
        dataIndex: 'name',
        width: 150,
        flex: 1
    }, {
        text: 'Tỉ giá (VND)',
        dataIndex: 'exchangerate',
        width: 150,
        flex: 1
    }]
});

