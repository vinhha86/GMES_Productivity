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
                                },{
                                    xtype: 'textfield',
                                    label: 'Đ/vị tính:',
                                    labelWidth: 85,
                                    flex: 1,
                                    textAlign: 'left',
                                    editable: false,
                                    readOnly: true,
                                    clearable: false,
                                    cls: 'notEditable',
                                    bind: {
                                        value: '{stockin.unitName}'
                                    }
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
                // {
                //     title: 'Danh sách SP',
                //     layout: 'hbox',
                //     flex: 1,
                //     items:[
                //         {
                //             layout: 'vbox',
                //             flex: 1,
                //             items:[
                //                 {
                //                     margin: 1,
                //                     flex: 1,
                //                     xtype: 'Stockin_M_Edit_Product',
                //                     // id: 'handover_cut_toline_detail',
                //                 },
                //             ]
                //         },
                //     ]
                // },
                {
                    title: 'DS vải',
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
                                    // label: 'Mã hàng:',
                                    // labelWidth: 85,
                                    margin: '5 5 1 5',
                                    // padding: 6,
                                    // flex: 1,
                                    // width: '100%',
                                    // minWidth: 80,
                                    // maxWidth: 200,
                                    textAlign: 'left',
                                    placeholder: 'Tìm kiếm nhanh ... (theo mã)',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    cls: 'searchField',
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
                                            placeholder: 'Tổng độ dài',
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
                                            iconCls: 'x-fa fa-plus',
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
                {
                    title: 'Kiểm lot',
                    layout: 'hbox',
                    flex: 1,
                    items:[
                        {
                            layout: 'vbox',
                            flex: 1,
                            items:[
                                {
                                    xtype: 'textfield',
                                    itemId: 'maLotFilter',
                                    // label: 'Mã hàng:',
                                    // labelWidth: 85,
                                    margin: '5 5 1 5',
                                    // padding: 6,
                                    // flex: 1,
                                    // width: '100%',
                                    // minWidth: 80,
                                    // maxWidth: 200,
                                    textAlign: 'left',
                                    placeholder: 'Tìm kiếm nhanh ... (theo số lot)',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    cls: 'searchField',
                                    // bind: {
                                    //     value: '{maNPLFilter}'
                                    // },
                                    listeners: {
                                        keyup: 'onmaLotFilterKeyup',
                                        buffer: 500
                                    }
                                },
                                {
                                    margin: 1,
                                    flex: 2,
                                    xtype: 'Stockin_M_Edit_Lot',
                                },
                                {
                                    margin: 1,
                                    flex: 1,
                                    xtype: 'Stockin_M_Edit_Space',
                                },
                                {
                                    layout: 'hbox',
                                    // flex: 1,
                                    items:[
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
                                            placeholder: 'Dãy',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value:'{row}'
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
                                            placeholder: 'Hàng',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value:'{space}'
                                            },
                                            // stepValue: 0.1,
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
                                            placeholder: 'Tầng',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value:'{floor}'
                                            },
                                            // stepValue: 0.1,
                                        },
                                        {
                                            xtype:'button',
                                            iconCls: 'x-fa fa-plus',
                                            itemId:'btnLotAddSpace',
                                            ui: 'action',
                                            margin: 1,
                                        },    
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'Kiểm cây',
                    layout: 'hbox',
                    flex: 1,
                    items:[
                        {
                            layout: 'vbox',
                            flex: 1,
                            items:[
                                {
                                    xtype: 'textfield',
                                    itemId: 'maPklFilter',
                                    // label: 'Mã hàng:',
                                    // labelWidth: 85,
                                    margin: '5 5 1 5',
                                    // padding: 6,
                                    // flex: 1,
                                    // width: '100%',
                                    // minWidth: 80,
                                    // maxWidth: 200,
                                    textAlign: 'left',
                                    placeholder: 'Tìm kiếm nhanh ... (theo số lot)',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    cls: 'searchField',
                                    // bind: {
                                    //     value: '{maNPLFilter}'
                                    // },
                                    listeners: {
                                        keyup: 'onmaPklFilterKeyup',
                                        buffer: 500
                                    }
                                },
                                {
                                    margin: 1,
                                    flex: 1,
                                    xtype: 'Stockin_M_Edit_Pkl',
                                },
                                {
                                    xtype: 'container',
                                    // flex:1,
                                    // height: 100,
                                    // docked: 'bottom',
                                    layout: 'vbox',
                                    items:[
                                        {
                                            layout: 'hbox',
                                            border: false,
                                            width: '100%',
                                            items:[
                                                {
                                                    xtype: 'textfield',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'lotnumberTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Số LOT',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{lotnumberTxt}'
                                                    },
                                                    // listeners: {
                                                    //     keyup: 'onlotnumberTxtKeyup',
                                                    //     buffer: 1000
                                                    // }
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'packageidTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Số cây',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{packageidTxt}'
                                                    },
                                                    // listeners: {
                                                    //     keyup: 'onpackageidTxtKeyup',
                                                    //     buffer: 1000
                                                    // },
                                                    stepValue: 0.1,
                                                },
                                
                                                {
                                                    xtype: 'combobox',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'colorTxt',
                                                    flex: 1,
                                                    minWidth: 80,
                                                    maxWidth: 130,
                                                    editable: false,
                                                    readOnly: true,
                                                    displayField: 'value',
                                                    valueField: 'id',
                                                    bind:{
                                                        store:'{attributeValueStore}',
                                                        value: '{colorTxt}'
                                                    },
                                                },
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            border: false,
                                            width: '100%',
                                            items:[
                                                {
                                                    xtype: 'numberfield',
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    margin: 1,
                                                    itemId: 'widthTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Khổ',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{widthTxt}'
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'mTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Số M',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{mTxt}',
                                                        // cls: '{yTxtCls}',
                                                        hidden: '{isMetColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'yTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Số Y',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{yTxt}',
                                                        // cls: '{yTxtCls}',
                                                        hidden: '{isYdsColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                // {
                                                //     // xtype: 'numberfield',
                                                //     margin: 1,
                                                //     padding: 1,
                                                //     border: true,
                                                //     // cls: 'my-textfield',
                                                //     // itemId: 'yTxt',
                                                //     // label: 'Màu:',
                                                //     // labelWidth: 85,
                                                //     flex: 1,
                                                //     minWidth: 80,
                                                //     maxWidth: 130,
                                                //     // textAlign: 'left',
                                                //     // placeholder: 'Số Y',
                                                //     // editable: false,
                                                //     // readOnly: true,
                                                //     // clearable: false,
                                                //     // cls: 'notEditable',
                                                //     // bind: {
                                                        
                                                //     // },
                                                //     // hidden: true,
                                                // },
                                                {
                                                    xtype:'button',
                                                    text: 'Nhập lại',
                                                    flex: 1,
                                                    minWidth: 80,
                                                    maxWidth: 130,
                                                    margin: 1,
                                                    iconCls: 'x-fa fa-file',
                                                    itemId:'btnResetForm',
                                                    ui: 'action',
                                                },   
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            border: false,
                                            width: '100%',
                                            items:[
                                                {
                                                    xtype: 'numberfield',
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    margin: 1,
                                                    itemId: 'mOriginTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài phiếu (M)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{mOriginTxt}',
                                                        hidden: '{isMetColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    margin: 1,
                                                    itemId: 'yOriginTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài phiếu (Y)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{yOriginTxt}',
                                                        hidden: '{isYdsColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'sampleCheckTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Cắt mẫu',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{sampleCheckTxt}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype:'button',
                                                    text: 'Xác nhận',
                                                    flex: 1,
                                                    minWidth: 80,
                                                    maxWidth: 130,
                                                    margin: 1,
                                                    iconCls: 'x-fa fa-check',
                                                    itemId:'btnCheck',
                                                    ui: 'action',
                                                },   
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    title: 'Kiểm 10%',
                    layout: 'hbox',
                    flex: 1,
                    items:[
                        {
                            layout: 'vbox',
                            flex: 1,
                            items:[
                                {
                                    xtype: 'textfield',
                                    // itemId: 'maNPLFilter',
                                    // label: 'Mã hàng:',
                                    // labelWidth: 85,
                                    margin: '5 5 1 5',
                                    // padding: 6,
                                    // flex: 1,
                                    // width: '100%',
                                    // minWidth: 80,
                                    // maxWidth: 200,
                                    textAlign: 'left',
                                    placeholder: 'Tìm kiếm nhanh ... (chưa có)',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    cls: 'searchField',
                                    // bind: {
                                    //     value: '{maNPLFilter}'
                                    // },
                                    listeners: {
                                        // keyup: 'onmaNPLFilterKeyup',
                                        // buffer: 500
                                    }
                                },
                                {
                                    margin: 1,
                                    flex: 1,
                                    // xtype: 'Stockin_M_Edit_Product',
                                },
                            ]
                        },
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