Ext.define('GSmartApp.view.pcontract.PContract_POList', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POList',
    itemId:'PContract_POList',
    controller: 'PContract_POListController',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store:'{PContractPOList}'
    },
    columns:[{
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu_PO_Parent'
            }
        ]
    },{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text:'PO Buyer',
        dataIndex:'po_buyer',
        flex: 1,
        editor: {
            allowBlank: false,
            selectOnFocus: false
        }
    },    
    {
        text:'Mã SP (Buyer)',
        dataIndex:'productbuyercode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },
    {
        text:'Ngày GH',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 75
    },
    {
        text:'SL',
        align: 'end',
        dataIndex:'po_quantity',
        width: 70,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    }],    
    plugins: {
        cellediting: {
            clicksToEdit: 2,
            listeners: {
                validateedit: 'onPOListEdit'
            } 
        },        
        rowwidget: {
            widget: 
            {
                xtype: 'grid',
                itemId: 'PO_ChildList',
                plugins: {
                    cellediting: {
                        clicksToEdit: 2,
                        listeners: {
                            validateedit: 'onPOListEdit'
                        } 
                    }
                },
                features: [{
                    ftype: 'summary',
                    dock: 'bottom'
                }],                 
                viewConfig: {
                    stripeRows: false
                },                
                bind: {
                    store: '{record.sub_po}'
                },
                columns:[{
                    xtype: 'actioncolumn',
                    width: 28,
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'x-fa fas fa-bars violetIcon',
                            handler: 'onMenu_PO'
                        }
                    ]
                },{
                    text: 'STT',
                    width: 40,
                    xtype: 'rownumberer',
                    align: 'center'
                },{
                    text:'PO Buyer',
                    dataIndex:'po_buyer',
                    flex: 1,
                    // renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    //     metaData.tdAttr = 'data-qtip="' + value + '"';
            
                    //     if (record.data.status == 0) {
                    //         metaData.tdCls =  "po_free";
                    //     }
                    //     else {
                    //         metaData.tdCls =  "po_accept";
                    //     }    
                        
                    //     return value;
                    // },
                    editor: {
                        allowBlank: false,
                        selectOnFocus: false
                    }
                },{
                    text:'Ship Mode',
                    dataIndex:'shipmodeid_link',
                    width: 75,
                    editor: {
                        completeOnEnter: true,
                        field: {
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            selectOnFocus: false,
                            bind: {
                                store: '{ShipModeStore}',
                                value: '{shipmodeid_link}'
                            },
                            displayField: 'name',
                            valueField: 'id',
                            queryMode : 'local'                
                        }
                    },
                    renderer: 'renderShipping'
                },
                {
                    text:'Ngày VC',
                    xtype: 'datecolumn',
                    dataIndex:'productiondate',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    width: 75,
                    editor: {
                        xtype: 'datefield',
                        fieldStyle: 'font-size:11px;',
                        format: 'd/m/y',
                        altFormats: "Y-m-d\\TH:i:s.uO",
                    },
                },
                {
                    text:'Ngày GH',
                    xtype: 'datecolumn',
                    dataIndex:'shipdate',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    width: 75,
                    editor: {
                        xtype: 'datefield',
                        fieldStyle: 'font-size:11px;',
                        format: 'd/m/y',
                        altFormats: "Y-m-d\\TH:i:s.uO",
                    },
                },
                {
                    text:'SL',
                    align: 'end',
                    dataIndex:'po_quantity',
                    width: 70,
                    renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                        return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                    },
                    editor: {
                        xtype: 'numberfield', 
                        fieldStyle: 'font-size:11px;',
                        hideTrigger:true, 
                        allowBlank: false, 
                        minValue: 0, 
                        maxValue: 1000000, 
                        selectOnFocus: false, 
                        decimalPrecision: 0
                    },
                    summaryType: 'sum', summaryRenderer: 'renderSum',
                    align: 'end', 
                }],
                // listeners: {
                //     itemclick: 'onSelectPO'
                // }				
			}
		}
	}, 
    dockedItems:[{
        dock:'top',
        border: 'hbox',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            bind:{
                value: 'Danh sách PO'
            }
        },{
            xtype:'combo',
            editable: true,
            width: 260,
            margin: '0 0 0 20',
            fieldLabel: 'Sản phẩm',
            labelWidth: 70,
            itemId: 'productFilter',
            bind: {
                store: '{ProductFilterStore}',
                value: '{IdProduct_filterPO}',
                // readOnly: '{ishidden_addproduct}'
            },
            valueField: 'productid_link',
            displayField: 'productBuyerCode',
            queryMode: 'local'
        },{
            xtype: 'filefield',
            buttonText: 'Tải báo giá',
            buttonOnly: true,
            hidden: true,
            itemId: 'fileUploadPO',
            width: 35,
            height: 32,
            margin: 3
        },
        '->',
        {
            xtype: 'button',
            margin: 3,
            text: 'Mẫu file Upload',
            iconCls: 'x-fa fa-download',
            itemId: 'btnUploadTemplate'
        }
        // ,
	    // {
        //     xtype:'button',
        //     itemId: 'btnThemPO',
        //     ui: 'header',
		// 	tooltip: 'Thêm PO',
        //     iconCls: 'x-fa fa-plus',
        //     handler: 'onThemPO'
        // }
    ]
    }],
    // listeners: {
    //     itemclick: 'onSelectParentPO'
    // }				
});

