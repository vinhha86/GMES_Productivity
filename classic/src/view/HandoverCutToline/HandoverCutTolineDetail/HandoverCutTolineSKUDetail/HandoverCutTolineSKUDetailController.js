Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolineSKUDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutTolineSKUDetailController',
    init: function () {
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('handoverid_link');
        var handoverproductid_link = viewModel.get('handoverproductid_link');
        var porderid_link = viewModel.get('porderid_link');
        var productid_link = viewModel.get('productid_link');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
        HandoverSkuStore.loadStore(handoverid_link, handoverproductid_link, porderid_link, productid_link);
        HandoverSkuStore.getSorters().add('skuColor');
        HandoverSkuStore.getSorters().add('skuSizeSortVal');
    },
    listen: {
        
    },
    control: {
        
    },
    renderSum: function (value) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onEditHandoverSKU: function(editor, context, e){
        var viewModel = this.getViewModel();
        var grid = this.getView();
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
        if(context.value == context.originalValue || context.value < 0 || context.value == ''){
            HandoverSkuStore.rejectChanges();
            return;
        }
        // console.log(typeof context.value);
        var num = parseInt(context.value);
        context.record.data.totalpackage = num;
        // console.log(context.record.data);
        grid.setLoading(true);
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/handoversku/updateHandoverSku', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    HandoverSkuStore.commitChanges();
                    // load handoverProduct grid
                    var main = Ext.getCmp('handover_cut_toline_edit');
                    var HandoverProductStore = main.getViewModel().getStore('HandoverProductStore');
                    HandoverProductStore.load();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: 'Lưu thất bại: ' + response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Có'
                        }
                    });
                    HandoverSkuStore.rejectChanges();
                }
            })
    },   
})