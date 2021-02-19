Ext.define('GSmartApp.view.invoice.invoice_npl_search.invoice_nplsearch_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.invoice_nplsearch_Controller',
	init: function() {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var skucode = viewModel.get('skucode');
        // var SkuStore = viewModel.getStore('SkuStore');
        // SkuStore.loadSkuByCode(skucode);

        // sorter
        // SkuStore.getSorters().add('producttype_name');
        // SkuStore.getSorters().add('code');

        // this.setSKUBalanceStore();
    },
    control: {
		'#invoice_nplsearch': {
			afterrender: 'onAfterrender'
        },
        // '#invoice_productlist': {
		// 	itemclick: 'onProductClick'
        // },
        '#btnThoat': {
			click: 'onThoat'
        },
        '#btnLuu': {
			click: 'onLuu'
        },
    },
    onThoat: function(){
        this.fireEvent('invoice_nplsearchThoat');
    },
    onLuu: function(){
        var m = this.getView();
        var me = this;
        var viewModel = this.getViewModel();
        var select = m.down('#invoice_npllist').getSelectionModel().getSelection();
        // console.log(select);
        if(select.length > 0){
            me.fireEvent('invoice_nplsearchLuu', select);
        }
    },
    // onPcontractClick: function(view, record, item, index, e, eOpts){
    //     var viewModel = this.getViewModel();
    //     var PContractProductStore = viewModel.getStore('PContractProductStore');
    //     var pcontractid_link = record.get('id');
    //     PContractProductStore.loadStore(pcontractid_link);

    //     viewModel.set('pcontractid_link', pcontractid_link);
    // },
    // onProductClick: function(view, record, item, index, e, eOpts){
    //     var viewModel = this.getViewModel();
    //     var PContractProductBom2Store = viewModel.getStore('PContractProductBom2Store');
    //     var productid_link = record.get('productid_link');
    //     var pcontractid_link = viewModel.get('pcontractid_link');
    //     PContractProductBom2Store.loadStore(pcontractid_link, productid_link);

    //     viewModel.set('productid_link', productid_link);
    // },
    onAfterrender: function(){
        // this.fireEvent('invoice_nplsearchThoat');
        var m = this.getView();
        var me = this;
        var viewModel = this.getViewModel();
        var skucodesearch = viewModel.get('skucode');
        var SKUBalanceStore = viewModel.get('SKUBalanceStore');
        Ext.getCmp('invoice_npllist').setStore(SKUBalanceStore);

        var store = Ext.getCmp('invoice_npllist').getStore();
        var storeData = store.getData().items;
        var newStoreData = new Array();

        for(var i = 0; i < storeData.length; i++){
            var npl = storeData[i];

            var storeObj = new Object();
            storeObj.mat_skuid_link = npl.get('mat_skuid_link');
            storeObj.mat_sku_code = npl.get('mat_sku_code');
            storeObj.mat_sku_name = npl.get('mat_sku_name');
            storeObj.mat_sku_color_name = npl.get('mat_sku_color_name');
            storeObj.mat_sku_size_name = npl.get('mat_sku_size_name');
            storeObj.mat_sku_product_typename = npl.get('mat_sku_product_typename');

            if(storeObj.mat_sku_code.toLowerCase().includes(skucodesearch.toLowerCase())){
                newStoreData.push(storeObj);
            }
        }

        console.log(newStoreData);

        if(newStoreData.length == 0){
            console.log(0);
            // chon tat ca
        }else if(newStoreData.length > 1){
            console.log(2);
            // chon tim kiem
            store.setData(newStoreData);
        }else if(newStoreData.length == 1){
            console.log(1)
            // tu dong chon
            store.setData(newStoreData);
            // me.fireEvent('invoice_nplsearchLuu', newStoreData);
            Ext.getCmp('invoice_npllist').getSelectionModel().select(0);
            setTimeout(() => {  me.onLuu(); }, 1);
        }

    }
})