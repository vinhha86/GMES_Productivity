Ext.define('GSmartApp.view.balance.Balance_Product', {
	extend: 'Ext.grid.Panel',
	xtype: 'Balance_Product',
	id: 'Balance_Product',
	columnLines: true,
	rowLines: true,
	border: true,
	features: [{
		ftype: 'summary',
		dock: 'bottom'
	}],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        // getRowClass: function(record, index) {
        //     var c = record.get('status');
        //     if (c == -1) {
        //         return 'epc-error';
        //     }
        //     else {
        //         return 'epc-ok';
        //     }
        // }                     
    },
	bind:{
		store: '{BalanceProductStore}'
	},
	columns: [
		{
			text: 'SKU', 
			width: 100,
			dataIndex: 'product_code'
		},
		{
			text: 'Màu', 
			flex: 1,
			dataIndex: 'color_name'
		},
		{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'amount',
			width: 60
		},
	],
	fbar: [
        '->',
        {
            minWidth: 80,
            text: 'Tính cân đối',
            iconCls: 'x-fa fa-calculator',
            handler: 'onCalBalance'
        }
    ],     
});

