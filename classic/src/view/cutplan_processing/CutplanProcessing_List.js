Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'CutplanProcessing_List',
    itemId: 'CutplanProcessing_List',
    reference: 'CutplanProcessing_List',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{CutplanProcessingStore}'
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 45,
            menuDisabled: true,
            sortable: false,
            items: [
                {
                    iconCls: 'x-fa fas fa-pencil-square-o greenIcon',
                    tooltip: 'Sửa phiếu',
                    handler: 'onCutplanProcessingItemEditClick'
                }, 
                // {
                //     iconCls: 'x-fa fas fa-trash-o redIcon',
                //     tooltip: 'Xóa phiếu',
                //     // handler: 'onDelete'
                // }
            ]
        },             
        {text: 'Lệnh SX', dataIndex: 'pordercode', width: 130,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'cutplanProcessing_pordercodeFilter',
                width: 125,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onCutplanProcessing_pordercodeFilterKeyup',
                    buffer: 500
                }
            },
        },
        {text: 'Mã NPL', dataIndex: 'maSP', width: 130,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'cutplanProcessing_maSPFilter',
                width: 125,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onCutplanProcessing_maSPFilterKeyup',
                    buffer: 500
                }
            },
        },
        {text: 'Màu SP', dataIndex: 'color_name', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        {text: 'Bàn số', dataIndex: 'cutorg_name', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        {text: 'Ngày', dataIndex: 'processingdate', flex: 1,
            xtype: 'datecolumn',
            format: 'd/m/Y',
        },
        {text: 'Sơ đồ cắt', dataIndex: 'cutPlanRowName', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        {text: 'Dài bàn', dataIndex: 'dai_so_do', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
        // {text: 'SL cắt', dataIndex: 'amountcut', flex: 1,
        //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
        //         var val = value == 'null' ? "" : value;
        //         metaData.tdAttr = 'data-qtip="' + val + '"';
        //         return val;
        //     },
        // },
    ],
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            xtype: 'toolbar',
            border: false,
            items: [
            {
                xtype: 'button',
                margin: 3,
                text: 'Lập phiếu mới',
                iconCls: 'x-fa fa-plus',
                itemId: 'btnThem',
                // handler: 'onNhapMuaMoi',
            },
            {
                itemId: 'fromDate',
                xtype: 'datefield',
                // value: new Date(),
                margin: 3,
                format:'d/m/Y',
                fieldLabel: 'Từ ngày:',
                labelWidth: 86,
                width: 215,
                bind: {
                    value: '{fromDate}'
                }
            }, 
            {
                itemId: 'toDate',
                xtype: 'datefield',
                // value: new Date(),
                margin: 3,
                format:'d/m/Y',
                fieldLabel: 'đến ngày:',
                labelWidth: 86,
                width: 215,
                bind: {
                    value: '{toDate}'
                }
            },
            {
                xtype: 'button',
                margin: 3,
                text: 'Tìm kiếm',
                iconCls: 'x-fa fa-search',
                itemId: 'btnTimKiem',
            }]
        }, 
    ],
});

