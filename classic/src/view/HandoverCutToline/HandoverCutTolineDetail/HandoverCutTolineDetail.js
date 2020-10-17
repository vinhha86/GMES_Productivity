
Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_cut_toline_edit',
    id:'handover_cut_toline_edit',
    controller: 'HandoverCutTolineDetailController',
    viewModel:{
        type:'HandoverCutTolineDetailViewModel'
    },
    layout: 'border',
    title: 'Xuất bán thành phẩm lên chuyền',
    items: [
        {
            region: 'north',
            height: 120,
            border: true,
            xtype: 'HandoverCutTolineDetail_Info'
        },
        {
            region: 'center',
            border: true,
            xtype: 'HandoverCutTolineDetail_ProductGrid'
        }
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        },{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Người xuất xác nhận',
            margin: 3,
            itemId:'btnHandover',
            iconCls: 'x-fa fa-check',
            bind: {
                hidden: '{isBtnConfirmOutHidden}'
            }
        },{
            xtype:'button',
            text: 'Xóa',
            margin: 3,
            itemId:'btnDelete',
            iconCls: 'x-fa fa-trash',
            bind: {
                // hidden: '{isBtnConfirmInHidden}'
            }
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
})