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

        var viewPklRecheck = Ext.getCmp('Stockin_M_Edit_Pkl_Recheck_Main').down('#Stockin_M_Edit_Pkl_Recheck');
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
                Ext.getCmp('Stockin_M_Edit').getController().setPklAndPklStatusLessThan1(items);
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
        Ext.getCmp('Stockin_M_Edit').getController().setDataStockin();

        this.resetForm();
        Ext.getCmp('Stockin_M_Edit_Pkl_Recheck_Main').getController().resetFormRecheck();
        Ext.getCmp('Stockin_M_Edit_D_Main').getController().resetFormAddLot();
        Ext.getCmp('Stockin_M_Edit_Lot_Main').getController().resetFormAddSpace();

        m.getView().down('#packageidTxt').focus();
        //  m.onSave();
        // console.log(stockin);
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
})