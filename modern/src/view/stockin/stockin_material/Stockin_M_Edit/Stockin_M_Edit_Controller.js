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
        // '#TabView':{
        //     activeItemchange: 'onTabViewActiveItemchange'
        // },
    },
    // onTabViewActiveItemchange: function(sender, value, oldValue, eOpts){
    //     // console.log(sender);
    //     // console.log(value);
    //     // console.log(oldValue);
    // },
    
    // onPklDetail: function(grid, info) {
    //     // Ext.Msg.alert('Approve', info.record.get('id'));
    //     var me = this.getView();
    //     var m = this;
	// 	var viewModel = this.getViewModel();
	// 	var stockin = viewModel.get('stockin');
    //     var id = info.record.data.id;

    //     m.redirectTo("stockin_m_main/" + id + "/edit_detail");
    // },
    onPrint: function(){
        console.log('print btn');
    },
    onBtnHomeTap: function(){
        this.redirectTo("mobilemenu");
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
                // for(var i=0; i<response.listepc.length; i++){
                //     listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                // }
                // store.setData(data.stockin_d);

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
    
    

    // Stockin_M_Edit_P
    // itemStockinDTap: function(record){
    //     var me = this.getView();
    //     var m = this;
	// 	var viewModel = this.getViewModel();
    //     viewModel.set('stockinD', record.data);
	// 	var stockin = viewModel.get('stockin');

    //     var attributeValueStore = viewModel.getStore('attributeValueStore');
    //     attributeValueStore.loadStore_colorForStockin(stockin.id);
    //     attributeValueStore.load({
    //         scope: this,
    //         callback: function(records, operation, success) {
    //             if(!success){
    //                 this.fireEvent('logout');
    //             } else {
    //                 m.resetForm();
    //                 viewModel.set('colorTxt', viewModel.get('stockinD.colorid_link'));
    //             }
    //         }
    //     });
    // },
    
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
    
    // onLotCheck: function(grid, info){
    //     // console.log(info);
    //     var m = this;
    //     var viewModel = this.getViewModel();
    //     var stockin = viewModel.get('stockin');
    //     var stockinD = viewModel.get('stockinD');
        
    //     var record = info.record;
    //     if(record.get('status') == -1){
    //         var totalpackage = record.get('totalpackage');
    //         record.set('totalpackagecheck', totalpackage);
    //         record.set('status', 0);
    //     }else{
    //         record.set('totalpackagecheck', 0);
    //         record.set('status', -1);
    //     }
    //     console.log(info);
    // },
    // onLotEdit: function(grid, info){
    //     // console.log(info);
    //     var m = this;
    //     var viewModel = this.getViewModel();
    //     var stockin = viewModel.get('stockin');
    //     var stockinD = viewModel.get('stockinD');

    //     var dialog = Ext.create({
    //         xtype: 'dialog',
    //         itemId: 'dialog',
    //         title: 'Xác nhận',
    //         width: 300,
    //         // height: 300,
    //         header: true,
    //         closable: true,
    //         closeAction: 'destroy',
    //         maximizable: false,
    //         maskTapHandler: function(){
    //             // console.log('mask tapped');
    //             if(dialog){
    //                 dialog.close();
    //             }
    //         },
    //         bodyPadding: '1',
    //         maxWidth: 300,
    //         layout: {
    //             type: 'fit', // fit screen for window
    //             padding: 5
    //         },
    //         items: [{
    //             border: false,
    //             xtype: 'Stockin_M_InputAmount',
    //             viewModel: {
    //                 data: {
    //                     totalpackagecheck: info.record.get('totalpackagecheck'),
    //                 }
    //             }
    //         }],
    //     });
    //     dialog.show();

    //     dialog.down('#Stockin_M_InputAmount').getController().on('Luu', function (totalpackagecheck) {
    //         var record = info.record;
    //         var totalpackage = record.get('totalpackage');
    //         record.set('totalpackagecheck', totalpackagecheck);
    //         record.set('status', 0);
    //         // if(totalpackagecheck >= totalpackage){
    //         //     record.set('status', 0);
    //         // }else{
    //         //     record.set('status', -1);
    //         // }
    //         dialog.close();
    //     });

    //     dialog.down('#Stockin_M_InputAmount').getController().on('Thoat', function () {
    //         dialog.close();
    //     });
    // },

    // onAddPklRecheck: function(grid, info){
    //     var m = this;
    //     var viewModel = this.getViewModel();
    //     var stockin = viewModel.get('stockin');
    //     var stockin_d = viewModel.get('stockin.stockin_d');

    //     var lotnumber = info.record.get('lotnumber');
    //     var packageid = info.record.get('packageid');
    //     var skuid_link = info.record.get('skuid_link');

    //     for(var i = 0; i < stockin_d.length; i++){
    //         var stockin_packinglist = stockin_d[i].stockin_packinglist == null ? [] : stockin_d[i].stockin_packinglist;
    //         for(j = 0; j < stockin_packinglist.length; j++){
    //             if(
    //                 stockin_packinglist[j].lotnumber.toUpperCase() == lotnumber.toUpperCase() &&
    //                 stockin_packinglist[j].packageid == packageid &&
    //                 stockin_packinglist[j].skuid_link == skuid_link
    //             ){
    //                 stockin_packinglist[j].status = 2;
    //             }
    //         }
    //     }
    //     viewModel.set('stockin.stockin_d', stockin_d);
    //     m.setStorePklAndPklReCheck(stockin);
    //     // console.log(info);
    //     // console.log(stockin);
    // },
    // onRemovePklRecheck: function(grid, info){
    //     var m = this;
    //     var viewModel = this.getViewModel();
    //     var stockin = viewModel.get('stockin');
    //     var stockin_d = viewModel.get('stockin.stockin_d');

    //     var lotnumber = info.record.get('lotnumber');
    //     var packageid = info.record.get('packageid');
    //     var skuid_link = info.record.get('skuid_link');

    //     for(var i = 0; i < stockin_d.length; i++){
    //         var stockin_packinglist = stockin_d[i].stockin_packinglist == null ? [] : stockin_d[i].stockin_packinglist;
    //         for(j = 0; j < stockin_packinglist.length; j++){
    //             if(
    //                 stockin_packinglist[j].lotnumber.toUpperCase() == lotnumber.toUpperCase() &&
    //                 stockin_packinglist[j].packageid == packageid &&
    //                 stockin_packinglist[j].skuid_link == skuid_link
    //             ){
    //                 stockin_packinglist[j].status = 1;
    //             }
    //         }
    //     }
    //     viewModel.set('stockin.stockin_d', stockin_d);
    //     viewModel.set('selectedPklRecheckRecord', null);
    //     m.setStorePklAndPklReCheck(stockin);
    // },

    
    
    

    // textfield focusleave events
    // pkl
    
    

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