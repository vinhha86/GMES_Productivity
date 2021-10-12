Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_m_edit_pkl_detail.Stockin_M_Edit_Pkl_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_Pkl_Detail',
    itemId: 'Stockin_M_Edit_Pkl_Detail',
    cls: 'Stockin_M_Edit_Pkl_Detail',
    reference: 'Stockin_M_Edit_Pkl_Detail',
    controller: 'Stockin_M_Edit_Pkl_Detail_Controller',
    viewModel: {
        type: 'Stockin_M_Edit_Pkl_Detail_ViewModel'
    },
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
            layout: 'vbox',
            items:[
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
                            itemId: 'packageidTxt',
                            // label: 'Số cây:',
                            // labelWidth: 130,
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
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onlotnumberTxtAndpackageidTxtleave',
                                // focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lotnumberTxt',
                            // label: 'Số LOT:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Số LOT',
                            editable: false,
                            readOnly: true,
                            clearable: false,
                            cls: 'notEditable',
                            bind: {
                                value: '{objPkl.lotnumberTxt}'
                            },
                        },
                        
                    ]
                },

                // ios
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{!isIos}'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'mTxt',
                            // label: 'Dài kiểm (M):',
                            // labelWidth: 130,
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
                                hidden: '{isPklMetFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                // focusleave: 'onmTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'yTxt',
                            // label: 'Dài kiểm (Y)',
                            // labelWidth: 130,
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
                                hidden: '{isPklYdsFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                // focusleave: 'onyTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canCheckTxt',
                            // label: 'Cân kiểm',
                            // labelWidth: 130,
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
                                value: '{objPkl.grossweightCheckTxt}',
                                hidden: '{isPklKgFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                // focusleave: 'oncanCheckTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lbsCheckTxt',
                            // label: 'Lbs kiểm:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Lbs kiểm',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objPkl.grossweightLbsCheckTxt}',
                                hidden: '{isPklLbsFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        ////////////////////////////////////
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'mOriginTxt',
                            // label: 'Dài phiếu (M):',
                            // labelWidth: 130,
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
                                hidden: '{isPklMetFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'yOriginTxt',
                            // label: 'Dài phiếu (Y):',
                            // labelWidth: 130,
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
                                hidden: '{isPklYdsFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canTxt',
                            // label: 'Cân phiếu:',
                            // labelWidth: 130,
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
                                value: '{objPkl.grossweightTxt}',
                                hidden: '{isPklKgFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lbsTxt',
                            // label: 'Lbs phiếu:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Lbs phiếu',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objPkl.grossweightLbsTxt}',
                                hidden: '{isPklLbsFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{!isIos}'
                    },
                    items:[
                        
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetCheckTxt',
                            // label: 'Khổ kiểm (cm):',
                            // labelWidth: 130,
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
                                hidden: '{isPklCmFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                // focusleave: 'onwidthMetCheckTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetTxt',
                            // label: 'Khổ phiếu (cm):',
                            // labelWidth: 130,
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
                                hidden: '{isPklCmFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthYdsCheckTxt',
                            // label: 'Khổ kiểm (cm):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ kiểm (inch)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objPkl.widthYdsCheckTxt}',
                                hidden: '{isPklInchFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                // focusleave: 'onwidthMetCheckTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'textfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthYdsTxt',
                            // label: 'Khổ phiếu (cm):',
                            // labelWidth: 130,
                            flex: 1,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Khổ phiếu (inch)',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objPkl.widthYdsTxt}',
                                hidden: '{isPklInchFieldHidden}',
                            },
                            stepValue: 0.1,
                            inputType: 'number',
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                    ]
                },

                // not ios
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{isIos}'
                    },
                    items:[
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'mTxt',
                            // label: 'Dài kiểm (M):',
                            // labelWidth: 130,
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
                                hidden: '{isPklMetFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                // focusleave: 'onmTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'yTxt',
                            // label: 'Dài kiểm (Y)',
                            // labelWidth: 130,
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
                                hidden: '{isPklYdsFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                // focusleave: 'onyTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canCheckTxt',
                            // label: 'Cân kiểm',
                            // labelWidth: 130,
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
                                value: '{objPkl.grossweightCheckTxt}',
                                hidden: '{isPklKgFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                // focusleave: 'oncanCheckTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lbsCheckTxt',
                            // label: 'Lbs kiểm:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Lbs kiểm',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objPkl.grossweightLbsCheckTxt}',
                                hidden: '{isPklLbsFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        ////////////////////////////////////
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'mOriginTxt',
                            // label: 'Dài phiếu (M):',
                            // labelWidth: 130,
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
                                hidden: '{isPklMetFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'yOriginTxt',
                            // label: 'Dài phiếu (Y):',
                            // labelWidth: 130,
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
                                hidden: '{isPklYdsFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'canTxt',
                            // label: 'Cân phiếu:',
                            // labelWidth: 130,
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
                                value: '{objPkl.grossweightTxt}',
                                hidden: '{isPklKgFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                        {
                            xtype: 'numberfield',
                            margin: 1,
                            border: true,
                            cls: 'my-textfield',
                            itemId: 'lbsTxt',
                            // label: 'Lbs phiếu:',
                            // labelWidth: 130,
                            flex: 1,
                            minWidth: 80,
                            // maxWidth: 130,
                            textAlign: 'left',
                            placeholder: 'Lbs phiếu',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value: '{objPkl.grossweightLbsTxt}',
                                hidden: '{isPklLbsFieldHidden}',
                            },
                            stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave',
                            }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    bind: {
                        hidden: '{isIos}'
                    },
                    items:[
                        
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetCheckTxt',
                            // label: 'Khổ kiểm (cm):',
                            // labelWidth: 130,
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
                                // focusleave: 'onwidthMetCheckTxtFocusleave',
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            border: true,
                            cls: 'my-textfield',
                            margin: 1,
                            itemId: 'widthMetTxt',
                            // label: 'Khổ phiếu (cm):',
                            // labelWidth: 130,
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
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
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
                            // label: 'Dãy:',
                            // labelWidth: 130,
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
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            itemId: 'pklSpaceTxt',
                            // label: 'Tầng:',
                            // labelWidth: 130,
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
                                value:'{objPkl.pklSpaceTxt}'
                            },
                            // stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            itemId: 'pklFloorTxt',
                            // label: 'Khoang:',
                            // labelWidth: 130,
                            margin: 1,
                            // padding: 6,
                            flex: 1,
                            // width: '100%',
                            // minWidth: 80,
                            // maxWidth: 200,
                            textAlign: 'left',
                            placeholder: 'Khoang',
                            // editable: false,
                            // readOnly: true,
                            // clearable: false,
                            // cls: 'notEditable',
                            bind: {
                                value:'{objPkl.pklFloorTxt}'
                            },
                            // stepValue: 0.1,
                            listeners: {
                                focus: 'onFocus',
                                focusleave: 'onFocusLeave'
                            }
                        },
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    width: '100%',
                    items:[
                        {
                            xtype:'button',
                            text: 'Lưu',
                            margin: 5,
                            // padding: 5,
                            width: 100,
                            iconCls: 'x-fa fa-check',
                            itemId:'btnCheck',
                            ui: 'action',
                            focusable: false
                        },
                        {
                            flex: 1,
                        },
                        {
                            xtype:'button',
                            text: 'Xoá',
                            margin: 5,
                            // padding: 5,
                            width: 100,
                            iconCls: 'x-fa fa-trash',
                            itemId:'btnDeletePkl',
                            ui: 'action',
                            focusable: false,
                            bind: {
                                disabled: '{isBtnDeletePklHidden}',
                            },
                            // style: 'visibility: hidden;'
                        },
                        
                    ]
                },
            ]
        }
    ],
    bbar: [
        {
            xtype:'container',
            flex: 1,
            layout: 'vbox',
            items: [{
                xtype: 'textfield',
                margin: 1,
                border: true,
                cls: 'my-textfield',
                itemId: 'slcankiem',
                // label: 'SL cần kiểm:',
                // labelWidth: 130,
                labelWidth: '100%',
                flex: 1,
                minWidth: 80,
                // maxWidth: 130,
                textAlign: 'left',
                placeholder: 'SL cần kiểm',
                editable: false,
                readOnly: true,
                clearable: false,
                cls: 'lblField',
                bind: {
                    // value: '{slcankiem}',
                    label: 'SL cần kiểm: ' + '{slcankiem}'
                },
            },{
                xtype: 'textfield',
                margin: 1,
                border: true,
                cls: 'my-textfield',
                itemId: 'dschuakiem',
                // label: 'DS chưa kiểm:',
                // labelWidth: 130,
                labelWidth: '100%',
                flex: 1,
                minWidth: 80,
                // maxWidth: 130,
                textAlign: 'left',
                placeholder: 'DS chưa kiểm',
                editable: false,
                readOnly: true,
                clearable: false,
                cls: 'lblField',
                bind: {
                    // value: '{dschuakiem}',
                    label: 'DS chưa kiểm: ' + '{dschuakiem}'
                },
            }]
        },
    ],
});