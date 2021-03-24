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

    if (viewmodel.get('personnel.id') != null) {
      this.loadImage(viewmodel.get('personnel.id'));
    }
  },
  control: {
    '#cmbDonViQuanLy': {
      change: 'onSelectDVQL'
    },
    '#cmbQuocTich': {
      change: 'onSelectQuocTich'
    },
    '#cmbThanhPho': {
      change: 'onChangeThanhPho'
    },
    '#cmbQuanHuyen': {
      change: 'onSelectQuanHuyen'
    },
    '#btnUploadImage': {
      click: 'onUploadImage'
    },
    '#btnFile': {
      change: 'onSelect'
    },
    '#btnQR': {
      click: 'onQRShow'
    }
  },
  i: 0,
  onQRShow: function () {
    var me = this;
    var viewmodel = this.getViewModel();

    var grid = this.getView();
    var qrcode = grid.down('#qrcode');
    qrcode.onGenBase64();
    qrcode.text = viewmodel.get('personnel.fullname');
    qrcode.onRender();
    qrcode.onGenBase64();
  },
  onUploadImage: function () {
    var me = this.getView();
    var viewmodel = this.getViewModel();
    if (viewmodel.get('personnel.id') == null) {
      Ext.Msg.show({
        title: "Thông báo",
        msg: 'Bạn phải lưu thông tin nhân viên trước khi tải ảnh nhân viên!',
        buttons: Ext.MessageBox.YES,
        buttonText: {
          yes: 'Đóng',
        }
      });
      return;
    }

    me.down('#btnFile').fileInputEl.dom.click();
  },
  loadImage: function (id) {
    var viewmodel = this.getViewModel();
    var params = new Object();
    params.id = id;

    GSmartApp.Ajax.post('/api/v1/personnel/viewimage', Ext.JSON.encode(params),
      function (success, response, options) {
        if (success) {
          var response = Ext.decode(response.responseText);
          if (response.respcode == 200) {
            viewmodel.set('personnel.image', response.data);
          }
        }
      })
  },
  onSelect: function (m, value, eOpts) {
    var me = this.getView();
    var viewmodel = this.getViewModel();
    var data = new FormData();
    data.append('file', m.fileInputEl.dom.files[0]);
    data.append('id', viewmodel.get('personnel.id'));

    GSmartApp.Ajax.postUpload('/api/v1/personnel/upload_img', data,
      function (success, response, options) {
        if (success) {
          var response = Ext.decode(response.responseText);
          me.down('#img').setSrc('data:image/gif;base64,' + response.data);
        }
      })
  },
  onSelectDVQL: function (combo, newvalue, oldvalue, e) {
    var viewmodel = this.getViewModel();

    var OrgStore = viewmodel.getStore('OrgStore');
    var listid = '';
    if (newvalue == 1) {
      listid = "1";
    }
    else {
      listid = '22,14,8,9,17';
    }
    OrgStore.getbyParentandType(newvalue, listid);
  },
  onSelectQuocTich: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    var OrgProvinceStore = viewmodel.getStore('OrgProvinceStore');
    var listid = '25';
    OrgProvinceStore.getbyParentandType(newvalue, listid);
  },
  onChangeThanhPho: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    var OrgDistrictStore = viewmodel.getStore('OrgDistrictStore');
    var listid = '26';
    OrgDistrictStore.getbyParentandType(newvalue, listid);
  },
  onSelectQuanHuyen: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    var OrgCommuneStore = viewmodel.getStore('OrgCommuneStore');
    var listid = '27';
    OrgCommuneStore.getbyParentandType(newvalue, listid);
  }
})