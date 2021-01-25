Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverDetail.HandoverDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverDetailController',
    init: function() {
        
    },
    control: {
        '#handover_cut_toline_detail': {
            childtap: 'onChildTapCutToLineDetail'
        }
    },
    onChildTapCutToLineDetail: function ( list, location, eOpts ) {
        var me = this;
        var viewModel = this.getViewModel();
        
        var record = location.record;
        // console.log(record);
        var recordTotalpackage = record.get('totalpackage');

        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            // title: 'Số lượng',
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
            bodyPadding: '5 20 5 20',
            maxWidth: 300,
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'HandoverSkuAmount',
                viewModel: {
                    data: {
                        totalpackage: recordTotalpackage
                    }
                }
            }],
            listeners: {
                
            }
        });
        dialog.show();

        // get event
        dialog.down('#HandoverSkuAmount').getController().on('Luu', function (recordTotalpackage) {
            var handoverProduct = viewModel.get('handoverProduct');
            if(recordTotalpackage == null){
                recordTotalpackage == 0
            }
            record.set('totalpackage', recordTotalpackage);
            if(handoverProduct){
                var handoverProductTotalPackage = 0;
                var handoverSKUs = handoverProduct.handoverSKUs;
                if(handoverSKUs || handoverSKUs.length > 0){
                    for(var i = 0; i < handoverSKUs.length; i++){
                        var handoverSKU = handoverSKUs[i];
                        var handoverSKUTotalPackage = handoverSKU.totalpackage;
                        if(handoverSKUTotalPackage == null){
                            handoverSKUTotalPackage = 0;
                        }
                        handoverProductTotalPackage+=handoverSKUTotalPackage;
                    }
                }
                // handoverProduct.totalpackage = null;
                // handoverProduct.totalpackage = handoverProductTotalPackage;
                viewModel.set('handoverProduct.totalpackage', handoverProductTotalPackage);
                // console.log(handoverProductTotalPackage);
            }
            
            dialog.close();
        });

        dialog.down('#HandoverSkuAmount').getController().on('Thoat', function () {
            dialog.close();
        });
    },

});
