Ext.define('GSmartApp.view.stockin.Stockin_M_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit',
    id: 'Stockin_M_Edit',
    reference: 'Stockin_M_Edit',
    viewModel: {
        type: 'Stockin_M_ViewModel'
    },
    controller: 'Stockin_M_Edit_Controller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive'
    ],

    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                    {
                        layout: 'vbox',
                        flex: 1,
                        items: [
                            {
                                layout: 'hbox',
                                flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'combobox',
                                    // reference: 'cboorgto',
                                    editable: false,
                                    readOnly: true,
                                    cls: 'notEditable',
                                    bind:{
                                        store:'{OrgFromStore}',
                                        value:'{stockin.orgid_from_link}'
                                    },
                                    displayField: 'name',
                                    valueField: 'id',
                                    label: 'Nơi giao:',
                                    // disabled: true,
                                    labelWidth: 85,
                                    flex: 1,
                                }]
                            },
                            {
                                layout: 'hbox',
                                flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'textfield',
                                    label: 'Invoice:',
                                    labelWidth: 85,
                                    flex: 1,
                                    textAlign: 'left',
                                    editable: false,
                                    readOnly: true,
                                    clearable: false,
                                    cls: 'notEditable',
                                    bind: {
                                        value: '{stockin.invoice_number}'
                                    }
                                // },{
                                //     xtype:'button',
                                //     // text: 'Xác nhận xuất',
                                //     margin: 2,
                                //     itemId:'btnInvoice_Search',
                                //     ui: 'action',
                                //     iconCls: 'x-fa fa-search',
                                }]
                            },
                    ]
                }
            ]
        },
        // {
        //     margin: 1,
        //     flex: 1,
        //     xtype: 'Stockin_M_Edit_D',
        //     // id: 'handover_cut_toline_detail',
        // },
        {
            xtype: 'tabpanel',
            // height: '100%',
            // width: '100%',
            flex: 1,
            items: 
            [
                {
                    title: 'Danh sách SP',
                    layout: 'hbox',
                    flex: 1,
                    items:[
                        {
                            layout: 'vbox',
                            flex: 1,
                            items:[
                                {
                                    margin: 1,
                                    flex: 1,
                                    xtype: 'Stockin_M_Edit_Product',
                                    // id: 'handover_cut_toline_detail',
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'Danh sách vải',
                    layout: 'hbox',
                    flex: 1,
                    items:[
                        {
                            layout: 'vbox',
                            flex: 1,
                            items:[
                                {
                                    xtype: 'textfield',
                                    itemId: 'maNPLFilter',
                                    label: 'Mã hàng:',
                                    labelWidth: 85,
                                    margin: 1,
                                    // padding: 6,
                                    // flex: 1,
                                    // width: '100%',
                                    // minWidth: 80,
                                    // maxWidth: 200,
                                    textAlign: 'left',
                                    // placeholder: 'Số cây',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    // bind: {
                                    //     value: '{maNPLFilter}'
                                    // },
                                    listeners: {
                                        keyup: 'onmaNPLFilterKeyup',
                                        buffer: 500
                                    }
                                },
                                {
                                    margin: 1,
                                    flex: 1,
                                    xtype: 'Stockin_M_Edit_D',
                                    // id: 'handover_cut_toline_detail',
                                },
                                {
                                    layout: 'hbox',
                                    // flex: 1,
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            // itemId: 'maNPLFilter',
                                            // label: 'Mã hàng:',
                                            // labelWidth: 85,
                                            margin: 1,
                                            // padding: 6,
                                            flex: 1,
                                            // width: '100%',
                                            // minWidth: 80,
                                            // maxWidth: 200,
                                            textAlign: 'left',
                                            placeholder: 'Số lot',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{lotNumberTxt}'
                                            },
                                        },
                                        {
                                            xtype: 'numberfield',
                                            // itemId: 'maNPLFilter',
                                            // label: 'Mã hàng:',
                                            // labelWidth: 85,
                                            margin: 1,
                                            // padding: 6,
                                            flex: 1,
                                            // width: '100%',
                                            // minWidth: 80,
                                            // maxWidth: 200,
                                            textAlign: 'left',
                                            placeholder: 'Số lượng cây',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{cayNumberTxt}'
                                            },
                                            stepValue: 0.1,
                                        },
                                        {
                                            xtype: 'numberfield',
                                            // itemId: 'maNPLFilter',
                                            // label: 'Mã hàng:',
                                            // labelWidth: 85,
                                            margin: 1,
                                            // padding: 6,
                                            flex: 1,
                                            // width: '100%',
                                            // minWidth: 80,
                                            // maxWidth: 200,
                                            textAlign: 'left',
                                            placeholder: 'Tổng số Y',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{yNumberTxt}'
                                            },
                                            stepValue: 0.1,
                                        },
                                        {
                                            xtype:'button',
                                            iconCls: 'x-fa fa-check',
                                            itemId:'btnAddLot',
                                            ui: 'action',
                                            margin: 1,
                                        },    
                                    ]
                                },
                            ]
                        },
                        // {
                        //     responsiveConfig: {
                        //         'width <= 768': {
                        //             flex: 0
                        //         },
                        //         'width > 768': {
                        //             flex: 1,
                        //             items: [
                        //                 {
                        //                     // itemId: 'testHtml',
                        //                     // html: 'More than 768',
                        //                     margin: 1,
                        //                     flex: 1,
                        //                     xtype: 'Stockin_M_Edit_P',
                        //                     bind: {
                        //                         hidden: '{isStockin_M_Edit_PHidden}'
                        //                     }
                        //                 }
                        //             ]
                        //         }
                        //     },
                        // },
                    ]
                },
            ]
        }
    ],
    tbar: [{
        xtype:'button',
        iconCls: 'x-fa fa-arrow-left',
        itemId:'btnBack',
        ui: 'action',
    },
    {
        xtype:'button',
        iconCls: 'x-fa fa-home',
        itemId:'btnHome',
        ui: 'action',
    },    
    '->',
    // {
    //     xtype:'button',
    //     iconCls: 'x-fa fa-check',
    //     itemId:'btnHandover',
    //     ui: 'action',
    //     bind: {
    //         hidden: '{isBtnConfirmHidden}'
    //     }
    // },
    // {
    //     xtype:'button',
    //     iconCls: 'x-fa fa-trash',
    //     itemId:'btnDelete',
    //     ui: 'action',
    //     bind: {
    //         hidden: '{isBtnDeleteHidden}'
    //     }
    // },
    {
        xtype:'button',
        iconCls: 'x-fa fa-print',
        itemId:'btnPrint',
        ui: 'action',
    },    
    {
        xtype:'button',
        iconCls: 'x-fa fa-save',
        itemId:'btnLuu',
        ui: 'action',
    }],
    // bbar: [
    //     {
    //         xtype: 'textfield',
    //         itemId: 'maNPLFilter',
    //         label: 'Mã NPL:',
    //         labelWidth: 85,
    //         flex: 1,
    //         minWidth: 80,
    //         maxWidth: 200,
    //         textAlign: 'left',
    //         // placeholder: 'Số cây',
    //         // editable: false,
    //         // readOnly: true,
    //         clearable: false,
    //         // cls: 'notEditable',
    //         // bind: {
    //         //     value: '{maNPLFilter}'
    //         // },
    //         listeners: {
    //             keyup: 'onmaNPLFilterKeyup',
    //             buffer: 500
    //         }
    //     },
    // ]
});