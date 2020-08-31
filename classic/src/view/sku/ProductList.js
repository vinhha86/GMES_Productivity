Ext.define('GSmartApp.view.sku.ProductList', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductList',
    id: 'ProductList',
    // controller: 'ProductList_Controller',
    requires: [
        'Ext.grid.Panel',
        'GSmartApp.store.Sku'
    ],
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    },
    layout: 'fit',
    border: true,
    scrollable: true,
    bind: {
        store: '{ProductStore}'
    },
    flex: 1,
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],  
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
    },                  
    columns: [
        { header: 'Mã Buyer', dataIndex: 'buyercode', width: 100,
            summaryType: 'count',
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        { header: 'Mã NCC', dataIndex: 'partnercode', width: 100,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        { header: 'Tên', dataIndex: 'name', flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
    ],
    fbar: [{
        minWidth: 80,
        text: 'Chọn',
        iconCls: 'x-fa fa-check',
        handler: 'onSelectButton',
        itemId: 'btnChonSanPham',
        bind: {
            hidden: '{!isVisible_btnChonSP}'
        }
    },{
        minWidth: 80,
        itemID: 'btnAddProduct_ProductList',
        text: 'Tạo mới',
        iconCls: 'x-fa fa-magic',
        handler: 'onCreateProduct'
    }],    
    listeners: {
        itemclick: 'onProductItemSelected'
    }           
});
