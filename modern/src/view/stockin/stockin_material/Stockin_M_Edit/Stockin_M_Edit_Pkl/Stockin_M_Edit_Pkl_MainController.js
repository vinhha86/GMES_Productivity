Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Pkl_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Pkl_MainController',
	init: function () {
		
	},
    control: {

        '#btnResetForm':{
            tap: 'onbtnResetForm'
        },
        '#btnCheck':{
            tap: 'onCheck'
        },
        '#Stockin_M_Edit_Pkl':{
            childtap: 'onItemPklTap'
        },
        '#cbbox_pkl_stockindId':{
            change: 'oncbbox_pkl_stockindId_change'
        }
    },
    oncbbox_pkl_stockindId_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        // var pkl_stockindId = viewModel.get('pkl_stockindId');
        if(newValue != null && newValue != ''){
            var StockinPklStore = viewModel.getStore('StockinPklStore');
            StockinPklStore.loadStore_byStockinDIdAndGreaterThanStatus(newValue, -1);
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

        // var maPklFilterByMaVai = viewModel.get('maPklFilterByMaVai') == null ? '' : viewModel.get('maPklFilterByMaVai').toLowerCase();
        var maPklFilter = viewModel.get('maPklFilter') == null ? '' : viewModel.get('maPklFilter').toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            // var isByMaVaiOK = false;
            var isByLotOK = false;
            if(
                rec.get('lotnumber').toLowerCase().includes(maPklFilter)
            ){
                isByLotOK = true;
            }
            // for(var i=0; i<stockin_d.length; i++){
            //     if(stockin_d[i].skucode.toLowerCase().includes(maPklFilterByMaVai)){
            //         if(stockin_d[i].skuid_link == rec.get('skuid_link')){
            //             isByMaVaiOK = true;
            //         }
            //     }
            // }
            if(
                // isByMaVaiOK && 
                isByLotOK
            ){
                return true;
            }else{
                return false;
            }
        });
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
    onItemPklTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();

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

        // check combo đã chọn chưa
        var pkl_stockindId = viewModel.get('pkl_stockindId');
        if(pkl_stockindId == '' || pkl_stockindId == null){
            Ext.toast('Cần chọn loại vải', 3000);
            return;
        }

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
        objData.id = null;
        objData.lotnumber = lotnumberTxt;
        objData.packageid = packageidTxt;
        objData.ydscheck = yTxt;
        objData.met_check = mTxt;
        objData.ydsorigin = yOriginTxt;
        objData.met_origin = mOriginTxt;
        objData.colorid_link = colorTxt;
        // objData.widthTxt = widthTxt;
        objData.sample_check = sampleCheckTxt;
        objData.grossweight = grossweightTxt;
        objData.grossweight_check = grossweightCheckTxt;
        objData.width_yds_check = widthYdsCheckTxt;
        objData.width_yds = widthYdsTxt;
        objData.width_met_check = widthMetCheckTxt;
        objData.width_met = widthMetTxt;
        objData.unitid_link = stockin.unitid_link;
        objData.stockinid_link = stockin.id;
        objData.stockindid_link = pkl_stockindId;
        objData.status = 1;

        if(stockin.unitid_link == 3){
            // có y
            objData.ydscheck = parseFloat(yTxt);
            objData.met_check = objData.ydscheck * 0.9144;
            objData.ydsorigin = parseFloat(yOriginTxt);
            objData.met_origin = objData.ydsorigin * 0.9144;

            objData.width_yds_check = parseFloat(widthYdsTxt);
            objData.width_met_check = objData.width_yds_check * 0.9144;
            objData.width_yds = parseFloat(widthYdsTxt);
            objData.width_met = objData.width_yds * 0.9144;
        }
        if(stockin.unitid_link == 1){
            // có m
            objData.met_check = parseFloat(mTxt);
            objData.ydscheck = objData.met_check / 0.9144;
            objData.met_origin = parseFloat(mOriginTxt);
            objData.ydsorigin = objData.met_origin / 0.9144;

            objData.width_met_check = parseFloat(widthMetCheckTxt);
            objData.width_yds_check = objData.width_met_check / 0.9144;
            objData.width_met = parseFloat(widthMetTxt);
            objData.width_yds = objData.width_met / 0.9144;
        }

        objData.met_check = parseFloat(Ext.util.Format.number(objData.met_check, '0.00'));
        objData.ydscheck = parseFloat(Ext.util.Format.number(objData.ydscheck, '0.00'));
        objData.met_origin = parseFloat(Ext.util.Format.number(objData.met_origin, '0.00'));
        objData.ydsorigin = parseFloat(Ext.util.Format.number(objData.ydsorigin, '0.00'));
        objData.width_met_check = parseFloat(Ext.util.Format.number(objData.width_met_check, '0.00'));
        objData.width_yds_check = parseFloat(Ext.util.Format.number(objData.width_yds_check, '0.00'));
        objData.width_met = parseFloat(Ext.util.Format.number(objData.width_met, '0.00'));
        objData.width_yds = parseFloat(Ext.util.Format.number(objData.width_yds, '0.00'));

        // var items = viewModel.get('storePackinglistArrAll');\
        var StockinPklStore = viewModel.getStore('StockinPklStore');
        var items = StockinPklStore.getData().items;

        // lặp qua danh sách để tìm cây vải tương ứng
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            // nếu tìm thấy cây vải
            if(item.get('lotnumber').toUpperCase() == lotnumberTxt.toUpperCase() && item.get('packageid') == packageidTxt){
                objData.id = item.get('id');
            }
        }

        // 
        console.log(objData);
        m.onUpdate_Print_Pklist(objData);

        this.resetForm();
        Ext.getCmp('Stockin_M_Edit_Pkl_Recheck_Main').getController().resetFormRecheck();
        Ext.getCmp('Stockin_M_Edit_D_Main').getController().resetFormAddLot();
        Ext.getCmp('Stockin_M_Edit_Lot_Main').getController().resetFormAddSpace();
        m.getView().down('#packageidTxt').focus();
    },
    
    //hungdaibang code
    onUpdate_Print_Pklist: function(pklistData){
		var me = this;
        console.log("update pklist");
        console.log(pklistData);
        var params = new Object();
        params.data = pklistData;
        params.isprintlabel = true;
        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/pklist_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                       console.log(response);
					   
					   //Goi mqtt de in tem
                        if (null != response.rfprintid_link && response.rfprintid_link > 0){
					        me.onPrint_WithRFID(response.rfprintid_link);
                        } else {
                            //Reload danh sach Pklist va Reset cac o nhap lieu
                            me.reloadStore();
                            me.onbtnResetForm();
                        }
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi kiểm cây: ' + response.message, 3000);
                }
        })        
    },
	onPrint_WithRFID: function(rfprintid_link){
        var me = this;
        var viewModel = this.getViewModel();
		var host = config.getMqtthost();
		var port = config.getMqttport();
		var clientid = config.getClientid();
		var termid = config.getTermid();
		me.sessionid = ""+rfprintid_link;
		
		me.channel.cmd = 'gsm5/term/' + termid + '/cmd';
		GSmartApp.Mqtt.connect(host, port, clientid, me.channel, deviceId, function (topic, message) {
			console.log(topic);
			if (topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);
				// console.log(jsonObj);
				if (jsonObj.ct == 1) {
					if (jsonObj.cid == 'CMD_START_PRINT') {

                        //Disable nut check --> Khong cho nhan luc dang in
						viewModel.set('isKiemcay_CheckEnable', false);
					}
				}

				//Khi het time out tu dong enable nut check cho nhap tiep
				if (jsonObj.ct == 2 && jsonObj.cid == 'NTF_ON_STOP') {
                    me.onPrintStop(rfprintid_link);
				}
			} 
		}, function () {
			me.sendChannel = 'gsm5/device/' + 'rfprinter-0001' + '/cmd';
			me.funcid = ""+1;
			var cmd = { ct: 0, cid: "CMD_START_PRINT", srcid: termid, reqdata: { timeout: 120000, token: me.stoken, funcid: me.funcid } };
			console.log("Device channel:" + me.sendChannel);
			var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
			GSmartApp.Mqtt.client.send(message);

		}, function () {
			console.log('Loi connect');
			var viewModel = me.getViewModel();
			viewModel.set('clsbtn', "red-button");
			viewModel.set('clsbtnStart', "blue-button");
			viewModel.set('clsbtnStop', "");
			viewModel.set('isStart', false);
		});
	},  
    onPrintStop: function (rfprintid_link) {
        var me = this;
        var viewModel = this.getViewModel();
        viewModel.set('isKiemcay_CheckEnable', true);

        //Kiem tra lai trang thai cua Session print
        var params = new Object();
        params.rfprintid_link = rfprintid_link;
        GSmartApp.Ajax.postJitin('/api/v1/rfprint/getbyid', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if (response.status == 3){
                            //In Success --> Reload danh sach Pklist va Reset cac o nhap lieu
                            me.reloadStore();
                            me.onbtnResetForm();
                        } else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Lỗi máy in",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    } else {
                        Ext.toast('Lỗi kiểm tra kết quả in: ' + response.message, 3000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi kiểm tra kết quả in: ' + response.message, 3000);
                }
        }) 
    },
    onbtnResetForm: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('lotnumberTxt', '');
        m.resetForm();
    },
    onlotnumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('lotnumberTxt', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
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

    reloadStore: function(){
        var viewModel = this.getViewModel();
        var StockinPklStore = viewModel.getStore('StockinPklStore');
        StockinPklStore.load();
    }
})