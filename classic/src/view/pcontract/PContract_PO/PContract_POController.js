Ext.define('GSmartApp.view.pcontract.PContract_POController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POController',
    control: {
        'PContract_PO_ProductList': {
            itemclick: 'onSelectProduct'
        },
        'PContract_POList': {
            itemclick: 'onSelectPO'
        }
    },
    onFactoriesTap: function(){
        var panel_factories = this.getView().items.get('panel_factories');
        console.log(panel_factories);
        if (null != panel_factories){
            if (panel_factories.getHidden())
            panel_factories.setHidden(false);
            else
            panel_factories.setHidden(true);
        }
    },
    onAddPOTap: function(){
        var viewModel = this.getViewModel();
        if(viewModel.get('productpairid_link') == 0){
            Ext.Msg.show({
                title: 'Bạn chưa chọn sản phẩm',
                msg: null,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Kế hoạch giao hàng',
                closeAction: 'destroy',
                height: Ext.getBody().getViewSize().height*.95,
                width: Ext.getBody().getViewSize().width*.95,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'PContract_PO_Edit',
                    viewModel: {
                        data: {
                            id: null,
                            productpairid_link: viewModel.get('productpairid_link'),
                            isproductpair: viewModel.get('isproductpair'),
                            pcontractid_link: viewModel.get('PContract.id')
                        }
                    }
                }]
            });
            form.show();
        }

        
    },
    onSelectProduct: function(m, rec){
        var viewModel = this.getViewModel();
        viewModel.set('productpairid_link', rec.data.productid_link);
        if (rec.data.children.length > 0)
            viewModel.set('isproductpair', 1);
        else
            viewModel.set('isproductpair', 0);

        var storePO = viewModel.getStore('PContractProductPOStore');
        storePO.loadStore(viewModel.get('PContract.id'), viewModel.get('productpairid_link'));
    },
    onSelectPO: function(m, rec){
        var viewModel = this.getViewModel();
        console.log(rec.data);
        var productid_link = rec.data.productid_link;

        var productStore = viewModel.getStore('PContractProductStore');
        productStore.loadStore_bypairid(productid_link);
    },
    onEdit: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Kế hoạch giao hàng',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height*.95,
            width: Ext.getBody().getViewSize().width*.95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit',
                viewModel: {
                    data: {
                        id: rec.data.id,
                        productpairid_link: viewModel.get('productpairid_link'),
                        isproductpair: viewModel.get('isproductpair'),
                        pcontractid_link: viewModel.get('PContract.id')
                    }
                }
            }]
        });
        form.show();
    },
    onAccept: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var viewModel = this.getViewModel();
        
        if(rec.get('status') == 1) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'PO đã được xác nhận',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var form = Ext.create('Ext.window.Window', {
                height: 350,
                closable: true,
                title: 'Chốt PO',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 400,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'PContract_PO_FormAccept',
                    viewModel: {
                        data: {
                            po: {
                                po_quantity: rec.get('po_quantity'),
                                po_buyer: rec.get('po_buyer'),
                                po_vendor: rec.get('po_vendor'),
                                shipdate: rec.get('shipdate')
                            }
                        }
                    }
                }]
            });
            form.show();
        }
    },
    onXoa: function(rid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Kế hoạch giao hàng', 'Bạn có thực sự muốn xóa Kế hoạch giao hàng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var PContractProductPOStore = viewmodel.getStore('PContractProductPOStore');
                    var record = PContractProductPOStore.getAt(rowIndex);
                    var params=new Object();
                    params.id = record.data.id;
                    GSmartApp.Ajax.post('/api/v1/pcontract_po/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            PContractProductPOStore.reload();
                        } else {
                            Ext.MessageBox.show({
                                title: "Kế hoạch giao hàng",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    }); 
                }
            } );        
    },
});

