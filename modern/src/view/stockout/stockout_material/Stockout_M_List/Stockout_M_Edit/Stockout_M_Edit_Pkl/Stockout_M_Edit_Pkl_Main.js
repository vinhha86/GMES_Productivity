Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_List.Stockout_M_Edit.Stockout_M_Edit_Pkl.Stockout_M_Edit_Pkl_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_M_Edit_Pkl_Main',
    itemId: 'Stockout_M_Edit_Pkl_Main',
    reference: 'Stockout_M_Edit_Pkl_Main',
    controller: 'Stockout_M_Edit_Pkl_MainController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items:[
        {
            xtype: 'container',
            layout: 'hbox',
            items:[
                {
                    xtype: 'combobox',
                    itemId: 'cbbox_pkl_stockoutdId',
                    // reference: 'cboorgto',
                    editable: false,
                    readOnly: true,
                    // cls: 'notEditable',
                    bind:{
                        store:'{Stockout_d}',
                        value:'{pkl_stockoutdId}'
                    },
                    displayField: 'skucode',
                    valueField: 'id',
                    // label: 'Nơi giao:',
                    // disabled: true,
                    labelWidth: 85,
                    flex: 1,
                    padding: 2,
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
            xtype: 'Stockout_M_Edit_Pkl',
        },
        {
            xtype: 'container',
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
                            focusable: false,
                            disabled: true,
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
                            iconCls: 'x-fa fa-print',
                            itemId:'btnPrintPkl',
                            ui: 'action',
                            margin: 1,
                            focusable: false,
                            // bind: {
                            //     disabled: '{!isPklSelected}',
                            // },
                            disabled: true,
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
                // {
                //     layout: 'hbox',
                //     border: false,
                //     width: '100%',
                //     items:[
                //         {
                //             xtype: 'numberfield',
                //             margin: 1,
                //             border: true,
                //             cls: 'my-textfield',
                //             itemId: 'canCheckTxt',
                //             // label: 'Màu:',
                //             // labelWidth: 85,
                //             flex: 1,
                //             minWidth: 80,
                //             // maxWidth: 130,
                //             textAlign: 'left',
                //             placeholder: 'Cân kiểm',
                //             // editable: false,
                //             // readOnly: true,
                //             // clearable: false,
                //             // cls: 'notEditable',
                //             bind: {
                //                 value: '{grossweightCheckTxt}',
                //             },
                //             stepValue: 0.1,
                //             listeners: {
                //                 focusleave: 'oncanCheckTxtFocusleave'
                //             }
                //         },
                //         {
                //             xtype: 'numberfield',
                //             margin: 1,
                //             border: true,
                //             cls: 'my-textfield',
                //             itemId: 'canTxt',
                //             // label: 'Màu:',
                //             // labelWidth: 85,
                //             flex: 1,
                //             minWidth: 80,
                //             // maxWidth: 130,
                //             textAlign: 'left',
                //             placeholder: 'Cân phiếu',
                //             // editable: false,
                //             // readOnly: true,
                //             // clearable: false,
                //             // cls: 'notEditable',
                //             bind: {
                //                 value: '{grossweightTxt}',
                //             },
                //             stepValue: 0.1,
                //         },
                        // {
                        //     xtype:'button',
                        //     iconCls: 'x-fa fa-trash',
                        //     itemId:'btnDeletePkl',
                        //     ui: 'action',
                        //     margin: 1,
                        //     focusable: false,
                        //     bind: {
                        //         disabled: '{!isPklSelected}',
                        //     },
                        //     // style: 'visibility: hidden;'
                        // },
                //     ]
                // },
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
                            itemId: 'widthYdsCheckTxt',
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
                                value: '{widthYdsCheckTxt}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focusleave: 'onwidthYdsCheckTxtFocusleave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetCheckTxt',
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
                                value: '{widthMetCheckTxt}',
                                hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focusleave: 'onwidthMetCheckTxtFocusleave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthYdsTxt',
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
                                value: '{widthYdsTxt}',
                                hidden: '{isYdsColumnHidden}',
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetTxt',
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
                                value: '{widthMetTxt}',
                                hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-trash',
                            itemId:'btnDeletePkl',
                            ui: 'action',
                            margin: 1,
                            focusable: false,
                            // bind: {
                            //     disabled: '{!isPklSelected}',
                            // },
                            disabled: true,
                            // style: 'visibility: hidden;'
                        },
                    ]
                },
                // {
                //     layout: 'hbox',
                //     border: false,
                //     width: '100%',
                //     items:[
                //         {
                //             xtype: 'textfield',
                //             itemId: 'pklRowTxt',
                //             // label: 'Mã hàng:',
                //             // labelWidth: 85,
                //             margin: 1,
                //             // padding: 6,
                //             flex: 1,
                //             // width: '100%',
                //             // minWidth: 80,
                //             // maxWidth: 200,
                //             textAlign: 'left',
                //             placeholder: 'Dãy',
                //             // editable: false,
                //             // readOnly: true,
                //             // clearable: false,
                //             // cls: 'notEditable',
                //             bind: {
                //                 value:'{pklRowTxt}'
                //             },
                //         },
                //         {
                //             xtype: 'numberfield',
                //             itemId: 'pklSpaceTxt',
                //             // label: 'Mã hàng:',
                //             // labelWidth: 85,
                //             margin: 1,
                //             // padding: 6,
                //             flex: 1,
                //             // width: '100%',
                //             // minWidth: 80,
                //             // maxWidth: 200,
                //             textAlign: 'left',
                //             placeholder: 'Hàng',
                //             // editable: false,
                //             // readOnly: true,
                //             // clearable: false,
                //             // cls: 'notEditable',
                //             bind: {
                //                 value:'{pklSpaceTxt}'
                //             },
                //             // stepValue: 0.1,
                //         },
                //         {
                //             xtype: 'numberfield',
                //             itemId: 'pklFloorTxt',
                //             // label: 'Mã hàng:',
                //             // labelWidth: 85,
                //             margin: 1,
                //             // padding: 6,
                //             flex: 1,
                //             // width: '100%',
                //             // minWidth: 80,
                //             // maxWidth: 200,
                //             textAlign: 'left',
                //             placeholder: 'Tầng',
                //             // editable: false,
                //             // readOnly: true,
                //             // clearable: false,
                //             // cls: 'notEditable',
                //             bind: {
                //                 value:'{pklFloorTxt}'
                //             },
                //             // stepValue: 0.1,
                //         },
                //         {
                //             xtype:'button',
                //             iconCls: 'x-fa fa-plus',
                //             // itemId:'',
                //             ui: 'action',
                //             margin: 1,
                //             style: 'visibility: hidden;'
                //         },
                //     ]
                // },
            ]
        }
    ]
});