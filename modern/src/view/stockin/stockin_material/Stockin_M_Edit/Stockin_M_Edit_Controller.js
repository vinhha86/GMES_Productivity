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
        '#btnCheckRecheck':{
            tap: 'onCheckRecheck'
        },
        '#btnResetForm':{
            tap: 'onbtnResetForm'
        },
        '#btnResetFormRecheck':{
            tap: 'onbtnResetFormRecheck'
        },
        '#btnAddLot':{
            tap: 'onAddLot'
        },
        '#btnLotEditSpace':{
            tap: 'onLotEditSpace'
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
            childtap: 'onItemPklTap'
        },
        '#Stockin_M_Edit_Pkl_Recheck':{
            itemtap: 'onItemPklRecheckTap'
        },
        '#TabView':{
            activeItemchange: 'onTabViewActiveItemchange'
        },
    },
    onTabViewActiveItemchange: function(sender, value, oldValue, eOpts){
        // console.log(sender);
        // console.log(value);
        // console.log(oldValue);
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

            // thêm filter mã vải cho pkl và pkl_recheck
            viewModel.set('maPklFilterByMaVai', record.get('skucode'));
            viewModel.set('maPklRecheckFilterByMaVai', record.get('skucode'));

            m.onmaPklFilterKeyup();
            m.onmaPklRecheckFilterKeyup();
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
        var canNumberTxt = viewModel.get('canNumberTxt');

        // check form info
        if(lotNumberTxt == '') {Ext.toast('Chưa nhập lot', 1000); return;}
        if(cayNumberTxt == '') {Ext.toast('Chưa nhập số cây', 1000); return;}
        if(yNumberTxt == '') {Ext.toast('Chưa nhập số Y', 1000); return;}
        if(canNumberTxt == '') {Ext.toast('Chưa nhập số cân nặng', 1000); return;}

        // check stockin_lot
        for(var i = 0; i < stockin_lot.length; i++){
            var stockin_lotRec = stockin_lot[i];
            if(stockin_lotRec.lot_number.toUpperCase() == lotNumberTxt.toUpperCase() && stockin_lotRec.materialid_link == selectedDRecord.get('skuid_link')){
                // lot cho sku đã tồn tại, ko Thêm
                Ext.toast('Đã tồn tại lot của mã vải', 1000);
                return;
            }
        }

        // thêm vào stockin_lot
        var newLotObj = new Object();
        newLotObj.stockinid_link = stockin.id;
        newLotObj.lot_number = lotNumberTxt;
        newLotObj.totalpackage = cayNumberTxt;
        newLotObj.totalpackagecheck = 0;
        newLotObj.grossweight = canNumberTxt;
        newLotObj.grossweight_check = 0;
        newLotObj.totalydscheck = 0;
        newLotObj.totalmetcheck = 0;
        newLotObj.totalpackagepklist = 0;
        newLotObj.space = '';
        newLotObj.status = -1;
        newLotObj.materialid_link = selectedDRecord.get('skuid_link');
        

        // thêm sl yêu cầu
        if(stockin.unitid_link == 3){
            var ydsorigin = parseFloat(yNumberTxt);
            var met_origin = ydsorigin * 0.9144;
            newLotObj.totalyds = ydsorigin;
            newLotObj.totalmet = met_origin;
        }
        if(stockin.unitid_link == 1){
            var met_origin = parseFloat(yNumberTxt);
            var ydsorigin = met_origin / 0.9144;
            newLotObj.totalyds = ydsorigin;
            newLotObj.totalmet = met_origin;
        }

        // lưu lot vào db qua api -> nhận obj trả về -> đẩy obj vào d/sách trên giao diện

        var params = new Object();
        params.data = newLotObj;

        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_lot_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        var data = response.data;

                        // thêm obj vào d/sách lot
                        stockin_lot.push(data);
                        viewModel.set('stockin.stockin_lot', stockin_lot);
                        me.down('#Stockin_M_Edit_Lot').getStore().insert(0, data);

                        // update dataview d/sách vải
                        var stockinDLot = selectedDRecord.get('stockinDLot');
                        if(stockinDLot == ''){
                            stockinDLot+=lotNumberTxt.toUpperCase()+' '+cayNumberTxt;
                        }else{
                            stockinDLot+= '; ' + lotNumberTxt.toUpperCase()+' ('+cayNumberTxt+')';
                        }
                        selectedDRecord.set('stockinDLot', stockinDLot);

                        // reset form
                        m.resetFormAddLot();
                        // console.log(response);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 3000);
                }
        })

        // old
        // stockin_lot.push(newLotObj);
        // viewModel.set('stockin.stockin_lot', stockin_lot);
        // me.down('#Stockin_M_Edit_Lot').getStore().insert(0, newLotObj);

        // update dataview d/sách vải
        // var stockinDLot = selectedDRecord.get('stockinDLot');
        // if(stockinDLot == ''){
        //     stockinDLot+=lotNumberTxt.toUpperCase()+' '+cayNumberTxt;
        // }else{
        //     stockinDLot+= '; ' + lotNumberTxt.toUpperCase()+' '+cayNumberTxt;
        // }
        // selectedDRecord.set('stockinDLot', stockinDLot);

        // reset form
        // m.resetFormAddLot();

        // log result
        // console.log(stockin);
        // console.log(selectedDRecord);
        // m.onSave();
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

                // set store kiểm cây và 10%
                me.setStorePklAndPklReCheck(data);

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

                setTimeout(function(){
                    me.onSort();
                }, 1000);
            }
		})
    },
    setStorePklAndPklReCheck: function(stockin){
        var me = this;
        var viewModel = this.getViewModel();
        var data = stockin;
        var viewPkl = this.getView().down('#Stockin_M_Edit_Pkl');
        var storePkl = viewPkl.getStore();
        var viewPklRecheck = this.getView().down('#Stockin_M_Edit_Pkl_Recheck');
        var storePklRecheck = viewPklRecheck.getStore();
        // set pklist store (hiển thị tất cả pkl của các stockin D)
        var storePackinglistArr = new Array();
        var storePackinglistArrStatusLessThan1 = new Array();
        var storePackinglistArrAll = new Array();
        for(var i = 0; i<data.stockin_d.length; i++){
            var stockin_d = data.stockin_d[i];
            var stockin_packinglist = stockin_d.stockin_packinglist == null ? [] : stockin_d.stockin_packinglist;
            for(var j = 0; j<stockin_packinglist.length; j++){
                // console.log(stockin_packinglist[j]);
                storePackinglistArrAll.push(stockin_packinglist[j]);
                // Khi nào api update lưu được status pkl != -1 thì xoá điều kiện or thứ 2 đi
                if(stockin_packinglist[j].status >= 1 || stockin_packinglist[j].status < 1){
                    storePackinglistArr.push(stockin_packinglist[j]);
                }else{
                    storePackinglistArrStatusLessThan1.push(stockin_packinglist[j]);
                }
            }
        }
        viewModel.set('storePackinglistArr', storePackinglistArr);
        viewModel.set('storePackinglistArrStatusLessThan1', storePackinglistArrStatusLessThan1);
        viewModel.set('storePackinglistArrAll', storePackinglistArrAll);
        // storePkl.setData([]);
        // me.setStorePkl(storePackinglistArr);
        storePkl.removeAll();
        storePkl.insert(0, storePackinglistArr);
        // console.log(storePackinglistArr);
        // console.log(storePkl);

        // set pklist recheck store (hiển thị tất cả pkl của các stockin D co status = 1)
        var storePackinglistRecheckArr = new Array();
        for(var i = 0; i<storePackinglistArr.length; i++){
            if(storePackinglistArr[i].status == 2){
                storePackinglistRecheckArr.push(storePackinglistArr[i]);
            }
        }
        viewModel.set('storePackinglistRecheckArr', storePackinglistRecheckArr);
        // storePklRecheck.setData([]);
        storePklRecheck.removeAll();
        storePklRecheck.insert(0, storePackinglistRecheckArr);

    },
    setPklAndPklStatusLessThan1: function(storePackinglistArrAll){
        var viewModel = this.getViewModel();
        var storePackinglistArr = new Array();
        var storePackinglistArrStatusLessThan1 = new Array();
        for(var i=0; i<storePackinglistArrAll.length; i++){
            // Khi nào api update lưu được status pkl != -1 thì xoá điều kiện or thứ 2 đi
            if(storePackinglistArrAll[i].status >= 1 || storePackinglistArrAll[i].status < 1){
                storePackinglistArr.push(storePackinglistArrAll[i]);
            }else{
                storePackinglistArrStatusLessThan1.push(storePackinglistArrAll[i]);
            }
        }
        viewModel.set('storePackinglistArr', storePackinglistArr);
        viewModel.set('storePackinglistArrStatusLessThan1', storePackinglistArrStatusLessThan1);
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
					result+= stockinLot.totalpackage == null ? '' : ' (' +  stockinLot.totalpackage + ')';
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
        
        var viewModel = this.getViewModel();
        viewModel.set('selectedDRecord', null);
        grid.getSelectable().deselectAll();

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

        var viewModel = this.getViewModel();
        viewModel
    },
    onmaLotFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Lot'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maLotFilter'),
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        viewModel.set('selectedLotRecord', null);
        grid.getSelectable().deselectAll();

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
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        var stockin_d = viewModel.get('stockin.stockin_d');

        grid.getSelectable().deselectAll();
        viewModel.set('lotnumberTxt', '');
        this.resetForm();
        this.getView().down('#lotnumberTxt').focus();

        var maPklFilterByMaVai = viewModel.get('maPklFilterByMaVai') == null ? '' : viewModel.get('maPklFilterByMaVai').toLowerCase();
        var maPklFilter = viewModel.get('maPklFilter') == null ? '' : viewModel.get('maPklFilter').toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            var isByMaVaiOK = false;
            var isByLotOK = false;
            if(
                rec.get('lotnumber').toLowerCase().includes(maPklFilter)
            ){
                isByLotOK = true;
            }
            for(var i=0; i<stockin_d.length; i++){
                if(stockin_d[i].skucode.toLowerCase().includes(maPklFilterByMaVai)){
                    if(stockin_d[i].skuid_link == rec.get('skuid_link')){
                        isByMaVaiOK = true;
                    }
                }
            }
            if(isByMaVaiOK && isByLotOK){
                return true;
            }else{
                return false;
            }
        });

        // if (filterField.getValue()) {
        //     this.maPklFilter = filters.add({
        //         id: 'maPklFilter',
        //         property: 'lotnumber',
        //         value: filterField.getValue(),
        //         anyMatch: true,
        //         caseSensitive: false
        //     });
        // }
        // else if (this.maPklFilter) {
        //     filters.remove(this.maPklFilter);
        //     this.maPklFilter = null;
        // }
    },
    onmaPklRecheckFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Pkl_Recheck'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklRecheckFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        var stockin_d = viewModel.get('stockin.stockin_d');

        grid.getSelectable().deselectAll();
        viewModel.set('lotnumberTxtRecheck', '');
        this.resetForm();
        this.getView().down('#lotnumberTxtRecheck').focus();

        var maPklFilterByMaVai = viewModel.get('maPklRecheckFilterByMaVai') == null ? '' : viewModel.get('maPklRecheckFilterByMaVai').toLowerCase();
        var maPklFilter = viewModel.get('maPklRecheckFilter') == null ? '' : viewModel.get('maPklRecheckFilter').toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            var isByMaVaiOK = false;
            var isByLotOK = false;
            if(
                rec.get('lotnumber').toLowerCase().includes(maPklFilter)
            ){
                isByLotOK = true;
            }
            for(var i=0; i<stockin_d.length; i++){
                if(stockin_d[i].skucode.toLowerCase().includes(maPklFilterByMaVai)){
                    if(stockin_d[i].skuid_link == rec.get('skuid_link')){
                        isByMaVaiOK = true;
                    }
                }
            }
            if(isByMaVaiOK && isByLotOK){
                return true;
            }else{
                return false;
            }
        });
    },

    // Stockin_M_Edit_P
    itemStockinDTap: function(record){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
        viewModel.set('stockinD', record.data);
		var stockin = viewModel.get('stockin');

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
        var stockin_d = viewModel.get('stockin.stockin_d');
        var stockin_lot = viewModel.get('stockin.stockin_lot');

        var lotnumberTxt = viewModel.get('lotnumberTxt');
        var packageidTxt = viewModel.get('packageidTxt');
        var yTxt = viewModel.get('yTxt');
        var mTxt = viewModel.get('mTxt');
        var yOriginTxt = viewModel.get('yOriginTxt');
        var mOriginTxt = viewModel.get('mOriginTxt');
        var colorTxt = viewModel.get('colorTxt');
        // var widthTxt = viewModel.get('widthTxt');
        var sampleCheckTxt = viewModel.get('sampleCheckTxt');
        var grossweightTxt = viewModel.get('grossweightTxt'); 
        var grossweightCheckTxt = viewModel.get('grossweightCheckTxt');
        var widthYdsCheckTxt = viewModel.get('widthYdsCheckTxt');
        var widthYdsTxt = viewModel.get('widthYdsTxt');
        var widthMetCheckTxt = viewModel.get('widthMetCheckTxt');
        var widthMetTxt = viewModel.get('widthMetTxt');

        // check textfield
        if(stockin.unitid_link == 3){
            if(packageidTxt == '' || yTxt == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 3000);
                return;
            }
            if(isNaN(yTxt)){
                Ext.toast('Số Y phải là số', 3000);
                return;
            }
        }
        if(stockin.unitid_link == 1){
            if(packageidTxt == '' || mTxt == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 3000);
                return;
            }
            if(isNaN(mTxt)){
                Ext.toast('Số M phải là số', 3000);
                return;
            }
        }

        // check lotnumber tồn tại
        var isLotnumberExist = stockin_lot.some(
            item => item.lot_number.toUpperCase() == lotnumberTxt.toUpperCase()
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
        if(grossweightCheckTxt == null || grossweightCheckTxt == '') grossweightCheckTxt = 0;
        if(grossweightTxt == null || grossweightTxt == '' || grossweightTxt == 0) grossweightTxt = grossweightCheckTxt;
        if(widthYdsCheckTxt == null || widthYdsCheckTxt == '') widthYdsCheckTxt = 0;
        if(widthYdsTxt == null || widthYdsTxt == '' || widthYdsTxt == 0) widthYdsTxt = widthYdsCheckTxt;
        if(widthMetCheckTxt == null || widthMetCheckTxt == '') widthMetCheckTxt = 0;
        if(widthMetTxt == null || widthMetTxt == '' || widthMetTxt == 0) widthMetTxt = widthMetCheckTxt;

        var objData = new Object();
        objData.lotnumberTxt = lotnumberTxt;
        objData.packageidTxt = packageidTxt;
        objData.yTxt = yTxt;
        objData.mTxt = mTxt;
        objData.yOriginTxt = yOriginTxt;
        objData.mOriginTxt = mOriginTxt;
        objData.colorTxt = colorTxt;
        // objData.widthTxt = widthTxt;
        objData.sampleCheckTxt = sampleCheckTxt;
        objData.grossweightTxt = grossweightTxt;
        objData.grossweightCheckTxt = grossweightCheckTxt;
        objData.widthYdsCheckTxt = widthYdsCheckTxt;
        objData.widthYdsTxt = widthYdsTxt;
        objData.widthMetCheckTxt = widthMetCheckTxt;
        objData.widthMetTxt = widthMetTxt;
        objData.unitid_link = stockin.unitid_link;

        var viewPklRecheck = this.getView().down('#Stockin_M_Edit_Pkl_Recheck');
        var storePklRecheck = viewPklRecheck.getStore();
        var storePackinglistRecheckArr = viewModel.get('storePackinglistRecheckArr');
        var viewPkl = this.getView().down('#Stockin_M_Edit_Pkl');
        var storePkl = viewPkl.getStore();
        var items = viewModel.get('storePackinglistArrAll');
        var isExist = false;

        // lặp qua danh sách để tìm cây vải tương ứng
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            // nếu tìm thấy cây vải
            if(item.lotnumber.toUpperCase() == lotnumberTxt.toUpperCase() && item.packageid == packageidTxt){
                isExist = true;

                // thay đổi thông tin storePackinglistArr (danh sách hiển thị pkl)
                var ydscheck = 0;
                var met_check = 0;
                var ydsorigin = 0;
                var met_origin = 0;
                var sample_check = 0;
                var width_yds =0;
                var width_yds_check = 0;
                var width_met = 0;
                var width_met_check = 0;
                if(stockin.unitid_link == 3){
                    ydscheck = parseFloat(yTxt);
                    met_check = ydscheck * 0.9144;
                    ydsorigin = parseFloat(yOriginTxt);
                    met_origin = ydsorigin * 0.9144;
                    width_yds_check = parseFloat(widthYdsTxt);
                    width_met_check = width_yds_check * 0.9144;
                    width_yds = parseFloat(widthYdsTxt);
                    width_met = width_yds * 0.9144;
                }
                if(stockin.unitid_link == 1){
                    met_check = parseFloat(mTxt);
                    ydscheck = met_check / 0.9144;
                    met_origin = parseFloat(mOriginTxt);
                    ydsorigin = met_origin / 0.9144;
                    width_met_check = parseFloat(widthMetCheckTxt);
                    width_yds_check = width_met_check / 0.9144;
                    width_met = parseFloat(widthMetTxt);
                    width_yds = width_met / 0.9144;
                }
                // width_check = parseFloat(widthTxt);
                sample_check = parseFloat(sampleCheckTxt);
                grossweight = parseFloat(grossweightTxt);
                grossweight_check = parseFloat(grossweightCheckTxt);
                
                item.ydscheck = parseFloat(Ext.util.Format.number(ydscheck, '0.00'));
                item.met_check = parseFloat(Ext.util.Format.number(met_check, '0.00'));
                item.ydsorigin = parseFloat(Ext.util.Format.number(ydsorigin, '0.00'));
                item.met_origin = parseFloat(Ext.util.Format.number(met_origin, '0.00'));
                item.sample_check = parseFloat(Ext.util.Format.number(sample_check, '0.00'));
                // item.width_check = parseFloat(width_check);
                item.width_met = parseFloat(Ext.util.Format.number(width_met, '0.00'));
                item.width_met_check = parseFloat(Ext.util.Format.number(width_met_check, '0.00'));
                item.width_yds = parseFloat(Ext.util.Format.number(width_yds, '0.00'));
                item.width_yds_check = parseFloat(Ext.util.Format.number(width_yds_check, '0.00'));
                item.grossweight = parseFloat(Ext.util.Format.number(grossweight, '0.00'));
                item.grossweight_check = parseFloat(Ext.util.Format.number(grossweight_check, '0.00'));
                item.checked = 1;
                if(item.status < 1)item.status = 1;

                // update storePkl
                viewModel.set('storePackinglistArrAll', items);
                m.setPklAndPklStatusLessThan1(items);
                // storePkl.setData([]);
                storePkl.removeAll();
                storePkl.insert(0, viewModel.get('storePackinglistArr'));

                // update storePklRecheck
                for(var j = 0; j < storePackinglistRecheckArr.length; j++){
                    if(storePackinglistRecheckArr[j].lotnumber.toUpperCase() == item.lotnumber.toUpperCase() && storePackinglistRecheckArr[j].packageid == item.packageid){
                        storePackinglistRecheckArr[j] = item;
                    }
                }
                viewModel.set('storePackinglistRecheckArr', storePackinglistRecheckArr);
                // storePklRecheck.setData([]);
                storePklRecheck.removeAll();
                storePklRecheck.insert(0, storePackinglistRecheckArr);
            }
        }

        // nếu ko có trong danh sách, thêm cây vải
        if(!isExist){
            // set color
            for(var i = 0;i < stockin_lot.length; i++){
                if(stockin_lot[i].lot_number.toUpperCase() == lotnumberTxt.toUpperCase()){
                    for(var j = 0; j < stockin_d.length; j++){
                        if(stockin_lot[i].materialid_link == stockin_d[j].skuid_link){
                            objData.colorTxt = stockin_d[j].colorid_link;
                        }
                    }
                }
            }
            objData = m.themCayVaiMoi(objData);
        }

        // thay đổi thông tin obj stockin
        m.setDataStockin();

        m.resetForm();
        m.resetFormRecheck();
        m.resetFormAddLot();
        m.resetFormAddSpace();

        m.getView().down('#packageidTxt').focus();
        //  m.onSave();
        console.log(stockin);
    },
    onCheckRecheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockin_d = viewModel.get('stockin.stockin_d');
        var stockin_lot = viewModel.get('stockin.stockin_lot');

        var lotnumberTxt = viewModel.get('lotnumberTxtRecheck');
        var packageidTxt = viewModel.get('packageidTxtRecheck');
        var yTxt = viewModel.get('yTxtRecheck');
        var mTxt = viewModel.get('mTxtRecheck');
        var yOriginTxt = viewModel.get('yOriginTxtRecheck');
        var mOriginTxt = viewModel.get('mOriginTxtRecheck');
        var colorTxt = viewModel.get('colorTxtRecheck');
        // var widthTxt = viewModel.get('widthTxtRecheck');
        var sampleCheckTxt = viewModel.get('sampleCheckTxtRecheck');
        var grossweightTxt = viewModel.get('grossweightTxtRecheck');
        var grossweightCheckTxt = viewModel.get('grossweightCheckTxtRecheck');
        var widthYdsCheckTxt = viewModel.get('widthYdsCheckTxtRecheck');
        var widthYdsTxt = viewModel.get('widthYdsTxtRecheck');
        var widthMetCheckTxt = viewModel.get('widthMetCheckTxtRecheck');
        var widthMetTxt = viewModel.get('widthMetTxtRecheck');

        // check textfield
        if(stockin.unitid_link == 3){
            if(packageidTxt == '' || yTxt == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 3000);
                return;
            }
            if(isNaN(yTxt)){
                Ext.toast('Số Y phải là số', 3000);
                return;
            }
        }
        if(stockin.unitid_link == 1){
            if(packageidTxt == '' || mTxt == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 3000);
                return;
            }
            if(isNaN(mTxt)){
                Ext.toast('Số M phải là số', 3000);
                return;
            }
        }

        // check lotnumber tồn tại
        var isLotnumberExist = stockin_lot.some(
            item => item.lot_number.toUpperCase() == lotnumberTxt.toUpperCase()
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
        if(grossweightTxt == null || grossweightTxt == '') grossweightTxt = 0;
        if(grossweightCheckTxt == null || grossweightCheckTxt == '') grossweightCheckTxt = 0;

        var objData = new Object();
        objData.lotnumberTxt = lotnumberTxt;
        objData.packageidTxt = packageidTxt;
        objData.yTxt = yTxt;
        objData.mTxt = mTxt;
        objData.yOriginTxt = yOriginTxt;
        objData.mOriginTxt = mOriginTxt;
        objData.colorTxt = colorTxt;
        // objData.widthTxt = widthTxt;
        objData.sampleCheckTxt = sampleCheckTxt;
        objData.grossweightTxt = grossweightTxt;
        objData.grossweightCheckTxt = grossweightCheckTxt;
        objData.widthYdsCheckTxt = widthYdsCheckTxt;
        objData.widthYdsTxt = widthYdsTxt;
        objData.widthMetCheckTxt = widthMetCheckTxt;
        objData.widthMetTxt = widthMetTxt;

        var viewPklRecheck = this.getView().down('#Stockin_M_Edit_Pkl_Recheck');
        var storePklRecheck = viewPklRecheck.getStore();
        var storePackinglistRecheckArr = viewModel.get('storePackinglistRecheckArr');
        var viewPkl = this.getView().down('#Stockin_M_Edit_Pkl');
        var storePkl = viewPkl.getStore();
        // var items = viewModel.get('storePackinglistArr');
        var items = viewModel.get('storePackinglistArrAll');
        var isExist = false;
        // lặp qua danh sách để tìm cây vải tương ứng
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            // nếu tìm thấy cây vải
            if(item.lotnumber.toUpperCase() == lotnumberTxt.toUpperCase() && item.packageid == packageidTxt){
                isExist = true;

                // thay đổi thông tin storePackinglistArr (danh sách hiển thị pkl)
                // thêm vào danh sách pkl_recheck nếu chưa có
                // thay đổi bản ghi trong danh sách pkl_recheck nếu đã có
                var ydscheck = 0;
                var met_check = 0;
                var ydsorigin = 0;
                var met_origin = 0;
                var sample_check = 0;
                var width_yds =0;
                var width_yds_check = 0;
                var width_met = 0;
                var width_met_check = 0;
                if(stockin.unitid_link == 3){
                    ydscheck = parseFloat(yTxt);
                    met_check = ydscheck * 0.9144;
                    ydsorigin = parseFloat(yOriginTxt);
                    met_origin = ydsorigin * 0.9144;

                    width_yds_check = parseFloat(widthYdsTxt);
                    width_met_check = width_yds_check * 0.9144;
                    width_yds = parseFloat(widthYdsTxt);
                    width_met = width_yds * 0.9144;
                }
                if(stockin.unitid_link == 1){
                    met_check = parseFloat(mTxt);
                    ydscheck = met_check / 0.9144;
                    met_origin = parseFloat(mOriginTxt);
                    ydsorigin = met_origin / 0.9144;

                    width_met_check = parseFloat(widthMetCheckTxt);
                    width_yds_check = width_met_check / 0.9144;
                    width_met = parseFloat(widthMetTxt);
                    width_yds = width_met / 0.9144;
                }

                // width_check = Ext.util.Format.number(parseFloat(widthTxt), '0.00');
                sample_check = parseFloat(sampleCheckTxt);
                grossweight = parseFloat(grossweightTxt);
                grossweight_check = parseFloat(grossweightCheckTxt);
                
                item.ydscheck = parseFloat(Ext.util.Format.number(ydscheck, '0.00'));
                item.met_check = parseFloat(Ext.util.Format.number(met_check, '0.00'));
                item.ydsorigin = parseFloat(Ext.util.Format.number(ydsorigin, '0.00'));
                item.met_origin = parseFloat(Ext.util.Format.number(met_origin, '0.00'));
                item.sample_check = parseFloat(Ext.util.Format.number(sample_check, '0.00'));
                // item.width_check = parseFloat(width_check);
                item.width_met = parseFloat(Ext.util.Format.number(width_met, '0.00'));
                item.width_met_check = parseFloat(Ext.util.Format.number(width_met_check, '0.00'));
                item.width_yds = parseFloat(Ext.util.Format.number(width_yds, '0.00'));
                item.width_yds_check = parseFloat(Ext.util.Format.number(width_yds_check, '0.00'));
                item.grossweight = parseFloat(Ext.util.Format.number(grossweight, '0.00'));
                item.grossweight_check = parseFloat(Ext.util.Format.number(grossweight_check, '0.00'));
                item.checked = 1;
                item.status = 2;

                // update storePkl
                viewModel.set('storePackinglistArrAll', items);
                m.setPklAndPklStatusLessThan1(items);
                // storePkl.setData([]);
                storePkl.removeAll();
                storePkl.insert(0, viewModel.get('storePackinglistArr'));

                // update storePklRecheck
                var isExistInStorePackinglistRecheckArr = false;
                for(var j = 0; j < storePackinglistRecheckArr.length; j++){
                    if(storePackinglistRecheckArr[j].lotnumber.toUpperCase() == item.lotnumber.toUpperCase() && storePackinglistRecheckArr[j].packageid == item.packageid){
                        storePackinglistRecheckArr[j] = item;
                        isExistInStorePackinglistRecheckArr = true;
                    }
                }
                if(!isExistInStorePackinglistRecheckArr){
                    storePackinglistRecheckArr.push(item);
                }
                viewModel.set('storePackinglistRecheckArr', storePackinglistRecheckArr);
                // storePklRecheck.setData([]);
                storePklRecheck.removeAll();
                storePklRecheck.insert(0, storePackinglistRecheckArr);
            }
        }

        // nếu ko có trong danh sách, thêm cây vải
        if(!isExist){
            Ext.toast('Không tồn tại cây vải với số cây và lot này', 3000);
            return;
        }

        // thay đổi thông tin obj stockin
        m.setDataStockin();

        m.resetForm();
        m.resetFormRecheck();
        m.resetFormAddLot();
        m.resetFormAddSpace();

        m.getView().down('#packageidTxtRecheck').focus();
        // m.onSave();
        console.log(stockin);
    },
    themCayVaiMoi: function(objData){
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var storePackinglistArrAll = viewModel.get('storePackinglistArrAll');
        var storePackinglistArr = viewModel.get('storePackinglistArr');
        var stockin_lot = viewModel.get('stockin.stockin_lot');
        var view = this.getView().down('#Stockin_M_Edit_Pkl');
        var store = view.getStore();

        var lotnumberTxt = objData.lotnumberTxt;
        var packageidTxt = objData.packageidTxt;
        var yTxt = objData.yTxt;
        var mTxt = objData.mTxt;
        var yOriginTxt = objData.yOriginTxt;
        var mOriginTxt = objData.mOriginTxt;
        var colorTxt = objData.colorTxt;
        // var widthTxt = objData.widthTxt;
        var sampleCheckTxt = objData.sampleCheckTxt;
        var grossweightTxt = objData.grossweightTxt;
        var grossweightCheckTxt = objData.grossweightCheckTxt;
        var widthYdsCheckTxt = objData.widthYdsCheckTxt;
        var widthYdsTxt = objData.widthYdsTxt;
        var widthMetCheckTxt = objData.widthMetCheckTxt;
        var widthMetTxt = objData.widthMetTxt;

        var ydscheck = 0;
        var met_check = 0;
        var ydsorigin = 0;
        var met_origin = 0;
        var sample_check = 0;
        var width_yds =0;
        var width_yds_check = 0;
        var width_met = 0;
        var width_met_check = 0;
        if(stockin.unitid_link == 3){
            ydscheck = parseFloat(yTxt), '0.00';
            met_check = ydscheck * 0.9144;
            ydsorigin = parseFloat(yOriginTxt);
            met_origin = ydsorigin * 0.9144;

            width_yds_check = parseFloat(widthYdsCheckTxt);
            width_met_check = width_yds_check * 0.9144;
            width_yds = parseFloat(widthYdsTxt);
            width_met = width_yds * 0.9144;
        }
        if(stockin.unitid_link == 1){
            met_check = parseFloat(mTxt);
            ydscheck = met_check / 0.9144;
            met_origin = parseFloat(mOriginTxt);
            ydsorigin = met_origin / 0.9144;

            width_met_check = parseFloat(widthMetCheckTxt);
            width_yds_check = width_met_check / 0.9144;
            width_met = parseFloat(widthMetTxt);
            width_yds = width_met / 0.9144;
        }
        // width_check = Ext.util.Format.number(parseFloat(widthTxt), '0.00');
        sample_check = parseFloat(sampleCheckTxt);
        grossweight = parseFloat(grossweightTxt);
        grossweight_check = parseFloat(grossweightCheckTxt);

        var item = new Object();
        item.checked = 0;
        item.colorid_link = colorTxt;
        item.comment = '';
        item.lotnumber = lotnumberTxt;
        item.m3 = 0;
        item.netweight = 0;
        item.packageid = packageidTxt;
        item.unitid_link = stockin.unitid_link;
        item.width = 0;
        item.ydscheck = parseFloat(Ext.util.Format.number(ydscheck, '0.00'));
        item.met_check = parseFloat(Ext.util.Format.number(met_check, '0.00'));
        item.ydsorigin = parseFloat(Ext.util.Format.number(ydsorigin, '0.00'));
        item.met_origin = parseFloat(Ext.util.Format.number(met_origin, '0.00'));
        item.sample_check = parseFloat(Ext.util.Format.number(sample_check, '0.00'));
        // item.width_check = parseFloat(width_check);
        item.width_met = parseFloat(Ext.util.Format.number(width_met, '0.00'));
        item.width_met_check = parseFloat(Ext.util.Format.number(width_met_check, '0.00'));
        item.width_yds = parseFloat(Ext.util.Format.number(width_yds, '0.00'));
        item.width_yds_check = parseFloat(Ext.util.Format.number(width_yds_check, '0.00'));
        item.grossweight = parseFloat(Ext.util.Format.number(grossweight, '0.00'));
        item.grossweight_check = parseFloat(Ext.util.Format.number(grossweight_check, '0.00'));
        item.checked = 1;
        item.status = 1;

        for(var i = 0; i < stockin_lot.length; i++){
            if(stockin_lot[i].lot_number.toUpperCase() == item.lotnumber.toUpperCase()){
                item.skuid_link = stockin_lot[i].materialid_link;
            }
        }

        storePackinglistArr.push(item);
        viewModel.set('storePackinglistArr', storePackinglistArr);
        storePackinglistArrAll.push(item);
        viewModel.set('storePackinglistArrAll', storePackinglistArrAll);
        // store.setData([]);
        store.removeAll();
        store.insert(0, storePackinglistArr);

        return item;
    },
    setDataStockin: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockin_d = viewModel.get('stockin.stockin_d');
        var stockin_lot = viewModel.get('stockin.stockin_lot');
        var storePackinglistArr = viewModel.get('storePackinglistArr');
        var storePackinglistArrAll = viewModel.get('storePackinglistArrAll');

        // Lot data
        var viewLot = this.getView().down('#Stockin_M_Edit_Lot');
        var storeLot = viewLot.getStore();
        for(var i = 0; i < stockin_lot.length; i++){
            var totalmetcheck = 0;
            var totalydscheck = 0;
            var grossweight_check = 0;
            var totalpackagepklist = 0;
            for(var j = 0; j < storePackinglistArrAll.length; j++){
                var pkl = storePackinglistArrAll[j];
                if(stockin_lot[i].lot_number.toUpperCase() == pkl.lotnumber.toUpperCase()){
                    totalmetcheck+=pkl.met_check;
                    totalydscheck+=pkl.ydscheck;
                    grossweight_check+=pkl.grossweight_check;
                    totalpackagepklist++;
                }
            }
            stockin_lot[i].totalmetcheck = totalmetcheck;
            stockin_lot[i].totalydscheck = totalydscheck;
            stockin_lot[i].grossweight_check = grossweight_check;
            stockin_lot[i].totalpackagepklist = totalpackagepklist;
        }
        viewModel.set('stockin.stockin_lot', stockin_lot);
        // storeLot.setData([]);
        storeLot.removeAll();
        storeLot.insert(0, stockin_lot);

        // StockinD data
        var viewD = this.getView().down('#Stockin_M_Edit_D');
        var storeD = viewD.getStore();
        for(var i = 0; i < stockin_d.length; i++){
            stockin_d[i].stockin_packinglist = [];
            var totalmet_check = 0;
            var totalydscheck = 0;
            var grossweight = 0;
            for(var j = 0; j < storePackinglistArrAll.length; j++){
                var pkl = storePackinglistArrAll[j];
                if(stockin_d[i].skuid_link == pkl.skuid_link){
                    stockin_d[i].stockin_packinglist.push(pkl);
                    totalmet_check+=pkl.met_check;
                    totalydscheck+=pkl.ydscheck;
                    grossweight+=pkl.grossweight;
                }
            }
            stockin_d[i].totalmet_check = totalmet_check;
            stockin_d[i].totalydscheck = totalydscheck;
            stockin_d[i].grossweight = grossweight;
        }
        viewModel.set('stockin.stockin_d', stockin_d);
        // storeD.setData([]);
        storeD.removeAll();
        storeD.insert(0, stockin_d);

        // console.log(stockin);
        // console.log(storePackinglistArr);
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

        var stockin_lot = stockin.stockin_lot;
        if(stockin_lot != null){
            for(var i = 0; i < stockin_lot.length; i++){
                if(stockin_lot[i].id == 0 || typeof stockin_lot[i].id === 'string'){
                    stockin_lot[i].id = null;
                }
            }
        }

        var stockin_product = stockin.stockin_product;
        if(stockin_product != null){
            for(var i = 0; i < stockin_product.length; i++){
                if(stockin_product[i].id == 0 || typeof stockin_product[i].id === 'string'){
                    stockin_product[i].id = null;
                }
            }
        }

        params.data.push(stockin);
        // me.setLoading("Đang lưu dữ liệu");
        // GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create_material', Ext.JSON.encode(params),
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        // m.redirectTo("stockin_m_main/" + response.id + "/edit");
                        m.getInfo(stockin.id);
                        viewModel.set('selectedDRecord', null);
                        viewModel.set('selectedLotRecord', null);
                        viewModel.set('selectedPklRecheckRecord', null);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi lập phiếu: ' + response.message, 3000);
                }
        })

        // console.log(stockin);
    },

    onItemPklTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        // console.log(location);
        var record = location.record;
        
        viewModel.set('lotnumberTxt', record.get('lotnumber'));
        viewModel.set('packageidTxt', record.get('packageid'));
        viewModel.set('yTxt', record.get('ydscheck'));
        viewModel.set('mTxt', record.get('met_check'));
        viewModel.set('yOriginTxt', record.get('ydsorigin'));
        viewModel.set('mOriginTxt', record.get('met_origin'));
        viewModel.set('colorTxt', record.get('colorid_link'));
        // viewModel.set('widthTxt', record.get('width_check'));
        viewModel.set('grossweightTxt', record.get('grossweight'));
        viewModel.set('grossweightCheckTxt', record.get('grossweight_check'));
        viewModel.set('sampleCheckTxt', record.get('sample_check'));
        viewModel.set('widthYdsCheckTxt', record.get('width_yds_check'));
        viewModel.set('widthYdsTxt', record.get('width_yds'));
        viewModel.set('widthMetCheckTxt', record.get('width_met_check'));
        viewModel.set('widthMetTxt', record.get('width_met'));
    },
    onItemPklRecheckTap: function(dataview, index, target, record, e, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');
        
        viewModel.set('lotnumberTxtRecheck', record.get('lotnumber'));
        viewModel.set('packageidTxtRecheck', record.get('packageid'));
        viewModel.set('yTxtRecheck', record.get('ydscheck'));
        viewModel.set('mTxtRecheck', record.get('met_check'));
        viewModel.set('yOriginTxtRecheck', record.get('ydsorigin'));
        viewModel.set('mOriginTxtRecheck', record.get('met_origin'));
        viewModel.set('colorTxtRecheck', record.get('colorid_link'));
        viewModel.set('widthTxtRecheck', record.get('width_check'));
        viewModel.set('grossweightTxtRecheck', record.get('grossweight'));
        viewModel.set('grossweightCheckTxtRecheck', record.get('grossweight_check'));
        viewModel.set('sampleCheckTxtRecheck', record.get('sample_check'));
        viewModel.set('widthYdsCheckTxtRecheck', record.get('width_yds_check'));
        viewModel.set('widthYdsTxtRecheck', record.get('width_yds'));
        viewModel.set('widthMetCheckTxtRecheck', record.get('width_met_check'));
        viewModel.set('widthMetTxtRecheck', record.get('width_met'));

        viewModel.set('selectedPklRecheckRecord', record);
    },
    onbtnResetForm: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('lotnumberTxt', '');
        m.resetForm();
    },
    onbtnResetFormRecheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('lotnumberTxtRecheck', '');
        m.resetFormRecheck();
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
        
        // viewModel.set('lotnumberTxt', '');
        viewModel.set('packageidTxt', '');
        viewModel.set('yTxt', '');
        viewModel.set('mTxt', '');
        viewModel.set('yOriginTxt', '');
        viewModel.set('mOriginTxt', '');
        // viewModel.set('colorTxt', stockinD.colorid_link);
        // viewModel.set('widthTxt', '');
        viewModel.set('grossweightTxt', '');
        viewModel.set('grossweightCheckTxt', '');
        viewModel.set('sampleCheckTxt', '');
        viewModel.set('widthYdsCheckTxt', '');
        viewModel.set('widthYdsTxt', '');
        viewModel.set('widthMetCheckTxt', '');
        viewModel.set('widthMetTxt', '');
        // m.getView().down('#packageidTxt').focus();
    },
    resetFormRecheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        
        // viewModel.set('lotnumberTxtRecheck', '');
        viewModel.set('packageidTxtRecheck', '');
        viewModel.set('yTxtRecheck', '');
        viewModel.set('mTxtRecheck', '');
        viewModel.set('yOriginTxtRecheck', '');
        viewModel.set('mOriginTxtRecheck', '');
        // viewModel.set('colorTxt', stockinD.colorid_link);
        // viewModel.set('widthTxtRecheck', '');
        viewModel.set('grossweightTxtRecheck', '');
        viewModel.set('grossweightCheckTxtRecheck', '');
        viewModel.set('sampleCheckTxtRecheck', '');
        viewModel.set('widthYdsCheckTxtRecheck', '');
        viewModel.set('widthYdsTxtRecheck', '');
        viewModel.set('widthMetCheckTxtRecheck', '');
        viewModel.set('widthMetTxtRecheck', '');
        // m.getView().down('#packageidTxtRecheck').focus();
    },
    resetFormAddLot: function(){
        var m = this;
        var viewModel = this.getViewModel();

        viewModel.set('lotNumberTxt', '');
        viewModel.set('cayNumberTxt', '');
        viewModel.set('yNumberTxt', '');
        viewModel.set('canNumberTxt', '');
    },
    resetFormAddSpace: function(){
        var m = this;
        var viewModel = this.getViewModel();
        
        viewModel.set('lotRow', null);
        viewModel.set('lotSpace', null);
        viewModel.set('lotFloor', null);
        viewModel.set('lotAmount', null);
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
        grid.getSelectable().select(location.record);
    },
    setSpaceStore: function(lotSpace){
        // update space textfield
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
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
        // console.log(lotSpaceArrStore);
        var spacesString = '';
        for(var i = 0; i < lotSpaceArrStore.length; i++){
            if(spacesString == ''){
                spacesString+=lotSpaceArrStore[i].space.split('C')[0];
                spacesString+= ' (' + lotSpaceArrStore[i].space.split('C')[1] + ')';
            }else{
                spacesString+=';'+lotSpaceArrStore[i].space.split('C')[0];
                spacesString+= ' (' + lotSpaceArrStore[i].space.split('C')[1] + ')';
            }
        }
        viewModel.set('spacesString', spacesString);
    },
    onLotCheck: function(grid, info){
        // console.log(info);
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');
        
        var record = info.record;
        if(record.get('status') == -1){
            var totalpackage = record.get('totalpackage');
            record.set('totalpackagecheck', totalpackage);
            record.set('status', 0);
        }else{
            record.set('totalpackagecheck', 0);
            record.set('status', -1);
        }
        console.log(info);
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
    onLotEditSpace: function(){
        // popup danh sách các khoang của lot này
        // từ string space tách ra thành các record
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var unitid_link = stockin.unitid_link;

        // thông báo nếu chưa chọn lot
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        if(selectedLotRecord == null){
            Ext.toast('Chưa chọn lot', 1000);
            return;
        }

        // taọ popup và chuyền thông tin record vào
        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            title: 'Thông tin chi tiết',
            width: 300,
            height: 600,
            maxWidth: 300,
            maxHeight: 600,
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
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'Stockin_M_Edit_LotSpace_Edit',
                viewModel: {
                    data: {
                        selectedLotRecord: selectedLotRecord,
                        unitid_link: unitid_link
                    }
                }
            }],
        });
        dialog.show();

        // thông tin cũ trước update
        var oldSpace = selectedLotRecord.get('space');
        var oldLot_number = selectedLotRecord.get('lot_number');
        var oldTotalpackage = selectedLotRecord.get('totalpackage');
        var oldTotalmet = selectedLotRecord.get('totalmet');
        var oldTotalyds = selectedLotRecord.get('totalyds');
        var oldGrossweight = selectedLotRecord.get('grossweight');

        dialog.down('#Stockin_M_Edit_LotSpace_Edit').getController().on('Luu', function (newRecord) {
            // newRecord là selectedLotRecord sau khi thay đổi các giá trị
            // update lot grid, đồng thời update luôn các thuộc tính record để gửi
            m.updateLotGridRecord(newRecord);

            // lưu lot vào db qua api -> nhận obj trả về -> đẩy obj vào d/sách trên giao diện
            var params = new Object();
            params.data = newRecord.data;

            GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_lot_create', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.toast('Lưu thành công', 3000);
                            var data = response.data;

                            // update textfield
                            m.setSpaceStore(data.space);
                            // reset form
                            m.resetFormAddSpace();
                            dialog.close();
                            console.log(response);
                        }
                    } else {
                        var response = Ext.decode(response.responseText);
                        Ext.toast('Lưu thất bại: ' + response.message, 3000);
                        // update lại giá trị cũ
                        newRecord.set('space', oldSpace);
                        newRecord.set('lot_number', oldLot_number);
                        newRecord.set('totalpackage', oldTotalpackage);
                        newRecord.set('totalmet', oldTotalmet);
                        newRecord.set('totalyds', oldTotalyds);
                        newRecord.set('grossweight', oldGrossweight);
                        m.updateLotGridRecord(newRecord);
                    }
            })

        });

        // dialog.down('#Stockin_M_Edit_LotSpace_Edit').getController().on('Delete', function (record) {
        //     // update textfield
        //     m.setSpaceStore(selectedLotRecord.get('space'));
        //     // update lot grid
        //     m.updateLotGridRecord(selectedLotRecord);
        //     // dialog.close();
        // });

        dialog.down('#Stockin_M_Edit_LotSpace_Edit').getController().on('Thoat', function () {
            dialog.close();
        });

        // console.log(stockin);
    },
    onLotAddSpace: function(){
        // console.log(info);
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');

        // thông báo nếu chưa chọn lot
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        if(selectedLotRecord == null){
            Ext.toast('Chưa chọn lot', 1000);
            return;
        }

        // check thông tin
        var lotRow = viewModel.get('lotRow');
        var lotSpace = viewModel.get('lotSpace');
        var lotFloor = viewModel.get('lotFloor');
        var lotAmount = viewModel.get('lotAmount');

        if(lotRow == null || lotRow == ''){
            // Ext.toast('Chưa nhập dãy', 1000);
            // return;
            lotRow = 'x';
        }
        if(lotSpace == null || lotSpace == ''){
            // Ext.toast('Chưa nhập hàng', 1000);
            // return;
            lotSpace = 'x';
        }
        if(lotFloor == null || lotFloor == ''){
            // Ext.toast('Chưa nhập tầng', 1000);
            // return;
            lotFloor = 'x';
        }
        if(lotAmount == null || lotAmount == ''){
            lotAmount = 0;
            // return;
        }

        var spaceInfo = new Object();
        spaceInfo.lotRow = lotRow;
        spaceInfo.lotSpace = lotSpace;
        spaceInfo.lotFloor = lotFloor;
        spaceInfo.lotAmount = lotAmount;

        // D1H5T2C1
        // kiểm tra danh sách khoang đã có khoang này hay chưa
        // update thông tin thuộc tính cho lot
        var record = selectedLotRecord;
        // nếu lưu vào db fail thì set lại cho record trên giao diện
        var oldLotSpaceString = record.get('space');
        var oldStatus = record.get('status');
        var oldTotalpackagecheck  = record.get('totalpackagecheck');
        record = m.updateLotRecord(record, spaceInfo); // record.data là obj gửi lên api
        // update lot grid, đồng thời update luôn các thuộc tính record để gửi
        m.updateLotGridRecord(record);

        // lưu lot vào db qua api -> nhận obj trả về -> đẩy obj vào d/sách trên giao diện
        var params = new Object();
        params.data = record.data;

        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_lot_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        var data = response.data;

                        // update textfield
                        m.setSpaceStore(data.space);
                        // reset form
                        m.resetFormAddSpace();
                        // console.log(response);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 3000);
                    // update lại giá trị cũ
                    record.set('space', oldLotSpaceString);
                    record.set('status', oldStatus);
                    record.set('totalpackagecheck', oldTotalpackagecheck);
                    m.updateLotGridRecord(record);
                }
        })

        // old

        // // update textfield
        // m.setSpaceStore(record.get('space'));
        // // update lot grid
        // m.updateLotGridRecord(record);
        // // reset form
        // m.resetFormAddSpace();

        // console.log(stockin);
        // console.log(selectedLotRecord);
        // console.log(oldLotSpaceString);
        // console.log(record);
    },
    updateLotRecord: function(record, spaceInfo){
        // record: lot đang chọn
        // spaceInfo: lotRow, lotSpace, lotFloor, lotAmount
        var space = record.get('space') == null ? '' : record.get('space');
        var spaceInfoString = 'D' + spaceInfo.lotRow + 'H' + spaceInfo.lotSpace + 'T' + spaceInfo.lotFloor + 'C';
        var spaceStringArr = space.split(';'); // D1H1T1C1
        var isSpaceExist = false; // chưa tồn tại khoang trong danh sách khoang của lot
        
        var newLotSpaceString = '';
        for(var i = 0; i < spaceStringArr.length; i++){
            if(spaceStringArr[i].includes(spaceInfoString)){ // đã tồn tại trong danh sách khoang
                isSpaceExist = true;
                var amount = parseInt(spaceStringArr[i].split('C')[1]) + spaceInfo.lotAmount;
                spaceStringArr[i] = spaceStringArr[i].split('C')[0] + 'C' +amount;
            }
            if(newLotSpaceString == ''){
                newLotSpaceString+=spaceStringArr[i];
            }else{
                newLotSpaceString+=';' + spaceStringArr[i];
            }
        }

        if(!isSpaceExist){
            if(newLotSpaceString == ''){
                newLotSpaceString+= spaceInfoString + spaceInfo.lotAmount;
            }else{
                newLotSpaceString+= ';' + spaceInfoString + spaceInfo.lotAmount;
            }
        }
        record.set('space', newLotSpaceString);
        return record;
    },
    updateLotGridRecord: function(record){
        // update số cây kiểm theo space
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');

        var space = record.get('space');
        var spaceStringArr = space.split(';'); // D1H1T1C1
        var totalpackagecheck = 0;
        for(var i=0; i<spaceStringArr.length; i++){
            if(spaceStringArr[i] != null && spaceStringArr[i] != ''){
                var lotString = spaceStringArr[i];
                totalpackagecheck += parseInt(lotString.split('C')[1]);
            }
        }
        record.set('totalpackagecheck', totalpackagecheck);
        record.set('status', 0);
        // console.log(spaceStringArr);
    },

    onAddPklRecheck: function(grid, info){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockin_d = viewModel.get('stockin.stockin_d');

        var lotnumber = info.record.get('lotnumber');
        var packageid = info.record.get('packageid');
        var skuid_link = info.record.get('skuid_link');

        for(var i = 0; i < stockin_d.length; i++){
            var stockin_packinglist = stockin_d[i].stockin_packinglist == null ? [] : stockin_d[i].stockin_packinglist;
            for(j = 0; j < stockin_packinglist.length; j++){
                if(
                    stockin_packinglist[j].lotnumber.toUpperCase() == lotnumber.toUpperCase() &&
                    stockin_packinglist[j].packageid == packageid &&
                    stockin_packinglist[j].skuid_link == skuid_link
                ){
                    stockin_packinglist[j].status = 2;
                }
            }
        }
        viewModel.set('stockin.stockin_d', stockin_d);
        m.setStorePklAndPklReCheck(stockin);
        // console.log(info);
        // console.log(stockin);
    },
    onRemovePklRecheck: function(grid, info){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockin_d = viewModel.get('stockin.stockin_d');

        var lotnumber = info.record.get('lotnumber');
        var packageid = info.record.get('packageid');
        var skuid_link = info.record.get('skuid_link');

        for(var i = 0; i < stockin_d.length; i++){
            var stockin_packinglist = stockin_d[i].stockin_packinglist == null ? [] : stockin_d[i].stockin_packinglist;
            for(j = 0; j < stockin_packinglist.length; j++){
                if(
                    stockin_packinglist[j].lotnumber.toUpperCase() == lotnumber.toUpperCase() &&
                    stockin_packinglist[j].packageid == packageid &&
                    stockin_packinglist[j].skuid_link == skuid_link
                ){
                    stockin_packinglist[j].status = 1;
                }
            }
        }
        viewModel.set('stockin.stockin_d', stockin_d);
        viewModel.set('selectedPklRecheckRecord', null);
        m.setStorePklAndPklReCheck(stockin);
    },

    onlotNumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('lotNumberTxt', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('lotnumberTxt', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtRecheckType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('lotnumberTxtRecheck', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },

    // textfield focusleave events
    // pkl
    onmTxtFocusleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var mTxt = viewModel.get('mTxt');
        var mOriginTxt = viewModel.get('mOriginTxt');
        if(mOriginTxt == null || mOriginTxt == ''){
            viewModel.set('mOriginTxt', mTxt);
        }
    },
    onyTxtFocusleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var yTxt = viewModel.get('yTxt');
        var yOriginTxt = viewModel.get('yOriginTxt');
        if(yOriginTxt == null || yOriginTxt == ''){
            viewModel.set('yOriginTxt', yTxt);
        }
    },
    oncanCheckTxtFocusleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var grossweightCheckTxt = viewModel.get('grossweightCheckTxt');
        var grossweightTxt = viewModel.get('grossweightTxt');
        if(grossweightTxt == null || grossweightTxt == ''){
            viewModel.set('grossweightTxt', grossweightCheckTxt);
        }
    },
    onwidthYdsCheckTxtFocusleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var widthYdsCheckTxt = viewModel.get('widthYdsCheckTxt');
        var widthYdsTxt = viewModel.get('widthYdsTxt');
        if(widthYdsTxt == null || widthYdsTxt == ''){
            viewModel.set('widthYdsTxt', widthYdsCheckTxt);
        }
    },
    onwidthMetCheckTxtFocusleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var widthMetCheckTxt = viewModel.get('widthMetCheckTxt');
        var widthMetTxt = viewModel.get('widthMetTxt');
        if(widthMetTxt == null || widthMetTxt == ''){
            viewModel.set('widthMetTxt', widthMetCheckTxt);
        }
    },
    onlotnumberTxtAndpackageidTxtRecheckleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var storePackinglistArr = viewModel.get('storePackinglistArr');

        var lotnumberTxtRecheck = viewModel.get('lotnumberTxtRecheck');
        var packageidTxtRecheck = viewModel.get('packageidTxtRecheck');

        if(
            lotnumberTxtRecheck == '' || packageidTxtRecheck == '' ||
            lotnumberTxtRecheck == null || packageidTxtRecheck == null
        ){
            return;
        }else{
            var found = false;
            for(var i = 0; i < storePackinglistArr.length; i++){
                var obj = storePackinglistArr[i];
                if(
                    obj.lotnumber.toUpperCase() == lotnumberTxtRecheck.toUpperCase() &&
                    obj.packageid == packageidTxtRecheck
                ){
                    found = true;
                    // console.log(obj);
                    viewModel.set('mOriginTxtRecheck', obj.met_origin);
                    viewModel.set('yOriginTxtRecheck', obj.ydsorigin);
                    viewModel.set('grossweightTxtRecheck', obj.grossweight);
                    viewModel.set('widthMetTxtRecheck', obj.width_met);
                    viewModel.set('widthYdsTxtRecheck', obj.width_yds);
                }
            }
            if(!found){
                Ext.toast('Cây vải không tồn tại', 1000);
            }
        }
    },

    // sort store
    onSort: function(){
        var me = this.getView();
        var Stockin_M_Edit_D = me.down('#Stockin_M_Edit_D');
        Stockin_M_Edit_D.getStore().getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        });

        var Stockin_M_Edit_Lot = me.down('#Stockin_M_Edit_Lot');
        Stockin_M_Edit_Lot.getStore().getSorters().add({
            property: 'lot_number',
            direction: 'ASC'
        });

        var Stockin_M_Edit_Pkl = me.down('#Stockin_M_Edit_Pkl');
        Stockin_M_Edit_Pkl.getStore().getSorters().add({
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });

        var Stockin_M_Edit_Pkl_Recheck = me.down('#Stockin_M_Edit_Pkl_Recheck');
        Stockin_M_Edit_Pkl_Recheck.getStore().getSorters().add({
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    }
})