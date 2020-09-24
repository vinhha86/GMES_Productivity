Ext.define('GSmartApp.view.stockout.POrderWaitingList', {
    extend: 'Ext.grid.Panel',
    xtype: 'porderwaitinglist',
    reference: 'porderwaitinglist',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.plugin.RowWidget'
    ],
    layout: 'fit',
    scrollable: true,
    store: {
        type: 'stockout_waitinglist'
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
            // enableDrag: false,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'firstGridDDGroup',
            dropGroup: 'secondGridDDGroup'
        },
        listeners: {
            drop: 'onDrop'
        }     
     },
    columns: [
        { header: 'STT', dataIndex: 'priority', width: 40,
            editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, minValue: 0, maxValue: 100000, selectOnFocus: false},
        },
        { header: 'Mã SX', dataIndex: 'pordercode', flex: 1,
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
            summaryType: 'count', summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIndex) {
                metaData.tdCls =  'process-ready';
                return value;
            }              
        },
		{ header: 'Kiểm đo',  
			columns: [
				{ header: 'Chính', dataIndex: 'total_mainmaterial_check_txt', width: 80},
				{ header: 'Lót', dataIndex: 'total_liningmaterial_check_txt', width: 80},
				{ header: 'Phối', dataIndex: 'total_mixmaterial_check_txt', width: 80},
				{ header: 'Mex', dataIndex: 'total_mex_check_txt', width: 80}
			]		
		},		                                   
		{ header: 'Khử co',  
			columns: [
				{ header: 'Chính', dataIndex: 'total_mainmaterial_processed_txt', width: 80},
				{ header: 'Lót', dataIndex: 'total_liningmaterial_processed_txt', width: 80},
				{ header: 'Phối', dataIndex: 'total_mixmaterial_processed_txt', width: 80},
				{ header: 'Mex', dataIndex: 'total_mex_processed_txt', width: 80}
			]		
		},		                                   
		{ header: 'Xuất cắt',  
			columns: [
				{ header: 'Chính', dataIndex: 'total_mainmaterial_stockout_txt', width: 80},
				{ header: 'Lót', dataIndex: 'total_liningmaterial_stockout_txt', width: 80},
				{ header: 'Phối', dataIndex: 'total_mixmaterial_stockout_txt', width: 80},
				{ header: 'Mex', dataIndex: 'total_mex_stockout_txt', width: 80}
			]		
        },		   
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            iconCls: 'x-fa fas fa-trash-o redIcon',
            handler: 'onRemoveReady'
        }                                          
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
        {
            tooltip: 'Lấy thông tin mới nhất',
            iconCls: 'x-fa fa-refresh',
            weight: 30,
            handler: 'onSearchTap'
        },
        {
            tooltip: 'Danh sách lệnh',
            iconCls: 'x-fa fa-table',
            weight: 30,
            handler: 'onOrderListTap'
        }        
    ]
    }],
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onSTTEdit'
            }            
        },        
        rowwidget: {
            widget: {
                xtype: 'grid',
                autoLoad: true,
                bind: {
                    store: '{record.stockoutd}',
                    // title: 'Danh sách hàng xuất'
                },
                features: [{
                    id: 'group',
                    ftype: 'groupingsummary',
                    groupHeaderTpl: '<b>Mã vải chính: {name} </b>',
                    hideGroupedHeader: false,
                    enableGroupingMenu: false
                },{
                    ftype: 'summary',
                    dock: 'bottom'
                }],
                columnLines: true,  
                viewConfig: {
                    enableTextSelection: true,
                    stripeRows: false
                },                   
				columns: [
                    { header: 'Mã NPL', dataIndex: 'skucode', width: 80},
                    { header: 'Loại NPL', dataIndex: 'skutype', width: 80},  
                    { header: 'Khổ vải', dataIndex: 'widthorder', width: 80},   
                    // { header: 'Màu vải', dataIndex: 'amountinputsum', width: 70},   
                    { header: 'Mã màu', dataIndex: 'color_code', width: 80},                                      
                    { header: 'Yêu cầu KT', dataIndex: 'totalorder_tech', width: 65, 
                        summaryType: 'sum', summaryRenderer: 'renderSum'
                    },          
                    { header: 'Kiểm đo', dataIndex: 'totalydscheck', width: 65, 
                        summaryType: 'sum', summaryRenderer: 'renderSum'
                    },
                    { header: 'Khử co', dataIndex: 'totalydsprocessed', width: 65, 
                        summaryType: 'sum', summaryRenderer: 'renderSum'
                    },
                    { header: 'Chênh lệch', dataIndex: 'totaldif', width: 65, 
                        summaryType: 'sum', summaryRenderer: 'renderSum', renderer: 'renderCell'
                    },
                    { header: 'Xuất cắt', dataIndex: 'totalydsstockout', width: 65, 
                        summaryType: 'sum', summaryRenderer: 'renderSum'
                    }, 
                    { header: 'Danh sách cây vải', dataIndex: 'listpackage', flex: 1}
				]							
			}
		}
	},
    // listeners: {
    //     activate: 'onActivate'
    // }
});
