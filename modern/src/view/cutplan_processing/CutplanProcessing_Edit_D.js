Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit_D', {
    extend: 'Ext.grid.Grid',
    xtype: 'CutplanProcessing_Edit_D',
    id: 'CutplanProcessing_Edit_D',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // cls: 'HandoverListModern',
    controller: 'CutplanProcessing_Edit_D_Controller',
    reference: 'CutplanProcessing_Edit_D',

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
        // store:'{cutplanProcessing.cutplanProcessingD}',  
        store: '{OrgStore}'
    },

    columns: [
    {
        text: 'Số cây',
        flex: 1,
        // dataIndex: 'skucode'
    },
    {
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'Số M', 
        align:'right',
        // dataIndex: 'totalmet_origin',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        flex: 1,
    },{
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'Số lá', 
        align:'right',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        // dataIndex: 'totalmet_check',
        flex: 1,
    },
    {
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'Tiêu hao', 
        align:'right',
        // dataIndex: 'totalmet_origin',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        flex: 1,
    },
    {
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'Còn', 
        align:'right',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        // dataIndex: 'totalmet_check',
        flex: 1,
    },
    {
        xtype: 'numbercolumn',
        format:'0,000.00',
        text: 'P/S', 
        align:'right',
        // dataIndex: 'totalmet_origin',
        // summaryType: 'sum',
        // summaryRenderer: 'renderSum',
        flex: 1,
    }],

});