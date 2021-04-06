Ext.define('GSmartApp.view.stockout.Stockout_P_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockout_p_list',
    id: 'stockout_p_list',
    reference: 'stockout_p_list',
    controller: 'Stockout_P_Controller',
    viewModel: {
        type: 'Stockout_P_EditModel'
    },
    requires: [
        'GSmartApp.store.Stockout',
        'Ext.Number',
        'Ext.Date'
    ],
    layout: 'fit',
    //frame: true,
    scrollable: true,
    bind: {
        store: '{Stockout}'
    },
    columnLines: true,
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false
    },
    columns: [
        { header: 'Số phiếu', dataIndex: 'stockoutcode', width: 150 },
        { header: 'Loại phiếu', dataIndex: 'stockouttype_name', width: 200 },
        { header: 'Ngày xuất', dataIndex: 'stockoutdate', renderer: Ext.util.Format.dateRenderer('d/m/Y'), width: 90 },
        { header: 'Nơi xuất', dataIndex: 'org_from_name', flex: 1 },
        { header: 'Nơi nhận', dataIndex: 'org_to_name', flex: 1 },
        // { header: 'Tổng tiền', dataIndex: 'totalprice', width: 110},   
        { header: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120 },
        {
            xtype: 'actioncolumn',
            reference: 'stockout_contextmenu',
            width: 45,
            menuDisabled: true,
            sortable: false,
            items: [
                {
                    // iconCls: 'x-fa fas fa-bars violetIcon',
                    iconCls: 'x-fa fas fa-pencil-square-o greenIcon',
                    tooltip: 'Sửa phiếu',
                    handler: 'onStockoutEdit'
                },
                {
                    // iconCls: 'x-fa fas fa-bars violetIcon',
                    iconCls: 'x-fa fas fa-trash-o redIcon',
                    tooltip: 'Xóa phiếu',
                    handler: 'onStockoutItemDelete'
                },
            ]
        }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            // {
            //     tooltip: 'Lập phiếu xuất kho mới',
            //     text: 'Lập phiếu mới',
            //     iconCls: 'x-fa fa-plus',
            //     margin: 3,
            //     itemId: 'btnThemMoi'
            // },
            {
                xtype: 'button',
                margin: 3,
                text: 'Lập phiếu mới',
                iconCls: 'x-fa fa-bars',
                menu: [
                    // {
                    //     itemId: 'btnXuatTo', // id:11
                    //     // iconCls: 'fa fa-file-pdf-o greenIcon',
                    //     text: 'Xuất tổ sản xuất',
                    //     handler: 'onXuatTo'
                    // },
                    {
                        itemId: 'btnThemMoi_ByPOLine', // id:1
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Xuất theo đơn hàng',
                        handler: 'onXuatCat'
                    },
                    {
                        itemId: 'btnThemMoi_Move', // id:3
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Xuất điều chuyển',
                        // handler: 'onNhapMuaMoi'
                    },
                ],
                // bind: {
                //     hidden: '{isNhapmoi}'
                // }
            },            
            {
                xtype: 'datefield',
                margin: 3,
                fieldLabel: 'Xuất từ ngày:',
                labelWidth: 86,
                width: 215,
                format:'d/m/Y',
                itemId: 'stockoutdate_from',
                value: new Date(),  // defaults to today
                // value: Ext.Date.add (new Date(),Ext.Date.DAY,-5),  // defaults to today
            },
            {
                xtype: 'datefield',
                margin: 3,
                fieldLabel: 'đến ngày:',
                labelWidth: 65,
                width: 195,
                format:'d/m/Y',
                itemId: 'stockoutdate_to',
                value: new Date(),  // defaults to today
            },
            {
                itemId: 'OrgToStore',
                xtype: 'combobox',
                emptyText: 'Nơi nhận',
                bind: {
                    store: '{OrgToStore}'
                },
                queryMode: 'local',
                margin: 3,
                displayField: 'name',
                valueField: 'id'
            },
            // {
            //     itemId: 'OrgFromStore',
            //     xtype: 'combobox',
            //     emptyText: 'Nơi xuất',
            //     bind: {
            //         store: '{OrgFromStore}'
            //     },
            //     queryMode: 'local',
            //     margin: 1,
            //     width: 180,
            //     displayField: 'name',
            //     valueField: 'id'
            // },
            {
                xtype: 'combobox',
                margin: 3,
                itemId: 'stockouttypeid',
                emptyText: 'Loại xuất kho',
                displayField: 'name',
                valueField: 'id',
                bind: {
                    store: '{StockoutTypeStore}'
                }
            },
            {
                tooltip: 'Tìm phiếu xuất',
                iconCls: 'x-fa fa-search',
                margin: 1,
                handler: 'onSearch'
            }
        ]
    }, {
        dock: 'bottom',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        height: 50,
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
                store: '{Stockout}'
            },
            emptyMsg: 'Không có kết quả tìm kiếm',
            lastText: 'Trang cuối',
            firstText: 'Trang đầu',
            displayMsg: 'Hiển thị {0} - {1} của {2}'
        }]
    }]
});
