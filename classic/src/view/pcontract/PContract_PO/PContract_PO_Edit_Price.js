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
            clicksToEdit: 1 
        }
    },
    bind: '{PContract_PO_Edit_Sizeset.selection.pcontract_price_d}',
    columns: [{
        text: 'Tên giá',
        dataIndex: 'fobprice_name',
        flex:1
    },{
        text: 'Giá chào',
        dataIndex: 'price',
        width: 80,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: 'Không được để trống'
            }
        }
    },
    // {
    //     text: 'Giá vốn',
    //     dataIndex: 'cost',
    //     width: 70,
    //     editor: {
    //         completeOnEnter: true,
    //         field: {
    //             xtype: 'textfield',
    //             allowBlank: false,
    //             blankText: 'Không được để trống'
    //         }
    //     }
    // },
    {
        text: 'FOB',
        xtype: 'checkcolumn',
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
            width: 150,
            cls: 'inputBoxNarror',
            editable: false,
            fieldLabel: 'Loại tiền:',
            labelWidth : 60,
            bind:{
                store:'{CurrencyStore}',
                value: '{po.currencyid_link}'
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
            fieldLabel: 'Tỷ giá:',
            labelWidth : 50,
            bind: {
                value: '{po.exchangerate}'
            }
        },             
		{
            xtype:'button',
            itemId:'btnThemMoiGia',
            ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm chi tiết giá',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

