Ext.define('GSmartApp.view.stock.stock_material.StockMaterialList', {
    extend: 'Ext.dataview.List',
    xtype: 'StockMaterialList',
    itemId: 'StockMaterialList',
    controller: 'StockMaterialListController',
    viewModel: {
        type: 'StockMaterialListViewModel',
    },
    cls: 'StockMaterialList',

    // height: 400,
    width: 400,
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
                //     // '<div class="content1-sub2">{invoice}</div>' +
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
                    '<div class="content1-sub1"><b>Met:</b></div>'+
                    '<div class="content1-sub1">{met}</div>' +
                    '<div class="content1-sub1"><b>Yard:</b></div>'+
                    '<div class="content1-sub1">{yds}</div>' +
                '</div>' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Khổ(cm):</b></div>'+
                    '<div class="content1-sub1">{width_met*100}</div>' +
                    '<div class="content1-sub1"><b>Đơn hàng:</b></div>'+
                    '<div class="content1-sub1">{contractcode}</div>' +
                '</div>' +

            '</div>',
        '</tpl>'
    ),

    grouped: false,
    bind: {
        store: '{WarehouseStore}'
    }
});