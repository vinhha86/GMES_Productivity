
Ext.define('GSmartApp.view.HandoverLineFromCut.HandoverLineFromCutDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_line_fromcut_edit',
    id:'handover_line_fromcut_edit',
    controller: 'HandoverCutTolineDetailController',
    viewModel:{
        type:'HandoverCutTolineDetailViewModel'
    },
    layout: 'border',
    title: 'Nhận bán thành phẩm vào chuyền',
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
            xtype:'button',
            text: 'Nơi nhận xác nhận',
            margin: 3,
            itemId:'btnConfirm',
            iconCls: 'x-fa fa-check',
            bind: {
                hidden: '{isBtnConfirmInHidden}'
            }
        },{
            xtype:'button',
            text: 'Huỷ xác nhận',
            margin: 3,
            itemId:'btnCancelConfirm',
            iconCls: 'x-fa fa-times-circle',
            bind: {
                hidden: '{!isBtnConfirmInHidden}'
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