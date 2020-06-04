Ext.define('GSmartApp.view.stockout.StockoutToCutPklist', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockouttocutpklist',
    requires: [
        'Ext.grid.Panel',
        'GSmartApp.store.Stockout_pklist_tocut'
    ],
    title: 'Chi tiết xuất kho',
    layout: 'fit',
    border: true,
    scrollable: true,
    store: {
        type: 'stockout_pklist_tocut'
    },
    flex: 1,
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                edit: 'onPklistItemEdit'
            }            
        }            
    }, 
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
        { header: 'Mã NPL', dataIndex: 'skucode', width: 70},
        { header: 'Khổ', dataIndex: 'widthprocessed', width: 70, name: 'widthcheck', summaryType: 'count', summaryRenderer: 'renderSummary',
            editable: true,
            editor: {
                xtype: 'numberfield',
                hideTrigger:true,
                required: true,
                validators: {
                    type: 'number',
                    message: 'Invalid value'
                }
            },                    
        },        
        { header: 'SL', dataIndex: 'ydsprocessed', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
            editable: true,
            editor: {
                xtype: 'numberfield',
                hideTrigger:true,
                required: true,
                validators: {
                    type: 'number',
                    message: 'Invalid value'
                }
            },                    
        },
        { header: 'Lỗi', dataIndex: 'totalerror', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
            editable: true,
            editor: {
                xtype: 'numberfield',
                hideTrigger:true,
                required: true,
                validators: {
                    type: 'number',
                    message: 'Invalid value'
                }
            },                    
        },
        { header: 'Ghi chú', dataIndex: 'extrainfo', flex: 1,
            editable: true,
            editor: {
                xtype: 'textfield'
            }              
        }                              
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
        {
            xtype: 'numberfield',
            // labelAlign: 'top',
            // fieldLabel: 'Khổ co',
            emptyText: 'Khổ',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txtwidthprocessed',
            width: 100,
            hidden: true
            // labelWidth: 80,
            //emptyText: 'SL HĐ',
        },  
        {
            xtype: 'numberfield',
            // labelAlign: 'top',
            // fieldLabel: 'SL co',
            emptyText: 'SL xuất',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txtydsprocessed',
            width: 100,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onYdsProcessedKeyup'
            }
        },
        {
            xtype: 'numberfield',
            // labelAlign: 'top',
            // fieldLabel: 'Lỗi',
            emptyText: 'Lỗi',
            clearable: false,
            hideTrigger:true,
            allowBlank: false, 
            minValue: 0,
            maxValue: 10000,
            reference:'txttotalerror',
            width: 80,
            enableKeyEvents: true,
            listeners: {
                specialkey: 'onTotalErrorKeyup'
            }
        },                   
        {
            xtype: 'button',
            reference:'btnaddtocut',
            tooltip: 'Thêm vào danh sách xuất cắt',
            //margin: '0 0 20 0',
            iconCls: 'x-fa fa-plus',
            weight: 30,
            handler: 'onAddPklistItemTap'
        }    
        // {
        //     text: 'Thêm cây vải',
        //     iconCls: 'x-fa fa-plus',
        //     handler: 'onAddNewRow'
        // }        
    ]
    }],           
});
