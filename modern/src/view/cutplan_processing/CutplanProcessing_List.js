Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_List', {
    extend: 'Ext.grid.Grid',
    xtype: 'CutplanProcessing_List',
    id: 'CutplanProcessing_List',
    // viewModel: {
    //     type: 'HandoverListViewModel'
    // },
    controller: 'CutplanProcessing_List_Controller',
    reference: 'CutplanProcessing_List',
    // cls: 'HandoverListModern',

    // requires: [
    //     'Ext.grid.plugin.CellEditing'
    // ],

    // height: '100%',
    // width: '100%',
    // rowNumbers: true,
    // markDirty: true,

    columnLines: true,
    striped: false,

    selectable: {
        rows: false,
        cells: true
    },

    bind: {
        store:'{CutplanProcessingStore}'
    },

    columns: [{
        text: 'Mã SP',
        flex: 1,
        // dataIndex: 'stockincode',
        // renderer: function (value, record, dataIndex, cell, column ) {
        //     var c = record.data.status;
        //     if (c == -1) {
        //         cell.setCls('status0');
        //     } else if (c == 0) {
        //         cell.setCls('status1');
        //     } else if (c == 1) {
        //         cell.setCls('status2');
        //     }
        //     return value;
        // },
        // editable: true
    }, {
        text: 'Lệnh SX',
        flex: 1,
        // maxWidth: 90,
        // dataIndex: 'invoice_number',
    }, {
        text: 'Số Lot',
        flex: 1,
        // maxWidth: 90,
        // dataIndex: 'stockintype_name',
    }, {
        text: 'BTP',
        flex: 1,
        // maxWidth: 80,
        // dataIndex: 'stockindate',
        // renderer: Ext.util.Format.dateRenderer('d/m/y'),
    }],

});