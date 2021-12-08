Ext.define('GSmartApp.view.dashboard_kho.StockoutOrderMaterialViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockoutOrderMaterialViewController',
    init: function () {
        
    },
    control: {
        '#StockoutOrderMaterialView': {
            afterrender: 'onAfterrender',
            itemdblclick: 'onItemdblclick',
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.getSorters().add({
            property: 'porder_product_buyercode',
            direction: 'ASC'
        },{
            property: 'skuCode',
            direction: 'ASC'
        },{
            property: 'stockout_order_code',
            direction: 'ASC'
        });
    },
    onItemdblclick: function(grid, record, item, index, e, eOpts){
        // return;
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var eventRecord = viewModel.get('eventRecord');
        // var porder_grantid_link = viewModel.get('porder_grantid_link');

        // console.log(record);
        var id = record.get('id');
        var porder_grantid_link = record.get('porder_grantid_link');
        // console.log(rec);
        // return;

        // popup
        var form = Ext.create('Ext.window.Window', {
			height: '90%',
            width: '95%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Yêu cầu xuất',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_View',
                viewModel:{
                    data: {
                        id: id, // stockout_order id
                        // date_list: date_list,
                        pordergrantid_link: porder_grantid_link,
                        // eventRecord: eventRecord
                    }
                }
			}]
		});
		form.show();

		form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('Thoat', function () {
			form.close();
		})
        form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('saveStockoutOrder', function () {
			// code here: reload store ...
            var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
            Stockout_order_Store.load();
            // form.close();
		})
        return;
    },
    onChiTietLenhCapVai: function (grid, rowIndex, colIndex) {
        // return;
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        var rec = Stockout_order_Store.getAt(rowIndex);
        var id = rec.get('id');
        var porder_grantid_link = rec.get('porder_grantid_link');
        // console.log(rec);
        // return;

        // popup
        var form = Ext.create('Ext.window.Window', {
			height: '90%',
            width: '95%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Yêu cầu xuất',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_View',
                viewModel:{
                    data: {
                        id: id, // stockout_order id
                        // date_list: date_list,
                        pordergrantid_link: porder_grantid_link,
                        // eventRecord: eventRecord
                    }
                }
			}]
		});
		form.show();

		form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('Thoat', function () {
			form.close();
		})
        form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('saveStockoutOrder', function () {
			// code here: reload store ...
            var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
            Stockout_order_Store.load();
            // form.close();
		})
    },
    onTaoPhieuXuatVai: function(grid, rowIndex, colIndex){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        var rec = Stockout_order_Store.getAt(rowIndex);
        var id = rec.get('id');
        var porder_grantid_link = rec.get('porder_grantid_link');
        // console.log(rec);
        // return;

        // xuat to cat
        var stockoutorderidObj = new Object();
        stockoutorderidObj.id = id;
        GSmartApp.util.State.set('stockoutorderidObj', stockoutorderidObj);
        m.redirectTo('stockout_m/1/create');

        // var params = new Object();
        // params.id = id;

        // me.setLoading(true);

        // GSmartApp.Ajax.postJitin('/api/v1/stockoutorder/getById', Ext.JSON.encode(params),
        //     function (success, response, options) {
        //         me.setLoading(false);
        //         if (success) {
        //             var response = Ext.decode(response.responseText);
        //             // console.log(response);
        //             var stockout_order = response.data;
        //             GSmartApp.util.State.set('stockout_order_tempObj', stockout_order);
        //             m.redirectTo('stockout_m/1/create');
        //         } else {
        //             Ext.Msg.show({
        //                 title: "Thông báo",
        //                 msg: "Lấy thông tin thất bại",
        //                 buttons: Ext.MessageBox.YES,
        //                 buttonText: {
        //                     yes: 'Đóng',
        //                 }
        //             });
        //         }
        //     })
    },
})