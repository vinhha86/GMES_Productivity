Ext.define('GSmartApp.view.stock.stock_material.StockMaterialList_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.StockMaterialList_MainController',
	init: function () {

	},
	control: {
        '#btnChuyenKhoang':{
            tap: 'onBtnChuyenKhoang'
        },
	},
    onBtnChuyenKhoang: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var StockMaterialList = me.down('#StockMaterialList');
        var selectable = StockMaterialList.getSelectable();
        var selection = selectable.getSelection().getSelected();

        // console.log(selection);

        if(selection.length == 0){
            Ext.toast('Bạn cần chọn cây vải', 1000);
            return;
        }else{
            m.showStockListWindow(selection);
        }
        // console.log(selectionModel.getSelection());    
    },
    showStockListWindow: function(selection){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var dialog = Ext.create({
            xtype: 'dialog',
            // id: 'StockMenuWindow_Main_dialog',
            itemId: 'StockMenuWindow_Main_dialog',
            title: 'DS khoang',
            width: '100%',
            height: '100%',
            zIndex: 2,
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
                xtype: 'StockMenuWindow_Main',
                // xtype: 'StockMaterialList',
                viewModel: {
                    data: {
                        // selection: selection
                    }
                }
            }],
        });
        dialog.show();

        dialog.down('#StockMenuWindow_Main').getController().on('SelectStock', function (selectedStock) {
            // console.log(selection);
            // console.log(selectedStock);
            var selectionList = new Array();
            for(var i = 0; i < selection.items.length; i++) {
                selectionList.push(selection.items[i].data);
            }

            var stockTreeObj = new Object();
            stockTreeObj.floorid = selectedStock.floorid;
            stockTreeObj.name = selectedStock.name;
            stockTreeObj.orgid_link = selectedStock.orgid_link;
            stockTreeObj.rowid_link = selectedStock.rowid_link;
            stockTreeObj.spaceepc = selectedStock.spaceepc;
            stockTreeObj.spacename = selectedStock.spacename;

            var params = new Object();
            params.selection = selectionList;
            params.selectedStock = stockTreeObj;

            GSmartApp.Ajax.postJitin('/api/v1/stock/change_stock', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            var WarehouseStore = viewModel.getStore('WarehouseStore');
                            WarehouseStore.load();
                            dialog.close();
                        }else{
                            Ext.toast("Lưu chuyển khoang thất bại", 1000);
                        }
                    } else {
                        Ext.toast("Lưu chuyển khoang thất bại", 1000);
                    }
                })
        });

        // var form = Ext.create('Ext.window.Window', {
        //     closable: true,
        //     resizable: false,
        //     modal: true,
        //     border: false,
        //     title: 'Danh sách khoang',
        //     closeAction: 'destroy',
        //     height: 500,
        //     width: 340,
        //     bodyStyle: 'background-color: transparent',
        //     layout: {
        //         type: 'fit', // fit screen for window
        //         padding: 5
        //     },
        //     items: [{
        //         xtype: 'StockMenuWindow',
        //         viewModel: {
        //             data: {
        //                 selection: selection
        //             }
        //         }
        //     }]
        // });
        // form.show();

        // form.down('StockMenuWindow').getController().on('SelectStock', function (selectedStock) {
        //     // console.log(selection);
        //     // console.log(selectedStock);

        //     var selectionList = new Array();
        //     for(var i = 0; i < selection.length; i++) {
        //         selectionList.push(selection[i].data);
        //     }

        //     var stockTreeObj = new Object();
        //     stockTreeObj.floorid = selectedStock.floorid;
        //     stockTreeObj.name = selectedStock.name;
        //     stockTreeObj.orgid_link = selectedStock.orgid_link;
        //     stockTreeObj.rowid_link = selectedStock.rowid_link;
        //     stockTreeObj.spaceepc = selectedStock.spaceepc;
        //     stockTreeObj.spacename = selectedStock.spacename;

        //     var params = new Object();
        //     params.selection = selectionList;
        //     params.selectedStock = stockTreeObj;

        //     GSmartApp.Ajax.postJitin('/api/v1/stock/change_stock', Ext.JSON.encode(params),
        //         function (success, response, options) {
        //             if (success) {
        //                 var response = Ext.decode(response.responseText);
        //                 if (response.respcode == 200) {
        //                     var WarehouseStore = viewModel.getStore('WarehouseStore');
        //                     WarehouseStore.load();
        //                 }else{
        //                     Ext.Msg.show({
        //                         title: 'Thông báo',
        //                         msg: "Lưu chuyển khoang thất bại",
        //                         buttons: Ext.MessageBox.YES,
        //                         buttonText: {
        //                             yes: 'Đóng'
        //                         }
        //                     });
        //                 }
        //             } else {
        //                 Ext.Msg.show({
        //                     title: 'Thông báo',
        //                     msg: "Lưu chuyển khoang thất bại",
        //                     buttons: Ext.MessageBox.YES,
        //                     buttonText: {
        //                         yes: 'Đóng'
        //                     }
        //                 });
        //             }
        //         })
        //     form.close();
        // });
    }
})