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
    return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
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
        me.down('#width').focus();
      }
      else if (field.itemId == "width") {
        this.CreatePackingList();
      }
    }
  },
  CreatePackingList: function () {
    var me = this.getView();
    var mes = "";
    var item = "";
    var viewmodel = this.getViewModel();
    var invoiceid_link = viewmodel.get('packinglist.invoiceid_link');
    var invoicedid_link = viewmodel.get('packinglist.invoicedid_link');
    // console.log(invoiceid_link);
    // console.log(invoicedid_link);

    if(viewmodel.get('packinglist.lotnumber') == '' == null || viewmodel.get('packinglist.lotnumber') == ''){
      mes = "Bạn chưa chọn số lót";
      Ext.MessageBox.show({
        title: "Thông báo",
        msg: mes,
        buttons: Ext.MessageBox.YES,
        buttonText: {
          yes: 'Đóng',
        }
      });
      return;
    }else{
      var params = new Object();
      var me = this.getView();
      params.data = viewmodel.get('packinglist');

      GSmartApp.Ajax.postJitin('/api/v1/invoice/invoice_insertpkl', Ext.JSON.encode(params),
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
              viewmodel.set('packinglist.width', '');

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
  },
  onXoa: function(grid, rowIndex, colIndex){
    var me = this;
    var viewmodel = this.getViewModel();
    var store = grid.getStore();
    var data = store.getAt(rowIndex);

    // console.log(data.get('id'));

    Ext.Msg.show({
        title: 'Thông báo',
        msg: 'Bạn có chắc chắn xóa ?',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        buttonText: {
            yes: 'Có',
            no: 'Không'
        },
        fn: function (btn) {
            if (btn === 'yes') {
                me.Xoa(data.get('id'));
            }
        }
    });
  },
  Xoa: function (packinglistid_link){
    var viewmodel = this.getViewModel();

    var params = new Object();
    params.packinglistid_link = packinglistid_link;

    GSmartApp.Ajax.postJitin('/api/v1/invoice/deletePackingListById',Ext.JSON.encode(params),
        function(success,response,options ) {
                if (success) {
                  var viewInvoice = Ext.getCmp('InvoiceEdit');
                  viewInvoice.getController().getInfo(viewmodel.get('packinglist.invoiceid_link'));
    
                  var store = viewmodel.getStore('PackingListStore');
                  store.reload();
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Có lỗi trong quá trình xoá dữ liệu',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
        })
    
  },
  onPackingListItemEdit: function(editor, context, eOpts){
    var m = this;
    var me = this.getView();
    var store = me.getStore();
    var viewModel = this.getViewModel();
    var pkl_data = context.record.data;

    if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
        store.rejectChanges();
        return;
    }

    if(context.field == 'netweight'){
      pkl_data.netweight = parseFloat(pkl_data.netweight);
    }
    if(context.field == 'grossweight'){
      pkl_data.grossweight = parseFloat(pkl_data.grossweight);
    }
    if(context.field == 'ydsorigin'){
      pkl_data.ydsorigin = parseFloat(pkl_data.ydsorigin);
    }
    if(context.field == 'm3'){
      pkl_data.m3 = parseFloat(pkl_data.m3);
    }
    if(context.field == 'width'){
      pkl_data.width = parseFloat(pkl_data.width);
    }

    // console.log(pkl_data.id);
    // console.log(context.field);
    // console.log(context.value);

    var params = new Object();
    params.packinglistid_link = pkl_data.id;
    params.contextField = context.field;
    params.value = context.value;

    GSmartApp.Ajax.postJitin('/api/v1/invoice/updatePackingListById',Ext.JSON.encode(params),
        function(success,response,options ) {
                if (success) {
                  var viewInvoice = Ext.getCmp('InvoiceEdit');
                  viewInvoice.getController().getInfo(viewModel.get('packinglist.invoiceid_link'));
    
                  var store = viewModel.getStore('PackingListStore');
                  store.reload();
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