Ext.define('GSmartApp.view.pcontract.PContractProductMaterialView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractProductMaterialView',
    id: 'PContractProductMaterialView',
    controller: 'PContractProductMaterialViewController',
    viewModel: {
        type: 'PContractViewModel'
    },
    productid_link: 0,
    pcontractid_link: 0,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        checkOnly: true
    },
    bind: {
        store: '{productStore}',
        title: '{title}'
    },
    columns: [{
        text: "Ảnh",
        dataIndex: 'urlimage',
        width: 50,
        textAlign: 'center',
        renderer: function (value, meta, record) {
            return '<img style="width:25px; height:25px" src="data:image/gif;base64,' + value + '">';
        }
    }, {
        text: 'Tên NPL',
        dataIndex: 'name',
        width: 150
    }, {
        text: 'IDCode',
        dataIndex: 'code',
        width: 70
    }, {
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        width: 100
    }, {
        text: 'Cỡ khổ',
        dataIndex: 'coKho',
        width: 100
    }],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'combo',
            bind: {
                store: '{ProductTypeStore}'
            },
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            margin: 1,
            emptyText: 'Nguyên phụ liệu',
            editable: false,
            value: 0,
            itemId: 'product_type',
            width: 135
        }, {
            xtype: 'textfield',
            emptyText: 'Tên NPL',
            itemId: 'name',
            margin: 1
        }, {
            xtype: 'textfield',
            emptyText: 'IDCode',
            itemId: 'code',
            margin: 1
        }, {
            xtype: 'textfield',
            emptyText: 'Màu NPL',
            itemId: 'tenmaunpl',
            margin: 1
        }, {
            xtype: 'button',
            margin: 1,
            text: 'Tìm kiếm',
            iconCls: 'x-fa fa-filter',
            itemId: 'btnTimKiem'
        }]
    },{
        layout:'hbox',
        dock: 'bottom',
        border: false,
        items:[{
            xtype:'button',
            text: 'Chọn',
            margin: 3,
            itemId:'btnChon',
            iconCls: 'x-fa fa-check'
        },{
            flex: 1
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-backward'
        }]
    }]
});

