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
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{POrder_ListStore}'
    },features: [{
        ftype: 'grouping',
        groupHeaderTpl: '<b>{name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    }],
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã lệnh',
        dataIndex: 'ordercode',
        flex: 1,
        renderer: function (value, metaData, record, rowIndex) {
            var c = record.get('status');
            if(c == 0){
                metaData.tdCls = 'process-free';
            }else if (c == 1) {
                metaData.tdCls = 'process-granted';
            } else if (c == 2) {
                metaData.tdCls =  'process-ready';
            } else if (c == 3) {
                metaData.tdCls =  'process-subprocess';
            } else if (c == 4) {
                metaData.tdCls =  'process-running';
            } else if (c == 5) {
                metaData.tdCls =  'process-done';
            } else if (c == 6) {
                metaData.tdCls =  'process-finish';
            } 
            return value;
        },
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
        text: 'Mã Buyer',
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
        text: 'Tạo lệnh',
        dataIndex: 'orderdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        // flex: 1,
        width: 70,
    }, {
        text: 'Vào chuyền',
        dataIndex: 'productiondate_plan',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        // flex: 1,
        width: 70,
    }, {
        text: 'Giao hàng',
        dataIndex: 'golivedate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        // flex: 1,
        width: 70,
    }, {
        text: 'Số lượng',
        dataIndex: 'totalorder',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        // flex: 1,
        width: 75,
        align: 'end'
    }, {
        text: 'Trạng thái',
        dataIndex: 'statusName',
        flex: 1
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'vbox',
        border: false,
        items: [{
            layout: 'hbox',
            border: false,
            items:[{
                xtype:'textfield',
                itemId:'txtstyle',
                // fieldLabel: 'Chú thích',
                margin: 5,
                // flex: 1,
                width: 130,
                allowBlank: true,
                blankText: 'Mã Buyer',
                emptyText: 'Mã Buyer'
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
                xtype:'textfield',
                itemId:'txtpobuyer',
                // fieldLabel: 'Chú thích',
                margin: 5,
                // flex: 1,
                width: 130,
                allowBlank: true,
                blankText: 'PO buyer',
                emptyText: 'PO buyer'
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
                xtype:'textfield',
                itemId:'txtpovendor',
                // fieldLabel: 'Chú thích',
                margin: 5,
                // flex: 1,
                width: 130,
                allowBlank: true,
                blankText: 'PO vendor',
                emptyText: 'PO vendor'
            },
            {
                xtype:'datefield',
                itemId:'txtdatefrom',
                reference: 'startdate',
                format: 'd/m/Y',
                margin: 5,
                // flex: 1,
                width: 130,
                emptyText: 'Giao SX từ'
            },
            {
                xtype:'datefield',
                itemId:'txtdateto',
                reference: 'enddate',
                format: 'd/m/Y',
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
            {
                xtype: 'button',
                margin: 5,
                text: '',
                width: 35,
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem',
                tooltip: 'Tìm kiếm'
            },
            // {
            //     xtype: 'button',
            //     margin: 5,
            //     text: '',
            //     width: 35,
            //     iconCls: 'x-fa fa-refresh',
            //     itemId: 'btnRefresh',
            //     tooltip: 'Mặc định'
            // }
            // {
            //     flex: 1,
            //     border: false
            // }
            ]
        }
        ]
    },{
        dock: 'bottom',
        layout: 'vbox',
        border: false,
        items: [{
            layout: 'hbox',
            border: false,
            items: [{
                html: '<div class="color-box">'
                +'<div class="color-square process-free"></div>&nbspChưa phân chuyền'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-granted"></div>&nbspĐã phân chuyền'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-ready"></div>&nbspChuẩn bị SX'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-subprocess"></div>&nbspCông đoạn phụ'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-running"></div>&nbspĐang SX'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-done"></div>&nbspSX xong'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-finish"></div>&nbspNhập kho xong'
                +'</div>',
                margin: '5'
            }]
        }]
    }]
});

