Ext.define('GSmartApp.view.fobprice.FOBPriceView', {
    extend: 'Ext.grid.Panel',
    xtype: 'FOBPriceView',
    id: 'FOBPriceView',
    viewModel: {
        type: 'FOBPriceViewViewModel'
    },
    controller: 'FOBPriceViewController',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 2
        }
    },
    reference: 'FOBPriceView',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{PriceStore}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên giá',
        dataIndex:'name',
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên giá',
                itemId:'txtName'
            }
        }
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
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
            xtype:'textfield',
            itemId:'txtThemMoi',
            margin: 5,
            flex: 1,
            allowBlank: false,
            blankText: 'Nhập tên giá để thêm mới'
        }]
    }]
});
