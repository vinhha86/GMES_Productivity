Ext.define('GSmartApp.view.sizeset.SizesetInfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'SizesetInfoView',
    id: 'SizesetInfoView',
    controller: 'SizesetInfoViewController',
    layout:'hbox',
	bodyPadding: 5,
    border: false,
    IdSizeset: 0,
    items:[{
        layout:'vbox',
        border: false,
        flex: 1,
        items:[
        {
            xtype:'textfield',
            margin: 1,
            fieldLabel: "Tên dải size",
            tooltip:'Nhập tên dải size',
            itemId:'infoname',
            name:'name',
            height: 32,
            width: 400,
            allowBlank: false,
            blankText: 'Không được để trống',
            bind:{
                value : '{sizeset.name}'
            },
            labelWidth: 110,
            listeners: {
                afterrender: function(field) {
                  field.focus(false, 1000);
                }
            }
        },{
            xtype:'textfield',
            margin: 1,
            height: 32,
            width: 400,
            fieldLabel: "Chú thích",
            tooltip:'Nhập chú thích',
            allowBlank: false,
            blankText: 'Không được để trống',
            bind:{
                value : '{sizeset.comment}'
            },
            name:'comment',
            labelWidth: 110
        }]
    }]
})