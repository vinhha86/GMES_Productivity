Ext.define('GSmartApp.view.stockin.StockIn_P_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'StockIn_P_List',
    id: 'StockIn_P_List',
    reference: 'StockIn_P_List',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{StockinStore}'
    },
    columns: [
        {text: 'Số phiếu', dataIndex: 'stockincode', width: 150},
        {text: 'Loại nhập kho', dataIndex: 'stockintype_name', width: 200},    
        {
            text: GSmartApp.Locales.ngaynhap[GSmartApp.Locales.currentLocale],
            xtype: 'datecolumn',
            format: 'd/m/Y',
            dataIndex: 'stockindate',
            width: 120
        },
        {text: 'Nơi xuất', dataIndex: 'orgfrom_name', flex: 1},    
        {text: 'Nơi nhận', dataIndex: 'orgto_name', flex: 1 },
        {text: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120},    
        // {
        //     text: 'Số lượng',
        //     xtype: 'numbercolumn',
        //     format: '0,000',
        //     align: 'right',
        //     dataIndex: 'totalpackage',
        //     flex: 1
        // },
        {
            xtype: 'actioncolumn',
            width: 50,
            menuDisabled: true,
            sortable: false,

            items: [{
                iconCls: 'x-fa fas fa-edit',
                tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
                handler: 'onEdit'
            }, {
                iconCls: 'x-fa fas fa-trash',
                tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
                handler: 'onDelete'
            }]
        }
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 3,
                text: 'Lập phiếu mới',
                iconCls: 'x-fa fa-bars',
                menu: [
                    {
                        itemId: 'btnThemMoi_ByPOLine', // id:1
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Nhập từ sản xuất',
                    },
                    {
                        itemId: 'btnThemMoi_Move', // id:3
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Nhập điều chuyển',
                    },
                ],
            },  
            {
                margin: 3,
                itemId: 'stockindate_from',
                xtype: 'datefield',
                value: new Date(),
                format:'d/m/Y',
                fieldLabel: 'Nhập từ ngày:',
                labelWidth: 86,
                width: 215,
            }, 
            {
                itemId: 'stockindate_to',
                xtype: 'datefield',
                value: new Date(),
                margin: 3,
                format:'d/m/Y',
                fieldLabel: 'đến ngày:',
                labelWidth: 65,
                width: 195,
            },        
            {
                itemId: 'OrgFromStore',
                xtype: 'combobox',
                emptyText: 'Nơi xuất',
                bind:{
                    store: '{OrgFromStore}'
                },
                queryMode: 'local',
                margin: 3,
                displayField: 'name',
                valueField: 'id'
            },{
                itemId: 'stockintypeid_link',
                xtype: 'combobox',
                emptyText: 'Loại nhập kho',
                bind:{
                    store: '{StockinTypeStore}'
                },
                queryMode: 'local',
                margin: 3,
                displayField: 'name',
                valueField: 'id'
            }, 
            {
                // width: 100,
                xtype: 'button',
                margin: 3,
                // text: GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem'
            }
        ]
    }, 
    // {
    //     dock: 'bottom',
    //     layout: 'hbox',
    //     xtype: 'toolbar',
    //     border: false,
    //     height: 50,
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
    //             store: '{StockinStore}'
    //         },
    //         emptyMsg: 'Không có kết quả tìm kiếm',
    //         lastText: 'Trang cuối',
    //         firstText: 'Trang đầu',
    //         displayMsg: 'Hiển thị {0} - {1} của {2}'
    //     }]
    // }
]
});

