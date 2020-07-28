Ext.define('GSmartApp.view.pcontract.PContract_POController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POController',
    control: {
        'PContract_PO_ProductList': {
            itemclick: 'onSelectProduct'
        },
        'PContract_PO_List': {
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
                title: 'Đơn hàng',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            //Kiem tra xem co phai san pham con ko
            if (viewModel.get('isproductleaf')){
                Ext.Msg.show({
                    title: 'Đơn hàng',
                    msg: 'Không được thêm đơn hàng cho sản phẩm con',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            } else {
                var form = Ext.create('Ext.window.Window', {
                    closable: true,
                    resizable: false,
                    modal: true,
                    border: false,
                    title: 'Đơn hàng (PO)',
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

                form.down('PContract_PO_Edit').getController().on('Thoat',function(){
                    var storePO = viewModel.getStore('PContractProductPOStore');
                    storePO.load();
                    form.close();
                });
            }
        }

        
    },
    onSelectProduct: function(m, rec){
        // console.log(rec);
        var viewModel = this.getViewModel();
        viewModel.set('productpairid_link', rec.data.productid_link);
        if (rec.data.children.length > 0)
            viewModel.set('isproductpair', 1);
        else
            viewModel.set('isproductpair', 0);

        if (rec.data.parent_id > 0)
            viewModel.set('isproductleaf', true);
        else
            viewModel.set('isproductleaf', false);
        // var storePO = Ext.data.StoreManager.lookup('PContract_PO'); 
        var storePO = viewModel.getStore('PContractProductPOStore');
        storePO.loadStore(viewModel.get('PContract.id'), viewModel.get('productpairid_link'));
    },
    onSelectPO: function(m, rec){
        var viewModel = this.getViewModel();

        var POShippingStore = viewModel.getStore('POShippingStore');
        POShippingStore.loadStore_bypo(rec.data.id);
    },
    onPOPriceEdit: function(rec){
        // var rec = grid.getStore().getAt(rowIndex);
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Đơn hàng - Chào giá',
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

        form.down('PContract_PO_Edit').getController().on('Thoat',function(){
            var storePO = viewModel.getStore('PContractProductPOStore');
            storePO.load();
            form.close();
        });
    },
    onAccept: function(rec){
        // var rec = grid.getStore().getAt(rowIndex);
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 320,
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
                            shipdate: rec.get('shipdate'),
                            id: rec.get('id'),
                            orgbuyerid_link: viewmodel.get('PContract.orgbuyerid_link'),
                            orgid_link: rec.get('orgmerchandiseid_link'),
                            userid_link: rec.get('merchandiserid_link')
                        }
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_FormAccept').getController().on('AcceptSuccess', function(){
            var store = viewmodel.getStore('PContractProductPOStore');
            store.load();
            form.close();
        })
    },
    onXoa: function(rec){
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Đơn hàng', 'Bạn có thực sự muốn xóa Đơn hàng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var PContractProductPOStore = viewmodel.getStore('PContractProductPOStore');
                    var params=new Object();
                    params.id = rec.data.id;
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
    onAdd_SubPO: function(rec){
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin đơn hàng',
            closeAction: 'destroy',
            height: 465,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit_Info_Main',
                viewModel: {
                    data: {
                        id: null,
                        parentpoid_link: rec.data.id,
                    }
                }
            }]
        });
        form.show();   
    },
    onAdd_Shipping: function(rec){
        var viewModel = this.getViewModel();
        if (rec.data.sub_po.length > 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Không được thêm kế hoạch giao hàng cho PO cha',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        } else {
            var form = Ext.create('Ext.window.Window', {
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Kế hoạch giao hàng',
                closeAction: 'destroy',
                height: 400,
                width: 700,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'PContract_PO_Shipping_Main',
                    viewModel: {
                        data: {
                            id: null,
                            pcontract_poid_link: rec.data.id,
                        }
                    }
                }]
            });
            form.show(); 
        }
        
    },
    onEdit_Shipping: function(rec){
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Kế hoạch giao hàng',
            closeAction: 'destroy',
            height: 400,
            width: 700,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Shipping_Main',
                viewModel: {
                    data: {
                        id: rec.data.id,
                        pcontract_poid_link: rec.data.pcontract_poid_link,
                    }
                }
            }]
        });
        form.show(); 
        
    },    
    onDelete_Shipping: function(rec){
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Kế hoạch giao hàng', 'Bạn có thực sự muốn xóa kế hoạch giao hàng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var POShippingStore = viewmodel.getStore('POShippingStore');
                    var params=new Object();
                    params.id = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/po_shipping/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            POShippingStore.reload();
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
    onPOInfoEdit: function(rec){
        var viewModel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin đơn hàng',
            closeAction: 'destroy',
            height: 465,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit_Info_Main',
                viewModel: {
                    data: {
                        id: rec.data.id,
                        isedit: true
                    }
                }
            }]
        });
        form.show();        
    },
    onMenu_PO: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var ishidden_accept = record.data.status < 0 ? false: true;

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Sửa chào giá',
                // reference: 'PContract_PO_Menu_POPriceEdit',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-dollar brownIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onPOPriceEdit(record);
                },
            }, 
            {
                text: 'Sửa đơn hàng',
                // reference: 'PContract_PO_Menu_POinfoEdit',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-pencil greenIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onPOInfoEdit(record);
                }
            }, 
            {
                text: 'Xóa đơn hàng',
                // reference: 'PContract_PO_Menu_PODelete',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-trash redIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onXoa(record);
                }
            }, 
            {
                text: 'Chốt đơn hàng',
                // reference: 'PContract_PO_Menu_POAccept',
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-check violetIcon',
                // hidden: ishidden_accept,
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onAccept(record);
                }
            }, {
                text: 'Thêm đơn hàng con',
                // reference: 'PContract_PO_Menu_POSub',
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-child blueIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onAdd_SubPO(record);
                }
            }, {
                text: 'Thêm KH giao hàng',
                // reference: 'PContract_PO_Menu_POShipping',
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-ship greenIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onAdd_Shipping(record);
                }
            }
        ]
        });
          // HERE IS THE MAIN CHANGE
          var position = [e.getX()-10, e.getY()-10];
          e.stopEvent();
          menu_grid.record = record;
          menu_grid.showAt(position);
    },    
    onMenu_SubPO: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Sửa đơn hàng',
                // reference: 'PContract_PO_Menu_POinfoEdit',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-pencil greenIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onPOInfoEdit(record);
                }
            }, 
            {
                text: 'Xóa đơn hàng',
                // reference: 'PContract_PO_Menu_PODelete',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-trash redIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onXoa(record);
                }
            }, 
            {
                text: 'Thêm KH giao hàng',
                // reference: 'PContract_PO_Menu_POShipping',
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-ship greenIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onAdd_Shipping(record);
                }
            }
        ]
        });
          // HERE IS THE MAIN CHANGE
          var position = [e.getX()-10, e.getY()-10];
          e.stopEvent();
          menu_grid.record = record;
          menu_grid.showAt(position);
    },  
    onMenu_Shipping: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Sửa kế hoạch',
                // reference: 'PContract_PO_Menu_POinfoEdit',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-pencil greenIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onEdit_Shipping(record);
                }
            }, 
            {
                text: 'Xóa kế hoạch',
                // reference: 'PContract_PO_Menu_PODelete',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-trash redIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onDelete_Shipping(record);
                }
            }
        ]
        });
          // HERE IS THE MAIN CHANGE
          var position = [e.getX()-10, e.getY()-10];
          e.stopEvent();
          menu_grid.record = record;
          menu_grid.showAt(position);
    },         
});

