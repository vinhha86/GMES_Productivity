Ext.define('GSmartApp.view.handover.HandoverCutTolineDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_cut_toline_edit',
    id: 'handover_cut_toline_edit',
    reference: 'handover_cut_toline_edit',
    viewModel: {
        type: 'HandoverDetailViewModel'
    },
    controller: 'HandoverCutTolineDetailController',
    // title: 'Xuất BTP lên chuyền',
    layout: 'vbox',
    // layout: 'fit',

    requires: [
        'Ext.Toast'
    ],

    items: [{
        layout: 'hbox',
        // docked : 'top',
        defaults: {
            margin:'2 2 0 2'
        },
        items: [{
            layout: 'vbox',
            flex: 1,
            items: [{
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
                    // editable: false,
                    // readOnly: true,
                    cls: 'notEditable',
                    bind: {
                        value: '{currentRec.handover_code}'
                    },
                },{
                    xtype: 'datefield',
                    label: 'Ngày:',
                    labelWidth: 55,
                    flex: 1,
                    textAlign: 'left',
                    dateFormat : 'd/m/y',
                    // editable: false,
                    // readOnly: true,
                    cls: 'notEditable',
                    bind: {
                        value: '{currentRec.handover_date}'
                    }
                }]
            },{
                layout: 'hbox',
                flex: 1,
                defaults: {
                    margin: 1
                },
                items: [{
                    xtype: 'combobox',
                    // reference: 'cboorgto',
                    // editable: false,
                    // readOnly: true,
                    cls: 'notEditable',
                    bind:{
                        // store:'{ListOrgStore_To}',
                        // value:'{currentRec.orgid_to_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    label: 'Nơi giao:',
                    labelWidth: 85,
                    flex: 1,
                },{
                    xtype: 'textfield',
                    label: 'Ng/giao:',
                    labelWidth: 85,
                    flex: 1,
                    textAlign: 'left',
                    editable: false,
                    readOnly: true,
                    cls: 'notEditable',
                    bind: {
                        // value: '{currentRec.handoverProductBuyercode}'
                    }
                }]
            },{
                layout: 'hbox',
                flex: 1,
                defaults: {
                    margin: 1
                },
                items: [{
                    xtype: 'combobox',
                    // reference: 'cboorgto',
                    // editable: false,
                    // readOnly: true,
                    bind:{
                        store:'{ListOrgStore_To}',
                        value:'{currentRec.orgid_to_link}'
                    },
                    displayField: 'code',
                    valueField: 'id',
                    label: 'Nơi nhận:',
                    labelWidth: 85,
                    flex: 1,
                },{
                    xtype: 'textfield',
                    label: 'Ng/nhận:',
                    labelWidth: 85,
                    flex: 1,
                    textAlign: 'left',
                    editable: false,
                    readOnly: true,
                    cls: 'notEditable',
                    bind: {
                        // value: '{currentRec.handoverProductBuyercode}'
                    }
                }]
            },{
                layout: 'hbox',
                flex: 1,
                defaults: {
                    margin: 1
                },
                items: [{
                    xtype: 'textfield',
                    label: 'Mã lệnh:',
                    labelWidth: 85,
                    flex: 1,
                    textAlign: 'left',
                    // editable: false,
                    // readOnly: true,
                    bind: {
                        value: '{currentRec.handoverProductBuyercode}'
                    }
                },{
                    xtype:'button',
                    // text: 'Xác nhận xuất',
                    margin: 2,
                    // itemId:'btnHandover',
                    ui: 'action',
                    iconCls: 'x-fa fa-plus',
                },{
                    xtype:'button',
                    // text: 'Xác nhận xuất',
                    margin: 2,
                    // itemId:'btnHandover',
                    ui: 'action',
                    iconCls: 'x-fa fa-search',
                }]
            },{
                layout: 'hbox',
                flex: 1,
                defaults: {
                    margin: 1
                },
                items: [{
                    xtype: 'textfield',
                    label: 'Lý do:',
                    labelWidth: 85,
                    flex: 1,
                    textAlign: 'left',
                    // editable: false,
                    // readOnly: true,
                    bind: {
                        // value: '{currentRec.handoverProductBuyercode}'
                    }
                }]
            },{
                layout: 'hbox',
                flex: 1,
                defaults: {
                    margin: 1
                },
                items: [{
                    xtype: 'textfield',
                    label: 'Ghi chú:',
                    labelWidth: 85,
                    flex: 1,
                    textAlign: 'left',
                    // editable: false,
                    // readOnly: true,
                    bind: {
                        // value: '{currentRec.handoverProductBuyercode}'
                    }
                }]
            },{
                layout: 'hbox',
                flex: 1,
                defaults: {
                    margin: 1
                },
                items: [{
                    xtype: 'numberfield',
                    // reference: 'cboorgto',
                    // editable: false,
                    // readOnly: true,
                    bind:{
                        value:'{handoverProduct.totalpackage}'
                    },
                    label: 'SL giao:',
                    textAlign: 'right',
                    hideTrigger:true,
                    labelWidth: 85,
                    flex: 1,
                },{
                    xtype: 'numberfield',
                    // reference: 'cboorgto',
                    // editable: false,
                    // readOnly: true,
                    bind:{
                        value:'{handoverProduct.totalpackagecheck}'
                    },
                    label: 'SL nhận:',
                    textAlign: 'right',
                    hideTrigger:true,
                    labelWidth: 85,
                    flex: 1,
                }]
            },]
        }]
    },
    {
        // region: 'center',
        border: false,
        height: '200px',
        xtype: 'HandoverDetail',
        id: 'handover_cut_toline_detail',
    },
    {
        layout: 'hbox',
        docked : 'bottom',
        items: [{
            // xtype:'button',
            // text: 'Nơi nhận xác thực',
            // itemId:'btn1',
            // ui: 'action',
            // // iconCls: 'x-fa fa-plus',
            // formBind: false,
            flex: 1,
        },{
            // xtype:'button',
            // text: 'Huỷ xác thực nhận',
            // itemId:'btn2',
            // ui: 'action',
            // // iconCls: 'x-fa fa-plus',
            // formBind: false,
            // flex: 1,
        },{
            xtype:'button',
            text: 'Xác nhận xuất',
            margin: 2,
            itemId:'btnHandover',
            ui: 'action',
            iconCls: 'x-fa fa-check',
            // bind: {
            //     hidden: '{isBtnConfirmOutHidden}'
            // }
        },{
            xtype:'button',
            text: 'Xóa',
            margin: 2,
            itemId:'btnDelete',
            ui: 'action',
            iconCls: 'x-fa fa-trash',
            // bind: {
            //     hidden: '{isBtnDeleteHidden}'
            // }
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 2,
            itemId:'btnSave',
            ui: 'action',
            iconCls: 'x-fa fa-save',
            formBind: false,
            // flex: 1,
        }]
    }],
});