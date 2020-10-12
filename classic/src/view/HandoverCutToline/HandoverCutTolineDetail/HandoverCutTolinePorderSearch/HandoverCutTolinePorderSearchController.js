Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolinePorderSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutTolinePorderSearchController',
    init: function () {
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var POrder_ListStore = viewModel.get('POrder_ListStore');
        POrder_ListStore.loadStoreByPordercode(pordercode);
        // POrder_ListStore.getSorters().add('ordercode');
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
        var handover_cut_toline_edit = Ext.getCmp('handover_cut_toline_edit');
        // console.log(handover_cut_toline_edit);
        var POrderGrantStore = handover_cut_toline_edit.getViewModel().getStore('POrderGrantStore');
        POrderGrantStore.loadStoreByPOrderId(porderid_link);
        handover_cut_toline_edit.down('#comboboxPordergrant').setValue(null);
        handover_cut_toline_edit.down('#comboboxPordergrant').focus();
        handover_cut_toline_edit.getViewModel().set('currentRec.porderid_link', porderid_link);
        handover_cut_toline_edit.getViewModel().set('pordercode', ordercode);

        this.onQuayLai();
    },
})