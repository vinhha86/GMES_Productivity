Ext.define('GSmartApp.view.product.ProductDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'ProductDetailView',
    id:'ProductDetailView',
    controller: 'ProductDetailViewCotroller',
    viewModel:{
        type:'ProductDetailViewModel'
    },
    layout: 'border',
    height: 500,
    items: [{
        region: 'north',
        height: 180,
        xtype: 'ProductInfoView',
        border: true,
        margin: 1
    }, {
        region: 'center',
        border : true,
        xtype: 'ProductAttributeView',
        margin: 1
    }, {
        region: 'east',
        width: '50%',
        //collapsible: true,
        //title: 'Phân loại sản phẩm',
        xtype: 'ProductSKU',
        border: true,
        margin: 1
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        },{
            xtype:'button',
            text: 'Định mức NPL',
            hidden: true,
            margin: 3,
            itemId:'btnNPL',
            iconCls: 'x-fa fa-list'
        },{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
})