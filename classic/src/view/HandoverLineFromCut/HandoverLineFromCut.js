Ext.define('GSmartApp.view.HandoverLineFromCut.HandoverLineFromCut', {
    extend: 'Ext.grid.Panel',
    xtype: 'handover_line_fromcut',
    id: 'handover_line_fromcut',
    viewModel: {
        type: 'HandoverLineFromCutViewModel'
    },
    controller: 'HandoverLineFromCutController',
    reference: 'handover_line_fromcut',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{HandoverStore}'
    },
    columns: [
    {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: "Chi tiết",
            handler: 'onCapNhat',
        // }, {
        //     iconCls: 'x-fa fas fa-trash',
        //     tooltip: 'Xoá',
        //     handler: 'onXoa',
        }]
    },{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã lệnh',
        dataIndex: 'ordercode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Số phiếu',
        dataIndex: 'handover_code',
        width: 150,
    },
    {
        text: 'Ngày xuất',
        dataIndex: 'handover_date',
        width: 90,
        align: 'center',
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },
    {
        text: 'Người giao',
        dataIndex: 'handoverUserName',
        width: 120,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Nơi giao',
        dataIndex: 'orgFromNameParent',
        width: 120,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Người nhận',
        dataIndex: 'receiverUserName',
        width: 120,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Nơi nhận',
        dataIndex: 'orgToNameParent',
        width: 120,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'SL nhận',
        dataIndex: 'handoverTotal',
        width: 80,
        align: 'end',
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return Ext.util.Format.number(value, '0,000');;
        }
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Thêm mới',
            width: 105,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi',
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Mã lệnh",
            itemId: 'ordercode',
            width: 120
        // },{
        //     xtype: 'datefield',
        //     labelWidth: 0,
        //     emptyText:'Xuát từ',
        //     itemId: 'handover_datefrom',
        //     reference: 'handover_datefrom',
        //     margin: '5 1 5 0',
        //     width: 130
        // },{
        //     xtype: 'datefield',
        //     labelWidth: 0,
        //     emptyText:'Xuất đến',
        //     itemId: 'handover_dateto',
        //     reference: 'handover_dateto',
        //     margin: '5 1 5 0',
        //     width: 130
        },{
            xtype: 'datefield',
            labelWidth: 0,
            emptyText:'Nhập từ',
            itemId: 'handover_datefrom',
            reference: 'handover_datefrom',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype: 'datefield',
            labelWidth: 0,
            emptyText:'Nhập đến',
            itemId: 'handover_dateto',
            reference: 'handover_dateto',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Nơi giao',
            bind: {
                store : '{ListOrgStoreFrom}'
            },
            valueField: 'id',
            displayField: 'nameParent',
            queryMode: 'local',
            itemId: 'orgid_from_link',
            margin: '5 1 5 0',
            width: 130
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Nơi nhận',
            bind: {
                store : '{ListOrgStoreTo}'
            },
            valueField: 'id',
            displayField: 'nameParent',
            queryMode: 'local',
            itemId: 'orgid_to_link',
            margin: '5 1 5 0',
            width: 130
        // },{
        //     xtype:'combobox',
        //     itemId:'status',
        //     bind:{
        //         store:'{HandOverStatusStore}'
        //     },
        //     displayField: 'name',
        //     valueField: 'id',
        //     value: [0,1,2],
        //     queryMode: 'local',
        //     editable: true,
        //     allowBlank: true,
        //     multiSelect: true,
        //     emptyText: 'Trạng thái',
        //     margin: '5 1 5 0',
        //     width: 130
        },{
            xtype: 'button',
            margin: '5 1 5 1',
            // text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        cls: 'botToolbar',
        items: [{
            xtype: 'textfield',
            value: 25,
            itemId: 'limitpage',
            maskRe: /[0-9]/,
            width: 180,
            selectOnFocus: true,
            margin: 5,
            fieldLabel: 'Số bản ghi/ Trang',
            labelWidth: 120
        }, '-', {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            flex: 1,
            nextText: 'Trang tiếp',
            prevText: 'Trang trước',
            afterPageText: '/ {0}',
            beforePageText: 'Trang',
            itemId: 'page',
            refreshText: 'Làm mới dữ liệu',
            border: false,
            bind: {
                store: '{HandoverStore}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});

