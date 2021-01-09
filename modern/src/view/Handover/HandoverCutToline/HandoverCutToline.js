Ext.define('GSmartApp.view.handover.HandoverCutToline', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_cut_toline',
    id: 'handover_cut_toline',
    reference: 'handover_cut_toline',
    viewModel: {
        type: 'HandoverListViewModel'
    },
    controller: 'HandoverCutTolineController',
    title: 'Xuất BTP lên chuyền',
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        defaults: {
            margin:'5 5 0 5'
        },
        items: [{
            xtype: 'datefield',
            reference: 'fromDate',
            // placeholder: 'Mã SX',
            label: 'Từ:',
            labelWidth: 'auto',
            value: new Date(),
            dateFormat : 'd/m/y',
            flex: 1,
            enableKeyEvents: true,
            listeners: {
                change : 'loadData'
            }
        },{
            xtype: 'datefield',
            reference: 'toDate',
            // placeholder: 'Mã SX',
            label: 'Đến:',
            labelWidth: 'auto',
            value: new Date(),
            dateFormat : 'd/m/y',
            flex: 1,
            enableKeyEvents: true,
            listeners: {
                change : 'loadData'
            }
        },{
            xtype:'button',
            text: 'Thêm phiếu',
            margin: 3,
            itemId:'btnThem',
            // iconCls: 'x-fa fa-plus',
            formBind: false
        }]
    },
    {
        // region: 'center',
        border: false,
        xtype: 'HandoverList',
        id: 'handover_cut_tolinelist',
    }],
});