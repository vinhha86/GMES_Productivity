Ext.define('GSmartApp.view.personel.Personnel_info_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_info_ViewController',
    init: function () {
      var viewmodel = this.getViewModel();

      var TypeStore = viewmodel.getStore('PersonnelTypeStore');
      TypeStore.loadStore();

      var OrgManagerStore = viewmodel.getStore('OrgManagerStore');
      var listid = '1,13';
      OrgManagerStore.loadStore_allchildren_byorg(listid);

      var OrgCountryStore = viewmodel.getStore('OrgCountryStore');
      OrgCountryStore.loadStore(24, false);
    },
    control: {
      '#cmbDonViQuanLy' : {
        select: 'onSelectDVQL'
      }
    },
    onSelectDVQL: function(combo, record, e){
      var viewmodel = this.getViewModel();

      var OrgStore = viewmodel.getStore('OrgStore');
      var listid = '22,14';
      OrgStore.getbyParentandType(record.data.id, listid);
    }
})