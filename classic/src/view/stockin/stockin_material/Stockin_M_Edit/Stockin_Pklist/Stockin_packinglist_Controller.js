Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_packinglist_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        // this.setPklData(); // old
        this.loadPklGroupedData(); // new
    },
    control: {
        '#btnThoat': {
            click: 'onExit'
        }
    },
    onExit: function(){
        this.getView().up('window').close();
    },
    setPklData: function(){
        var viewModel = this.getViewModel();
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
    loadPklGroupedData: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinDRec = viewModel.get('stockinDRec');

        var PackingListStore = viewModel.get('PackingListStore');

        // console.log(stockin);
        // console.log(stockinDRec);
        if(isNaN(stockinDRec.get('id'))){
            return;
        }

        var stockinid_link = stockin.id;
        var stockindid_link = stockinDRec.get('id')

        var params = new Object();
		params.stockinid_link = stockinid_link;
		params.stockindid_link = stockindid_link;

        me.setLoading(true);

		GSmartApp.Ajax.postJitin('/api/v1/stockin_pklist/getbyStockinID_StockinDID', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				if (success) {
					if (response.respcode == 200) {
                        m.setPklGroupedData(response.data);
					} else {
                        me.setLoading(false);
						Ext.Msg.show({
							title: 'Thông báo',
							msg: "Lấy thông tin thất bại",
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				} else {
                    me.setLoading(false);
					Ext.Msg.show({
						title: 'Thông báo',
						msg: "Lấy thông tin thất bại, xin kiểm tra kết nối mạng",
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}

			})
    },
    setPklGroupedData: function(data){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinDRec = viewModel.get('stockinDRec');
        var PackingListStore = viewModel.get('PackingListStore');

        // d
        for(var i=0; i<data.length; i++) {
            var stockind = data[i];
            var stockin_lotArr = stockind.stockin_lot;
            var stockin_packinglistArr = stockind.stockin_packinglist;

            // lot
            for(var j=0; j<stockin_lotArr.length; j++){
                var stockin_lot = stockin_lotArr[j];
                stockin_lot.stockin_packinglist = new Array();
                //pkl
                for(var k=0; k<stockin_packinglistArr.length; k++){
                    var stockin_packinglist = stockin_packinglistArr[k];
                    if(stockin_packinglist.lotnumber == stockin_lot.lot_number){
                        stockin_lot.stockin_packinglist.push(stockin_packinglist);
                    }
                }
                stockin_lot.stockin_packinglist.sort(
                    function(a, b){
                        return a.packageid - b.packageid;
                    }
                );
            }
            stockind.stockin_lot.sort(
                function(a, b){
                    if(a.lot_number < b.lot_number){
                        return -1;
                    }
                    if(a.lot_number > b.lot_number){
                        return 1;
                    }
                    return
                }
            );
        }

        // console.log(data); 
        var stockind = data[0];
        if(stockind.stockin_lot != null) {
            // console.log(stockind.stockin_lot); 
            PackingListStore.setData(stockind.stockin_lot);
        }

        // PackingListStore.insert(0, data);
        // PackingListStore.setData(data);
        me.setLoading(false);
    }
})