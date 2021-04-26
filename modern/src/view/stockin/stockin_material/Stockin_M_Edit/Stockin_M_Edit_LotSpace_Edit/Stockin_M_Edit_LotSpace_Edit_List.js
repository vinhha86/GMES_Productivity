Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_LotSpace_Edit_List', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_LotSpace_Edit_List',
    itemId: 'Stockin_M_Edit_LotSpace_Edit_List',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    cls: 'Stockin_M_Edit_LotSpace_Edit_List',
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_LotSpace_Edit_List',

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
    },

    selectable: {
        rows: true,
        cells: false
    },

    bind: {
        store:'{spaces}'
    },

    columns: [
        {
            text: '',
            width: 60,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text: 'Khoang', 
            flex: 1,
            dataIndex: 'space',
        },
        {
            width: 50,
            hideable: false,
            align: 'center',

            cell: {
                tools: {
                    approve: {
                        iconCls: 'x-fa fa-trash',
                        handler: 'onLotSpaceDelete'
                    },
                }
            }
        }
    ],
});