Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_LotSpace_EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_LotSpace_EditController',
    init: function() {
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        var unitid_link = viewModel.get('unitid_link');
        var space = selectedLotRecord.get('space');
        this.setSpaceStore(space);
        this.setInfo();

        console.log(selectedLotRecord);
        console.log(unitid_link);

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
        }
    },
    onLuu: function(){
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        var lotSpace = viewModel.get('lotSpace');
        var lotSpaceAmount = viewModel.get('lotSpaceAmount');

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

        var lot_number = selectedLotRecord.get('lot_number').toUpperCase();
        var totalpackage = selectedLotRecord.get('totalpackage');
        var totalyds = selectedLotRecord.get('totalyds');
        var totalmet = selectedLotRecord.get('totalmet');
        var grossweight = selectedLotRecord.get('grossweight');

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
        var spaceRecord = info.record;

        // updateLotRecord
        var space = selectedLotRecord.get('space');
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
        selectedLotRecord.set('space', newLotSpaceString);
        // update grid
        this.setSpaceStore(newLotSpaceString);
        // fire event
        this.fireEvent('Delete', selectedLotRecord);
        Ext.toast('Xoá thành công', 1000);
        // console.log(spaceRecord);
        // console.log(selectedLotRecord);
    }
});
