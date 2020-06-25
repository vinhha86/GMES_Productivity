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
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '<b>Tổ sản xuất: {name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        //enableTextSelection: true,
        stripeRows: false,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            copy: true,
            dragText: '{0} Phân chuyền',
            dragGroup: 'porderFreeDropGroup',
            dropGroup: 'firstGridDDGroup'
        },
        listeners: {
            //drop: 'onDrop',
            //beforedrop: 'onBeforeDrop'
        }        
     },
    columns: [
        { header: 'Mã SX', locked: false, dataIndex: 'ordercode', width: 100,
            editor: {xtype: 'textfield', readOnly: true},
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'porderFilterField_Salary',
                width: 95,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPOrderFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIndex) {
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
                //metaData.tdCls = record.get('change') > 0 ? 'color-other' : 'color-gio';
                // if (null != record.get('productiondate')){
                //     metaData.tdAttr = 'data-qtip="' + Ext.util.Format.date(record.get('productiondate'),'d/m/Y') + '"';
                // }
                return value;
            },
            // summaryType: 'count', summaryRenderer: 'renderSum'                   
        },
        { header: 'Style', dataIndex: 'buyercode', width: 90},
        { header: 'PO', dataIndex: 'po_vendor', width: 90},
        { header: 'Giao hàng', headerWrap: true, dataIndex: 'golivedate', renderer: Ext.util.Format.dateRenderer('d/m/y'), width: 70},
        { header: 'Vào chuyền', headerWrap: true, dataIndex: 'productiondate', renderer: Ext.util.Format.dateRenderer('d/m/y'), width: 70},
        { header: 'SL', dataIndex: 'totalorder', flex: 1},
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                tooltip: 'Tìm kiếm lệnh',
                iconCls: 'x-fa fa-refresh',
                weight: 30,
                handler: 'onSearchTap'
            }
    ]
    }]
});
