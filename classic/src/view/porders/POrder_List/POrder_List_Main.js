Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_Main', {
    extend: 'Ext.grid.Panel',
    xtype: 'porderlistmain',
    id: 'porderlistmain',
    viewModel: {
        type: 'POrder_List_ViewModel'
    },
    controller: 'POrder_List_MainController',
    reference: 'porderlistmain',
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 2
    //     }
    // },
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{POrder_ListStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã lệnh',
        dataIndex: 'ordercode',
        flex: 1,
    }, {
        text: 'Style',
        dataIndex: 'stylebuyer',
        flex: 1
    }, {
        text: 'Tên Buyer',
        dataIndex: 'buyername',
        flex: 1
    }, {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        flex: 1,
    }, {
        text: 'Tên Vendor',
        dataIndex: 'vendorname',
        flex: 1
    }, {
        text: 'PO Vendor',
        dataIndex: 'po_vendor',
        flex: 1
    }, {
        text: 'Ngày giao SX',
        dataIndex: 'orderdate',
        renderer: Ext.util.Format.dateRenderer('d-m-Y'),
        flex: 1
    }, {
        text: 'Ngày giao hàng',
        dataIndex: 'golivedate',
        renderer: Ext.util.Format.dateRenderer('d-m-Y'),
        flex: 1
    }, {
        text: 'Số lượng',
        dataIndex: 'totalorder',
        flex: 1
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [            
            {
                xtype:'textfield',
                itemId:'txtordercode',
                // fieldLabel: 'Tên dải size',
                margin: 5,
                // flex: 1,
                width: 100,
                allowBlank: true,
                blankText: 'Mã lệnh',
                emptyText: 'Mã lệnh'
            },
            {
                xtype:'textfield',
                itemId:'txtpo',
                // fieldLabel: 'Chú thích',
                margin: 5,
                // flex: 1,
                width: 100,
                allowBlank: true,
                blankText: 'PO',
                emptyText: 'PO'
            },
            {
                xtype:'textfield',
                itemId:'txtstyle',
                // fieldLabel: 'Chú thích',
                margin: 5,
                // flex: 1,
                width: 100,
                allowBlank: true,
                blankText: 'Style',
                emptyText: 'Style'
            },
            {
                xtype:'combobox',
                itemId:'txtbuyerid',
                bind:{
                    store:'{POrder_ListBuyerStore}'
                },
                displayField: 'buyername',
                valueField: 'orgbuyerid_link',
                queryMode: 'local',
                editable: true,
                allowBlank: true,
                emptyText: 'Tên buyer',
                margin: 5,
                flex: 1
            },
            {
                xtype:'combobox',
                itemId:'txtvendorid',
                bind:{
                    store:'{POrder_ListVendorStore}'
                },
                displayField: 'vendorname',
                valueField: 'orgvendorid_link',
                queryMode: 'local',
                editable: true,
                allowBlank: true,
                emptyText: 'Tên vendor',
                margin: 5,
                flex: 1
            },
            {
                xtype:'datefield',
                itemId:'txtdatefrom',
                margin: 5,
                // flex: 1,
                width: 160,
                emptyText: 'Giao SX từ ngày'
            },
            {
                xtype:'datefield',
                itemId:'txtdateto',
                margin: 5,
                // flex: 1,
                width: 160,
                emptyText: 'Giao SX đến ngày'
            },
            {
                xtype: 'button',
                margin: 5,
                text: '',
                width: 35,
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem'
            },
            {
                xtype: 'button',
                margin: 5,
                text: '',
                width: 35,
                iconCls: 'x-fa fa-refresh',
                itemId: 'btnRefresh'
            }
            // {
            //     flex: 1,
            //     border: false
            // }
        ]
    }]
});

