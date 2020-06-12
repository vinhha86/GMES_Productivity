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
                            productpairid_link: viewModel.get('productpairid_link'),
                            pcontractid_link: viewModel.get('PContract.id'),
                            plan: {
                                id: null,
                                pcontractid_link: viewModel.get('PContract.id'),
                                productid_link: viewModel.get('productpairid_link')
                            }
                        }
                    }
                }]
            });
            form.show();
        }

        
    },
    onSelectProduct: function(m, rec){
        var viewModel = this.getViewModel();
        viewModel.set('productpairid_link', rec.data.id);

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
                        productpairid_link: viewModel.get('productpairid_link'),
                        pcontractid_link: viewModel.get('PContract.id'),
                        plan: {
                            id: rec.data.id,
                            pcontractid_link: viewModel.get('PContract.id'),
                            productid_link: viewModel.get('productpairid_link')
                        }
                    }
                }
            }]
        });
        form.show();
    }
});

