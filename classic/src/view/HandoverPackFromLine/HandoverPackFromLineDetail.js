
Ext.define('GSmartApp.view.HandoverPackFromLine.HandoverPackFromLineDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_pack_fromline_edit',
    id:'handover_pack_fromline_edit',
    controller: 'HandoverLineToPackDetailController',
    viewModel:{
        type:'HandoverLineToPackDetailViewModel'
    },
    layout: 'border',
    title: 'Nhận thành phẩm vào tổ hoàn thiện',
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
            xtype:'button',
            text: 'Nơi nhận xác thực',
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
            iconCls: 'x-fa fa-times-circle',
            bind: {
                hidden: '{isBtnCancelConfirmHidden}'
            }
        },{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true,
            hidden: true
        }]
    }]
})