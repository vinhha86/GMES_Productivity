Ext.define('GSmartApp.view.stockout.Stockout_packinglist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_packinglist_Controller',
	init: function() {
        var viewModel = this.getViewModel();

        // var PackingListStore = viewModel.get('PackingListStore');
        // var stockoutDRec = viewModel.get('stockoutDRec');
        // console.log(stockoutDRec);
        // var pklist = stockoutDRec.get('stockout_packinglist');
        // if(pklist == null){
        //     pklist = new Array();
        // }
        // var pklistStoreArray = new Array();
        // for(var i=0; i < pklist.length; i++){
        //     pklistStoreArray.push(pklist[i]);
        // }
        // PackingListStore.setData(pklistStoreArray);

        // PackingListStore.getSorters().add('lotnumber');
        // PackingListStore.getSorters().add('packageid');

        //Lay danh sach hang ton trong warehouse
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var pcontractid_link = viewModel.get('stockout.pcontractid_link');
        var stockid_link = viewModel.get('stockout.orgid_from_link');
        var skuid_link = viewModel.get('packinglist.skuid_link');
        WarehouseStore.loadby_pcontract(pcontractid_link,stockid_link,skuid_link);
    },
    control: {
        '#btnThoat': {
            click: 'onExit'
        },
        '#btnAddToStockout': {
            click: 'onAddToStockout'
        },
        '#btnDeleteFromStockout': {
            click: 'onDeleteFromStockout'
        }        
    },
    // onAddToStockout: function(){
    //     var viewModel = this.getViewModel();
    //     var stockout = viewModel.get('stockout');
    //     var stockoutDRec = viewModel.get('stockoutDRec');

    //     var WarehouseStore = viewModel.getStore('WarehouseStore');
    //     // var warehouselist = this.lookupReference('Stockout_packinglist_warehouse');
    //     var warehouselist = Ext.getCmp('Stockout_packinglist_warehouse');
    //     var ws_select = warehouselist.getSelectionModel().getSelection();
    //     // console.log(ws_select);
    //     var stockoutDRec = viewModel.get('stockoutDRec');
    //     var pklist = stockoutDRec.get('stockout_packinglist');
    //     if(pklist == null){
    //         pklist = new Array();
    //         stockoutDRec.set('stockout_packinglist', pklist)
    //     }
    //     for (var i = 0; i < ws_select.length; i++) {
    //         var packinglistObj = new Object();
    //         packinglistObj.skuid_link = ws_select[i].data.skuid_link;
    //         packinglistObj.colorid_link = ws_select[i].data.colorid_link;
    //         packinglistObj.color_name = ws_select[i].data.color_name;
    //         packinglistObj.lotnumber = ws_select[i].data.lotnumber;
    //         packinglistObj.packageid = ws_select[i].data.packageid;
    //         packinglistObj.widthcheck = ws_select[i].data.width;

    //         packinglistObj.met_check = ws_select[i].data.met;
    //         pklist.push(packinglistObj);
    //     }
    //     stockoutDRec.set('stockout_packinglist', pklist);
    //     //Remove from
    //     WarehouseStore.remove(ws_select);

    //     console.log(WarehouseStore);
    //     console.log(stockout);
    //     console.log(stockoutDRec);
    // },
    onAddToStockout: function(){
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');

        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var warehouselist = Ext.getCmp('Stockout_packinglist_warehouse');
        var ws_select = warehouselist.getSelectionModel().getSelection();

        var stockoutid_link = viewModel.get('packinglist.stockoutid_link');
        var stockoutdid_link = viewModel.get('packinglist.stockoutdid_link');

        var packinglist = stockoutDRec.get('stockout_packinglist');
        if(packinglist == null){
          packinglist = new Array();
          stockoutDRec.set('stockout_packinglist', packinglist)
        }

        for (var i = 0; i < ws_select.length; i++) {
            var packinglistObj = new Object();
            packinglistObj.stockoutid_link = stockoutid_link;
            packinglistObj.stockoutdid_link = stockoutdid_link;
            packinglistObj.skuid_link = ws_select[i].data.skuid_link;
            packinglistObj.colorid_link = ws_select[i].data.colorid_link;
            packinglistObj.color_name = ws_select[i].data.color_name;
            packinglistObj.lotnumber = ws_select[i].data.lotnumber;
            packinglistObj.packageid = ws_select[i].data.packageid;
            packinglistObj.widthcheck = ws_select[i].data.width;
            packinglistObj.widthorigin = packinglistObj.widthcheck;
            packinglistObj.met_check = ws_select[i].data.met;

            if(!viewModel.get('isMetColumnHidden')){
                packinglistObj.met_origin = packinglistObj.met_check;
                packinglistObj.met_check = packinglistObj.met_check;
                packinglistObj.ydsorigin = packinglistObj.met_check / 0.9144,2;
                packinglistObj.ydscheck = packinglistObj.met_check / 0.9144,2;
            }else if(!viewModel.get('isYdsColumnHidden')){
                packinglistObj.ydsorigin = packinglistObj.met_check / 0.9144,2;
                packinglistObj.ydscheck = packinglistObj.met_check / 0.9144,2;
                packinglistObj.met_origin = packinglistObj.met_check;
                packinglistObj.met_check = packinglistObj.met_check;
            }

            packinglistObj.status = 0;
            packinglistObj.checked = 1;
            packinglist.push(packinglistObj);
        }
        
        for(var i=0; i<stockout.stockout_d.length; i++){
            if(stockoutDRec.get('id') == stockout.stockout_d[i].id){
              stockout.stockout_d[i].stockout_packinglist = stockoutDRec.get('stockout_packinglist');
            }
        }

        //Remove from
        WarehouseStore.remove(ws_select);

        //load data for store
        var Stockout_packinglist_detail = Ext.getCmp('Stockout_packinglist_detail');
        Stockout_packinglist_detail.getStore().loadData(packinglist);

        this.reCalculateSkuGrid();
    },
    onDeleteFromStockout:function(){

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
    },

    reCalculateSkuGrid: function(){
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockoutDRec = viewModel.get('stockoutDRec');
    
        var packinglist = stockoutDRec.get('stockout_packinglist');
        if(packinglist != null){
            var totalpackage = 0;
            // var netweight = 0;
            // var grossweight = 0;
            // var m3 = 0;
            var yds = 0;
            var ydscheck = 0;
            var met = 0;
            var metcheck = 0;
            
            for(var i = 0; i < packinglist.length; i++){
                totalpackage++;
            //   netweight+=packinglist[i].netweight;
            //   grossweight+=packinglist[i].grossweight;
            //   m3+=packinglist[i].m3;
                yds+=packinglist[i].ydsorigin;
                ydscheck+=packinglist[i].ydscheck;
                met+=packinglist[i].met_origin;
                metcheck+=packinglist[i].met_check;
            }
        
            stockoutDRec.set('totalpackage', totalpackage);
            // stockoutDRec.set('netweight', netweight);
            // stockoutDRec.set('grossweight', grossweight);
            // stockoutDRec.set('m3', m3);
            // stockoutDRec.set('totalydsorigin', yds);
            stockoutDRec.set('totalydscheck', ydscheck);
            // stockoutDRec.set('totalmet_origin', met);
            stockoutDRec.set('totalmet_check', metcheck);
        
            Ext.getCmp('Stockout_M_Edit_D').getStore().commitChanges();
        }
    }
})