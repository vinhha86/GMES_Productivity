Ext.define('GSmartApp.view.stockout.Stockout_packinglist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_packinglist_Controller',
	init: function() {
        var viewModel = this.getViewModel();

        // packinglist, stockin, stockinDRec
        // var packinglist = viewModel.get('packinglist');
        // var stockin = viewModel.get('stockin');
        // var stockinDRec = viewModel.get('stockinDRec');

        // console.log(packinglist);
        // console.log(stockin);
        // console.log(stockinDRec);

        var LotStore = viewModel.get('LotStore');
        LotStore.getSorters().add('lotnumber');

        var PackingListStore = viewModel.get('PackingListStore');
        PackingListStore.getSorters().add('packageid');

        this.setLotStore();
    },
    control: {
        '#btnThoat': {
            click: 'onExit'
        }
    },
    onExit: function(){
        this.getView().up('window').close();
    },
    setLotStore: function(){
        var viewModel = this.getViewModel();

        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');

        var lotStoreArray = new Array();

        var pklist = stockoutDRec.get('stockout_packinglist');

        // loop qua pklist de tao danh sach lot, size
        if(pklist != null){
            for(var i=0; i<pklist.length; i++){
                // console.log(pklist[i]);
                var pkl = pklist[i];
                var lotnumber = pkl.lotnumber;

                var LotStore = viewModel.getStore('LotStore');

                var found = lotStoreArray.some(item => item.lotnumber === lotnumber);
                if(!found){
                    var data = new Object();
                    data.lotnumber = lotnumber;
                    lotStoreArray.push(data);
                }
                LotStore.setData(lotStoreArray);
            }
        }
    }
})