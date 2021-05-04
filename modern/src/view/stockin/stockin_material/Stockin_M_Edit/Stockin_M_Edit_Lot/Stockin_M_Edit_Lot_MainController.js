Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Lot_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Lot_MainController',
	init: function () {
		
	},
    control: {
        '#btnLotEditSpace':{
            tap: 'onLotEditSpace'
        },
        '#btnLotAddSpace':{
            tap: 'onLotAddSpace'
        },
        '#Stockin_M_Edit_Lot': {
            childtap: 'onStockin_M_Edit_LotItemTap'
		},
    },
    onStockin_M_Edit_LotItemTap: function(grid, location, eOpts){
        // console.log(location);
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        if(location.record.get('space') == null) location.record.set('space', '');
        var lotSpace = location.record.get('space');
        m.setSpaceStore(lotSpace);
        viewModel.set('selectedLotRecord', location.record);
        grid.getSelectable().select(location.record);
    },
    setSpaceStore: function(lotSpace){
        // update space textfield
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var lotSpaceArr = lotSpace.split(';');
        var lotSpaceArrStore = new Array();
        for(var i = 0; i < lotSpaceArr.length; i++){
            if(lotSpaceArr[i] != null && lotSpaceArr[i] != ''){
                lotSpaceObj = new Object();
                lotSpaceObj.space = lotSpaceArr[i];
                lotSpaceArrStore.push(lotSpaceObj);
            }
        }
        //Stockin_M_Edit_Space
        me.down('#Stockin_M_Edit_Space').getStore().setData([]);
        me.down('#Stockin_M_Edit_Space').getStore().insert(0, lotSpaceArrStore);
        // console.log(lotSpaceArrStore);
        var spacesString = '';
        for(var i = 0; i < lotSpaceArrStore.length; i++){
            if(spacesString == ''){
                spacesString+=lotSpaceArrStore[i].space.split('C')[0];
                spacesString+= ' (' + lotSpaceArrStore[i].space.split('C')[1] + ')';
            }else{
                spacesString+=';'+lotSpaceArrStore[i].space.split('C')[0];
                spacesString+= ' (' + lotSpaceArrStore[i].space.split('C')[1] + ')';
            }
        }
        viewModel.set('spacesString', spacesString);
    },
    onLotEditSpace: function(){
        // popup danh sách các khoang của lot này
        // từ string space tách ra thành các record
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinid_link = viewModel.get('stockin.id');
        var unitid_link = stockin.unitid_link;

        // thông báo nếu chưa chọn lot
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        if(selectedLotRecord == null){
            Ext.toast('Chưa chọn lot', 1000);
            return;
        }

        // taọ popup và chuyền thông tin record vào
        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            title: 'Thông tin chi tiết',
            width: 300,
            height: 600,
            maxWidth: 300,
            maxHeight: 600,
            header: true,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            maskTapHandler: function(){
                // console.log('mask tapped');
                if(dialog){
                    dialog.close();
                    me.setMasked(false);
                }
            },
            bodyPadding: '1',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'Stockin_M_Edit_LotSpace_Edit',
                viewModel: {
                    data: {
                        selectedLotRecord: selectedLotRecord,
                        unitid_link: unitid_link
                    }
                }
            }],
        });
        dialog.show();

        // thông tin cũ trước update
        var oldSpace = selectedLotRecord.get('space');
        var oldLot_number = selectedLotRecord.get('lot_number');
        var oldTotalpackage = selectedLotRecord.get('totalpackage');
        var oldTotalmet = selectedLotRecord.get('totalmet');
        var oldTotalyds = selectedLotRecord.get('totalyds');
        var oldGrossweight = selectedLotRecord.get('grossweight');

        dialog.down('#Stockin_M_Edit_LotSpace_Edit').getController().on('Luu', function (newRecord) {
            // newRecord là selectedLotRecord sau khi thay đổi các giá trị
            // update lot grid, đồng thời update luôn các thuộc tính record để gửi
            m.updateLotGridRecord(newRecord);

            // lưu lot vào db qua api -> nhận obj trả về -> đẩy obj vào d/sách trên giao diện
            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang lưu'
            });

            var params = new Object();
            params.data = newRecord.data;

            GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_lot_create', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.toast('Lưu thành công', 3000);
                            var data = response.data;

                            // update textfield
                            // m.setSpaceStore(data.space);
                            var StockinLotStore = viewModel.getStore('StockinLotStore');
                            StockinLotStore.loadStore_byStockinId(stockinid_link);
                            // m.setSpaceStore(data.space);
                            // reset form
                            viewModel.set('spacesString', null);
                            viewModel.set('selectedLotRecord', null);
                            m.resetFormAddSpace();
                            dialog.close();
                            me.setMasked(false);
                            // console.log(response);
                        }
                    } else {
                        var response = Ext.decode(response.responseText);
                        Ext.toast('Lưu thất bại: ' + response.message, 3000);
                        // update lại giá trị cũ
                        newRecord.set('space', oldSpace);
                        newRecord.set('lot_number', oldLot_number);
                        newRecord.set('totalpackage', oldTotalpackage);
                        newRecord.set('totalmet', oldTotalmet);
                        newRecord.set('totalyds', oldTotalyds);
                        newRecord.set('grossweight', oldGrossweight);
                        m.updateLotGridRecord(newRecord);
                        me.setMasked(false);
                    }
            })

        });

        dialog.down('#Stockin_M_Edit_LotSpace_Edit').getController().on('Thoat', function () {
            me.setMasked(false);
            dialog.close();
        });

        // console.log(stockin);
    },
    onLotAddSpace: function(){
        // console.log(info);
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockinid_link = viewModel.get('stockin.id');

        // thông báo nếu chưa chọn lot
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        if(selectedLotRecord == null){
            Ext.toast('Chưa chọn lot', 1000);
            return;
        }

        // check thông tin
        var lotRow = viewModel.get('lotRow');
        var lotSpace = viewModel.get('lotSpace');
        var lotFloor = viewModel.get('lotFloor');
        var lotAmount = viewModel.get('lotAmount');

        if(lotRow == null || lotRow == ''){
            // Ext.toast('Chưa nhập dãy', 1000);
            // return;
            lotRow = 'x';
        }
        if(lotSpace == null || lotSpace == ''){
            // Ext.toast('Chưa nhập hàng', 1000);
            // return;
            lotSpace = 'x';
        }
        if(lotFloor == null || lotFloor == ''){
            // Ext.toast('Chưa nhập tầng', 1000);
            // return;
            lotFloor = 'x';
        }
        if(lotAmount == null || lotAmount == ''){
            lotAmount = 0;
            // return;
        }

        var spaceInfo = new Object();
        spaceInfo.lotRow = lotRow;
        spaceInfo.lotSpace = lotSpace;
        spaceInfo.lotFloor = lotFloor;
        spaceInfo.lotAmount = lotAmount;

        // D1H5T2C1
        // kiểm tra danh sách khoang đã có khoang này hay chưa
        // update thông tin thuộc tính cho lot
        var record = selectedLotRecord;
        // nếu lưu vào db fail thì set lại cho record trên giao diện
        var oldLotSpaceString = record.get('space');
        var oldStatus = record.get('status');
        var oldTotalpackagecheck  = record.get('totalpackagecheck');
        record = m.updateLotRecord(record, spaceInfo); // record.data là obj gửi lên api
        // update lot grid, đồng thời update luôn các thuộc tính record để gửi
        m.updateLotGridRecord(record);

        // lưu lot vào db qua api -> nhận obj trả về -> đẩy obj vào d/sách trên giao diện
        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang lưu'
        });

        var params = new Object();
        params.data = record.data;

        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_lot_create', Ext.JSON.encode(params),
            function (success, response, options) {
                // me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        var data = response.data;

                        // update textfield
                        // m.setSpaceStore(data.space);
                        var StockinLotStore = viewModel.getStore('StockinLotStore');
                        StockinLotStore.loadStore_byStockinId(stockinid_link);
                        // m.setSpaceStore(data.space);
                        // reset form
                        viewModel.set('spacesString', null);
                        viewModel.set('selectedLotRecord', null);
                        m.resetFormAddSpace();
                        me.setMasked(false);
                        // console.log(response);
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.toast('Lưu thất bại: ' + response.message, 3000);
                    // update lại giá trị cũ
                    record.set('space', oldLotSpaceString);
                    record.set('status', oldStatus);
                    record.set('totalpackagecheck', oldTotalpackagecheck);
                    m.updateLotGridRecord(record);
                    me.setMasked(false);
                }
        })

        // old

        // // update textfield
        // m.setSpaceStore(record.get('space'));
        // // update lot grid
        // m.updateLotGridRecord(record);
        // // reset form
        // m.resetFormAddSpace();

        // console.log(stockin);
        // console.log(selectedLotRecord);
        // console.log(oldLotSpaceString);
        // console.log(record);
    },
    resetFormAddSpace: function(){
        var m = this;
        var viewModel = this.getViewModel();
        
        viewModel.set('lotRow', null);
        viewModel.set('lotSpace', null);
        viewModel.set('lotFloor', null);
        viewModel.set('lotAmount', null);
    },
    updateLotGridRecord: function(record){
        // update số cây kiểm theo space
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');

        var space = record.get('space');
        var spaceStringArr = space.split(';'); // D1H1T1C1
        var totalpackagecheck = 0;
        for(var i=0; i<spaceStringArr.length; i++){
            if(spaceStringArr[i] != null && spaceStringArr[i] != ''){
                var lotString = spaceStringArr[i];
                totalpackagecheck += parseInt(lotString.split('C')[1]);
            }
        }
        record.set('totalpackagecheck', totalpackagecheck);
        record.set('status', 0);
        // console.log(spaceStringArr);
    },
    updateLotRecord: function(record, spaceInfo){
        // record: lot đang chọn
        // spaceInfo: lotRow, lotSpace, lotFloor, lotAmount
        var space = record.get('space') == null ? '' : record.get('space');
        var spaceInfoString = 'D' + spaceInfo.lotRow + 'H' + spaceInfo.lotSpace + 'T' + spaceInfo.lotFloor + 'C';
        var spaceStringArr = space.split(';'); // D1H1T1C1
        var isSpaceExist = false; // chưa tồn tại khoang trong danh sách khoang của lot
        
        var newLotSpaceString = '';
        for(var i = 0; i < spaceStringArr.length; i++){
            if(spaceStringArr[i].includes(spaceInfoString)){ // đã tồn tại trong danh sách khoang
                isSpaceExist = true;
                var amount = parseInt(spaceStringArr[i].split('C')[1]) + spaceInfo.lotAmount;
                spaceStringArr[i] = spaceStringArr[i].split('C')[0] + 'C' +amount;
            }
            if(newLotSpaceString == ''){
                newLotSpaceString+=spaceStringArr[i];
            }else{
                newLotSpaceString+=';' + spaceStringArr[i];
            }
        }

        if(!isSpaceExist){
            if(newLotSpaceString == ''){
                newLotSpaceString+= spaceInfoString + spaceInfo.lotAmount;
            }else{
                newLotSpaceString+= ';' + spaceInfoString + spaceInfo.lotAmount;
            }
        }
        record.set('space', newLotSpaceString);
        return record;
    },
    onmaLotFilterKeyup: function (){
        var grid = this.getView().down('#Stockin_M_Edit_Lot'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maLotFilter'),
            filters = grid.store.getFilters();

        var viewModel = this.getViewModel();
        viewModel.set('selectedLotRecord', null);
        grid.getSelectable().deselectAll();

        if (filterField.getValue()) {
            this.maLotFilter = filters.add({
                id: 'maLotFilter',
                property: 'lot_number',
                value: filterField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.maLotFilter) {
            filters.remove(this.maLotFilter);
            this.maLotFilter = null;
        }
    },
})