Ext.define('GSmartApp.view.DashboardMer.DashboardMer_PoLineSKU.DashboardMer_PoLineSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DashboardMer_PoLineSKUView',
    itemId: 'DashboardMer_PoLineSKUView',
    controller: 'DashboardMer_PoLineSKUViewController',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,scroll
    },
    scrollable: true,
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onEdit'
    //         }
    //     }
    // },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    // selModel: {
    //     //selType: 'checkboxmodel',
    //     mode: 'SINGLE'
    // },
    bind: {
        store: '{PContractSKUStore}'
    },
    columns: [
        // {
        //     xtype: 'actioncolumn',
        //     width: 28,
        //     menuDisabled: true,
        //     sortable: false,
        //     align: 'center',
        //     items: [{
        //         iconCls: 'x-fa fas fa-trash',
        //         tooltip: 'Xóa',
        //         handler: 'onXoa'
        //     }]
        // }, 
        // {
        //     text: 'STT',
        //     width: 40,
        //     xtype: 'rownumberer',
        //     align: 'center'
        // }, 
        {
            text: 'SKU',
            dataIndex: 'skuCode',
            flex: 1,
            menuDisabled: true,
            sortable: false,
            // width: 150,
            // minWidth: 120,
            summaryType: 'count',
            summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            text: 'Màu',
            // flex: 1,
            width: 70,
            menuDisabled: true,
            sortable: false,
            dataIndex: 'mauSanPham',
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, 
        {
            text: 'Cỡ',
            dataIndex: 'coSanPham',
            width: 70,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, 
        {
            text: 'SL cần giao',
            // dataIndex: 'pquantity_porder',
            width: 70,
            menuDisabled: true,
            sortable: false,
            align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // editor: {
            //     xtype: 'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     listeners: {
            //         specialkey: 'onSpecialkey'
            //     }
            // },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'SL đã cắt',
            // dataIndex: 'pquantity_porder',
            width: 70,
            menuDisabled: true,
            sortable: false,
            align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // editor: {
            //     xtype: 'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     listeners: {
            //         specialkey: 'onSpecialkey'
            //     }
            // },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Vào chuyền',
            // dataIndex: 'pquantity_porder',
            width: 80,
            menuDisabled: true,
            sortable: false,
            align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // editor: {
            //     xtype: 'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     listeners: {
            //         specialkey: 'onSpecialkey'
            //     }
            // },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Ra chuyền',
            // dataIndex: 'pquantity_porder',
            width: 80,
            menuDisabled: true,
            sortable: false,
            align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // editor: {
            //     xtype: 'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     listeners: {
            //         specialkey: 'onSpecialkey'
            //     }
            // },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Hoàn thiện',
            // dataIndex: 'pquantity_porder',
            width: 70,
            menuDisabled: true,
            sortable: false,
            align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // editor: {
            //     xtype: 'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     listeners: {
            //         specialkey: 'onSpecialkey'
            //     }
            // },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Tồn kho TP',
            // dataIndex: 'pquantity_porder',
            width: 70,
            menuDisabled: true,
            sortable: false,
            align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // editor: {
            //     xtype: 'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     listeners: {
            //         specialkey: 'onSpecialkey'
            //     }
            // },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            text: 'Đã xuất',
            // dataIndex: 'pquantity_porder',
            width: 70,
            menuDisabled: true,
            sortable: false,
            align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // editor: {
            //     xtype: 'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     listeners: {
            //         specialkey: 'onSpecialkey'
            //     }
            // },
            summaryType: 'sum',
            summaryRenderer: 'renderSum'
        },
        {
            xtype: 'actioncolumn',
            text: 'Yêu cầu xuất kho TP',
            width: 50,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [{
                iconCls: 'x-fa fas fa-truck',
                tooltip: 'Yêu cầu xuất kho TP',
                // handler: 'onXoa'
            }]
        }, 
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: 500; font-size: 14px; color: black",
            labelWidth: 0,
            bind: {
                value: 'Chi tiết màu, cỡ'
            }
        },
        {
            xtype: 'combo',
            bind: {
                store: '{PContractProduct_PO_Store}'
            },
            width: 300,
            valueField: 'id',
            displayField: 'code_amount',
            queryMode: 'local',
            anyMatch: true,
            fieldLabel: 'Sản phẩm',
            labelWidth: 70,
            margin: '5 5 5 20',
            itemId: 'cmbSanPham',
            anyMatch: true
        },
            '->'
            ,
        // {
        //     xtype: 'button',
        //     itemId: 'btnThemSKU',
        //     ui: 'header',
        //     tooltip: 'Thêm SKU',
        //     iconCls: 'x-fa fa-plus',
        //     handler: 'onThemSKU',
        //     bind: {
        //         disabled: '{isDisable_btnThemSKU}',
        //         hidden: '{isHiddenThemSKU}'
        //     }
        // },
        // {
        //     xtype: 'button',
        //     // text: 'Chốt màu,cỡ',
        //     itemId: 'btnConfirmSKU',
        //     // ui: 'header',
        //     tooltip: 'Chốt chi tiết màu cỡ',
        //     iconCls: 'x-fa fa-check greenIcon',
        //     bind: {
        //         disabled: '{isDisable_btnConfirmSKU}'
        //     }
        // }
        ]
    }]
});

