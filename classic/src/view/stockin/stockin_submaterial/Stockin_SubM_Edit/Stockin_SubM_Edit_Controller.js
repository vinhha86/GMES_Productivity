Ext.define('GSmartApp.view.stockin.stockin_submaterial.stockin_subm_edit.Stockin_SubM_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_SubM_Edit_Controller',
	init: function() {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        if (viewModel.get('isAdd_Pcontract_Stockin')){
            if (viewModel.get('isNewStockin'))
                this.onNewData(null,viewModel.get('stockintypeid_link'));
            else
                this.getInfo(viewModel.get('stockinid_link'));
        }else if(viewModel.get('isAdd_DashboardMer_Stockin')){
            // tạo phiếu nhập từ dashboard mer
            if (viewModel.get('isNewStockin')){
                m.onNewData(null, viewModel.get('stockintypeid_link'));
            }
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
        '#btnDSPoline': {
            click: 'onBtnDSPoline'
        }
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
        var m = this;
        var me = this.getView();
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
					 // this.fireEvent('logout');
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
        viewModel.set('stockin.invoice_date',new Date());
        viewModel.set('stockin.usercreateid_link', session.id);
        viewModel.set('listepc', new Map());

        viewModel.set('stockin.stockintypeid_link', id);
        viewModel.set('stockin.status', -1);
        viewModel.set('stockin.pcontractid_link', viewModel.get('pcontractid_link'));

        // set store org from
        if(id == 11) {// mua moi va cap bu thi là nha cung cap
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore(5, false);
        }else if(id == 12){ // nhap dieu chuyen (kho -> kho)
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadOrgByTypeAndUser([19]);
        }else{
            var listidtype = "13,4,8,9";
            var orgfromstore = viewModel.getStore('OrgFromStore');
            orgfromstore.loadStore_byRoot(listidtype);
        }

        if (id == 11) { // mua moi -> kho
            var OrgToStore = viewModel.getStore('OrgToStore');
            OrgToStore.LoadOrginReqByPContractAndProduct([19]);
        } else if (id == 12) { // nhap dieu chuyen (kho -> kho)
            var OrgToStore = viewModel.getStore('OrgToStore');
            OrgToStore.LoadOrginReqByPContractAndProduct(19, false);
        }

        // thêm ds npl theo skuNplIdList (truyền vào từ DashboardMer_BalanceViewController)
        var skuNplIdList = viewModel.get('skuNplIdList');
        if(skuNplIdList.length > 0){
            m.getStockinDBySkuIdList(skuNplIdList);
        }
        // thêm sp vào ds sp phiếu nhập
        var productid_link = viewModel.get('productid_link');
        if(productid_link != null){
            m.getProduct(productid_link);
        }

    },
    onLoadData:function(id,type){
        var m = this;
		m.getInfo(id);
    },
    onBackPage: function(){
        this.redirectTo('stockin_subm');
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

                if(data.unitid_link == null) data.unitid_link = 1;
                if(data.stockin_d == null) data.stockin_d = [];
                if(data.stockin_product == null) data.stockin_product = [];
                viewModel.set('stockin', data);
                for(var i=0; i<response.listepc.length; i++){
                    listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                }
                store.setData(data.stockin_d);
                store.commitChanges();
                StockinProduct_Store.setData(data.stockin_product);
                StockinProduct_Store.commitChanges();

                // set store org from
                if(data.stockintypeid_link == 11) {// mua moi va cap bu thi là nha cung cap
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore(5, false);
                }else if(id == 12){ // nhap dieu chuyen (kho -> kho)
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadOrgByTypeAndUser([19]);
                }else {
                    var listidtype = "13,4,8,9";
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore_byRoot(listidtype);
                }

                // set store org to
                if(data.stockintypeid_link == 11) {// mua moi -> kho
                    var OrgToStore = viewModel.getStore('OrgToStore');
                    OrgToStore.loadOrgByTypeAndUser([19]);
                }
                if(data.stockintypeid_link == 12) {// nhap dieu chuyen (kho -> kho)
                    var OrgToStore = viewModel.getStore('OrgToStore');
                    OrgToStore.loadStore(19, false);
                }
            }
		})
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

        // Kiem tra noi giao co trong danh muc
        var isNoiGiaoExist = m.checkNoiGiao();
        // console.log(isNoiGiaoExist);
        if(!isNoiGiaoExist){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Nơi giao chưa có trong hệ thống! Ấn dấu + để thêm nơi giao.',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        if(stockin.orgid_from_link == null || stockin.orgid_from_link == ''){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Không được bỏ trống nơi giao',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        if(stockin.orgid_to_link == null || stockin.orgid_to_link == '' || isNaN(stockin.orgid_to_link)){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Không được bỏ trống nơi nhận',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

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
        var stockin_product = stockin.stockin_product;
        if(stockin_product != null){
            for(var i = 0; i < stockin_product.length; i++){
                if(stockin_product[i].id == 0 || typeof stockin_product[i].id === 'string'){
                    stockin_product[i].id = null;
                }
            }
        }

        // nếu không có npl, ko cho Lưu
        if(stockin_d == null || stockin_d.length == 0){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Danh sách không có nguyên phụ liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
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
                        // if (!viewModel.get('isAdd_Pcontract_Stockin')){	
                        //     m.redirectTo("stockin_subm/" + response.id + "/edit");
                        //     m.fireEvent('loaddata', response.id);
                        //     console.log('m.fireEvent(loaddata, response.id)');
                        // }
                        
                        // nếu là lưu từ tab Nguyên phụ liệu về trong Đơn hàng GC, fire event để reload store
                        if (viewModel.get('isAdd_Pcontract_Stockin')){
                            var data = response.data;

                            // Danh sách nguyên liệu
                            var StockinD_Store = viewModel.getStore('StockinD_Store');
                            var StockinD_Store_data = StockinD_Store.getData().items;
                            // console.log(StockinD_Store_data);
                            // console.log(data.stockin_d);
                            // skuname, sku_product_desc, sku_product_color, size_name
                            for(var i = 0; i < data.stockin_d.length; i++){
                                for(var j = 0; j < StockinD_Store_data.length; j++){
                                    if(StockinD_Store_data[j].get('skuid_link') ==  data.stockin_d[i].skuid_link){
                                        // StockinD_Store_data[j].set('id', data.stockin_d[i].id);
                                        data.stockin_d[i].skuname = StockinD_Store_data[j].get('skuname');
                                        data.stockin_d[i].sku_product_desc = StockinD_Store_data[j].get('sku_product_desc');
                                        data.stockin_d[i].sku_product_color = StockinD_Store_data[j].get('sku_product_color');
                                        data.stockin_d[i].size_name = StockinD_Store_data[j].get('size_name');
                                    }
                                }
                            }
                            // StockinD_Store.setData(data.stockin_d);
                            StockinD_Store.removeAll();
                            StockinD_Store.insert(0, data.stockin_d);
                            StockinD_Store.commitChanges();

                            // Danh sách sản phẩm
                            var StockinProduct_Store = viewModel.getStore('StockinProduct_Store');
                            var StockinProduct_Store_data = StockinProduct_Store.getData().items;
                            // console.log(StockinD_Store_data);
                            // console.log(data.stockin_d);
                            // skuname, sku_product_desc, sku_product_color, size_name
                            for(var i = 0; i < data.stockin_product.length; i++){
                                for(var j = 0; j < StockinProduct_Store_data.length; j++){
                                    if(StockinProduct_Store_data[j].get('productid_link') ==  data.stockin_product[i].productid_link){
                                        // StockinD_Store_data[j].set('id', data.stockin_d[i].id);
                                        data.stockin_product[i].product_code = StockinProduct_Store_data[j].get('product_code');
                                        data.stockin_product[i].product_desc = StockinProduct_Store_data[j].get('product_desc');
                                        data.stockin_product[i].product_name = StockinProduct_Store_data[j].get('product_name');
                                    }
                                }
                            }

                            // StockinProduct_Store.setData(data.stockin_product);
                            StockinProduct_Store.removeAll();
                            StockinProduct_Store.insert(0, data.stockin_product);
                            StockinProduct_Store.commitChanges();

                            viewModel.set('stockin', data);
                            m.getCreateName(data.usercreateid_link);

                            m.fireEvent('LuuPhieuNhapThanhCong');
                        }else if (viewModel.get('isAdd_DashboardMer_Stockin')) {
                            m.getInfo(response.id);
                            m.fireEvent('LuuPhieuNhapThanhCong');
                        }else {
                            var str = Ext.getWin().dom.location.href;
                            var hash = str.split('#')[1];
                            if(hash == "stockin_subm/" + response.id + "/edit"){
                                m.getInfo(response.id);
                            }else{
                                m.redirectTo("stockin_subm/" + response.id + "/edit");
                            }
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
    
    checkNoiGiao: function(){
        var isExist = false;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        orgid_from_link = stockin.orgid_from_link;
        var store = viewModel.getStore('OrgFromStore');
        var data = store.getData().items;
        
        if(typeof orgid_from_link == 'string'){ // user type
            for(var i = 0; i < data.length; i++){
                var item = data[i];
                if(item.get('name').toLowerCase() == orgid_from_link.toLowerCase()){
                    isExist = true;
                    viewModel.set('stockin.orgid_from_link', item.get('id'));
                    break;
                }
            }
        }else{ // user select
            isExist = true;
        }

        // console.log(orgid_from_link);
        // console.log(data);

        return isExist;
    },

    onConfirm: function () {
        var m = this;
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
                xtype: 'Authen_Confirm',
            }]
        });
        form.show();

        form.down('#Authen_Confirm').getController().on('AuthenOK', function (approver_userid_link) {
            form.close();
            // console.log(approver_userid_link);

            var params = new Object();
            params.stockin = stockin;
            params.stockinId = stockinId;
            params.approver_userid_link = approver_userid_link;

            var mainView = Ext.getCmp('Stockin_P_Edit');
            if (mainView) mainView.setLoading(true);

            GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_approve', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (mainView) mainView.setLoading(false);
                    var response = Ext.decode(response.responseText);
                    if (success) {
                        // console.log(response);
                        if (response.respcode == 200) {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Duyệt thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            var data = response.data;
                            viewModel.set('stockin', data);
                            m.getApproverName(data.approverid_link);
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Duyệt thất bại',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }

                    } else {
                        Ext.Msg.show({
                            title: 'Duyệt thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        })
    },
    getApproverName: function(userid){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');

        var params = new Object();
        params.id = userid;

        var mainView = Ext.getCmp('Stockin_P_Edit');
        if (mainView) mainView.setLoading(true);

        GSmartApp.Ajax.post('/api/v1/users/user_getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        // console.log(response);
                        // console.log(stockin);
                        stockin.userApprove_name = response.data.fullName;
                        viewModel.set('stockin', stockin);
                    }
                }
            })
    },
    getCreateName: function(userid){
        var m = this;
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');

        var params = new Object();
        params.id = userid;

        var mainView = Ext.getCmp('Stockin_M_Edit');
        if (mainView) mainView.setLoading(true);

        GSmartApp.Ajax.post('/api/v1/users/user_getinfo', Ext.JSON.encode(params),
            function (success, response, options) {
                if (mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        // console.log(response);
                        // console.log(stockin);
                        stockin.usercreate_name = response.data.fullName;
                        viewModel.set('stockin', stockin);
                    }
                }
            })
    },
    onBtnDSPoline: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var stockin = viewModel.get('stockin');

        var form = Ext.create('Ext.window.Window', {
            height: '90%',
            width: '90%',
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: "Danh sách PO Line",
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockin_P_Poline_MainView',
                viewModel: {
                    data: {
                        stockin: stockin
                    }
                }
            }]
        });
        form.show();

        form.down('#Stockin_P_Poline_MainView').getController().on('Thoat', function () {
            form.close();
        })
    },

    getStockinDBySkuIdList: function(skuNplIdList){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // từ skuNplIdList lấy thông tin npl để thêm vào ds stockinD

        var params = new Object();
        params.skuNplIdList = skuNplIdList;
        params.skuType = 30; // phu lieu

        GSmartApp.Ajax.post('/api/v1/sku/getBySkuIdList', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        m.addStockinDBySkuIdList(response.data);
                    }
                }
            })
    },
    addStockinDBySkuIdList: function(skuList){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockin = viewModel.get('stockin');
        var StockinD_Store = viewModel.get('StockinD_Store');

        var stockinDListToInsert = new Array();
        for(var i=0;i<skuList.length;i++){
            var sku = skuList[i];
            var stockinD = new Object();
            stockinD.skuCode = sku.code;
            stockinD.skuname = sku.name;
            stockinD.sku_product_desc = sku.description;
            stockinD.sku_product_color = sku.product_color;
            stockinD.size_name = sku.size_name;
            stockinD.unitid_link = stockin.unitid_link;
            stockinD.totalmet_origin = 0;
            stockinD.totalmet_check = 0;
            stockinD.totalydsorigin = 0;
            stockinD.totalydscheck = 0;
            stockinD.grossweight = 0;
            stockinD.netweight = 0;
            stockinD.grossweight_lbs = 0;
            stockinD.netweight_lbs = 0;
            stockinD.totalpackagecheck = 0;
            // 
            stockinD.orgrootid_link = 1;
            stockinD.skucode = sku.code;
            stockinD.skuid_link = sku.id;
            stockinD.colorid_link = sku.color_id;
            stockinD.status = -1;
            stockinDListToInsert.push(stockinD);
        }
        StockinD_Store.insert(0, stockinDListToInsert);
        StockinD_Store.commitChanges();
        viewModel.set('stockin.stockin_d', stockinDListToInsert);
        // skuCode, skuname, sku_product_desc, sku_product_color, size_name, unitid_link
        // totalmet_origin, totalmet_check, totalydsorigin, totalydscheck, 
        // grossweight, netweight, grossweight_lbs, netweight_lbs
        // totalpackagecheck
    },
    getProduct: function(productid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pcontractid_link = viewModel.get('pcontractid_link');

        var params = new Object();
        params.id = productid_link;
        params.pcontractid_link = pcontractid_link;

        GSmartApp.Ajax.post('/api/v1/product/getSpDonById', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        m.addProduct(response.data);
                    }
                }
            })
    },
    addProduct: function(products){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // console.log(products);
        var stockin = viewModel.get('stockin');
        var StockinProduct_Store = viewModel.get('StockinProduct_Store');

        var productsToInsert = new Array();
        for(var i=0;i<products.length;i++){
            var product = products[i];
            var stockinProduct = new Object();
            stockinProduct.productid_link = product.id;
            // product_code, product_name, product_desc
            stockinProduct.product_code = product.buyercode;
            stockinProduct.product_name = product.name;
            stockinProduct.product_desc = product.description;
            productsToInsert.push(stockinProduct);
        }
        StockinProduct_Store.insert(0, productsToInsert);
        viewModel.set('stockin.stockin_product', productsToInsert);
    },
})