Ext.define('GSmartApp.view.stockin.Stockin_M_List', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockin_M_List',
    id: 'Stockin_M_List',
    // viewModel: {
    //     type: 'HandoverListViewModel'
    // },
    controller: 'Stockin_M_List_ViewController',
    reference: 'Stockin_M_List',
    // cls: 'HandoverListModern',

    // requires: [
    //     'Ext.grid.plugin.CellEditing'
    // ],

    // height: '100%',
    // width: '100%',
    // rowNumbers: true,
    // markDirty: true,

    // columnLines: true,
    // striped: false,

    // selectable: {
    //     rows: false,
    //     cells: true
    // },
    
    itemTpl:
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Số phiếu:</b></div>'+
                    '<div class="content1-sub1"><b>{stockincode}</b></div>' +
                    '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                    '<div class="content1-sub1">{stockindate:date("m/d/Y")}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Số Invoice:</b></div>'+
                    '<div class="content1-sub1">{invoice_number}</div>' +
                    '<div class="content1-sub1"><b>Ngày Invoice:</b></div>'+
                    '<div class="content1-sub1">{invoice_date:date("m/d/Y")}</div>' +
                '</div>' +

                // '<div class="content1">' +
                // '<div class="content1-sub1"><b>Số Invoice:</b> {invoice_number}</div>' +
                // '<div class="content1-sub2"><b>Ngày Invoice:</b> {invoice_date:date("m/d/Y")}</div>' +
                // '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Loại nhập:</b></div>'+
                    '<div class="content2-sub2">{stockintype_name}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Nơi xuất:</b></div>'+
                    '<div class="content2-sub2">{orgfrom_name}</div>' +
                '</div>' +

                // '<div class="content2"><b>Nơi xuất:</b> {orgfrom_name}</div>' +
            '</div>',

    bind: {
        store:'{StockinStore}'
    },

    // columns: [{
    //     text: 'Số phiếu',
    //     flex: 1,
    //     dataIndex: 'stockincode',
    //     renderer: function (value, record, dataIndex, cell, column ) {
    //         var c = record.data.status;
    //         if (c == -1) {
    //             cell.setCls('status0');
    //         } else if (c == 0) {
    //             cell.setCls('status1');
    //         } else if (c == 1) {
    //             cell.setCls('status2');
    //         }
    //         return value;
    //     },
    //     // editable: true
    // }, {
    //     text: 'Invoice',
    //     flex: 1,
    //     maxWidth: 90,
    //     dataIndex: 'invoice_number',
    // }, {
    //     text: 'Loại',
    //     maxWidth: 90,
    //     dataIndex: 'stockintype_name',
    // }, {
    //     text: 'Ngày nhập',
    //     flex: 1,
    //     maxWidth: 80,
    //     dataIndex: 'stockindate',
    //     renderer: Ext.util.Format.dateRenderer('d/m/y'),
    // }],

});

// Ext.define('GSmartApp.view.stockin.Stockin_M_List', {
//     extend: 'Ext.grid.Grid',
//     xtype: 'Stockin_M_List',
//     id: 'Stockin_M_List',
//     // viewModel: {
//     //     type: 'HandoverListViewModel'
//     // },
//     controller: 'Stockin_M_List_ViewController',
//     reference: 'Stockin_M_List',
//     // cls: 'HandoverListModern',

//     requires: [
//         'Ext.grid.plugin.CellEditing'
//     ],

//     // height: '100%',
//     // width: '100%',
//     // rowNumbers: true,
//     markDirty: true,

//     columnLines: true,
//     striped: false,

//     selectable: {
//         rows: false,
//         cells: true
//     },

//     bind: {
//         store:'{StockinStore}'
//     },

//     columns: [{
//         text: 'Số phiếu',
//         flex: 1,
//         dataIndex: 'stockincode',
//         renderer: function (value, record, dataIndex, cell, column ) {
//             var c = record.data.status;
//             if (c == -1) {
//                 cell.setCls('status0');
//             } else if (c == 0) {
//                 cell.setCls('status1');
//             } else if (c == 1) {
//                 cell.setCls('status2');
//             }
//             return value;
//         },
//         // editable: true
//     }, {
//         text: 'Invoice',
//         flex: 1,
//         maxWidth: 90,
//         dataIndex: 'invoice_number',
//     }, {
//         text: 'Loại',
//         maxWidth: 90,
//         dataIndex: 'stockintype_name',
//     }, {
//         text: 'Ngày nhập',
//         flex: 1,
//         maxWidth: 80,
//         dataIndex: 'stockindate',
//         renderer: Ext.util.Format.dateRenderer('d/m/y'),
//     }],

// });