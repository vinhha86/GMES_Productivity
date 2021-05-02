Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_LotSpace_EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_LotSpace_EditController',
    init: function() {
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        var unitid_link = viewModel.get('unitid_link');
        var space = selectedLotRecord.get('space');

        viewModel.set('newLotSpaceString', space)
        this.setSpaceStore(space);
        this.setInfo();

        // console.log(selectedLotRecord);
        // console.log(unitid_link);

    },
    control: {
        '#btnLuu': {
            tap: 'onLuu'
        },
        '#btnThoat': {
            tap: 'onThoat'
        },
        '#Stockin_M_Edit_LotSpace_Edit_List': {
            childtap: 'onLotSpaceTap'
        },
        '#lotSpaceAmount': {
            keyup: 'onlotSpaceAmountChange',
        },
        '#totalmet': {
            keyup: 'onDoDaiChange',
        },
        '#totalyds': {
            keyup: 'onDoDaiChange',
        }
    },
    onLuu: function(){
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');

        var newLotSpaceString = viewModel.get('newLotSpaceString');
        var lot_number = viewModel.get('lot_number');
        var totalpackage = viewModel.get('totalpackage');
        var totalmet = viewModel.get('totalmet');
        var totalyds = viewModel.get('totalyds');
        var grossweight = viewModel.get('grossweight');

        // update thông tin space nếu thành công
        selectedLotRecord.set('space', newLotSpaceString);
        selectedLotRecord.set('lot_number', lot_number);
        selectedLotRecord.set('totalpackage', totalpackage);
        selectedLotRecord.set('grossweight', grossweight);
        selectedLotRecord.set('totalmet', totalmet);
        selectedLotRecord.set('totalyds', totalyds);

        // reset form
        viewModel.set('lotSpace', null);
        viewModel.set('lotSpaceAmount', null);

        // fire event
        this.fireEvent('Luu', selectedLotRecord);
        Ext.toast('Lưu thành công', 1000);
        // console.log(selectedLotRecord);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    updateSpace: function(){
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        var lotSpace = viewModel.get('lotSpace');
        var lotSpaceAmount = viewModel.get('lotSpaceAmount');

        // check form
        if(lotSpace == null){
            Ext.toast('Chưa chọn khoang', 1000);
            return;
        }
        if(lotSpaceAmount == null || lotSpaceAmount == ''){
            Ext.toast('Chưa nhập số cây', 1000);
            return;
        }

        // updateLotRecord
        var space = selectedLotRecord.get('space');
        var spaceStringArr = space.split(';'); // D1H1T1C1
        var newLotSpaceString = ''; 
        for(var i = 0; i < spaceStringArr.length; i++){
            if(spaceStringArr[i].includes(lotSpace+'C')){
                spaceStringArr[i] = lotSpace + 'C' + lotSpaceAmount;
            }
            if(newLotSpaceString == ''){
                newLotSpaceString+=spaceStringArr[i];
            }else{
                newLotSpaceString+=';' + spaceStringArr[i];
            }
        }
        selectedLotRecord.set('space', newLotSpaceString);

        // update grid
        this.setSpaceStore(newLotSpaceString);
    },
    setInfo: function(){
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');

        var lot_number = selectedLotRecord.get('lot_number') == null ? '' : selectedLotRecord.get('lot_number').toUpperCase();
        var totalpackage = selectedLotRecord.get('totalpackage') == null ? 0 : selectedLotRecord.get('totalpackage');
        var totalyds = selectedLotRecord.get('totalyds') == null ? 0 : selectedLotRecord.get('totalyds');
        var totalmet = selectedLotRecord.get('totalmet') == null ? 0 : selectedLotRecord.get('totalmet');
        var grossweight = selectedLotRecord.get('grossweight') == null ? 0 : selectedLotRecord.get('grossweight');

        viewModel.set('lot_number', lot_number);
        viewModel.set('totalpackage', totalpackage);
        viewModel.set('totalyds', totalyds);
        viewModel.set('totalmet', totalmet);
        viewModel.set('grossweight', grossweight);
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
        //Stockin_M_Edit_LotSpace_Edit_List
        viewModel.set('spaces',lotSpaceArrStore);
        if(me.down('#Stockin_M_Edit_LotSpace_Edit_List').getStore()){
            me.down('#Stockin_M_Edit_LotSpace_Edit_List').getStore().setData([]);
            me.down('#Stockin_M_Edit_LotSpace_Edit_List').getStore().insert(0, lotSpaceArrStore);
        }
    },
    resetSpaceForm: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        viewModel.set('lotSpace', null);
        viewModel.set('lotSpaceAmount', null);
    },
    onLotSpaceTap:function(grid, location, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var record = location.record;

        var lotSpaceAmount = parseInt(record.get('space').split('C')[1]);
        var lotSpace = record.get('space').split('C')[0];

        viewModel.set('lotSpaceAmount', lotSpaceAmount);
        viewModel.set('lotSpace', lotSpace);

        // console.log(lotSpace);
        // console.log(lotSpaceAmount);
    },
    onLotSpaceDelete: function(grid, info){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        var newLotSpaceString = viewModel.get('newLotSpaceString');

        // updateLotRecord
        // var space = selectedLotRecord.get('space');
        var space = newLotSpaceString;
        var spaceStringArr = space.split(';'); // D1H1T1C1
        var newLotSpaceString = ''; 
        for(var i = 0; i < spaceStringArr.length; i++){
            if(!spaceStringArr[i].includes(info.record.get('space'))){
                if(newLotSpaceString == ''){
                    newLotSpaceString+=spaceStringArr[i];
                }else{
                    newLotSpaceString+=';' + spaceStringArr[i];
                }
            }
        }
        // selectedLotRecord.set('space', newLotSpaceString);
        viewModel.set('newLotSpaceString', newLotSpaceString);

        // update grid
        this.setSpaceStore(newLotSpaceString);
        this.resetSpaceForm();
        // fire event
        this.fireEvent('Delete', selectedLotRecord);
        Ext.toast('Xoá thành công', 1000);
        // console.log(spaceRecord);
        // console.log(selectedLotRecord);
    },
    onlotSpaceAmountChange: function(numberfield, e, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        var lotSpace = viewModel.get('lotSpace');
        var lotSpaceAmount = viewModel.get('lotSpaceAmount');
        var newLotSpaceString = viewModel.get('newLotSpaceString');

        if(lotSpace == null){
            return;
        }

        // updateLotRecord
        // var space = selectedLotRecord.get('space');
        var space = newLotSpaceString;
        var spaceStringArr = space.split(';'); // D1H1T1C1
        var newLotSpaceString = ''; 
        for(var i = 0; i < spaceStringArr.length; i++){
            if(spaceStringArr[i].includes(lotSpace+'C')){
                spaceStringArr[i] = lotSpace + 'C' + lotSpaceAmount;
            }
            if(newLotSpaceString == ''){
                newLotSpaceString+=spaceStringArr[i];
            }else{
                newLotSpaceString+=';' + spaceStringArr[i];
            }
        }
        // selectedLotRecord.set('space', newLotSpaceString);
        viewModel.set('newLotSpaceString', newLotSpaceString)

        // update grid
        this.setSpaceStore(newLotSpaceString);
        // console.log(selectedLotRecord);
    },
    onDoDaiChange: function(numberfield, e, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var totalmet = viewModel.get('totalmet');
        var totalyds = viewModel.get('totalyds');

        var itemId = numberfield.getItemId();
        if(itemId == 'totalmet'){
            if(totalmet == null) totalmet = 0;
            totalyds = totalmet / 0.9144;
            totalyds = parseFloat(Ext.util.Format.number(totalyds, '0.00'));
        }
        if(itemId == 'totalyds'){
            if(totalyds == null) totalyds = 0;
            totalmet = totalyds * 0.9144;
            totalmet = parseFloat(Ext.util.Format.number(totalmet, '0.00'));
        }

        viewModel.set('totalmet', totalmet);
        viewModel.set('totalyds', totalyds);
    }
});
