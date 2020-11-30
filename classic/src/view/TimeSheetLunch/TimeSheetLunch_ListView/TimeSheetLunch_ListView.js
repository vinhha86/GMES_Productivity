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
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã NV',
        dataIndex: 'personnelCode',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Họ và tên',
        dataIndex: 'personnelFullname',
        width: 200,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Ca 1',
        flex: 1,
        columns: [
            { 
                xtype: 'checkcolumn',
                text: 'Đi làm',
                dataIndex: 'workingShift1',
                headerCheckbox: false,
                flex: 1,
                listeners: {
                    beforecheckchange: 'onBeforecheckchange',
                    checkchange: 'onCheckchange'
                }
            }, 
            { 
                xtype: 'checkcolumn',
                text: 'Ăn',
                dataIndex: 'lunchShift1',
                headerCheckbox: false,
                flex: 1,
                listeners: {
                    beforecheckchange: 'onBeforecheckchange',
                    checkchange: 'onCheckchange'
                }
            }
        ]
    },
    {
        text: 'Ca 2',
        flex: 1,
        columns: [
            { 
                xtype: 'checkcolumn',
                text: 'Đi làm',
                dataIndex: 'workingShift2',
                headerCheckbox: false,
                flex: 1,
                listeners: {
                    beforecheckchange: 'onBeforecheckchange',
                    checkchange: 'onCheckchange'
                }
            }, 
            { 
                xtype: 'checkcolumn',
                text: 'Ăn',
                dataIndex: 'lunchShift2',
                headerCheckbox: false,
                flex: 1,
                listeners: {
                    beforecheckchange: 'onBeforecheckchange',
                    checkchange: 'onCheckchange'
                }
            }
        ]
    },
    {
        text: 'Ca 3',
        flex: 1,
        columns: [
            { 
                xtype: 'checkcolumn',
                text: 'Đi làm',
                dataIndex: 'workingShift3',
                headerCheckbox: false,
                flex: 1,
                listeners: {
                    beforecheckchange: 'onBeforecheckchange',
                    checkchange: 'onCheckchange'
                }
            }, 
            { 
                xtype: 'checkcolumn',
                text: 'Ăn',
                dataIndex: 'lunchShift3',
                headerCheckbox: false,
                flex: 1,
                listeners: {
                    beforecheckchange: 'onBeforecheckchange',
                    checkchange: 'onCheckchange'
                }
            }
        ]
    }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Xác nhận',
            width: 90,
            itemId: 'btnConfirm',
            bind: {
                hidden: '{isBtnConfirmHidden}'
            }
        }, {
            xtype: 'button',
            margin: 5,
            text: 'Huỷ',
            width: 90,
            itemId: 'btnUnconfirm',
            bind: {
                hidden: '{isBtnUnconfirmHidden}',
                disabled: '{isBtnUnconfirmHiddenDisabled}'
            }
        }, {
            flex: 1,
        }]
    }]
});

