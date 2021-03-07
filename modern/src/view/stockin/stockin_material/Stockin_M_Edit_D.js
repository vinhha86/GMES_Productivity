Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_D', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_D',
    id: 'Stockin_M_Edit_D',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // cls: 'HandoverListModern',
    controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_D',

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
        store:'{stockin.stockin_d}'
    },

    columns: [
    {
        text: 'Mã NPL', 
        flex: 1,
        dataIndex: 'skucode'
    },
    {
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'SL nhập (m)', 
        align:'right',
        dataIndex: 'totalmet_origin',
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        flex: 1,
    },{
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'SL kiểm (m)', 
        align:'right',
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        dataIndex: 'totalmet_check',
        flex: 1,
    },
    ],

});