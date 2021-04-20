Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Lot', {
    extend: 'Ext.dataview.List',
    xtype: 'Stockin_M_Edit_Lot',
    itemId: 'Stockin_M_Edit_Lot',
    reference: 'Stockin_M_Edit_Lot',
    cls: 'Stockin_M_Edit_Lot',

    requires: [
        'Ext.dataview.listswiper.ListSwiper'
    ],

    // itemTpl: '{lot_number} {totalpackage}/{totalpackagecheck}',

    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1">Số lot:</div>'+
                    '<div class="content1-sub2"><b>{lot_number}</b></div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1">SL cây/kiểm:</div>'+
                    '<div class="content1-sub2" style={[this.getWarning(values)]}>{totalpackage}/{totalpackagecheck}</div>' +
                    '<div class="content1-sub3" style={[this.getDisplayM(values)]}>M/kiểm: {totalmet}/{totalmetcheck}</div>'+
                    // '<div class="content1-sub2" style={[this.getDisplayM(values)]}>{totalmet}/{totalmetcheck}</div>' +
                    '<div class="content1-sub3" style={[this.getDisplayY(values)]}>Y/kiểm: {totalyds}/{totalydscheck}</div>'+
                    // '<div class="content1-sub2" style={[this.getDisplayY(values)]}>{totalyds}/{totalydscheck}</div>' +
                '</div>' +

                // '<div class="content1" style={[this.getDisplayM(values)]}>' +
                //     '<div class="content1-sub1" style={[this.getDisplayM(values)]}>SL M/kiểm:</div>'+
                //     '<div class="content1-sub2" style={[this.getDisplayM(values)]}>{totalmet}/{totalmetcheck}</div>' +
                // '</div>' +

                // '<div class="content1" style={[this.getDisplayY(values)]}>' +
                //     '<div class="content1-sub1" style={[this.getDisplayY(values)]}>SL Y/kiểm:</div>'+
                //     '<div class="content1-sub2" style={[this.getDisplayY(values)]}>{totalyds}/{totalydscheck}</div>' +
                // '</div>' +
            '</div>',
        '</tpl>'
        , 
        {
            getWarning: function (values) {
                if (values.totalpackage > values.totalpackagecheck) { // không phải met, ẩn
                    return 'background-color:yellow;color:red;';
                }else{
                    return 'background-color:transparent;color:black;';
                }
            },
            getDisplayM: function (values) {
                var viewModel = Ext.getCmp('Stockin_M_Edit').getViewModel();
                var stockin = viewModel.get('stockin');
                var unitid_link = stockin.unitid_link;
                if (unitid_link != 1) { // không phải met, ẩn
                    return 'display:none;padding-bottom:0px;';
                }
            },
            getDisplayY: function (values) {
                var viewModel = Ext.getCmp('Stockin_M_Edit').getViewModel();
                var stockin = viewModel.get('stockin');
                var unitid_link = stockin.unitid_link;
                if (unitid_link != 3) { // không phải yds, ẩn
                    return 'display:none;padding-bottom:0px;';
                }
            },
        }
    ),

    bind: {
        store:'{stockin.stockin_lot}'
    },
    grouped: false,
    itemConfig: {
        // height: 50
    },

    plugins: {
        listswiper: {
            defaults: {
                width: 48
            },

            right: [{
                iconCls: 'x-fa fa-edit',
                ui: 'alt confirm',
                commit: 'onLotEdit'
            },{
                iconCls: 'x-fa fa-check',
                ui: 'alt action',
                commit: 'onLotCheck'
            }]
        }
    }
});

// Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Lot', {
//     extend: 'Ext.grid.Grid',
//     xtype: 'Stockin_M_Edit_Lot',
//     itemId: 'Stockin_M_Edit_Lot',
//     // viewModel: {
//     //     type: 'HandoverDetailViewModel'
//     // },
//     cls: 'Stockin_M_Edit_Lot',
//     // controller: 'Stockin_M_Edit_D_Controller',
//     reference: 'Stockin_M_Edit_Lot',

//     requires: [
//         'Ext.grid.plugin.CellEditing'
//     ],
//     // height: '100%',
//     // width: '100%',
//     markDirty: false,
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
//         store:'{stockin.stockin_lot}'
//     },

//     columns: [{
//         text: '',
//         width: 30,
//         xtype: 'rownumberer',
//         align: 'center'
//     },
//     {
//         text: 'Số lot', 
//         flex: 1,
//         dataIndex: 'lot_number'
//     },
//     {
//         text: 'SL cây/kiểm', 
//         flex: 1,
//         dataIndex: 'totalpackage',
//         renderer: function(value, record, dataIndex, cell, column) {
//             if(value == null) value = 0;
//             var totalpackagecheck = record.get('totalpackagecheck') == null ? 0 : record.get('totalpackagecheck');
//             var totalpackage = record.get('totalpackage') == null ? 0 : record.get('totalpackage');
//             var status = record.get('status') == null ? -1 : record.get('status');
//             if (status == 0) {
//                 cell.setCls('cellWhite');
//             } else if (status == -1) {
//                 cell.setCls('cellYellow');
//             }
            
//             return totalpackage + ' / ' + totalpackagecheck;
//         },
//     },
//     {
//         width: 80,
//         hideable: false,

//         cell: {
//             tools: {
//                 approve: {
//                     iconCls: 'x-fa fa-check',
//                     handler: 'onLotCheck'
//                 },
//                 edit: {
//                     iconCls: 'x-fa fa-edit',
//                     handler: 'onLotEdit'
//                 },
//             }
//         }
//     },
//     {
//         width: 40,
//         hideable: false,

//         cell: {
//             tools: {
//                 approve: {
//                     iconCls: 'x-fa fa-plus',
//                     handler: 'onLotAddSpace'
//                 },
//             }
//         }
//     }
//     ],
// });