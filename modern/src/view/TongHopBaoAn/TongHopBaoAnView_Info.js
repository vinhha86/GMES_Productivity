// Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnView_Info', {
//     extend: 'Ext.grid.Grid',
//     xtype: 'TongHopBaoAnView_Info',
//     itemId: 'TongHopBaoAnView_Info',
//     // id:'TimeSheetLunch_Info',
//     cls: 'TongHopBaoAnView_Info',
//     reference: 'TongHopBaoAnView_Info',
//     requires: [
//         'Ext.grid.plugin.CellEditing'
//     ],
//     // height: '100%',
//     // width: '100%',
//     markDirty: true,
//     columnLines: true,
//     striped: false,
//     variableHeights: true,
//     width: '100%',

//     plugins: {
//         gridcellediting: {
//             selectOnEdit: true
//         },
//     },

//     selectable: {
//         rows: true,
//         cells: false
//     },

//     bind: {
//         store: '{TimeSheetLunchStore}'
//     },
//     plugins: {
//         gridsummaryrow: true,
//     },
//     columns: [
//         {
//             text: 'Tổ', 
//             flex: 1,
//             // width: 90,
//             dataIndex: 'orgCode',
//             align: 'center',
//             // renderer: function(value, record, dataIndex, cell, column) {
//             //     return value.toUpperCase();
//             // },
//         },
//         {
//             text: 'Ca 1', 
//             flex: 1,
//             dataIndex: 'sumCa1',
//             align: 'center',
//             summary: 'sum',
//             summaryRenderer: 'renderSum'
//         },
//         {
//             text: 'Ca 2', 
//             flex: 1,
//             dataIndex: 'sumCa2',
//             align: 'center',
//             summary: 'sum',
//             summaryRenderer: 'renderSum'
//         },
//         {
//             text: 'Ca 3', 
//             flex: 1,
//             dataIndex: 'sumCa3',
//             align: 'center',
//             summary: 'sum',
//             summaryRenderer: 'renderSum'
//         },
//         {
//             text: 'Ca 4', 
//             flex: 1,
//             dataIndex: 'sumCa4',
//             align: 'center',
//             summary: 'sum',
//             summaryRenderer: 'renderSum'
//         },
//         {
//             text: 'Ca 5', 
//             flex: 1,
//             dataIndex: 'sumCa5',
//             align: 'center',
//             summary: 'sum',
//             summaryRenderer: 'renderSum'
//         },
//     ],
// });

Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnView_Info', {
    extend: 'Ext.grid.Grid',
    xtype: 'TongHopBaoAnView_Info',
    itemId: 'TongHopBaoAnView_Info',
    // id:'TimeSheetLunch_Info',
    cls: 'TongHopBaoAnView_Info',
    reference: 'TongHopBaoAnView_Info',
    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    // height: '100%',
    // width: '100%',
    markDirty: true,
    columnLines: true,
    striped: false,
    variableHeights: true,
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
        store: '{TimeSheetLunchStore}'
    },
    plugins: {
        gridsummaryrow: true,
    },
    columns: [
        {
            text: 'Ca', 
            flex: 1,
            // width: 90,
            dataIndex: 'caName',
            align: 'center',
            // renderer: function(value, record, dataIndex, cell, column) {
            //     return value.toUpperCase();
            // },
        },
        {
            text: 'Đăng ký', 
            flex: 1,
            dataIndex: 'soDangKy',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Thêm', 
            flex: 1,
            dataIndex: 'soThem',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
        
        {
            text: 'Tổng', 
            flex: 1,
            dataIndex: 'soTong',
            align: 'center',
            summary: 'sum',
            summaryRenderer: 'renderSum'
        },
    ],
});