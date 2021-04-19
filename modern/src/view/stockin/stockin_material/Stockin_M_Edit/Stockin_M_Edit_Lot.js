Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Lot', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_Lot',
    itemId: 'Stockin_M_Edit_Lot',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    cls: 'Stockin_M_Edit_Lot',
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_Lot',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    // height: '100%',
    // width: '100%',
    markDirty: false,
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
        store:'{stockin.stockin_lot}'
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
        text: 'SL cây/kiểm', 
        flex: 1,
        dataIndex: 'totalpackage',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var totalpackagecheck = record.get('totalpackagecheck') == null ? 0 : record.get('totalpackagecheck');
            var totalpackage = record.get('totalpackage') == null ? 0 : record.get('totalpackage');
            var status = record.get('status') == null ? -1 : record.get('status');
            if (status == 0) {
                cell.setCls('cellWhite');
            } else if (status == -1) {
                cell.setCls('cellYellow');
            }
            
            return totalpackage + ' / ' + totalpackagecheck;
        },
    },
    {
        width: 80,
        hideable: false,

        cell: {
            tools: {
                approve: {
                    iconCls: 'x-fa fa-check',
                    handler: 'onLotCheck'
                },
                edit: {
                    iconCls: 'x-fa fa-edit',
                    handler: 'onLotEdit'
                },
            }
        }
    }
    ],
});