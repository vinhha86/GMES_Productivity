Ext.define('GSmartApp.view.pcontract.PContractMainView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractMainView',
    id: 'PContractMainView',
    requires: [
        'Ext.ProgressBarWidget'
    ],
    viewModel: {
        type: 'PContractMainViewModel'
    },
    controller: 'PContractMainViewController',
    reference: 'PContractMainView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PContractStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã nội bộ',
        dataIndex: 'contractcode',
        width: 100
    }, {
        text: 'Buyer',
        dataIndex: 'buyername',
        width: 100
    },{
        text: 'Vendor',
        dataIndex: 'vendorname',
        width: 100
    },
    {
        text: 'Mã Buyer',
        dataIndex: 'productlist',
        flex: 1
    },  
    {
        text: 'PO',
        dataIndex: 'polist',
        flex: 1
    },    
    {
        text: 'Ngày lập',
        dataIndex: 'contractdate',
        width: 80,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }, 
    {
        text: 'Người lập',
        dataIndex: 'usercreatedName',
        width: 100
    },
    // {
    //     text: 'Trạng thái',
    //     dataIndex: 'status',
    //     width: 90
    // },   
    // {
    //     text: 'Tỷ lệ hoàn thành',
    //     xtype: 'widgetcolumn',
    //     flex: 1,
    //     widget: {
    //         bind: '{record.complete_rate}',
    //         xtype: 'progressbarwidget',
    //         textTpl: [
    //             '{percent:number("0")}%'
    //         ]
    //     }
    // }, 
    {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-edit',
            tooltip: "Chi tiết",
            handler: 'onEdit',
            itemId:'btnEdit_PContractMainView'
        }, {
            iconCls: 'x-fa fas fa-trash',
            itemId:'btnDelete_PContractMainView',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa',
            isActionDisabled: 'checkActionColumnPermission'
        }]
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
            itemId: 'btnThemMoi_PContractMainView',
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Mã nội bộ",
            itemId: 'contractcode',
            width: 120
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'EndBuyer',
            bind: {
                store : '{EndBuyer}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'orgendbuyerid_link',
            margin: '5 1 5 0'
        },
        {
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Vendor',
            bind: {
                store : '{Vendor}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'orgvendorid_link',
            margin: '5 1 5 0'
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Mã Buyer",
            itemId: 'style',
            width: 120
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "PO",
            itemId: 'po',
            width: 120
        },
        {
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
                store: '{PContractStore}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});

