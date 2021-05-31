Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_ToVai', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockout_ForCheck_Edit_ToVai',
    itemId: 'Stockout_ForCheck_Edit_ToVai',
    cls: 'Stockout_ForCheck_Edit_ToVai',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockout_ForCheck_Edit_ToVai',

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
        //     left: [
        //         {
        //             iconCls: 'x-fa fa-arrow-left',
        //             ui: 'alt action',
        //             commit: 'onRemovePkl'
        //         },
        //     ]
        // }
    },

    selectable: {
        rows: true,
        cells: false
    },

    bind: {
        store: '{Stockout_order_pkl_Store}'
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
        renderer: function(value, record, dataIndex, cell, column) {
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
        dataIndex: 'metcheck',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var metcheck = record.get('metcheck') == null ? 0 : record.get('metcheck');
            var metorigin = record.get('metorigin') == null ? 0 : record.get('metorigin');
            // if (metorigin == metcheck) {
            //     cell.setCls('cellGreen');
            // } else if (metorigin < metcheck) {
            //     cell.setCls('cellYellow');
            // } else{
            //     cell.setCls('cellRed');
            // }
            
            // return metorigin + ' / ' + metcheck;
            metcheck = Ext.util.Format.number(metcheck, '0.00');
            metorigin = Ext.util.Format.number(metorigin, '0.00');
            return metcheck;
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
            // if (ydsorigin == ydscheck) {
            //     cell.setCls('cellGreen');
            // } else if (ydsorigin < ydscheck) {
            //     cell.setCls('cellYellow');
            // } else{
            //     cell.setCls('cellRed');
            // }
            
            // return ydsorigin + ' / ' + ydscheck;
            ydscheck = Ext.util.Format.number(ydscheck, '0.00');
            ydsorigin = Ext.util.Format.number(ydsorigin, '0.00');
            return ydscheck;
        },
        bind: {
            hidden: '{isYdsColumnHidden}',
        }
    },
    {
        text: 'Kiểm khổ(cm)', 
        flex: 1,
        dataIndex: 'width_met_check',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            var width_met_check = record.get('width_met_check') == null ? 0 : record.get('width_met_check');
            var width_met = record.get('width_met') == null ? 0 : record.get('width_met');
            // if (width_met == width_met_check) {
            //     cell.setCls('cellGreen');
            // } else if (width_met < width_met_check) {
            //     cell.setCls('cellYellow');
            // } else{
            //     cell.setCls('cellRed');
            // }
            
            // return width_met + ' / ' + width_met_check;
            return width_met_check * 100;
        },
        bind: {
            // hidden: '{isMetColumnHidden}',
        },
    },
    // {
    //     text: 'Kiểm khổ(Y)', 
    //     flex: 1,
    //     dataIndex: 'width_yds_check',
    //     align: 'center',
    //     renderer: function(value, record, dataIndex, cell, column) {
    //         if(value == null) value = 0;
    //         var width_yds_check = record.get('width_yds_check') == null ? 0 : record.get('width_yds_check');
    //         var width_yds = record.get('width_yds') == null ? 0 : record.get('width_yds');
    //         // if (width_yds == width_yds_check) {
    //         //     cell.setCls('cellGreen');
    //         // } else if (width_yds < width_yds_check) {
    //         //     cell.setCls('cellYellow');
    //         // } else{
    //         //     cell.setCls('cellRed');
    //         // }
            
    //         // return width_yds + ' / ' + width_yds_check;
    //         return width_yds_check;
    //     },
    //     bind: {
    //         hidden: '{isYdsColumnHidden}',
    //     },
    // },
    ],
});