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
  //lấy giá trị
     viewmodel.set('QuocTich.old',viewmodel.get('personnel.countryid_link'));
    viewmodel.set('Tinh.old',viewmodel.get('personnel.provinceid_link'));
    viewmodel.set('Huyen.old',viewmodel.get('personnel.districtid_link'));
    viewmodel.set('Xa.old',viewmodel.get('personnel.communeid_link'));
   
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
    '#checkmoto': {
      change: 'onCheckMotoBike'
    }
  },
  onCheckMotoBike: function (chk, newVal, oldVal, e) {
    var viewmodel = this.getViewModel();
    if ((viewmodel.get('isActive')))
      viewmodel.set('personnel.bike_number', "");
    viewmodel.set('isActive', true)
  },
  onUploadImage: function () {
    var me = this.getView();
    var viewmodel = this.getViewModel();
    console.log(viewmodel);
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
      //lấy danh sách thành phố
      OrgProvinceStore.GetOrg_By_type(listid)

    if(viewmodel.get('QuocTich.old') != null && viewmodel.get('QuocTich.old') != newvalue){
      viewmodel.set('personnel.provinceid_link',null);
      OrgProvinceStore.removeAll();
    }else{
      viewmodel.set('personnel.provinceid_link',viewmodel.get('Tinh.old'));
    }
  },
  onChangeThanhPho: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    var OrgDistrictStore = viewmodel.getStore('OrgDistrictStore');
  
    var listid = '26';
    var Tinh_id = newvalue;

    //thay đổi tỉnh 
    //nếu tỉnh khác dữ liệu ban đầu thì set huyện,xã = null
    //nếu tỉnh giống ban đầu thì set giá trị huyện, xã về như ban đầu.
    if(viewmodel.get('Tinh.old') != null && viewmodel.get('Tinh.old') != newvalue){
      viewmodel.set('personnel.districtid_link',null);
      OrgDistrictStore.removeAll();
    }else{
      viewmodel.set('personnel.districtid_link',viewmodel.get('Huyen.old'));
    }
   
    //lấy danh sách các huyện theo id tỉnh
    OrgDistrictStore.getbyParentandType(Tinh_id, listid);
    
  },
  onSelectQuanHuyen: function (combo, newvalue, oldValue, e) {
    var viewmodel = this.getViewModel();
    var OrgCommuneStore = viewmodel.getStore('OrgCommuneStore');
    var listid = '27';
    var Huyen_id = newvalue;


    if(viewmodel.get('Huyen.old') != null && viewmodel.get('Huyen.old') != newvalue){
      viewmodel.set('personnel.communeid_link',null);
      OrgCommuneStore.removeAll();
    }else {
       viewmodel.set('personnel.communeid_link',viewmodel.get('Xa.old'));
    }
    
    //lây danh sách xã theo id huyện
    OrgCommuneStore.getbyParentandType(Huyen_id, listid);
   
  }
})