
Ext.define('GSmartApp.view.handovercuttoprint.HandoverCutToPrintDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_cut_toprint_edit',
    id:'handover_cut_toprint_edit',
    controller: 'HandoverCutToPrintDetailController',
    viewModel:{
        type:'HandoverCutToPrintDetailViewModel'
    },
    layout: 'border',
    title: 'Xuất bán thành phẩm đi in thêu',
    items: [
        {
            region: 'north',
            height: 120,
            border: true,
            xtype: 'HandoverCutToPrintDetail_Info'
        },
        {
            region: 'center',
            border: true,
            xtype: 'HandoverCutToPrintDetail_ProductGrid'
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
            xtype:'button',
            text: 'Xác thực nhận về từ in thêu',
            margin: 3,
            itemId:'btnConfirm',
            iconCls: 'x-fa fa-check',
            bind: {
                hidden: '{isBtnConfirmInHidden}'
            }
        },{
            xtype:'button',
            text: 'Huỷ xác thực nhận',
            margin: 3,
            itemId:'btnCancelConfirm',
            iconCls: 'x-fa fa-check',
            bind: {
                hidden: '{isBtnCancelConfirmHidden}'
            }
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