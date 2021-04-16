Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_PackingList_D', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockin_M_Edit_PackingList_D',
    itemId: 'Stockin_M_Edit_PackingList_D',
    cls: 'Stockin_M_Edit_PackingList_D',
    // viewModel: {
    //     type: 'HandoverListViewModel'
    // },
    controller: 'Stockin_M_Edit_PackingList_DController',
    reference: 'Stockin_M_Edit_PackingList_D',
    
    itemTpl:
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="{warning}">Số Lô(Lot): <b>{lotnumber}</b></div>' +
                    '<div>Khổ kiểm: {width_check}</div>' +
                    '<div>Cắt mẫu: {sample_check}</div>' +
                    // '<div>Mã vạch:</div>' +
                '</div>' +
                '<div class="content1">' +
                    '<div>Số Cây: <b>{packageid}</b></div>' +
                    '<div class="unitid_link1{unitid_link}">Dài kiểm (M): {met_check}</div>' +
                    '<div class="unitid_link3{unitid_link}">Dài kiểm (Y): {ydscheck}</div>' +                    
                    '<div class="unitid_link1{unitid_link}">Dài phiếu (M): {met_origin}</div>' +
                    '<div class="unitid_link3{unitid_link}">Dài phiếu (Y): {ydsorigin}</div>' +
                    // '<div>Mã chip:</div>' +
                '</div>' +
            '</div>',

    bind: {
        store:'{stockinD.stockin_packinglist}'
    },

});