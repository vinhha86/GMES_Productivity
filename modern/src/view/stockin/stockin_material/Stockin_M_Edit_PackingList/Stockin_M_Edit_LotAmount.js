Ext.define('GSmartApp.view.cutplan_processing.Stockin_M_Edit_LotAmount', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_LotAmount',
    id:'Stockin_M_Edit_LotAmount',
    reference: 'Stockin_M_Edit_LotAmount',
    viewModel: {
        type: 'Stockin_M_Edit_LotAmountViewModel'
    },
    controller: 'Stockin_M_Edit_LotAmountController',
    // title: 'Login',

    // bodyPadding: 20,
    layout : 'center',
    // width: 160,
    autoSize: true,

    items: [{
        xtype: 'numberfield',
        // reference: 'cboorgto',
        // editable: false,
        // readOnly: true,
        bind:{
            value:'{value}',
            label: '{label}',
        },
        textAlign: 'right',
        hideTrigger:true,
        // clearable: false,
        labelWidth: 100,
        width: 220,
    }],

    buttons: [{
        text: 'Thoát',
        itemId: 'btnThoat'
    },{
        text: 'Lưu',
        itemId: 'btnLuu'
    }]
});