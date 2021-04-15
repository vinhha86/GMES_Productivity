Ext.define('GSmartApp.view.stockin.PContract_Product_Select_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Product_Select_Controller',
	init: function() {
        var viewmodel = this.getViewModel();
        console.log(viewmodel.get('pcontractid_link'));
        var PContractProductStore = viewmodel.getStore('PContractProductStore');
        PContractProductStore.loadStore(viewmodel.get('pcontractid_link'), null);
    },
    onCloseButton:function(){
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(){
        var select = this.getView().getSelectionModel().getSelection();
        if(select.length > 0){
            this.fireEvent('onSelect_Products', select);
        }
    },
})