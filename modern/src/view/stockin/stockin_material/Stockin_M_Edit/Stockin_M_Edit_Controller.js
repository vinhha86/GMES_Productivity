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
        '#btnAddLot':{
            tap: 'onAddLot'
        },
        '#btnLotAddSpace':{
            tap: 'onLotAddSpace'
        },
        '#Stockin_M_Edit_D': {
			// itemtap: 'onItemTap',
            itemsingletap: 'onStockin_M_Edit_DItemTap'
		},
        '#Stockin_M_Edit_Lot': {
            childtap: 'onStockin_M_Edit_LotItemTap'
		},
        '#Stockin_M_Edit_Pkl':{
            itemtap: 'onItemPklTap'
        }
    },
    onStockin_M_Edit_DItemTap: function(dataView, index, target, record, e, eOpts){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
		var id = record.data.id;

        if (e.getTarget('button')) {
            // console.log(record);
            m.redirectTo("stockin_m_main/" + id + "/edit_detail");
        }else{
            // console.log(dataView);
            // console.log(target);
            viewModel.set('selectedDRecord', record);
        }
    },
    onAddLot: function(){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
        var stockin_lot = viewModel.get('stockin.stockin_lot');
		var selectedDRecord = viewModel.get('selectedDRecord');

        if(selectedDRecord == null){ // chưa chọn vải
            Ext.toast('Chưa chọn mã vải', 1000);
            return;
        }

        var lotNumberTxt = viewModel.get('lotNumberTxt');
        var cayNumberTxt = viewModel.get('cayNumberTxt');
        var yNumberTxt = viewModel.get('yNumberTxt');

        // check form info
        if(lotNumberTxt == '') {Ext.toast('Chưa nhập lot', 1000); return;}
        if(cayNumberTxt == '') {Ext.toast('Chưa nhập số cây', 1000); return;}
        if(yNumberTxt == '') {Ext.toast('Chưa nhập số Y', 1000); return;}

        // check stockin_lot
        for(var i = 0; i < stockin_lot.length; i++){
            var stockin_lotRec = stockin_lot[i];
            if(stockin_lotRec.lot_number == lotNumberTxt && stockin_lotRec.materialid_link == selectedDRecord.get('skuid_link')){
                // lot cho sku đã tồn tại, ko Thêm
                Ext.toast('Đã tồn tại lot của mã vải', 1000);
                return;
            }
        }

        // thêm vào stockin_lot
        var newLotObj = new Object();
        newLotObj.lot_number = lotNumberTxt;
        newLotObj.totalpackage = cayNumberTxt;
        newLotObj.totalpackagecheck = 0;
        newLotObj.totalydscheck = 0;
        newLotObj.totalmetcheck = 0;
        newLotObj.status = -1;
        newLotObj.materialid_link = selectedDRecord.get('skuid_link');
        

        // thêm sl yêu cầu
        if(stockin.unitid_link == 3){
            var ydsorigin = parseFloat(yNumberTxt);
            var met_origin = ydsorigin * 0.9144;
            newLotObj.totalyds = ydsorigin;
            newLotObj.totalmet = met_origin;
            // if(selectedDRecord.get('totalydsorigin') == null) selectedDRecord.set('totalydsorigin',0) ;
            // if(selectedDRecord.get('totalmet_origin') == null) selectedDRecord.set('totalmet_origin',0);
            // selectedDRecord.set('totalydsorigin', selectedDRecord.get('totalydsorigin')+ydsorigin);
            // selectedDRecord.set('totalmet_origin', selectedDRecord.get('totalmet_origin')+met_origin);
        }
        if(stockin.unitid_link == 1){
            var met_origin = parseFloat(yNumberTxt);
            var ydsorigin = met_origin / 0.9144;
            newLotObj.totalyds = ydsorigin;
            newLotObj.totalmet = met_origin;
            // if(selectedDRecord.get('totalydsorigin') == null) selectedDRecord.set('totalydsorigin',0);
            // if(selectedDRecord.get('totalmet_origin') == null) selectedDRecord.set('totalmet_origin',0);
            // selectedDRecord.set('totalydsorigin', selectedDRecord.get('totalydsorigin')+ydsorigin);
            // selectedDRecord.set('totalmet_origin', selectedDRecord.get('totalmet_origin')+met_origin);
        }

        stockin_lot.push(newLotObj);
        viewModel.set('stockin.stockin_lot', stockin_lot);

        //
        me.down('#Stockin_M_Edit_Lot').getStore().insert(0, newLotObj);

        // set giá trị dataview
        var stockinDLot = selectedDRecord.get('stockinDLot');
        if(stockinDLot == ''){
            stockinDLot+=lotNumberTxt+' '+cayNumberTxt;
        }else{
            stockinDLot+= '; ' + lotNumberTxt+' '+cayNumberTxt;
        }
        selectedDRecord.set('stockinDLot', stockinDLot);

        // reset form
        viewModel.set('lotNumberTxt', '');
        viewModel.set('cayNumberTxt', '');
        viewModel.set('yNumberTxt', '');

        // log result
        console.log(stockin);
        console.log(selectedDRecord);
        // console.log(lotNumberTxt);
        // console.log(cayNumberTxt);
        // console.log(yNumberTxt);
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

        // if(width > 768){
        //     m.itemStockinDTap(record);
        // }else{
        //     m.redirectTo("stockin_m_main/" + id + "/edit_detail");
        // }

        m.redirectTo("stockin_m_main/" + id + "/edit_detail");
	},
    onPklDetail: function(grid, info) {
        // Ext.Msg.alert('Approve', info.record.get('id'));
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
        var id = info.record.data.id;

        m.redirectTo("stockin_m_main/" + id + "/edit_detail");
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
                var data = response.data;

                // set stockin lot cho stockinD
                data = me.setStockinLotForStockinD(data);

                viewModel.set('stockin', data);
                for(var i=0; i<response.listepc.length; i++){
                    listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                }
                store.setData(data.stockin_d);

                // set pklist store (hiển thị tất cả pkl của các stockin D)
                var storePackinglistArr = new Array();
                for(var i = 0; i<data.stockin_d.length; i++){
                    var stockin_d = data.stockin_d[i];
                    var stockin_packinglist = stockin_d.stockin_packinglist == null ? [] : stockin_d.stockin_packinglist;
                    for(var j = 0; j<stockin_packinglist.length; j++){
                        console.log(stockin_packinglist[j]);
                        storePackinglistArr.push(stockin_packinglist[j]);
                    }
                }
                viewModel.set('storePackinglistArr', storePackinglistArr);

                // load cbbox color pkl theo stockin
                var attributeValueStore = viewModel.getStore('attributeValueStore');
                attributeValueStore.loadStore_colorForStockin(data.id);
                attributeValueStore.load({
                    scope: this,
                    callback: function(records, operation, success) {
                        if(!success){
                            this.fireEvent('logout');
                        } else {
                            // viewModel.set('colorTxt', viewModel.get('stockinD.colorid_link'));
                        }
                    }
                });

                // set store org from
                if(data.stockintypeid_link == 1) {// mua moi va cap bu thi là nha cung cap
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
    setStockinLotForStockinD: function(stockin){
        var data = stockin;
        for(var i=0; i<data.stockin_d.length; i++){
            var stockInD = data.stockin_d[i];
            var stockinDLot = '';
            if(stockInD.skuid_link != null){
                var materialid_link = stockInD.skuid_link;
                for(var j=0; j<stockin.stockin_lot.length; j++){
                    var stockinLot = stockin.stockin_lot[j];
                    var result = '';
                    result+= stockinLot.lot_number == null ? '' : stockinLot.lot_number;
					result+= stockinLot.totalpackage == null ? '' : ' ' +  stockinLot.totalpackage;
					// result+= stockinLot.space == null ? '' : ' ' + stockinLot.space;
					
					if(stockinLot.materialid_link == materialid_link) {
						if(stockinDLot == '') {
							stockinDLot += result;
						}else {
							stockinDLot += '; ' + result;
						}
					}
                }
            }
            stockInD.stockinDLot = stockinDLot;
        }
        // console.log(data);
        return data;
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
    onmaLotFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Lot'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maLotFilter'),
            filters = grid.store.getFilters();

        if (filterField.getValue()) {
            this.maLotFilter = filters.add({
                id: 'maLotFilter',
                property: 'lot_number',
                value: filterField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.maLotFilter) {
            filters.remove(this.maLotFilter);
            this.maLotFilter = null;
        }
    },
    onmaPklFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Pkl'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklFilter'),
            filters = grid.store.getFilters();

        if (filterField.getValue()) {
            this.maPklFilter = filters.add({
                id: 'maPklFilter',
                property: 'lotnumber',
                value: filterField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.maPklFilter) {
            filters.remove(this.maPklFilter);
            this.maPklFilter = null;
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
                    m.resetForm();
                    viewModel.set('colorTxt', viewModel.get('stockinD.colorid_link'));
                }
            }
        });
    },

    onCheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockin_lot = viewModel.get('stockin.stockin_lot');

        var lotnumberTxt = viewModel.get('lotnumberTxt');
        var packageidTxt = viewModel.get('packageidTxt');
        var yTxt = viewModel.get('yTxt');
        var mTxt = viewModel.get('mTxt');
        var yOriginTxt = viewModel.get('yOriginTxt');
        var mOriginTxt = viewModel.get('mOriginTxt');
        var colorTxt = viewModel.get('colorTxt');
        var widthTxt = viewModel.get('widthTxt');
        var sampleCheckTxt = viewModel.get('sampleCheckTxt');

        // check textfield
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

        // check lotnumber tồn tại
        var isLotnumberExist = stockin_lot.some(
            item => item.lot_number == lotnumberTxt
        );
        if(!isLotnumberExist){
            Ext.toast('Số lot ko tồn tại', 3000);
            return;
        }

        // tạo obj
        if(yTxt == null || yTxt == '') yTxt = 0;
        if(mTxt == null || mTxt == '') mTxt = 0;
        if(yOriginTxt == null || yOriginTxt == '' || yOriginTxt == 0) yOriginTxt = yTxt;
        if(mOriginTxt == null || mOriginTxt == '' || mOriginTxt == 0) mOriginTxt = mTxt;
        if(sampleCheckTxt == null || sampleCheckTxt == '') sampleCheckTxt = 0;

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

        var view = this.getView().down('#Stockin_M_Edit_Pkl');
        var store = view.getStore(); // console.log(store);
        // var items = store.getData().items; // console.log(items);
        var items = viewModel.get('storePackinglistArr');
        var isExist = false;
        var isSaving = true;
        // lặp qua danh sách để tìm cây vải tương ứng
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            // nếu tìm thấy cây vải
            if(item.lotnumber == lotnumberTxt && item.packageid == packageidTxt){
                isExist = true;

                // thay đổi thông tin storePackinglistArr (danh sách hiển thị pkl)

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
                
                item.ydscheck = parseFloat(ydscheck);
                item.met_check = parseFloat(met_check);
                item.ydsorigin = parseFloat(ydsorigin);
                item.met_origin = parseFloat(met_origin);
                item.sample_check = parseFloat(sample_check);
                item.width_check = parseFloat(width_check);
                item.checked = 1;
                item.status = 0;

                viewModel.set('storePackinglistArr', items);
                store.setData([]);
                store.insert(0, items);
            }
        }

        // nếu ko có trong danh sách, thêm cây vải
        if(!isExist){
            isSaving = m.themCayVaiMoi(objData);
        }

        // thay đổi thông tin obj stockin
        m.setDataStockin();

        m.resetForm();
        m.getView().down('#packageidTxt').focus();
        // if(isSaving) m.onSave();
    },
    themCayVaiMoi: function(objData){
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        // var stockinD = viewModel.get('stockinD');
        var storePackinglistArr = viewModel.get('storePackinglistArr');
        var stockin_lot = viewModel.get('stockin.stockin_lot');
        var view = this.getView().down('#Stockin_M_Edit_Pkl');
        var store = view.getStore(); // console.log(store);
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
        newObj.met_check = parseFloat(met_check);
        newObj.met_origin = parseFloat(met_origin);
        newObj.netweight = 0;
        newObj.packageid = packageidTxt;
        newObj.unitid_link = stockin.unitid_link;
        newObj.warning = 'warning0';
        newObj.width = 0;
        newObj.width_check = parseFloat(width_check);
        newObj.ydscheck = parseFloat(ydscheck);
        newObj.ydsorigin = parseFloat(ydsorigin);
        newObj.sample_check = parseFloat(sample_check);
        newObj.checked = 1;
        newObj.status = 0;

        for(var i = 0; i < stockin_lot.length; i++){
            if(stockin_lot[i].lot_number == newObj.lotnumber){
                newObj.skuid_link = stockin_lot[i].materialid_link;
            }
        }

        storePackinglistArr.push(newObj);
        viewModel.set('storePackinglistArr', storePackinglistArr);
        store.setData([]);
        store.insert(0, storePackinglistArr);

        return isSaving;
    },
    setDataStockin: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockin_d = viewModel.get('stockin.stockin_d');
        var stockin_lot = viewModel.get('stockin.stockin_lot');
        var storePackinglistArr = viewModel.get('storePackinglistArr');

        // Lot data
        var viewLot = this.getView().down('#Stockin_M_Edit_Lot');
        var storeLot = viewLot.getStore();
        for(var i = 0; i < stockin_lot.length; i++){
            var totalmetcheck = 0;
            var totalydscheck = 0;
            for(var j = 0; j < storePackinglistArr.length; j++){
                var pkl = storePackinglistArr[j];
                if(stockin_lot[i].lot_number == pkl.lotnumber){
                    totalmetcheck+=pkl.met_check;
                    totalydscheck+=pkl.ydscheck;
                }
            }
            stockin_lot[i].totalmetcheck = totalmetcheck;
            stockin_lot[i].totalydscheck = totalydscheck;
        }
        viewModel.set('stockin.stockin_lot', stockin_lot);
        storeLot.setData([]);
        storeLot.insert(0, stockin_lot);

        // StockinD data
        var viewD = this.getView().down('#Stockin_M_Edit_D');
        var storeD = viewD.getStore();
        for(var i = 0; i < stockin_d.length; i++){
            stockin_d[i].stockin_packinglist = [];
            var totalmet_check = 0;
            var totalydscheck = 0;
            for(var j = 0; j < storePackinglistArr.length; j++){
                var pkl = storePackinglistArr[j];
                if(stockin_d[i].skuid_link == pkl.skuid_link){
                    stockin_d[i].stockin_packinglist.push(pkl);
                    totalmet_check+=pkl.met_check;
                    totalydscheck+=pkl.ydscheck;
                }
            }
            stockin_d[i].totalmet_check = totalmet_check;
            stockin_d[i].totalydscheck = totalydscheck;
        }
        viewModel.set('stockin.stockin_d', stockin_d);
        storeD.setData([]);
        storeD.insert(0, stockin_d);

        console.log(stockin);
        console.log(storePackinglistArr);
    },
    onSave: function(){
        // var me = this.getView();
        // var m = this;
        // var viewModel = this.getViewModel();
        // var params = new Object();
        // params.data = [];
        // var stockin = viewModel.get('stockin');
        // var stockinD = viewModel.get('stockinD');

        // var stockin_d = stockin.stockin_d;
        // if(stockin_d != null){
        //     for(var i = 0; i < stockin_d.length; i++){
        //         if(stockin_d[i].id == 0 || typeof stockin_d[i].id === 'string'){
        //             stockin_d[i].id = null;
        //         }

        //         var stockin_packinglist = stockin_d[i].stockin_packinglist;
        //         if(stockin_packinglist != null){
        //             for(var j = 0; j < stockin_packinglist.length; j++){
        //                 if(stockin_packinglist[j].id == 0 || typeof stockin_packinglist[j].id === 'string'){
        //                     stockin_packinglist[j].id = null;
        //                 }
        //                 if(stockin_packinglist[j].stockindid_link == 0 || typeof stockin_packinglist[j].stockindid_link === 'string'){
        //                     stockin_packinglist[j].stockindid_link = null;
        //                 }
        //             }
        //         }
        //     }
        // }
        // // console.log(stockin);
        // params.data.push(stockin);
        // // me.setLoading("Đang lưu dữ liệu");
        // GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create_material', Ext.JSON.encode(params),
        //     function (success, response, options) {
        //         // me.setLoading(false);
        //         if (success) {
        //             var response = Ext.decode(response.responseText);
        //             if (response.respcode == 200) {
        //                 Ext.toast('Lưu thành công', 3000);
        //                 // m.redirectTo("stockin_m_main/" + response.id + "/edit");
        //                 m.getInfo(stockin.id);
        //                 // m.getInfo(response.id);
        //             }
        //         } else {
        //             var response = Ext.decode(response.responseText);
        //             Ext.toast('Lỗi lập phiếu: ' + response.message, 3000);
        //         }
        // })
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
        
        // viewModel.set('lotnumberTxt', '');
        viewModel.set('packageidTxt', '');
        viewModel.set('yTxt', '');
        viewModel.set('mTxt', '');
        viewModel.set('yOriginTxt', '');
        viewModel.set('mOriginTxt', '');
        // viewModel.set('colorTxt', stockinD.colorid_link);
        viewModel.set('widthTxt', '');
        viewModel.set('sampleCheckTxt', '');
        m.getView().down('#packageidTxt').focus();
    },

    // Stockin_M_Edit_Lot
    onStockin_M_Edit_LotItemTap: function(grid, location, eOpts){
        // console.log(location);
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        if(location.record.get('space') == null) location.record.set('space', '');
        var lotSpace = location.record.get('space');
        m.setSpaceStore(lotSpace);
        viewModel.set('selectedLotRecord', location.record);
    },
    setSpaceStore: function(lotSpace){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');
        var lotSpaceArr = lotSpace.split(';');
        var lotSpaceArrStore = new Array();
        for(var i = 0; i < lotSpaceArr.length; i++){
            if(lotSpaceArr[i] != null && lotSpaceArr[i] != ''){
                lotSpaceObj = new Object();
                lotSpaceObj.space = lotSpaceArr[i];
                lotSpaceArrStore.push(lotSpaceObj);
            }
        }
        //Stockin_M_Edit_Space
        me.down('#Stockin_M_Edit_Space').getStore().setData([]);
        me.down('#Stockin_M_Edit_Space').getStore().insert(0, lotSpaceArrStore);
        // console.log(res);
    },
    onLotCheck: function(grid, info){
        // console.log(info);
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        //
        var record = info.record;
        if(record.get('status') == -1){
            var totalpackage = record.get('totalpackage');
            record.set('totalpackagecheck', totalpackage);
            record.set('status', 0);
        }else{
            record.set('totalpackagecheck', 0);
            record.set('status', -1);
        }
    },
    onLotEdit: function(grid, info){
        // console.log(info);
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            title: 'Xác nhận',
            width: 300,
            // height: 300,
            header: true,
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
            items: [{
                border: false,
                xtype: 'Stockin_M_InputAmount',
                viewModel: {
                    data: {
                        totalpackagecheck: info.record.get('totalpackagecheck'),
                    }
                }
            }],
        });
        dialog.show();

        dialog.down('#Stockin_M_InputAmount').getController().on('Luu', function (totalpackagecheck) {
            var record = info.record;
            var totalpackage = record.get('totalpackage');
            record.set('totalpackagecheck', totalpackagecheck);
            record.set('status', 0);
            // if(totalpackagecheck >= totalpackage){
            //     record.set('status', 0);
            // }else{
            //     record.set('status', -1);
            // }
            dialog.close();
        });

        dialog.down('#Stockin_M_InputAmount').getController().on('Thoat', function () {
            dialog.close();
        });
    },
    onLotAddSpace: function(grid, info){
        // console.log(info);
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        var selectedLotRecord = viewModel.get('selectedLotRecord');
        if(selectedLotRecord == null){
            Ext.toast('Chưa chọn lot', 1000);
            return;
        }

        var row = viewModel.get('row');
        var space = viewModel.get('space');
        var floor = viewModel.get('floor');

        if(row == null || row == ''){
            Ext.toast('Chưa nhập dãy', 1000);
            return;
        }
        if(space == null || space == ''){
            Ext.toast('Chưa nhập hàng', 1000);
            return;
        }
        if(floor == null || floor == ''){
            Ext.toast('Chưa nhập tầng', 1000);
            return;
        }

        var record = selectedLotRecord;
        var lotSpace = record.get('space') == null ? '' : record.get('space'); // D1H5T2
        if(lotSpace == ''){
            lotSpace+= 'D' + row + 'H' + space + 'T' + floor;
        }else{
            lotSpace+= ';D' + row + 'H' + space + 'T' + floor;
        }
        record.set('space', lotSpace); // console.log(lotSpace);
        m.setSpaceStore(lotSpace);

        viewModel.set('row', null);
        viewModel.set('space', null);
        viewModel.set('floor', null);
    },
})