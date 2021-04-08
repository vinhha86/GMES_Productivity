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
        '#btnHome':{
            tap: 'onBtnHomeTap'
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
    onBtnHomeTap: function(){
        this.redirectTo("mobilemenu");
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

                var attributeValueStore = viewModel.getStore('attributeValueStore');
                attributeValueStore.loadStore_colorForStockin(response.stockin.id);
                
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

        var isExist = false;
        for(var i = 0; i < stockinD.stockin_packinglist.length; i++){
            var stockin_packinglist = stockinD.stockin_packinglist[i];
            if(stockin_packinglist.lotnumber == lotnumberTxt && stockin_packinglist.packageid == packageidTxt){
                viewModel.set('yTxt', stockin_packinglist.ydsorigin);
                isExist = true;
            }
        }

        if(!isExist){
            viewModel.set('yTxtCls', 'yTxtClsYellowBG');
        }else{
            viewModel.set('yTxtCls', 'yTxtClsWhiteBG');
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
        var mTxt = viewModel.get('mTxt');
        var yOriginTxt = viewModel.get('yOriginTxt');
        var mOriginTxt = viewModel.get('mOriginTxt');
        // var colorTxt = viewModel.get('colorTxt');
        var widthTxt = viewModel.get('widthTxt');
        var sampleCheckTxt = viewModel.get('sampleCheckTxt');

        if(stockin.unitid_link == 3){
            if(widthTxt == '' || packageidTxt == '' || yTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, Khổ hoặc độ dài', 1000);
                return;
            }
            if(isNaN(yTxt)){
                Ext.toast('Số Y phải là số', 1000);
                return;
            }
        }
        if(stockin.unitid_link == 1){
            if(widthTxt == '' || packageidTxt == '' || mTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, Khổ hoặc độ dài', 1000);
                return;
            }
            if(isNaN(mTxt)){
                Ext.toast('Số M phải là số', 1000);
                return;
            }
        }

        if(yTxt == null || yTxt == '') yTxt = 0;
        if(mTxt == null || mTxt == '') mTxt = 0;
        if(yOriginTxt == null || yOriginTxt == '') yOriginTxt = 0;
        if(mOriginTxt == null || mOriginTxt == '') mOriginTxt = 0;
        if(sampleCheckTxt == null || sampleCheckTxt == '') sampleCheckTxt = 0;

        var view = Ext.getCmp('Stockin_M_Edit_PackingList_D');
        var store = view.getStore(); // console.log(store);
        var items = store.getData().items; console.log(items);

        var isExist = false;
        // lặp qua danh sách để tìm cây vải tương ứng
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            if(item.get('lotnumber') == lotnumberTxt && item.get('packageid') == packageidTxt){
                isExist = true;

                var ydscheck = 0;
                var met_check = 0;
                var ydsorigin = 0;
                var met_origin = 0;
                var sample_check = 0;
                if(stockin.unitid_link == 3){
                    ydscheck = Ext.util.Format.number(parseFloat(yTxt), '0.00');
                    met_check = Ext.util.Format.number(ydscheck * 0.9144, '0.00');
                    ydsorigin = Ext.util.Format.number(parseFloat(yOriginTxt), '0.00');
                    met_origin = Ext.util.Format.number(ydsorigin * 0.9144, '0.00');
                }
                if(stockin.unitid_link == 1){
                    met_check = Ext.util.Format.number(parseFloat(mTxt), '0.00');
                    ydscheck = Ext.util.Format.number(met_check / 0.9144, '0.00');
                    met_origin = Ext.util.Format.number(parseFloat(mOriginTxt), '0.00');
                    ydsorigin = Ext.util.Format.number(met_origin / 0.9144, '0.00');
                }

                sample_check = Ext.util.Format.number(parseFloat(sampleCheckTxt), '0.00');
                
                item.set('ydscheck', ydscheck);
                item.set('met_check', met_check);
                item.set('ydsorigin', ydsorigin);
                item.set('met_origin', met_origin);
                item.set('sample_check', sample_check);
                item.set('checked', 1);
                item.set('status', 0);

                if(item.get('ydscheck') == item.get('ydsorigin')){
                    item.set('warning', 'warning2');
                }else if(item.get('met_check') == item.get('met_origin')){
                    item.set('warning', 'warning2');
                }else{
                    item.set('warning', 'warning1');
                }
            }
        }

        // nếu ko có trong danh sách, thêm cây vải
        if(!isExist){
            var ydscheck = 0;
            var met_check = 0;
            var ydsorigin = 0;
            var met_origin = 0;
            var sample_check = 0;
            if(stockin.unitid_link == 3){
                ydscheck = Ext.util.Format.number(parseFloat(yTxt), '0.00');
                met_check = Ext.util.Format.number(ydscheck * 0.9144, '0.00');
                ydsorigin = Ext.util.Format.number(parseFloat(yOriginTxt), '0.00');
                met_origin = Ext.util.Format.number(ydsorigin * 0.9144, '0.00');
            }
            if(stockin.unitid_link == 1){
                met_check = Ext.util.Format.number(parseFloat(mTxt), '0.00');
                ydscheck = Ext.util.Format.number(met_check / 0.9144, '0.00');
                met_origin = Ext.util.Format.number(parseFloat(mOriginTxt), '0.00');
                ydsorigin = Ext.util.Format.number(met_origin / 0.9144, '0.00');
            }

            width_check = Ext.util.Format.number(parseFloat(widthTxt), '0.00');
            sample_check = Ext.util.Format.number(parseFloat(sampleCheckTxt), '0.00');

            var newObj = new Object();
            newObj.checked = 0;
            newObj.colorid_link = stockinD.colorid_link;
            newObj.comment = '';
            newObj.grossweight = 0;
            newObj.lotnumber = lotnumberTxt;
            newObj.m3 = 0;
            newObj.met_check = met_check;
            newObj.met_origin = met_origin;
            newObj.netweight = 0;
            newObj.orgrootid_link = stockinD.orgrootid_link;
            newObj.packageid = packageidTxt;
            newObj.status = -1;
            newObj.skucode = stockinD.skucode;
            newObj.skuid_link = stockinD.skuid_link;
            newObj.unitid_link = stockin.unitid_link;
            newObj.unitname = stockinD.unit_name;
            newObj.warning = 'warning0';
            newObj.width = 0;
            newObj.width_check =width_check;
            newObj.ydscheck = ydscheck;
            newObj.ydsorigin = ydsorigin;
            newObj.sample_check = sample_check;

            // store.insert(0, newObj);
            stockinD.stockin_packinglist.push(newObj);
            // stockinD.totalpackage++;
            viewModel.set('stockinD', stockinD);
            
            // console.log(store);
            // console.log(items);
            // console.log(stockinD);
        }

        var totalpackagecheck = 0;
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            if(item.get('ydscheck') != 0 && item.get('ydscheck') != null){
                totalpackagecheck++;
            }
        }

        viewModel.set('stockinD.totalpackagecheck', totalpackagecheck);

        viewModel.set('lotnumberTxt', '');
        viewModel.set('packageidTxt', '');
        viewModel.set('yTxt', '');
        viewModel.set('mTxt', '');
        viewModel.set('yOriginTxt', '');
        viewModel.set('mOriginTxt', '');
        viewModel.set('sampleCheckTxt', '');
        viewModel.set('colorTxt', '');
        viewModel.set('widthTxt', '');
        viewModel.set('yTxtCls', 'yTxtClsWhiteBG');

        m.getView().down('#lotnumberTxt').focus();

        m.setDataStockin();

    },
    setDataStockin: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        var stockin_d = stockin.stockin_d;

        for(var i = 0; i < stockin_d.length; i++){
            if(stockin_d[i].id == stockinD.id){
                stockin_d[i] = stockinD;
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