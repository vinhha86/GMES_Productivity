Ext.define('GSmartApp.view.TimeSheetLunch.LunchKhachView', {
    extend: 'Ext.grid.Panel',
    xtype: 'LunchKhachView',
    id: 'LunchKhachView',
    controller: 'LunchKhachViewController',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    bind: {
        store: '{TimeSheetLunchKhachStore}'
    },
    enableColumnMove: false,
    reserveScrollbar: true,
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Ca ăn',
        dataIndex: 'shifttype_name',
        flex: 1,
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:black; font-weight: bold; align: right">' + 'Tổng: </div>';
        }
    }, {
        text: 'Số lượng',
        dataIndex: 'amount',
        width: 100,
        align: 'right',
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                maskRe: /[0-9]/
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            return Ext.util.Format.number(value, '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:black; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000'); + '</div>';
        }
    }
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
                // bind: {
                //     hidden: '{isBtnConfirmHidden}'
                // }
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
            // {
            //     xtype: 'button',
            //     margin: 5,
            //     text: 'Test',
            //     iconCls: 'x-fa fa-save',
            //     itemId: 'btnTest',
            // },
        ]
    }]
});

