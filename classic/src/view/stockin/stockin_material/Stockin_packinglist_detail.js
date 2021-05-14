Ext.define('GSmartApp.view.stockin.Stockin_packinglist_detail', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_packinglist_detail',
	id: 'Stockin_packinglist_detail',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'Stockin_packinglist_detail_Controller',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
	plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onPackingListItemEdit',
                // beforeedit: 'onPriceDItemBeforeEdit'
            }             
        }
    },
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{PackingListStore}'
	},
	columns: [
        { 
            xtype: 'checkcolumn',
            // text: 'Đi làm',
            dataIndex: 'checked',
            headerCheckbox: false,
            width: 30,
            listeners: {
                // beforecheckchange: 'onBeforecheckchange',
                checkchange: 'onCheckchange',
                // headerclick: 'onHeaderClick'
            }
        },
		{
			text: 'Số Lot', 
			dataIndex: 'lotnumber',
			flex: 1,
            summaryType: 'count',
			summaryRenderer: 'renderCount'
		},
		{
			text: 'Cây số', 
			dataIndex: 'packageid',
            width: 50,
		},
		{
			text: 'Màu', 
			dataIndex: 'color_name',
            flex: 1,
		},
		// {
		// 	text: 'N.W', 
        //     dataIndex: 'netweight',
        //     flex: 1,
		// 	align:'right',
        //     summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	editor:{
		// 		xtype:'textfield',
		// 		maskRe: /[0-9.]/,
		// 		selectOnFocus: true
		// 	},
		// 	renderer: function (value, metaData, record) {
		// 		// if(value ==0) return "";
		// 		metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
		// 		return Ext.util.Format.number(value, '0,000.00');
		// 	}
        // },
        // {
		// 	text: 'G.W', 
        //     dataIndex: 'grossweight',
        //     flex: 1,
		// 	align:'right',
        //     summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	editor:{
		// 		xtype:'textfield',
		// 		maskRe: /[0-9.]/,
		// 		selectOnFocus: true
		// 	},
		// 	renderer: function (value, metaData, record) {
		// 		// if(value ==0) return "";
		// 		metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
		// 		return Ext.util.Format.number(value, '0,000.00');
		// 	}
        // },
        // {
		// 	text: 'M3', 
		// 	dataIndex: 'm3',
        //     flex: 1,
		// 	align:'right',
		// 	summaryType: 'sum',
		// 	summaryRenderer: 'renderSum',
		// 	editor:{
		// 		xtype:'textfield',
		// 		maskRe: /[0-9.]/,
		// 		selectOnFocus: true
		// 	},
		// 	renderer: function (value, metaData, record) {
		// 		// if(value ==0) return "";
		// 		metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
		// 		return Ext.util.Format.number(value, '0,000.00');
		// 	}
		// },
        {
			text: 'Khổ (M)', 
			dataIndex: 'width_met',
            flex: 1,
			align:'right',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isMetColumnHidden}',
			},
		},
        {
			text: 'Khổ thực tế (M)', 
			dataIndex: 'width_met_check',
            flex: 1,
			align:'right',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isMetColumnHidden}',
			},
		},
		{
			text: 'Khổ (Y)', 
			dataIndex: 'width_yds',
            flex: 1,
			align:'right',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
		},
        {
			text: 'Khổ thực tế (Y)', 
			dataIndex: 'width_yds_check',
            flex: 1,
			align:'right',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
		},
		{
			text: 'SL Invoice (m)', 
            dataIndex: 'met_origin',
            flex: 1,
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isMetColumnHidden}',
			},
        },
		{
			text: 'SL nhập (m)', 
            dataIndex: 'met_check',
            flex: 1,
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isMetColumnHidden}',
			},
        },
		{
			text: 'SL Invoice (y)', 
            dataIndex: 'ydsorigin',
            flex: 1,
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
        },
		{
			text: 'SL nhập (y)', 
            dataIndex: 'ydscheck',
            flex: 1,
			align:'right',
            summaryType: 'sum',
			summaryRenderer: 'renderSum',
			editor:{
				xtype:'textfield',
				maskRe: /[0-9.]/,
				selectOnFocus: true
			},
			renderer: function (value, metaData, record) {
				// if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			},
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
        },
		{
			text: 'Ghi chú', 
            dataIndex: 'comment',
            flex: 2,
			editor:{
				xtype:'textfield',
				selectOnFocus: true
			}
        },
		// { 
		// 	xtype: 'actioncolumn',
		// 	reference: 'stockin_contextmenu',
		// 	width: 25,
		// 	menuDisabled: true,
		// 	sortable: false,
		// 	items: [
		// 	{
		// 		iconCls: 'x-fa fas fa-trash',
		// 		tooltip: 'Xóa',
		// 		handler: 'onXoa'
		// 	}
		// ]
		// }   	
	],
	dockedItems: [{
		dock: 'top',
        xtype: 'toolbar',
		items: [
            {
			xtype: 'textfield',
			margin: 1,
			itemId:'lotnumber',
			emptyText: 'Số lot',
			width: 120,
			labelWidth: 0,
			hideLabel: true,
			// maskRe: /[0-9]/,		
            bind:{
				value: '{packinglist.lotnumber}'
            }
		},
            {
			xtype: 'textfield',
			margin: 1,
			itemId:'packageid',
			emptyText: 'Cây số',
			width: 120,
			labelWidth: 0,
			hideLabel: true,
			maskRe: /[0-9]/,		
            bind:{
				value: '{packinglist.packageid}'
            }
		},
		// {
		// 	xtype: 'textfield',
		// 	margin: 1,
		// 	itemId:'netweight',
		// 	emptyText: 'N.W',
		// 	flex: 1,
		// 	labelWidth: 0,
		// 	hideLabel: true,	
		// 	maskRe: /[0-9.]/,		
        //     bind:{
		// 		value: '{packinglist.netweight}'
        //     }
        // },
        // {
		// 	xtype: 'textfield',
		// 	margin: 1,
		// 	itemId:'grossweight',
		// 	emptyText: 'G.W',
		// 	flex: 1,
		// 	labelWidth: 0,
		// 	hideLabel: true,
		// 	maskRe: /[0-9.]/,
        //     bind:{
		// 		value: '{packinglist.grossweight}'
        //     }
		// },
		// {
		// 	xtype: 'textfield',
		// 	margin: 1,
		// 	itemId:'m3',
		// 	emptyText: 'M3',
		// 	flex: 1,
		// 	labelWidth: 0,
		// 	hideLabel: true,
		// 	maskRe: /[0-9.]/,
        //     bind:{
		// 		value: '{packinglist.m3}'
        //     }
        // },
		{
			xtype: 'textfield',
			margin: 1,
			itemId:'width',
			emptyText: 'Khổ',
			width: 120,
			labelWidth: 0,
			hideLabel: true,
			maskRe: /[0-9.]/,
            bind:{
				value: '{packinglist.width}'
            }
        },
        {
			xtype: 'textfield',
			margin: 1,
			itemId:'met_origin',
			emptyText: 'SL Nhập (m)',
			width: 120,
			labelWidth: 0,
			hideLabel: true,
			maskRe: /[0-9.]/,
            bind:{
				value: '{packinglist.met_origin}',
				hidden: '{isMetColumnHidden}',
            }
		},

        {
			xtype: 'textfield',
			margin: 1,
			itemId:'ydsorigin',
			emptyText: 'SL Nhập (y)',
			width: 120,
			labelWidth: 0,
			hideLabel: true,
			maskRe: /[0-9.]/,
            bind:{
				value: '{packinglist.ydsorigin}',
				hidden: '{isYdsColumnHidden}',
            }
		},		
		{
			tooltip: 'Thêm',
			margin: '0 5 0 5',
			itemId: 'btnThemPKL',
			iconCls: 'x-fa fa-plus',
			weight: 30
		} 		
	]
	}]
});

