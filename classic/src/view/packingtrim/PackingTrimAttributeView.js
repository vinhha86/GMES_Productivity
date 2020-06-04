Ext.define('GSmartApp.view.packingtrim.PackingTrimAttributeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PackingTrimAttributeView',
    id:'PackingTrimAttributeView',
    controller: 'PackingTrimAttributeViewController',
    IdProduct: 0,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        mode: 'SINGLE'
    },
    bind:{
        store:'{ProductAttributeValueStore}'
    },
    columns:[{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên thuộc tính',
        dataIndex:'attributeName',
        width: 150
    },{
        text:'Giá trị',
        dataIndex:'attributeValueName',
        flex: 1
    },{
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-plus',
            tooltip: 'Thêm giá trị',
            handler: 'onAddValue'
        },{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
		//bodypadding: 5,
        border: true,
        height: 45,
        style:"background-color : white",
        items:[{
            xtype:'displayfield',
			flex: 1,
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            value: 'Thuộc tính phụ liệu hoàn thiện'
        },
		'->',
		{
            xtype:'button',
            itemId:'btnThemMoi',
			ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm thuộc tính',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

