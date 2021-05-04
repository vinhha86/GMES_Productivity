Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Pkl_Recheck_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Pkl_Recheck_MainController',
	init: function () {
		
	},
    control: {
        '#btnResetFormRecheck':{
            tap: 'onbtnResetFormRecheck'
        },
        '#btnCheckRecheck':{
            tap: 'onCheckRecheck'
        },
        '#Stockin_M_Edit_Pkl_Recheck':{
            itemtap: 'onItemPklRecheckTap'
        },
        '#cbbox_pklRecheck_stockindId':{
            change: 'oncbbox_pklRecheck_stockindId_change'
        }
    },
    oncbbox_pklRecheck_stockindId_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        var pklRecheck_stockindId = viewModel.get('pklRecheck_stockindId');
        if(newValue != null && newValue != ''){
            var StockinPklRecheckStore = viewModel.getStore('StockinPklRecheckStore');
            StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus(newValue, 2);
        }
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
        this.resetFormRecheck();
        this.getView().down('#lotnumberTxtRecheck').focus();

        // var maPklFilterByMaVai = viewModel.get('maPklRecheckFilterByMaVai') == null ? '' : viewModel.get('maPklRecheckFilterByMaVai').toLowerCase();
        var maPklFilter = viewModel.get('maPklRecheckFilter') == null ? '' : viewModel.get('maPklRecheckFilter').toLowerCase();
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
    onItemPklRecheckTap: function(dataview, index, target, record, e, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();
        
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
        var viewPkl = Ext.getCmp('Stockin_M_Edit_Pkl_Main').down('#Stockin_M_Edit_Pkl');
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
                Ext.getCmp('Stockin_M_Edit').getController().setPklAndPklStatusLessThan1(items);
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
        Ext.getCmp('Stockin_M_Edit').getController().setDataStockin();

        Ext.getCmp('Stockin_M_Edit_Pkl_Main').getController().resetForm();
        this.resetFormRecheck();
        Ext.getCmp('Stockin_M_Edit_D_Main').getController().resetFormAddLot();
        Ext.getCmp('Stockin_M_Edit_Lot_Main').getController().resetFormAddSpace();

        m.getView().down('#packageidTxtRecheck').focus();
        // m.onSave();
        // console.log(stockin);
    },onbtnResetFormRecheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('lotnumberTxtRecheck', '');
        m.resetFormRecheck();
    },
    onlotnumberTxtRecheckType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('lotnumberTxtRecheck', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
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
})