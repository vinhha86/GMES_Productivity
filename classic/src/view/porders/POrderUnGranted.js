Ext.define('GSmartApp.view.porders.POrderUnGranted', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderUnGranted',
    id: 'POrderUnGranted',
    requires: [
        'Ext.Number',
        'Ext.Date'
    ],
    title: 'Lệnh chưa phân chuyền',    
    bind:{
        store:'{POrderUnGranted}'
    },
    columnLines: true,
    //multiSelect: true,
    selModel: 'rowmodel',
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<b>{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        stripeRows: false,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            copy: false,
            id:'POrderUnGranted_event',
            dragText: '{0} Phân chuyền',
            dragGroup: 'porderFreeDropGroup',
            dropGroup: 'porderGanttDropGroup'
        },
        listeners: {
            drop: 'onDrop',
            beforedrop: 'onBeforeDrop'
        }        
     },
    columns: [
        // { header: 'Mã lệnh', locked: false, dataIndex: 'ordercode', flex: 1,
        //     items: {
        //         xtype: 'textfield',
        //         fieldStyle: "",
        //         reference: 'porderFilterField',
        //         width: '99%',
        //         margin: 1,
        //         enableKeyEvents: true,
        //         listeners: {
        //             keyup: 'onPOrderFilterKeyup',
        //             buffer: 500
        //         }
        //     },
        //     renderer: function (value, metaData, record, rowIndex) {
        //         var c = record.get('status');
        //         if (c == 1) {
        //             metaData.tdCls = 'process-granted';
        //         } else if (c == 2) {
        //             metaData.tdCls =  'process-ready';
        //         } else if (c == 3) {
        //             metaData.tdCls =  'process-running';
        //         } else if (c == 4) {
        //             metaData.tdCls =  'process-done';
        //         } else if (c == 5) {
        //             metaData.tdCls =  'process-finish';
        //         } else if (c == 6) {
        //             metaData.tdCls =  'process-subprocess';
        //         } else if (c == 0) {
        //             metaData.tdCls =  'process-free';
        //         }              
        //         //metaData.tdCls = record.get('change') > 0 ? 'color-other' : 'color-gio';
        //         // if (null != record.get('productiondate')){
        //         //     metaData.tdAttr = 'data-qtip="' + Ext.util.Format.date(record.get('productiondate'),'d/m/Y') + '"';
        //         // }
        //         metaData.tdAttr = 'data-qtip="' + value + '"';
        //         return value;
        //     },
        //     // summaryType: 'count', summaryRenderer: 'renderSum'                   
        // },

        { header: 'PO Buyer', dataIndex: 'po_buyer', flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'unGrantedPoBuyerFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUnGrantedPoBuyerFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                var c = record.get('status');
                if (c == 1) {
                    metaData.tdCls = 'process-granted';
                } else if (c == 2) {
                    metaData.tdCls =  'process-ready';
                } else if (c == 3) {
                    metaData.tdCls =  'process-running';
                } else if (c == 4) {
                    metaData.tdCls =  'process-done';
                } else if (c == 5) {
                    metaData.tdCls =  'process-finish';
                } else if (c == 6) {
                    metaData.tdCls =  'process-subprocess';
                } else if (c == 0) {
                    metaData.tdCls =  'process-free';
                }              
                return value;
            }
        },
        { header: 'Mã SP (Buyer)', dataIndex: 'buyercode', width: 100,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'unGrantedBuyerCodeFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUnGrantedBuyerCodeFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:black; font-weight: bold; align: right">'+'Tổng: ' + value+'</div>';
            },
        },
        { header: 'Buyer', dataIndex: 'buyername', width: 75,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'unGrantedBuyernameFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUnGrantedBuyernameFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        { header: 'Vendor', dataIndex: 'vendorname', width: 75,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'unGrantedVendornameFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUnGrantedVendornameFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        { header: 'Vào chuyền', headerWrap: true, dataIndex: 'productiondate', renderer: Ext.util.Format.dateRenderer('d/m/y'), width: 67},
        { header: 'Giao hàng', headerWrap: true, dataIndex: 'golivedate', 
            // renderer: Ext.util.Format.dateRenderer('d/m/y'),
            renderer: function(value){
                var date = Ext.Date.parse(value, 'c');
                return Ext.Date.format(date, 'd/m/y');
            },
            width: 67
        },
        { header: 'SL', dataIndex: 'totalorder', width: 60,  xtype: 'numbercolumn', format: '0,000', align: 'right',

            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return '<div style="color:black; font-weight: bold; align: right">'+'SL: ' + Ext.util.Format.number(value, '0,000')+'</div>';
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                tooltip: 'Làm mới danh sách',
                iconCls: 'x-fa fa-refresh',
                weight: 30,
                handler: 'onSearchTap'
            },
            {
                tooltip: 'Ẩn danh sách',
                iconCls: 'x-fa fa-eye',
                weight: 30,
                handler: 'onHiddenList'
            }
    ]
    }]
});
