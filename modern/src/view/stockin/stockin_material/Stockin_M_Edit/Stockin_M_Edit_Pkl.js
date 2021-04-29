Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Pkl', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_Pkl',
    itemId: 'Stockin_M_Edit_Pkl',
    id:'Stockin_M_Edit_Pkl',
    cls: 'Stockin_M_Edit_Pkl',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_Pkl',

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
        // listswiper: {
        //     defaults: {
        //         width: 96
        //     },

        //     right: [
        //         {
        //             iconCls: 'x-fa fa-arrow-right',
        //             ui: 'alt action',
        //             commit: 'onAddPklRecheck'
        //         },
        //     ]
        // }
    },

    selectable: {
        rows: true,
        cells: false
    },

    bind: {
        store:'{storePackinglistArr}'
    },

    columns: [{
        text: '',
        width: 30,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Số Lot', 
        // flex: 1,
        width: 90,
        dataIndex: 'lotnumber',
        renderer: function(value, record, dataIndex, cell, column) {
            return value.toUpperCase();
        },
    },
    {
        text: 'Số cây', 
        // flex: 1,
        width: 75,
        dataIndex: 'packageid',
        align: 'right',
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
    {
        text: 'Số cân/kiểm', 
        flex: 1,
        dataIndex: 'grossweight_check',
        align: 'right',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var grossweight_check = record.get('grossweight_check') == null ? 0 : record.get('grossweight_check');
            var grossweight = record.get('grossweight') == null ? 0 : record.get('grossweight');
            if (grossweight <= grossweight_check) {
                cell.setCls('cellWhite');
            } else {
                cell.setCls('cellYellow');
            }
            
            return grossweight + ' / ' + grossweight_check;
        },
    },
    ],
});