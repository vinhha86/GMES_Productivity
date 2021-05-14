Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_D_PhieuKhoVai_Kho', {
	extend: 'Ext.grid.Panel',
	xtype: 'Stockin_M_Edit_D_PhieuKhoVai_Kho',
	itemId: 'Stockin_M_Edit_D_PhieuKhoVai_Kho',
	requires: [
		'Ext.grid.plugin.CellEditing'
	],
	controller: 'Stockin_M_Edit_D_PhieuKhoVai_KhoController',
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
		store: '{khoArr}'
	},
	columns: [
		{
			text: 'Khổ (M)', 
			dataIndex: 'width_met_check',
            flex: 1,
            summaryType: 'count',
			summaryRenderer: 'renderCount',
            bind:{
                hidden: '{isMetColumnHidden}'
            }
		},
        {
			text: 'Khổ (Y)', 
			dataIndex: 'width_yds_check',
            flex: 1,
            summaryType: 'count',
			summaryRenderer: 'renderCount',
            bind:{
                hidden: '{isYdsColumnHidden}'
            }
		},
	],
	// dockedItems: [
    //     {
    //         dock: 'top',
    //         xtype: 'toolbar',
    //         layout: 'hbox',
    //         items: [
    //             {
    //                 xtype: 'textfield',
    //                 margin: 1,
    //                 itemId:'lotnumber',
    //                 emptyText: 'Số lót',
    //                 width: 100,
    //                 labelWidth: 0,
    //                 hideLabel: true,			
    //                 bind:{
    //                     value: '{lotnumber.lot}'
    //                 }
    //             },
    //             {
    //                 xtype: 'textfield',
    //                 margin: 1,
    //                 itemId:'sizenumber',
    //                 emptyText: 'khổ vải',
    //                 flex: 1,
    //                 labelWidth: 0,
    //                 hideLabel: true,			
    //                 bind:{
    //                     value: '{lotnumber.size}'
    //                 }
    //             },
    //             {
    //                 tooltip: 'Thêm',
    //                 margin: '0 5 0 5',
    //                 itemId: 'btnThemLot',
    //                 iconCls: 'x-fa fa-plus',
    //                 weight: 30
    //             } 		
    //         ]
    //     }
    // ]
});

