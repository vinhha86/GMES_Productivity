Ext.define('GSmartApp.view.pcontract.PContractMainView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractMainView',
    id: 'PContractMainView',
    requires: [
        'Ext.ProgressBarWidget'
    ],
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
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã đơn hàng',
        dataIndex: 'contractcode',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Buyer',
        dataIndex: 'buyername',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text: 'Vendor',
        dataIndex: 'vendorname',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Số hợp đồng',
        dataIndex: 'contractBuyerCode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Năm HĐ',
        dataIndex: 'contractBuyerYear',
        width: 75,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Loại hình',
        dataIndex: 'contractTypeName',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Thị trường',
        dataIndex: 'marketTypeName',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },    
    // {
    //     text: 'PO Buyer',
    //     dataIndex: 'polist',
    //     flex: 1,
    //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return value;
    //     }
    // },    
    {
        text: 'Ngày lập',
        dataIndex: 'contractdate',
        width: 75,
        renderer: Ext.util.Format.dateRenderer('d/m/y')
    }, 
    {
        text: 'Người lập',
        dataIndex: 'usercreatedName',
        width: 120,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
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
        width: 25,
        menuDisabled: true,
        sortable: false,
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu_ContractList'
            },            
        ]
    }    
   ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: false,
        items: [{
            xtype: 'button',
            margin: '5 1 5 1',
            text: 'Thêm đơn hàng',
            width: 135,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi_PContractMainView',
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Mã SP(Buyer)",
            itemId: 'productbuyer_code',
            width: 120
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "PO Buyer",
            itemId: 'po_code',
            width: 120
        },{
            xtype: 'combo',
            labelWidth: 0,
            emptyText:'Buyer',
            bind: {
                store : '{EndBuyer}'
            },
            valueField: 'id',
            displayField: 'name',
            itemId: 'orgbuyerid_link',
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
            emptyText: "Số HĐ",
            itemId: 'contractbuyer_code',
            width: 120
        },{
            xtype:'textfield',
            labelWidth: 0,
            margin: '5 1 5 0',
            emptyText: "Năm HĐ",
            maskRe: /[0-9]/,
            itemId: 'contractbuyer_year',
            width: 80
        },
        {
            xtype: 'button',
            margin: '5 1 5 1',
            // text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem'
        }]
    }, 
    // {
    //     dock: 'bottom',
    //     layout: 'hbox',
    //     xtype: 'toolbar',
    //     border: false,
    //     cls: 'botToolbar',
    //     items: [{
    //         xtype: 'textfield',
    //         value: 25,
    //         itemId: 'limitpage',
    //         maskRe: /[0-9]/,
    //         width: 180,
    //         selectOnFocus: true,
    //         margin: 5,
    //         fieldLabel: 'Số bản ghi/ Trang',
    //         labelWidth: 120
    //     }, '-', {
    //         xtype: 'pagingtoolbar',
    //         displayInfo: true,
    //         flex: 1,
    //         nextText: 'Trang tiếp',
    //         prevText: 'Trang trước',
    //         afterPageText: '/ {0}',
    //         beforePageText: 'Trang',
    //         itemId: 'page',
    //         refreshText: 'Làm mới dữ liệu',
    //         border: false,
    //         bind: {
    //             store: '{PContractStore}'
    //         },
    //         emptyMsg: 'Không có kết quả tìm kiếm',
    //         lastText: 'Trang cuối',
    //         firstText: 'Trang đầu',
    //         displayMsg: 'Hiển thị {0} - {1} của {2}'
    //     }]
    // }
    ]
});

