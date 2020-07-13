Ext.define('GSmartApp.view.porders.Porder_Req', {
    extend: 'Ext.grid.Panel',
    xtype: 'Porder_Req',
    id: 'Porder_Req',
    requires: [
        'Ext.Number',
        'Ext.Date'
    ],
    bind:{
        store:'{Porder_Req_Store}'
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
            id: 'Porder_Req_Event',
            copy: false,
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
        { header: 'PO Buyer', dataIndex: 'po_buyer', flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'styleFilterField',
            width: '99%',
            margin: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onStyleFilterKeyup',
                buffer: 500
            }
        }    },
        { header: 'PO Vendor', dataIndex: 'po_vendor', flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'poFilterField',
            width: '99%',
            margin: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPOFilterKeyup',
                buffer: 500
            }
        }    },
        { header: 'Bắt đầu', headerWrap: true, dataIndex: 'po_Productiondate', renderer: Ext.util.Format.dateRenderer('d/m/y'), width: 100},
        { header: 'Kết thúc', headerWrap: true, dataIndex: 'shipdate', renderer: Ext.util.Format.dateRenderer('d/m/y'), width: 100},
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
                handler: 'onSearchPorderReq'
            },
            {
                tooltip: 'Ẩn danh sách',
                iconCls: 'x-fa fa-eye',
                weight: 30,
                handler: 'onHiddenListReq'
            }
    ]
    }]
});
