Ext.define('GSmartApp.view.stockin.stockin_product.Stockin_P_Edit_Product.Stockin_P_Edit_Product_Main_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_P_Edit_Product_Main_ViewController',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockin_P_Edit_Product_Main_View': {
            afterrender: 'onAfterrender',
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect',
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },

    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var productSearchString = viewModel.get('productSearchString') == null ? null : viewModel.get('productSearchString').trim();
        if(productSearchString == null || productSearchString == ''){
            return;
        }

        var ProductStore = viewModel.getStore('ProductStore');
        ProductStore.loadStore_forStockinProductSearch(productSearchString);
    },
    // setStoreData: function(data){
    //     var spaceArr = new Array();

    //     for(var i = 0; i < data.length; i++){
    //         var spaceString = data[i].spaceString;

    //         var isNotContain = true;
    //         for(var j = 0; j < spaceArr.length; j++){
    //             if(spaceArr[j].spaceString == spaceString){
    //                 isNotContain = false;
    //                 spaceArr[j].warehouseList.push(data[i]);
    //                 break;
    //             }
    //         }

    //         if(isNotContain){
    //             var newSpaceObj = new Object();
    //             newSpaceObj.spaceString = spaceString;
    //             newSpaceObj.warehouseList = new Array();
    //             newSpaceObj.warehouseList.push(data[i]);
    //             spaceArr.push(newSpaceObj);
    //         }
    //     }

    //     return spaceArr;
    // },
    onItemclick: function(thisView, record, item, index, e, eOpts){
        console.log(record);
        return;
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
        return;
        // kiểm tra các cây vải đã nằm trong phiếu xuất khác chưa, nếu có -> thông báo
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var WarehouseStoreData = WarehouseStore.getData();
        var allRecords = (WarehouseStore.getData().getSource() || WarehouseStore.getData()).getRange();

        var listCayVaiThem = new Array();

        // var items = WarehouseStoreData.items;
        var items = allRecords;

        // console.log(items);

        var totalcay = 0;
        var totaldai = 0;
        for(var i=0; i<items.length; i++){
            var cayVai = items[i].data;
            if(cayVai.isChecked){
                totalcay++;
                totaldai+= cayVai.met == null ? 0 : cayVai.met;
                listCayVaiThem.push(cayVai);
            }
        }

        me.setLoading(true);
        // console.log(listCayVaiThem);
        var params = new Object();
        params.data = listCayVaiThem;
        params.stockoutid_link = isNaN(stockout.id) ? null : stockout.id;

        GSmartApp.Ajax.postJitin('/api/v1/warehouse/check_warehouse_in_stockout', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.respcode == 200){
                        // console.log(response);
                        if(response.message == ""){
                            m.onSelect();
                        }else{
                            var returnMessage = '';
                            var myArray = response.message.split("%seperator%");
                            for(var i = 0; i < myArray.length; i++){
                                if(myArray[i] != ''){
                                    returnMessage += myArray[i] + '<br />';
                                }
                            }
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: returnMessage,
                                buttons: Ext.MessageBox.YESNO,
                                buttonText: {
                                    yes: 'Thêm',
                                    no: 'Thoát',
                                },
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        m.onSelect();
                                    }
                                }
                            });
                        }
                    }else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại: bạn hãy kiểm tra lại kết nối mạng',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại: bạn hãy kiểm tra lại kết nối mạng',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var WarehouseStoreData = WarehouseStore.getData();
        var allRecords = (WarehouseStore.getData().getSource() || WarehouseStore.getData()).getRange();

        var listCayVaiThem = new Array();

        // var items = WarehouseStoreData.items;
        var items = allRecords;

        // console.log(items);

        var totalcay = 0;
        var totaldai = 0;
        for(var i=0; i<items.length; i++){
            var cayVai = items[i].data;
            if(cayVai.isChecked){
                totalcay++;
                totaldai+= cayVai.met == null ? 0 : cayVai.met;
                listCayVaiThem.push(cayVai);
            }
        }

        m.fireEvent('ThemCayVai', listCayVaiThem, totalcay, totaldai);
    },
    onThemMatTem: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var skuid_link = viewModel.get('skuid_link');
        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');

        var stockoutid_link = stockout.id;
        var stockoutdid_link = stockoutDRec.get('id');

        if(stockoutid_link == 0 || stockoutid_link == null){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Bạn cần phải lưu phiếu xuất kho',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if(stockoutdid_link == 0 || stockoutdid_link == null || isNaN(stockoutdid_link)){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Bạn cần phải lưu phiếu xuất kho',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var form = Ext.create('Ext.window.Window', {
            // height: '90%',
            // width: 1200,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm cây vải mất tem',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Pklist_Add_NoLabelPkl_View',
                viewModel: {
                    data: {
                        skuid_link: skuid_link,
                        stockout: stockout,
                        stockoutDRec: stockoutDRec
                    }
                }					
            }],
        });
        form.show();

        form.down('#Stockout_Pklist_Add_NoLabelPkl_View').getController().on('Thoat', function () {
            form.close();
        })

        form.down('#Stockout_Pklist_Add_NoLabelPkl_View').getController().on('themMatTem', function () {
            m.fireEvent('themMatTem');
            form.close();
        })

        // m.fireEvent('ThemCayVaiMatTem', cayVaiThem );
    }

})