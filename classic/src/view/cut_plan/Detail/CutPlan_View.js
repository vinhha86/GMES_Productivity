Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'CutPlan_View',
    controller: 'CutPlan_ViewController',
    colorid_link: 0,
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,        
        getRowClass: function (record, index) {
            if (record.data.type == 2) {
                return "po_accept";
            }
            else if (record.data.type == 1){
                return "po_wrongamount"
            }
        }
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    bind: {
        store: '{CutPlanRowStore}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                handler: 'onXoa',
                getClass: function(v, meta, rec) {
                    if (rec.get('type') == 0) {
                        return 'x-fa fas fa-trash';
                    }
                },
                getTip: function(value, metadata, record, row, col, store) {
                    if(record.get('type') == 0){
                        return 'Xóa';
                    }
                 }
            }
        ]
    },
    {
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                handler: 'onLock',
                getClass: function(v, meta, rec) {
                    if (rec.get('type') == 0) {
                        return 'x-fa fas fa-lock';
                    }
                },
                getTip: function(value, metadata, record, row, col, store) {
                    if(record.get('type') == 0){
                        return 'Giữ cây vải';
                    }
                 }
            }
        ]
    },{
        text: 'Sơ đồ',
        dataIndex: 'name',
        width: 120,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Số lá trải',
        dataIndex: 'la_vai',
        width: 70,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true,
                        maskRe: /[0-9]/
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseInt(value) == 0 ? '' : Ext.util.Format.number(value, '0,000');;
        }
    }, {
        text: 'Dài sơ đồ',
        dataIndex: 'dai_so_do',
        width: 80,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true,
                        maskRe: /[0-9.]/
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseFloat(value) == 0 ? '' : Ext.util.Format.number(value, '0,000.00');;
        }
    }, {
        text: 'Tiêu hao',
        dataIndex: 'sl_vai',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseFloat(value) == 0 ? '' : Ext.util.Format.number(value, '0,000.00');
        }
    }, {
        text: 'Khổ',
        dataIndex: 'kho',
        width: 60,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true,
                        maskRe: /[0-9.,a-z']/
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'SL Cây',
        dataIndex: 'so_cay',
        width: 60,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true,
                        maskRe: /[0-9]/
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseInt(value) == 0 ? '' : Ext.util.Format.number(value, '0,000');
        }
    },
    // {
    //     text: 'Số cây giữ',
    //     dataIndex: 'so_cay_giu',
    //     width: 120,
    //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return parseInt(value) == 0 ? '' : Ext.util.Format.number(value, '0,000');
    //     }
    // }, 
    {
        text: 'Ngày',
        dataIndex: 'ngay',
        width: 80,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'datefield',
                        format: 'd/m/y'
                    }
                })
            }
        },
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
        //     metaData.tdAttr = 'data-qtip="' + Ext.Date.format(value, 'd/m/Y') + '"';
        //     return value;
        // }
    }
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        items:[{
            xtype: 'button',
            text: 'DS NPL',
            iconCls: 'x-fa fa-forward',
            itemId: 'btnShowNPL',
            margin: 2,
            bind: {
                hidden: '{!isHiddenNPL}'
            }
        },{
            xtype: 'button',
            margin: 2,
            text: 'Thêm sơ đồ',
            itemId: 'btnThemSoDo',
            iconCls: 'x-fa fa-plus'
        },{
            flex: 1
        },{
            xtype: 'textfield',
            fieldLabel: 'Mã NPL',
            readOnly: true,
            labelWidth: 60,
            width: 160,
            bind: {
                value: '{npl.product_code}'
            },
            margin: 2
        },{
            xtype: 'textfield',
            fieldLabel: 'Tên NPL',
            readOnly: true,
            labelWidth: 60,
            bind: {
                value: '{npl.product_name}'
            },
            margin: 2
        },{
            xtype: 'textfield',
            fieldLabel: 'Màu NPL',
            labelWidth: 70,
            width: 200,
            readOnly: true,
            bind: {
                value: '{npl.mauSanPham}'
            },
            margin: 2
        },{
            xtype: 'textfield',
            fieldLabel: 'Cỡ khổ',            
            labelWidth: 60,
            readOnly: true,
            width: 150,
            bind: {
                value: '{npl.coSanPham}'
            },
            margin: 2
        }]
    }]
});

