Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Price', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Price',
    id: 'PContract_PO_Edit_Price',
    // controller: 'PContractProductBomViewController',
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
                edit: 'onEdit'
            } 
        }
    },
    bind: {
        store: '{PContractProductBomStore}',
        title: '{title}'
    },
    columns: [{
        text: 'Công đoạn',
        dataIndex: 'Name',
        flex:1
    },{
        text: 'Giá chào',
        dataIndex: 'price',
        width: 70
    },{
        text: 'Giá vốn',
        dataIndex: 'cost',
        width: 70
    },{
        text: 'FOB',
        dataIndex: 'isfob',
        width: 45
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        bind:{
            hidden: '{ishiddenActionColumn}'
        },
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth : 0,
            value: 'Chi tiết giá'
        },
		'->'
        ,
        {
            xtype: 'combobox',
            width: 120,
            cls: 'inputBoxNarror',
            editable: false,
            fieldLabel: 'Loại tiền:',
            labelWidth : 60,
            bind:{
                store:'{CurrencyStore}'
            },
            displayField: 'name',
            valueField: 'id',
            reference:'currencycombo',
            // listeners: {
            //     select: 'onOrgItemSelected'
            // }
        },       
        {
            xtype: 'textfield',
            width: 120,
            cls: 'inputBoxNarror',
            editable: false,
            fieldLabel: 'Tỷ giá:',
            labelWidth : 50,
        },             
		{
            xtype:'button',
            itemId:'btnThemMoi',
            ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm chi tiết giá',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

