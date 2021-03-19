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

    items: [
        {
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
                                flex: 1,
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
                                        // value: '{stockin.stockindate}'
                                    }
                                },{
                                    xtype: 'combobox',
                                    // reference: 'cboorgto',
                                    editable: false,
                                    readOnly: true,
                                    // cls: 'notEditable',
                                    bind:{
                                        store:'{OrgStore}',
                                        // value:'{stockin.stockintypeid_link}'
                                    },
                                    displayField: 'name',
                                    valueField: 'id',
                                    label: 'Bàn số:',
                                    // disabled: true,
                                    labelWidth: 70,
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
                                    label: 'Lệnh SX:',
                                    labelWidth: 70,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    bind: {
                                        // value: '{stockin.invoice_number}'
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
                                flex: 1,
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
                                        store:'{OrgStore}',
                                        // value:'{stockin.stockintypeid_link}'
                                    },
                                    displayField: 'name',
                                    valueField: 'id',
                                    label: 'Sơ đồ cắt:',
                                    // disabled: true,
                                    labelWidth: 70,
                                    flex: 2,
                                },{
                                    xtype: 'textfield',
                                    label: 'Dài:',
                                    labelWidth: 70,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    bind: {
                                        // value: '{stockin.reason}'
                                    }
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
                                    label: 'Số Lot:',
                                    labelWidth: 70,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    bind: {
                                        // value: '{stockin.invoice_number}'
                                    }
                                },{
                                    xtype: 'textfield',
                                    label: 'Số cây:',
                                    labelWidth: 70,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    bind: {
                                        // value: '{stockin.invoice_number}'
                                    }
                                },{
                                    xtype: 'textfield',
                                    label: 'Số M:',
                                    labelWidth: 70,
                                    flex: 1,
                                    textAlign: 'left',
                                    // editable: false,
                                    // readOnly: true,
                                    clearable: false,
                                    // cls: 'notEditable',
                                    bind: {
                                        // value: '{stockin.invoice_number}'
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
                                        xtype: 'textfield',
                                        label: 'Số lá:',
                                        labelWidth: 70,
                                        flex: 1,
                                        textAlign: 'left',
                                        // editable: false,
                                        // readOnly: true,
                                        clearable: false,
                                        // cls: 'notEditable',
                                        bind: {
                                            // value: '{stockin.invoice_number}'
                                        }
                                    },{
                                        xtype: 'textfield',
                                        label: 'Còn:',
                                        labelWidth: 70,
                                        flex: 1,
                                        textAlign: 'left',
                                        // editable: false,
                                        // readOnly: true,
                                        clearable: false,
                                        // cls: 'notEditable',
                                        bind: {
                                            // value: '{stockin.invoice_number}'
                                        }
                                    }]
                                },{
                                    layout: 'vbox',
                                    flex: 1,
                                    defaults: {
                                        margin: '1 1 0 1',
                                    },
                                    items: [{
                                        xtype: 'textfield',
                                        label: 'Tiêu hao:',
                                        labelWidth: 70,
                                        flex: 1,
                                        textAlign: 'left',
                                        // editable: false,
                                        // readOnly: true,
                                        clearable: false,
                                        // cls: 'notEditable',
                                        bind: {
                                            // value: '{stockin.invoice_number}'
                                        }
                                    },{
                                        xtype: 'textfield',
                                        label: 'P/S:',
                                        labelWidth: 70,
                                        flex: 1,
                                        textAlign: 'left',
                                        // editable: false,
                                        // readOnly: true,
                                        clearable: false,
                                        // cls: 'notEditable',
                                        bind: {
                                            // value: '{stockin.invoice_number}'
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
                                        itemId:'btnPlus',
                                        ui: 'action',
                                        // iconCls: 'x-fa fa-plus',
                                    }]
                                }]
                            },
                    ]
                }
            ]
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'CutplanProcessing_Edit_D',
            // id: 'handover_cut_toline_detail',
        },
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
    // bbar: [
    //     {
    //         xtype: 'textfield',
    //         itemId: 'maNPLFilter',
    //         label: 'Mã NPL:',
    //         labelWidth: 70,
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