Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_Edit.Stockin_M_Edit_Pkl_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_Pkl_Main',
    id: 'Stockin_M_Edit_Pkl_Main',
    reference: 'Stockin_M_Edit_Pkl_Main',
    controller: 'Stockin_M_Edit_Pkl_MainController',
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
                    itemId: 'cbbox_pkl_stockindId',
                    // reference: 'cboorgto',
                    editable: false,
                    readOnly: true,
                    // cls: 'notEditable',
                    bind:{
                        store:'{Stockin_d_Store}',
                        value:'{pkl_stockindId}'
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
            xtype: 'Stockin_M_Edit_Pkl',
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
                                value: '{objPkl.lotnumberTxt}'
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
                                value: '{objPkl.packageidTxt}'
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
                            focusable: false
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
                                value: '{objPkl.mTxt}',
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
                                value: '{objPkl.yTxt}',
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
                                value: '{objPkl.mOriginTxt}',
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
                                value: '{objPkl.yOriginTxt}',
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
                            bind: {
                                disabled: '{!isPklSelected}',
                            },
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
                        // {
                        //     xtype: 'numberfield',
                        //     border: true,
                        //     cls: 'my-textfield',
                        //     margin: 1,
                        //     itemId: 'widthYdsCheckTxt',
                        //     // label: 'Màu:',
                        //     // labelWidth: 85,
                        //     flex: 1,
                        //     // maxWidth: 130,
                        //     textAlign: 'left',
                        //     placeholder: 'Khổ kiểm (Y)',
                        //     // editable: false,
                        //     // readOnly: true,
                        //     // clearable: false,
                        //     // cls: 'notEditable',
                        //     bind: {
                        //         value: '{widthYdsCheckTxt}',
                        //         hidden: '{isYdsColumnHidden}',
                        //     },
                        //     stepValue: 0.1,
                        //     listeners: {
                        //         focusleave: 'onwidthYdsCheckTxtFocusleave'
                        //     }
                        // },
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
                            placeholder: 'Khổ kiểm (cm)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objPkl.widthMetCheckTxt}',
                                // hidden: '{isMetColumnHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focusleave: 'onwidthMetCheckTxtFocusleave'
                            }
                        },
                        // {
                        //     xtype: 'numberfield',
                        //     border: true,
                        //     cls: 'my-textfield',
                        //     margin: 1,
                        //     itemId: 'widthYdsTxt',
                        //     // label: 'Màu:',
                        //     // labelWidth: 85,
                        //     flex: 1,
                        //     // maxWidth: 130,
                        //     textAlign: 'left',
                        //     placeholder: 'Khổ phiếu (Y)',
                        //     // editable: false,
                        //     // readOnly: true,
                        //     // clearable: false,
                        //     // cls: 'notEditable',
                        //     bind: {
                        //         value: '{widthYdsTxt}',
                        //         hidden: '{isYdsColumnHidden}',
                        //     },
                        //     stepValue: 0.1,
                        // },
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
                            placeholder: 'Khổ phiếu (cm)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objPkl.widthMetTxt}',
                                // hidden: '{isMetColumnHidden}',
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
                            bind: {
                                disabled: '{!isPklSelected}',
                            },
                            // style: 'visibility: hidden;'
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype: 'textfield',
                            itemId: 'pklRowTxt',
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
                                value:'{objPkl.pklRowTxt}'
                            },
                        },
                        {
                            xtype: 'numberfield',
                            itemId: 'pklSpaceTxt',
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
                                value:'{objPkl.pklSpaceTxt}'
                            },
                            // stepValue: 0.1,
                        },
                        {
                            xtype: 'numberfield',
                            itemId: 'pklFloorTxt',
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
                                value:'{objPkl.pklFloorTxt}'
                            },
                            // stepValue: 0.1,
                        },
                        {
                            xtype:'button',
                            iconCls: 'x-fa fa-plus',
                            // itemId:'btnTestDeselect',
                            ui: 'action',
                            margin: 1,
                            style: 'visibility: hidden;'
                        },
                    ]
                },
            ]
        }
    ]
});