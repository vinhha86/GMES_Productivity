Ext.define('GSmartApp.view.stockoutforcheck.stockout_forcheck_edit.stockout_forcheck_edit_tovai.Stockout_ForCheck_Warehouse_Select', {
    extend: 'Ext.dataview.List',
    xtype: 'Stockout_ForCheck_Warehouse_Select',
    itemId: 'Stockout_ForCheck_Warehouse_Select',
    controller: 'Stockout_ForCheck_Warehouse_Select_Controller',
    viewModel: 'Stockout_ForCheck_Warehouse_Select_ViewModel',
    cls: 'Stockout_ForCheck_Warehouse_Select',

    // height: 400,
    width: 400,
    // loadingHeight: 400,
    // itemTpl: '{epc}',

    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Invoice:</b></div>'+
                    '<div class="content1-sub2"><b>{invoice}</b></div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                    '<div class="content1-sub2"><b>{timecreate:date("d/m/y")}</b></div>' +
                '</div>' +

                // '<div class="content2">'+
                //     '<div class="content2-sub1">Màu:</div>'+
                //     '<div class="content2-sub2">{sku_product_color}</div>' +
                // '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1">Số Lot:</div>'+ // Y
                    '<div class="content1-sub1">{lotnumber}</div>' +
                    '<div class="content1-sub1">Số cây:</div>'+ // Y
                    '<div class="content1-sub1">{packageid}</div>' +
                '</div>' +
            '</div>',
        '</tpl>'
    ),

    grouped: false,
    bind: {
        store: '{listValue}'
    }
});