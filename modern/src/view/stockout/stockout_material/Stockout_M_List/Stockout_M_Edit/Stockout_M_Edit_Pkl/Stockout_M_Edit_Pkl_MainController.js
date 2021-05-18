Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_M_List.Stockout_M_Edit.Stockout_M_Edit_Pkl.Stockout_M_Edit_Pkl_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_M_Edit_Pkl_MainController',
    channelPrint: { cmd: null, dta: null },
	init: function () {
		
	},
    control: {
        // '#btnResetForm':{
        //     tap: 'onbtnResetForm'
        // },
        // '#btnCheck':{
        //     tap: 'onCheck'
        // },
        // '#btnPrintPkl':{
        //     tap: 'onPrintPkl'
        // },
        // '#btnDeletePkl':{
        //     tap: 'onDeletePkl'
        // },
        '#Stockout_M_Edit_Pkl':{
            childtap: 'onItemPklTap'
        },
        '#cbbox_pkl_stockoutdId':{
            change: 'oncbbox_pkl_stockoutdId_change'
        }
    },
    oncbbox_pkl_stockoutdId_change: function(cbbox, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        // var pkl_stockoutdId = viewModel.get('pkl_stockoutdId');
        if(newValue != null && newValue != ''){
            var stockout_pklist = viewModel.getStore('stockout_pklist');
            stockout_pklist.loadstore_ByStockoutDId(newValue);

            viewModel.set('pklRip_stockoutdId', newValue);

            if(cbbox.getSelection() != null){
                viewModel.set('selectedDRecord', cbbox.getSelection());
            }
        }
    },
    onmaPklFilterKeyup: function (){
        var grid = this.getView().down('#Stockout_M_Edit_Pkl'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maPklFilter'),
            store = grid.store,
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        grid.getSelectable().deselectAll();
        viewModel.set('selectedPklRecord', null);
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
        var myview = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        
        // viewModel.set('lotnumberTxt', '');
        viewModel.set('packageidTxt', '');
        viewModel.set('yTxt', '');
        viewModel.set('mTxt', '');
        viewModel.set('yOriginTxt', '');
        viewModel.set('mOriginTxt', '');
        // viewModel.set('colorTxt', stockoutD.colorid_link);
        // viewModel.set('widthTxt', '');
        viewModel.set('grossweightTxt', '');
        viewModel.set('grossweightCheckTxt', '');
        viewModel.set('sampleCheckTxt', '');
        viewModel.set('widthYdsCheckTxt', '');
        viewModel.set('widthYdsTxt', '');
        viewModel.set('widthMetCheckTxt', '');
        viewModel.set('widthMetTxt', '');

        viewModel.set('pklSpaceTxt', null);
        viewModel.set('pklFloorTxt', null);
        // m.getView().down('#packageidTxt').focus();

        myview.setMasked(false);
    },
    onItemPklTap: function(list, location, eOpts ){
        var m = this;
        var viewModel = this.getViewModel();

        var record = location.record;
        viewModel.set('selectedPklRecord',record); console.log(record);
        
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

        // set khoang info cho pkl
        var spaceepc_link = record.get('spaceepc_link') == null ? '' : record.get('spaceepc_link').toUpperCase();
        if(spaceepc_link != ''){ // D-1|H-2|T-3|
            // var spaceepc_linkArr = spaceepc_link.split('|');
            // var pklFloorTxt = spaceepc_linkArr[1]; if(pklFloorTxt == 'x') pklFloorTxt = null;
            // viewModel.set('pklFloorTxt', pklFloorTxt);
            // spaceepc_linkArr = spaceepc_linkArr[0].split('H');
            // var pklSpaceTxt = spaceepc_linkArr[1]; if(pklSpaceTxt == 'x') pklSpaceTxt = null;
            // viewModel.set('pklSpaceTxt', pklSpaceTxt);
            // spaceepc_linkArr = spaceepc_linkArr[0].split('D');
            // var pklRowTxt = spaceepc_linkArr[1]; if(pklRowTxt == 'x') pklRowTxt = null;
            // viewModel.set('pklRowTxt', pklRowTxt);
            
            var spaceepc_linkArr = spaceepc_link.split('|');
            var row = spaceepc_linkArr[0].substring(2); //console.log(row);
            if(row == 'x' || row == 'X') row = null; 
            var space = spaceepc_linkArr[1].substring(2); //console.log(space);
            if(space == 'x' || space == 'X') space = null;
            var floor = spaceepc_linkArr[2].substring(2); //console.log(floor);
            if(floor == 'x' || floor == 'X') floor = null;
            viewModel.set('pklRowTxt', row);
            viewModel.set('pklSpaceTxt', space);
            viewModel.set('pklFloorTxt', floor);

            // console.log(pklRowTxt);
            // console.log(pklSpaceTxt);
            // console.log(pklFloorTxt);
        }else{
            viewModel.set('pklFloorTxt', null);
            viewModel.set('pklSpaceTxt', null);
            viewModel.set('pklRowTxt', null);
        }
        // console.log(spaceepc_link);  
    },
    onPrintPkl: function () {
        console.log('onPrintPkl cliked');
        // popup here
    },
    onDeletePkl: function () {
        var m = this;
        var viewModel = this.getViewModel();

        var selectedPklRecord = viewModel.get('selectedPklRecord');
        if(selectedPklRecord == null || isNaN(selectedPklRecord.get('id'))){
            Ext.toast('Cần chọn cây vải', 3000);
            return;
        }

        var msgWindow = Ext.Msg.show({
            title: 'Thông báo',
            message: 'Bạn có chắc chắn xoá?',
            width: 300,
            closable: false,
            buttons: [{
                text: 'Thoát',
                itemId: 'no'
            }, {
                text: 'Xoá',
                itemId: 'yes'
            }],
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if(buttonValue == 'no'){
                    if(msgWindow){
                        msgWindow.hide();
                    }
                }
                if(buttonValue == 'yes'){
                    m.deletePkl();
                }
            },
            icon: Ext.Msg.QUESTION
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
        GSmartApp.Ajax.postJitin('/api/v1/stockout_pklist/pklist_delete', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                myview.setMasked(false);
                if (success) {
                    Ext.toast('Xoá thành công', 3000);
                    viewModel.set('selectedPklRecord', null);
                    m.reloadStore();
                    m.resetForm();
                    myview.down('#packageidTxt').focus();

                } else {
                    Ext.toast('Lỗi xoá pkl: ' + response.message, 3000);
                }
        })        
    },
    onCheck: function(){
        console.log('onCheck cliked');
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
        // var me = this.getView();
        // var m = this;
        // var viewModel = this.getViewModel();

        // var mTxt = viewModel.get('mTxt');
        // var mOriginTxt = viewModel.get('mOriginTxt');
        // if(mOriginTxt == null || mOriginTxt == ''){
        //     viewModel.set('mOriginTxt', mTxt);
        // }
    },
    onyTxtFocusleave: function(textfield, event, eOpts){
        // var me = this.getView();
        // var m = this;
        // var viewModel = this.getViewModel();

        // var yTxt = viewModel.get('yTxt');
        // var yOriginTxt = viewModel.get('yOriginTxt');
        // if(yOriginTxt == null || yOriginTxt == ''){
        //     viewModel.set('yOriginTxt', yTxt);
        // }
    },
    oncanCheckTxtFocusleave: function(textfield, event, eOpts){
        // var me = this.getView();
        // var m = this;
        // var viewModel = this.getViewModel();

        // var grossweightCheckTxt = viewModel.get('grossweightCheckTxt');
        // var grossweightTxt = viewModel.get('grossweightTxt');
        // if(grossweightTxt == null || grossweightTxt == ''){
        //     viewModel.set('grossweightTxt', grossweightCheckTxt);
        // }
    },
    onwidthYdsCheckTxtFocusleave: function(textfield, event, eOpts){
        // var me = this.getView();
        // var m = this;
        // var viewModel = this.getViewModel();

        // var widthYdsCheckTxt = viewModel.get('widthYdsCheckTxt');
        // var widthYdsTxt = viewModel.get('widthYdsTxt');
        // if(widthYdsTxt == null || widthYdsTxt == ''){
        //     viewModel.set('widthYdsTxt', widthYdsCheckTxt);
        // }
    },
    onwidthMetCheckTxtFocusleave: function(textfield, event, eOpts){
        // var me = this.getView();
        // var m = this;
        // var viewModel = this.getViewModel();

        // var widthMetCheckTxt = viewModel.get('widthMetCheckTxt');
        // var widthMetTxt = viewModel.get('widthMetTxt');
        // if(widthMetTxt == null || widthMetTxt == ''){
        //     viewModel.set('widthMetTxt', widthMetCheckTxt);
        // }
    },

    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutid_link = viewModel.get('stockout.id');
        var pkl_stockoutdId = viewModel.get('pkl_stockoutdId');
        var selectedPklRecord = viewModel.get('selectedPklRecord');

        var stockout_pklist = viewModel.getStore('stockout_pklist');
        stockout_pklist.loadstore_ByStockoutDId_async(pkl_stockoutdId);
        stockout_pklist.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    if(selectedPklRecord != null){
                        var stockoutpklid_link = selectedPklRecord.get('id');
                        var storeItems = stockout_pklist.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == stockoutpklid_link){
                                var grid = m.getView().down('#Stockout_M_Edit_Pkl');
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