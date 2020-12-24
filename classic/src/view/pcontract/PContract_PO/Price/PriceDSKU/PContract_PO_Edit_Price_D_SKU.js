Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.PriceDSKU.PContract_PO_Edit_Price_D_SKU', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Price_D_SKU',
    id: 'PContract_PO_Edit_Price_D_SKU',
    controller: 'PContract_PO_Edit_Price_D_SKUController',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onPriceDSKUItemEdit',
                beforeedit: 'onPriceDSKUItemBeforeEdit'
            }             
        }
    },
    bind:{
        store:'{Price_D_SKUStore}'
    },
    columns:[{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        bind:{
            hidden: '{ishiddenActionColumn}'
        },
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu_PriceDSKUList'
            },            
        ]
    },{
        text:'Mã NPL',
        dataIndex:'materialCode',
        // width: 100,
        flex: 1
    },{
        text:'Màu',
        dataIndex:'color_name',
        // width: 100,
        flex: 1
    },{
        text:'Size',
        dataIndex:'size_name',
        // width: 100,
        flex: 1
    },{
        text:'SL',
        align: 'end',
        dataIndex:'amount',
        width: 80,
        editor:{
            xtype:'textfield',
            maskRe: /[0-9]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },{
        text:'Đơn giá',
        align: 'end',
        dataIndex:'unitprice',
        width: 80,
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
        }
    },{
        text:'Thành tiền',
        align: 'end',
        dataIndex:'totalprice',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000.00');
        }
    }]
});

