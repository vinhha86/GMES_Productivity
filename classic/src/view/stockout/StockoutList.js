Ext.define('GSmartApp.view.stockout.StockoutList', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockoutlist',
    reference: 'stockoutlist',
    requires: [
        'GSmartApp.store.Stockout',
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.plugin.RowWidget'
    ],
    layout: 'fit',
    //frame: true,
    scrollable: true,
    store: {
        type: 'stockout'
    },
    columnLines: true,
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: false,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'firstGridDDGroup',
            dropGroup: 'secondGridDDGroup'
        },
        listeners: {
            drop: 'onDrop',
            //beforedrop: 'onBeforeDrop'
        }     
     },
    columns: [
        { header: 'Mã SX', dataIndex: 'pordercode', width: 70,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'porderFilterField',
                width: 65,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPOrderFilterKeyup',
                    buffer: 500
                }
			},
			summaryType: 'count', summaryRenderer: 'renderSum'
        },
		{ header: 'Số phiếu xuất', dataIndex: 'stockoutcode', width: 100},
		{ header: 'Ngày xuất', dataIndex: 'stockoutdate', renderer: Ext.util.Format.dateRenderer('d/m/Y'), width: 90},
        { header: 'Nơi xuất', dataIndex: 'org_from_name', width: 150},
        { header: 'Nơi nhận', dataIndex: 'org_to_name', flex: 1},  
        // { header: 'Người xuất', dataIndex: 'shipperson', width: 100},   
		{ header: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 100},  
		{ header: 'Xuất cắt',  
			columns: [
				{ header: 'Chính', dataIndex: 'total_mainmaterial_stockout_txt', width: 110},
				{ header: 'Lót', dataIndex: 'total_liningmaterial_stockout_txt', width: 110},
				{ header: 'Phối', dataIndex: 'total_mixmaterial_stockout_txt', width: 110},
				{ header: 'Mex', dataIndex: 'total_mex_stockout_txt', width: 110}
			]		
		},		                                   
		// { header: 'Tổng tiền', dataIndex: 'totalprice', flex:1, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { 
			xtype: 'actioncolumn',
            reference: 'stockout_contextmenu',
			width: 45,
			menuDisabled: true,
			sortable: false,
			items: [
				{
					// iconCls: 'x-fa fas fa-bars violetIcon',
					iconCls: 'x-fa fas fa-pencil-square-o greenIcon',
					tooltip:'Sửa phiếu',
					handler: 'onStockoutEdit'
				},
				// {
				// 	// iconCls: 'x-fa fas fa-bars violetIcon',
				// 	iconCls: 'x-fa fas fa-chain blueIcon',
				// 	tooltip:'Đồng bộ Bravo',
				// 	// handler: 'onCheckDetail'
				// },
        	]
        },
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metadata, record) {
                if (record.get('status') > 0) {
                    this.iconCls = 'x-fa fas fa-trash-o greyIcon';
                    this.tooltip = 'Đã đồng bộ Bravo';                    
                }
                else {
                    this.iconCls = 'x-fa fas fa-trash-o redIcon';
                    this.tooltip = 'Xóa phiếu';  
                }
            },            
            handler: 'onStockoutItemDelete'
        }  
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
        {
            xtype: 'datefield',
            fieldLabel: 'Xuất từ ngày:',
            labelWidth: 110,
            width: 240,
            format: 'd/m/Y',
            reference:'stockoutdate_from',
            value: new Date(),  // defaults to today
            // value: Ext.Date.add (new Date(),Ext.Date.DAY,-5),  // defaults to today
        }, 
        {
            xtype: 'datefield',
            fieldLabel: 'đến ngày:',
            labelWidth: 70,
            width: 200,
            format: 'd/m/Y',
            reference:'stockoutdate_to',
            value: new Date(),  // defaults to today
        },         
        {
            tooltip: 'Tìm phiếu xuất',
            iconCls: 'x-fa fa-search',
            weight: 30,
            handler: 'onSearchTap'
        },
        {
            tooltip: 'Danh sách lệnh chờ vào chuyền',
            iconCls: 'x-fa fa-bell-o',
            weight: 30,
            handler: 'onOrderListTap'
        }        
    ]
    }],
    // plugins: {
    //     rowwidget: {
    //         widget: 
    //         {
    //             xtype: 'grid',
    //             autoLoad: true,
    //             bind: {
    //                 store: '{record.stockoutd}',
    //                 // title: 'Danh sách hàng xuất'
	// 			},
	// 			columns: [
	// 				{ header: 'Mã vải chính', dataIndex: 'mainskucode', width: 70},
	// 				{ header: 'Mã NPL', dataIndex: 'skucode', width: 70},
	// 				{ header: 'Loại NPL', dataIndex: 'skutype', width: 70},  
	// 				{ header: 'Khổ vải', dataIndex: 'widthorder', width: 70},   
	// 				// { header: 'Màu vải', dataIndex: 'amountinputsum', width: 70},   
	// 				{ header: 'Mã màu', dataIndex: 'color_code', width: 70},                                      
	// 				{ header: 'Yêu cầu KT', dataIndex: 'totalorder_tech', width: 70, 
	// 					summaryType: 'sum', summaryRenderer: 'renderSum'
	// 				},          
	// 				{ header: 'Thực xuất', dataIndex: 'totalydsprocessed', width: 70, 
	// 					summaryType: 'sum', summaryRenderer: 'renderSum'
	// 				},
	// 				{ header: 'Lỗi', dataIndex: 'totalerror', width: 65, 
	// 					summaryType: 'sum', summaryRenderer: 'renderSum'
	// 				}, 
	// 				{ header: 'Chênh lệch', dataIndex: 'totaldif', width: 65, 
	// 					summaryType: 'sum', summaryRenderer: 'renderSum', renderer: 'renderCell'
	// 				},  
	// 				{ header: 'Danh sách cây vải xuất cắt', dataIndex: 'listpackage', flex: 1},                            
	// 				// { 
	// 				// 	xtype: 'actioncolumn',
	// 				// 	reference: 'stockout_contextmenu',
	// 				// 	width: 25,
	// 				// 	menuDisabled: true,
	// 				// 	sortable: false,
	// 				// 	items: [
	// 				// 	{
	// 				// 		iconCls: 'x-fa fas fa-bars violetIcon',
	// 				// 		tooltip:'Chi tiết kiểm đo',
	// 				// 		handler: 'onCheckDetail'
	// 				// 		//handler: 'onMenu'
	// 				// 	}
	// 				// ]
	// 				// }
	// 			]							
	// 		}
	// 	}
	// },
    listeners: {
        activate: 'onActivate'
    }
});
