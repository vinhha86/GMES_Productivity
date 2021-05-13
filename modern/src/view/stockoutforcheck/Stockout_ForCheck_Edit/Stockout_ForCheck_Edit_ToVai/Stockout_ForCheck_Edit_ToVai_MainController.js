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
        var selectedDRecord = viewModel.get('selectedDRecord');
        var objPkl = viewModel.get('objPkl');

        // console.log(objPkl);
        // if(objPkl.id == null){
        //     Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
        //     return;
        // }

        // check textfield
        if(objPkl.packageid == null || objPkl.packageid == ''){
            Ext.toast('Thiếu thông tin số cây', 3000);
            return;
        }
        if(objPkl.lotnumber == null || objPkl.lotnumber == ''){
            Ext.toast('Thiếu thông tin số lot', 3000);
            return;
        }
        if(stockout_order.unitid_link == null) stockout_order.unitid_link = 1;
        if(stockout_order.unitid_link == 3){
            if(objPkl.width_yds_check == '' || objPkl.ydscheck == ''){
                Ext.toast('Thiếu thông tin khổ hoặc độ dài', 3000);
                return;
            }
            if(isNaN(objPkl.ydscheck)){
                Ext.toast('Số Y phải là số', 3000);
                return;
            }
        }
        if(stockout_order.unitid_link == 1){
            if(objPkl.width_met_check == '' || objPkl.met_check == ''){
                Ext.toast('Thiếu thông tin khổ hoặc độ dài', 3000);
                return;
            }
            if(isNaN(objPkl.metcheck)){
                Ext.toast('Số M phải là số', 3000);
                return;
            }
        }

        
        // tạo obj
        if(objPkl.ydscheck == null || objPkl.ydscheck == '') objPkl.ydscheck = 0;
        if(objPkl.metcheck == null || objPkl.metcheck == '') objPkl.metcheck = 0;
        if(objPkl.ydsorigin == null || objPkl.ydsorigin == '' || objPkl.ydsorigin == 0) objPkl.ydsorigin = objPkl.ydscheck;
        if(objPkl.metorigin == null || objPkl.metorigin == '' || objPkl.metorigin == 0) objPkl.metorigin = objPkl.metcheck;
        // if(objPkl.sample_check == null || objPkl.sample_check == '') objPkl.sample_check = 0;
        // if(objPkl.grossweight_check == null || objPkl.grossweight_check == '') objPkl.grossweight_check = 0;
        if(objPkl.grossweight == null || objPkl.grossweight == '' || objPkl.grossweight == 0) objPkl.grossweight = 0;
        if(objPkl.width_yds_check == null || objPkl.width_yds_check == '') objPkl.width_yds_check = 0;
        if(objPkl.width_yds == null || objPkl.width_yds == '' || objPkl.width_yds == 0) objPkl.width_yds = objPkl.width_yds_check;
        if(objPkl.width_met_check == null || objPkl.width_met_check == '') objPkl.width_met_check = 0;
        if(objPkl.width_met == null || objPkl.width_met == '' || objPkl.width_met == 0) widthMetTxt = objPkl.width_met_check;

        if(stockout_order.unitid_link == 3){
            // có y
            objPkl.ydscheck = parseFloat(objPkl.ydscheck);
            objPkl.metcheck = objPkl.ydscheck * 0.9144;
            objPkl.ydsorigin = parseFloat(objPkl.ydsorigin);
            objPkl.metorigin = objPkl.ydsorigin * 0.9144;

            objPkl.width_yds_check = parseFloat(objPkl.width_yds_check);
            objPkl.width_met_check = objPkl.width_yds_check * 0.9144;
            objPkl.width_yds = parseFloat(objPkl.width_yds);
            objPkl.width_met = objPkl.width_yds * 0.9144;

        }
        if(stockout_order.unitid_link == 1){
            // có m
            objPkl.metcheck = parseFloat(objPkl.metcheck);
            objPkl.ydscheck = objPkl.metcheck / 0.9144;
            objPkl.metorigin = parseFloat(objPkl.metorigin);
            objPkl.ydsorigin = objPkl.metorigin / 0.9144;

            objPkl.width_met_check = parseFloat(objPkl.width_met_check);
            objPkl.width_yds_check = objPkl.width_met_check / 0.9144;
            objPkl.width_met = parseFloat(objPkl.width_met);
            objPkl.width_yds = objPkl.width_met / 0.9144;

        }

        objPkl.metcheck = parseFloat(Ext.util.Format.number(objPkl.metcheck, '0.00'));
        objPkl.ydscheck = parseFloat(Ext.util.Format.number(objPkl.ydscheck, '0.00'));
        objPkl.metorigin = parseFloat(Ext.util.Format.number(objPkl.metorigin, '0.00'));
        objPkl.ydsorigin = parseFloat(Ext.util.Format.number(objPkl.ydsorigin, '0.00'));
        objPkl.width_met_check = parseFloat(Ext.util.Format.number(objPkl.width_met_check, '0.00'));
        objPkl.width_yds_check = parseFloat(Ext.util.Format.number(objPkl.width_yds_check, '0.00'));
        objPkl.width_met = parseFloat(Ext.util.Format.number(objPkl.width_met, '0.00'));
        objPkl.width_yds = parseFloat(Ext.util.Format.number(objPkl.width_yds, '0.00'));

        objPkl.stockoutorderid_link = stockout_order.id;
        objPkl.stockoutorderdid_link = selectedDRecord.get('id');

        // set lại giá trị các trường của warehouse
        objPkl.met = objPkl.metcheck;
        objPkl.yds = objPkl.ydscheck;
        if(objPkl.unitid_link == 1 || objPkl.unitid_link == null){ // trường unitid_link của warehouse
            objPkl.width = objPkl.width_met_check;
        }
        if(objPkl.unitid_link == 3){ // trường unitid_link của warehouse
            objPkl.width = objPkl.width_yds_check;
        }
        //
        // console.log(objPkl);

        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        })

        var params = new Object();
        params.warehouse = objPkl;
        params.stockoutOrderPklist = objPkl;///////////////////////

        GSmartApp.Ajax.postJitin('/api/v1/warehouse/updateToVai', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    me.setMasked(false);
                    if (response.respcode == 200) {
                        if(response.message == 'Không tồn tại cây vải trong kho'){
                            Ext.toast('Lưu thất bại: ' + response.message, 3000);
                        }else{
                            Ext.toast('Lưu thành công', 3000);
                            var data = response.data;

                            // bỏ highlight
                            var grid = me.down('#Stockout_ForCheck_Edit_ToVai');
                            grid.getSelectable().deselectAll();
                            viewModel.set('selectedPklRecord', null);

                            m.reloadStore();
                            m.resetForm();
                            m.getView().down('#packageidTxt').focus();
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
    onlotnumberTxtAndpackageidTxtenter: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('isPklTextfieldFocus', true);
    },
    onlotnumberTxtAndpackageidTxtleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');

        viewModel.set('isPklTextfieldFocus', false);
        var lotnumber = viewModel.get('objPkl.lotnumber');
        var packageid = viewModel.get('objPkl.packageid');

        // nếu đang chọn 1 record thì edit, ko tìm trên db, return
        // if(selectedPklRecord != null){
        //     return;
        // }

        if( // nếu chưa đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null ||
            selectedDRecord == null
        ){
            viewModel.set('objPkl', null);
            viewModel.set('objPkl.lotnumber', lotnumber);
            viewModel.set('objPkl.packageid', packageid);
            return;
        }else{ // tìm cây vải theo lot và package
            // var stockoutorderdid_link = selectedDRecord.get('id');
            var skuid_link = selectedDRecord.get('material_skuid_link');

            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });

            var params = new Object();
            // params.stockoutorderdid_link = stockoutorderdid_link;
            params.skuid_link = skuid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;

            GSmartApp.Ajax.postJitin('/api/v1/warehouse/getByLotAndPackageId', Ext.JSON.encode(params),
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
                                var objPkl = m.setDataObjPkl(responseObj);
                                viewModel.set('objPkl', objPkl);

                                // bỏ highlight
                                var grid = me.down('#Stockout_ForCheck_Edit_ToVai');
                                grid.getSelectable().deselectAll();
                                // highlight nếu cây vải có trong danh sách pkl
                                // var storeItems = viewModel.getStore('Stockout_order_pkl_Store').getData().items;
                                // for(var i=0; i<storeItems.length; i++){
                                //     var item = storeItems[i];
                                //     if(
                                //         item.get('skuid_link') == objPkl.skuid_link &&
                                //         item.get('lotnumber') == objPkl.lotnumber &&
                                //         item.get('packageid') == objPkl.packageid
                                //     ){
                                //         grid.getSelectable().select(item);
                                //         viewModel.set('selectedPklRecord', item);
                                //         // console.log(item);
                                //     }
                                // }
                                //
                                // console.log(response);
                                // console.log(responseObj);
                                // console.log(storeItems);
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
    },
    setDataObjPkl:function(objPkl){
        // skuid_link, colorid_link, lotnumber, packageid, 
        // ydsorigin, ydscheck, metorigin, metcheck, 
        // grossweight, epc,
        // width_yds_check, width_yds, width_met_check, width_met
        // console.log(objPkl);
        objPkl.ydsorigin = objPkl.yds;
        objPkl.ydscheck = objPkl.yds;
        objPkl.metorigin = objPkl.met;
        objPkl.metcheck = objPkl.met;
        if(objPkl.unitid_link == null) objPkl.unitid_link = 1;
        // width
        if(objPkl.unitid_link == 1){ // met
            objPkl.width_met = objPkl.width;
            objPkl.width_met_check  = objPkl.width;
            objPkl.width_yds = parseFloat(Ext.util.Format.number(objPkl.width_met / 0.9144, '0.00'));
            objPkl.width_yds_check = parseFloat(Ext.util.Format.number(objPkl.width_met_check / 0.9144, '0.00'));
        }
        if(objPkl.unitid_link == 3){ // yds
            objPkl.width_yds = objPkl.width;
            objPkl.width_yds_check = objPkl.width;
            objPkl.width_met = parseFloat(Ext.util.Format.number(objPkl.width_yds * 0.9144, '0.00'));
            objPkl.width_met_check = parseFloat(Ext.util.Format.number(objPkl.width_yds_check * 0.9144, '0.00'));
        }
        return objPkl;
    },

    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutorderid_link = viewModel.get('stockout_order.id');
        var pkl_stockout_order_dId = viewModel.get('pkl_stockout_order_dId');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var Stockout_order_pkl_Store = viewModel.getStore('Stockout_order_pkl_Store');
        Stockout_order_pkl_Store.loadStore_byStockout_orderDId_async(pkl_stockout_order_dId);
        Stockout_order_pkl_Store.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    if(selectedPklRecord != null){
                        var id = selectedPklRecord.get('id');
                        var storeItems = Stockout_order_pkl_Store.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == id){
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