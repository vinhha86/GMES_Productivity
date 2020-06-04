Ext.define('GSmartApp.view.product.ProductAddAttributeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductAddAttributeView',
    id: 'ProductAddAttributeView',
    controller: 'ProductAddAttributeViewCotroller',
    IdProduct : 0,
    viewModel: {
        type : 'ProductDetailViewModel'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{AttributeStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Thuộc tính',
        dataIndex: 'name',
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

