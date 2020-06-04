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
        { header: 'Mã nội bộ', dataIndex: 'code', width: 90,
            summaryType: 'count'                  
        },
        { header: 'Mã NCC', dataIndex: 'partnercode', width: 90},
        { header: 'Tên', dataIndex: 'name', flex: 1},
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
        text: 'Tạo mới',
        iconCls: 'x-fa fa-magic',
        handler: 'onCreateSKU'
    }],    
    listeners: {
        itemclick: 'onProductItemSelected'
    }           
});
