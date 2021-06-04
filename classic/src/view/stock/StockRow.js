Ext.define('GSmartApp.view.stock.StockRow', {
    extend: 'Ext.form.Panel',
    xtype: 'StockRow',
    itemId:'StockRow',
    controller: 'StockRowController',
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
            store:'{ListPhanXuongStore}',
            value:'{phanxuong_orgid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        editable: false,
        allowBlank: false,
        readOnly: true
    },{
        xtype:'textfield',
        itemId: 'txtFieldCode',
        margin: 5,
        fieldLabel: 'Dãy ('+ '<span style="color:red">*</span>' + ')',
        // allowBlank: false,
        // blankText : 'Không được để trống',
        maxLength: 20,
        maxLengthText: 'Tối đa 20 ký tự',
        bind:{
            value:'{rowObj.code}'
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
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuuRow',
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