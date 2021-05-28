Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_List.Stockout_M_Edit.Stockout_M_Edit_Pkl_Rip.Stockout_M_Edit_Pkl_Rip', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockout_M_Edit_Pkl_Rip',
    itemId: 'Stockout_M_Edit_Pkl_Rip',
    cls: 'Stockout_M_Edit_Pkl_Rip',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    // controller: 'Stockout_M_Edit_D_Controller',
    reference: 'Stockout_M_Edit_Pkl_Rip',

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
        //             commit: 'onRemovePklRip'
        //         },
        //     ]
        // }
    },

    selectable: {
        rows: true,
        cells: false
    },

    bind: {
        store: '{stockout_pklist_rip}'
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
        text: 'Kiểm dài (M)', 
        flex: 1,
        dataIndex: 'met_check',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            value = Ext.util.Format.number(value, '0.00');
            return value;
        },
        bind: {
            // hidden: '{isMetColumnHidden}',
        }
    },
    {
        text: 'Kiểm dài (Y)', 
        flex: 1,
        dataIndex: 'ydscheck',
        align: 'center',
        renderer: function(value, record, dataIndex, cell, column) {
            if(value == null) value = 0;
            value = Ext.util.Format.number(value, '0.00');
            return value;
        },
        bind: {
            // hidden: '{isYdsColumnHidden}',
        }
    },
    ],
});