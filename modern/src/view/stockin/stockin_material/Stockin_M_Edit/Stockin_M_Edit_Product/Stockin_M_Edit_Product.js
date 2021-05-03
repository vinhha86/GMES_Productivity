Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Product', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_Product',
    itemId: 'Stockin_M_Edit_Product',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // cls: 'HandoverListModern',
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_Product',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    // height: '100%',
    // width: '100%',
    markDirty: true,
    columnLines: true,
    striped: false,

    plugins: {
        gridcellediting: {
            selectOnEdit: true
        }
    },

    selectable: {
        rows: false,
        cells: true
    },

    bind: {
        store:'{stockin.stockin_product}'
    },

    columns: [{
        text: '',
        width: 30,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Mã SP', 
        flex: 1,
        dataIndex: 'productBuyercode'
    },
    ],
});