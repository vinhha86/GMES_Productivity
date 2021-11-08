Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimeSheetLunch_ListView',
    id: 'TimeSheetLunch_ListView',
    controller: 'TimeSheetLunch_ListViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onEditCheckBox'
    //         } 
    //     }
    // },    
    bind: {
        store: '{TimeSheetLunchStore}'
    },
    enableColumnMove: false,
    reserveScrollbar: true,
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã NV',
        dataIndex: 'personnelCode',
        width: 100,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnelCodeFilter',
            width: 96,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPersonnelCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Mã đăng ký',
        dataIndex: 'register_code',
        width: 100,
        sortable: false,
        menuDisabled: true,
        hidden: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnelRegCodeFilter',
            width: 96,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPersonnelRegCodeFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Họ và tên',
        dataIndex: 'personnelFullname',
        // flex: 1,
        width: 200,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'personnelFullnameFilter',
            // flex: 1,
            width: 196,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPersonnelFullnameFilterKeyup',
                buffer: 500
            }
        }
    },
        // {
        //     text: 'Ca 1',
        //     flex: 1,
        //     columns: [
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Đi làm',
        //             dataIndex: 'workingShift1',
        //             headerCheckbox: true,
        //             flex: 1,
        //             // width: 75,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 headerclick: 'onHeaderClick'
        //             }
        //         },
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Ăn',
        //             dataIndex: 'lunchShift1',
        //             // headerCheckbox: true,
        //             flex: 1,
        //             // width: 50,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 // headerclick: 'onHeaderClick'
        //             }
        //         }
        //     ]
        // },
        // {
        //     text: 'Ca 2',
        //     flex: 1,
        //     columns: [
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Đi làm',
        //             dataIndex: 'workingShift2',
        //             headerCheckbox: true,
        //             flex: 1,
        //             // width: 75,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 headerclick: 'onHeaderClick'
        //             }
        //         },
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Ăn',
        //             dataIndex: 'lunchShift2',
        //             // headerCheckbox: true,
        //             flex: 1,
        //             // width: 50,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 // headerclick: 'onHeaderClick'
        //             }
        //         }
        //     ]
        // },
        // {
        //     text: 'Ca 3',
        //     flex: 1,
        //     columns: [
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Đi làm',
        //             dataIndex: 'workingShift3',
        //             headerCheckbox: true,
        //             flex: 1,
        //             // width: 75,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 headerclick: 'onHeaderClick'
        //             }
        //         },
        //         {
        //             xtype: 'checkcolumn',
        //             text: 'Ăn',
        //             dataIndex: 'lunchShift3',
        //             // headerCheckbox: true,
        //             flex: 1,
        //             // width: 50,
        //             listeners: {
        //                 beforecheckchange: 'onBeforecheckchange',
        //                 checkchange: 'onCheckchange',
        //                 // headerclick: 'onHeaderClick'
        //             }
        //         }
        //     ]
        // }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [
            {
                xtype: 'button',
                margin: 5,
                text: 'Xác nhận',
                iconCls: 'x-fa fa-check',
                itemId: 'btnConfirm',
                bind: {
                    hidden: '{isBtnConfirmHidden}'
                }
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Tự động lấy dữ liệu',
                iconCls: 'x-fa fa-sync',
                itemId: 'btnAutoGetInfo',
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Lưu',
                iconCls: 'x-fa fa-save',
                itemId: 'btnSave',
            },
            {
                flex: 1,
            },
            {
                xtype: 'button',
                margin: 5,
                text: 'Test',
                iconCls: 'x-fa fa-save',
                itemId: 'btnTest',
            },
        ]
    }, {
        dock: 'top',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Ca 1',
            margin: 3,
            width: 100,
            labelWidth: 50,
            eidtable: false,
            bind: {
                value: '{sumCa1}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ca 2',
            margin: 3,
            width: 100,
            labelWidth: 50,
            eidtable: false,
            bind: {
                value: '{sumCa2}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ca 3',
            margin: 3,
            width: 100,
            labelWidth: 50,
            eidtable: false,
            bind: {
                value: '{sumCa3}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Ca 4',
            margin: 3,
            width: 100,
            labelWidth: 50,
            eidtable: false,
            bind: {
                value: '{sumCa4}'
            }
        }]
    }]
});

