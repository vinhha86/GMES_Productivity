Ext.define('GSmartApp.view.handover.HandoverDetailConfirm', {
    extend: 'Ext.form.Panel',
    xtype: 'HandoverDetailConfirm',
    id:'HandoverDetailConfirm',
    controller: 'HandoverDetailConfirmController',
    layout: 'vbox',
    width: '100%',
    items: [
        {
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tên đăng nhập',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{username}'
        },
        width: 300,
        itemId: 'username',
        labelWidth: 105,
    }, {
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Mật khẩu',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value :'{password}'
        },
        width: 300,
        itemId: 'password',
        labelWidth: 105,
        inputType: 'password'
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Xác thực',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        }]
    }]
})