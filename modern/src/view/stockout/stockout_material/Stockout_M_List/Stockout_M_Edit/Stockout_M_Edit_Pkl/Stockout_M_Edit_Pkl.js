Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_List.Stockout_M_Edit.Stockout_M_Edit_Pkl.Stockout_M_Edit_Pkl', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockout_M_Edit_Pkl',
    itemId: 'Stockout_M_Edit_Pkl',
    cls: 'Stockout_M_Edit_Pkl',
    // controller: 'Stockout_M_Edit_D_Controller',
    reference: 'Stockout_M_Edit_Pkl',

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
    },

    selectable: {
        rows: true,
        cells: false
    },

    bind: {
        store: '{stockout_pklist}'
    },

    columns: [
    // {
    //     text: '',
    //     width: 30,
    //     xtype: 'rownumberer',
    //     align: 'center'
    // },
    {
        text: 'Số Lot', 
        // flex: 1,
        width: 90,
        dataIndex: 'lotnumber',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            var warehousestatus = record.get('warehousestatus') == null ? 0 : record.get('warehousestatus');
            if (warehousestatus == 1) { // to
                cell.setCls('cellGreen');
            } else if (warehousestatus == 0) { // chua to
                cell.setCls('cellYellow');
            }
            return value.toUpperCase();
        },
    },
    {
        text: 'Số cây', 
        // flex: 1,
        width: 75,
        dataIndex: 'packageid',
        align: 'center',
    },
    {
        text: 'Kiểm dài(M)', 
        flex: 1,
        dataIndex: 'met_check',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var met_check = record.get('met_check') == null ? 0 : record.get('met_check');
            var met_origin = record.get('met_origin') == null ? 0 : record.get('met_origin');
            met_check = Ext.util.Format.number(met_check, '0.00');
            met_origin = Ext.util.Format.number(met_origin, '0.00');

            // if (met_origin == met_check) {
            //     cell.setCls('cellGreen');
            // } else if (met_origin < met_check) {
            //     cell.setCls('cellYellow');
            // } else{
            //     cell.setCls('cellRed');
            // }
            
            return met_origin + ' / ' + met_check;
        },
        bind: {
            hidden: '{isMetColumnHidden}',
        }
    },
    {
        text: 'Kiểm dài(Y)', 
        flex: 1,
        dataIndex: 'ydscheck',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var ydscheck = record.get('ydscheck') == null ? 0 : record.get('ydscheck');
            var ydsorigin = record.get('ydsorigin') == null ? 0 : record.get('ydsorigin');
            ydscheck = Ext.util.Format.number(ydscheck, '0.00');
            ydsorigin = Ext.util.Format.number(ydsorigin, '0.00');

            // if (ydsorigin == ydscheck) {
            //     cell.setCls('cellGreen');
            // } else if (ydsorigin < ydscheck) {
            //     cell.setCls('cellYellow');
            // } else{
            //     cell.setCls('cellRed');
            // }
            
            return ydsorigin + ' / ' + ydscheck;
        },
        bind: {
            hidden: '{isYdsColumnHidden}',
        }
    },
    {
        text: 'Kiểm cân', 
        flex: 1,
        dataIndex: 'grossweight_check',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var grossweight_check = record.get('grossweight_check') == null ? 0 : record.get('grossweight_check');
            var grossweight = record.get('grossweight') == null ? 0 : record.get('grossweight');
            // if (grossweight == grossweight_check) {
            //     cell.setCls('cellGreen');
            // } else if (grossweight < grossweight_check) {
            //     cell.setCls('cellYellow');
            // } else{
            //     cell.setCls('cellRed');
            // }
            
            return grossweight + ' / ' + grossweight_check;
        },
    },
    ],
});