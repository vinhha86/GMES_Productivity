Ext.define('GSmartApp.view.pcontracttype.PContractTypeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractTypeView',
    id: 'PContractTypeView',
    viewModel: {
        type: 'PContractTypeViewModel'
    },
    controller: 'PContractTypeViewController',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 2
        }
    },
    reference: 'PContractTypeView',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{ContractTypeStore}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Tên loại hình đơn hàng',
        dataIndex:'name',
        flex: 1,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText:'Không được để trống tên loại hình đơn hàng',
                itemId:'txtName',
                listeners:{
                    change:'onChange',
                    focusleave:'onFocusLeave'
                }
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
            handler: 'onXoa',
            isDisabled: 'isButtonDisabled'
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
            blankText: 'Nhập tên loại hình đơn hàng để thêm mới'
        }]
    }],
    listeners:{
        rowclick: 'onRowClick',
        dblclick: 'onRowClick'
    }
});

