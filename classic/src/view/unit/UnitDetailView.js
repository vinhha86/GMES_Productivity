Ext.define('GSmartApp.view.unit.UnitDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'UnitDetailView', // same with database, 'PortDetailView' shows error
    id:'UnitDetailView',
    controller: 'UnitDetailViewController',
    viewModel:{
        type:'UnitViewModel'
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
        fieldLabel: 'Tên đơn vị ('+ '<span style="color:red">*</span>' + ')',
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
        fieldLabel: 'Tên đơn vị tiếng Anh ',
        allowBlank: true,
        // blankText : 'Không được để trống',
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