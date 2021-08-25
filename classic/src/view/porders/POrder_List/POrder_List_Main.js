Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_Main', {
    extend: 'Ext.grid.Panel',
    xtype: 'porderlistmain',
    id: 'porderlistmain',
    viewModel: {
        type: 'POrder_List_ViewModel'
    },
    controller: 'POrder_List_MainController',
    reference: 'porderlistmain',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true,
        loadMask: true
    },
    bind: {
        store: '{POrder_ListStore}'
    },
    features: [
        {
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '<b>Phân xưởng: {name}</b>',
            hideGroupedHeader: false,
            enableGroupingMenu: false,
        },
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    columns: [
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_POrderList'
                },
            ]
        },
        {
            text: 'STT',
            width: 40,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text: 'Mã lệnh',
            dataIndex: 'ordercode',
            width: 120,
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('status');
                if (c == 0) {
                    metaData.tdCls = 'process-free';
                } else if (c == 1) {
                    metaData.tdCls = 'process-granted';
                } else if (c == 2) {
                    metaData.tdCls = 'process-ready';
                } else if (c == 3) {
                    metaData.tdCls = 'process-subprocess';
                } else if (c == 4) {
                    metaData.tdCls = 'process-running';
                } else if (c == 5) {
                    metaData.tdCls = 'process-running';
                } else if (c == 6) {
                    var soNgayChamGiaoHang = record.get('soNgayChamGiaoHang');
                    if (soNgayChamGiaoHang != null) {
                        if (soNgayChamGiaoHang < 0) {
                            metaData.tdCls = 'process-slow-ship-big';
                        } else if (soNgayChamGiaoHang < 5) {
                            metaData.tdCls = 'process-slow-ship-medium';
                        } else if (soNgayChamGiaoHang < 10) {
                            metaData.tdCls = 'process-slow-ship-small';
                        } else {
                            metaData.tdCls = 'process-finish';
                        }
                    } else {
                        metaData.tdCls = 'process-finish';
                    }
                }
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            summaryType: 'count',
            summaryRenderer: 'renderSum',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'ordercodeFilterField',
                width: 116,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onOrderCodeFilterKeyup',
                    buffer: 500
                }
            }
        },
        // {
        //     text: 'Mã Buyer',
        //     dataIndex: 'buyercode',
        //     width: 120,
        //     renderer: function(value, metaData, record, rowIdx, colIdx, store) {
        //         metaData.tdAttr = 'data-qtip="' + value + '"';
        //         return value;
        //     }
        //     // renderer: function (value, metaData, record, rowIndex) {
        //     //     var c = record.get('status');
        //     //     if(c == 0){
        //     //         metaData.tdCls = 'process-free';
        //     //     }else if (c == 1) {
        //     //         metaData.tdCls = 'process-granted';
        //     //     } else if (c == 2) {
        //     //         metaData.tdCls =  'process-ready';
        //     //     } else if (c == 3) {
        //     //         metaData.tdCls =  'process-subprocess';
        //     //     } else if (c == 4) {
        //     //         metaData.tdCls =  'process-running';
        //     //     } else if (c == 5) {
        //     //         metaData.tdCls =  'process-done';
        //     //     } else if (c == 6) {
        //     //         metaData.tdCls =  'process-finish';
        //     //     }
        //     //     metaData.tdAttr = 'data-qtip="' + value + '"';
        //     //     return value;
        //     // },
        // }, 
        {
            text: 'Mã SP (Buyer)',
            dataIndex: 'stylebuyer',
            width: 140,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stylebuyerFilterField',
                width: 136,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStyleBuyerFilterKeyup',
                    buffer: 500
                }
            }
        },
        {
            text: 'PO Buyer',
            dataIndex: 'po_buyer',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'po_buyerFilterField',
                width: 116,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPo_BuyerFilterKeyup',
                    buffer: 500
                }
            }
        },
        {
            text: 'Buyer',
            dataIndex: 'buyername',
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Vendor',
            dataIndex: 'vendorname',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },

        // {
        //     text: 'PO Vendor',
        //     dataIndex: 'po_vendor',
        //     flex: 1
        // }, 
        // {
        //     text: 'Tạo lệnh',
        //     dataIndex: 'orderdate',
        //     renderer: Ext.util.Format.dateRenderer('d/m/y'),
        //     // flex: 1,
        //     width: 70,
        // }, 
        {
            text: 'Vào chuyền',
            dataIndex: 'startDatePlan',
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
            renderer: function (value) {
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            // flex: 1,
            width: 100,
            align: 'end',
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        }, {
            text: 'Trạng thái',
            dataIndex: 'statusName',
            width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }
    ],
    dockedItems: [{
        itemId: 'topDock',
        dock: 'top',
        layout: 'vbox',
        border: false,
        margin: '0 0 2 0',
        title: 'Điều kiện lọc',
        ui: 'light',
        collapsible: true,
        collapsed: false,
        items: [{
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [{
                xtype: 'textfield',
                itemId: 'txtstyle',
                // fieldLabel: 'Chú thích',
                margin: 2,
                width: 210,
                fieldLabel: "Mã SP (Buyer)",
                labelWidth: 90,
                allowBlank: true
            },
            {
                xtype: 'textfield',
                itemId: 'txtpobuyer',
                // fieldLabel: 'Chú thích',
                margin: 2,
                allowBlank: true,
                width: 210,
                fieldLabel: "PO Buyer",
                labelWidth: 90,
            },
            {
                xtype: 'combobox',
                itemId: 'txtbuyerid',
                bind: {
                    store: '{POrder_ListBuyerStore}'
                },
                displayField: 'code',
                valueField: 'id',
                queryMode: 'local',
                anyMatch: true,
                editable: true,
                allowBlank: true,
                margin: 2,
                // width: 210,
                flex: 1,
                fieldLabel: "Buyer",
                labelWidth: 70,
            },
            {
                xtype: 'combobox',
                itemId: 'txtvendorid',
                bind: {
                    store: '{POrder_ListVendorStore}'
                },
                displayField: 'code',
                valueField: 'id',
                queryMode: 'local',
                anyMatch: true,
                editable: true,
                allowBlank: true,
                margin: 2,
                // width: 210,
                flex: 1,
                fieldLabel: "Vendor",
                labelWidth: 90,
            },
            {
                xtype: 'combobox',
                itemId: 'txtfactoryid',
                bind: {
                    store: '{ListOrgStore}'
                },
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                anyMatch: true,
                editable: true,
                allowBlank: true,
                margin: 2,
                // width: 210,
                flex: 1,
                fieldLabel: "P/Xưởng",
                labelWidth: 70,
            },
                // {
                //     xtype:'textfield',
                //     itemId:'txtpovendor',
                //     // fieldLabel: 'Chú thích',
                //     margin: 2,
                //     // flex: 1,
                //     width: 130,
                //     allowBlank: true,
                //     blankText: 'PO vendor',
                //     emptyText: 'PO vendor'
                // },
                // {
                //     xtype:'datefield',
                //     itemId:'txtdatefrom',
                //     reference: 'startdate',
                //     format: 'd/m/Y',
                //     margin: 2,
                //     // flex: 1,
                //     width: 125,
                //     emptyText: 'Tạo lệnh từ',
                //     hidden: true
                // },
                // {
                //     xtype:'datefield',
                //     itemId:'txtdateto',
                //     reference: 'enddate',
                //     format: 'd/m/Y',
                //     margin: 2,
                //     // flex: 1,
                //     width: 135,
                //     emptyText: 'Tạo lệnh đến',
                //     hidden: true
                // },
                // {flex: 1}
            ]
        },
        {
            layout: 'hbox',
            border: false,
            width: '100%',
            items: [{
                xtype: 'datefield',
                itemId: 'txtgolivedatefrom',
                reference: 'golivedatefrom',
                format: 'd/m/y',
                margin: 2,
                // flex: 1,
                width: 210,
                emptyText: 'Ngày giao từ',
                fieldLabel: "Ngày giao từ",
                labelWidth: 90,
                value: new Date(new Date().getTime() - 30 * 86400000),
                // hidden: true
            },
            {
                xtype: 'datefield',
                itemId: 'txtgolivedateto',
                reference: 'golivedateto',
                format: 'd/m/y',
                margin: 2,
                // flex: 1,
                width: 210,
                emptyText: 'Ngày giao đến',
                fieldLabel: "Ngày giao đến",
                labelWidth: 90,
                value: new Date((new Date()).getFullYear(), (new Date()).getMonth() + 6, 1),
                // hidden: true
            },
            {
                xtype: 'combobox',
                itemId: 'txtstatus',
                bind: {
                    store: '{POrder_ListStatusStore}'
                },
                displayField: 'name',
                valueField: 'id',
                // value: [1, 2, 3, 0, -1],
                value: [1, 2],
                queryMode: 'local',
                anyMatch: true,
                editable: true,
                allowBlank: true,
                multiSelect: true,
                emptyText: 'Trạng thái',
                fieldLabel: "Trạng thái",
                labelWidth: 70,
                margin: 2,
                // width: 210,
                flex: 1
            },
            {
                xtype: 'textfield',
                itemId: 'txtcontractcode',
                // fieldLabel: 'Chú thích',
                margin: 2,
                allowBlank: true,
                // width: 210,
                fieldLabel: "Mã đơn hàng",
                labelWidth: 90,
                flex: 1
            },
            {
                xtype: 'button',
                margin: 2,
                text: '',
                // width: 210,
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem',
                tooltip: 'Tìm kiếm',
                flex: 1
            },
                // {flex: 1}
            ]
        }]
    },
    {
        dock: 'bottom',
        layout: 'vbox',
        border: false,
        items: [
            {
                layout: 'hbox',
                border: false,
                items: [
                    {
                        html: '<div class="color-box">'
                            + '<div class="color-square process-free"></div>&nbspChưa&nbspphân&nbspchuyền'
                            + '</div>',
                        margin: '5'
                    },
                    {
                        html: '<div class="color-box">'
                            + '<div class="color-square process-granted"></div>&nbspĐã&nbspphân&nbspchuyền'
                            + '</div>',
                        margin: '5'
                    },
                    // {
                    //     html: '<div class="color-box">'
                    //     +'<div class="color-square process-ready"></div>&nbspChuẩn bị SX'
                    //     +'</div>',
                    //     margin: '5'
                    // },
                    {
                        html: '<div class="color-box">'
                            + '<div class="color-square process-running"></div>&nbspĐang&nbspSX'
                            + '</div>',
                        margin: '5'
                    },
                    // {
                    //     html: '<div class="color-box">'
                    //     +'<div class="color-square process-done"></div>&nbspSX xong'
                    //     +'</div>',
                    //     margin: '5'
                    // },
                    {
                        html: '<div class="color-box">'
                            + '<div class="color-square process-finish"></div>&nbspNhập&nbspkho&nbspxong'
                            + '</div>',
                        margin: '5'
                    },
                    {
                        html: '<div class="color-box">'
                            + '<div class="color-square process-slow-ship-small"></div>&nbsp'
                            + '</div>',
                        margin: '5'
                    },
                    {
                        html: '<div class="color-box">'
                            + '<div class="color-square process-slow-ship-medium"></div>&nbsp'
                            + '</div>',
                        margin: '5'
                    },
                    {
                        html: '<div class="color-box">'
                            + '<div class="color-square process-slow-ship-big"></div>&nbspChậm&nbspgiao&nbsphàng'
                            + '</div>',
                        margin: '5'
                    },

                ]
            }]
    }]
});

