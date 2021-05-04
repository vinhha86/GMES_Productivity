Ext.define('GSmartApp.view.pcontract.PCotnract_Bom_PO_VIew', {
    extend: 'Ext.grid.Panel',
    xtype: 'PCotnract_Bom_PO_VIew',
    id: 'PCotnract_Bom_PO_VIew',
    controller: 'PCotnract_Bom_PO_VIewController',
    viewModel: {
        type: 'PCotnract_Bom_PO_VIewModel'
    },
    bind: {
        store: '{PContractBom_PO_Store}'
    },
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    columns: [{
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'Ngày giao hàng',
        dataIndex: 'shipdate',
        width: 150
    }, {
        text: 'Số lượng',
        dataIndex: 'quantity',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'Cảng đi',
        dataIndex: 'port_from_name',
        width: 200,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, {
        text: 'Cảng đến',
        dataIndex: 'port_to_name',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }]
})