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
	plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
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
        {
			header: 'Mã vạch', 
			dataIndex: 'skucode',
			width: 120,	
			summaryRenderer:function (grid, context) {
				return "Tổng cộng";
			}
		},{
			header: 'Mã SP', 
			dataIndex: 'product_code',
            width: 120,
		},{
			header: 'Tên sản phẩm', 
			dataIndex: 'skuname',
			flex: 1
		},
        { header: 'Màu', dataIndex: 'color_name', width: 100},
        { header: 'Cỡ', dataIndex: 'size_name', width: 50 },
        {
            // header: 'Số lượng YC', dataIndex: 'totalpackage_req', width: 80,
            header: 'SL Y/C', dataIndex: 'totalpackage', width: 80,
            align:'right',
            xtype: 'numbercolumn',
            format: '0,000',
            summaryType: 'sum', summaryRenderer: 'renderSum',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                bind: {
                    editable: '{iseditSL_YC}'
                }
            }            
        },{
            header: 'SL xuất', dataIndex: 'totalpackagecheck', width: 80,
            align:'right',
            summaryType: 'sum', summaryRenderer: 'renderSum',
            // xtype: 'numbercolumn',
            // format: '0,000',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                bind: {
                    editable: '{iseditSL}'
                }
            }
        },
        { header: 'ĐVT', dataIndex: 'unit_name', width: 80 },
        { header: 'Đơn giá', dataIndex: 'unitprice', width: 100},
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
            },{
                labelWidth: 120,
                margin:'0 5 5 5',
                xtype: 'combobox',
                editable: false,
                fieldLabel: 'Phương pháp xuất',
                bind: {
                    store: '{StockoutGroupStore}',
                    value: '{groupstockout}'
                },
                width: 270,
                displayField: 'name',
                valueField: 'id',
                itemId: 'cmbGroupStockout'
            }, {
                labelWidth: 90,
                width: 300,
                margin: '0 0 0 5',
                xtype: 'combobox',
                fieldLabel: 'Thiết bị RFID:',
                bind: {
                    store: '{DeviceInvStore}',
				    hidden: '{isRFIDHidden}'
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
                    userCls: '{clsbtnStart}',
				    hidden: '{isRFIDHidden}'
                }
            },
            {
                margin: '0 5 5 5',
                text: "Stop",
                iconCls: 'x-fa fa-stop',
                xtype: 'button',
                handler: 'onStop',
                bind: {
                    userCls: '{clsbtnSt}',
				    hidden: '{isRFIDHidden}'
                }
            },
            {
                xtype: 'textfield',
                margin: '0 5 0 5',
                itemId:'skucode',
                fieldLabel: 'Mã SP',
                width: 200,
                labelWidth: 50,
                hideLabel: false,			
                bind:{
                    hidden: '{isBarcodeHidden}',
                    value: '{skucode}'
                },
                // enableKeyEvents : true,
                // listeners: {
                //     keypress: 'onPressEnterBtnThemNPL'
                // }
            },
            {
                tooltip: 'Thêm SP',
                margin: '0 0 0 5',
                iconCls: 'x-fa fa-plus',
                weight: 30,
                itemId: 'btnThemSP',
                bind:{
                    hidden: '{isBarcodeHidden}',
                },
            },
            {
                tooltip: 'Tìm SP',
                margin: '0 5 0 5',
                itemId: 'btnTimSP',
                iconCls: 'x-fa fa-search',
                weight: 30,			
                bind:{
                    hidden: '{isManualHidden}',
                },
            },
            // '->',
            // {
            //     xtype: 'textfield',
            //     margin: '0 5 0 0',
            //     itemId:'ordercode',
            //     fieldLabel: 'Đợt giao',
            //     width: 200,
            //     labelWidth: 70,
            //     hideLabel: false,			
            //     bind:{
            //         hidden: '{isEdit}',
            //         value: '{stockin.po_buyer}'
            //     }  
            // },
            // {
            //     tooltip: 'Tìm lệnh',
            //     margin: '0 2 0 2',
            //     itemId: 'btnTimLenh',
            //     //text: 'Thêm thẻ vải',
            //     iconCls: 'x-fa fa-search',
            //     weight: 30,			
            //     bind:{
            //         hidden: '{isEdit}'
            //     }
            //     // handler: 'onSkuSearchTap'
            // } 
        ]
    }]
});
