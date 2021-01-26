Ext.define('GSmartApp.view.stockin.Balance_Color', {
	extend: 'Ext.grid.Panel',
	xtype: 'Balance_Color',
	id: 'Balance_Color',
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
		store: '{Balance_Color}'
	},
	columns: [
		{
			text: 'Màu', 
			flex: 1,
			dataIndex: 'color_name'
		},{
			xtype: 'numbercolumn',
			format:'0,000',
			text: 'SL', 
			align:'right',
			summaryType: 'sum',
			summaryRenderer: 'renderSum',
			dataIndex: 'totalpackage',
			width: 80
		},
	]
});

