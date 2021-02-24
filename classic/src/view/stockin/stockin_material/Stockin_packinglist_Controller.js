Ext.define('GSmartApp.view.stockin.Stockin_packinglist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_packinglist_Controller',
	init: function() {
        var viewModel = this.getViewModel();

        // packinglist, stockin, stockinDRec
        var packinglist = viewModel.get('packinglist');
        var stockin = viewModel.get('stockin');
        var stockinDRec = viewModel.get('stockinDRec');

        // console.log(packinglist);
        // console.log(stockin);
        // console.log(stockinDRec);

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

        var stockin = viewModel.get('stockin');
        var stockinDRec = viewModel.get('stockinDRec');

        var lotStoreArray = new Array();

        var pklist = stockinDRec.get('stockin_packinglist');

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