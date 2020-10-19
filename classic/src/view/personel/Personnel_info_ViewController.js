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
    '#cmbDonViQuanLy': {
      change: 'onSelectDVQL'
    },
    '#cmbQuocTich': {
      change: 'onSelectQuocTich'
    },
    '#cmbThanhPho' : {
      change: 'onChangeThanhPho'
    },
    '#cmbQuanHuyen' : {
      change: 'onSelectQuanHuyen'
    }
  },
  onSelectDVQL: function (combo, newvalue, oldvalue, e) {
    var viewmodel = this.getViewModel();

    var OrgStore = viewmodel.getStore('OrgStore');
    var listid = '22,14,8,9,17';
    OrgStore.getbyParentandType(newvalue, listid);
  },
  onSelectQuocTich: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    var OrgProvinceStore  = viewmodel.getStore('OrgProvinceStore');
    var listid = '25';
    OrgProvinceStore.getbyParentandType(newvalue, listid);
  },
  onChangeThanhPho: function(combo, newvalue, oldValue, e){
    var viewmodel = this.getViewModel();
    var OrgDistrictStore  = viewmodel.getStore('OrgDistrictStore');
    var listid = '26';
    OrgDistrictStore.getbyParentandType(newvalue, listid);
  },
  onSelectQuanHuyen: function(combo, newvalue, oldValue, e){
    var viewmodel = this.getViewModel();
    var OrgCommuneStore  = viewmodel.getStore('OrgCommuneStore');
    var listid = '27';
    OrgCommuneStore.getbyParentandType(newvalue, listid);
  }
})