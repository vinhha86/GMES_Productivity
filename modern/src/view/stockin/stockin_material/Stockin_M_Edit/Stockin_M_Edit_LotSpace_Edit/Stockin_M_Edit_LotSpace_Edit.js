Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_LotSpace_Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_LotSpace_Edit',
    itemId:'Stockin_M_Edit_LotSpace_Edit',
    cls: 'Stockin_M_Edit_LotSpace_Edit',
    reference: 'Stockin_M_Edit_LotSpace_Edit',
    viewModel: {
        type: 'Stockin_M_Edit_LotSpace_EditViewModel'
    },
    controller: 'Stockin_M_Edit_LotSpace_EditController',
    // title: 'Login',

    // bodyPadding: 20,
    layout : 'vbox',
    // width: 160,
    autoSize: true,

    items: [
        {
            margin: 1,
            xtype: 'Stockin_M_Edit_LotSpace_Edit_Info'
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockin_M_Edit_LotSpace_Edit_List'
        },
        {
            layout : 'hbox',
            margin: 1,
            items:[
                {
                    xtype: 'textfield',
                    // reference: 'cboorgto',
                    editable: false,
                    readOnly: true,
                    bind:{
                        value:'{lotSpace}'
                    },
                    // label: 'Số lượng:',
                    textAlign: 'left',
                    placeholder: 'Khoang',
                    textAlign: 'right',
                    hideTrigger:true,
                    cls: 'notEditable',
                    clearable: false,
                    // labelWidth: 100,
                    // width: 280,
                    flex: 1,
                    padding: '0 3 0 1'
                },
                {
                    xtype: 'numberfield',
                    itemId: 'lotSpaceAmount',
                    // reference: 'cboorgto',
                    // editable: false,
                    // readOnly: true,
                    bind:{
                        value:'{lotSpaceAmount}'
                    },
                    // label: 'Số lượng:',
                    textAlign: 'left',
                    placeholder: 'Số cây',
                    textAlign: 'right',
                    hideTrigger:true,
                    // cls: 'notEditable',
                    // clearable: true,
                    // labelWidth: 100,
                    // width: 280,
                    flex: 1,
                    padding: '0 1 0 3'
                }
            ]
        },
],

    buttons: [
        {
            text: 'Thoát',
            itemId: 'btnThoat'
        },
        {
            text: 'Lưu',
            itemId: 'btnLuu'
        }
]
});