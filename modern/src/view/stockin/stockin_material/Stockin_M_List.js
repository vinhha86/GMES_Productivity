Ext.define('GSmartApp.view.stockin.Stockin_M_List', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_List',
    id: 'Stockin_M_List',
    // viewModel: {
    //     type: 'HandoverListViewModel'
    // },
    controller: 'Stockin_M_List_ViewController',
    reference: 'Stockin_M_List',
    // cls: 'HandoverListModern',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],

    // height: '100%',
    // width: '100%',
    // rowNumbers: true,
    markDirty: true,

    columnLines: true,
    striped: false,

    selectable: {
        rows: false,
        cells: true
    },

    bind: {
        store:'{StockinStore}'
    },

    columns: [{
        text: 'Số phiếu',
        flex: 1,
        dataIndex: 'stockincode',
        renderer: function (value, record, dataIndex, cell, column ) {
            var c = record.data.status;
            if (c == -1) {
                cell.setCls('status0');
            } else if (c == 0) {
                cell.setCls('status1');
            } else if (c == 1) {
                cell.setCls('status2');
            }
            return value;
        },
        // editable: true
    }, {
        text: 'Invoice',
        flex: 1,
        maxWidth: 90,
        dataIndex: 'invoice_number',
    }, {
        text: 'Loại',
        maxWidth: 90,
        dataIndex: 'stockintype_name',
    }, {
        text: 'Ngày nhập',
        flex: 1,
        maxWidth: 80,
        dataIndex: 'stockindate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
    }],

});