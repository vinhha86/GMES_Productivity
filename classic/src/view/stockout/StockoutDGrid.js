Ext.define('GSmartApp.view.stockout.StockoutDGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockoutdgrid',
    reference: 'stockoutdgrid',
    border: true,
    store: {
        type: 'stockout_d'
    },
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '<b>Màu sản phẩm: {name} </b>',
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
        // { header: 'Mã vải chính', dataIndex: 'mainskucode', width: 70},
        { header: 'Mã NPL', dataIndex: 'sku_name', width: 80, 
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'materialFilterField',
                width: 75,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onMaterialFilterKeyup',
                    buffer: 500
                }
            },
        },
        { header: 'Loại NPL', dataIndex: 'skutype', width: 80},  
        { header: 'Khổ vải', dataIndex: 'size_name', width: 80},   
        // { header: 'Màu vải', dataIndex: 'amountinputsum', width: 70},   
        { header: 'Mã màu', dataIndex: 'color_name', width: 80},                                      
        { header: 'Yêu cầu KT', dataIndex: 'totalorder_tech', width: 90, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },          
        { header: 'Thực xuất', dataIndex: 'totalydsprocessed', width: 90, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },
        { header: 'Lỗi', dataIndex: 'totalerror', width: 90, 
            summaryType: 'sum', summaryRenderer: 'renderSum'
        }, 
        { header: 'Chênh lệch', dataIndex: 'totaldif', width: 90, 
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
    ]	       
});
