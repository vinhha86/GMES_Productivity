Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Stockout_order_D_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_P_Stockout_order_D_View',
    itemId: 'Stockout_P_Stockout_order_D_View',
    reference: 'Stockout_P_Stockout_order_D_View',
    controller: 'Stockout_P_Stockout_order_D_ViewController',
    // viewModel:{
    //     type:'Stockout_Pcontract_ViewModel'
    // },
    // viewConfig: {
    //     stripeRows: false,
    //     enableTextSelection: true,
    //     columnLines: true,
    //     rowLines: true,
    // },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    // features: [
    //     {
    //         id: 'group',
    //         ftype: 'groupingsummary',
    //         groupHeaderTpl: '<b>{name}</b>',
    //         hideGroupedHeader: false,
    //         enableGroupingMenu: false,
    //     },
    // ],
    bind:{
        store:'{Stockout_order_d_store}'
    },
    columns:[
        // {
        //     xtype: 'checkcolumn',
        //     dataIndex: 'isChecked',
        //     width: 50,
        //     headerCheckbox: true,
        //     sortable: false,
        //     menuDisabled: true,
        //     // text: 'MyCheck',
        //     listeners: {
        //         checkchange: 'onCheckcolumnCheckChange',
        //         headercheckchange: 'onHeaderCheckChange'
        //     }
        // },
        { 
            header: 'Mã SP', 
            dataIndex: 'code', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldKhoang',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueKhoangKeyup',
			// 		buffer: 500
			// 	}
			// },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			// summaryType: 'count',
			// summaryRenderer: 'renderCount',
        },
        { 
            header: 'Màu', 
            dataIndex: 'mauSanPham', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldKhoang',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueKhoangKeyup',
			// 		buffer: 500
			// 	}
			// },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			// summaryType: 'count',
			// summaryRenderer: 'renderCount',
        },
        { 
            header: 'Cỡ', 
            dataIndex: 'coSanPham', 
            sortable: false,
            menuDisabled: true,
            flex: 1,
			// items: {
			// 	xtype: 'textfield',
			// 	fieldStyle: "",
			// 	margin: 1,
			// 	reference: 'ValueFilterFieldKhoang',
			// 	width: '99%',
			// 	enableKeyEvents: true,
			// 	listeners: {
			// 		keyup: 'onFilterValueKhoangKeyup',
			// 		buffer: 500
			// 	}
			// },
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
				metaData.tdAttr = 'data-qtip="' + value + '"';
				return value;
			},
			// summaryType: 'count',
			// summaryRenderer: 'renderCount',
        },
    ],
});

