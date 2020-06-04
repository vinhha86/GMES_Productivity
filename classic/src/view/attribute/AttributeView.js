Ext.define('GSmartApp.view.attribute.AttributeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'AttributeView',
    id:'AttributeView',
    controller: 'attributeController',
	viewModel: {
        type: 'attributeViewModel'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 2
        }
    },
    reference: 'AttributeView',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{AttributeStore}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên thuộc tính',
        dataIndex:'name',
        width: 150,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên thuộc tính',
                itemId:'txtName'
            }
        }
    },{
        xtype: 'checkcolumn',
        text:'S.phẩm',
        headerWrap: true,
        flex: 1,
        dataIndex: 'isproduct',
        itemId: 'checkSP'
    },{
        xtype: 'checkcolumn',
        text:'Ng.liệu',
        flex: 1,
        headerWrap: true,
        dataIndex: 'ismaterial',
        itemId :'checkNL'
    },{
        xtype: 'checkcolumn',
        text:'PL May',
        headerWrap: true,
        flex: 1,
        dataIndex: 'issewingtrims',
        itemId: 'checkPLMay'
    },{
        xtype: 'checkcolumn',
        text:'PLHT',
        headerWrap: true,
        flex: 1,
        dataIndex: 'ispackingtrims',
        itemId:'checkPLHT'
    }],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 90,
            itemId: 'btnThemMoi'
        },{
            xtype: 'button',
            margin: 5,
            text: 'Xóa',
            width: 50,
            itemId: 'btnXoa'
        },{
            xtype:'textfield',
            itemId:'txtThemMoi',
            margin: 5,
            flex: 1,
            allowBlank: false,
            blankText: 'Nhập tên thuộc tính để thêm mới'
        }]
    }]
});

