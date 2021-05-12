Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_ToVai_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_ForCheck_Edit_ToVai_MainController',
	init: function () {
		
	},
    control: {
        '#btnResetForm':{
            tap: 'onbtnResetForm'
        },
        '#btnCheck':{
            tap: 'onCheck'
        },
        '#Stockout_ForCheck_Edit_ToVai':{
            childtap: 'onItemPklTap'
        },
        '#cbbox_pkl_stockout_order_dId':{
            change: 'oncbbox_pkl_stockout_order_dId_change'
        }
    },
    oncbbox_pkl_stockout_order_dId_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        var pkl_stockout_order_dId = viewModel.get('pkl_stockout_order_dId');
        if(newValue != null && newValue != ''){
            var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');
            Stockout_order_pkl_Store.loadStore_byStockout_orderDId(newValue);
            if(cbbox.getSelection() != null){
                viewModel.set('selectedDRecord', cbbox.getSelection());
            }
        }
    },
    onmaPklFilterKeyup: function (){
        var grid = this.getView().down('#Stockout_ForCheck_Edit_ToVai'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
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
        var m = this;
        var viewModel = this.getViewModel();
        var lotnumber = viewModel.get('objPkl.lotnumber');
        viewModel.set('objPkl', null);
        viewModel.set('objPkl.lotnumber', lotnumber);
    },
    onItemPklTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();

        var record = location.record;
        viewModel.set('selectedPklRecord', record);

        // copy obj, để thay đổi thông tin ko ảnh hưởng đến view model
        // khi click lên record ở grid sẽ lấy lại giá trị cũ
        var newObjData = JSON.parse(JSON.stringify(record.data));
        viewModel.set('objPkl', newObjData);

        // console.log(newObj);
        // console.log(record.data);
        // console.log(record);
    },
    onCheck: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockout_order = viewModel.get('stockout_order');
        var objPkl = viewModel.get('objPkl');

        if(objPkl.id == null){
            Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
            return;
        }

        // check textfield
        if(stockin.unitid_link == 3){
            if(objPkl.packageid == '' || objPkl.ydscheck == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 3000);
                return;
            }
            if(isNaN(objPkl.ydscheck)){
                Ext.toast('Số Y phải là số', 3000);
                return;
            }
        }
        if(stockin.unitid_link == 1){
            if(objPkl.packageid == '' || objPkl.met_check == ''){
                Ext.toast('Thiếu thông tin Số cây hoặc độ dài', 3000);
                return;
            }
            if(isNaN(objPkl.met_check)){
                Ext.toast('Số M phải là số', 3000);
                return;
            }
        }

        // // check lotnumber tồn tại
        // var isLotnumberExist = stockin_lot.some(
        //     item => item.lot_number.toUpperCase() == lotnumberTxt.toUpperCase()
        // );
        // if(!isLotnumberExist){
        //     Ext.toast('Số lot ko tồn tại', 3000);
        //     return;
        // }
        
        // tạo obj
        if(objPkl.ydscheck == null || objPkl.ydscheck == '') objPkl.ydscheck = 0;
        if(objPkl.met_check == null || objPkl.met_check == '') objPkl.met_check = 0;
        if(objPkl.ydsorigin == null || objPkl.ydsorigin == '' || objPkl.ydsorigin == 0) objPkl.ydsorigin = objPkl.ydscheck;
        if(objPkl.met_origin == null || objPkl.met_origin == '' || objPkl.met_origin == 0) objPkl.met_origin = objPkl.met_check;
        if(objPkl.sample_check == null || objPkl.sample_check == '') objPkl.sample_check = 0;
        if(objPkl.grossweight_check == null || objPkl.grossweight_check == '') objPkl.grossweight_check = 0;
        if(objPkl.grossweight == null || objPkl.grossweight == '' || objPkl.grossweight == 0) objPkl.grossweight = objPkl.grossweight_check;
        if(objPkl.width_yds_check == null || objPkl.width_yds_check == '') objPkl.width_yds_check = 0;
        if(objPkl.width_yds == null || objPkl.width_yds == '' || objPkl.width_yds == 0) objPkl.width_yds = objPkl.width_yds_check;
        if(objPkl.width_met_check == null || objPkl.width_met_check == '') objPkl.width_met_check = 0;
        if(objPkl.width_met == null || objPkl.width_met == '' || objPkl.width_met == 0) widthMetTxt = objPkl.width_met_check;

        if(stockin.unitid_link == 3){
            // có y
            objPkl.ydscheck = parseFloat(objPkl.ydscheck);
            objPkl.met_check = objPkl.ydscheck * 0.9144;
            objPkl.ydsorigin = parseFloat(objPkl.ydsorigin);
            objPkl.met_origin = objPkl.ydsorigin * 0.9144;

            objPkl.width_yds_check = parseFloat(objPkl.width_yds_check);
            objPkl.width_met_check = objPkl.width_yds_check * 0.9144;
            objPkl.width_yds = parseFloat(objPkl.width_yds);
            objPkl.width_met = objPkl.width_yds * 0.9144;
        }
        if(stockin.unitid_link == 1){
            // có m
            objPkl.met_check = parseFloat(objPkl.met_check);
            objPkl.ydscheck = objPkl.met_check / 0.9144;
            objPkl.met_origin = parseFloat(objPkl.met_origin);
            objPkl.ydsorigin = objPkl.met_origin / 0.9144;

            objPkl.width_met_check = parseFloat(objPkl.width_met_check);
            objPkl.width_yds_check = objPkl.width_met_check / 0.9144;
            objPkl.width_met = parseFloat(objPkl.width_met);
            objPkl.width_yds = objPkl.width_met / 0.9144;
        }

        objPkl.met_check = parseFloat(Ext.util.Format.number(objPkl.met_check, '0.00'));
        objPkl.ydscheck = parseFloat(Ext.util.Format.number(objPkl.ydscheck, '0.00'));
        objPkl.met_origin = parseFloat(Ext.util.Format.number(objPkl.met_origin, '0.00'));
        objPkl.ydsorigin = parseFloat(Ext.util.Format.number(objPkl.ydsorigin, '0.00'));
        objPkl.width_met_check = parseFloat(Ext.util.Format.number(objPkl.width_met_check, '0.00'));
        objPkl.width_yds_check = parseFloat(Ext.util.Format.number(objPkl.width_yds_check, '0.00'));
        objPkl.width_met = parseFloat(Ext.util.Format.number(objPkl.width_met, '0.00'));
        objPkl.width_yds = parseFloat(Ext.util.Format.number(objPkl.width_yds, '0.00'));

        //
        // console.log(objPkl);

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        })

        var params = new Object();
        params.data = objPkl;

        GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/update', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(response.message == 'Đã tồn tại cây vải khác có lot và packageid này'){
                            Ext.toast('Lưu thất bại: ' + response.message, 3000);
                            me.setMasked(false);
                        }else{
                            Ext.toast('Lưu thành công', 3000);
                            var data = response.data;
                            me.setMasked(false);
                            m.reloadStore();
                            m.resetForm();
                            m.getView().down('#packageidTxt').focus();

                            // bỏ highlight
                            var grid = me.down('#Stockout_ForCheck_Edit_ToVai');
                            grid.getSelectable().deselectAll();
                            viewModel.set('selectedPklRecord', null);
                            //
                        }
                        // console.log(response);
                    }else{
                        Ext.toast('Lưu thất bại: ' + response.message, 3000);
                        me.setMasked(false);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 3000);
                    me.setMasked(false);
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
        viewModel.set('objPkl.lotnumber', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtAndpackageidTxtleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var lotnumber = viewModel.get('objPkl.lotnumber');
        var packageid = viewModel.get('objPkl.packageid');

        // nếu đang chọn 1 record thì edit, ko tìm trên db, return
        if(selectedPklRecord != null){
            return;
        }

        if( // nếu chưu đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null ||
            selectedDRecord == null
        ){
            viewModel.set('objPkl', null);
            viewModel.set('objPkl.lotnumber', lotnumber);
            viewModel.set('objPkl.packageid', packageid);
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
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            if(response.data.length == 0){
                                Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
                                viewModel.set('objPkl', null);
                                viewModel.set('objPkl.lotnumber', lotnumber);
                                viewModel.set('objPkl.packageid', packageid);

                            }else{
                                // tìm thấy cây vải, set thông tin cho các trường
                                var responseObj = response.data[0];
                                viewModel.set('objPkl', responseObj);

                                // bỏ highlight
                                var grid = me.down('#Stockout_ForCheck_Edit_ToVai');
                                grid.getSelectable().deselectAll();
                                // highlight nếu cây vải có trong danh sách 10%
                                var storeItems = viewModel.getStore('StockinPklStore').getData().items;
                                for(var i=0; i<storeItems.length; i++){
                                    var item = storeItems[i];
                                    if(item.get('id') == responseObj.id){
                                        grid.getSelectable().select(item);
                                        viewModel.set('selectedPklRecord', item);
                                        // console.log(item);
                                    }
                                }
                                //
                                // console.log(responseObj);
                            }
                            me.setMasked(false);
                        }else{
                            Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 3000);
                            me.setMasked(false);
                        }
                    } else {
                        var response = Ext.decode(response.responseText);
                        Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 3000);
                        me.setMasked(false);
                    }
            })        
        }

        // viewModel.set('mOriginTxt', obj.met_origin);
        // viewModel.set('yOriginTxt', obj.ydsorigin);
        // viewModel.set('grossweightTxt', obj.grossweight);
        // viewModel.set('widthMetTxt', obj.width_met);
        // viewModel.set('widthYdsTxt', obj.width_yds);
    },

    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var pkl_stockout_order_dId = viewModel.get('pkl_stockindId');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var StockinPklStore = viewModel.getStore('StockinPklStore');
        StockinPklStore.loadStore_byStockinDIdAndEqualStatus_async(pkl_stockout_order_dId, 2);
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
                                var grid = m.getView().down('#Stockout_ForCheck_Edit_ToVai');
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