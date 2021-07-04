Ext.define('GSmartApp.view.stockin.stockin_product.Stockin_P_Edit.Stockin_POLINE.Stockin_POLINE_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_POLINE_Main_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        if(viewModel.get('po_buyer') != ''){
            this.onTimKiem();
        }
	},
	control:{
		'#btnThoat' : {
            click: 'onThoat'
        },
        '#btnTimKiem': {
            click: 'onTimKiem'
        },
        '#btnLuu' :{
            click: 'onChon'
        },
        '#POBuyer_txtField': {
            keypress: 'onEnterPOBuyer_txtField'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onTimKiem: function(){
        var viewModel = this.getViewModel();
        var POLineStore = viewModel.getStore('POLineStore');
        var po_buyer = viewModel.get('po_buyer');
        if(po_buyer == ''){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập PO Line",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else{
            POLineStore.getall_by_pobuyer(po_buyer);
            var PContractSKUStore = viewModel.getStore('PContractSKUStore');
            if(PContractSKUStore) PContractSKUStore.removeAll();
        }
    },
    onChon: function(){
        var viewModel = this.getViewModel();
        var mainView = this.getView().up('window');
        var grid = mainView.down('#Stockin_POLINE_Sku');
        var select = grid.getSelectionModel().getSelection();
        var poData = viewModel.get('poData');
        // console.log(select);

        if(select.length == 0){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn sản phẩm",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }else{
            mainView.down('#Stockin_POLINE_Main').fireEvent('Chon', select, poData);
        }
        // grid.fireEvent("Chon", select[0].data);
    },
    onEnterPOBuyer_txtField: function (field, e) {
		var me = this;
		if (e.getKey() == e.ENTER) {
			me.onTimKiem();
		}
	},
})