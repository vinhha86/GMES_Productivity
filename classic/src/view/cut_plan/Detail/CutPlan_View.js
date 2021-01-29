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
                iconCls: 'x-fa fas fa-trash',
                tooltip: 'Xóa',
                handler: 'onXoa'
            }
        ]
    },{
        text: 'Sơ đồ',
        dataIndex: 'name',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Lá vải',
        dataIndex: 'la_vai',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Dài sơ đồ',
        dataIndex: 'dai_so_do',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'SL vải',
        dataIndex: 'sl_vai',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Khổ',
        dataIndex: 'kho',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Số cây',
        dataIndex: 'so_cay',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Ngày',
        dataIndex: 'ngay',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
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

