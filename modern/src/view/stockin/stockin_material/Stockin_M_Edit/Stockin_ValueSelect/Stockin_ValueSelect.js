Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_Edit.Stockin_ValueSelect.Stockin_ValueSelect', {
    extend: 'Ext.dataview.List',
    xtype: 'Stockin_ValueSelect',
    itemId: 'Stockin_ValueSelect',
    controller: 'Stockin_ValueSelect_Controller',
    viewModel: 'Stockin_ValueSelect_ViewModel',

    // height: 400,
    // width: 300,
    // loadingHeight: 400,
    itemTpl: '{value}',
    // store: 'List',
    grouped: false,
    bind: {
        store: '{listValue}'
    }
});