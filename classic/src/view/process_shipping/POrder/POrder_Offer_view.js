Ext.define('GSmartApp.view.process_shipping.POrder.POrder_List.POrder_Offer_view', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Offer_view',
    id: 'POrder_Offer_view',
    controller: 'POrder_Offer_viewController',
    viewModel: {
        type: 'POrder_Offer_viewModel'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SIMPLE',
        checkOnly: true
    },
    bind: {
        store: '{POrder_ListStore}'
    },
    columns: [
        {
            text: 'Mã lệnh',
            dataIndex: 'ordercode',
            width: 150,
            renderer: function (value, metaData, record, rowIndex) {
                // var viewmodel = this.getViewModel();
                // var shipdate_line = record.get('shipdate');
                // var shipdate = viewmodel.get('shipdate');
                // console.log(shipdate_line);
                // console.log(shipdate);
                // var day = Ext.Date.diff(shipdate_line, shipdate, "d");
                // console.log(day);
                // var c = record.get('status');
                // if (c == 0) {
                //     metaData.tdCls = 'process-free';
                // } else if (c == 1) {
                //     metaData.tdCls = 'process-granted';
                // } else if (c == 2) {
                //     metaData.tdCls = 'process-ready';
                // } else if (c == 3) {
                //     metaData.tdCls = 'process-subprocess';
                // } else if (c == 4) {
                //     metaData.tdCls = 'process-running';
                // } else if (c == 5) {
                //     metaData.tdCls = 'process-done';
                // } else if (c == 6) {
                //     metaData.tdCls = 'process-finish';
                // }
                // metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'ordercodeFilterField',
                width: '99%',
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onOrderCodeFilterKeyup',
                    buffer: 500
                }
            }
        },
        {
            text: 'Phân xưởng',
            width: 90,
            dataIndex: 'granttoorgcode'
        },
        {
            text: 'Ngày NPL về',
            width: 90,
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            dataIndex: 'matdate'
        },
        {
            text: 'Ngày RC',
            width: 70,
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            dataIndex: 'productiondate'
        },
        {
            text: 'Ngày giao KH',
            width: 90,
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            dataIndex: 'shipdate'
        },
        {
            text: 'Tổ chuyền',
            flex: 1,
            dataIndex: 'grantName',
            renderer: function (value, metaData, record, rowIndex) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'SL KH',
            dataIndex: 'totalorder',
            renderer: function (value) {
                return Ext.util.Format.number(parseFloat(value), '0,000');
            },
            // flex: 1,
            width: 60,
            align: 'end'
        }, {
            text: 'Đã map',
            dataIndex: 'isMap',
            disabled: true,
            xtype: 'checkcolumn',
            width: 50
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            dock: 'bottom',
            layout: 'hbox',
            items: [{
                xtype: 'button',
                text: 'Thoát',
                itemId: 'btnThoat',
                iconCls: 'x-fa fa-window-close',
                margin: 5
            }, {
                xtype: 'button',
                text: 'Chọn',
                margin: 5,
                itemId: 'btnChon',
                iconCls: 'x-fa fa-check',
                text: 'Chọn'
            }]
        }]
    }]
});

