Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_Controller',
	init: function() {
        var viewModel = this.getViewModel();
		var UnitStore = viewModel.getStore('UnitStore');
		UnitStore.loadStore();
		var UnitStoreFilters = UnitStore.getFilters();
		if (!this.UnitStoreFilters) {
            this.UnitStoreFilters = UnitStoreFilters.add({
                id: 'UnitStoreFilters',
                property: 'unittype',
                value: 0,
                exactMatch: true,
            });
        }

        if (viewModel.get('isAdd_Pcontract_Stockin')){
            if (viewModel.get('isNewStockin'))
                this.onNewData(null,viewModel.get('stockintypeid_link'));
            else
                this.getInfo(viewModel.get('stockinid_link'));
        }
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                newdata: 'onNewData',
				urlBack:'onUrlBack'
            }
        }
	},
    control:{
        '#btnBack':{
            click: 'onBackPage'
        },
        '#btnLuu':{
            click: 'onSave'
        },
        '#btnConfirm':{
            click: 'onConfirm'
        },
        '#btnClose':{
            click: 'onCloseButton'
        },
        
    },
    onUrlBack: function(type){
        
    },
    onCloseButton: function(){
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onNewData:function(type, id){
        
        var viewModel = this.getViewModel();
        var session = GSmartApp.util.State.get('session');


        //Lay thong tin chi tiet nguoi dung Login
        var session = GSmartApp.util.State.get('session');
        var GpayUserOrg = viewModel.getStore('GpayUserOrg');
        GpayUserOrg.loadUserInfo(session.id);
        GpayUserOrg.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				} else {
                    // console.log(records[0].data);
                    if (null!=records[0].data){
                        viewModel.set('stockin.orgid_to_link', records[0].data.org_grant_id_link);
                    } else {
                        viewModel.set('stockin.orgid_to_link', session.orgid_link);
                    }
                    
                }
			}
		}); 
        
        viewModel.set('stockin.stockindate',new Date());
        viewModel.set('stockin.usercreateid_link', session.id);
        viewModel.set('listepc', new Map());

        viewModel.set('stockin.stockintypeid_link', id);
        viewModel.set('stockin.unitid_link', 1);
        viewModel.set('stockin.status', -1);
        viewModel.set('stockin.pcontractid_link', viewModel.get('pcontractid_link'));

        // set store org from
        if(id == 1) {// mua moi va cap bu thi là nha cung cap
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore(5, false);
        }else{
            var listidtype = "13,4,8,9";
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore_byRoot(listidtype);
        }
    },
    onLoadData:function(id,type){
        var viewModel = this.getViewModel();

        this.getInfo(id);
    },
    onBackPage: function(){
        this.redirectTo('stockin_m');
    },
    getInfo: function(id){
        var me = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinD_Store');
        var StockinProduct_Store = viewModel.getStore('StockinProduct_Store');
        var listepc = viewModel.get('listepc');

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                // console.log(response.data);
                var data = response.data;

                // set stockin lot cho stockinD
                data = me.setStockinLotForStockinD(data);

                if(data.unitid_link == null) data.unitid_link = 1;
                viewModel.set('stockin', data);
                for(var i=0; i<response.listepc.length; i++){
                    listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                }
                store.setData(data.stockin_d);
                store.commitChanges();
                StockinProduct_Store.setData(data.stockin_product);
                StockinProduct_Store.commitChanges();

                // set store org from
                if(data.stockintypeid_link == 1) {// mua moi va cap bu thi là nha cung cap
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore(5, false);
                }else{
                    var listidtype = "13,4,8,9";
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore_byRoot(listidtype);
                }
            }
		})
    },
    setStockinLotForStockinD: function(stockin){
        var data = stockin;
        for(var i=0; i<data.stockin_d.length; i++){
            var stockInD = data.stockin_d[i];
            var stockinDLot = '';
            if(stockInD.skuid_link != null){
                var materialid_link = stockInD.skuid_link;
                for(var j=0; j<stockin.stockin_lot.length; j++){
                    var stockinLot = stockin.stockin_lot[j];
                    var result = '';
                    result+= stockinLot.lot_number == null ? '' : stockinLot.lot_number;
					result+= stockinLot.totalpackage == null ? '' : ' ' +  stockinLot.totalpackage;
					// result+= stockinLot.space == null ? '' : ' ' + stockinLot.space;
					
					if(stockinLot.materialid_link == materialid_link) {
						if(stockinDLot == '') {
							stockinDLot += result;
						}else {
							stockinDLot += '; ' + result;
						}
					}
                }
            }
            stockInD.stockinDLot = stockinDLot;
        }
        // console.log(data);
        return data;
    },
    CheckValidate: function(){
		var mes = "";
		var stockin = this.getViewModel().get('stockin');
		if(stockin.stockintypeid_link == null){
			mes = "Bạn chưa chọn loại phiếu";
		}
		else if (stockin.orgid_from_link == null){
			mes = "Bạn chưa chọn nơi giao";
		}
		else if (stockin.orgid_to_link == null){
			mes = "Bạn chưa chọn nơi nhập";
		} 
		else if (stockin.stockin_d.length == 0){
			mes = "Phiếu chưa có danh sách sản phẩm";
		}
		return mes;
	},
    onSave: function(){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = [];
        var stockin = viewModel.get('stockin');

        var stockin_d = stockin.stockin_d;
        if(stockin_d != null){
            for(var i = 0; i < stockin_d.length; i++){
                if(stockin_d[i].id == 0 || typeof stockin_d[i].id === 'string'){
                    stockin_d[i].id = null;
                }

                var stockin_packinglist = stockin_d[i].stockin_packinglist;
                if(stockin_packinglist != null){
                    for(var j = 0; j < stockin_packinglist.length; j++){
                        if(stockin_packinglist[j].id == 0 || typeof stockin_packinglist[j].id === 'string'){
                            stockin_packinglist[j].id = null;
                        }
                        if(stockin_packinglist[j].stockindid_link == 0 || typeof stockin_packinglist[j].stockindid_link === 'string'){
                            stockin_packinglist[j].stockindid_link = null;
                        }
                    }
                }
            }
        }
        // console.log(stockin);
        params.data.push(stockin);
        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_create', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: 'Lập phiếu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });		
                        if (!viewModel.get('isAdd_Pcontract_Stockin')){	
                            this.redirectTo("stockin_m_main/" + response.id + "/edit");
                            m.getInfo(response.id);
                        }
                    }
                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Lỗi lập phiếu: ' + response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
        })
        
    },
    
    onConfirm: function(){
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var stockinId = stockin.id;
        var form = Ext.create('Ext.window.Window', {
            // height: 200,
            width: 315,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Duyệt',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockin_M_Edit_Confirm',
                viewModel: {
                    type: 'HandoverDetailConfirmViewModel',
                    data: {
                        stockin: stockin,
                        stockinId: stockinId
                    }
                }
            }]
        });
        form.show();
    }
})