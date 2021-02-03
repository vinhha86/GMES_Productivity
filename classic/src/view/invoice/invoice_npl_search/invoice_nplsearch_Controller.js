Ext.define('GSmartApp.view.invoice.invoice_npl_search.invoice_nplsearch_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.invoice_nplsearch_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        var skucode = viewModel.get('skucode');
        var SkuStore = viewModel.getStore('SkuStore');
        SkuStore.loadSkuByCode(skucode);

        // sorter
        SkuStore.getSorters().add('producttype_name');
        SkuStore.getSorters().add('code');
    },
    control: {
		// '#invoice_pcontractlist': {
		// 	itemclick: 'onPcontractClick'
        // },
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
    // }
})