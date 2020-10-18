Ext.define('GSmartApp.view.personel.Personnel_info_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_info_ViewController',
    init: function () {
      var viewmodel = this.getViewModel();

      var TypeStore = viewmodel.getStore('PersonnelTypeStore');
      TypeStore.loadStore();
    }
})