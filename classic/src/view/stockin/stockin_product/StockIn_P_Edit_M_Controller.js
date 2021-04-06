Ext.define('GSmartApp.view.stockin.StockIn_P_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockIn_P_Edit_M_Controller',
	init: function() {
        var orgstore = this.getViewModel().getStore('OrgStore');
		orgstore.loadStore(5);

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();

		var listidtype = "13,4,8,9";
		var orgfromstore = this.getViewModel().getStore('OrgFromStore');
		orgfromstore.loadStore_byRoot(listidtype);

		var orgtostore = this.getViewModel().getStore('OrgToStore');
		orgtostore.loadStore_allchildren_byorg(listidtype);

		var currencyStore = this.getViewModel().getStore('CurrencyStore');
		currencyStore.loadStore();

		var vattypeStore = this.getViewModel().getStore('VatTypeStore');
		vattypeStore.loadStore();
		
		var stockintype = this.getViewModel().getStore('StockinTypeStore');
		stockintype.loadStore();
	},
	control:{
		'#loaitien':{
            select: 'onSelectCurency'
        },
		'#btnTimPOLine': {
			click: 'onTimLine'
		}
    },
	onSpecialkey: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimLine();
		}
	},
	onTimLine: function () {
		var me = this;
		var grid = this.getView();
		var form = Ext.create('Ext.window.Window', {
			height: 600,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách line giao hàng',
			closeAction: 'destroy',
			width: 1100,
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'Stockout_POLINE',
				viewModel: {
					data: {
						po_buyer: grid.down('#ordercode').getValue()
					}
				}
			}]
		});
		form.show();

		form.down('#Stockout_POLINE').on('Chon', function (data) {
			me.onTaiSanPham(data);
			form.close();
		})
	},	
	onTaiSanPham: function(data){
		var viewmodel = this.getViewModel();
		viewmodel.set('stockin.pcontract_poid_link', data.id);
		viewmodel.set('stockin.contract_number', data.po_buyer);
		var params = new Object();
		params.pcontract_poid_link = data.id;

		GSmartApp.Ajax.post('/api/v1/pcontract_po/getall_sku_byline', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				if (response.respcode == 200) {
					var list = [];
					for(var i=0; i<response.data.length; i++){
						var data = response.data[i];
						var stockind_new = new Object();
						stockind_new.id = null;
						stockind_new.skucode = data.skuCode;
						stockind_new.skuname = data.skuName;
						stockind_new.sku_product_code = data.productcode;
						stockind_new.product_name = data.productname;
						stockind_new.p_skuid_link = data.productid_link;
						stockind_new.color_name = data.mauSanPham;
						stockind_new.size_name = data.coSanPham;
						stockind_new.totalpackage = data.pquantity_total;
						stockind_new.unitid_link = data.unitid_link;
						stockind_new.unit_name = data.unitname;
						stockind_new.stockoutid_link = null;
						stockind_new.colorid_link = data.color_id;
						stockind_new.skuid_link = data.skuid_link;
						stockind_new.sizeid_link = data.sizeid_link;

						list.push(stockind_new);
					}

					viewmodel.set('stockin.stockin_d', list);
					var store = viewmodel.getStore('StockinD_Store');
					store.removeAll();
					store.setData(list);
				}
			})
	},	
    onSelectCurency: function(combo, record, eOpts ){
       var viewModel = this.getViewModel();
	   viewModel.set('stockin.vat_exchangerate', record.data.exchangerate);
	   viewModel.set('curencycode',record.data.code);
    }
})