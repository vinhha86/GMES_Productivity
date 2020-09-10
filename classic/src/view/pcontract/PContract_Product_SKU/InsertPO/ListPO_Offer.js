Ext.define('GSmartApp.view.pcontract.PContract_Product_SKU.InsertPO.ListPO_Offer', {
    extend: 'Ext.grid.Panel',
    xtype: 'ListPO_Offer',
    id: 'ListPO_Offer',
    controller: 'ListPO_OfferController',
    requires: [
        'Ext.Number',
        'Ext.Date'
    ],
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.data.status == 0) {
                return "po_accept";
            }
            else {
                if (record.get('po_quantity') != record.get('amount_org')) {
                    return "po_wrongamount"
                }
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE',
        checkOnly: true
    },
    bind: {
        store: '{PContractProductPOStore}'
    },
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'PO Buyer',
        dataIndex: 'po_buyer',
        width: 110,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Mã SP (Buyer)',
        dataIndex: 'productvendorcode',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'SL',
        align: 'right',
        dataIndex: 'po_quantity',
        width: 60,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }, {
        text: 'Ngày giao',
        dataIndex: 'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 70
    },
    {
        text: 'Ngày NPL',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex: 'matdate',
        width: 70
    },
    {
        text: 'Ngày VC',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex: 'productiondate',
        width: 70
    },
    {
        text: 'Số ngày SX',
        align: 'right',
        dataIndex: 'productiondays',
        width: 70
    },
    {
        text: 'Phân xưởng',
        dataIndex: 'factories',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Phụ trách',
        dataIndex: 'merchandiser_name',
        flex: 1,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
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
            bind: {
                value: 'Danh sách chào giá'
            }
        }]
    }]

});

