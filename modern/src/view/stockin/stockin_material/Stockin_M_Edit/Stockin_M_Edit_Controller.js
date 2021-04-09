Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        var orgstore = this.getViewModel().getStore('OrgStore');
		orgstore.loadStore(5);

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();

		var listidtype = "13,3";
        // var listidtype = "4,8,9,11,12";
		// var orgfromstore = this.getViewModel().getStore('OrgFromStore');
		// orgfromstore.loadStore_byRoot(listidtype);

		var orgtostore = this.getViewModel().getStore('OrgToStore');
		orgtostore.loadStore_allchildren_byorg(listidtype);

		var currencyStore = this.getViewModel().getStore('CurrencyStore');
		currencyStore.loadStore();

		var vattypeStore = this.getViewModel().getStore('VatTypeStore');
		vattypeStore.loadStore();
		
		var stockintype = this.getViewModel().getStore('StockinTypeStore');
		stockintype.loadStore();
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData',
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
        '#btnPrint':{
            tap: 'onPrint'
        },
        '#btnLuu':{
            tap: 'onSave'
        },
        '#btnCheck':{
            tap: 'onCheck'
        },
        '#btnResetForm':{
            tap: 'onResetForm'
        },
        '#Stockin_M_Edit_D': {
			itemtap: 'onItemTap'
		},
        '#Stockin_M_Edit_PackingList_D':{
            itemtap: 'onItemPklTap'
        }
    },
    onItemTap: function(grid, index, target, record, e, eOpts){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var id = record.data.id;

		// console.log(stockin);
		// console.log(record);
		var size = Ext.getBody().getViewSize();
        var width = size.width;

        if(width > 768){
            m.itemStockinDTap(record);
        }else{
            m.redirectTo("stockin_m_main/" + id + "/edit_detail");
        }
	},
    onPrint: function(){
        console.log('print btn');
    },
    onBtnHomeTap: function(){
        this.redirectTo("mobilemenu");
    },
    onUrlBack: function(type){
        
    },
    onNewData:function(type, id){
        console.log('onNewData');
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');
        console.log(session);

        viewModel.set('stockin.stockindate',new Date());
        viewModel.set('stockin.usercreateid_link', session.user);
        viewModel.set('listepc', new Map());
        viewModel.set('stockin.orgid_to_link', session.orgid_link)
        viewModel.set('stockin.stockintypeid_link', id);
        viewModel.set('stockin.status', -1);

        // set store org from
        if(id == 1) {// mua moi va cap bu thi là nha cung cap
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore(5, false);
        }else{
            var listidtype = "13,4,8,9";
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore_byRoot(listidtype);
        }

        console.log(viewModel.get('stockin'));
    },
    onLoadData:function(id,type){
        console.log('onLoadData: ' + id + ' ' + type);
        var viewModel = this.getViewModel();

        this.getInfo(id);
    },
    onBackPage: function(){
        // console.log('onBackPage');
        this.redirectTo('stockin_m');
    },
    getInfo: function(id){
        var me = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinDetailStore');
        var listepc = viewModel.get('listepc');

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                // console.log(response.data);
                viewModel.set('stockin', response.data);
                for(var i=0; i<response.listepc.length; i++){
                    listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                }
                store.setData(response.data.stockin_d);

                // set store org from
                if(response.data.stockintypeid_link == 1) {// mua moi va cap bu thi là nha cung cap
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore(5, false);
                }else{
                    var listidtype = "13,4,8,9";
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore_byRoot(listidtype);
                }
            }
		})
    },
    CheckValidate: function(){
		var mes = "";
		var stockin = this.getViewModel().get('stockin');
		if(stockin.stockintypeid_link == null){
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (stockin.orgid_from_link == null){
			mes = "Bạn chưa chọn nơi giao";
		}
		else if (stockin.orgid_to_link == null){
			mes = "Bạn chưa chọn nơi nhập";
		} 
		else if (stockin.stockin_d.length == 0){
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
    // onSave: function(){
    //     var me = this.getView();
    //     var m = this;
    //     var viewModel = this.getViewModel();
    //     var params = new Object();
    //     params.data = [];
    //     var stockin = viewModel.get('stockin');

    //     var stockin_d = stockin.stockin_d;
    //     if(stockin_d != null){
    //         for(var i = 0; i < stockin_d.length; i++){
    //             if(stockin_d[i].id == 0 || typeof stockin_d[i].id === 'string'){
    //                 stockin_d[i].id = null;
    //             }

    //             var stockin_packinglist = stockin_d[i].stockin_packinglist;
    //             if(stockin_packinglist != null){
    //                 for(var j = 0; j < stockin_packinglist.length; j++){
    //                     if(stockin_packinglist[j].id == 0 || typeof stockin_packinglist[j].id === 'string'){
    //                         stockin_packinglist[j].id = null;
    //                     }
    //                     if(stockin_packinglist[j].stockindid_link == 0 || typeof stockin_packinglist[j].stockindid_link === 'string'){
    //                         stockin_packinglist[j].stockindid_link = null;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     // console.log(stockin);
    //     params.data.push(stockin);
    //     GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create_material', Ext.JSON.encode(params),
    //         function (success, response, options) {
    //             if (success) {
    //                 var response = Ext.decode(response.responseText);
    //                 if (response.respcode == 200) {
    //                     Ext.toast('Lưu phiếu thành công', 1000);
    //                     this.redirectTo("stockin_m_main/" + response.id + "/edit");
    //                     m.getInfo(response.id);
    //                 }
    //             } else {
    //                 var response = Ext.decode(response.responseText);
    //                 Ext.toast('Lỗi lập phiếu: ' + response.message, 1000);
    //             }
    //     })
        
    // },
    
    onConfirm: function(){
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinId = stockin.id;
        var form = Ext.create('Ext.window.Window', {
            // height: 200,
            width: 315,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Duyệt',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockin_M_Edit_Confirm',
                viewModel: {
                    type: 'HandoverDetailConfirmViewModel',
                    data: {
                        stockin: stockin,
                        stockinId: stockinId
                    }
                }
            }]
        });
        form.show();
    },
    onmaNPLFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_D'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maNPLFilter'),
            filters = grid.store.getFilters();

        if (filterField.getValue()) {
            this.maNPLFilter = filters.add({
                id: 'maNPLFilter',
                property: 'skucode',
                value: filterField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.maNPLFilter) {
            filters.remove(this.maNPLFilter);
            this.maNPLFilter = null;
        }
    },

    // Stockin_M_Edit_P
    itemStockinDTap: function(record){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
        viewModel.set('stockinD', record.data);
		var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        // console.log(stockin);
        // console.log(stockinD);

        var attributeValueStore = viewModel.getStore('attributeValueStore');
        attributeValueStore.loadStore_colorForStockin(stockin.id);
        attributeValueStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    viewModel.set('colorTxt', viewModel.get('stockinD.colorid_link'));
                }
            }
        });
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
        var colorTxt = viewModel.get('colorTxt');
        var widthTxt = viewModel.get('widthTxt');
        var sampleCheckTxt = viewModel.get('sampleCheckTxt');

        if(stockin.unitid_link == 3){
            if(widthTxt == '' || packageidTxt == '' || yTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, Khổ hoặc độ dài', 3000);
                return;
            }
            if(isNaN(yTxt)){
                Ext.toast('Số Y phải là số', 3000);
                return;
            }
        }
        if(stockin.unitid_link == 1){
            if(widthTxt == '' || packageidTxt == '' || mTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, Khổ hoặc độ dài', 3000);
                return;
            }
            if(isNaN(mTxt)){
                Ext.toast('Số M phải là số', 3000);
                return;
            }
        }

        if(yTxt == null || yTxt == '') yTxt = 0;
        if(mTxt == null || mTxt == '') mTxt = 0;
        if(yOriginTxt == null || yOriginTxt == '') yOriginTxt = 0;
        if(mOriginTxt == null || mOriginTxt == '') mOriginTxt = 0;
        if(sampleCheckTxt == null || sampleCheckTxt == '') sampleCheckTxt = 0;
        if(colorTxt == null || colorTxt == '') colorTxt = stockinD.colorid_link;

        var objData = new Object();
        objData.lotnumberTxt = lotnumberTxt;
        objData.packageidTxt = packageidTxt;
        objData.yTxt = yTxt;
        objData.mTxt = mTxt;
        objData.yOriginTxt = yOriginTxt;
        objData.mOriginTxt = mOriginTxt;
        objData.colorTxt = colorTxt;
        objData.widthTxt = widthTxt;
        objData.sampleCheckTxt = sampleCheckTxt;

        //
        // var view = Ext.getCmp('Stockin_M_Edit_PackingList_D');
        var view = this.getView().down('#Stockin_M_Edit_PackingList_D');
        var store = view.getStore(); // console.log(store);
        var items = store.getData().items; // console.log(items);
        var isExist = false;
        var isSaving = true;
        // lặp qua danh sách để tìm cây vải tương ứng
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            if(item.get('lotnumber') == lotnumberTxt && item.get('packageid') == packageidTxt && item.get('colorid_link') == colorTxt){
                isExist = true;

                var ydscheck = 0;
                var met_check = 0;
                var ydsorigin = 0;
                var met_origin = 0;
                var sample_check = 0;
                var colorTxt
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
                
                item.set('ydscheck', ydscheck);
                item.set('met_check', met_check);
                item.set('ydsorigin', ydsorigin);
                item.set('met_origin', met_origin);
                item.set('sample_check', sample_check);
                item.set('width_check', width_check);
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
            isSaving = m.themCayVaiMoi(objData);
        }

        // tinh lai totalpackagecheck
        var totalpackagecheck = 0;
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            if(item.get('ydscheck') != 0 && item.get('ydscheck') != null){
                totalpackagecheck++;
            }
        }
        viewModel.set('stockinD.totalpackagecheck', totalpackagecheck);

        //
        m.resetForm();
        m.getView().down('#lotnumberTxt').focus();
        m.setDataStockin();
        if(isSaving) m.onSave();
    },
    themCayVaiMoi: function(objData){
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');
        var isSaving = true;

        var lotnumberTxt = objData.lotnumberTxt;
        var packageidTxt = objData.packageidTxt;
        var yTxt = objData.yTxt;
        var mTxt = objData.mTxt;
        var yOriginTxt = objData.yOriginTxt;
        var mOriginTxt = objData.mOriginTxt;
        var colorTxt = objData.colorTxt;
        var widthTxt = objData.widthTxt;
        var sampleCheckTxt = objData.sampleCheckTxt;

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
        newObj.colorid_link = colorTxt;
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

        newObj.checked = 1;
        newObj.status = 0;

        if(newObj.ydscheck == newObj.ydsorigin){
            newObj.warning = 'warning2';
        }else if(newObj.met_check == newObj.met_origin){
            newObj.warning = 'warning2';
        }else{
            newObj.warning = 'warning1';
        }

        // kiểm tra màu, 
        // nếu trùng thì đẩy vào danh sách pklist hiện tại
        // không trùng thì tìm theo danh sách ngoài, sku có cùng productid với sku hiện tại và màu
        // nếu không tồn tại thì thông báo

        if(newObj.colorid_link == stockinD.colorid_link){ // trùng màu
            stockinD.stockin_packinglist.push(newObj);
            viewModel.set('stockinD', stockinD);
        }else{ // màu khác
            var stockin_dlist = stockin.stockin_d;

            // loop danh sách stockin_d
            var isStockinDExist = false;
            for(var i=0; i<stockin_dlist.length; i++){
                var stockin_d = stockin_dlist[i];
                if(newObj.colorid_link == stockin_d.colorid_link && stockinD.sku_product_id == stockin_d.sku_product_id){
                    // có sku cùng màu và product_id, thêm pklist
                    isStockinDExist = true;
                    var stockin_packinglist = stockin_d.stockin_packinglist;
                    var isPklistExist = stockin_packinglist.some(
                        item => item.lotnumber == newObj.lotnumber && item.packageid == newObj.packageid
                    );
                    if(!isPklistExist){
                        stockin_packinglist.push(newObj);
                        console.log(stockin_dlist);
                    }else{
                        Ext.toast('Đã tồn tại pklist với số lot và số cây này', 3000);
                        isSaving = false;
                    }

                    // console.log(stockin);
                    // console.log(stockin_d);
                    break;
                }
            }
            if(!isStockinDExist){
                Ext.toast('Không tồn tại SKU có màu này', 3000);
                isSaving = false;
            }
        }
        return isSaving;
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
    },
    onSave: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = [];
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

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
                        Ext.toast('Lưu thành công', 3000);
                        // m.redirectTo("stockin_m_main/" + response.id + "/edit");
                        m.getInfo(stockin.id);
                        // m.getInfo(response.id);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi lập phiếu: ' + response.message, 3000);
                }
        })
    },

    onItemPklTap: function(dataview, index, target, record, e, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');
        
        viewModel.set('lotnumberTxt', record.get('lotnumber'));
        viewModel.set('packageidTxt', record.get('packageid'));
        viewModel.set('yTxt', record.get('ydscheck'));
        viewModel.set('mTxt', record.get('met_check'));
        viewModel.set('yOriginTxt', record.get('ydsorigin'));
        viewModel.set('mOriginTxt', record.get('met_origin'));
        viewModel.set('colorTxt', record.get('colorid_link'));
        viewModel.set('widthTxt', record.get('width_check'));
        viewModel.set('sampleCheckTxt', record.get('sample_check'));
    },
    onResetForm: function(){
        var m = this;
        var viewModel = this.getViewModel();
        
        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            title: 'Nhập lại ?',
            width: 300,
            // height: 300,
            // header: false,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            maskTapHandler: function(){
                // console.log('mask tapped');
                if(dialog){
                    dialog.close();
                }
            },
            bodyPadding: '1',
            maxWidth: 300,
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            buttons: [{
                xtype:'button',
                text: 'Không',
                flex: 1,
                minWidth: 80,
                maxWidth: 130,
                margin: 1,
                iconCls: 'x-fa fa-window-close',
                // itemId:'btnCheck',
                ui: 'action',
                handler: function(){
                    if(dialog){
                        dialog.close();
                    }
                }
            },{
                xtype:'button',
                text: 'Có',
                flex: 1,
                minWidth: 80,
                maxWidth: 130,
                margin: 1,
                iconCls: 'x-fa fa-check',
                // itemId:'btnCheck',
                ui: 'action',
                handler: function(){
                    if(dialog){
                        m.resetForm();
                        dialog.close();
                    }
                }
            }],
            items: [{
                
            }],
        });
        dialog.show();
    },
    resetForm: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');
        
        viewModel.set('lotnumberTxt', '');
        viewModel.set('packageidTxt', '');
        viewModel.set('yTxt', '');
        viewModel.set('mTxt', '');
        viewModel.set('yOriginTxt', '');
        viewModel.set('mOriginTxt', '');
        viewModel.set('colorTxt', stockinD.colorid_link);
        viewModel.set('widthTxt', '');
        viewModel.set('sampleCheckTxt', '');
        m.getView().down('#lotnumberTxt').focus();
    }

})