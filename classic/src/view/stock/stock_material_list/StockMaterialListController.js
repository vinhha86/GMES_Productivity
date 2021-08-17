Ext.define('GSmartApp.view.stock.stock_material_list.StockMaterialListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockMaterialListController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnChuyenKhoang': {
            click: 'onBtnChuyenKhoang'
        },
    },
    onloadPage: function(){
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.getSorters().add({
            property: 'skucode',
            direction: 'ASC'
        },{
            property: 'contractcode',
            direction: 'ASC'
        },{
            property: 'lotnumber',
            direction: 'ASC'
        },{
            property: 'packageid',
            direction: 'ASC'
        });
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    onBtnChuyenKhoang: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        var selectionModel = me.getSelectionModel();
        var selection = selectionModel.getSelection();

        if(selection.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn cây vải',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
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

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách khoang',
            closeAction: 'destroy',
            height: 500,
            width: 340,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'StockMenuWindow',
                viewModel: {
                    data: {
                        selection: selection
                    }
                }
            }]
        });
        form.show();

        form.down('StockMenuWindow').getController().on('SelectStock', function (selectedStock) {
            // console.log(selection);
            // console.log(selectedStock);

            var selectionList = new Array();
            for(var i = 0; i < selection.length; i++) {
                selectionList.push(selection[i].data);
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
                        }else{
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: "Lưu chuyển khoang thất bại",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: "Lưu chuyển khoang thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                })
            form.close();
        });
    }
})