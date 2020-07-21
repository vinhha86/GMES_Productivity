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
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'ordercodeFilter',
            width: '98%',
            // flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onOrdercodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Style',
        dataIndex: 'stylebuyer',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'stylebuyerFilter',
            width: '98%',
            // flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onStylebuyerFilterKeyup',
                buffer: 500
            }
        }
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
        // flex: 1,
        width: 80,
    }, {
        text: 'Ngày vào chuyền',
        dataIndex: 'productiondate_plan',
        renderer: Ext.util.Format.dateRenderer('d-m-Y'),
        // flex: 1,
        width: 80,
    }, {
        text: 'Ngày giao hàng',
        dataIndex: 'golivedate',
        renderer: Ext.util.Format.dateRenderer('d-m-Y'),
        // flex: 1,
        width: 80,
    }, {
        text: 'Số lượng',
        dataIndex: 'totalorder',
        // flex: 1,
        width: 60,
    }, {
        text: 'Trạng thái',
        dataIndex: 'statusName',
        flex: 1
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [
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
                xtype:'textfield',
                itemId:'txtpo',
                // fieldLabel: 'Chú thích',
                margin: 5,
                // flex: 1,
                width: 100,
                allowBlank: true,
                blankText: 'PO buyer',
                emptyText: 'PO buyer'
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
                // flex: 1,
                width: 130,
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
                // flex: 1,
                width: 130,
            },
            {
                xtype:'datefield',
                itemId:'txtdatefrom',
                reference: 'startdate',
                format: 'd-m-Y',
                margin: 5,
                // flex: 1,
                width: 130,
                emptyText: 'Giao SX từ'
            },
            {
                xtype:'datefield',
                itemId:'txtdateto',
                reference: 'enddate',
                format: 'd-m-Y',
                margin: 5,
                // flex: 1,
                width: 130,
                emptyText: 'Giao SX đến'
            },
            {
                xtype:'combobox',
                itemId:'txtstatus',
                bind:{
                    store:'{POrder_ListStatusStore}'
                },
                // displayField: 'statusString',
                // valueField: 'statusNum',
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                editable: true,
                allowBlank: true,
                multiSelect: true,
                emptyText: 'Trạng thái',
                margin: 5,
                flex: 1
            },
            // { 
            //     xtype: 'tagfield', 
            //     // fieldLabel: 'Select a Show', 
            //     bind:{
            //         store:'{POrder_ListStatusStore}'
            //     },
            //     displayField: 'statusString', 
            //     valueField: 'statusNum', 
            //     queryMode: 'local', 
            //     emptyText: 'Trạng thái',
            //     margin: 5,
            //     flex: 1,
            //     filterPickList: true 
            // },
            {
                xtype: 'button',
                margin: 5,
                text: '',
                width: 35,
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem',
                tooltip: 'Tìm kiếm'
            },
            {
                xtype: 'button',
                margin: 5,
                text: '',
                width: 35,
                iconCls: 'x-fa fa-refresh',
                itemId: 'btnRefresh',
                tooltip: 'Mặc định'
            }
            // {
            //     flex: 1,
            //     border: false
            // }
        ]
    }]
});

