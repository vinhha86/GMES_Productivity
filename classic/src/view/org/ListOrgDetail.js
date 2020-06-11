Ext.define('GSmartApp.view.org.ListOrgDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'ListOrgDetail', // same with database, 'PortDetailView' shows error
    id:'ListOrgDetail',
    controller: 'ListOrgDetailController',
    // viewModel:{
    //     type:'UnitViewModel'
    // },
    layout: 'vbox',
    bind:{
        title: '{title}'
    },
    // orgtypeid_link, parentid_link, linecost, colorid_link
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
        // itemId: 'code',
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
        fieldLabel: 'Thành phố ',
        allowBlank: true,
        // blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.city}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Địa chỉ ',
        allowBlank: true,
        // blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.address}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Người đại diện ',
        allowBlank: true,
        // blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.contactperson}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Email ',
        allowBlank: true,
        // blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.email}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Điện thoại ',
        allowBlank: true,
        // blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.phone}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'numberfield',
        margin: 5,
        fieldLabel: 'Line Cost ',
        allowBlank: true,
        // blankText : 'Không được để trống',
        bind:{
            value :'{currentRec.linecost}'
        },
        width: 400,
        labelWidth: 105
    },{
        width:400,
        margin: 5,
        labelWidth: 105,
        xtype: 'combobox',
        fieldLabel: 'Loại đơn vị ',
        bind:{
            store:'{OrgTypeStore}',
            value:'{currentRec.orgtypeid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        editable: false
    },{
        width:400,
        margin: 5,
        labelWidth: 105,
        xtype: 'combobox',
        fieldLabel: 'Màu đại diện ',
        bind:{
            store:'{ColorStore}',
            value:'{currentRec.colorid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        editable: false
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thêm đơn vị mới',
            margin: 3,
            itemId:'btnThemDonViMoi',
            iconCls: 'x-fa fa-plus',
            formBind: false
        },{
            xtype:'button',
            text: 'Thêm đơn vị trực thuộc',
            margin: 3,
            itemId:'btnThemDonViTrucThuoc',
            iconCls: 'x-fa fa-plus',
            formBind: false,
            bind:{
                disabled:'{btnXoaState}'
            }
        },{
            xtype:'button',
            text: 'Xoá',
            margin: 3,
            itemId:'btnXoa',
            iconCls: 'x-fa fa-trash',
            formBind: false,
            bind:{
                disabled:'{btnXoaState}'
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
            formBind: true
        }]
    }]
})