Ext.define('GSmartApp.view.stock.StockDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'StockDetail',
    itemId:'StockDetail',
    controller: 'StockDetailController',
    layout: 'vbox',
    bind:{
        // title: '{title}',
        // hidden : '{!fieldState}'
    },
    // orgtypeid_link, parentid_link, linecost, colorid_link
    items: [{
        width:400,
        margin: 5,
        labelWidth: 105,
        xtype: 'combobox',
        fieldLabel: 'Kho',
        bind:{
            store:'{ListKhoStore}',
            value:'{spaceObj.orgid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        editable: false,
        allowBlank: false,
        readOnly: true
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'EPC ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        bind:{
            value:'{spaceObj.spaceepc}'
        },
        width: 400,
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Hàng ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 10,
        maxLengthText: 'Tối đa 10 ký tự',
        bind:{
            value:'{spaceObj.spacename}'
        },
        width: 400,
        labelWidth: 105,
        maskRe: /[0-9]/,
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Tầng ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        maxLength: 2,
        maxLengthText: 'Tối đa 2 ký tự',
        bind:{
            value :'{spaceObj.floorid}'
        },
        width: 400,
        labelWidth: 105,
        maskRe: /[0-9]/,
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})