Ext.define('GSmartApp.view.handover.HandoverDetailPorderSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverDetailPorderSearchController',
    init: function () {
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var POrder_ListStore = viewModel.get('POrder_ListStore');
        POrder_ListStore.loadStoreByPordercode(pordercode);
    },
    listen: {

    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
    },
    onQuayLai: function(){
        this.getView().up('window').close();
    },
    onLuu: function(){
        // console.log('luu');
        var viewModel = this.getViewModel();
        var m = this.getView();
        var select = m.getSelectionModel().getSelection();
        if(select.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn ít nhất một lệnh",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var porderid_link = select[0].data.id;
        var ordercode = select[0].data.ordercode;

        var viewId = viewModel.get('viewId');
        var mainView = Ext.getCmp(viewId);

        // cut to line, load store ListOrgStore_To
        if(viewId == 'handover_cut_toline_detail'){
            var ListOrgStore_To = mainView.getViewModel().getStore('ListOrgStore_To');
            ListOrgStore_To.loadStoreByPorderIdLink(porderid_link);
            mainView.down('#orgid_to_link').setValue(null);
            mainView.down('#orgid_to_link').focus();
        }

        mainView.getViewModel().set('currentRec.porderid_link', porderid_link);
        mainView.getViewModel().set('pordercode', ordercode);
        mainView.getController().loadHandoverProductOnPorderSelect(porderid_link);

        this.onQuayLai();
    },
})