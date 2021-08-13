Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_packinglist_Controller',
	init: function() {
        var viewModel = this.getViewModel();

        // packinglist, stockin, stockinDRec
        // var packinglist = viewModel.get('packinglist');
        // var stockin = viewModel.get('stockin');
        // var stockinDRec = viewModel.get('stockinDRec');

        // console.log(packinglist);
        // console.log(stockin);
        // console.log(stockinDRec);

        // var LotStore = viewModel.get('LotStore');
        // LotStore.getSorters().add('lotnumber');

        var PackingListStore = viewModel.get('PackingListStore');
        var stockinDRec = viewModel.get('stockinDRec');
        var pklist = stockinDRec.get('stockin_packinglist');
        if(pklist == null){
            pklist = new Array();
        }
        var pklistStoreArray = new Array();
        for(var i=0; i < pklist.length; i++){
            pklistStoreArray.push(pklist[i]);
        }
        PackingListStore.setData(pklistStoreArray); // console.log(pklistStoreArray);

        PackingListStore.getSorters().add('lotnumber');
        PackingListStore.getSorters().add('packageid');
    },
    control: {
        '#btnThoat': {
            click: 'onExit'
        }
    },
    onExit: function(){
        this.getView().up('window').close();
    },
})