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
                            // {
                            //     layout: 'hbox',
                            //     flex: 1,
                            //     defaults: {
                            //         margin: 1
                            //     },
                            //     items: [{
                            //         xtype: 'combobox',
                            //         // reference: 'cboorgto',
                            //         editable: false,
                            //         readOnly: true,
                            //         cls: 'notEditable',
                            //         bind:{
                            //             store:'{StockinTypeStore}',
                            //             value:'{stockin.stockintypeid_link}'
                            //         },
                            //         displayField: 'name',
                            //         valueField: 'id',
                            //         label: 'Loại nhập:',
                            //         // disabled: true,
                            //         labelWidth: 85,
                            //         flex: 1,
                            //     }]
                            // },
                            {
                                layout: 'hbox',
                                flex: 1,
                                defaults: {
                                    margin: 1
                                },
                                items: [{
                                    xtype: 'textfield',
                                    label: 'Số phiếu:',
                                    labelWidth: 85,
                                    flex: 1,
                                    textAlign: 'left',
                                    editable: false,
                                    readOnly: true,
                                    clearable: false,
                                    cls: 'notEditable',
                                    bind: {
                                        value: '{stockin.stockincode}'
                                    },
                                }]
                            },
                            // {
                            //     layout: 'hbox',
                            //     flex: 1,
                            //     defaults: {
                            //         margin: 1
                            //     },
                            //     items: [{
                            //         xtype: 'datefield',
                            //         label: 'Ngày nhập:',
                            //         labelWidth: 85,
                            //         flex: 1,
                            //         textAlign: 'left',
                            //         dateFormat : 'd/m/y',
                            //         editable: false,
                            //         readOnly: true,
                            //         cls: 'notEditable',
                            //         bind: {
                            //             value: '{stockin.stockindate}'
                            //         }
                            //     }]
                            // },
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
                                // },{
                                //     xtype: 'combobox',
                                //     // reference: 'cboorgto',
                                //     editable: false,
                                //     hideTrigger: true,
                                //     readOnly: true,
                                //     cls: 'notEditable',
                                //     bind:{
                                //         store:'{UserListStore}',
                                //         value: '{currentRec.handover_userid_link}'
                                //     },
                                //     displayField: 'fullname',
                                //     valueField: 'id',
                                //     label: 'Ng/giao:',
                                //     labelWidth: 85,
                                //     flex: 1,
                                }]
                            },
                            // {
                            //     layout: 'hbox',
                            //     flex: 1,
                            //     defaults: {
                            //         margin: 1
                            //     },
                            //     items: [{
                            //         xtype: 'combobox',
                            //         itemId:'orgid_to_link',
                            //         reference: 'cboorgto',
                            //         editable: false,
                            //         readOnly: true,
                            //         cls: 'notEditable',
                            //         bind:{
                            //             store:'{OrgToStore}',
                            //             value:'{stockin.orgid_to_link}'
                            //         },
                            //         displayField: 'name',
                            //         valueField: 'id',
                            //         label: 'Nơi nhận:',
                            //         labelWidth: 85,
                            //         flex: 1,
                            //     // },{
                            //     //     xtype: 'combobox',
                            //     //     // reference: 'cboorgto',
                            //     //     editable: false,
                            //     //     hideTrigger: true,
                            //     //     readOnly: true,
                            //     //     cls: 'notEditable',
                            //     //     bind:{
                            //     //         store:'{UserListStore}',
                            //     //         value: '{currentRec.receiver_userid_link}'
                            //     //     },
                            //     //     displayField: 'fullname',
                            //     //     valueField: 'id',
                            //     //     label: 'Ng/nhận:',
                            //     //     labelWidth: 85,
                            //     //     flex: 1,
                            //     }]
                            // },
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
                            // {
                            //     layout: 'hbox',
                            //     flex: 1,
                            //     defaults: {
                            //         margin: 1
                            //     },
                            //     items: [{
                            //         xtype: 'textfield',
                            //         label: 'Lý do:',
                            //         labelWidth: 85,
                            //         flex: 1,
                            //         textAlign: 'left',
                            //         // editable: false,
                            //         // readOnly: true,
                            //         clearable: false,
                            //         bind: {
                            //             value: '{stockin.reason}'
                            //         }
                            //     }]
                            // },
                    ]
                }
            ]
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockin_M_Edit_D',
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
        iconCls: 'x-fa fa-save',
        itemId:'btnLuu',
        ui: 'action',
    }],
    bbar: [
        {
            xtype: 'textfield',
            itemId: 'maNPLFilter',
            label: 'Mã NPL:',
            labelWidth: 85,
            flex: 1,
            minWidth: 80,
            maxWidth: 200,
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
    ]
});