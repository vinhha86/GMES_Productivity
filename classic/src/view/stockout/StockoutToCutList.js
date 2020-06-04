Ext.define('GSmartApp.view.stockout.StockoutToCutList', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockouttocutlist',
    reference: 'stockouttocutlist',
    controller: 'stockouttocut',
    requires: [
        'GSmartApp.store.Stockout_d_tocut',
        'Ext.Number',
        'Ext.Date'
    ],
    layout: 'fit',
    //frame: true,
    scrollable: true,
    store: {
        type: 'stockout_d_tocut'
    },
    columnLines: true,
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '<b>Mã sản xuất: {name} </b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
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
    renderTo: Ext.getBody(),   
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
        },
        { header: 'Mã vải chính', dataIndex: 'mainskucode', width: 70},
        { header: 'Mã NPL', dataIndex: 'skucode', width: 70,
            //editor: {xtype: 'textfield', readOnly: true},
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'materialFilterField',
                width: 65,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onMaterialFilterKeyup',
                    buffer: 500
                }
            },
            summaryType: 'count', summaryRenderer: 'renderSum'                   
        },
        { header: 'Loại NPL', dataIndex: 'skutype', width: 70},  
        { header: 'Khổ vải', dataIndex: 'widthorder', width: 70},   
        // { header: 'Màu vải', dataIndex: 'amountinputsum', width: 70},   
        { header: 'Mã màu', dataIndex: 'color_code', width: 70},                                      
        { header: 'Yêu cầu KT', dataIndex: 'totalorder_tech', width: 70, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },          
        // { header: 'SL theo hóa đơn', dataIndex: 'totalyds', width: 70, 
        //     summaryType: 'sum', summaryRenderer: 'renderSum'
        // },        
        // { header: 'SL sau kiểm đo', dataIndex: 'totalydscheck', width: 70, 
        //     summaryType: 'sum', summaryRenderer: 'renderSum'
        // },
        { header: 'Thực xuất', dataIndex: 'totalydsprocessed', width: 70, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },
        { header: 'Lỗi', dataIndex: 'totalerror', width: 65, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        }, 
        { header: 'Chênh lệch', dataIndex: 'totaldif', width: 65, 
            summaryType: 'sum', summaryRenderer: 'renderSum', renderer: 'renderCell'
        },  
        { header: 'Danh sách cây vải', dataIndex: 'listpackage', flex: 1},                            
        { 
            xtype: 'actioncolumn',
            reference: 'stockout_contextmenu',
			width: 25,
			menuDisabled: true,
			sortable: false,
			items: [
            {
				iconCls: 'x-fa fas fa-bars violetIcon',
                tooltip:'Chi tiết kiểm đo',
                handler: 'onCheckDetail'
                //handler: 'onMenu'
            }
        ]
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
            value: Ext.Date.add (new Date(),Ext.Date.DAY,-5),  // defaults to today
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

    listeners: {
        activate: 'onActivate'
    }
});
