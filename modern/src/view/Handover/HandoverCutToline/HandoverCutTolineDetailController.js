Ext.define('GSmartApp.view.handover.HandoverCutTolineDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutTolineDetailController',
    init: function() {
        var viewModel = this.getViewModel();
        viewModel.set('viewId', 'handover_cut_toline_edit');

        var UserListStore = viewModel.getStore('UserListStore');
        UserListStore.loadUserbyOrg(1);

        var ListOrgStore_From = viewModel.getStore('ListOrgStore_From');
        var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
        var orgtypestring_from = '17';
        ListOrgStore_From.loadStoreByOrgTypeString(orgtypestring_from);
        // cut to line chon porder de load ListOrgStore_To, nhung van cho chon to chuyen
        var orgtypestring_to = '14';
        ListOrgStore_To.loadStoreByOrgTypeString(orgtypestring_to);
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                // newdata: 'onNewData',
				// urlBack:'onUrlBack'
            }
        }
	},
    control: {
        '#btnSave': {
            tap: 'onSave'
        },
        '#btnPlus': {
            tap: 'onBtnPlus'
        },
        '#btnSearch': {
            tap: 'onBtnSearch'
        },
        '#btnBack': {
            tap: 'onBtnBackTap'
        }
    },

    onBtnBackTap: function(){
        Ext.util.History.back();
    },
    onLoadData: function (id){
        var m = this;
        var viewModel = this.getViewModel();
        viewModel.set('id', id);
        if(id == 0){
            console.log('tao moi');
            // m.loadNewInfo();
        }else{
            m.loadInfo(id);
        }
    },
    loadInfo: function(id){
        var viewModel = this.getViewModel();
        var id = viewModel.get('id');

        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/handover/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;

                    // log
                    console.log('function loadInfo: success');
                    console.log(data);

                    // set data
                    viewModel.set('isCreateNew', false);
                    viewModel.set('currentRec', data);

                    var pordercode = data.ordercode.toString();
                    viewModel.set('pordercode',pordercode);

                    var ListOrgStore_To = viewModel.getStore('ListOrgStore_To');
                    ListOrgStore_To.loadStoreByPorderIdLink(data.porderid_link);

                    // set sku store
                    var handoverProducts = data.handoverProducts;
                    if(handoverProducts != null && handoverProducts.length > 0){
                        var handoverProduct = handoverProducts[0];
                        viewModel.set('handoverProduct',handoverProduct);
                        if(
                            handoverProduct != null && 
                            handoverProduct.handoverSKUs != null && 
                            handoverProduct.handoverSKUs.length > 0
                        ){
                            var handoverSKUs = handoverProduct.handoverSKUs;
                            var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
                            HandoverSkuStore.setData([]);
                            HandoverSkuStore.setData(handoverSKUs);
                            viewModel.set('handoverSKUs',handoverSKUs);
                            console.log(HandoverSkuStore);

                        }
                    }
                }else{
                    console.log('function loadInfo: failed');
                }
            })
    },
    onSave: function(btn, e, eOpts){
        var viewModel = this.getViewModel();
        var currentRec = viewModel.get('currentRec');
        // console.log(currentRec);

        var params = new Object();
        params.data = currentRec;

        GSmartApp.Ajax.post('/api/v1/handover/createMobile', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    console.log(response);
                    Ext.toast('Lưu thành công', 1000);
                    // console.log('web success');
                }else{
                    Ext.toast('Lưu thất bại', 1000);
                    // console.log('web fail');
                }
            })
    },

    onBtnPlus:function(){

    },
    onBtnSearch:function(){
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var viewId = viewModel.get('viewId');

        console.log(pordercode);
        console.log(viewId);

        if(pordercode == null || pordercode.length == 0){
            Ext.toast('Mã lệnh không được bỏ trống', 1000);
            return;
        }

        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            // title: 'Số lượng',
            width: 300,
            height: 300,
            header: false,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            maskTapHandler: function(){
                // console.log('mask tapped');
                if(dialog){
                    dialog.close();
                }
            },
            bodyPadding: '1',
            maxWidth: 300,
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'HandoverDetailPorderSearch',
                viewModel: {
                    data: {
                        pordercode: pordercode,
                        viewId: viewId
                    }
                }
            }],
        });
        dialog.show();

        // get event
        // dialog.down('#HandoverDetailPorderSearch').getController().on('Luu', function () {

        //     dialog.close();
        // });

        // dialog.down('#HandoverDetailPorderSearch').getController().on('Thoat', function () {
        //     dialog.close();
        // });
    },
});
