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
        '#btnResetForm':{
            tap: 'onResetForm'
        },
        '#btnLuu':{
            tap: 'onSave'
        },
        '#Stockin_M_Edit_PackingList_D':{
            itemtap: 'onItemTap'
        },
        '#Stockin_M_Edit_Lot': {
            childtap: 'onLotTap'
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
        var m = this.getView();
        var viewModel = this.getViewModel();

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockind_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                // console.log(response);
                var stockin = response.stockin;
                var data = response.data;

                viewModel.set('stockinD', data);
                viewModel.set('stockin', stockin);

                // set lot
                me.setLotStore();

                // load cbbox color theo stockin
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
            }
		})
    },
    setLotStore: function(){
        var me = this;
        var m = this.getView();
        var viewModel = this.getViewModel();

        var stockinD = viewModel.get('stockinD');
        var stockin = viewModel.get('stockin');
        var stockin_lot = stockin.stockin_lot;
        var storeData = new Array();

        var stockinDtotalpackagecheck = 0;
        for(var i = 0; i < stockin_lot.length; i++){
            if(stockin_lot[i].materialid_link == stockinD.skuid_link){
                var storeObj = new Object();
                storeObj.lot_number = stockin_lot[i].lot_number;
                storeObj.materialid_link = stockin_lot[i].materialid_link;
                storeObj.orgrootid_link = stockin_lot[i].orgrootid_link;
                storeObj.space = stockin_lot[i].space;
                storeObj.stockinid_link = stockin_lot[i].stockinid_link;
                storeObj.totalpackage = stockin_lot[i].totalpackage;

                if(stockinD.status == -1 && (stockin_lot[i].totalpackagecheck == null || stockin_lot[i].totalpackage == 0)){
                    storeObj.totalpackagecheck = storeObj.totalpackage;
                }else{
                    storeObj.totalpackagecheck = stockin_lot[i].totalpackagecheck;
                }
                stockinDtotalpackagecheck += storeObj.totalpackagecheck;
                storeData.push(storeObj);
            }
        }

        viewModel.set('stockinD.totalpackagecheck', stockinDtotalpackagecheck);
        viewModel.set('stockin_lot', storeData);

        // console.log(stockin);
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
                        m.getInfo(stockinD.id);
                        // m.getInfo(response.id);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lỗi lập phiếu: ' + response.message, 3000);
                }
        })
    },

    onItemTap: function(dataview, index, target, record, e, eOpts ){
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

        // Ext.Msg.confirm("Thông báo","Reset form?", function(btn) {
        //     if(btn == 'yes') {
        //         m.resetForm();
        //     }
        // });
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
        viewModel.set('yTxtCls', 'yTxtClsWhiteBG');
        m.getView().down('#lotnumberTxt').focus();
    },

    onLotTap: function(grid, location, eOpts ){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinD = viewModel.get('stockinD');
        
        console.log(location);

        // set filter
        var pklview = me.down('#Stockin_M_Edit_PackingList_D');
            var store = pklview.getStore();
            var filters = store.getFilters();

            if (m.pklistFilter) {
                filters.remove(m.pklistFilter);
                m.pklistFilter = null;
            }

            if (location.record.get('lot_number') != null || location.record.get('lot_number') != '') {
                m.pklistFilter = filters.add({
                    id: 'pklistFilter',
                    property: 'lotnumber',
                    value: location.record.get('lot_number'),
                    exactMatch: true
                    // anyMatch: true,
                    // caseSensitive: false
                });
            }

        if(location.columnIndex == 3){ // sl cay kiem, hien cua so de nhap sua
            var dialog = Ext.create({
                xtype: 'dialog',
                itemId: 'dialog',
                // title: 'Số lượng',
                header: false,
                closable: true,
                closeAction: 'destroy',
                maximizable: false,
                maskTapHandler: function(){
                    if(dialog){
                        dialog.close();
                    }
                },
                bodyPadding: '10 20 10 20',
                maxWidth: 300,
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'Stockin_M_Edit_LotAmount',
                    viewModel: {
                        data: {
                            value: 0,
                            label: 'SL cây kiểm'
                        }
                    }
                }],
                listeners: {
                    
                }
            });
            dialog.show();

            dialog.down('#Stockin_M_Edit_LotAmount').getController().on('Luu', function (value) {
                // console.log(value);
                var stockin_lot = viewModel.get('stockin_lot');
                location.record.set('totalpackagecheck', value)

                // console.log(stockin_lot);
                var stockinDTotalpackagecheck = 0;
                for(var i=0; i<stockin_lot.length; i++){
                    stockinDTotalpackagecheck+=stockin_lot[i].totalpackagecheck;
                }
                viewModel.set('stockinD.totalpackagecheck', stockinDTotalpackagecheck);

                dialog.close();
            });
    
            dialog.down('#Stockin_M_Edit_LotAmount').getController().on('Thoat', function () {
                dialog.close();
            });
        }
    },
})