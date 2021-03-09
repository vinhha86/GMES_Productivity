Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_PackingList_D', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockin_M_Edit_PackingList_D',
    id: 'Stockin_M_Edit_PackingList_D',
    // viewModel: {
    //     type: 'HandoverListViewModel'
    // },
    controller: 'Stockin_M_Edit_PackingList_DController',
    reference: 'Stockin_M_Edit_PackingList_D',
    
    itemTpl:
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="{warning}">Số Lô(Lot): <b>{lotnumber}</b></div>' +
                    '<div>Khổ nhập: {width}</div>' +
                    '<div>Met nhập: {met_origin}</div>' +
                    '<div>YDS nhập: {ydsorigin}</div>' +
                    '<div>Mã vạch:</div>' +
                '</div>' +
                '<div class="content1">' +
                    '<div>Số Cây/Bó/Túi: <b>{packageid}</b></div>' +
                    '<div>Khổ kiểm: {width_check}</div>' +
                    '<div>Met kiểm: {met_check}</div>' +
                    '<div>YDS kiểm: {ydscheck}</div>' +
                    '<div>Mã chip:</div>' +
                '</div>' +
            '</div>',

    bind: {
        store:'{stockinD.stockin_packinglist}'
    },

});