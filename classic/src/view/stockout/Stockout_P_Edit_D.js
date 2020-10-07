Ext.define('GSmartApp.view.stockout.Stockout_P_Edit_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockout_p_edit_d',
    requires: [
		'Ext.grid.plugin.CellEditing'
	],
    border: true,
    bind:{
        store: '{StockoutD_Store}'
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    columnLines: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        getRowClass: function(record, index) {
            var c = record.get('status');
            if (c == -1) {
                return 'epc-error';
            }
            else {
                return 'epc-ok';
            }
        }                     
    },
    columns: [
        // { header: 'Mã vải chính', dataIndex: 'mainskucode', width: 70},
        {
            header: 'Mã vạch', dataIndex: 'skucode', width: 150,
            // items: {
            //     xtype: 'textfield',
            //     fieldStyle: "",
            //     reference: 'materialFilterField',
            //     width: 75,
            //     margin: 2,
            //     enableKeyEvents: true,
            //     listeners: {
            //         keyup: 'onMaterialFilterKeyup',
            //         buffer: 500
            //     }
            // },
        },
        { header: 'Mã sản phẩm', dataIndex: 'product_code', width: 150 },
        { header: 'Tên sản phẩm', dataIndex: 'skuname', flex: 1 },
        { header: 'Màu', dataIndex: 'color_name', width: 100 },
        { header: 'Cỡ', dataIndex: 'size_name', width: 100 },
        {
            header: 'Số lượng', dataIndex: 'totalpackage', width: 80,
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },
        { header: 'ĐVT', dataIndex: 'unit_name', width: 80 },
        {
            header: 'Đơn giá', dataIndex: 'unitprice', width: 100
        },
        {
            header: 'Thành tiền', dataIndex: 'totalprice', width: 100,
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },
        { 
            xtype: 'actioncolumn',
            reference: 'stockout_contextmenu',
			width: 25,
			menuDisabled: true,
			sortable: false,
			items: [
            {
				iconCls: 'x-fa fas fa-bars violetIcon',
                tooltip:'Chi tiết chíp',
                handler: 'onEPCDetail'
            }
        ]
        }        
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                margin: '0 0 0 5',
                xtype: 'button',
                iconCls: 'x-fa fa-angle-double-up',
                itemId: 'btnThuGon',
                bind: {
                    hidden: '{IsformMaster}'
                }
            }, {
                margin: '0 0 0 5',
                xtype: 'button',
                itemId: 'btnMoRong',
                iconCls: 'x-fa fa-angle-double-down',
                bind: {
                    hidden: '{!IsformMaster}'
                }
            }, {
                labelWidth: 90,
                width: 300,
                margin: '0 0 0 5',
                xtype: 'combobox',
                fieldLabel: 'Thiết bị RFID:',
                bind: {
                    store: '{DeviceInvStore}'
                },
                displayField: 'name',
                valueField: 'id',
                name: 'deviceid',
                reference: 'device',
                listeners: {
                    change: 'onDeviceChange'
                }
            },
            {
                margin: '0 5 5 5',
                text: "Start",
                iconCls: 'x-fa fa-play',
                xtype: 'button',
                handler: 'onStart',
                bind: {
                    disabled: '{isStart}',
                    userCls: '{clsbtnStart}'
                }
            },
            {
                margin: '0 5 5 5',
                text: "Stop",
                iconCls: 'x-fa fa-stop',
                xtype: 'button',
                handler: 'onStop',
                userCls: 'red-button'
            }
        ]
    }]
});
