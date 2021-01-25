Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverDetail.HandoverDetail', {
    extend: 'Ext.grid.Grid',
    xtype: 'HandoverDetail',
    id: 'HandoverDetail',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    controller: 'HandoverDetailController',
    reference: 'HandoverDetail',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],

    border: true,
    height: '100%',
    width: '100%',
    // rowNumbers: true,
    markDirty: true,

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
        store:'{HandoverSkuStore}'
    },

    columns: [{
    //     text: 'SKU',
    //     flex: 1,
    //     dataIndex: 'skuCode',
    //     // editable: true
    // }, {
        text: 'Màu',
        flex: 1,
        maxWidth: 150,
        dataIndex: 'skuColor',
        // editable: true
    }, {
        text: 'Cỡ',
        flex: 1,
        dataIndex: 'skuSize',
        // editable: true
    }, {
        text: 'SL giao',
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
    }, {
        text: 'SL nhận',
        flex: 1,
        maxWidth: 120,
        dataIndex: 'totalpackagecheck',
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