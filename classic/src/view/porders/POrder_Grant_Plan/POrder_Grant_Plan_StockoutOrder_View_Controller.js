Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_StockoutOrder_View_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_StockoutOrder_View_Controller',
    init: function () {
        
    },
    control: {
        '#POrder_Grant_Plan_StockoutOrder_View': {
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
            property: 'stockout_order_code',
            direction: 'ASC'
        });
    },
    onItemdblclick: function(grid, record, item, index, e, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        // console.log(record);
        var id = record.get('id');
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
                        eventRecord: eventRecord
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
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        var rec = Stockout_order_Store.getAt(rowIndex);
        var id = rec.get('id');
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
                        eventRecord: eventRecord
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
})