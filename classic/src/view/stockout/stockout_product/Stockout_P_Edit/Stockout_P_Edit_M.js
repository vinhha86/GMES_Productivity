Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Edit_M', {
    extend: 'Ext.container.Container',
    xtype: 'stockout_p_edit_m',
    itemId: 'stockout_p_edit_m',
    cls: 'Stockout_P_Edit_M',
    controller: 'Stockout_P_Edit_M_Controller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    reference: 'cbostockouttype',
                    width: 370,
                    labelWidth: 95,
                    fieldLabel: 'Loại phiếu:',
                    readOnly: true,
                    editable: false,
                    cls: 'notEditable',	
                    displayField: 'name',
                    valueField: 'id',
                    bind: {
                        store: '{StockoutTypeStore}',
                        value: '{stockout.stockouttypeid_link}'
                    }
                },
                {
                    xtype: 'textfield',
                    margin: '0 0 0 5',
                    reference: 'txtstockoutcode',
                    width: 225,
                    labelWidth: 75,
                    fieldLabel: 'Số phiếu:',
                    readOnly: true,
                    editable: false,
                    cls: 'notEditable',	
                    bind: {value:'{stockout.stockoutcode}'}
                },
                {
                    xtype: 'datefield',
                    margin: '0 0 0 5',
                    reference: 'txtstockoutdate',
                    width: 220,
                    labelWidth: 70,
                    fieldLabel: 'Ngày xuất:',
                    editable: false,
                    format:'d/m/Y',
			        altFormats: "Y-m-d\\TH:i:s.uO",
                    bind: {
                        value: '{stockout.stockoutdate}'
                    }
                },
                {
                    margin: '0 5 0 5',
                    xtype: 'textfield',
                    bind: {
                        value: '{stockout.usercreate_name}'
                    },
                    fieldLabel: 'Người xuất',
                    editable: false,
                    readOnly: true,
                    cls: 'notEditable',
                    flex: 1,
                    labelWidth: 85,
                },
                // {
                //     xtype: 'combo',
                //     margin: '0 5 0 5',
                //     reference: 'stockout_usercreateid_link',
                //     flex: 1,
                //     labelWidth: 85,
                //     valueField: 'id',
			    //     displayField: 'fullName',
                //     fieldLabel: 'Người xuất:',
                //     readOnly: true,
                //     editable: false,
                //     cls: 'notEditable',	
                //     bind: {
                //         value: '{stockout.usercreateid_link}',
                //         store: '{UserStore}'
                //     },
                // }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    reference: 'stockout_orgid_from_link',
                    width: 370,
                    labelWidth: 95,
                    fieldLabel: 'Nơi xuất:',
                    editable: false,
                    bind: {
                        store: '{OrgFromStore}',
                        value: '{stockout.orgid_from_link}'
                    },
                    displayField: 'name',
                    valueField: 'id'
                },
                {
                    xtype: 'combobox',
                    reference: 'stockout_orgid_to_link',
                    width: 450,
                    labelWidth: 75,
                    fieldLabel: 'Nơi nhập:',
                    editable: false,
                    margin: '0 0 0 5',
                    bind: {
                        store: '{OrgToStore}',
                        value: '{stockout.orgid_to_link}'
                    },
                    displayField: 'name',
                    valueField: 'id'
                },
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    // reference: '',
                    flex: 1,
                    labelWidth: 85,
                    fieldLabel: 'Người duyệt:',
                    editable: false,
                    readOnly: true,
                    cls: 'notEditable',
                    bind: {
                        value:'{stockout.userApprove_name}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    reference: 'stockout_reason',
                    width: 370,
                    labelWidth: 95,
                    fieldLabel: 'Lý do xuất:',
                    hideLabel: false,
                    bind: {value:'{stockout.reason}'}
                },
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    reference: 'stockout_extrainfo',
                    flex: 1,
                    labelWidth: 75,
                    fieldLabel: 'Kèm theo:',
                    hideLabel: false,
                    bind: {value:'{stockout.extrainfo}'}
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    margin: '0 0 0 0',
                    itemId:'linegiaohang',
                    fieldLabel: 'Line giao hàng',
                    width: 335,
                    labelWidth: 95,
                    hideLabel: false,			
                    bind:{
                        disabled: '{isEdit}',
                        value: '{stockout.contract_number}',
                        hidden: '{isPOLineHidden}'
                    },
                    enableKeyEvents : true,
                },
                {
                    xtype: 'button',
                    tooltip: 'Tìm PO Line',
                    margin: '0 0 0 2',
                    itemId: 'btnTimPOLine',
                    //text: 'Thêm thẻ vải',
                    iconCls: 'x-fa fa-search',
                    weight: 30,			
                    bind:{
                        disabled: '{isEdit}'
                    }
                    // handler: 'onSkuSearchTap'
                }                 
                // {
                //     xtype: 'textfield',
                //     reference: 'stockout_contract_number',
                //     width: 370,
                //     labelWidth: 95,
                //     fieldLabel: 'Line giao hàng:',
                //     hideLabel: false,
                //     bind: {value:'{stockout.contract_number}'}
                // },
                // {
                //     xtype: 'textfield',
                //     margin: '0 0 0 5',
                //     reference: 'stockout_invoice_number',
                //     width: 225,
                //     labelWidth: 75,
                //     fieldLabel: 'Số Invoice:',
                //     hideLabel: false,
                //     bind: {value:'{stockout.invoice_number}'}
                // },
                // {
                //     xtype: 'datefield',
                //     margin: '0 5 0 5',
                //     width: 220,
                //     labelWidth: 85,
                //     fieldLabel: 'Ngày Invoice:',
                //     format:'d/m/Y',
			    //     altFormats: "Y-m-d\\TH:i:s.uO",
                //     editable: false,
                //     bind: {
                //         value: '{stockout.invoice_date}'
                //     }
                // },
                // {
                //     xtype: 'combobox',
                //     reference: 'stockout_vat_typeid_link',
                //     margin: '0 5 0 0',
                //     flex: 1,
                //     labelWidth: 85,
                //     fieldLabel: 'Loại HĐ:',
                //     editable: false,
                //     bind:{
                //         store: '{VatTypeStore}',
                //         value: '{stockout.vat_typeid_link}'
                //     },
                //     displayField: 'name',
                //     valueField: 'id'
                // }
            ]
        },
        // {
        //     xtype: 'container',
        //     layout: 'hbox',
        //     items: [
        //         {
        //             xtype: 'textfield',
        //             reference: 'stockout_vat_sample',
        //             width: 185,
        //             labelWidth: 80,
        //             fieldLabel: 'Mẫu HĐ:',
        //             hideLabel: false,
        //             bind: {value:'{stockout.vat_sample}'}
        //         },
        //         {
        //             xtype: 'textfield',
        //             margin: '0 0 0 5',
        //             reference: 'stockout_vat_symbol',
        //             width: 180,
        //             labelWidth: 75,
        //             fieldLabel: 'Ký hiệu HĐ:',
        //             hideLabel: false,
        //             bind: {value:'{stockout.vat_symbol}'}
        //         },
        //         {
        //             xtype: 'textfield',
        //             margin: '0 0 0 5',
        //             reference: 'stockout_vat_number',
        //             width: 225,
        //             labelWidth: 75,
        //             fieldLabel: 'Số HĐ:',
        //             hideLabel: false,
        //             bind: {value:'{stockout.vat_number}'}
        //         },
        //         {
        //             xtype: 'datefield',
        //             margin: '0 0 0 5',
        //             reference: 'txtstockout_vatdate',
        //             width: 220,
        //             labelWidth: 85,
        //             fieldLabel: 'Ngày HĐ:',
        //             format: 'd/m/Y',
        //             editable: false,
        //             bind: {
        //                 value: '{stockout.vat_date}'
        //             }
        //         },
        //         {
        //             xtype: 'combobox',
        //             margin: '0 0 0 5',
        //             reference: 'stockout_vat_currencyid_link',
        //             width: 170,
        //             labelWidth: 85,
        //             fieldLabel: 'Loại tiền:',
        //             editable: false,
        //             itemId: 'loaitien',
        //             bind:{
        //                 store: '{CurrencyStore}',
        //                 value: '{stockout.vat_currencyid_link}'
        //             },
        //             displayField: 'code',
        //             valueField: 'id'
        //         },
        //         {
        //             xtype: 'textfield',
        //             margin: '0 5 0 5',
        //             reference: 'stockout_vat_exchangerate',
        //             flex: 1,
        //             labelWidth: 45,
        //             fieldLabel: 'Tỷ giá:',
        //             readOnly: true,
        //             hideLabel: false,
        //             bind: {
        //                 value:'{stockout.vat_exchangerate}'
        //             }
        //         }
        //     ]
        // }
    ]
});
