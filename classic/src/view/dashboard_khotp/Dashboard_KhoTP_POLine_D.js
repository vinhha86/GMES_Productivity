Ext.define('GSmartApp.view.dashboard_khotp.Dashboard_KhoTP_POLine_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'Dashboard_KhoTP_POLine_D',
    id: 'Dashboard_KhoTP_POLine_D',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
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
    features: [{
        ftype: 'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind: {
        store: '{PContractSKUStore}'
    },
    columns: [
    {
        text: 'SKU',
        dataIndex: 'skuCode',
        flex: 1,
        // width: 150,
        summaryType: 'count',
        summaryRenderer: function (value, summaryData, dataIndex) {
            var viewmodel = Ext.getCmp('PContractSKUView').getController().getViewModel();
            var ProductSKUSummaryCssStyle = viewmodel.get('ProductSKUSummaryCssStyle');
            return ProductSKUSummaryCssStyle + 'Tổng' + '</div>';
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    // {
    //     text:'Mã vạch',
    //     dataIndex:'skuBarCode',
    //     flex: 1
    // },
    {
        text: 'Màu',
        // flex: 1,
        width: 150,
        dataIndex: 'mauSanPham',
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, 
    {
        text: 'Cỡ',
        dataIndex: 'coSanPham',
        width: 65
    }, 
    {
        text: 'SL đơn',
        dataIndex: 'pquantity_porder',
        width: 65,
        align: 'right',
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        },
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true,
            listeners: {
                specialkey: 'onSpecialkey'
            }
        },
        summaryType: 'sum',
        // summaryRenderer: function(value, summaryData, dataIndex) {
        //     return '<div style="color:red; font-weight: bold; align: right">'+ Ext.util.Format.number(value, '0,000') ;
        // },
        summaryRenderer: 'renderSum'
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth: 0,
            bind: {
                value: 'Chi tiết màu, cỡ'
            }
        },
        ]
    }]
});

