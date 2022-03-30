Ext.define('GSmartApp.view.balance.PContractProduct_PoLineView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractProduct_PoLineView',
    itemId: 'PContractProduct_PoLineView',
    controller: 'PContractProduct_PoLineViewController',
    // viewModel: {
    //     type : 'SizesetViewModel'
    // },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        scrollable: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PContract_PO}'
    },
    columns: [
        {
            text: 'PO Line',
            dataIndex: 'po_buyer',
            sortable: false,
            menuDisabled: true,
            flex: 1
        },
        {
            text: 'Ngày giao hàng',
            dataIndex: 'shipdate',
            sortable: false,
            menuDisabled: true,
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('d/m/y')
        }
    ],
});

