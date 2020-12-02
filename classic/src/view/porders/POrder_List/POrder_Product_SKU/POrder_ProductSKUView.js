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
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'SKU',
        dataIndex: 'skuCode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Màu',
        dataIndex: 'mauSanPham',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
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
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 60,
        align: 'end'
    }, {
        text: 'Đã phân chuyền',
        dataIndex: 'pquantity_granted',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 90,
        align: 'end'
    }, {
        text: 'Còn lại',
        dataIndex: 'pquantity_ungranted',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        summaryType: 'sum',
        summaryRenderer: 'renderSum',
        width: 65,
        align: 'end'
    }]
});

