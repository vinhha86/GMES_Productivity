
Ext.define('GSmartApp.view.handoverlinetopack.HandoverLineToPackDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_line_topack_edit',
    id:'handover_line_topack_edit',
    controller: 'HandoverLineToPackDetailController',
    viewModel:{
        type:'HandoverLineToPackDetailViewModel'
    },
    layout: 'border',
    title: 'Xuất thành phẩm đến tổ hoàn thiện',
    items: [
        {
            region: 'north',
            height: 120,
            border: true,
            xtype: 'HandoverLineToPackDetail_Info'
        },
        {
            region: 'center',
            border: true,
            xtype: 'HandoverLineToPackDetail_ProductGrid'
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
                hidden: '{isBtnDeleteHidden}'
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