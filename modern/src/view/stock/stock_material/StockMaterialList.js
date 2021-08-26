// Ext.define('GSmartApp.view.stock.stock_material.StockMaterialList', {
//     extend: 'Ext.grid.Grid',
//     xtype: 'StockMaterialList',
//     itemId: 'StockMaterialList',
//     controller: 'StockMaterialListController',
//     cls: 'StockMaterialList',

//     requires: [
//         'Ext.grid.plugin.RowExpander',
//         'Ext.grid.plugin.MultiSelection'
//     ],
    
//     width: '99%',
//     plugins: {
//         rowexpander: true,
//         multiselection: true
//     },

//     itemConfig: {
//         body: {
//             tpl: '<div class="content">' +
//                     '<div class="content1">' +
//                         '<div class="content1-sub1"><b>Mã NPL:</b></div>'+
//                         '<div class="content1-sub1">{skucode}</div>' +
//                         '<div class="content1-sub1"><b>Màu:</b></div>'+
//                         '<div class="content1-sub1">{colorname}</div>' +
//                     '</div>' +

//                     '<div class="content1">' +
//                         '<div class="content1-sub1"><b>Số Lot:</b></div>'+
//                         '<div class="content1-sub1">{lotnumber}</div>' +
//                         '<div class="content1-sub1"><b>Số cây:</b></div>'+
//                         '<div class="content1-sub1">{packageid}</div>' +
//                     '</div>' +

//                     '<div class="content1">' +
//                         '<div class="content1-sub1"><b>Invoice:</b></div>'+
//                         '<div class="content1-sub1">{invoice}</div>' +
//                         '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
//                         '<div class="content1-sub1">{timecreate:date("d/m/y")}</div>' +
//                     '</div>' +

//                     // '<div class="content1">' +
//                     //     '<div class="content1-sub1"><b>Invoice:</b></div>'+
//                     //     '<div class="content1-sub2">{invoice}</div>' +
//                     // '</div>' +

//                     // '<div class="content1">' +
//                     //     '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
//                     //     // '<div class="content1-sub2"><b>{timecreate:date("d/m/y")}</b></div>' +
//                     //     '<div class="content1-sub2">{timecreate:date("d/m/y")}</div>' +
//                     // '</div>' +

//                     // '<div class="content2">'+
//                     //     '<div class="content2-sub1">Màu:</div>'+
//                     //     '<div class="content2-sub2">{sku_product_color}</div>' +
//                     // '</div>' +

//                     '<div class="content1">' +
//                         '<div class="content1-sub1"><b>Đơn hàng:</b></div>'+
//                         '<div class="content1-sub1">{contractcode}</div>' +
//                         '<div class="content1-sub1"><b>Khổ(cm):</b></div>'+
//                         '<div class="content1-sub1">{width_met*100}</div>' +
//                     '</div>' +
//                     '<div class="content1">' +
//                         '<div class="content1-sub1"><b>Met:</b></div>'+
//                         '<div class="content1-sub1">{met}</div>' +
//                         '<div class="content1-sub1"><b>Yard:</b></div>'+
//                         '<div class="content1-sub1">{yds}</div>' +
//                     '</div>' +

//                 '</div>',
//         }
//     },
//     // selectable: {
//     //     rows: true,
//     //     checkbox: true,
//     //     mode: 'multi'
//     // },
//     bind: {
//         store: '{WarehouseStore}'
//     },

//     columns: [
//         {
//             text: 'Company',
//             flex: 1,
//             minWidth: 100,
//             dataIndex: 'name'
//         }, {
//             text: 'Price',
//             width: 75,
//             dataIndex: 'price',
//             formatter: 'usMoney'
//         }, {
//             text: 'Change',
//             width: 90,
//             dataIndex: 'change',
//             // renderer: 'renderChange',
//             // cell: {
//             //     encodeHtml: false
//             // }
//         }, {
//             text: '% Change',
//             width: 100,
//             dataIndex: 'pctChange',
//             // renderer: 'renderPercent',
//             // cell: {
//             //     encodeHtml: false
//             // }
//         }, {
//             text: 'Last Updated',
//             width: 125,
//             dataIndex: 'lastChange',
//             formatter: 'date("m/d/Y")'
//         }
//     ]
// });

Ext.define('GSmartApp.view.stock.stock_material.StockMaterialList', {
    extend: 'Ext.dataview.List',
    xtype: 'StockMaterialList',
    itemId: 'StockMaterialList',
    controller: 'StockMaterialListController',
    // viewModel: {
    //     type: 'StockMaterialListViewModel',
    // },
    cls: 'StockMaterialList',

    // height: 400,
    // width: 400,
    width: '99%',
    // loadingHeight: 400,
    // itemTpl: '{epc}',

    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Mã NPL:</b></div>'+
                    '<div class="content1-sub1">{skucode}</div>' +
                    '<div class="content1-sub1"><b>Màu:</b></div>'+
                    '<div class="content1-sub1">{colorname}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Số Lot:</b></div>'+
                    '<div class="content1-sub1">{lotnumber}</div>' +
                    '<div class="content1-sub1"><b>Số cây:</b></div>'+
                    '<div class="content1-sub1">{packageid}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Invoice:</b></div>'+
                    '<div class="content1-sub1">{invoice}</div>' +
                    '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                    '<div class="content1-sub1">{timecreate:date("d/m/y")}</div>' +
                '</div>' +

                // '<div class="content1">' +
                //     '<div class="content1-sub1"><b>Invoice:</b></div>'+
                //     '<div class="content1-sub2">{invoice}</div>' +
                // '</div>' +

                // '<div class="content1">' +
                //     '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                //     // '<div class="content1-sub2"><b>{timecreate:date("d/m/y")}</b></div>' +
                //     '<div class="content1-sub2">{timecreate:date("d/m/y")}</div>' +
                // '</div>' +

                // '<div class="content2">'+
                //     '<div class="content2-sub1">Màu:</div>'+
                //     '<div class="content2-sub2">{sku_product_color}</div>' +
                // '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Đơn hàng:</b></div>'+
                    '<div class="content1-sub1">{contractcode}</div>' +
                    '<div class="content1-sub1"><b>Khổ(cm):</b></div>'+
                    '<div class="content1-sub1">{width_met*100}</div>' +
                '</div>' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Met:</b></div>'+
                    '<div class="content1-sub1">{met}</div>' +
                    '<div class="content1-sub1"><b>Yard:</b></div>'+
                    '<div class="content1-sub1">{yds}</div>' +
                '</div>' +

            '</div>',
        '</tpl>'
    ),

    grouped: false,
    selectable:{
        mode: 'multi'
    },
    bind: {
        store: '{WarehouseStore}'
    },
    
//     items: [{
//         xtype:'button',
//         iconCls: 'x-fa fa-plus',
//         itemId:'btnChuyenKhoang',
//         text: 'Chuyển khoang',
//         ui: 'action',
//         margin: 1,
//         scrollDock: 'end'
//    }]
});