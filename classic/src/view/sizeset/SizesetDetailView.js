Ext.define('GSmartApp.view.sizeset.SizesetDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'SizesetDetailView',
    id:'SizesetDetailView',
    controller: 'SizesetDetailViewController',
    viewModel:{
        type:'SizesetDetailViewModel'
    },
    layout: 'border',
    height: 500,
    items: [{
        region: 'north',
        xtype: 'SizesetInfoView',
        border: true,
        margin: 1
    }, {
        region: 'center',
        border : true,
        xtype: 'SizesetAttributeView',
        margin: 1
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-backward',
            // bind: {
            //     hidden: '{btnQuayLai}'
            // }
        },{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            xtype:'button',
            text: 'Lưu và tạo mới',
            margin: 3,
            itemId:'btnLuuVaTaoMoi',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
})