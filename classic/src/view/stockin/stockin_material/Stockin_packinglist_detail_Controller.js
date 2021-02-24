Ext.define('GSmartApp.view.stockin.Stockin_packinglist_detail_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_packinglist_detail_Controller',
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
  
      var store = me.getStore();
      var storeItems = store.getData().items;
  
      var found = storeItems.some(item => item.get('packageid') == me.down('#packageid').getValue());
  
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
          if(me.down('#packageid').getValue() == ''){
            me.down('#packageid').focus();
          }else if(found){
            // console.log('here yet');
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Số đã tồn tại',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                  if (btn === 'yes') {
                    me.down('#packageid').focus();
                  }
                }
            });
          }else{
            this.CreatePackingList();
          }
        }
      }
    },
    CreatePackingList: function(){
      var me = this.getView();
      var mes = "";
      var item = "";
      var viewModel = this.getViewModel();
      var stockinid_link = viewModel.get('packinglist.stockinid_link');
      var stockindid_link = viewModel.get('packinglist.stockindid_link');
      var skuid_link = viewModel.get('packinglist.skuid_link');
      var lotnumber = viewModel.get('packinglist.lotnumber');
  
      if(viewModel.get('packinglist.lotnumber') == null || viewModel.get('packinglist.lotnumber') == ''){
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
      }else if(me.down('#packageid').getValue() == ''){
        me.down('#packageid').focus();
      }else{
        // console.log('here');
        var stockin = viewModel.get('stockin');
        var stockin_d = viewModel.get('stockin.stockin_d');
        var stockinDRec = viewModel.get('stockinDRec');
        var packinglist = stockinDRec.get('stockin_packinglist');
        if(packinglist == null){
          packinglist = new Array();
          stockinDRec.set('stockin_packinglist', packinglist)
        }
  
        var packinglistObj = new Object();
        packinglistObj.stockinid_link = stockinid_link;
        packinglistObj.stockindid_link = stockindid_link;
        packinglistObj.skuid_link = skuid_link;
        packinglistObj.lotnumber = lotnumber;
        packinglistObj.packageid = me.down('#packageid').getValue();
        packinglistObj.ydsorigin = me.down('#ydsorigin').getValue() == '' ? 0 : parseFloat(me.down('#ydsorigin').getValue());
        packinglistObj.ydscheck = 0;
        packinglistObj.met_origin = packinglistObj.ydsorigin * 0.9144;
        packinglistObj.met_check = 0;
        packinglistObj.m3 = me.down('#m3').getValue() == '' ? 0 : parseFloat(me.down('#m3').getValue());
        packinglistObj.netweight = me.down('#netweight').getValue() == '' ? 0 : parseFloat(me.down('#netweight').getValue());
        packinglistObj.grossweight = me.down('#grossweight').getValue() == '' ? 0 : parseFloat(me.down('#grossweight').getValue());
        packinglistObj.width = me.down('#width').getValue() == '' ? 0 : parseFloat(me.down('#width').getValue());
        packinglistObj.width_check = 0;
        packinglistObj.status = -1;
        packinglistObj.checked = 0;
  
        packinglist.push(packinglistObj);
  
        packinglistStoreData = new Array();
        for(var i = 0; i < packinglist.length; i++){
          if(packinglist[i].lotnumber == lotnumber){
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
      }
      this.reCalculateSkuGrid();
    },
  
    onXoa: function(grid, rowIndex, colIndex){
      var me = this;
      var viewModel = this.getViewModel();
      var invoice = viewModel.get('invoice');
      var invoiceDRec = viewModel.get('invoiceDRec');
      var store = grid.getStore();
      var data = store.getAt(rowIndex);
  
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
                me.Xoa(data, store, rowIndex);
            }
        }
      });
    },
    Xoa: function(data, store, rowIndex){
      var me = this;
      var viewModel = this.getViewModel();
      var invoice = viewModel.get('invoice');
      var invoiceDRec = viewModel.get('invoiceDRec');
  
      var id = data.get('id');
      if(id == 0){
        // xoa tren grid
        store.removeAt(rowIndex);
  
        var packinglist = invoiceDRec.get('packinglist');
        for(var i = 0; i < packinglist.length; i++){
          if(packinglist[i].idx == data.get('idx')){
            packinglist.splice(i, 1);
            i--;
          }
        }
      }else{
        store.removeAt(rowIndex);
  
        var packinglist = invoiceDRec.get('packinglist');
        for(var i = 0; i < packinglist.length; i++){
          if(packinglist[i].idx == data.get('idx')){
            packinglist.splice(i, 1);
            i--;
          }
        }
      }
      this.reCalculateSkuGrid();
    },
    onPackingListItemEdit: function(editor, context, eOpts){
      // console.log('onPackingListItemEdit here');
      var m = this;
      var me = this.getView();
      var store = me.getStore();
      var viewModel = this.getViewModel();
      var pkl_data = context.record.data;
  
      if(context.value == "" || context.value == context.originalValue){
        if(
          (
          context.field == 'netweight' ||
          context.field == 'grossweight' ||
          context.field == 'ydsorigin' ||
          context.field == 'ydscheck' ||
          context.field == 'met_origin' ||
          context.field == 'met_check' ||
          context.field == 'm3' ||
          context.field == 'width' ||
          context.field == 'width_check'
          ) && isNaN(context.value)
        ){
          store.rejectChanges();
          return;
        }
      }
  
      if(context.field == 'netweight'){
        pkl_data.netweight = parseFloat(pkl_data.netweight);
      }
      if(context.field == 'grossweight'){
        pkl_data.grossweight = parseFloat(pkl_data.grossweight);
      }
      if(context.field == 'ydsorigin'){
        pkl_data.ydsorigin = parseFloat(pkl_data.ydsorigin);
        pkl_data.met_origin = pkl_data.ydsorigin * 0.9144;
      }
      if(context.field == 'ydscheck'){
        pkl_data.ydscheck = parseFloat(pkl_data.ydscheck);
        pkl_data.met_check = pkl_data.ydscheck * 0.9144;
      }
      if(context.field == 'met_origin'){
        pkl_data.met_origin = parseFloat(pkl_data.met_origin);
        pkl_data.ydsorigin = pkl_data.met_origin / 0.9144;
      }
      if(context.field == 'met_check'){
        pkl_data.met_check = parseFloat(pkl_data.met_check);
        pkl_data.ydscheck = pkl_data.met_check / 0.9144;
      }
      if(context.field == 'm3'){
        pkl_data.m3 = parseFloat(pkl_data.m3);
      }
      if(context.field == 'width'){
        pkl_data.width = parseFloat(pkl_data.width);
      }
      if(context.field == 'width_check'){
        pkl_data.width_check = parseFloat(pkl_data.width_check);
      }
  
      store.commitChanges();
      this.reCalculateSkuGrid();
    },
    onCheckchange: function(column, rowIndex, checked, record, e, eOpts){
      var m = this;
      var me = this.getView();
      var store = me.getStore();
      var viewModel = this.getViewModel();

      var stockinDRec = viewModel.get('stockinDRec');

      if(checked){
        var ydsorigin = record.get('ydsorigin');
        var width = record.get('width');
        var met_origin = record.get('met_origin');
        record.set('ydscheck', ydsorigin);
        record.set('met_check', met_origin);
        record.set('width_check', width);
        record.set('status', 0);
      }else{
        record.set('status', -1);
      }

      // console.log(record);
      // console.log(stockinDRec);

      store.commitChanges();
    },
    reCalculateSkuGrid: function(){
      var viewModel = this.getViewModel();
      var stockin = viewModel.get('stockin');
      var stockinDRec = viewModel.get('stockinDRec');
  
      // console.log(invoice);
      // console.log(invoiceDRec);
  
      var packinglist = stockinDRec.get('stockin_packinglist');
      if(packinglist != null){
        var totalpackage = 0;
        var netweight = 0;
        var grossweight = 0;
        var m3 = 0;
        var yds = 0;
        var ydscheck = 0;
        var met = 0;
        var metcheck = 0;
        
        for(var i = 0; i < packinglist.length; i++){
          totalpackage++;
          netweight+=packinglist[i].netweight;
          grossweight+=packinglist[i].grossweight;
          m3+=packinglist[i].m3;
          yds+=packinglist[i].ydsorigin;
          ydscheck+=packinglist[i].ydscheck;
          met+=packinglist[i].met_origin;
          metcheck+=packinglist[i].met_check;
        }
  
        stockinDRec.set('totalpackage', totalpackage);
        stockinDRec.set('netweight', netweight);
        stockinDRec.set('grossweight', grossweight);
        stockinDRec.set('m3', m3);
        stockinDRec.set('totalydsorigin', yds);
        stockinDRec.set('totalydscheck', ydscheck);
        stockinDRec.set('totalmet_origin', met);
        stockinDRec.set('totalmet_check', metcheck);
  
        Ext.getCmp('Stockin_M_Edit_D').getStore().commitChanges();
      }
    }
  })