Ext.define('GSmartApp.view.handovercuttoprint.HandoverCutToPrintSKUDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutToPrintSKUDetailController',
    init: function () {
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('handoverid_link');
        var handoverproductid_link = viewModel.get('handoverproductid_link');
        var porderid_link = viewModel.get('porderid_link');
        var productid_link = viewModel.get('productid_link');
        var HandoverSkuStore = viewModel.getStore('HandoverSkuStore');
        HandoverSkuStore.getSorters().add('skuColor');
        HandoverSkuStore.getSorters().add('skuSizeSortVal');
        HandoverSkuStore.loadStore_Async(handoverid_link, handoverproductid_link, porderid_link, productid_link);
        
        HandoverSkuStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                } else {
                    var params=new Object();
                    params.handoverid_link = handoverid_link;
                    params.handoverproductid_link = handoverproductid_link;
                    params.porderid_link = porderid_link;
                    params.productid_link = productid_link;
                    // console.log(params);
                    GSmartApp.Ajax.post('/api/v1/handoversku/getByHandoverProduct', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            // console.log(response);
                            HandoverSkuStore.setData(response.data);
                        }
                    }); 
                }
            }
        });
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
        if(viewModel.get('isIn')){
            HandoverSkuStore.rejectChanges();
            return;
        }
        if(context.value == context.originalValue || context.value < 0 || context.value == ''){
            HandoverSkuStore.rejectChanges();
            return;
        }
        grid.setLoading(true);
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/handoversku/updateHandoverSku', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    context.record.set('totalpackage', context.value);
                    HandoverSkuStore.commitChanges();
                    //
                    if(context.rowIdx < HandoverSkuStore.data.length - 1) {  
                        var cellediting = grid.getPlugin('cellediting');
                        cellediting.startEditByPosition({
                            row: (context.rowIdx + 1),
                            column: context.colIdx
                        });
                    }
                    // load handoverProduct grid
                    var main = Ext.getCmp('handover_cut_toprint_edit');
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
    onSpecialkey: function( text, e, eOpts ){
        if(e.keyCode == 9) e.stopEvent();
    },
})