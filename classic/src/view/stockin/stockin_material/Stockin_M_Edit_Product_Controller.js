Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_Product_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_Edit_Product_Controller',
	control: {
		'#btnTimSP': {
            click: 'onBtnTimSP'
        },
	},	
	onBtnTimSP: function () {
		var me = this.getView();
        var viewmodel = this.getViewModel();

		var form = Ext.create({
			xtype: 'skusearchwindow',
			width: 800,
			height: 500,
            reference: 'skusearchwindow',
            closeAction: 'destroy',
			viewModel: {
				data: {
					isHidden_Select_Products: false,
					searchtype: 1,
					pcontractid_link: null,
					type: 10,                        
					orgcustomerid_link: null,
					isHidden_sku: true,
					isHidden_newProduct: true,
					isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
					isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
				}
			}
		});
		form.show();
		form.getController().on('onSelect_Products', function (records) {
            var stockin_product = viewmodel.get('stockin.stockin_product');
            if(stockin_product == null){
                stockin_product = new Array();
            }	
			for(var i = 0; i < records.length; i++){
                var theProduct = records[i];
                var found = stockin_product.some(item => item.productid_link === theProduct.get('id'));
                if(!found){
                    var stockin_productObj = new Object();
					stockin_productObj.id =  null;
                    stockin_productObj.productid_link = theProduct.get('id');
					stockin_productObj.product_code = theProduct.get('buyercode');
					stockin_productObj.product_name = theProduct.get('name');
					stockin_productObj.product_desc = theProduct.get('name');

					stockin_product.push(stockin_productObj);
                }
            }
			var StockinProduct_Store = viewmodel.getStore('StockinProduct_Store');
            StockinProduct_Store.removeAll();
			StockinProduct_Store.setData(stockin_product);
            form.close();					
        })
    },
	onXoa: function(){

	}
})