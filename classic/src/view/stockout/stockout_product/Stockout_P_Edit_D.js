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
        // { header: 'Mã vải chính', dataIndex: 'mainskucode', width: 70},
        // {
        //     header: 'Mã vạch', dataIndex: 'skucode', width: 150,
        // },
        // { header: 'Mã sản phẩm', dataIndex: 'product_code', width: 150 },
        { header: 'Tên sản phẩm', dataIndex: 'product_code', flex: 1 },
        { header: 'Màu', dataIndex: 'color_name', flex: 1 },
        { header: 'Cỡ', dataIndex: 'size_name', width: 100 },
        {
            header: 'Số lượng YC', dataIndex: 'totalpackage_req', width: 80,
            xtype: 'numbercolumn',
            format: '0,000',
            summaryType: 'sum', summaryRenderer: 'renderSum'
        },{
            header: 'Số lượng xuất', dataIndex: 'totalpackage', width: 80,
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
            },{
                labelWidth: 90,
                margin:'0 5 5 5',
                xtype: 'combobox',
                fieldLabel: 'Cách xuất',
                bind: {
                    store: '{StockoutGroupStore}',
                    value: '{groupstockout}'
                },
                width: 300,
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
				    hidden: '{isHidden}'
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
				    hidden: '{isHidden}'
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
				    hidden: '{isHidden}'
                }
            },'->',
            {
                xtype: 'textfield',
                margin: '0 5 0 5',
                itemId:'ordercode',
                fieldLabel: 'Tìm PO line',
                width: 300,
                labelWidth: 80,
                hideLabel: false,			
                bind:{
                    hidden: '{isEdit}',
                    value: '{stockin.po_buyer}'
                }  
            },
            {
                tooltip: 'Tìm lệnh',
                margin: '0 5 0 5',
                itemId: 'btnTimLenh',
                //text: 'Thêm thẻ vải',
                iconCls: 'x-fa fa-search',
                weight: 30,			
                bind:{
                    hidden: '{isEdit}'
                }
                // handler: 'onSkuSearchTap'
            } 
        ]
    }]
});
