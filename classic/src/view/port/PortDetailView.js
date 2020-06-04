Ext.define('GSmartApp.view.Port.PortDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'portDetailView', // same with database, 'PortDetailView' shows error
    id:'PortDetailView',
    controller: 'PortDetailViewCotroller',
    viewModel:{
        type:'PortViewModel'
    },
    layout: 'vbox',
    bind:{
        title: '{title}'
    },
    items: [{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên tắt ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.code}'
        },
        width: 400,
        itemId: 'code',
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên cảng ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.name}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên cảng tiếng Anh('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.name_en}'
        },
        width: 400,
        labelWidth: 105
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
            iconCls: 'x-fa fa-backward'
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
        }]
    }]
})