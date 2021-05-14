Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_D_PhieuKhoVai_PklController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_D_PhieuKhoVai_PklController',
    init: function () {
      var viewModel = this.getViewModel();
    },
    control: {
    //   '#lotnumber': {
    //     specialkey: 'onSpecialkey'
    //   },
    },
    renderSum: function (value) {
      if (null == value) value = 0;
      return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderCount: function (value) {
      if (null == value) value = 0;
      return '<div style="font-weight: bold; color:darkred;"> Tổng: ' + value + '</div>';
    },
})