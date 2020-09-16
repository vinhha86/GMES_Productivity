Ext.define('GSmartApp.view.pcontract.PContract_POListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POListController',
    onPOBuyerFilterKeyup:function(){
        var grid = this.getView(),
            filterField = this.lookupReference('POBuyerFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.POBuyerFilter = filters.add({
                id: 'POBuyerFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.POBuyerFilter) {
            filters.remove(this.POBuyerFilter);
            this.POBuyerFilter = null;
        }
    },
    onThemPO: function(){
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới PO',
            closeAction: 'destroy',
            height: 550,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'InsertPO_Main',
                viewModel: {
                    data: {
                        po: {
                            pcontractid_link: viewmodel.get('PContract.id')
                        },
                        productid_link: viewmodel.get('IdProduct_filterPO')
                    }
                }
            }]
        });
        form.show();    

        form.down('#InsertPO_Main').down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function(){
            var storePO = viewmodel.getStore('PContractPOList');
            storePO.load();
            form.close();
        })
    },
    onXoaPO: function(rec){
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Đơn hàng', 'Bạn có thực sự muốn xóa Đơn hàng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var PContractPOList = viewmodel.getStore('PContractPOList');
                    var params=new Object();
                    params.id = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/pcontract_po/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            PContractPOList.reload();
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
    onEdit: function(rec){
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin PO',
            closeAction: 'destroy',
            height: 350,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit_Info_Main',
                viewModel: {
                    type: 'PContract_PO_Edit_Info_Main_ViewModel',
                    data: {
                        id: rec.data.id,
                        isedit: true,
                        productpairid_link: rec.get('productid_link')
                    }
                }
            }]
        });
        form.show();        

        form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function(){
            var storePO = viewModel.getStore('PContractPOList');
            storePO.load();
            form.close();
        })
    },
    onMenu_PO: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Sửa PO',
                itemId: 'btnEditPO_PContract_POList',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-pencil brownIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onEdit(record);
                },
            }, 
            {
                text: 'Xóa PO',
                itemId: 'btnDelPO_PContract_POList',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-trash redIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onXoaPO(record);
                }
            }
        ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX()-10, e.getY()-10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },        
})