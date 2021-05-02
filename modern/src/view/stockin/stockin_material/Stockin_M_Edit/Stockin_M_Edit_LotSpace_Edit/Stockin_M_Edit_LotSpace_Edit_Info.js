Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_LotSpace_Edit_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_LotSpace_Edit_Info',
    itemId: 'Stockin_M_Edit_LotSpace_Edit_Info',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    cls: 'Stockin_M_Edit_LotSpace_Edit_Info',
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_LotSpace_Edit_Info',

    items: [
        {
            xtype: 'textfield',
            label: 'Số lot:',
            bind: {
                value: '{lot_number}'
            },
        }, 
        {
            xtype: 'numberfield',
            label: 'SL cây:',
            bind: {
                value: '{totalpackage}'
            },
        }, 
        {
            xtype: 'numberfield',
            itemId: 'totalmet',
            label: 'Độ dài (M):',
            bind: {
                value: '{totalmet}',
                hidden: '{isMetColumnHidden}',
            },
        }, 
        {
            xtype: 'numberfield',
            itemId: 'totalyds',
            label: 'Độ dài (Y):',
            bind: {
                value: '{totalyds}',
                hidden: '{isYdsColumnHidden}',
            },
        }, 
        {
            xtype: 'numberfield',
            label: 'Cân nặng:',
            bind: {
                value: '{grossweight}'
            },
        }, 
    ]
});