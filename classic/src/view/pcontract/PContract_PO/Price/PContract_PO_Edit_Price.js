Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Price', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Edit_Price',
    id: 'PContract_PO_Edit_Price',
    controller: 'PContract_PO_Edit_PriceController',
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
                edit: 'onPriceDItemEdit'
            }             
        }
    },

    // bind: '{PContract_PO_Edit_Sizeset.selection.pcontract_price_d}',
    bind:{
        store:'{Price_DStore}'
    },
    columns: [{
        text: 'Tên giá',
        dataIndex: 'fobprice_name',
        flex:1
    },
    {
        text: 'ĐM',
        dataIndex: 'quota',
        align: 'end',
        width: 60,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'numberfield',
                hideTrigger:true,
                allowBlank: false,
            }
        }
    },   
    {
        text: 'ĐVT',
        dataIndex: 'unitid_link',
        width: 65,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'combo',
                typeAhead: true,
                triggerAction: 'all',
                selectOnFocus: false,
                bind: {
                    store: '{UnitStore}',
                    // value: '{unitid_link}'
                },
                displayField: 'code',
                valueField: 'id',
                queryMode : 'local'                
            }
        },
        renderer: 'renderUnit'
    },    
    {
        text: 'Đơn giá',
        dataIndex: 'unitprice',
        align: 'end',
        width: 70,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'numberfield',
                hideTrigger:true,
                allowBlank: false,
            }
        }
    },        
    {
        text: 'Giá chào',
        align: 'end',
        dataIndex: 'price',
        width: 80,
        editor: {
            completeOnEnter: true,
            field: {
                xtype: 'numberfield',
                hideTrigger:true,
                allowBlank: false,
            }
        }
    },
    {
        text: 'FOB',
        xtype: 'checkcolumn',
        dataIndex: 'isfob',
        width: 45
    },{
        xtype: 'actioncolumn',
        width: 45,
        menuDisabled: true,
        sortable: false,
        bind:{
            hidden: '{ishiddenActionColumn}'
        },
        items: [
            {
                iconCls: 'x-fa fas fa-trash',
                tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
                handler: 'onPriceD_Delete'
            },
            {
                iconCls: 'x-fa fas fa-dollar',
                tooltip: 'Gợi ý giá',
                handler: 'onPriceGuide'
            }
        ]
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
            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
            fieldStyle: 'font-size:11px;text-align:right',
            width: 160,
            cls: 'inputBoxNarror',
            editable: false,
            fieldLabel: 'Loại tiền:',
            labelWidth : 50,
            bind:{
                store:'{CurrencyStore}',
                value: '{po.currencyid_link}'
            },
            displayField: 'name',
            valueField: 'id',
            reference:'currencycombo',
            listeners: {
                select: 'onCurrencyItemSelected'
            }
        },       
        {
            xtype: 'numberfield',
            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
            fieldStyle: 'font-size:11px;text-align:right',
            hideTrigger:true,
            width: 120,
            cls: 'inputBoxNarror',
            fieldLabel: 'Tỷ giá:',
            labelWidth : 50,
            bind: {
                value: '{po.exchangerate}'
            },
            listeners: {
                focusleave: 'onExchangeRateChange'
            }            
        },             
		{
            xtype:'button',
            width: 20,
            itemId:'btnThemMoiGia',
            ui: 'header',
            margin: '5 5 0 0',
			tooltip: 'Thêm chi tiết giá',
            iconCls: 'x-fa fa-plus'
        },
		{
            xtype:'button',
            width: 20,
            itemId:'btnPriceCopy',
            ui: 'header',
            margin: '1 5 0 0',
			tooltip: 'Copy',
            iconCls: 'x-fa fa-copy'
        },
		{
            xtype:'button',
            width: 20,
            itemId:'btnPricePaste',
            ui: 'header',
            margin: '1 5 0 0',
			tooltip: 'Dán',
            iconCls: 'x-fa fa-paste'
        }                   
        ]
    }]
});

