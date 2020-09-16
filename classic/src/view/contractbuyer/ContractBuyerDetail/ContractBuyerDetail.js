Ext.define('GSmartApp.view.contractbuyer.ContractBuyerDetail.ContractBuyerDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'ContractBuyerDetail',
    id:'ContractBuyerDetail',
    controller: 'ContractBuyerDetailController',
    viewModel:{
        type:'ContractBuyerViewModel'
    },
    layout: 'vbox',
    bind:{
        title: '{title}'
    },
    items: [{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Mã hợp đồng ('+ '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        blankText : 'Không được để trống',
        maxLength: 50,
        maxLengthText: 'Tối đa 50 ký tự',
        bind:{
            value :'{currentRec.contract_code}'
        },
        width: 400,
        itemId: 'contract_code',
        labelWidth: 105
    },{
        xtype:'textfield',
        margin: 5,
        fieldLabel: 'Năm hợp đồng',
        allowBlank: true,
        maskRe: /[0-9]/,
        maxLength: 4,
        maxLengthText: 'Tối đa 4 ký tự',
        bind:{
            value :'{currentRec.contract_year}'
        },
        width: 400,
        itemId: 'contract_year',
        labelWidth: 105
    },{
        xtype:'datefield',
        margin: 5,
        fieldLabel: 'Ngày hợp đồng',
        allowBlank: true,
        reference: 'contract_date',
        format: 'd/m/Y',
        bind:{
            value:'{currentRec.contract_date}'
        },
        // value: new Date(),
        width: 400,
        itemId: 'contract_date',
        labelWidth: 105
    },{
        xtype:'datefield',
        margin: 5,
        fieldLabel: 'Ngày kết thúc',
        allowBlank: true,
        reference: 'contract_date_finish',
        format: 'd/m/Y',
        bind:{
            value:'{currentRec.contract_date_finish}'
        },
        // value: new Date(),
        width: 400,
        itemId: 'contract_date_finish',
        labelWidth: 105
    },{
        xtype: 'combobox',
        margin: 5,
        fieldLabel: 'Buyer',
        bind:{
            store:'{EndBuyer}',
            value:'{currentRec.buyerid_link}'
        },
        displayField: 'code',
        valueField: 'id',
        queryMode: 'local',
        // editable: false,
        width:400,
        labelWidth: 105,
    },{
        xtype: 'combobox',
        margin: 5,
        fieldLabel: 'Vendor',
        bind:{
            store:'{Vendor}',
            value:'{currentRec.vendorid_link}'
        },
        displayField: 'code',
        valueField: 'id',
        queryMode: 'local',
        // editable: false,
        width:400,
        labelWidth: 105,
    },{
        xtype:'textarea',
        margin: 5,
        fieldLabel: 'Chú thích',
        reference: 'comment',
        // allowBlank: false,
        // blankText : 'Không được để trống',
        bind:{
            value:'{currentRec.comment}'
        },
        maxLength: 1000,
        maxLengthText: 'Tối đa 1000 ký tự',
        width: 400,
        height: 200,
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