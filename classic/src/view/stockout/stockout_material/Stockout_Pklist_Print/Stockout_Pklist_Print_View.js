Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist_Print.Stockout_Pklist_Print_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_Pklist_Print_View',
    itemId: 'Stockout_Pklist_Print_View',
    reference: 'Stockout_Pklist_Print_View',
    cls: 'Stockout_Pklist_Print_View',
    controller: 'Stockout_Pklist_Print_Controller',
    viewModel:{
        type:'Stockout_Pklist_Print_ViewModel'
    },
    requires: [
		'Ext.grid.plugin.CellEditing',
		'Ext.grid.plugin.Exporter',
	],
    plugins: [
        {
            ptype: 'gridexporter',
            // gridexporter: true
        },
    ],
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
    features: [
        {
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '<b>{name}</b>',
            hideGroupedHeader: false,
            enableGroupingMenu: false,
        },
    ],
    bind:{
        store:'{PackingListStore}'
    },
    columns:[
        { 
            header: 'Mã NPL', 
            dataIndex: 'skucode', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Têm NPL', 
            dataIndex: 'skuname', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Khoang', 
            dataIndex: 'spaceString', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Số Lot', 
            dataIndex: 'lotnumber', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Số cây', 
            dataIndex: 'packageid', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        { 
            header: 'Trạng thái', 
            dataIndex: 'warehousestatusString',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
                if(value == 'Chưa tở'){
                    metaData.tdCls = 'redField';
                }else if(value == 'Đã tở'){
                    metaData.tdCls = 'whiteField';
                }
				return value;
			},
        },
        { 
            header: 'Mã SP', 
            dataIndex: 'stockinProductString', 
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
        },
        // { 
        //     header: 'Trạng thái', 
        //     dataIndex: 'warehousestatus',
        //     flex: 1,
        //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
		// 		var val = value == null ? 0 : value;
        //         if(val == 0){
        //             val = 'Chưa tở';
        //         }else{
        //             val = 'Đã tở';
        //         }
		// 		metaData.tdAttr = 'data-qtip="' + val + '"';
		// 		return val;
		// 	},
        // },
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[
            {
                xtype:'button',
                text: 'Thoát',
                margin: 3,
                itemId:'btnThoat',
                iconCls: 'x-fa fa-window-close'
            },
            {
                flex:1,
                border: false
            },
            {
                xtype:'button',
                // text: 'Xóa',
                margin: 3,
                itemId:'btnSwitch',
                iconCls: 'x-fa fa-refresh',
                bind: {
                    text: '{btnSwitchText}'
                }
            },
            {
                xtype:'button',
                text: 'Xóa',
                margin: 3,
                itemId:'btnDelete',
                iconCls: 'x-fa fa-trash',
            },
            {
                xtype:'button',
                text: 'In',
                margin: 3,
                itemId:'btnPrint',
                iconCls: 'x-fa fa-print',
                cfg: {
                    type: 'excel07',
                    ext: 'xlsx'
                }
            },
        ]
    }]
});

