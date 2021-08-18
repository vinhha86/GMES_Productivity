Ext.define('GSmartApp.view.stock.StockMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockMenuController',

    // destroy: function() {
    //     Ext.destroy(this.dialog);

    //     this.callParent();
    // },

    // hideDialog: function() {
    //     var dialog = this.dialog;

    //     if (dialog) {
    //         dialog.hide();
    //     }
    // },

    // showDialog: function() {
    //     var dialog = this.dialog,
    //         view;

    //     if (!dialog) {
    //         view = this.getView();
    //         dialog = Ext.apply({
    //             ownerCmp: view
    //         }, view.dialog);

    //         this.dialog = dialog = Ext.create(dialog);
    //     }

    //     dialog.show();
    // },

    // onCancel: function() {
    //     var viewModel = this.getViewModel(),
    //         node = viewModel.get('selectedNode');

    //     this.hideDialog();

    //     if (node) {
    //         node.reject();
    //     }
    // },

    // onOK: function() {
    //     this.hideDialog();
    // },

    onLeafChildTap: function(nestedlist, location) {
        var viewModel = this.getViewModel();
        var record = location.record;
        // this.showDialog();

        // dãy -> tầng -> khoang
        // row -> space -> floor
        viewModel.set('selectedNode', record);

        // if(record.get('type') == 5){ // khoang
        //     var spaceepc = record.get('spaceepc');
        //     var stockid_link = record.get('orgid_link');
        //     var WarehouseStore = viewModel.getStore('WarehouseStore');
        //     WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
        // }
        // if(record.get('type') == 3 && record.get('khoangKhongXacDinh') == true){ // khoang KXD
        //     var spaceepc = null;
        //     var stockid_link = record.get('orgid_link');
        //     var WarehouseStore = viewModel.getStore('WarehouseStore');
        //     WarehouseStore.loadBySpaceEpc(spaceepc, stockid_link);
        // }

        if(record.get('type') === 5 || record.get('khoangKhongXacDinh') === true){
            var dialog = Ext.create({
                xtype: 'dialog',
                id: 'StockMaterialList_window',
                itemId: 'StockMaterialList_window',
                title: 'DS cây vải',
                width: '100%',
                height: '100%',
                // maxWidth: 300,
                // maxHeight: 600,
                header: true,
                closable: true,
                closeAction: 'destroy',
                maximizable: false,
                maskTapHandler: function(){
                    // console.log('mask tapped');
                    if(dialog){
                        dialog.close();
                        me.setMasked(false);
                    }
                },
                bodyPadding: '1',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'StockMaterialList',
                    viewModel: {
                        data: {
                            record: record
                        }
                    }
                }],
            });
            dialog.show();
    
            // dialog.down('#StockMaterialList').getController().on('onSelectValue', function (selectValue) {
                
            //     dialog.close();
            //     // setTimeout(function(){
            //     //     viewModel.set('isStockin_ValueSelect_window_open', false);
            //     // }, 200);
            // });
        }
    }
});