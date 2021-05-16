Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Pkl_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Pkl_MainController',
    channelPrint: { cmd: null, dta: null },
	init: function () {
		
	},
    control: {
        '#btnResetForm':{
            tap: 'onbtnResetForm'
        },
        '#btnCheck':{
            tap: 'onCheck'
        },
        '#btnPrintPkl':{
            tap: 'onPrintPkl'
        },
        '#btnDeletePkl':{
            tap: 'onDeletePkl'
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

            viewModel.set('lot_stockindId', newValue);
            viewModel.set('pklRecheck_stockindId', newValue);

            if(cbbox.getSelection() != null){
                viewModel.set('selectedDRecord', cbbox.getSelection());
            }
        }
    },
    onmaPklFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Pkl'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
        viewModel.set('selectedPklRecord', null);
        viewModel.set('lotnumberTxt', '');
        this.resetForm();

        var maPklFilter = viewModel.get('maPklFilter') == null ? '' : viewModel.get('maPklFilter').toLowerCase();
        store.clearFilter();
        store.filterBy(function(rec) { //toLowerCase() // includes()
            var isByLotOK = false;
            if(
                rec.get('lotnumber').toLowerCase().includes(maPklFilter)
            ){
                isByLotOK = true;
            }
            if(
                isByLotOK
            ){
                return true;
            }else{
                return false;
            }
        });
    },
    resetForm: function(){
        var myview = this.getView();
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

        viewModel.set('pklSpaceTxt', null);
        viewModel.set('pklFloorTxt', null);
        // m.getView().down('#packageidTxt').focus();

        myview.setMasked(false);
    },
    onItemPklTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();

        var record = location.record;
        viewModel.set('selectedPklRecord',record);
        
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

        // set khoang info cho pkl
        var spaceepc_link = record.get('spaceepc_link') == null ? '' : record.get('spaceepc_link').toUpperCase();
        if(spaceepc_link != ''){ // D-1|H-2|T-3|
            // var spaceepc_linkArr = spaceepc_link.split('|');
            // var pklFloorTxt = spaceepc_linkArr[1]; if(pklFloorTxt == 'x') pklFloorTxt = null;
            // viewModel.set('pklFloorTxt', pklFloorTxt);
            // spaceepc_linkArr = spaceepc_linkArr[0].split('H');
            // var pklSpaceTxt = spaceepc_linkArr[1]; if(pklSpaceTxt == 'x') pklSpaceTxt = null;
            // viewModel.set('pklSpaceTxt', pklSpaceTxt);
            // spaceepc_linkArr = spaceepc_linkArr[0].split('D');
            // var pklRowTxt = spaceepc_linkArr[1]; if(pklRowTxt == 'x') pklRowTxt = null;
            // viewModel.set('pklRowTxt', pklRowTxt);
            
            var spaceepc_linkArr = spaceepc_link.split('|');
            var row = spaceepc_linkArr[0].substring(2); //console.log(row);
            if(row == 'x' || row == 'X') row = null; 
            var space = spaceepc_linkArr[1].substring(2); //console.log(space);
            if(space == 'x' || space == 'X') space = null;
            var floor = spaceepc_linkArr[2].substring(2); //console.log(floor);
            if(floor == 'x' || floor == 'X') floor = null;
            viewModel.set('pklRowTxt', row);
            viewModel.set('pklSpaceTxt', space);
            viewModel.set('pklFloorTxt', floor);

            // console.log(pklRowTxt);
            // console.log(pklSpaceTxt);
            // console.log(pklFloorTxt);
        }else{
            viewModel.set('pklFloorTxt', null);
            viewModel.set('pklSpaceTxt', null);
            viewModel.set('pklRowTxt', null);
        }
        // console.log(spaceepc_link);  
    },
    onPrintPkl: function () {
        console.log('onPrintPkl cliked');
        // popup here
    },
    onDeletePkl: function () {
        console.log('onDeletePkl cliked');
        // popup here
    },
    onCheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockin_lot = viewModel.get('stockin.stockin_lot');
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

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
        var pklRowTxt = viewModel.get('pklRowTxt');
        var pklSpaceTxt = viewModel.get('pklSpaceTxt');
        var pklFloorTxt = viewModel.get('pklFloorTxt');

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

        // spaceepc_link: khoang cây vải
        var numberOfEmptyField = 0;
        if(pklRowTxt == null || pklRowTxt == '') {
            pklRowTxt = 'x';
            numberOfEmptyField++;
        }
        if(pklSpaceTxt == null || pklSpaceTxt == '') {
            pklSpaceTxt = 'x';
            numberOfEmptyField++;
        }
        if(pklFloorTxt == null || pklFloorTxt == '') {
            pklFloorTxt = 'x';
            numberOfEmptyField++;
        }
        
        if(numberOfEmptyField !=0 && numberOfEmptyField != 3){
            Ext.toast('Phải điền tất cả hoặc bỏ trống tất cả thông tin dãy, hàng, tầng', 3000);
            return;
        }
        // var spaceepc_link = 'D' + pklRowTxt + 'H' + pklSpaceTxt + 'T' + pklFloorTxt;
        var spaceepc_link = 'D-' + pklRowTxt + '|H-' + pklSpaceTxt + '|T-' + pklFloorTxt + '|';

        // check lotnumber tồn tại
        // console.log(stockin); console.log(stockin_lot); console.log(lotnumberTxt);
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
        objData.colorid_link = selectedDRecord.get('colorid_link');;
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
        objData.skuid_link = selectedDRecord.get('skuid_link');
        objData.spaceepc_link = spaceepc_link;
        // objData.status = 1;

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

        // var items = viewModel.get('storePackinglistArrAll');
        var StockinPklStore = viewModel.getStore('StockinPklStore');
        var items = StockinPklStore.getData().items;

        // lặp qua danh sách để tìm cây vải tương ứng
        // for(var i = 0; i < items.length; i++){
        //     var item = items[i];
        //     // nếu tìm thấy cây vải
        //     if(item.get('lotnumber').toUpperCase() == lotnumberTxt.toUpperCase() && item.get('packageid') == packageidTxt){
        //         objData.id = item.get('id');
        //     }
        // }

        if(selectedPklRecord != null){
            objData.id = selectedPklRecord.get('id');
            objData.status = selectedPklRecord.get('status');
            // console.log(selectedPklRecord);
        }


        // 
        // console.log(objData);
        m.onUpdate_Print_Pklist(objData);

        // this.resetForm();
        // m.getView().down('#packageidTxt').focus();
    },
    
    //hungdaibang code
    onUpdate_Print_Pklist: function(pklistData){
        var myview = this.getView();
        myview.setMasked({
            xtype: 'loadmask',
            message: 'Đang in tem'
        });

		var me = this;
        var viewModel = this.getViewModel();
        // console.log("update pklist");
        // console.log(pklistData);
        var params = new Object();
        params.data = pklistData;
        params.isprintlabel = config.getPrint_material_label();
        params.rfid_enable = config.getPrint_rfid_enable();
        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/pklist_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                myview.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                       console.log(response);
					   
					   //Goi mqtt de in tem
                        if (null != response.rfprintid_link && response.rfprintid_link > 0){
					        me.onPrint_WithRFID(response.rfprintid_link);
                        } else {
                            //Reload danh sach Pklist va Reset cac o nhap lieu
                            viewModel.set('selectedPklRecord', null);
                            me.reloadStore();
                            me.resetForm();
                            myview.down('#packageidTxt').focus();
                        }
                    }else{
                        Ext.toast('Lỗi kiểm cây: ' + response.message, 3000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi kiểm cây: ' + response.message, 3000);
                }
        })        
    },
	onPrint_WithRFID: function(rfprintid_link){
        console.log(rfprintid_link);

        var me = this;

        //Ngat connect trc khi goi
		GSmartApp.Mqtt.onDisconnect();

        var viewModel = this.getViewModel();
		var host = config.getHost();
		var port = config.getPort();
		var clientid = config.getClientid();
		var termid = config.getTermid();
        var deviceId = 2;
		me.sessionid = ""+rfprintid_link;
		
		me.channelPrint.cmd = 'gsm5/term/' + termid + '/cmd';
		GSmartApp.Mqtt.connect(host, port, clientid, me.channelPrint, deviceId, function (topic, message) {
			console.log(topic);
			if (topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);
				console.log(jsonObj);
                //Neu respcode = 2 --> may in chua san sang
                if (jsonObj.respcode == 2){
                    Ext.Msg.alert('Thông báo', 'Máy in chưa sẵn sàng', Ext.emptyFn);
                    viewModel.set('isKiemcay_CheckEnable', true);
                } else {
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
			} 
		}, function () {
			me.sendChannel = 'gsm5/device/' + 'rfprinter-0001' + '/cmd';
			me.funcid = ""+1;
			var cmd = { ct: 0, cid: "CMD_START_PRINT", srcid: termid, reqdata: { timeout: 120000, sessionid: me.sessionid, funcid: me.funcid } };
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
                        if (response.status == 2){//In tem OK
                            //In Success --> Reload danh sach Pklist va Reset cac o nhap lieu
                            me.reloadStore();
                            me.resetForm();
                        } else {
                            Ext.Msg.alert('Thông báo', 'Lỗi máy in:' + response.err_msg, Ext.emptyFn);
                            me.reloadStore();
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
        var m = this;
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var pkl_stockindId = viewModel.get('pkl_stockindId');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var StockinPklStore = viewModel.getStore('StockinPklStore');
        // StockinPklStore.load();
        StockinPklStore.loadStore_byStockinDIdAndGreaterThanStatus_async(pkl_stockindId, -1);
        StockinPklStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    if(selectedPklRecord != null){
                        var stockinpklid_link = selectedPklRecord.get('id');
                        var storeItems = StockinPklStore.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == stockinpklid_link){
                                var grid = m.getView().down('#Stockin_M_Edit_Pkl');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedPklRecord', item);
                            }
                        }
                    }
                }
            }
        });
    }
})