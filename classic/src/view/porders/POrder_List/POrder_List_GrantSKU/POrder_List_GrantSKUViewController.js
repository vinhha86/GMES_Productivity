Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_GrantSKUViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_GrantSKUViewController',
    init: function () {
    },
    control: {
        '#POrder_List_GrantSKUView': {
            itemclick: 'onItemClick',
        }
    },
    control: {
        '#POrder_List_GrantSKUViewTabInfo': {
            itemclick: 'onItemClick',
        }
    },
    // loadInfo: function (id) {
    //     let me = this.getView();
    //     let t = this;

    //     let viewmodel = this.getViewModel();
    //     let store = viewmodel.getStore('POrder_ListGrantStore');
    //     store.loadStore(id);
    // },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    onItemClick: function(thisItem, record, item, index, e, eOpts){
        console.log(record.data);
        let viewModel = this.getViewModel();
        viewModel.set('currentGrantSKURec', record.data);
        viewModel.set('oldGrantSKUAmount', record.data.grantamount);
        viewModel.set('newGrantSKUAmount', record.data.grantamount);
    },
    onEdit: function(editor, context, eOpts){
        let me = this;
        let viewModel = this.getViewModel();
        let POrder_ListGrantSKUStoreForWindow = viewModel.getStore('POrder_ListGrantSKUStoreForWindow');
        let porderSKUStore = viewModel.getStore('porderSKUStore');

        if(context.value == context.originalValue){
            POrder_ListGrantSKUStoreForWindow.rejectChanges();
            return;
        }

        if(context.field == 'grantamount'){
            me.updateGrantAmount(context.record);
        }
    },
    updateGrantAmount: function(record){
        let me = Ext.getCmp('POrder_List_DetailWindowView')
        let viewModel = this.getViewModel();
        let POrder_ListGrantSKUStoreForWindow = viewModel.getStore('POrder_ListGrantSKUStoreForWindow');
        let porderSKUStore = viewModel.getStore('porderSKUStore');
        let data = record.data;

        let params = new Object();
        params.data = data;
        params.idPOrder = viewModel.get('IdPOrder');
        params.idGrant = viewModel.get('IdGrant');

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.post('/api/v1/porderlist/savegrantskuonchange', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    POrder_ListGrantSKUStoreForWindow.commitChanges();
                    POrder_ListGrantSKUStoreForWindow.load();
                    porderSKUStore.load();
                    viewModel.set('porderinfo', response.porderinfo);
                    viewModel.set('amount', response.amount);
                    me.fireEvent('UpdatePorder',viewModel.get('porderinfo'), viewModel.get('amount'));
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    POrder_ListGrantSKUStoreForWindow.rejectChanges();
                }
                me.setLoading(false);
            })
    },
})