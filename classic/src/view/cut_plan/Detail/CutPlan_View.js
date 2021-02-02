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
        text: 'Lá vải',
        dataIndex: 'la_vai',
        width: 120,
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
        width: 100,
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
        text: 'SL vải',
        dataIndex: 'sl_vai',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseFloat(value) == 0 ? '' : Ext.util.Format.number(value, '0,000.00');
        }
    }, {
        text: 'Khổ',
        dataIndex: 'kho',
        width: 120,
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
        text: 'Số cây',
        dataIndex: 'so_cay',
        width: 120,
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
    }, {
        text: 'Ngày',
        dataIndex: 'ngay',
        width: 100,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'datefield',
                        format: 'd-m-y'
                    }
                })
            }
        },
        renderer: Ext.util.Format.dateRenderer('d-m-Y'),
        // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
        //     metaData.tdAttr = 'data-qtip="' + value + '"';
        //     return value == 'null' ? '' : value;
        // }
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            margin: 3,
            text: 'Thêm sơ đồ',
            itemId: 'btnThemSoDo',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

