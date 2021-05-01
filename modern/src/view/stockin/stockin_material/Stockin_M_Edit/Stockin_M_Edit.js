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
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
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
            itemId: 'TabView',
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
                                            itemId: 'lotNumberTxt',
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
                                            // clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{lotNumberTxt}'
                                            },
                                            listeners: {
                                                change: 'onlotNumberTxtType'
                                            }
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
                                            // clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{cayNumberTxt}'
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
                                            placeholder: 'Tổng độ dài',
                                            // editable: false,
                                            // readOnly: true,
                                            // clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{yNumberTxt}'
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
                                            placeholder: 'Tổng cân nặng',
                                            // editable: false,
                                            // readOnly: true,
                                            // clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{canNumberTxt}'
                                            },
                                            stepValue: 0.1,
                                        },
                                        {
                                            xtype:'button',
                                            iconCls: 'x-fa fa-plus',
                                            // itemId:'',
                                            ui: 'action',
                                            margin: 1,
                                            style: 'visibility: hidden;'
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
                                    placeholder: 'Tìm kiếm nhanh ... (theo lot)',
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
                                    hidden: true
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
                                            placeholder: 'Danh sách khoang',
                                            editable: false,
                                            readOnly: true,
                                            clearable: false,
                                            cls: 'notEditable',
                                            bind: {
                                                value:'{spacesString}'
                                            },
                                        },
                                        {
                                            xtype:'button',
                                            iconCls: 'x-fa fa-edit',
                                            itemId:'btnLotEditSpace',
                                            ui: 'action',
                                            margin: 1,
                                        },    
                                    ]
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
                                            // clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value:'{lotRow}'
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
                                            // clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value:'{lotSpace}'
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
                                            // clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value:'{lotFloor}'
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
                                            placeholder: 'SL Cây',
                                            // editable: false,
                                            // readOnly: true,
                                            // clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value:'{lotAmount}'
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
                                    xtype: 'container',
                                    // flex:1,
                                    // height: 100,
                                    // docked: 'bottom',
                                    layout: 'hbox',
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            itemId: 'maPklFilterByMaVai',
                                            // label: 'Mã hàng:',
                                            // labelWidth: 85,
                                            margin: '5 5 1 5',
                                            // padding: 6,
                                            flex: 1,
                                            // width: '100%',
                                            // minWidth: 80,
                                            // maxWidth: 200,
                                            textAlign: 'left',
                                            placeholder: 'Mã vải',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            cls: 'searchField',
                                            bind: {
                                                value: '{maPklFilterByMaVai}'
                                            },
                                            listeners: {
                                                keyup: 'onmaPklFilterKeyup',
                                                buffer: 500
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'maPklFilter',
                                            // label: 'Mã hàng:',
                                            // labelWidth: 85,
                                            margin: '5 5 1 5',
                                            // padding: 6,
                                            flex: 1,
                                            // width: '100%',
                                            // minWidth: 80,
                                            // maxWidth: 200,
                                            textAlign: 'left',
                                            placeholder: 'Tìm kiếm nhanh ... (theo lot)',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            cls: 'searchField',
                                            bind: {
                                                value: '{maPklFilter}'
                                            },
                                            listeners: {
                                                keyup: 'onmaPklFilterKeyup',
                                                buffer: 500
                                            }
                                        },
                                    ]
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
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Số LOT',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{lotnumberTxt}'
                                                    },
                                                    listeners: {
                                                        change: 'onlotnumberTxtType'
                                                    }
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
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Số cây',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
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
                                                    xtype:'button',
                                                    // text: 'Xác nhận',
                                                    // flex: 1,
                                                    // minWidth: 80,
                                                    // maxWidth: 130,
                                                    // width: 45,
                                                    margin: 1,
                                                    iconCls: 'x-fa fa-check',
                                                    itemId:'btnCheck',
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
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'mTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài kiểm (M)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{mTxt}',
                                                        // cls: '{yTxtCls}',
                                                        hidden: '{isMetColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                    listeners: {
                                                        focusleave: 'onmTxtFocusleave'
                                                    }
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
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài kiểm (Y)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{yTxt}',
                                                        // cls: '{yTxtCls}',
                                                        hidden: '{isYdsColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                    listeners: {
                                                        focusleave: 'onyTxtFocusleave'
                                                    }
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    margin: 1,
                                                    itemId: 'mOriginTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài phiếu (M)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
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
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài phiếu (Y)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{yOriginTxt}',
                                                        hidden: '{isYdsColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype:'button',
                                                    iconCls: 'x-fa fa-plus',
                                                    // itemId:'',
                                                    ui: 'action',
                                                    margin: 1,
                                                    style: 'visibility: hidden;'
                                                },
                                                // {
                                                //     xtype:'button',
                                                //     text: 'Nhập lại',
                                                //     flex: 1,
                                                //     minWidth: 80,
                                                //     // maxWidth: 130,
                                                //     margin: 1,
                                                //     iconCls: 'x-fa fa-file',
                                                //     itemId:'btnResetForm',
                                                //     ui: 'action',
                                                // },   
                                                
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            border: false,
                                            width: '100%',
                                            items:[
                                                {
                                                    xtype: 'numberfield',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'canCheckTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Cân kiểm',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{grossweightCheckTxt}',
                                                    },
                                                    stepValue: 0.1,
                                                    listeners: {
                                                        focusleave: 'oncanCheckTxtFocusleave'
                                                    }
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'canTxt',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Cân phiếu',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{grossweightTxt}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype:'button',
                                                    iconCls: 'x-fa fa-plus',
                                                    // itemId:'',
                                                    ui: 'action',
                                                    margin: 1,
                                                    style: 'visibility: hidden;'
                                                },
                                            ]
                                        },
                                        // {
                                        //     layout: 'hbox',
                                        //     border: false,
                                        //     width: '100%',
                                        //     items:[
                                        //         {
                                        //             xtype: 'numberfield',
                                        //             border: true,
                                        //             cls: 'my-textfield',
                                        //             margin: 1,
                                        //             itemId: 'widthYdsCheckTxt',
                                        //             // label: 'Màu:',
                                        //             // labelWidth: 85,
                                        //             flex: 1,
                                        //             // maxWidth: 130,
                                        //             textAlign: 'left',
                                        //             placeholder: 'Khổ kiểm (Y)',
                                        //             // editable: false,
                                        //             // readOnly: true,
                                        //             // clearable: false,
                                        //             // cls: 'notEditable',
                                        //             bind: {
                                        //                 value: '{widthYdsCheckTxt}',
                                        //                 hidden: '{isYdsColumnHidden}',
                                        //             },
                                        //             stepValue: 0.1,
                                        //             listeners: {
                                        //                 focusleave: 'onwidthYdsCheckTxtFocusleave'
                                        //             }
                                        //         },
                                        //         {
                                        //             xtype: 'numberfield',
                                        //             border: true,
                                        //             cls: 'my-textfield',
                                        //             margin: 1,
                                        //             itemId: 'widthMetCheckTxt',
                                        //             // label: 'Màu:',
                                        //             // labelWidth: 85,
                                        //             flex: 1,
                                        //             // maxWidth: 130,
                                        //             textAlign: 'left',
                                        //             placeholder: 'Khổ kiểm (M)',
                                        //             // editable: false,
                                        //             // readOnly: true,
                                        //             // clearable: false,
                                        //             // cls: 'notEditable',
                                        //             bind: {
                                        //                 value: '{widthMetCheckTxt}',
                                        //                 hidden: '{isMetColumnHidden}',
                                        //             },
                                        //             stepValue: 0.1,
                                        //             listeners: {
                                        //                 focusleave: 'onwidthMetCheckTxtFocusleave'
                                        //             }
                                        //         },
                                        //         {
                                        //             xtype: 'numberfield',
                                        //             border: true,
                                        //             cls: 'my-textfield',
                                        //             margin: 1,
                                        //             itemId: 'widthYdsTxt',
                                        //             // label: 'Màu:',
                                        //             // labelWidth: 85,
                                        //             flex: 1,
                                        //             // maxWidth: 130,
                                        //             textAlign: 'left',
                                        //             placeholder: 'Khổ phiếu (Y)',
                                        //             // editable: false,
                                        //             // readOnly: true,
                                        //             // clearable: false,
                                        //             // cls: 'notEditable',
                                        //             bind: {
                                        //                 value: '{widthYdsTxt}',
                                        //                 hidden: '{isYdsColumnHidden}',
                                        //             },
                                        //             stepValue: 0.1,
                                        //         },
                                        //         {
                                        //             xtype: 'numberfield',
                                        //             border: true,
                                        //             cls: 'my-textfield',
                                        //             margin: 1,
                                        //             itemId: 'widthMetTxt',
                                        //             // label: 'Màu:',
                                        //             // labelWidth: 85,
                                        //             flex: 1,
                                        //             // maxWidth: 130,
                                        //             textAlign: 'left',
                                        //             placeholder: 'Khổ phiếu (M)',
                                        //             // editable: false,
                                        //             // readOnly: true,
                                        //             // clearable: false,
                                        //             // cls: 'notEditable',
                                        //             bind: {
                                        //                 value: '{widthMetTxt}',
                                        //                 hidden: '{isMetColumnHidden}',
                                        //             },
                                        //             stepValue: 0.1,
                                        //         },
                                        //         {
                                        //             // flex: 1,
                                        //             width: 45,
                                        //             margin: 1,
                                        //             // maxWidth: 130,
                                        //         },
                                        //     ]
                                        // }
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
                                    xtype: 'container',
                                    // flex:1,
                                    // height: 100,
                                    // docked: 'bottom',
                                    layout: 'hbox',
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            itemId: 'maPklRecheckFilterByMaVai',
                                            // label: 'Mã hàng:',
                                            // labelWidth: 85,
                                            margin: '5 5 1 5',
                                            // padding: 6,
                                            flex: 1,
                                            // width: '100%',
                                            // minWidth: 80,
                                            // maxWidth: 200,
                                            textAlign: 'left',
                                            placeholder: 'Mã vải',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            cls: 'searchField',
                                            bind: {
                                                value: '{maPklRecheckFilterByMaVai}'
                                            },
                                            listeners: {
                                                keyup: 'onmaPklRecheckFilterKeyup',
                                                buffer: 500
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'maPklRecheckFilter',
                                            // label: 'Mã hàng:',
                                            // labelWidth: 85,
                                            margin: '5 5 1 5',
                                            // padding: 6,
                                            flex: 1,
                                            // width: '100%',
                                            // minWidth: 80,
                                            // maxWidth: 200,
                                            textAlign: 'left',
                                            placeholder: 'Tìm kiếm nhanh ... (theo lot)',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            cls: 'searchField',
                                            bind: {
                                                value: '{maPklRecheckFilter}'
                                            },
                                            listeners: {
                                                keyup: 'onmaPklRecheckFilterKeyup',
                                                buffer: 500
                                            }
                                        },
                                    ]
                                },
                                
                                {
                                    margin: 1,
                                    flex: 1,
                                    xtype: 'Stockin_M_Edit_Pkl_Recheck',
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
                                                    itemId: 'lotnumberTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Số LOT',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{lotnumberTxtRecheck}'
                                                    },
                                                    listeners: {
                                                        change: 'onlotnumberTxtRecheckType',
                                                        focusleave: 'onlotnumberTxtAndpackageidTxtRecheckleave'
                                                    }
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'packageidTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Số cây',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{packageidTxtRecheck}'
                                                    },
                                                    listeners: {
                                                        focusleave: 'onlotnumberTxtAndpackageidTxtRecheckleave'
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype:'button',
                                                    // text: 'Xác nhận',
                                                    // flex: 1,
                                                    // minWidth: 80,
                                                    // maxWidth: 130,
                                                    // width: 45,
                                                    margin: 1,
                                                    iconCls: 'x-fa fa-check',
                                                    itemId:'btnCheckRecheck',
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
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'mTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài kiểm (M)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{mTxtRecheck}',
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
                                                    itemId: 'yTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài kiểm (Y)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{yTxtRecheck}',
                                                        // cls: '{yTxtCls}',
                                                        hidden: '{isYdsColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    margin: 1,
                                                    itemId: 'mOriginTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài phiếu (M)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{mOriginTxtRecheck}',
                                                        hidden: '{isMetColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    margin: 1,
                                                    itemId: 'yOriginTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Dài phiếu (Y)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{yOriginTxtRecheck}',
                                                        hidden: '{isYdsColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype:'button',
                                                    iconCls: 'x-fa fa-plus',
                                                    // itemId:'',
                                                    ui: 'action',
                                                    margin: 1,
                                                    style: 'visibility: hidden;'
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
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'canCheckTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Cân kiểm',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{grossweightCheckTxtRecheck}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    margin: 1,
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    itemId: 'canTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    minWidth: 80,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Cân phiếu',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{grossweightTxtRecheck}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype:'button',
                                                    iconCls: 'x-fa fa-plus',
                                                    // itemId:'',
                                                    ui: 'action',
                                                    margin: 1,
                                                    style: 'visibility: hidden;'
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
                                                    itemId: 'widthYdsCheckTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Khổ kiểm (Y)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{widthYdsCheckTxtRecheck}',
                                                        hidden: '{isYdsColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    margin: 1,
                                                    itemId: 'widthYdsTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Khổ phiếu (Y)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{widthYdsTxtRecheck}',
                                                        hidden: '{isYdsColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    margin: 1,
                                                    itemId: 'widthMetCheckTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Khổ kiểm (M)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{widthMetCheckTxtRecheck}',
                                                        hidden: '{isMetColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    border: true,
                                                    cls: 'my-textfield',
                                                    margin: 1,
                                                    itemId: 'widthMetTxtRecheck',
                                                    // label: 'Màu:',
                                                    // labelWidth: 85,
                                                    flex: 1,
                                                    // maxWidth: 130,
                                                    textAlign: 'left',
                                                    placeholder: 'Khổ phiếu (M)',
                                                    // editable: false,
                                                    // readOnly: true,
                                                    // clearable: false,
                                                    // cls: 'notEditable',
                                                    bind: {
                                                        value: '{widthMetTxtRecheck}',
                                                        hidden: '{isMetColumnHidden}',
                                                    },
                                                    stepValue: 0.1,
                                                },
                                                {
                                                    xtype:'button',
                                                    iconCls: 'x-fa fa-plus',
                                                    // itemId:'',
                                                    ui: 'action',
                                                    margin: 1,
                                                    style: 'visibility: hidden;'
                                                },
                                            ]
                                        },
                                    ]
                                }
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
});