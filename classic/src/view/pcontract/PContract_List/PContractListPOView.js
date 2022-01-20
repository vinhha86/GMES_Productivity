Ext.define('GSmartApp.view.pcontract.PContractListPOView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractListPOView',
    id: 'PContractListPOView',
    requires: [
        'Ext.ProgressBarWidget'
    ],
    controller: 'PContractListPOViewController',
    reference: 'PContractListPOView',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{PContractPOList}'
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';

            if (record.data.status == 0) {
                metaData.tdCls = "po_accept";
            }
            else if (record.data.status == -3) {
                metaData.tdCls = "po_cancel";
                metaData.tdAttr = 'data-qtip="PO đã hủy"';
            }
            return value;
        }
    }, {
        text: 'Mã SP (Buyer)',
        dataIndex: 'productbuyercode',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'SL',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 80,
        summaryType: 'sum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:red; font-size:9px; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    }, {
        text: 'ĐVT',
        dataIndex: 'totalpair',
        width: 60,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 1 ? "Chiếc" : "Bộ (" + value + ")";
        }
    }, {
        text: 'SL SP',
        align: 'right',
        dataIndex: 'po_quantity_sp',
        width: 80,
        summaryType: 'sum',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        summaryRenderer: function (value, summaryData, dataIndex) {
            return '<div style="color:red; font-size:9px; font-weight: bold; align: right">' + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    }, {
        text: 'Ngày giao',
        dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 80
    },
    {
        text: 'Ngày NPL',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex: 'matdate',
        width: 80
    },
    {
        text: 'Ngày VC',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex: 'productiondate',
        width: 70
    },
    // {
    //     text:'Số ngày SX',
    //     align: 'right',
    //     dataIndex:'productiondays',
    //     width: 90
    // },
    {
        text: 'Phân xưởng',
        dataIndex: 'factories',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text: 'Phụ trách',
        dataIndex: 'merchandiser_name',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 5 5',
        height: 40,
        items: [
            {
				margin:'0 5 0 0',
				xtype: 'button',
				iconCls: 'x-fa fa-angle-double-up',
				itemId: 'btnThuGon',
				bind: {
					hidden: '{IsformMaster}'
				}
			}, 
			{
				margin:'0 5 0 0',
				xtype: 'button',
				itemId: 'btnMoRong',
				iconCls: 'x-fa fa-angle-double-down',
				bind: {
					hidden: '{!IsformMaster}'
				}
			}, 
            {
                xtype: 'displayfield',
                fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                labelWidth: 0,
                value: ' Danh sách PO Line (Nhịp giao hàng)'
            },
                '->'
                ,
            {
                xtype: 'button',
                itemId: 'btnEditAllLine',
                ui: 'header',
                tooltip: 'Sửa nhanh line giao hàng',
                iconCls: 'x-fa fa-edit',
                bind: {
                    hidden: '{isHiddenEditAll}'
                }
            }
        ]
    },
    {
        dock: 'bottom',
        width: '100%',
        layout: 'vbox',
        border: false,
        items: [{
            layout: 'hbox',
            border: false,
            items: [{
                html: '<div class="color-box">'
                    + '<div class="color-square po_free"></div>&nbspChưa chốt'
                    + '</div>',
                margin: '5'
            }, {
                html: '<div class="color-box">'
                    + '<div class="color-square po_accept"></div>&nbspĐã chốt'
                    + '</div>',
                margin: '5'
            }, {
                html: '<div class="color-box">'
                    + '<div class="color-square po_cancel"></div>&nbspĐã hủy'
                    + '</div>',
                margin: '5'
            }]
        }]
    }
    ],

});

