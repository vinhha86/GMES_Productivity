Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_Material_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Grant_SKU_Plan_Material_View',
    itemId: 'POrder_Grant_SKU_Plan_Material_View',
    reference: 'POrder_Grant_SKU_Plan_Material_View',
    controller: 'POrder_Grant_SKU_Plan_Material_View_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    // features: [
    //     {
    //         id: 'group',
    //         ftype: 'groupingsummary',
    //         groupHeaderTpl: '<b>NPL: {name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store: '{POrderGrant_SKU_Plan_MaterialStore}'
    },
    columns: [
        {
            text: 'Mã NPL',
            // dataIndex: 'color_name',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        {
            text: 'Tồn kho',
            // dataIndex: 'color_name',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        {
            text: 'Cây tở',
            // dataIndex: 'color_name',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        {
            text: 'Chi tiết tở vải',
            // dataIndex: 'color_name',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        {
            text: 'Met tở',
            // dataIndex: 'color_name',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        {
            text: 'Met cần',
            // dataIndex: 'color_name',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
    ],
});

