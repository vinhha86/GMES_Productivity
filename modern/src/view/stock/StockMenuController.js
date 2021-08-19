Ext.define('GSmartApp.view.stock.StockMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockMenuController',

    control: {
        '#StockMenu': {
            leafchildtap: 'onLeafChildTap',
            itemtap : 'onItemTap'
        },
    },

    onItemTap: function(nestedList, list, index, target, record, e, eOpts){
        var viewModel = this.getViewModel();
        if(viewModel.get('root') == null){
            viewModel.set('root', record);
        }
        // console.log(record);
    },
    onLeafChildTap: function(nestedlist, location) { 
        // console.log(location);
        // console.log(location.record);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var record = location.record;
        // this.showDialog();

        // dãy -> tầng -> khoang
        // row -> space -> floor
        viewModel.set('selectedNode', record);

        var maHangFilter = viewModel.get('maHangFilter');
        var donHangFilter = viewModel.get('donHangFilter');

        if(record.get('type') === 5 || record.get('khoangKhongXacDinh') === true){
            var dialog = Ext.create({
                xtype: 'dialog',
                id: 'StockMaterialList_window',
                itemId: 'StockMaterialList_window',
                title: 'DS cây vải',
                width: '100%',
                height: '100%',
                zIndex: 1,
                // maxWidth: 300,
                // maxHeight: 600,
                header: true,
                closable: true,
                closeAction: 'destroy',
                maximizable: false,
                maskTapHandler: function(){
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
                    xtype: 'StockMaterialList_Main',
                    // xtype: 'StockMaterialList',
                    viewModel: {
                        data: {
                            record: record,
                            maHangFilter: maHangFilter,
                            donHangFilter: donHangFilter,
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