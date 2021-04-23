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
        },
        listswiper: {
            defaults: {
                width: 96
            },

            right: [
                {
                    iconCls: 'x-fa fa-edit',
                    ui: 'alt confirm',
                    commit: 'onLotEdit'
                },
                // {
                //     iconCls: 'x-fa fa-check',
                //     ui: 'alt action',
                //     commit: 'onLotCheck'
                // }
            ]
        }
    },

    selectable: {
        rows: false,
        cells: true
    },

    bind: {
        store:'{stockin.stockin_lot}'
    },

    columns: [
    {
        text: '',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Số Lot', 
        // flex: 1,
        width: 100,
        dataIndex: 'lot_number',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = '';
            var status = record.get('status') == null ? -1 : record.get('status');
            if (status == 0) {
                cell.setCls('cellGreen');
            } else {
                cell.setCls('cellYellow');
            }
            
            return value;
        },
    },
    {
        text: 'Cây/kiểm', 
        // flex: 1,
        width: 100,
        dataIndex: 'totalpackage',
        align: 'right',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var totalpackagecheck = record.get('totalpackagecheck') == null ? 0 : record.get('totalpackagecheck');
            var totalpackage = record.get('totalpackage') == null ? 0 : record.get('totalpackage');
            if (totalpackage <= totalpackagecheck) {
                cell.setCls('cellWhite');
            } else {
                cell.setCls('cellYellow');
            }
            
            return totalpackage + ' / ' + totalpackagecheck;
        },
    },
    {
        text: 'M/kiểm', 
        flex: 1,
        dataIndex: 'totalmet',
        align: 'right',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var totalmetcheck = record.get('totalmetcheck') == null ? 0 : record.get('totalmetcheck');
            var totalmet = record.get('totalmet') == null ? 0 : record.get('totalmet');
            if (totalmet <= totalmetcheck) {
                cell.setCls('cellWhite');
            } else {
                cell.setCls('cellYellow');
            }
            
            return totalmet + ' / ' + totalmetcheck;
        },
        bind: {
            hidden: '{isMetColumnHidden}',
        },
    },
    {
        text: 'Y/kiểm', 
        flex: 1,
        dataIndex: 'totalyds',
        align: 'right',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var totalydscheck = record.get('totalydscheck') == null ? 0 : record.get('totalydscheck');
            var totalyds = record.get('totalyds') == null ? 0 : record.get('totalyds');
            if (totalyds <= totalydscheck) {
                cell.setCls('cellWhite');
            } else {
                cell.setCls('cellYellow');
            }
            
            return totalyds + ' / ' + totalydscheck;
        },
        bind: {
            hidden: '{isYdsColumnHidden}',
        },
    },
    {
        width: 50,
        hideable: false,
        align: 'center',

        cell: {
            tools: {
                approve: {
                    iconCls: 'x-fa fa-check',
                    handler: 'onLotCheck'
                },
            }
        }
    }
    ],
});