Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_List_GrantSKUView',
    id: 'POrder_List_GrantSKUView',
    IdPOrder: 0,
    // viewModel: {
    //     type: 'SizesetViewModel'
    // },
    controller: 'POrder_List_GrantSKUViewController',
    reference: 'POrder_List_GrantSKUView',
    viewConfig: {
        stripeRows: true,
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
        mode: 'MULTI'
    },
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    bind: {
        store: '{POrder_ListGrantSKUStore}'
    },
    title: 'Chi tiết màu, cỡ',
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'SKU',
        dataIndex: 'skucode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Màu',
        dataIndex: 'mauSanPham',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Cỡ',
        dataIndex: 'coSanPham',
        flex: 1
    }, {
        text: 'Số lượng',
        dataIndex: 'grantamount',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống số lượng',
                itemId:'txtgrantamount',
                maskRe: /[0-9]/,
            }
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        flex: 1,
        align: 'end'
    }]
});

