Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_Warehouse', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_Pklist_Warehouse',
    itemId: 'Stockout_Pklist_Warehouse',
    reference: 'Stockout_Pklist_Warehouse',
    controller: 'Stockout_Pklist_WarehouseController',
    // viewModel:{
    //     type:'Stockout_Pcontract_ViewModel'
    // },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    // features: [
    //     {
    //         id: 'group',
    //         ftype: 'groupingsummary',
    //         groupHeaderTpl: '<b>Đơn vị: {name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store:'{WarehouseStore}'
    },
    columns:[
        { 
            header: 'Số Lot', 
            dataIndex: 'lotnumber', 
            flex: 1
        },
        { 
            header: 'Số cây', 
            dataIndex: 'packageid', 
            flex: 1
        },
        { 
            header: 'Khổ (cm)', 
            dataIndex: 'width_met', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                var value = value == null ? 0 : Ext.util.Format.number(value, '0,000.00');
                return value * 100;
            }
        },
        { 
            header: 'Dài (m)', 
            dataIndex: 'met', 
            flex: 1
        },
    ],
    // dockedItems:[{
    //     layout:'hbox',
    //     border: false,
    //     dock:'bottom',
    //     items:[
    //         // {
    //         //     xtype:'button',
    //         //     text: 'Thoát',
    //         //     margin: 3,
    //         //     itemId:'btnThoat',
    //         //     iconCls: 'x-fa fa-window-close'
    //         // },
    //         {
    //             flex:1,
    //             border: false
    //         },
    //         {
    //             xtype:'button',
    //             text: 'Thêm NPL',
    //             margin: 3,
    //             itemId:'btnSelect',
    //             iconCls: 'x-fa fa-plus'
    //         },
    //     ]
    // }]
});

