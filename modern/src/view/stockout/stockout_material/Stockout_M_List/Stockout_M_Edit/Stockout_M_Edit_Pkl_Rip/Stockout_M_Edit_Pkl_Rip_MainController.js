Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_List.Stockout_M_Edit.Stockout_M_Edit_Pkl_Rip.Stockout_M_Edit_Pkl_Rip_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_M_Edit_Pkl_Rip_MainController',
	init: function () {
		
	},
    control: {
        '#btnCheckRip':{
            tap: 'onCheckRip'
        },
        '#Stockout_M_Edit_Pkl_Rip':{
            childtap: 'onItemPklRipTap'
        },
        '#cbbox_pklRip_stockoutdId':{
            change: 'oncbbox_pklRip_stockoutdId_change'
        }
    },
    oncbbox_pklRip_stockoutdId_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');
        if(newValue != null && newValue != ''){
            var stockout_pklist_rip = viewModel.getStore('stockout_pklist_rip');
            stockout_pklist_rip.loadstore_ByStockoutDId_Rip(newValue);
            
            viewModel.set('pkl_stockoutdId', newValue);

            if(cbbox.getSelection() != null){
                viewModel.set('selectedDRecord', cbbox.getSelection());
            }
        }
    },
    onmaPklRipFilterKeyup: function (){
        var grid = this.getView().down('#Stockout_M_Edit_Pkl_Rip'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklRipFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
        viewModel.set('lotnumberTxtRip', '');
        this.resetFormRip();

        var maPklFilter = viewModel.get('maPklRipFilter') == null ? '' : viewModel.get('maPklRipFilter').toLowerCase();
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
    resetFormRip: function(){
        var m = this;
        var viewModel = this.getViewModel();
        // var lotnumber = viewModel.get('objRip.lotnumber');
        viewModel.set('objRip', null);
        // viewModel.set('objRip.lotnumber', lotnumber);
    },
    onItemPklRipTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();

        var record = location.record;
        viewModel.set('selectedPklRipRecord', record);

        // objRip: lưu thông tin của các trường
        // id, lotnumber, packageid, met_check, ydscheck (các trường của stockout pkl)
        // met_remain, yds_remain (trường để update warehouse)
        var objRip = new Object();
        objRip.id = record.get('id');
        objRip.lotnumber = record.get('lotnumber');
        objRip.packageid = record.get('packageid');
        objRip.met_check = record.get('met_check');
        objRip.ydscheck = record.get('ydscheck');
        // objRip.met_remain = record.get('met_check');
        // objRip.yds_remain = record.get('ydscheck');

        viewModel.set('objRip', objRip);

        // console.log(record);
        // console.log(objRip);
    },
    onCheckRip: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var selectedPklRipRecord = viewModel.get('selectedPklRipRecord');
        var objRip = viewModel.get('objRip');
        // objRip: lưu thông tin của các trường
        // id, lotnumber, packageid, met_check, ydscheck (các trường của stockout pkl)
        // met_remain, yds_remain (trường để update warehouse)

        // check combo đã chọn chưa
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');
        if(pklRip_stockoutdId == '' || pklRip_stockoutdId == null){
            Ext.toast('Cần chọn loại vải', 3000);
            return;
        }

        if(objRip.id == null){
            Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
            return;
        }

        // check textfield
        if(stockout.unitid_link == 3){
            if(objRip.yds_remain == '' || objRip.yds_remain == null){
                Ext.toast('Thiếu thông tin số còn', 3000);
                return;
            }
            if(isNaN(objRip.yds_remain)){
                Ext.toast('Số còn là số', 3000);
                return;
            }
            if(objRip.ydscheck == '' || objRip.ydscheck == null){
                Ext.toast('Thiếu thông tin số xé', 3000);
                return;
            }
            if(isNaN(objRip.ydscheck)){
                Ext.toast('Số xé là số', 3000);
                return;
            }
        }
        if(stockout.unitid_link == 1){
            if(objRip.met_remain == '' || objRip.met_remain == null){
                Ext.toast('Thiếu thông tin số còn', 3000);
                return;
            }
            if(isNaN(objRip.met_remain)){
                Ext.toast('Số còn là số', 3000);
                return;
            }
            if(objRip.met_check == '' || objRip.met_check == null){
                Ext.toast('Thiếu thông tin số xé', 3000);
                return;
            }
            if(isNaN(objRip.met_check)){
                Ext.toast('Số xé là số', 3000);
                return;
            }
        }
        
        // quy đổi met <-> yds
        if(stockout.unitid_link == 3){
            // có y
            // objRip.ydscheck = parseFloat(objRip.ydscheck);
            objRip.met_check = objRip.ydscheck * 0.9144;
            // objRip.yds_remain = parseFloat(objRip.yds_remain);
            objRip.met_remain = objRip.yds_remain * 0.9144;
        }
        if(stockout.unitid_link == 1){
            // có m
            // objRip.met_check = parseFloat(objRip.met_met_checkcheck);
            objRip.ydscheck = objRip.met_check / 0.9144;
            // objRip.met_remain = parseFloat(objRip.met_remain);
            objRip.yds_remain = objRip.met_remain / 0.9144;
        }
        // console.log(objRip);

        // lấy 2 số thập phân
        objRip.met_check = parseFloat(Ext.util.Format.number(objRip.met_check, '0.00'));
        objRip.ydscheck = parseFloat(Ext.util.Format.number(objRip.ydscheck, '0.00'));
        objRip.met_remain = parseFloat(Ext.util.Format.number(objRip.met_remain, '0.00'));
        objRip.yds_remain = parseFloat(Ext.util.Format.number(objRip.yds_remain, '0.00'));

        // lưu
        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });

        var params = new Object();
        params.id = objRip.id;
        params.lotnumber = objRip.lotnumber;
        params.packageid = objRip.packageid;
        params.met_check = objRip.met_check;
        params.ydscheck = objRip.ydscheck;
        params.met_remain = objRip.met_remain;
        params.yds_remain = objRip.yds_remain;
        // id, lotnumber, packageid, met_check, ydscheck (các trường của stockout pkl)
        // met_remain, yds_remain (trường để update warehouse)

        GSmartApp.Ajax.postJitin('/api/v1/stockout_pklist/update_rip', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        m.reloadStore();
                        m.resetFormRip();
                        // m.getView().down('#packageidTxtRip').focus();

                        // bỏ highlight
                        var grid = me.down('#Stockout_M_Edit_Pkl_Rip');
                        grid.getSelectable().deselectAll();
                        viewModel.set('selectedPklRipRecord', null);

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
    onbtnResetFormRip: function(){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('lotnumberTxtRip', '');
        m.resetFormRip();
    },
    onlotnumberTxtRipType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('objRip.lotnumber', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtAndpackageidTxtRipleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        var selectedPklRipRecord = viewModel.get('selectedPklRipRecord');

        var lotnumber = viewModel.get('objRip.lotnumber');
        var packageid = viewModel.get('objRip.packageid');

        // nếu đang chọn 1 record thì edit, ko tìm trên db, return
        if(selectedPklRipRecord != null){
            return;
        }

        if( // nếu chưu đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null ||
            selectedDRecord == null
        ){
            viewModel.set('objRip', null);
            viewModel.set('objRip.lotnumber', lotnumber);
            viewModel.set('objRip.packageid', packageid);
            return;
        }else{ // tìm cây vải theo lot và package
            var stockoutdid_link = selectedDRecord.get('id');

            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });

            var params = new Object();
            params.stockoutdid_link = stockoutdid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;

            GSmartApp.Ajax.postJitin('/api/v1/stockout_pklist/getByStockoutDLotAndPackageId', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    me.setMasked(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            if(response.data.length == 0){
                                Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
                                viewModel.set('objRip', null);
                                viewModel.set('objRip.lotnumber', lotnumber);
                                viewModel.set('objRip.packageid', packageid);

                            }else{
                                // tìm thấy cây vải, set thông tin cho các trường
                                var responseObj = response.data[0];
                                viewModel.set('objRip', responseObj);

                                // bỏ highlight
                                var grid = me.down('#Stockout_M_Edit_Pkl_Rip');
                                grid.getSelectable().deselectAll();
                                // highlight nếu cây vải có trong danh sách 10%
                                var storeItems = viewModel.getStore('StockoutPklRipStore').getData().items;
                                for(var i=0; i<storeItems.length; i++){
                                    var item = storeItems[i];
                                    if(item.get('id') == responseObj.id){
                                        grid.getSelectable().select(item);
                                        viewModel.set('selectedPklRipRecord', item);
                                        // console.log(item);
                                    }
                                }
                                //
                                console.log(responseObj);
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

        // viewModel.set('mOriginTxtRip', obj.met_origin);
        // viewModel.set('yOriginTxtRip', obj.ydsorigin);
        // viewModel.set('grossweightTxtRip', obj.grossweight);
        // viewModel.set('widthMetTxtRip', obj.width_met);
        // viewModel.set('widthYdsTxtRip', obj.width_yds);
    },

    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutid_link = viewModel.get('stockout.id');
        var pklRip_stockoutdId = viewModel.get('pklRip_stockoutdId');
        var selectedPklRipRecord = viewModel.get('selectedPklRipRecord');

        var stockout_pklist_rip = viewModel.getStore('stockout_pklist_rip');
        stockout_pklist_rip.loadstore_ByStockoutDId_Rip_async(pklRip_stockoutdId);
        stockout_pklist_rip.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    if(selectedPklRipRecord != null){
                        var stockoutpklid_link = selectedPklRipRecord.get('id');
                        var storeItems = stockout_pklist_rip.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == stockoutpklid_link){
                                var grid = m.getView().down('#Stockout_M_Edit_Pkl_Rip');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedPklRipRecord', item);
                            }
                        }
                    }
                }
            }
        });
    }
})