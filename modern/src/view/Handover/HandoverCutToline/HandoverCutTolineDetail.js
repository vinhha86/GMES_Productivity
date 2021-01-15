Ext.define('GSmartApp.view.handover.HandoverCutTolineDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_cut_toline_edit',
    id: 'handover_cut_toline_edit',
    reference: 'handover_cut_toline_edit',
    viewModel: {
        type: 'HandoverDetailViewModel'
    },
    controller: 'HandoverCutTolineDetailController',
    title: 'Xuất BTP lên chuyền',
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        defaults: {
            margin:'5 5 0 5'
        },
        items: [{
            layout: 'vbox',
            flex: 1,
            defaults: {
                margin:'5 5 0 5'
            },
            items: [{
                xtype: 'textfield',
                label: 'Mã lệnh:',
                labelWidth: 100,
                flex: 1,
                textAlign: 'left',
                bind: {
                    value: '{pordercode}'
                },
                listeners: {
                    // change : 'loadData'
                }
            },{
                xtype: 'combobox',
                reference: 'cboorgto',
                bind:{
                    store:'{ListOrgStore_To}',
                    value:'{currentRec.orgid_to_link}'
                },
                displayField: 'code',
                valueField: 'id',
                label: 'Nơi nhận:',
                labelWidth: 100,
                flex: 1,
            }]
        },{
            xtype:'button',
            text: 'Tạo phiếu/<br/>Lưu phiếu',
            margin:'5 5 0 5',
            itemId:'btnThem',
            // iconCls: 'x-fa fa-plus',
            formBind: false
        }]
    },
    {
        // region: 'center',
        border: false,
        xtype: 'HandoverDetail',
        id: 'handover_cut_toline_detail',
    }],
});