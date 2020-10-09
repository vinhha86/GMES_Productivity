Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineDetail_ProductGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverCutTolineDetail_ProductGrid',
    id: 'HandoverCutTolineDetail_ProductGrid',
    IdPOrder: 0,
    // controller: 'POrder_ProductSKUViewController',
    reference: 'HandoverCutTolineDetail_ProductGrid',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{porderSKUStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã SP(Buyer)',
        dataIndex: 'skucode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Tên SP(Buyer)',
        dataIndex: 'mauSanPham',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Số lượng',
        dataIndex: 'pquantity_total',
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        flex: 1,
        align: 'end'
    }, {
        text: 'Đơn vị tính',
        dataIndex: 'inProductionQuantity',
        flex: 1,
    }, {
        text: 'SKU',
        dataIndex: 'remainQuantity',
        flex: 1,
    }]
});

