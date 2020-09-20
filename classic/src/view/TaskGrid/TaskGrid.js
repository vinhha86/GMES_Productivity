Ext.define('GSmartApp.view.TaskGrid.TaskGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'TaskGrid',
    id: 'TaskGrid',
    viewModel: {
        type: 'TaskGridViewModel'
    },
    controller: 'TaskGridController',
    reference: 'TaskGrid',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{TaskBoard_Store}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên công việc',
        dataIndex:'name',
        width: 200,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'nameFilter',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onNameFilterKeyup',
                buffer: 500
            }
        }
    },{
        text:'Chú thích',
        dataIndex:'description',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'descriptionFilter',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onDescriptionFilterKeyup',
                buffer: 500
            }
        }
    },{
        text:'Người phụ trách',
        dataIndex:'UserInChargeName',
        width: 200,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'userInChargeNameFilter',
            width: '99%',
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onUserInChargeNameFilterKeyup',
                buffer: 500
            }
        }
    },{
        text:'Trạng thái',
        dataIndex:'State',
        width: 130,
        renderer: function(value, metaData, record, rowIdx, colIdx){
            switch (value){
                case 'DangLam':
                    return 'Đang làm';
                case 'ChuaLam':
                    return 'Chưa làm';
                case 'DaXong':
                    return 'Đã xong';
                case 'TuChoi':
                    return 'Từ chối';
            }
        }
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            // handler: 'onXoa',
        }]
    }],
    dockedItems:[{
        dock: 'top',
        xtype: 'toolbar',
        items:[{
            xtype: 'button',
            tooltip: 'Làm mới danh sách',
            iconCls: 'x-fa fa-refresh',
            itemId: 'btnRefresh',
            margin: 5
        },{
            xtype: 'button',
            tooltip: 'Thêm việc khác',
            iconCls: 'x-fa fa-plus',
            itemId: 'btnAddTask',
            margin: 5
        },{
            // xtype      : 'filterfield',
            // store       : taskStore,
            // fieldLabel : 'Tìm kiếm',
            // margin     : 5,
            // panel      : task,
            // width      : 190,
            // labelWidth : 90,
            // field: 'Description'
        // },{
            xtype: 'combo',
            margin: 5,
            bind : {
                store: '{TaskTypeStore}',
                value: -10
            },
            valueField: 'id',
            displayField: 'name',
            margin: 5,
            editable: false,
            emptyText: 'Loại công việc',
            itemId: 'cmbtype'
        }]
    }],
});

