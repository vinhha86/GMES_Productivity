Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_LotSpace_EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_LotSpace_EditController',
    init: function() {
        var viewModel = this.getViewModel();
        var selectedLotRecord = viewModel.get('selectedLotRecord');
        var space = selectedLotRecord.get('space');
        this.setSpaceStore(space);
        console.log(selectedLotRecord);
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
        // var totalpackagecheck = viewModel.get('totalpackagecheck');
        this.fireEvent('Luu');
    },
    onThoat: function(){
        this.fireEvent('Thoat');
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

        console.log(lotSpace);
        console.log(lotSpaceAmount);
    },
    onLotSpaceDelete: function(grid, info){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(info.record);
    }
});
