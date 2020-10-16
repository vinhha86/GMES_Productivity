Ext.define('GSmartApp.view.porders.Porder_Req_Granted', {
    extend: 'Ext.grid.Panel',
    xtype: 'Porder_Req_Granted',
    id: 'Porder_Req_Granted',
    requires: [
        'Ext.Number',
        'Ext.Date'
    ],
    bind:{
        store:'{Porder_Req_Granted_Store}'
    },
    columnLines: true,
    //multiSelect: true,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<b>{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    // },{
    //     ftype: 'summary',
    //     dock: 'bottom'
    }], 
    viewConfig: {
        stripeRows: false,
        // plugins: {
        //     ptype: 'gridviewdragdrop',
        //     enableDrag: true,
        //     id: 'Porder_Req_Event',
        //     copy: false,
        //     dragText: '{0} Phân chuyền',
        //     dragGroup: 'porderFreeDropGroup',
        //     dropGroup: 'porderGanttDropGroup'
        // },
        // listeners: {
        //     drop: 'onDrop',
        //     beforedrop: 'onBeforeDrop'
        // }        
     },
    columns: [
        { header: 'PO Buyer', dataIndex: 'po_buyer', flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'poBuyerReqGrantedFilterField',
            width: '99%',
            margin: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPoBuyerReqGrantedFilterKeyup',
                buffer: 500
            }
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }},
        { header: 'Mã SP (Buyer)', dataIndex: 'product_code', flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'codeReqGrantedFilterField',
                width: '99%',
                margin: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onCodeReqGrantedFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                metaData.tdCls =  'greenbox';
                return value;
            },
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return '<div style="color:black; font-weight: bold; align: right">'+'Tổng: ' + value+'</div>';
            }
        },
        { header: 'Vào chuyền', headerWrap: true, dataIndex: 'po_Productiondate', 
            // renderer: Ext.util.Format.dateRenderer('d/m/y'),
            renderer: function(value){
                var date = Ext.Date.parse(value, 'c');
                return Ext.Date.format(date, 'd/m/y');
            },
            width: 70
        },
        { header: 'Giao hàng', headerWrap: true, dataIndex: 'shipdate', 
            // renderer: Ext.util.Format.dateRenderer('d/m/y'),
            renderer: function(value){
                var date = Ext.Date.parse(value, 'c');
                return Ext.Date.format(date, 'd/m/y');
            },
            width: 70
        },
        { header: 'Ngày cần xếp xong', headerWrap: true, dataIndex: 'plandate_required', 
            // renderer: Ext.util.Format.dateRenderer('d/m/y'),
            renderer: function(value){
                var date = Ext.Date.parse(value, 'c');
                return Ext.Date.format(date, 'd/m/y');
            },
            width: 70
        },
        { header: 'Số lượng', dataIndex: 'totalorder', width: 100,  xtype: 'numbercolumn', format: '0,000', align: 'right',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return '<div style="color:black; font-weight: bold; align: right">'+'SL: ' + Ext.util.Format.number(value, '0,000')+'</div>';
            }
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
                handler: 'onSearchPorderReqGranted'
            },
            {
                tooltip: 'Ẩn danh sách',
                iconCls: 'x-fa fa-eye',
                weight: 30,
                handler: 'onHiddenListReq'
            },
            { 
                tooltip: 'Xóa xếp kế hoạch',
                xtype: 'button',
                itemId: 'btnDeleteReqGranted',
                text: 'Xóa xếp kế hoạch',
                iconCls: 'x-fa fa-trash',
                weight: 30,
                handler: 'onDeleteReqGranted'
            },

            { 
                tooltip: 'Xóa yêu cầu',
                xtype: 'button',
                itemId: 'btnDeleteReqAndReqGranted',
                text: 'Xóa yêu cầu',
                iconCls: 'x-fa fa-trash',
                weight: 30,
                handler: 'onDeleteReqGranted'
            }
    ]
    }]
});
