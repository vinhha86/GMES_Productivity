Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_D', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockin_M_Edit_D',
    itemId: 'Stockin_M_Edit_D',
    // controller: 'Stockin_M_Edit_D_ViewController',
    reference: 'Stockin_M_Edit_D',
    cls: 'Stockin_M_Edit_D',

    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Mã:</b></div>'+
                    '<div class="content1-sub2"><b>{skucode}</b></div>' +
                    '<div class="content1-sub1">'+
                        '<button class="button" type="button">Chi tiết</button>'+
                    '</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1">Mô tả:</div>'+
                    '<div class="content2-sub2"></div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayM(values)]}>' +
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>SL Y/C:</div>'+
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>{totalmet_origin}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>SL kiểm:</div>'+
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>{totalmet_check}</div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayY(values)]}>' +
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>SL Y/C:</div>'+
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>{totalydsorigin}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>SL kiểm:</div>'+
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>{totalydscheck}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1">Lot:</div>'+
                    '<div class="content2-sub2">{stockinDLot}</div>' +
                '</div>' +
            '</div>',
        '</tpl>'
        , {
           getDisplayM: function (values) {
              if (values.unitid_link != 1) { // không phải met, ẩn
                  return 'display:none;padding-bottom:0px;';
              }
           },
           getDisplayY: function (values) {
            if (values.unitid_link != 3) { // không phải yds, ẩn
                return 'display:none;padding-bottom:0px;';
            }
         },
        }
    ),
   
    // itemTpl:
    //         '<div class="content">' +
    //             '<div class="content1">' +
    //                 '<div class="content1-sub1"><b>Mã:</b></div>'+
    //                 '<div class="content1-sub2"><b>{skucode}</b></div>' +
    //                 // '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
    //                 // '<div class="content1-sub1">{stockindate:date("d/m/y")}</div>' +
    //                 '<div class="content1-sub1">'+
    //                     '<button class="button" type="button">Chi tiết</button>'+
    //                 '</div>' +
    //             '</div>' +

    //             '<div class="content2">'+
    //                 '<div class="content2-sub1">Mô tả:</div>'+
    //                 '<div class="content2-sub2"></div>' +
    //             '</div>' +

    //             '<div class="content1">' +
    //                 '<div class="content1-sub1">SL Y/C:</div>'+
    //                 '<div class="content1-sub1">{totalmet_origin}</div>' +
    //                 '<div class="content1-sub1">SL kiểm:</div>'+
    //                 '<div class="content1-sub1">{totalmet_check}</div>' +
    //             '</div>' +

    //             '<div class="content2">'+
    //                 '<div class="content2-sub1">Lot:</div>'+
    //                 '<div class="content2-sub2">{stockinDLot}</div>' +
    //             '</div>' +

    //         '</div>',

    bind: {
        store:'{stockin.stockin_d}'
    },
});


// Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_D', {
//     extend: 'Ext.grid.Grid',
//     xtype: 'Stockin_M_Edit_D',
//     itemId: 'Stockin_M_Edit_D',
//     // viewModel: {
//     //     type: 'HandoverDetailViewModel'
//     // },
//     // cls: 'HandoverListModern',
//     // controller: 'Stockin_M_Edit_D_Controller',
//     reference: 'Stockin_M_Edit_D',

//     requires: [
//         'Ext.grid.plugin.CellEditing'
//     ],
//     // height: '100%',
//     // width: '100%',
//     markDirty: true,
//     columnLines: true,
//     striped: false,

//     plugins: {
//         gridcellediting: {
//             selectOnEdit: true
//         }
//     },

//     selectable: {
//         rows: false,
//         cells: true
//     },

//     bind: {
//         store:'{stockin.stockin_d}'
//     },

//     columns: [{
//         text: '',
//         width: 30,
//         xtype: 'rownumberer',
//         align: 'center'
//     },
//     {
//         text: 'Mã hàng', 
//         flex: 1,
//         dataIndex: 'skucode'
//     },
//     {
//         xtype: 'numbercolumn',
//         format:'0,000.00',
//         text: 'SL Y/C (M)', 
//         align:'right',
//         dataIndex: 'totalmet_origin',
//         summaryType: 'sum',
//         summaryRenderer: 'renderSum',
//         flex: 1,
//         bind: {
//             hidden: '{isMetColumnHidden}',
//         },
//     },{
//         xtype: 'numbercolumn',
//         format:'0,000.00',
//         text: 'SL Nhập (M)', 
//         align:'right',
//         summaryType: 'sum',
//         summaryRenderer: 'renderSum',
//         dataIndex: 'totalmet_check',
//         flex: 1,
//         bind: {
//             hidden: '{isMetColumnHidden}',
//         },
//     },
//     {
//         xtype: 'numbercolumn',
//         format:'0,000.00',
//         text: 'SL Y/C (Y)', 
//         align:'right',
//         dataIndex: 'totalydsorigin',
//         summaryType: 'sum',
//         summaryRenderer: 'renderSum',
//         flex: 1,
//         bind: {
//             hidden: '{isYdsColumnHidden}',
//         },
//     },{
//         xtype: 'numbercolumn',
//         format:'0,000.00',
//         text: 'SL Nhập (Y)', 
//         align:'right',
//         summaryType: 'sum',
//         summaryRenderer: 'renderSum',
//         dataIndex: 'totalydscheck',
//         flex: 1,
//         bind: {
//             hidden: '{isYdsColumnHidden}',
//         },
//     },
//     {
//         width: 40,
//         hideable: false,

//         cell: {
//             tools: {
//                 approve: {
//                     iconCls: 'x-fa fa-edit',
//                     handler: 'onPklDetail'
//                 },
//             }
//         }
//     }
//     ],
// });