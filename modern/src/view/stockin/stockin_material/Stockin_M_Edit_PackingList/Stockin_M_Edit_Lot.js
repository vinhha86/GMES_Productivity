Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Lot', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_Lot',
    itemId: 'Stockin_M_Edit_Lot',
    cls: 'Stockin_M_Edit_Lot',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // cls: 'HandoverListModern',
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_Lot',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    // height: '100%',
    // width: '100%',
    // markDirty: true,
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
        // store:'{stockin.stockin_lot}',
        store:'{stockin_lot}'
    },

    columns: [{
        text: '',
        width: 30,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Số lot', 
        flex: 1,
        dataIndex: 'lot_number'
    },
    {
        text: 'SL cây', 
        flex: 1,
        dataIndex: 'totalpackage'
    },
    {
        text: 'SL cây kiểm', 
        flex: 1,
        dataIndex: 'totalpackagecheck',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            if (record.get('totalpackage') == record.get('totalpackagecheck')) {
                cell.setCls('cellWhite');
            } else {
                cell.setCls('cellYellow');
            }
            return value;
        },
    },
    // {
    //     text: 'Tổng số Y', 
    //     flex: 1,
    //     // dataIndex: 'productBuyercode'
    // },
    ],
});