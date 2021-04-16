Ext.define('GSmartApp.view.cutplan_processing.Stockin_M_Edit_LotAmountController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_LotAmountController',
    init: function() {
        var viewModel = this.getViewModel();
        var value = viewModel.get('value');
        // console.log('totalpackage: ' + totalpackage);
    },
    control: {
        '#btnLuu': {
            tap: 'onLuu'
        },
        '#btnThoat': {
            tap: 'onThoat'
        },
    },
    onLuu: function(){
        var viewModel = this.getViewModel();
        var value = viewModel.get('value');
        this.fireEvent('Luu', value);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
});
