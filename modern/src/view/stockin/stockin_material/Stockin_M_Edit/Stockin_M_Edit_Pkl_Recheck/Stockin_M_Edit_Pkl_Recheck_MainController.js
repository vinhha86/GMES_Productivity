Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_Edit.Stockin_M_Edit_Pkl_Recheck_MainController', {
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
            childtap: 'onItemPklRecheckTap'
        },
        '#cbbox_pklRecheck_stockindId':{
            change: 'oncbbox_pklRecheck_stockindId_change'
        }
    },
    onFocus: function(textfield, e, eOpts){
        // console.log(textfield);
        // console.log(textfield.getPlaceholder());
        var placeholder = textfield.getPlaceholder();
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: textfield,
            html: placeholder,
        });
        tip.show();
    },
    oncbbox_pklRecheck_stockindId_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        var pklRecheck_stockindId = viewModel.get('pklRecheck_stockindId');
        if(newValue != null && newValue != ''){
            var StockinPklRecheckStore = viewModel.getStore('StockinPklRecheckStore');
            StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus(newValue, 2);

            viewModel.set('lot_stockindId', newValue);
            viewModel.set('pkl_stockindId', newValue);

            if(cbbox.getSelection() != null){
                viewModel.set('selectedDRecord', cbbox.getSelection());
            }
            
            // bỏ selectedRecord
            viewModel.set('selectedLotRecord', null);
            viewModel.set('selectedPklRecord', null);
            viewModel.set('selectedPklRecheckRecord', null);
        }
    },
    onmaPklRecheckFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Pkl_Recheck'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklRecheckFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
        viewModel.set('lotnumberTxtRecheck', '');
        this.resetFormRecheck();

        var maPklFilter = viewModel.get('maPklRecheckFilter') == null ? '' : viewModel.get('maPklRecheckFilter').toLowerCase();
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
    resetFormRecheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var lotnumber = viewModel.get('objRecheck.lotnumber');
        viewModel.set('objRecheck', null);
        viewModel.set('objRecheck.lotnumber', lotnumber);
    },
    onItemPklRecheckTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();
        var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');
        var tappedRecord = location.record;

        if(selectedPklRecheckRecord == null){
            var record = location.record;
            viewModel.set('selectedPklRecheckRecord', record);
    
            // copy obj, để thay đổi thông tin ko ảnh hưởng đến view model
            // khi click lên record ở grid sẽ lấy lại giá trị cũ
            var newObjData = JSON.parse(JSON.stringify(record.data));
            // chuyển khổ m -> cm
            newObjData.width_met = newObjData.width_met * 100;
            newObjData.width_met_check = newObjData.width_met_check * 100;
            viewModel.set('objRecheck', newObjData);
        } else{
            var selectable = list.getSelectable();
            var selectRecord = selectable.getSelectedRecord();

            if(selectRecord == tappedRecord){
                // nếu ấn vào 1 record đã chọn thì bỏ chọn record này và set viewModel selectedPklRecheckRecord thành null
                // bỏ highlight trên giao diện grid
                setTimeout(function(){
                    m.onGridDeselect();
                }, 50);

                viewModel.set('selectedPklRecheckRecord', null);
                viewModel.set('objRecheck', null);
            }else{
                // nếu ấn vào 1 record khác với record đã chọn, bỏ chionj record cũ và chọn record mới
                // set viewModel selectedPklRecord thành record mới
                var record = location.record;
                viewModel.set('selectedPklRecheckRecord',record);

                // copy obj, để thay đổi thông tin ko ảnh hưởng đến view model
                // khi click lên record ở grid sẽ lấy lại giá trị cũ
                var newObjData = JSON.parse(JSON.stringify(record.data));
                // chuyển khổ m -> cm
                newObjData.width_met = newObjData.width_met * 100;
                newObjData.width_met_check = newObjData.width_met_check * 100;
                viewModel.set('objRecheck', newObjData);
            }
        }
    },
    onGridDeselect: function(){
        var grid = this.getView().down('#Stockin_M_Edit_Pkl_Recheck');
        var selectable = grid.getSelectable();
        var selectRecord = selectable.getSelectedRecord();
        selectable.deselectAll();
    },
    onCheckRecheck: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        // var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');
        var objRecheck = viewModel.get('objRecheck');

        // check combo đã chọn chưa
        var pklRecheck_stockindId = viewModel.get('pklRecheck_stockindId');
        if(pklRecheck_stockindId == '' || pklRecheck_stockindId == null){
            Ext.toast('Cần chọn loại vải', 3000);
            return;
        }

        if(objRecheck.id == null){
            Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
            return;
        }

        // check textfield
        if(stockin.unitid_link == 3){
            if(objRecheck.packageid == '' || objRecheck.ydscheck == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 3000);
                return;
            }
            if(isNaN(objRecheck.ydscheck)){
                Ext.toast('Số Y phải là số', 3000);
                return;
            }
        }
        if(stockin.unitid_link == 1){
            if(objRecheck.packageid == '' || objRecheck.met_check == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 3000);
                return;
            }
            if(isNaN(objRecheck.met_check)){
                Ext.toast('Số M phải là số', 3000);
                return;
            }
        }
        
        // tạo obj
        if(objRecheck.ydscheck == null || objRecheck.ydscheck == '') objRecheck.ydscheck = 0;
        if(objRecheck.met_check == null || objRecheck.met_check == '') objRecheck.met_check = 0;
        if(objRecheck.ydsorigin == null || objRecheck.ydsorigin == '' || objRecheck.ydsorigin == 0) objRecheck.ydsorigin = objRecheck.ydscheck;
        if(objRecheck.met_origin == null || objRecheck.met_origin == '' || objRecheck.met_origin == 0) objRecheck.met_origin = objRecheck.met_check;
        if(objRecheck.sample_check == null || objRecheck.sample_check == '') objRecheck.sample_check = 0;
        if(objRecheck.grossweight_check == null || objRecheck.grossweight_check == '') objRecheck.grossweight_check = 0;
        if(objRecheck.grossweight == null || objRecheck.grossweight == '' || objRecheck.grossweight == 0) objRecheck.grossweight = objRecheck.grossweight_check;
        if(objRecheck.width_met_check == null || objRecheck.width_met_check == '') objRecheck.width_met_check = 0;
        if(objRecheck.width_met == null || objRecheck.width_met == '' || objRecheck.width_met == 0) widthMetTxt = objRecheck.width_met_check;

        if(stockin.unitid_link == 3){
            // có y
            objRecheck.ydscheck = parseFloat(objRecheck.ydscheck);
            objRecheck.met_check = objRecheck.ydscheck * 0.9144;
            objRecheck.ydsorigin = parseFloat(objRecheck.ydsorigin);
            objRecheck.met_origin = objRecheck.ydsorigin * 0.9144;
        }
        if(stockin.unitid_link == 1){
            // có m
            objRecheck.met_check = parseFloat(objRecheck.met_check);
            objRecheck.ydscheck = objRecheck.met_check / 0.9144;
            objRecheck.met_origin = parseFloat(objRecheck.met_origin);
            objRecheck.ydsorigin = objRecheck.met_origin / 0.9144;
        }

        objRecheck.met_check = parseFloat(objRecheck.met_check);
        objRecheck.ydscheck = parseFloat(objRecheck.ydscheck);
        objRecheck.met_origin = parseFloat(objRecheck.met_origin);
        objRecheck.ydsorigin = parseFloat(objRecheck.ydsorigin);
        objRecheck.width_met_check = parseFloat(objRecheck.width_met_check / 100);
        objRecheck.width_yds_check = parseFloat(objRecheck.width_met_check / 0.9144);
        objRecheck.width_met = parseFloat(objRecheck.width_met / 100);
        objRecheck.width_yds = parseFloat(objRecheck.width_met / 0.9144);

        //
        // console.log(objRecheck);

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        })

        var params = new Object();
        params.data = objRecheck;

        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/update', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(response.message == 'Đã tồn tại cây vải khác có lot và packageid này'){
                            Ext.toast('Lưu thất bại: ' + response.message, 3000);
                        }else{
                            Ext.toast('Lưu thành công', 3000);
                            var data = response.data;
                            
                            // bỏ highlight
                            var grid = me.down('#Stockin_M_Edit_Pkl_Recheck');
                            grid.getSelectable().deselectAll();
                            viewModel.set('selectedPklRecheckRecord', null);

                            m.reloadStore();
                            m.resetFormRecheck();
                            m.getView().down('#packageidTxtRecheck').focus();
                        }
                        // console.log(response);
                    }else{
                        Ext.toast('Lưu thất bại: ' + response.message, 3000);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 3000);
                }
        })

        
    },
    onbtnResetFormRecheck: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('lotnumberTxtRecheck', '');
        m.resetFormRecheck();
    },
    onlotnumberTxtRecheckType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('objRecheck.lotnumber', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtAndpackageidTxtRecheckleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');

        var lotnumber = viewModel.get('objRecheck.lotnumber');
        var packageid = viewModel.get('objRecheck.packageid');

        // nếu đang chọn 1 record thì edit, ko tìm trên db, return
        // if(selectedPklRecheckRecord != null){ console.log('here');
        //     return;
        // }

        if( // nếu chưa đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null ||
            selectedDRecord == null
        ){
            viewModel.set('objRecheck', null);
            viewModel.set('objRecheck.lotnumber', lotnumber);
            viewModel.set('objRecheck.packageid', packageid);
            return;
        }else{ // tìm cây vải theo lot và package
            var stockindid_link = selectedDRecord.get('id');

            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });

            var params = new Object();
            params.stockindid_link = stockindid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;

            GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/getByStockinDLotAndPackageId', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    me.setMasked(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            if(response.data.length == 0){
                                Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
                                viewModel.set('objRecheck', null);
                                viewModel.set('objRecheck.lotnumber', lotnumber);
                                viewModel.set('objRecheck.packageid', packageid);

                            }else{
                                // tìm thấy cây vải, set thông tin cho các trường
                                var responseObj = response.data[0];
                                // chuyển khổ m -> cm
                                responseObj.width_met = responseObj.width_met * 100;
                                responseObj.width_met_check = responseObj.width_met_check * 100;
                                viewModel.set('objRecheck', responseObj);

                                // bỏ highlight
                                var grid = me.down('#Stockin_M_Edit_Pkl_Recheck');
                                grid.getSelectable().deselectAll();
                                // highlight nếu cây vải có trong danh sách 10%
                                var storeItems = viewModel.getStore('StockinPklRecheckStore').getData().items;
                                for(var i=0; i<storeItems.length; i++){
                                    var item = storeItems[i];
                                    if(item.get('id') == responseObj.id){
                                        grid.getSelectable().select(item);
                                        viewModel.set('selectedPklRecheckRecord', item);
                                        // console.log(item);
                                    }
                                }
                                //
                                // console.log(responseObj);
                            }
                            
                        }else{
                            Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 3000);
                        }
                    } else {
                        var response = Ext.decode(response.responseText);
                        Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 3000);
                    }
            })        
        }
    },

    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var pklRecheck_stockindId = viewModel.get('pkl_stockindId');
        var selectedPklRecheckRecord = viewModel.get('selectedPklRecheckRecord');

        var StockinPklRecheckStore = viewModel.getStore('StockinPklRecheckStore');
        StockinPklRecheckStore.loadStore_byStockinDIdAndEqualStatus_async(pklRecheck_stockindId, 2);
        StockinPklRecheckStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    if(selectedPklRecheckRecord != null){
                        var stockinpklid_link = selectedPklRecheckRecord.get('id');
                        var storeItems = StockinPklRecheckStore.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == stockinpklid_link){
                                var grid = m.getView().down('#Stockin_M_Edit_Pkl_Recheck');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedPklRecheckRecord', item);
                            }
                        }
                    }
                }
            }
        });
    }
})