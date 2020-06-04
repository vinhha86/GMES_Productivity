Ext.define('GSmartApp.view.material.MaterialInfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'MaterialInfoView',
    id: 'MaterialInfoView',
    controller: 'MaterialInfoViewController',
    layout:'hbox',
	bodyPadding: 5,
    border: false,
    IdProduct: 0,
    items:[{
        layout:'vbox',
        border: false,
        flex: 1,
        items:[{
            layout:'hbox',
            width: '100%',
            items:[{
                xtype:'textfield',
                margin: 2,
                fieldLabel: "Mã nguyên liệu",
                bind:{
                    value : '{product.code}'
                },
                tooltip:'Nhập mã nguyên liệu',
                itemId:'code',
                name:'code',
                height: 32,
                allowBlank: false,
                blankText: 'Không được để trống',
                labelWidth: 110,
                flex: 1,
            },{
                xtype:'textfield',
                margin: 2,
                height: 32,
                flex: 1,
                tooltip:'Nhập tên nguyên liệu',
                fieldLabel: "Tên nguyên liệu",
                allowBlank: false,
                blankText: 'Không được để trống',
                bind:{
                    value : '{product.name}'
                },
                name:'name',
                labelWidth: 110
            }]
        },
        {
            layout:'hbox',
            width: '100%',
            border: false,
            items:[
                {
                    xtype:  'combo',
                    flex: 1,
                    margin: 2,
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    fieldLabel: "Loại nguyên liệu",
                    allowBlank: false,
                    labelWidth: 110,
                    blankText: 'Không được để trống',
                    bind:{
                        store: '{ProductTypeStore}',
                        value : '{product.producttypeid_link}'
                    }
                },                
                {
                    xtype:  'combo',
                    flex: 1,
                    margin: 2,
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    fieldLabel: "Đơn vị tính",
                    allowBlank: false,
                    labelWidth: 110,
                    blankText: 'Không được để trống',
                    bind:{
                        store: '{UnitStore}',
                        value : '{product.unitid_link}'
                    }
                }
            ]
        }]
    },{
        xtype:'MaterialImageView',
        margin: 2
    }]
})