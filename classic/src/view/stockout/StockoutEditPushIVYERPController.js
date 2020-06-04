Ext.define('GSmartApp.view.pprocess.StockoutEditPushIVYERPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockoutedit_pushivyerp',
    onActivate: function(){
        var grd_PushERPSku = this.lookupReference('grd_PushERPSku');
        var selModel = grd_PushERPSku.getSelectionModel(),
        records = this.getViewModel().get('listStockout').getRange(0, 0);
    
        selModel.select(records);
    },
    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectSku: function(e, selected){
        var txt_PushERPComment = this.lookupReference('txt_PushERPComment');
        txt_PushERPComment.setValue(selected[0].data.comment);
    },
    onUpdateComment: function(){
        var txt_PushERPComment = this.lookupReference('txt_PushERPComment');
        var grd_PushERPSku = this.lookupReference('grd_PushERPSku');
        if (grd_PushERPSku.getSelection())
            grd_PushERPSku.getSelection()[0].set('comment',txt_PushERPComment.getValue());
    },
    onPushERPButton: function(){
        var listStockout = this.getViewModel().get('listStockout');
        var ordercode = this.getViewModel().get('ordercode');
        listStockout.each(function(record) {
            var params=new Object();
            params.ordercode = ordercode;
            params.skucode = record.get('mainskucode');
            params.comment = record.get('comment');
    
            Ext.Ajax.request({
                 url: App.Utils.url+'/ivyadmin/api/v1/stockout/pushstockout_m',
                 method:'POST',
                 cors: true,
                 headers :{
                    'Accept': "application/json", 
                    'Content-Type':"application/json",
                    'authorization': 'Bearer ' + access_token
                 },
                 useDefaultXhrHeader: false,
                 params: Ext.JSON.encode(params),
                 success : function(response,options ) {
                    Ext.Msg.alert("Xuất cắt", "Đẩy lệnh điện tử thành công");
                 },
                 failure :function(response,options){
                    Ext.Msg.alert("Xuất cắt", "Lỗi đẩy lệnh điện tử");
                 }
             });            
        }, this);
    }
});
