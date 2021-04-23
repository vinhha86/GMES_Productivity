Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Pkl_Recheck', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_Pkl_Recheck',
    itemId: 'Stockin_M_Edit_Pkl_Recheck',
    cls: 'Stockin_M_Edit_Pkl_Recheck',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_Pkl_Recheck',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    // height: '100%',
    // width: '100%',
    markDirty: true,
    columnLines: true,
    striped: false,
    infinite: false,
    width: '100%',

    plugins: {
        gridcellediting: {
            selectOnEdit: true
        },
        listswiper: {
            defaults: {
                width: 96
            },
            left: [
                {
                    iconCls: 'x-fa fa-arrow-left',
                    ui: 'alt action',
                    commit: 'onRemovePklRecheck'
                },
            ]
        }
    },

    selectable: {
        rows: false,
        cells: true
    },

    bind: {
        store:'{storePackinglistRecheckArr}'
    },

    columns: [{
        text: '',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Số Lot', 
        flex: 1,
        dataIndex: 'lotnumber'
    },
    {
        text: 'Số cây', 
        flex: 1,
        dataIndex: 'packageid',
        align: 'right'
    },
    {
        text: 'Số M/kiểm', 
        flex: 1,
        dataIndex: 'met_check',
        align: 'right',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var met_check = record.get('met_check') == null ? 0 : record.get('met_check');
            var met_origin = record.get('met_origin') == null ? 0 : record.get('met_origin');
            if (met_origin <= met_check) {
                cell.setCls('cellWhite');
            } else {
                cell.setCls('cellYellow');
            }
            
            return met_origin + ' / ' + met_check;
        },
        bind: {
            hidden: '{isMetColumnHidden}',
        }
    },
    {
        text: 'Số Y/kiểm', 
        flex: 1,
        dataIndex: 'ydscheck',
        align: 'right',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var ydscheck = record.get('ydscheck') == null ? 0 : record.get('ydscheck');
            var ydsorigin = record.get('ydsorigin') == null ? 0 : record.get('ydsorigin');
            if (ydsorigin <= ydscheck) {
                cell.setCls('cellWhite');
            } else {
                cell.setCls('cellYellow');
            }
            
            return ydsorigin + ' / ' + ydscheck;
        },
        bind: {
            hidden: '{isYdsColumnHidden}',
        }
    },
    ],
});