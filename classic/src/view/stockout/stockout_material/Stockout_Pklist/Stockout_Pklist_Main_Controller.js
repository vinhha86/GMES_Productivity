Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Pklist_Main_Controller',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_Pklist_Main': {
            afterrender: 'onAfterrender',
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    // onSelect: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
    //     var select = me.getSelectionModel().getSelection();
    //     if (select.length == 0) {
    //         Ext.Msg.show({
    //             title: "Thông báo",
    //             msg: "Phải chọn một đơn hàng",
    //             buttons: Ext.MessageBox.YES,
    //             buttonText: {
    //                 yes: 'Đóng',
    //             }
    //         });
    //         return;
    //     }
    //     this.fireEvent("ThemDonHang", select);
    //     // this.onThoat();
    // },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var skuid_link = viewModel.get('skuid_link');
        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');

        var pcontractid_link = stockout.pcontractid_link;
        var orgid_from_link = stockout.orgid_from_link;
        if(orgid_from_link == null){
            return;
        }

        var mainView = Ext.getCmp('Stockout_Pklist_Main');
        if(mainView) mainView.setLoading(true);

        var params = new Object();
        params.stockid_link = orgid_from_link ;
        params.skuid_link = skuid_link ;
        params.pcontractid_link = pcontractid_link ;

        GSmartApp.Ajax.postJitin('/api/v1/warehouse/getMaterialListBySku',Ext.JSON.encode(params),
		function(success,response,options ) {
            if(mainView) mainView.setLoading(false);
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
				// console.log(response);
                var data = response.data;
                var storeData = new Array();
                storeData = m.setStoreData(data);

                viewModel.set('storeData', storeData);

                var StockStore = viewModel.getStore('StockStore');
                StockStore.insert(0, storeData);
                StockStore.getSorters().add({
                    property: 'spaceString',
                    direction: 'ASC'
                });
                
                // console.log(storeData);
            }
		})
    },
    setStoreData: function(data){
        var spaceArr = new Array();

        for(var i = 0; i < data.length; i++){
            var spaceString = data[i].spaceString;

            var isNotContain = true;
            for(var j = 0; j < spaceArr.length; j++){
                if(spaceArr[j].spaceString == spaceString){
                    isNotContain = false;
                    spaceArr[j].warehouseList.push(data[i]);
                    break;
                }
            }

            if(isNotContain){
                var newSpaceObj = new Object();
                newSpaceObj.spaceString = spaceString;
                newSpaceObj.warehouseList = new Array();
                newSpaceObj.warehouseList.push(data[i]);
                spaceArr.push(newSpaceObj);
            }
        }

        return spaceArr;
    },
    onItemclick: function(thisView, record, item, index, e, eOpts){
        // console.log(record);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pcontractid_link = record.get('id');
        var productid_link = viewModel.get('productid_link');
        viewModel.set('pcontractid_link', pcontractid_link);

        var StockoutD_Store = viewModel.getStore('StockoutD_Store');

        var mainView = Ext.getCmp('Stockout_Pcontract_Main_View');
        if(mainView) mainView.setLoading(true);

        var params = new Object();
        params.pcontractid_link = pcontractid_link ;
        params.productid_link = productid_link ;
        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/getbom_by_product_multithread',Ext.JSON.encode(params),
		function(success,response,options ) {
            if(mainView) mainView.setLoading(false);
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
				// console.log(response.data);
                var dataMaterial = new Array();
                for(var i = 0; i < response.data.length; i++){
                    var product_type = response.data[i].product_type;
                    if(product_type == '20'){
                        var isNotContain = true;
                        for(var j = 0; j < dataMaterial.length; j++){
                            if(dataMaterial[j].materialid_link == response.data[i].materialid_link){
                                isNotContain = false;
                            }
                        }
                        if(isNotContain){
                            dataMaterial.push(response.data[i]);
                        }
                    }
                }
                StockoutD_Store.removeAll();
                StockoutD_Store.insert(0, dataMaterial);
            }
		})
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var StockStore = viewModel.getStore('StockStore');
        var StockStoreData = StockStore.getData();

        var listCayVaiThem = new Array();

        var items = StockStoreData.items;
        var totalcay = 0;
        var totaldai = 0;
        for(var i=0; i<items.length; i++){
            var khoang = items[i]; console.log(khoang);
            var warehouseList = khoang.get('warehouseList');
            for(var j=0;j< warehouseList.length; j++){
                if(warehouseList[j].isChecked){
                    warehouseList[j].spaceString = khoang.get('spaceString');
                    totalcay++;
                    totaldai+= warehouseList[j].met == null ? 0 : warehouseList[j].met;
                    listCayVaiThem.push(warehouseList[j]);
                }
            }
        }

        m.fireEvent('ThemCayVai', listCayVaiThem, totalcay, totaldai);
    },
})