Ext.define('GSmartApp.view.stock.StockSpace', {
    extend: 'Ext.form.Panel',
    xtype: 'StockSpace',
    itemId:'StockSpace',
    controller: 'StockSpaceController',
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
            store:'{ListKhoSpaceStore}',
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
        itemId: 'txtFieldSpacename',
        margin: 5,
        fieldLabel: 'Hàng ('+ '<span style="color:red">*</span>' + ')',
        // allowBlank: false,
        // blankText : 'Không được để trống',
        maxLength: 20,
        maxLengthText: 'Tối đa 20 ký tự',
        bind:{
            value:'{spaceObj.spacename}'
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
            itemId:'btnLuuSpace',
            iconCls: 'x-fa fa-save',
            // bind: {
            //     disabled: '{isBtnRowSaveDisabled}'
            // },
            // formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})