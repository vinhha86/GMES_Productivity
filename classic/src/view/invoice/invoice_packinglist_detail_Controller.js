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
    '#width': {
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
        me.down('#m3').focus();
      }
      else if (field.itemId == "m3") {
        me.down('#width').focus();
      }
      else if (field.itemId == "width") {
        me.down('#ydsorigin').focus();
      }
      else if (field.itemId == "ydsorigin") {
        // console.log('enter');
        this.CreatePackingList();
      }
    }
  },
  CreatePackingList: function(){
    var me = this.getView();
    var mes = "";
    var item = "";
    var viewModel = this.getViewModel();
    var invoiceid_link = viewModel.get('packinglist.invoiceid_link');
    var invoicedid_link = viewModel.get('packinglist.invoicedid_link');
    var skuid_link = viewModel.get('packinglist.skuid_link');
    var lotnumber = viewModel.get('packinglist.lotnumber');
    var sizenumber = viewModel.get('packinglist.sizenumber');

    if(viewModel.get('packinglist.lotnumber') == '' == null || viewModel.get('packinglist.lotnumber') == ''){
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
      // console.log('here');
      var invoice = viewModel.get('invoice');
      var invoiced = viewModel.get('invoice.invoice_d');
      var invoiceDRec = viewModel.get('invoiceDRec');
      var packinglist = invoiceDRec.get('packinglist');
      if(packinglist == null){
        packinglist = new Array();
      }

      var packinglistObj = new Object();
      packinglistObj.invoiceid_link = invoiceid_link;
      packinglistObj.invoicedid_link = invoicedid_link;
      packinglistObj.skuid_link = skuid_link;
      packinglistObj.lotnumber = lotnumber;
      packinglistObj.sizenumber = sizenumber;
      packinglistObj.packageid = me.down('#packageid').getValue();
      packinglistObj.ydsorigin = me.down('#ydsorigin').getValue() == '' ? 0 : parseFloat(me.down('#ydsorigin').getValue());
      packinglistObj.m3 = me.down('#m3').getValue() == '' ? 0 : parseFloat(me.down('#m3').getValue());
      packinglistObj.netweight = me.down('#netweight').getValue() == '' ? 0 : parseFloat(me.down('#netweight').getValue());
      packinglistObj.grossweight = me.down('#grossweight').getValue() == '' ? 0 : parseFloat(me.down('#grossweight').getValue());
      packinglistObj.width = me.down('#width').getValue() == '' ? 0 : parseFloat(me.down('#width').getValue());

      packinglist.push(packinglistObj);

      packinglistStoreData = new Array();
      for(var i = 0; i < packinglist.length; i++){
        if(packinglist[i].lotnumber == lotnumber && packinglist[i].sizenumber == sizenumber){
          packinglistStoreData.push(packinglist[i]);
        }
      } 

      me.getStore().loadData(packinglistStoreData);
      me.getStore().commitChanges();

      me.down('#packageid').setValue('');
      me.down('#ydsorigin').setValue('');
      me.down('#m3').setValue('');
      me.down('#netweight').setValue('');
      me.down('#grossweight').setValue('');
      me.down('#width').setValue('');
      me.down('#packageid').focus();

      // for(var){

      // }

      console.log(invoice);
      console.log(invoiced);
      console.log(invoiceDRec);
      console.log(packinglist);
    }
  },
  // CreatePackingList: function () {
  //   var me = this.getView();
  //   var mes = "";
  //   var item = "";
  //   var viewmodel = this.getViewModel();
  //   var invoiceid_link = viewmodel.get('packinglist.invoiceid_link');
  //   var invoicedid_link = viewmodel.get('packinglist.invoicedid_link');
  //   // console.log(invoiceid_link);
  //   // console.log(invoicedid_link);

  //   if(viewmodel.get('packinglist.lotnumber') == '' == null || viewmodel.get('packinglist.lotnumber') == ''){
  //     mes = "Bạn chưa chọn số lót";
  //     Ext.MessageBox.show({
  //       title: "Thông báo",
  //       msg: mes,
  //       buttons: Ext.MessageBox.YES,
  //       buttonText: {
  //         yes: 'Đóng',
  //       }
  //     });
  //     return;
  //   }else{
  //     var params = new Object();
  //     var me = this.getView();
  //     params.data = viewmodel.get('packinglist');

  //     GSmartApp.Ajax.postJitin('/api/v1/invoice/invoice_insertpkl', Ext.JSON.encode(params),
  //       function (success, response, options) {
  //         if (success) {
  //           var response = Ext.decode(response.responseText);
  //           if (response.respcode == 200) {
  //             var viewInvoice = Ext.getCmp('InvoiceEdit');
  //             viewInvoice.getController().getInfo(viewmodel.get('packinglist.invoiceid_link'));

  //             var store = viewmodel.getStore('PackingListStore');
  //             store.reload();
  //             viewmodel.set('packinglist.packageid', '');
  //             viewmodel.set('packinglist.netweight', '');
  //             viewmodel.set('packinglist.grossweight', '');
  //             viewmodel.set('packinglist.ydsorigin', '');
  //             viewmodel.set('packinglist.m3', '');
  //             viewmodel.set('packinglist.width', '');

  //             me.down('#packageid').focus();
  //           }
  //         } else {
  //           var response = Ext.decode(response.responseText);
  //           Ext.MessageBox.show({
  //             title: "Thông báo",
  //             msg: 'Có lỗi trong quá trình lưu dữ liệu',
  //             buttons: Ext.MessageBox.YES,
  //             buttonText: {
  //               yes: 'Đóng',
  //             }
  //           });
  //         }
  //       })
  //   }
  // },
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
    // console.log('onPackingListItemEdit here');
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

    store.commitChanges();

    // console.log(pkl_data.id);
    // console.log(context.field);
    // console.log(context.value);
  },
  // onPackingListItemEdit: function(editor, context, eOpts){
  //   var m = this;
  //   var me = this.getView();
  //   var store = me.getStore();
  //   var viewModel = this.getViewModel();
  //   var pkl_data = context.record.data;

  //   if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
  //       store.rejectChanges();
  //       return;
  //   }

  //   if(context.field == 'netweight'){
  //     pkl_data.netweight = parseFloat(pkl_data.netweight);
  //   }
  //   if(context.field == 'grossweight'){
  //     pkl_data.grossweight = parseFloat(pkl_data.grossweight);
  //   }
  //   if(context.field == 'ydsorigin'){
  //     pkl_data.ydsorigin = parseFloat(pkl_data.ydsorigin);
  //   }
  //   if(context.field == 'm3'){
  //     pkl_data.m3 = parseFloat(pkl_data.m3);
  //   }
  //   if(context.field == 'width'){
  //     pkl_data.width = parseFloat(pkl_data.width);
  //   }

  //   // console.log(pkl_data.id);
  //   // console.log(context.field);
  //   // console.log(context.value);

  //   var params = new Object();
  //   params.packinglistid_link = pkl_data.id;
  //   params.contextField = context.field;
  //   params.value = context.value;

  //   GSmartApp.Ajax.postJitin('/api/v1/invoice/updatePackingListById',Ext.JSON.encode(params),
  //       function(success,response,options ) {
  //               if (success) {
  //                 var viewInvoice = Ext.getCmp('InvoiceEdit');
  //                 viewInvoice.getController().getInfo(viewModel.get('packinglist.invoiceid_link'));
    
  //                 var store = viewModel.getStore('PackingListStore');
  //                 store.reload();
  //               } else {
  //                   var response = Ext.decode(response.responseText);
  //                   Ext.MessageBox.show({
  //                       title: "Thông báo",
  //                       msg: 'Có lỗi trong quá trình lưu dữ liệu',
  //                       buttons: Ext.MessageBox.YES,
  //                       buttonText: {
  //                           yes: 'Đóng',
  //                       }
  //                   });
  //               }
  //       })
  // }
})