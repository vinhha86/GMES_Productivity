Ext.define('GSmartApp.view.invoice.invoice_packinglist_detail_Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.invoice_packinglist_detail_Controller',
  init: function () {
  },
  control: {
    '#packageid': {
      specialkey: 'onSpecialkey'
    },
    '#netweight': {
      specialkey: 'onSpecialkey'
    },
    '#grossweight': {
      specialkey: 'onSpecialkey'
    },
    '#ydsorigin': {
      specialkey: 'onSpecialkey'
    },
    '#m3': {
      specialkey: 'onSpecialkey'
    },
    '#btnThemPKL': {
      click: 'CreatePackingList'
    }
  },
  renderSum: function (value) {
    if (null == value) value = 0;
    return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
  },
  renderCount: function (value) {
    if (null == value) value = 0;
    return '<div style="font-weight: bold; color:darkred;"> Tổng: ' + value + '</div>';
  },
  onSpecialkey: function (field, e) {
    var me = this.getView();

    if (e.getKey() == e.ENTER) {
      if (field.itemId == "packageid") {
        me.down('#netweight').focus();
      }
      else if (field.itemId == "netweight") {
        me.down('#grossweight').focus();
      }
      else if (field.itemId == "grossweight") {
        me.down('#ydsorigin').focus();
      }
      else if (field.itemId == "ydsorigin") {
        me.down('#m3').focus();
      }
      else if (field.itemId == "m3") {
        this.CreatePackingList();
      }
    }
  },
  CreatePackingList: function () {
    var me = this.getView();
    var mes = "";
    var item = "";
    var viewmodel = this.getViewModel();

    if(viewmodel.get('packinglist.lotnumber') == ''){
      mes = "Bạn chưa chọn số lót";
    }
    else if(viewmodel.get('packinglist.lotnumber') == ''){
      mes = "Bạn chưa chọn số lót";
    }



    var params = new Object();
    var me = this.getView();
    params.data = viewmodel.get('packinglist');

    GSmartApp.Ajax.post('/api/v1/invoice/invoice_insertpkl', Ext.JSON.encode(params),
      function (success, response, options) {
        if (success) {
          var response = Ext.decode(response.responseText);
          if (response.respcode == 200) {
            var viewInvoice = Ext.getCmp('InvoiceEdit');
            viewInvoice.getController().getInfo(viewmodel.get('packinglist.invoiceid_link'));

            var store = viewmodel.getStore('PackingListStore');
            store.reload();
            viewmodel.set('packinglist.packageid', '');
            viewmodel.set('packinglist.netweight', '');
            viewmodel.set('packinglist.grossweight', '');
            viewmodel.set('packinglist.ydsorigin', '');
            viewmodel.set('packinglist.m3', '');

            me.down('#packageid').focus();
          }
        } else {
          var response = Ext.decode(response.responseText);
          Ext.MessageBox.show({
            title: "Thông báo",
            msg: 'Có lỗi trong quá trình lưu dữ liệu',
            buttons: Ext.MessageBox.YES,
            buttonText: {
              yes: 'Đóng',
            }
          });
        }
      })
  }
})