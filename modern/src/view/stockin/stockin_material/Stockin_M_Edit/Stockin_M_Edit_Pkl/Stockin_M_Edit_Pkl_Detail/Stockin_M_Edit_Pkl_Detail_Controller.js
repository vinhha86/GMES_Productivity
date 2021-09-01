Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_m_edit_pkl_detail.Stockin_M_Edit_Pkl_Detail_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Pkl_Detail_Controller',
    channelPrint: { cmd: null, dta: null },
	init: function () {
        var m = this;
		var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var selectedPklRecord = viewModel.get('selectedPklRecord');
        if(selectedPklRecord != null){
            m.onSetFormData();
        }
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
    },
    onFocus: function(textfield, e, eOpts){
        //
        this.setTooltip(textfield);
    },
    onFocusLeave: function(textfield, event, eOpts ){
        //
        this.removeTooltip();
        //
        this.showSelectValueWindow(textfield);
    },
    setTooltip: function(textfield){
        var viewModel = this.getViewModel();
        var placeholder = textfield.getPlaceholder();
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: textfield,
            html: placeholder,
            zIndex: 2
        });
        tip.show();
        viewModel.set('fieldTooltip', tip);
    },
    removeTooltip: function(){
        var viewModel = this.getViewModel();
        var fieldTooltip = viewModel.get('fieldTooltip');
        if(fieldTooltip){
            fieldTooltip.close();
        }
    },
    showSelectValueWindow: function(textfield, event){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');

        var placeholder = textfield.getPlaceholder();
        // console.log(textfield);
        // console.log(placeholder);

        var oldValue = '';
        if(placeholder == 'Dài kiểm (M)'){
            oldValue = viewModel.get('objPkl.mTxt');
        }else 
        if(placeholder == 'Dài phiếu (M)'){
            oldValue = viewModel.get('objPkl.mOriginTxt');
        }else 
        if(placeholder == 'Dài kiểm (Y)'){
            oldValue = viewModel.get('objPkl.yTxt');
        }else 
        if(placeholder == 'Dài phiếu (Y)'){
            oldValue = viewModel.get('objPkl.yOriginTxt');
        }else 
        if(placeholder == 'Khổ kiểm (cm)'){
            oldValue = viewModel.get('objPkl.widthMetCheckTxt');
        }else 
        if(placeholder == 'Khổ phiếu (cm)'){
            oldValue = viewModel.get('objPkl.widthMetTxt');
        }else
        if(placeholder == 'Cân kiểm'){
            oldValue = viewModel.get('objPkl.grossweightCheckTxt');
        }else 
        if(placeholder == 'Cân phiếu'){
            oldValue = viewModel.get('objPkl.grossweightTxt');
        }else
        if(placeholder == 'Lbs kiểm'){
            oldValue = viewModel.get('objPkl.grossweightLbsCheckTxt');
        }else 
        if(placeholder == 'Lbs phiếu'){
            oldValue = viewModel.get('objPkl.grossweightLbsTxt');
        }else
        {
            return;
        }
        if(
            oldValue != null 
            && oldValue != '' 
            && oldValue != 0 
            && !isNaN(oldValue)
        ){
            if(placeholder == 'Dài kiểm (M)'){
                var mTxt = viewModel.get('objPkl.mTxt');
                var mOriginTxt = viewModel.get('objPkl.mOriginTxt');
                if(mOriginTxt == null || mOriginTxt == ''){
                    viewModel.set('objPkl.mOriginTxt', mTxt);
                }
            }else 
            if(placeholder == 'Dài kiểm (Y)'){
                var yTxt = viewModel.get('objPkl.yTxt');
                var yOriginTxt = viewModel.get('objPkl.yOriginTxt');
                if(yOriginTxt == null || yOriginTxt == ''){
                    viewModel.set('objPkl.yOriginTxt', yTxt);
                }
            }else 
            if(placeholder == 'Cân kiểm'){
                var grossweightCheckTxt = viewModel.get('objPkl.grossweightCheckTxt');
                var grossweightTxt = viewModel.get('objPkl.grossweightTxt');
                if(grossweightTxt == null || grossweightTxt == ''){
                    viewModel.set('objPkl.grossweightTxt', grossweightCheckTxt);
                }
            }else 
            if(placeholder == 'Lbs kiểm'){
                var grossweightLbsCheckTxt = viewModel.get('objPkl.grossweightLbsCheckTxt');
                var grossweightLbsTxt = viewModel.get('objPkl.grossweightLbsTxt');
                if(grossweightLbsTxt == null || grossweightLbsTxt == ''){
                    viewModel.set('objPkl.grossweightLbsTxt', grossweightLbsCheckTxt);
                }
            }else 
            if(placeholder == 'Khổ kiểm (cm)'){
                var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
                var widthMetTxt = viewModel.get('objPkl.widthMetTxt');
                if(widthMetTxt == null || widthMetTxt == ''){
                    viewModel.set('objPkl.widthMetTxt', widthMetCheckTxt);
                }
            }
        }
        // console.log("Version " + Ext.os.version);
    },
    resetForm: function(){
        var myview = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        
        Ext.Viewport.setMasked(false);

        // viewModel.set('objPkl.lotnumberTxt', '');
        viewModel.set('objPkl.packageidTxt', '');
        viewModel.set('objPkl.yTxt', '');
        viewModel.set('objPkl.mTxt', '');
        viewModel.set('objPkl.yOriginTxt', '');
        viewModel.set('objPkl.mOriginTxt', '');
        // viewModel.set('colorTxt', stockinD.colorid_link);
        // viewModel.set('widthTxt', '');
        viewModel.set('objPkl.grossweightTxt', '');
        viewModel.set('objPkl.grossweightCheckTxt', '');
        viewModel.set('objPkl.grossweightLbsTxt', '');
        viewModel.set('objPkl.grossweightLbsCheckTxt', '');
        viewModel.set('objPkl.sampleCheckTxt', '');
        viewModel.set('objPkl.widthYdsCheckTxt', '');
        viewModel.set('objPkl.widthYdsTxt', '');
        viewModel.set('objPkl.widthMetCheckTxt', '');
        viewModel.set('objPkl.widthMetTxt', '');

        // viewModel.set('pklSpaceTxt', null);
        // viewModel.set('pklFloorTxt', null);
        myview.down('#packageidTxt').focus();

    },
    onSetFormData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var record = viewModel.get('selectedPklRecord');
        
        viewModel.set('objPkl.lotnumberTxt', record.get('lotnumber'));
        viewModel.set('objPkl.packageidTxt', record.get('packageid'));
        viewModel.set('objPkl.yTxt', record.get('ydscheck'));
        viewModel.set('objPkl.mTxt', record.get('met_check'));
        viewModel.set('objPkl.yOriginTxt', record.get('ydsorigin'));
        viewModel.set('objPkl.mOriginTxt', record.get('met_origin'));
        viewModel.set('objPkl.colorTxt', record.get('colorid_link'));
        viewModel.set('objPkl.grossweightTxt', record.get('grossweight'));
        viewModel.set('objPkl.grossweightCheckTxt', record.get('grossweight_check'));
        viewModel.set('objPkl.grossweightLbsTxt', record.get('grossweight_lbs'));
        viewModel.set('objPkl.grossweightLbsCheckTxt', record.get('grossweight_lbs_check'));
        viewModel.set('objPkl.sampleCheckTxt', record.get('sample_check'));
        viewModel.set('objPkl.widthMetCheckTxt', record.get('width_met_check')  * 100); // m -> cm
        viewModel.set('objPkl.widthMetTxt', record.get('width_met') * 100); // m -> cm

        // set khoang info cho pkl
        viewModel.set('objPkl.pklFloorTxt', record.get('floor'));
        viewModel.set('objPkl.pklSpaceTxt', record.get('space'));
        viewModel.set('objPkl.pklRowTxt', record.get('row'));
    },
    onPrintPkl: function () {
        console.log('onPrintPkl clicked');
        // popup here
    },
    onDeletePkl: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var selectedPklRecord = viewModel.get('selectedPklRecord');
        if(selectedPklRecord == null || isNaN(selectedPklRecord.get('id'))){
            Ext.toast('Cần chọn cây vải', 2000);
            return;
        }

        var msgWindow = Ext.Msg.show({
            title: 'Thông báo',
            message: 'Bạn có chắc chắn xoá?',
            width: 300,
            closable: false,
            zIndex: 2,
            modal: false,
            // masked: true,
            // maskTapHandler: function(){
            //     if(Ext.Msg){
            //         Ext.Msg.hide();
            //         me.setMasked(false);
            //     }
            // },
            buttons: [{
                text: 'Thoát',
                itemId: 'no'
            }, {
                text: 'Xoá',
                itemId: 'yes'
            }],
            fn: function (buttonValue, inputText, showConfig) {
                if(buttonValue == 'no'){
                    if(Ext.Msg){
                        Ext.Msg.hide();
                    }
                }
                if(buttonValue == 'yes'){
                    m.deletePkl();
                }
            },
            icon: Ext.Msg.QUESTION,
        });
        // console.log(selectedPklRecord);
    },
    deletePkl: function(){
        var myview = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var selectedPklRecord = viewModel.get('selectedPklRecord');
        var id = selectedPklRecord.get('id');

        myview.setMasked({
            xtype: 'loadmask',
            message: 'Đang xoá'
        });

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/pklist_delete', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                myview.setMasked(false);
                if (success) {
                    Ext.toast('Xoá thành công', 2000);
                    // viewModel.set('selectedPklRecord', null);
                    // m.reloadStore();
                    // m.resetForm();
                    // myview.down('#packageidTxt').focus();
                    m.fireEvent('reloadStore');
                    m.fireEvent('close');

                } else {
                    Ext.toast('Lỗi xoá pkl: ' + response.message, 2000);
                }
        })        
    },
    onCheck: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var lotnumberTxt = viewModel.get('objPkl.lotnumberTxt');
        var packageidTxt = viewModel.get('objPkl.packageidTxt');
        var yTxt = viewModel.get('objPkl.yTxt');
        var mTxt = viewModel.get('objPkl.mTxt');
        var yOriginTxt = viewModel.get('objPkl.yOriginTxt') == null ? viewModel.get('objPkl.yTxt') : viewModel.get('objPkl.yOriginTxt');
        var mOriginTxt = viewModel.get('objPkl.mOriginTxt') == null ? viewModel.get('objPkl.mTxt') : viewModel.get('objPkl.mOriginTxt');
        
        var grossweightCheckTxt = viewModel.get('objPkl.grossweightCheckTxt');
        var grossweightLbsCheckTxt = viewModel.get('objPkl.grossweightLbsCheckTxt');
        var grossweightTxt = viewModel.get('objPkl.grossweightTxt') == null ? viewModel.get('objPkl.grossweightCheckTxt') : viewModel.get('objPkl.grossweightTxt');
        var grossweightLbsTxt = viewModel.get('objPkl.grossweightLbsTxt') == null ? viewModel.get('objPkl.grossweightLbsCheckTxt') : viewModel.get('objPkl.grossweightLbsTxt');
        
        var sampleCheckTxt = viewModel.get('objPkl.sampleCheckTxt');
        var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
        var widthMetTxt = viewModel.get('objPkl.widthMetTxt') == null ? viewModel.get('objPkl.widthMetCheckTxt') : viewModel.get('objPkl.widthMetTxt');
        var pklRowTxt = viewModel.get('objPkl.pklRowTxt');
        var pklSpaceTxt = viewModel.get('objPkl.pklSpaceTxt');
        var pklFloorTxt = viewModel.get('objPkl.pklFloorTxt');

        // check combo đã chọn chưa
        var pkl_stockindId = selectedDRecord.get('id');
        if(pkl_stockindId == '' || pkl_stockindId == null){
            Ext.toast('Cần chọn loại vải', 2000);
            return;
        }

        // check textfield
        if(stockin.unitid_link == 1){ // met
            if(packageidTxt == '' || mTxt == '' || widthMetCheckTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, khổ hoặc độ dài', 2000);
                return;
            }
            if(isNaN(mTxt)){
                Ext.toast('Số M phải là số', 2000);
                return;
            }
        }
        if(stockin.unitid_link == 3){ // yds
            if(packageidTxt == '' || yTxt == '' || widthMetCheckTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, khổ hoặc độ dài', 2000);
                return;
            }
            if(isNaN(yTxt)){
                Ext.toast('Số Y phải là số', 2000);
                return;
            }
        }
        if(stockin.unitid_link == 4){ // kg
            if(packageidTxt == '' || grossweightCheckTxt == '' || widthMetCheckTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, khổ hoặc khối lượng', 2000);
                return;
            }
            if(isNaN(grossweightCheckTxt)){
                Ext.toast('Số M phải là số', 2000);
                return;
            }
        }
        if(stockin.unitid_link == 5){ // lbs
            if(packageidTxt == '' || grossweightLbsCheckTxt == '' || widthMetCheckTxt == ''){
                Ext.toast('Thiếu thông tin Số cây, khổ hoặc khối lượng', 2000);
                return;
            }
            if(isNaN(grossweightLbsCheckTxt)){
                Ext.toast('Số M phải là số', 2000);
                return;
            }
        }

        // spaceepc_link: khoang cây vải
        var numberOfEmptyField = 0;
        if(pklRowTxt == null || pklRowTxt == '') {
            numberOfEmptyField++;
        }
        if(pklSpaceTxt == null || pklSpaceTxt == '') {
            numberOfEmptyField++;
        }
        if(pklFloorTxt == null || pklFloorTxt == '') {
            numberOfEmptyField++;
        }
        
        if(numberOfEmptyField !=0 && numberOfEmptyField != 3){
            Ext.toast('Phải điền tất cả hoặc bỏ trống tất cả thông tin dãy, hàng, tầng', 2000);
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
        if(grossweightLbsCheckTxt == null || grossweightLbsCheckTxt == '') grossweightLbsCheckTxt = 0;
        if(grossweightLbsTxt == null || grossweightLbsTxt == '' || grossweightLbsTxt == 0) grossweightLbsTxt = grossweightLbsCheckTxt;
        
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
        objData.grossweight_check = grossweightCheckTxt;
        objData.grossweight = grossweightTxt;
        objData.grossweight_lbs_check = grossweightLbsCheckTxt;
        objData.grossweight_lbs = grossweightLbsTxt;
        objData.colorid_link = selectedDRecord.get('colorid_link');;
        // objData.widthTxt = widthTxt;
        objData.sample_check = sampleCheckTxt;
        objData.width_met_check = widthMetCheckTxt / 100;
        objData.width_met = widthMetTxt / 100;
        objData.width_yds_check = objData.width_met_check / 0.9144;
        objData.width_yds = objData.width_met / 0.9144;
        objData.unitid_link = stockin.unitid_link;
        objData.stockinid_link = stockin.id;
        objData.stockindid_link = pkl_stockindId;
        objData.skuid_link = selectedDRecord.get('skuid_link');
        // objData.spaceepc_link = spaceepc_link;
        // objData.status = 1;
        objData.row = pklRowTxt;
        objData.space = pklSpaceTxt;
        objData.floor = pklFloorTxt;


        if(stockin.unitid_link == 1 || stockin.unitid_link == null){
            // met
            objData.met_check = parseFloat(mTxt);
            objData.ydscheck = objData.met_check / 0.9144;
            objData.met_origin = parseFloat(mOriginTxt);
            objData.ydsorigin = objData.met_origin / 0.9144;
        }
        if(stockin.unitid_link == 3){
            // yds
            objData.ydscheck = parseFloat(yTxt);
            objData.met_check = objData.ydscheck * 0.9144;
            objData.ydsorigin = parseFloat(yOriginTxt);
            objData.met_origin = objData.ydsorigin * 0.9144;
        }
        if(stockin.unitid_link == 4){
            // kg
            objData.grossweight_check = parseFloat(grossweightCheckTxt);
            objData.grossweight = parseFloat(grossweightTxt);
            objData.grossweight_lbs_check = objData.grossweight_check * 2.20462;
            objData.grossweight_lbs = objData.grossweight * 2.20462;
        }
        if(stockin.unitid_link == 5){
            // lbs
            objData.grossweight_lbs_check = parseFloat(grossweightLbsCheckTxt);
            objData.grossweight_lbs = parseFloat(grossweightLbsTxt);
            objData.grossweight_check = objData.grossweight_lbs_check / 2.20462;
            objData.grossweight = objData.grossweight_lbs / 2.20462;
        }

        objData.met_check = parseFloat(objData.met_check);
        objData.ydscheck = parseFloat(objData.ydscheck);
        objData.met_origin = parseFloat(objData.met_origin);
        objData.ydsorigin = parseFloat(objData.ydsorigin);
        objData.grossweight_lbs_check = parseFloat(objData.grossweight_lbs_check);
        objData.grossweight_lbs = parseFloat(objData.grossweight_lbs);
        objData.grossweight_check = parseFloat(objData.grossweight_check);
        objData.grossweight = parseFloat(objData.grossweight);
        objData.width_met_check = parseFloat(objData.width_met_check);
        objData.width_yds_check = parseFloat(objData.width_yds_check);
        objData.width_met = parseFloat(objData.width_met);
        objData.width_yds = parseFloat(objData.width_yds);

        if(selectedPklRecord != null){
            objData.id = selectedPklRecord.get('id');
        }

        // 
        m.onUpdate_Print_Pklist(objData);
        // this.fireEvent('onCheck', objData);
    },
    
    //hungdaibang code
    onUpdate_Print_Pklist: function(pklistData){
        var myview = this.getView();
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Đang in tem'
        });
        myview.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });

		var me = this;
        var viewModel = this.getViewModel();
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var params = new Object();
        params.data = pklistData;

        if (null!=pklistData.id){
            //Neu la update thong tin cay vai --> Khong in tem
            params.isprintlabel = false;
        } else {
            //Neu la them moi cay vai --> Theo cau hinh he thong (In/Ko in)
            params.isprintlabel = config.getPrint_material_label();
        }
        
        params.rfid_enable = config.getPrint_rfid_enable();
        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/pklist_create', Ext.JSON.encode(params),
            function (success, response, options) {
                myview.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
					   //Goi mqtt de in tem
                        if (null != response.rfprintid_link && response.rfprintid_link > 0){
					        me.onPrint_WithRFID(response.rfprintid_link);
                        } else {
                            //Reload danh sach Pklist va Reset cac o nhap lieu
                            Ext.Viewport.setMasked(false);
                            Ext.toast('Lưu thành công', 2000);
                            if(selectedPklRecord == null){
                                // them moi
                                me.fireEvent('reloadStore');
                                me.resetForm();
                                myview.down('#packageidTxt').focus();
                            }else{
                                // edit
                                me.fireEvent('reloadStore');
                            }
                        }

                    }else{
                        Ext.toast('Lỗi kiểm cây: ' + response.message, 2000);
                    }
                } else {
                    Ext.Viewport.setMasked(false);
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi kiểm cây: ' + response.message, 2000);
                }
        })        
    },
	onPrint_WithRFID: function(rfprintid_link){
        // console.log(rfprintid_link);
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
			if (topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);
				// console.log(jsonObj);
                //Neu respcode = 2 --> may in chua san sang
                if (jsonObj.respcode == 2){
                    Ext.Viewport.setMasked(false);
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
            Ext.Viewport.setMasked(false);
			console.log('Loi connect may in');
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
                Ext.Viewport.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if (response.status == 2){//In tem OK
                            //In Success --> Reload danh sach Pklist va Reset cac o nhap lieu
                            // me.reloadStore();
                            // me.resetForm();
                            if(selectedPklRecord == null){
                                // them moi
                                me.fireEvent('reloadStore');
                                me.resetForm();
                                myview.down('#packageidTxt').focus();
                            }else{
                                // edit
                                me.fireEvent('reloadStore');
                            }
                        } else {
                            Ext.Msg.alert('Thông báo', 'Lỗi máy in:' + response.err_msg, Ext.emptyFn);
                            me.reloadStore();
                        }
                    } else {
                        Ext.toast('Lỗi kiểm tra kết quả in: ' + response.message, 2000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi kiểm tra kết quả in: ' + response.message, 2000);
                }
        }) 
    },
    onbtnResetForm: function(){
        var m = this;
        var viewModel = this.getViewModel();
        // viewModel.set('objPkl.lotnumberTxt', '');
        m.resetForm();
    },
    onlotnumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('objPkl.lotnumberTxt', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onmTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var mTxt = viewModel.get('objPkl.mTxt');
        var mOriginTxt = viewModel.get('objPkl.mOriginTxt');
        if(mOriginTxt == null || mOriginTxt == ''){
            viewModel.set('objPkl.mOriginTxt', mTxt);
        }
    },
    onyTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var yTxt = viewModel.get('objPkl.yTxt');
        var yOriginTxt = viewModel.get('objPkl.yOriginTxt');
        if(yOriginTxt == null || yOriginTxt == ''){
            viewModel.set('objPkl.yOriginTxt', yTxt);
        }
    },
    oncanCheckTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var grossweightCheckTxt = viewModel.get('objPkl.grossweightCheckTxt');
        var grossweightTxt = viewModel.get('objPkl.grossweightTxt');
        if(grossweightTxt == null || grossweightTxt == ''){
            viewModel.set('objPkl.grossweightTxt', grossweightCheckTxt);
        }
    },
    onwidthYdsCheckTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var widthYdsCheckTxt = viewModel.get('objPkl.widthYdsCheckTxt');
        var widthYdsTxt = viewModel.get('objPkl.widthYdsTxt');
        if(widthYdsTxt == null || widthYdsTxt == ''){
            viewModel.set('objPkl.widthYdsTxt', widthYdsCheckTxt);
        }
    },
    onwidthMetCheckTxtFocusleave: function(textfield, event, eOpts){
        //
        this.onFocusLeave(textfield);
        //
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var widthMetCheckTxt = viewModel.get('objPkl.widthMetCheckTxt');
        var widthMetTxt = viewModel.get('objPkl.widthMetTxt');
        if(widthMetTxt == null || widthMetTxt == ''){
            viewModel.set('objPkl.widthMetTxt', widthMetCheckTxt);
        }
    },
})