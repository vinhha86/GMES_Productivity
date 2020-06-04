Ext.define('GSmartApp.view.sku.SkuSearchSelectAttributeValue', {
    extend: 'Ext.grid.Panel',
    xtype: 'SkuSearchSelectAttributeValue',
    id: 'SkuSearchSelectAttributeValue',
    controller: 'SkuSearchSelectAttributeValueCotroller',
    viewModel: 'SkuSearchSelectAttributeValueModel',
    IdAttribute: 0,
    IdProduct : 0,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        scrollable: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{SkuAtributeValueStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Giá trị',
        dataIndex: 'value',
        flex: 1
    }],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            border: false,
            flex : 1
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

