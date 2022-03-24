Ext.define('GSmartApp.view.stockin.Stockin_P_Poline_MainView', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_P_Poline_MainView',
    itemId: 'Stockin_P_Poline_MainView',
    layout: 'border',
    controller: 'Stockin_P_Poline_MainViewController',
    viewModel: {
        type: 'Stockin_P_Poline_MainViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    bind: {
        store: '{PContract_PO}'
    },
    columns: [
        {
            text: 'PO Line', 
            dataIndex: 'stockout_order_code', 
            flex: 1,
            // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            //     var val = value == 'null' ? "" : value;
            //     metaData.tdAttr = 'data-qtip="' + val + '"';
            //     return val;
            // },
        },  
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }]
    }]
})