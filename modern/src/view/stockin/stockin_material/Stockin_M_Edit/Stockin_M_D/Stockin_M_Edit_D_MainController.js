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
		viewModel.set('selectedDRecord', record);

        this.setComboLot();
        this.setComboPkl();
        this.setComboPklRecheck();
    },
    setComboLot: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('lot_stockindId', selectedDRecord.get('id'));
    },
    setComboPkl: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('pkl_stockindId', selectedDRecord.get('id'));
    },
    setComboPklRecheck: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('pklRecheck_stockindId', selectedDRecord.get('id'));
    },
	onAddLot: function(){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		var stockin = viewModel.get('stockin');
        var stockin_lot = viewModel.get('stockin.stockin_lot');
		var selectedDRecord = viewModel.get('selectedDRecord');
        var stockinid_link = viewModel.get('stockin.id');

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
        newLotObj.skucode = selectedDRecord.get('skucode');
        newLotObj.stockindid_link = selectedDRecord.get('id');
        

        // thêm sl yêu cầu
        if(stockin.unitid_link == 3){
            var ydsorigin = parseFloat(yNumberTxt);
            var met_origin =  parseFloat(Ext.util.Format.number(ydsorigin * 0.9144, '0.00'));
            newLotObj.totalyds = ydsorigin;
            newLotObj.totalmet = met_origin;
        }
        if(stockin.unitid_link == 1){
            var met_origin = parseFloat(yNumberTxt);
            var ydsorigin =  parseFloat(Ext.util.Format.number(met_origin / 0.9144, '0.00'));
            newLotObj.totalyds = ydsorigin;
            newLotObj.totalmet = met_origin;
        }

        // lưu lot vào db qua api -> nhận obj trả về -> đẩy obj vào d/sách trên giao diện
        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });

        var params = new Object();
        params.data = newLotObj;

        GSmartApp.Ajax.postJitin('/api/v1/stockin_lot/stockin_lot_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(response.message == 'Số lot đã tồn tại'){
                            Ext.toast(response.message, 3000);
                        }else{
                            Ext.toast('Lưu thành công', 3000);
                            var data = response.data;
                            // reload obj stockin để làm mới danh sách lot
                            var Stockin_M_Edit = Ext.getCmp('Stockin_M_Edit');
                            Stockin_M_Edit.getController().getInfo(stockin.id);

                            // reload view
                            m.reloadStore();
                            // reset form
                            m.resetFormAddLot();
                        }
                        // console.log(response);
                    } else{
                        Ext.toast('Lưu thất bại: ' + response.message, 3000);
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
    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');
        var selectedDRecord = viewModel.get('selectedDRecord');

        var Stockin_d_Store = viewModel.getStore('Stockin_d_Store');
        Stockin_d_Store.loadStore_byStockinId_async(stockinid_link);
        Stockin_d_Store.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    if(selectedDRecord != null){
                        var storeItems = Stockin_d_Store.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == selectedDRecord.get('id')){
                                var grid = m.getView().down('#Stockin_M_Edit_D');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedDRecord', item);
                                viewModel.set('lot_stockindId', item.get('id'));
                                viewModel.set('pkl_stockindId', item.get('id'));
                                viewModel.set('pklRecheck_stockindId', item.get('id'));
                            }
                        }
                    }
                }
            }
        });
    }
})