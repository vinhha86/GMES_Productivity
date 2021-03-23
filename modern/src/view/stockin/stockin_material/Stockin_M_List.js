Ext.define('GSmartApp.view.stockin.Stockin_M_List', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockin_M_List',
    id: 'Stockin_M_List',
    controller: 'Stockin_M_List_ViewController',
    reference: 'Stockin_M_List',
   
    itemTpl:
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Số phiếu:</b></div>'+
                    '<div class="content1-sub1"><b>{stockincode}</b></div>' +
                    '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                    '<div class="content1-sub1">{stockindate:date("d/m/y")}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Số Y/C:</b></div>'+
                    '<div class="content1-sub1">{invoice_number}</div>' +
                    '<div class="content1-sub1"><b>Ngày Y/C:</b></div>'+
                    '<div class="content1-sub1">{invoice_date:date("d/m/y")}</div>' +
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
});
