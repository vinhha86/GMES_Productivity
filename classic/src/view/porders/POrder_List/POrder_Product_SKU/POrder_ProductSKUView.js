Ext.define('GSmartApp.view.porders.POrder_List.POrder_ProductSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_ProductSKUView',
    id: 'POrder_ProductSKUView',
    IdPOrder: 0,
    // viewModel: {
    //     type: 'SizesetViewModel'
    // },
    controller: 'POrder_ProductSKUViewController',
    reference: 'POrder_ProductSKUView',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
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
        dataIndex: 'pquantity_total',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        flex: 1,
        align: 'end'
    }, {
        text: 'Đã phân chuyền',
        dataIndex: 'inProductionQuantity',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        flex: 1,
        align: 'end'
    }, {
        text: 'Chưa phân chuyền',
        dataIndex: 'remainQuantity',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        flex: 1,
        align: 'end'
    }]
});

