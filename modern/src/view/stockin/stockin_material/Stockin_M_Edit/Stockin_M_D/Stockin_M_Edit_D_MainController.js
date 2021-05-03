Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_D_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_D_MainController',
	init: function () {
		
	},
	control: {
        '#btnAddLot':{
            tap: 'onAddLot'
        },
        '#Stockin_M_Edit_D': {
			// itemtap: 'onItemTap',
            itemsingletap: 'onStockin_M_Edit_DItemTap'
		},
	},
	onStockin_M_Edit_DItemTap: function(dataView, index, target, record, e, eOpts){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();

		var Stockin_M_Edit_Pkl_Main = Ext.getCmp('Stockin_M_Edit_Pkl_Main');
		var Stockin_M_Edit_Pkl_Recheck_Main = Ext.getCmp('Stockin_M_Edit_Pkl_Recheck_Main');

		viewModel.set('selectedDRecord', record);
		// thêm filter mã vải cho pkl và pkl_recheck
		viewModel.set('maPklFilterByMaVai', record.get('skucode'));
		viewModel.set('maPklRecheckFilterByMaVai', record.get('skucode'));

		Stockin_M_Edit_Pkl_Main.getController().onmaPklFilterKeyup();
		Stockin_M_Edit_Pkl_Recheck_Main.getController().onmaPklRecheckFilterKeyup();
    },
	onAddLot: function(){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
        var stockin_lot = viewModel.get('stockin.stockin_lot');
		var selectedDRecord = viewModel.get('selectedDRecord');

        if(selectedDRecord == null){ // chưa chọn vải
            Ext.toast('Chưa chọn mã vải', 1000);
            return;
        }

        var lotNumberTxt = viewModel.get('lotNumberTxt');
        var cayNumberTxt = viewModel.get('cayNumberTxt');
        var yNumberTxt = viewModel.get('yNumberTxt');
        var canNumberTxt = viewModel.get('canNumberTxt');

        // check form info
        if(lotNumberTxt == '') {Ext.toast('Chưa nhập lot', 1000); return;}
        if(cayNumberTxt == '') {Ext.toast('Chưa nhập số cây', 1000); return;}
        if(yNumberTxt == '') {Ext.toast('Chưa nhập số Y', 1000); return;}
        if(canNumberTxt == '') {Ext.toast('Chưa nhập số cân nặng', 1000); return;}

        // check stockin_lot
        for(var i = 0; i < stockin_lot.length; i++){
            var stockin_lotRec = stockin_lot[i];
            if(stockin_lotRec.lot_number.toUpperCase() == lotNumberTxt.toUpperCase() && stockin_lotRec.materialid_link == selectedDRecord.get('skuid_link')){
                // lot cho sku đã tồn tại, ko Thêm
                Ext.toast('Đã tồn tại lot của mã vải', 1000);
                return;
            }
        }

        // thêm vào stockin_lot
        var newLotObj = new Object();
        newLotObj.stockinid_link = stockin.id;
        newLotObj.lot_number = lotNumberTxt;
        newLotObj.totalpackage = cayNumberTxt;
        newLotObj.totalpackagecheck = 0;
        newLotObj.grossweight = canNumberTxt;
        newLotObj.grossweight_check = 0;
        newLotObj.totalydscheck = 0;
        newLotObj.totalmetcheck = 0;
        newLotObj.totalpackagepklist = 0;
        newLotObj.space = '';
        newLotObj.status = -1;
        newLotObj.materialid_link = selectedDRecord.get('skuid_link');
        

        // thêm sl yêu cầu
        if(stockin.unitid_link == 3){
            var ydsorigin = parseFloat(yNumberTxt);
            var met_origin = ydsorigin * 0.9144;
            newLotObj.totalyds = ydsorigin;
            newLotObj.totalmet = met_origin;
        }
        if(stockin.unitid_link == 1){
            var met_origin = parseFloat(yNumberTxt);
            var ydsorigin = met_origin / 0.9144;
            newLotObj.totalyds = ydsorigin;
            newLotObj.totalmet = met_origin;
        }

        // lưu lot vào db qua api -> nhận obj trả về -> đẩy obj vào d/sách trên giao diện

        var params = new Object();
        params.data = newLotObj;

        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_lot_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        var data = response.data;

                        // thêm obj vào d/sách lot
                        stockin_lot.push(data);
                        viewModel.set('stockin.stockin_lot', stockin_lot);
                        Ext.getCmp('Stockin_M_Edit_Lot_Main').down('#Stockin_M_Edit_Lot').getStore().insert(0, data);

                        // update dataview d/sách vải
                        var stockinDLot = selectedDRecord.get('stockinDLot');
                        if(stockinDLot == ''){
                            stockinDLot+=lotNumberTxt.toUpperCase()+' '+cayNumberTxt;
                        }else{
                            stockinDLot+= '; ' + lotNumberTxt.toUpperCase()+' ('+cayNumberTxt+')';
                        }
                        selectedDRecord.set('stockinDLot', stockinDLot);

                        // reset form
                        m.resetFormAddLot();
                        // console.log(response);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 3000);
                }
        })

        // old
        // stockin_lot.push(newLotObj);
        // viewModel.set('stockin.stockin_lot', stockin_lot);
        // me.down('#Stockin_M_Edit_Lot').getStore().insert(0, newLotObj);

        // update dataview d/sách vải
        // var stockinDLot = selectedDRecord.get('stockinDLot');
        // if(stockinDLot == ''){
        //     stockinDLot+=lotNumberTxt.toUpperCase()+' '+cayNumberTxt;
        // }else{
        //     stockinDLot+= '; ' + lotNumberTxt.toUpperCase()+' '+cayNumberTxt;
        // }
        // selectedDRecord.set('stockinDLot', stockinDLot);

        // reset form
        // m.resetFormAddLot();

        // log result
        // console.log(stockin);
        // console.log(selectedDRecord);
        // m.onSave();
    },
	resetFormAddLot: function(){
        var m = this;
        var viewModel = this.getViewModel();

        viewModel.set('lotNumberTxt', '');
        viewModel.set('cayNumberTxt', '');
        viewModel.set('yNumberTxt', '');
        viewModel.set('canNumberTxt', '');
    },
	onmaNPLFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_D'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maNPLFilter'),
            filters = grid.store.getFilters();
        
        var viewModel = this.getViewModel();
        viewModel.set('selectedDRecord', null);
        grid.getSelectable().deselectAll();

        if (filterField.getValue()) {
            this.maNPLFilter = filters.add({
                id: 'maNPLFilter',
                property: 'skucode',
                value: filterField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.maNPLFilter) {
            filters.remove(this.maNPLFilter);
            this.maNPLFilter = null;
        }
    },
	onlotNumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        viewModel.set('lotNumberTxt', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
})