Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_PackingListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_PackingListController',
	init: function() {
        var viewModel = this.getViewModel();
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                // newdata: 'onNewData',
				// urlBack:'onUrlBack'
            }
        }
	},
    control:{
        '#btnBack':{
            tap: 'onBackPage'
        },
        '#btnCheck':{
            tap: 'onCheck'
        },
        '#btnLuu':{
            tap: 'onSave'
        }
    },
    onUrlBack: function(type){
        
    },
    onLoadData:function(id,type){
        // console.log('onLoadData: ' + id + ' ' + type);
        var viewModel = this.getViewModel();

        this.getInfo(id);
    },
    onBackPage: function(){
        // console.log('onBackPage');
        var viewModel = this.getViewModel();
        var stockinD = viewModel.get('stockinD');
        var stockinId = stockinD.stockinid_link;
        if(stockinId != null)
            this.redirectTo('stockin_m_main/'+stockinId+'/edit');
    },
    getInfo: function(id){
        var me = this;
        var viewModel = this.getViewModel();

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockind_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                // console.log(response);
                viewModel.set('stockinD', response.data);
                viewModel.set('stockin', response.stockin);
                
                // for(var i=0; i<response.listepc.length; i++){
                //     listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                // }
                // store.setData(response.data.stockin_d);

                // // set store org from
                // if(response.data.stockintypeid_link == 1) {// mua moi va cap bu thi là nha cung cap
                //     var orgfromstore = viewModel.getStore('OrgFromStore');
                //     orgfromstore.loadStore(5, false);
                // }else{
                //     var listidtype = "13,4,8,9";
                //     var orgfromstore = viewModel.getStore('OrgFromStore');
                //     orgfromstore.loadStore_byRoot(listidtype);
                // }
            }
		})
    },

    onlotnumberTxtKeyup: function(){
        var m = this;
        var viewModel = this.getViewModel();

        var lotnumberTxt = viewModel.get('lotnumberTxt');
        var packageidTxt = viewModel.get('packageidTxt');

        if(lotnumberTxt == '' || lotnumberTxt == null){
            return;
        }else if(packageidTxt == '' || packageidTxt == null){
            return;
        }else{
            m.getValueForYTxt(lotnumberTxt, packageidTxt);
        }
    },
    onpackageidTxtKeyup: function(){
        var m = this;
        var viewModel = this.getViewModel();

        var lotnumberTxt = viewModel.get('lotnumberTxt');
        var packageidTxt = viewModel.get('packageidTxt');
        
        if(lotnumberTxt == '' || lotnumberTxt == null){
            return;
        }else if(packageidTxt == '' || packageidTxt == null){
            return;
        }else{
            m.getValueForYTxt(lotnumberTxt, packageidTxt);
        }
    },
    getValueForYTxt: function(lotnumberTxt, packageidTxt){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        for(var i = 0; i < stockinD.stockin_packinglist.length; i++){
            var stockin_packinglist = stockinD.stockin_packinglist[i];
            if(stockin_packinglist.lotnumber == lotnumberTxt && stockin_packinglist.packageid == packageidTxt){
                viewModel.set('yTxt', stockin_packinglist.ydsorigin);
            }
        }
    },
    onCheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        var lotnumberTxt = viewModel.get('lotnumberTxt');
        var packageidTxt = viewModel.get('packageidTxt');
        var yTxt = viewModel.get('yTxt');

        if(isNaN(yTxt)){
            Ext.toast('Số Y phải là số', 1000);
            return;
        }

        // console.log(stockin);
        // console.log(stockinD);

        var view = Ext.getCmp('Stockin_M_Edit_PackingList_D');
        var store = view.getStore(); // console.log(store);
        var items = store.getData().items;  console.log(items);

        for(var i = 0; i < items.length; i++){
            var item = items[i];
            if(item.get('lotnumber') == lotnumberTxt && item.get('packageid') == packageidTxt){
                var ydscheck = Ext.util.Format.number(parseFloat(yTxt), '0.00');
                var met_check = Ext.util.Format.number(ydscheck * 0.9144, '0.00');
                item.set('ydscheck', ydscheck);
                item.set('met_check', met_check);

                if(item.get('ydscheck') == item.get('ydsorigin')){
                    item.set('warning', 'warning0');
                }else{
                    item.set('warning', 'warning1');
                }

                viewModel.set('lotnumberTxt', '');
                viewModel.set('packageidTxt', '');
                viewModel.set('yTxt', '');

                m.getView().down('#lotnumberTxt').focus();

                m.setDataStockin();

                // console.log(stockin);
                // console.log(stockinD);
            }
        }

    },
    setDataStockin: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        var stockin_d = stockin.stockin_d;

        for(var i = 0; i < stockin_d.length; i++){
        var stockinD = viewModel.get('stockinD');
            if(stockin_d[i].id == stockinD.id){
                stockin_d[i].stockin_packinglist = stockinD.stockin_packinglist;
            }
        }

        // console.log(stockin);
        // console.log(stockinD);
    },
    onSave: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = [];
        var stockin = viewModel.get('stockin');

        var stockin_d = stockin.stockin_d;
        if(stockin_d != null){
            for(var i = 0; i < stockin_d.length; i++){
                if(stockin_d[i].id == 0 || typeof stockin_d[i].id === 'string'){
                    stockin_d[i].id = null;
                }

                var stockin_packinglist = stockin_d[i].stockin_packinglist;
                if(stockin_packinglist != null){
                    for(var j = 0; j < stockin_packinglist.length; j++){
                        if(stockin_packinglist[j].id == 0 || typeof stockin_packinglist[j].id === 'string'){
                            stockin_packinglist[j].id = null;
                        }
                        if(stockin_packinglist[j].stockindid_link == 0 || typeof stockin_packinglist[j].stockindid_link === 'string'){
                            stockin_packinglist[j].stockindid_link = null;
                        }
                    }
                }
            }
        }
        // console.log(stockin);
        params.data.push(stockin);
        // me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create_material', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 2000);
                        this.redirectTo("stockin_m_main/" + response.id + "/edit");
                        // m.getInfo(response.id);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi lập phiếu: ' + response.message, 2000);
                }
        })
    }
})