Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.Provider.PContract_PO_Edit_Price_Provider', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Price_Provider',
    id: 'PContract_PO_Edit_Price_Provider',
    // viewModel: {
    //     type: 'ContractBuyerDetail_BuyerListViewModel'
    // },
    controller: 'PContract_PO_Edit_Price_ProviderController',
    reference: 'PContract_PO_Edit_Price_Provider',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{ListProviderStore}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    columns: [
    {
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, 
    {
        text: 'Nhà cung cấp',
        dataIndex: 'code',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Thêm nhà cung cấp',
            margin: 3,
            itemId:'btnAdd',
            iconCls: 'x-fa fa-plus',
            formBind: false
        },{
            flex:1,
            border: false
        }]
    }]
});

