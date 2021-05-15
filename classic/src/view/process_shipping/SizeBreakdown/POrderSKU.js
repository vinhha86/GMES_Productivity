Ext.define('GSmartApp.view.porders.POrder_List.POrderSKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderSKU',
    id: 'POrderSKU',
    controller: 'POrderSKUViewController',
    reference: 'POrderSKU',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        bind: {
            hidden: '{isProductSkuSelectHidden}'
        }
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    bind: {
        store: '{porderSKUStore}'
    },
    columns: [{
        text: 'Màu',
        dataIndex: 'mauSanPham',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Cỡ',
        dataIndex: 'coSanPham',
        width: 50
    }, {
        text: 'SL',
        dataIndex: 'pquantity_total',
        renderer: function (value) {
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 60,
        align: 'end',
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'textfield',
                    selectOnFocus: true,
                    bind: {
                        editable: '{isEditSL}'
                    }
                }
            })
        },
    }],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth: 0,
            value: 'Chi tiết màu cỡ'
        },
            '->'
            , {
            xtype: 'button',
            itemId: 'btnThemSKU',
            ui: 'header',
            margin: '10 5 0 0',
            tooltip: 'Thêm màu, cỡ',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

