Ext.define('GSmartApp.view.stockout.Stockout_packinglist_warehouse', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockout_packinglist_warehouse',
	id: 'Stockout_packinglist_warehouse',
	title: 'Danh sách hàng tồn kho',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false               
    },
	bind:{
		store: '{WarehouseStore}'
	},
	columns: [
		{
			text: 'Số Lot', 
			dataIndex: 'lotnumber',
            flex: 1,
            // summaryType: 'count',
			// summaryRenderer: 'renderCount'
		},
		{
			text: 'Số cây', 
			dataIndex: 'packageid',
            flex: 1
		},
		{
			text: 'Mầu', 
			dataIndex: 'colorname',
            flex: 1
		},
		{
			text: 'Khổ (cm)', 
			dataIndex: 'width_met',
            flex: 1,
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value * 100, '0,000.00') + '"';
				return Ext.util.Format.number(value * 100, '0,000.00');
			}
		},
		{
			text: 'Dài (M)', 
			dataIndex: 'met',
            flex: 1,
			bind: {
				hidden: '{isMetColumnHidden}',
			},
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
		},

		{
			text: 'Dài (Y)', 
			dataIndex: 'yds',
            flex: 1,
			bind: {
				hidden: '{isYdsColumnHidden}',
			},
			renderer: function (value, metaData, record) {
				if(value ==0) return "";
				metaData.tdAttr = 'data-qtip="' + Ext.util.Format.number(value, '0,000.00') + '"';
				return Ext.util.Format.number(value, '0,000.00');
			}
		},
	],
});

