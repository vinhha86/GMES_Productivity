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
        groupHeaderTpl: '<b style= "color:blue">{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,   
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            id: 'POrderOffer_event',
            copy: false,
            dragText: '{0} sản phẩm',
            dragGroup: 'porderFreeDropGroup',
            dropGroup: 'porderGanttDropGroup'
        },     
        listeners: {
            expandbody : 'onSelectOffer_Porder',
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

        { header: 'Số PO', dataIndex: 'po_buyer', flex: 1,
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
            }
        },
        { header: 'Mã SP (Buyer)', dataIndex: 'product_buyername', width: 130,
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
        { header: 'Buyer', dataIndex: 'buyername', width: 80,
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
        { header: 'Vendor', dataIndex: 'vendorname', width: 80,
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
        { header: 'Giao hàng', headerWrap: true, dataIndex: 'shipdate', 
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            // renderer: function(value){
            //     var date = Ext.Date.parse(value, 'c');
            //     return Ext.Date.format(date, 'd/m/y');
            // },
            width: 67
        },
        { header: 'SL', dataIndex: 'quantity', width: 65,  xtype: 'numbercolumn', format: '0,000', align: 'right',

            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return '<div style="color:black; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000')+'</div>';
            },
            // renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            //     metaData.tdAttr = 'data-qtip="' + value + '"';
            //     return value;
            // },
        },
    ],
    plugins: {
        rowwidget: {
            widget: 
            {
                xtype: 'grid',
                viewConfig: {
                    stripeRows: false,
                    enableTextSelection: false,
                    columnLines: true,
                    rowLines: true,   
                    plugins: {
                        ptype: 'gridviewdragdrop',
                        enableDrag: true,
                        id: 'POrderUnGranted_event',
                        copy: false,
                        dragText: '{0} yêu cầu',
                        dragGroup: 'porderFreeDropGroup',
                        dropGroup: 'porderGanttDropGroup'
                    }
                },               
                bind: {
                    store: '{record.porder}',
                    // title: 'Danh sách hàng xuất'
                },	
                columns:[{
                    text: 'STT',
                    width: 40,
                    xtype: 'rownumberer',
                    align: 'center'
                },{
                    text:'PO Buyer',
                    dataIndex:'po_buyer',
                    width: 110,
                    // renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    //     if (record.data.status == 0) {
                    //         metaData.tdCls =  "po_accept";
                    //     }
                    //     else if (record.data.status == -3){
                    //         metaData.tdCls =  "po_cancel";
                    //         metaData.tdAttr = 'data-qtip="PO đã hủy"';
                    //     }            
                    //     return value;
                    // }
                },{
                    text:'PO Vendor',
                    dataIndex:'po_vendor',
                    width: 100
                },{
                    text:'SL',
                    align: 'end',
                    dataIndex:'totalorder',
                    width: 70,
                    renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                        return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                    }
                },
                // {
                //     text:'YCSX',
                //     align: 'end',
                //     dataIndex:'amount_org',
                //     width: 70,
                //     renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                //         return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                //     }
                // },
                {
                    text:'Ngày giao',
                    dataIndex:'shipdate',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    width: 70
                },{
                    text:'Ngày NPL',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    dataIndex:'matdate',
                    width: 70
                },{
                    text:'Ngày Ra chuyền',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    dataIndex:'po_Productiondate',
                    width: 70
                }]			
			}
		}
    },
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
