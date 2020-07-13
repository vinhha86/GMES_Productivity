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
            copy: true,
            dragText: '{0} Phân chuyền',
            dragGroup: 'porderFreeDropGroup',
            dropGroup: 'firstGridDDGroup'
        },
        listeners: {
            drop: 'onDrop',
            beforedrop: 'onBeforeDrop'
        }        
     },
    columns: [
        { header: 'Mã SX', locked: false, dataIndex: 'ordercode', flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'porderFilterField',
                width: '99%',
                margin: 1,
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
        { header: 'Style', dataIndex: 'buyercode', flex: 1},
        { header: 'PO', dataIndex: 'po_vendor', flex: 1},
        { header: 'Giao hàng', headerWrap: true, dataIndex: 'golivedate', renderer: Ext.util.Format.dateRenderer('d/m/y'), width: 100},
        { header: 'Vào chuyền', headerWrap: true, dataIndex: 'productiondate', renderer: Ext.util.Format.dateRenderer('d/m/y'), width: 100},
        { header: 'Số lượng', dataIndex: 'totalorder', width: 100,  xtype: 'numbercolumn', format: '0,000', align: 'right'},
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
            }
    ]
    }]
});
