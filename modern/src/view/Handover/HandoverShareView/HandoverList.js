Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverList', {
    extend: 'Ext.grid.Grid',
    xtype: 'HandoverList',
    id: 'HandoverList',
    border: true,
    // viewModel: {
    //     type: 'HandoverListViewModel'
    // },
    controller: 'HandoverListController',
    reference: 'HandoverList',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],

    // height: '100%',
    // width: '100%',
    // rowNumbers: true,
    markDirty: true,

    // plugins: {
    //     gridcellediting: {
    //         selectOnEdit: true,
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onEdit',
    //             // beforeedit: 'onBeforeEdit'
    //         }
    //     }
    // },

    selectable: {
        rows: false,
        cells: true
    },

    bind: {
        store:'{HandoverStore}'
    },

    columns: [{
        text: 'Mã SP',
        flex: 1,
        dataIndex: 'handoverProductBuyercode',
        // editable: true
    }, {
        text: 'Ngày giao',
        flex: 1,
        maxWidth: 150,
        dataIndex: 'handover_date',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        // editable: true
    }, {
        text: 'Nơi nhận',
        flex: 1,
        dataIndex: 'orgToName',
        // editable: true
    }, {
        text: 'Số lượng',
        flex: 1,
        maxWidth: 120,
        dataIndex: 'totalpackage',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        // editor: {
        //     allowBlur: false,
        //     field: {
        //         xtype: 'numberfield'
        //     }
        // }
    }],

});