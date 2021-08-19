Ext.define('GSmartApp.view.stock.StockMenu', {
    extend: 'Ext.dataview.NestedList',
    xtype: 'StockMenu',
    id: 'StockMenu',
    controller: 'StockMenuController',

    requires: [
        'Ext.Dialog'
    ],

    // height: 400,
    // width: 300,

    // dialog: {
    //     xtype: 'dialog',
    //     title: 'Dialog',

    //     closable: true,
    //     defaultFocus: 'textfield',
    //     maskTapHandler: 'onCancel',

    //     bodyPadding: 20,
    //     maxWidth: 200,

    //     items: [{
    //         xtype: 'textfield',
    //         reference: 'textField',
    //         name: 'text',
    //         label: 'Name',
    //         bind: '{selectedNode.name}'
    //     }],

    //     // We are using standard buttons on the button
    //     // toolbar, so their text and order are consistent.
    //     buttons: {
    //         ok: 'onOK',
    //         cancel: 'onCancel'
    //     }
    // },

    // store: {
    //     type: 'tree',
    //     model: 'KitchenSink.model.Cars',
    //     root: {},
    //     proxy: {
    //         type: 'ajax',
    //         url: 'data/carregions.json'
    //     }
    // },

    title: 'Phân xưởng',
    emptyText: 'Không có dữ liệu',
    displayField: 'nameMobile',
    useTitleAsBackText: false,
    backText: '',
    backButton: {
        iconCls: 'x-fa fa-arrow-left',
    },

    bind:{
        store:'{StockTreeStore}'
    },

    listeners: {
        // leafchildtap: 'onLeafChildTap',
        // itemtap : 'onItemTap'
    }
});