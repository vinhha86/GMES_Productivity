Ext.define('GSmartApp.view.stockout.StockoutToCutDAvailable', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockouttocutdavailable',
    requires: [
        'Ext.grid.Panel',
        'GSmartApp.store.Stockout_pklist_available'
    ],
    title: 'Cây vải đã xử lý',
    layout: 'fit',
    border: true,
    scrollable: true,
    store: {
        type: 'stockout_pklist_available'
    },
    flex: 1,
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    selModel: {
        type: 'rowmodel',
        mode: 'MULTI'
    }, 
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
    },       
    columns: [
        { header: 'Mã NPL', dataIndex: 'skucode', flex: 1},
        { text: 'Theo HĐ',
            columns:[
                { text: 'Khổ', dataIndex: 'widthorigin', width: 70, summaryType: 'count', summaryRenderer: 'renderSummary'},        
                { text: 'SL', dataIndex: 'ydsorigin', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary'}
            ]
        },
        { text: 'Sau xử lý', 
            columns:[
                { text: 'Khổ', dataIndex: 'widthprocessed', width: 70},        
                { text: 'SL', dataIndex: 'ydsprocessed', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary'},
                { text: 'Lỗi', dataIndex: 'totalerror', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary'},                
                // { text: 'Chênh lệch',dataIndex: 'dif_processed', flex:1, summaryType: 'sum', summaryRenderer: 'renderSummary'}
            ]
        }                         
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'textfield',
                margin: '0 0 0 5',
                reference:'txtskucode_forfilter',
                fieldLabel: 'Thẻ vải:',
                width: 160,
                labelWidth: 50,
                hideLabel: false,
                fieldStyle: {
                    textTransform: "uppercase"
                },
                listeners: {
                    change: function (obj, newValue) {
                        //console.log(newValue);
                        obj.setRawValue(newValue.toUpperCase());
                    }
                }                
            },
            {
                tooltip: 'Tìm nguyên phụ liệu',
                margin: '0 0 0 5',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSearchTap'
            }                  
    ]
    }],    
});
