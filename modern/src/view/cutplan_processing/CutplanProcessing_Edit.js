Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'cutplan_processing_edit',
    id: 'cutplan_processing_edit',
    reference: 'cutplan_processing_edit',
    viewModel: {
        type: 'CutplanProcessing_Edit_ViewModel'
    },
    controller: 'CutplanProcessing_Edit_Controller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast'
    ],

    tbar: [{
        xtype:'button',
        iconCls: 'x-fa fa-arrow-left',
        itemId:'btnBack',
        ui: 'action',
    },
    '->',
    {
        xtype:'button',
        iconCls: 'x-fa fa-save',
        itemId:'btnLuu',
        ui: 'action',
    }],

    items:[
        {
            xtype: 'tabpanel',
            // height: '100%',
            // width: '100%',
            flex: 1,
            items: [
                {
                    title: 'Thông tin chung',
                    xtype: 'container',
                    layout: 'hbox',
                    // docked : 'top',
                    defaults: {
                        margin:'2 2 0 2'
                    },
                    items: [
                            {
                                layout: 'vbox',
                                flex: 1,
                                items: [
                                    {
                                        layout: 'hbox',
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'datefield',
                                            label: 'Ngày:',
                                            labelWidth: 70,
                                            flex: 1,
                                            textAlign: 'left',
                                            dateFormat : 'd/m/y',
                                            editable: false,
                                            readOnly: true,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{cutplanProcessing.processingdate}'
                                            }
                                        },{
                                            xtype: 'combobox',
                                            // reference: 'cboorgto',
                                            editable: false,
                                            readOnly: true,
                                            // cls: 'notEditable',
                                            bind:{
                                                store:'{OrgStore}',
                                                value:'{cutplanProcessing.cutorgid_link}'
                                            },
                                            displayField: 'name',
                                            valueField: 'id',
                                            label: 'Bàn số:',
                                            // disabled: true,
                                            labelWidth: 60,
                                            flex: 1,
                                        }]
                                    },
                                    {
                                        layout: 'hbox',
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'textfield',
                                            label: 'Lệnh SX:',
                                            labelWidth: 70,
                                            flex: 1,
                                            textAlign: 'left',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            // cls: 'notEditable',
                                            bind: {
                                                value: '{cutplanProcessing.pordercode}'
                                            }
                                        },{
                                            xtype:'button',
                                            // text: 'Xác nhận xuất',
                                            margin: 2,
                                            itemId:'btnPlus',
                                            ui: 'action',
                                            iconCls: 'x-fa fa-plus',
                                        },{
                                            xtype:'button',
                                            // text: 'Xác nhận xuất',
                                            margin: 2,
                                            itemId:'btnSearch',
                                            ui: 'action',
                                            iconCls: 'x-fa fa-search',
                                        }]
                                    },
                                    {
                                        layout: 'hbox',
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'combobox',
                                            // reference: 'cboorgto',
                                            editable: false,
                                            readOnly: true,
                                            // cls: 'notEditable',
                                            bind:{
                                                store:'{Sku}',
                                                value: '{cutplanProcessing.material_skuid_link}'
                                            },
                                            displayField: 'code',
                                            valueField: 'id',
                                            label: 'Mã vải:',
                                            // disabled: true,
                                            labelWidth: 70,
                                            flex: 2,
                                            listeners: {
                                                select: 'onSelectSku'
                                            }
                                        }]
                                    },
                                    {
                                        layout: 'hbox',
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'combobox',
                                            // reference: 'cboorgto',
                                            itemId: 'cbboxcolor',
                                            // editable: false,
                                            // readOnly: true,
                                            // cls: 'notEditable',
                                            bind:{
                                                store:'{listcolorData}',
                                                value: '{cutplanProcessing.colorid_link}'
                                            },
                                            displayField: 'name',
                                            valueField: 'id',
                                            label: 'Màu SP:',
                                            // disabled: true,
                                            labelWidth: 70,
                                            flex: 2,
                                            listeners: {
                                                select: 'onSelectMauSP'
                                            }
                                        }]
                                    },
                                    {
                                        layout: 'hbox',
                                        // flex: 1,
                                        defaults: {
                                            margin: 1
                                        },
                                        items: [{
                                            xtype: 'combobox',
                                            // reference: 'cboorgto',
                                            editable: false,
                                            readOnly: true,
                                            // cls: 'notEditable',
                                            bind:{
                                                store:'{CutPlanRowStore}',
                                                value:'{cutplanProcessing.cutplanrowid_link}'
                                            },
                                            displayField: 'code',
                                            valueField: 'id',
                                            label: 'Sơ đồ cắt:',
                                            // disabled: true,
                                            labelWidth: 70,
                                            flex: 2,
                                            listeners: {
                                                select: 'onSelectCutPlanRow'
                                            }
                                        },{
                                            xtype: 'textfield',
                                            label: 'Dài:',
                                            labelWidth: 50,
                                            flex: 1,
                                            textAlign: 'right',
                                            // editable: false,
                                            // readOnly: true,
                                            clearable: false,
                                            bind: {
                                                value: '{cutPlanRow.dai_so_do}'
                                            }
                                        }]
                                    },

                                    // {
                                    //     layout: 'hbox',
                                    //     // flex: 1,
                                    //     defaults: {
                                    //         margin: 1
                                    //     },
                                    //     items: [{
                                    //         xtype: 'textfield',
                                    //         itemId: 'testFilter',
                                    //         label: 'filter:',
                                    //         labelWidth: 70,
                                    //         flex: 1,
                                    //         textAlign: 'left',
                                    //         // editable: false,
                                    //         // readOnly: true,
                                    //         clearable: false,
                                    //         listeners: {
                                    //             keyup: 'onTestFilterKeyup',
                                    //             buffer: 500
                                    //         }
                                    //     }]
                                    // },
                                ]
                            }
                        ]
                },
                {
                    title: 'Chi tiết bàn cắt',
                    margin: 1,
                    flex: 1,
                    layout: 'vbox',
                    items: [{
                        layout: 'vbox',
                        // flex: 1,
                        items: [
                            {
                                layout: 'hbox',
                                // flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'textfield',
                                    itemId: 'lotnumber',
                                    label: 'Số Lot:',
                                    labelWidth: 60,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    bind: {
                                        value: '{cutplanProcessingDObj.lotnumber}'
                                    }
                                },{
                                    xtype: 'numberfield',
                                    itemId: 'packageid',
                                    label: 'Số cây:',
                                    labelWidth: 60,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    bind: {
                                        value: '{cutplanProcessingDObj.packageid}'
                                    }
                                },{
                                    xtype: 'numberfield',
                                    itemId: 'met',
                                    label: 'Dài:',
                                    labelWidth: 60,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    bind: {
                                        value: '{cutplanProcessingDObj.met}'
                                    }
                                },]
                            },
                            {
                                layout: 'hbox',
                                // flex: 1,
                                // defaults: {
                                //     margin: 1
                                // },
                                items: [{
                                    layout: 'vbox',
                                    flex: 1,
                                    defaults: {
                                        // margin: '1 1 0 1'
                                        margin: '1 1 0 1',
                                    },
                                    items: [{
                                        xtype: 'numberfield',
                                        itemId: 'la_vai',
                                        label: 'Số lá:',
                                        labelWidth: 60,
                                        flex: 1,
                                        textAlign: 'left',
                                        // editable: false,
                                        // readOnly: true,
                                        clearable: false,
                                        // cls: 'notEditable',
                                        bind: {
                                            value: '{cutplanProcessingDObj.la_vai}'
                                        }
                                    },{
                                        xtype: 'numberfield',
                                        itemId: 'con_lai',
                                        label: 'Còn:',
                                        labelWidth: 60,
                                        flex: 1,
                                        textAlign: 'left',
                                        // editable: false,
                                        // readOnly: true,
                                        clearable: false,
                                        // cls: 'notEditable',
                                        bind: {
                                            value: '{cutplanProcessingDObj.con_lai}'
                                        }
                                    }]
                                },{
                                    layout: 'vbox',
                                    flex: 1,
                                    defaults: {
                                        margin: '1 1 0 1',
                                    },
                                    items: [{
                                        xtype: 'numberfield',
                                        itemId: 'tieu_hao',
                                        label: 'T/Hao:',
                                        labelWidth: 60,
                                        flex: 1,
                                        textAlign: 'left',
                                        // editable: false,
                                        // readOnly: true,
                                        clearable: false,
                                        // cls: 'notEditable',
                                        bind: {
                                            value: '{cutplanProcessingDObj.tieu_hao}'
                                        }
                                    },{
                                        xtype: 'numberfield',
                                        itemId: 'ps',
                                        label: 'P/S:',
                                        labelWidth: 60,
                                        flex: 1,
                                        textAlign: 'left',
                                        // editable: false,
                                        // readOnly: true,
                                        clearable: false,
                                        // cls: 'notEditable',
                                        bind: {
                                            value: '{cutplanProcessingDObj.ps}'
                                        }
                                    }]
                                },{
                                    layout: 'vbox',
                                    flex     : 1,
                                    defaults : {
                                        flex : 1
                                    },
                                    items: [{
                                        xtype:'button',
                                        text: 'Thêm',
                                        margin: 2,
                                        itemId:'btnAdd',
                                        ui: 'action',
                                        iconCls: 'x-fa fa-check',
                                    }]
                                }]
                            },
                        ]
                    },{
                        margin: 1,
                        flex: 1,
                        xtype: 'CutplanProcessing_Edit_D',
                    }]
                }
            ]
        }
    ]

    // items: [
    //     {
    //         xtype: 'container',
    //         layout: 'hbox',
    //         // docked : 'top',
    //         defaults: {
    //             margin:'2 2 0 2'
    //         },
    //         items: [
    //                 {
    //                     layout: 'vbox',
    //                     flex: 1,
    //                     items: [
    //                         {
    //                             layout: 'hbox',
    //                             flex: 1,
    //                             defaults: {
    //                                 margin: 1
    //                             },
    //                             items: [{
    //                                 xtype: 'datefield',
    //                                 label: 'Ngày:',
    //                                 labelWidth: 70,
    //                                 flex: 1,
    //                                 textAlign: 'left',
    //                                 dateFormat : 'd/m/y',
    //                                 editable: false,
    //                                 readOnly: true,
    //                                 // cls: 'notEditable',
    //                                 bind: {
    //                                     value: '{cutplanProcessing.processingdate}'
    //                                 }
    //                             },{
    //                                 xtype: 'combobox',
    //                                 // reference: 'cboorgto',
    //                                 editable: false,
    //                                 readOnly: true,
    //                                 // cls: 'notEditable',
    //                                 bind:{
    //                                     store:'{OrgStore}',
    //                                     value:'{cutplanProcessing.cutorgid_link}'
    //                                 },
    //                                 displayField: 'name',
    //                                 valueField: 'id',
    //                                 label: 'Bàn số:',
    //                                 // disabled: true,
    //                                 labelWidth: 70,
    //                                 flex: 1,
    //                             }]
    //                         },
    //                         {
    //                             layout: 'hbox',
    //                             flex: 1,
    //                             defaults: {
    //                                 margin: 1
    //                             },
    //                             items: [{
    //                                 xtype: 'textfield',
    //                                 label: 'Lệnh SX:',
    //                                 labelWidth: 70,
    //                                 flex: 1,
    //                                 textAlign: 'left',
    //                                 // editable: false,
    //                                 // readOnly: true,
    //                                 clearable: false,
    //                                 // cls: 'notEditable',
    //                                 bind: {
    //                                     value: '{cutplanProcessing.pordercode}'
    //                                 }
    //                             },{
    //                                 xtype:'button',
    //                                 // text: 'Xác nhận xuất',
    //                                 margin: 2,
    //                                 itemId:'btnPlus',
    //                                 ui: 'action',
    //                                 iconCls: 'x-fa fa-plus',
    //                             },{
    //                                 xtype:'button',
    //                                 // text: 'Xác nhận xuất',
    //                                 margin: 2,
    //                                 itemId:'btnSearch',
    //                                 ui: 'action',
    //                                 iconCls: 'x-fa fa-search',
    //                             }]
    //                         },
    //                         {
    //                             layout: 'hbox',
    //                             flex: 1,
    //                             defaults: {
    //                                 margin: 1
    //                             },
    //                             items: [{
    //                                 xtype: 'combobox',
    //                                 // reference: 'cboorgto',
    //                                 editable: false,
    //                                 readOnly: true,
    //                                 // cls: 'notEditable',
    //                                 bind:{
    //                                     store:'{CutPlanRowStore}',
    //                                 },
    //                                 displayField: 'code',
    //                                 valueField: 'id',
    //                                 label: 'Sơ đồ cắt:',
    //                                 // disabled: true,
    //                                 labelWidth: 70,
    //                                 flex: 2,
    //                             },{
    //                                 xtype: 'textfield',
    //                                 label: 'Dài:',
    //                                 labelWidth: 70,
    //                                 flex: 1,
    //                                 textAlign: 'left',
    //                                 // editable: false,
    //                                 // readOnly: true,
    //                                 clearable: false,
    //                                 bind: {
    //                                     // value: '{stockin.reason}'
    //                                 }
    //                             }]
    //                         },
    //                         {
    //                             layout: 'hbox',
    //                             flex: 1,
    //                             defaults: {
    //                                 margin: 1
    //                             },
    //                             items: [{
    //                                 xtype: 'textfield',
    //                                 label: 'Số Lot:',
    //                                 labelWidth: 70,
    //                                 flex: 1,
    //                                 textAlign: 'left',
    //                                 // editable: false,
    //                                 // readOnly: true,
    //                                 clearable: false,
    //                                 // cls: 'notEditable',
    //                                 bind: {
    //                                     // value: '{stockin.invoice_number}'
    //                                 }
    //                             },{
    //                                 xtype: 'textfield',
    //                                 label: 'Số cây:',
    //                                 labelWidth: 70,
    //                                 flex: 1,
    //                                 textAlign: 'left',
    //                                 // editable: false,
    //                                 // readOnly: true,
    //                                 clearable: false,
    //                                 // cls: 'notEditable',
    //                                 bind: {
    //                                     // value: '{stockin.invoice_number}'
    //                                 }
    //                             },{
    //                                 xtype: 'textfield',
    //                                 label: 'Số M:',
    //                                 labelWidth: 70,
    //                                 flex: 1,
    //                                 textAlign: 'left',
    //                                 // editable: false,
    //                                 // readOnly: true,
    //                                 clearable: false,
    //                                 // cls: 'notEditable',
    //                                 bind: {
    //                                     // value: '{stockin.invoice_number}'
    //                                 }
    //                             },]
    //                         },
    //                         {
    //                             layout: 'hbox',
    //                             // flex: 1,
    //                             // defaults: {
    //                             //     margin: 1
    //                             // },
    //                             items: [{
    //                                 layout: 'vbox',
    //                                 flex: 1,
    //                                 defaults: {
    //                                     // margin: '1 1 0 1'
    //                                     margin: '1 1 0 1',
    //                                 },
    //                                 items: [{
    //                                     xtype: 'textfield',
    //                                     label: 'Số lá:',
    //                                     labelWidth: 70,
    //                                     flex: 1,
    //                                     textAlign: 'left',
    //                                     // editable: false,
    //                                     // readOnly: true,
    //                                     clearable: false,
    //                                     // cls: 'notEditable',
    //                                     bind: {
    //                                         // value: '{stockin.invoice_number}'
    //                                     }
    //                                 },{
    //                                     xtype: 'textfield',
    //                                     label: 'Còn:',
    //                                     labelWidth: 70,
    //                                     flex: 1,
    //                                     textAlign: 'left',
    //                                     // editable: false,
    //                                     // readOnly: true,
    //                                     clearable: false,
    //                                     // cls: 'notEditable',
    //                                     bind: {
    //                                         // value: '{stockin.invoice_number}'
    //                                     }
    //                                 }]
    //                             },{
    //                                 layout: 'vbox',
    //                                 flex: 1,
    //                                 defaults: {
    //                                     margin: '1 1 0 1',
    //                                 },
    //                                 items: [{
    //                                     xtype: 'textfield',
    //                                     label: 'Tiêu hao:',
    //                                     labelWidth: 70,
    //                                     flex: 1,
    //                                     textAlign: 'left',
    //                                     // editable: false,
    //                                     // readOnly: true,
    //                                     clearable: false,
    //                                     // cls: 'notEditable',
    //                                     bind: {
    //                                         // value: '{stockin.invoice_number}'
    //                                     }
    //                                 },{
    //                                     xtype: 'textfield',
    //                                     label: 'P/S:',
    //                                     labelWidth: 70,
    //                                     flex: 1,
    //                                     textAlign: 'left',
    //                                     // editable: false,
    //                                     // readOnly: true,
    //                                     clearable: false,
    //                                     // cls: 'notEditable',
    //                                     bind: {
    //                                         // value: '{stockin.invoice_number}'
    //                                     }
    //                                 }]
    //                             },{
    //                                 layout: 'vbox',
    //                                 flex     : 1,
    //                                 defaults : {
    //                                     flex : 1
    //                                 },
    //                                 items: [{
    //                                     xtype:'button',
    //                                     text: 'Thêm',
    //                                     margin: 2,
    //                                     itemId:'btnAdd',
    //                                     ui: 'action',
    //                                     // iconCls: 'x-fa fa-plus',
    //                                 }]
    //                             }]
    //                         },
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         margin: 1,
    //         flex: 1,
    //         xtype: 'CutplanProcessing_Edit_D',
    //         // id: 'handover_cut_toline_detail',
    //     },
    // ],

});