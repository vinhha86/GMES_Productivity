Ext.define('GSmartApp.view.pcontract.PContractPairProductView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractPairProductView',
    id:'PContractPairProductView',
    controller: 'PContractPairProductViewCotroller',
    IdPcontract: 0,
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
                edit: 'onUpdate'
            } 
        }
    },
    bind:{
        store:'{PContractProductPairStore}'
    },
    columns:[{
        text:'Mã SP (Buyer)',
        dataIndex:'productpairCode',
        flex: 1,
        editor:{
            xtype:'textfield',
            selectOnFocus: true
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Mã SP (Vendor)',
        dataIndex:'productpairVendorCode',
        flex: 1,
        editor:{
            xtype:'textfield',
            selectOnFocus: true
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        xtype: 'actioncolumn',
        width: 60,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-info-circle',
            getTip : function(value, metaData, record){
                return record.data.productpairName;
            },
        },{
            iconCls: 'x-fa fas fa-edit',
            tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
            handler: 'onEdit'
        },{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            value: 'Ghép bộ sản phẩm'
        },
		'->'
		,
		{
            xtype:'button',
            itemId:'btnPair_PContractPairProductView',
			ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm bộ sản phẩm',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

