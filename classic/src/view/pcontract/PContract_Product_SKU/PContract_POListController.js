Ext.define('GSmartApp.view.pcontract.PContract_POListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POListController',
    control: {
        '#fileUploadPO': {
            change: 'onSelect'
        },
        '#productFilter': {
            select: 'onFilterProduct',
            change: 'onChangeProduct'
        },
        '#PO_ChildList':{
            itemclick: 'onSelectPO'
        },
        '#PContract_POList':{
            itemclick: 'onSelectParentPO'
        }
    },
    onFilterProduct: function(combo, record, eOpts ){
        // console.log(record);
        var viewmodel =  this.getViewModel();
        var store = viewmodel.getStore('PContractPOList');
        var productid_link = record.get('productid_link');
        var pcontractid_link = viewmodel.get('PContract.id');

        store.loadAccept_ByContract(pcontractid_link , productid_link);
    },
    onChangeProduct: function(m, newValue, oldValue){
        if(newValue == "" || newValue == null){
            var viewmodel =  this.getViewModel();
            var store = viewmodel.getStore('PContractPOList');            
            
            var pcontractid_link = viewmodel.get('PContract.id');
    
            store.loadAccept_ByContract(pcontractid_link , 0);
        }
        
    },
    onUpload: function (record) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontract_po_parentid_link', record.get('id'));
        var me = this.getView();
        me.down('#fileUploadPO').fileInputEl.dom.click();
    },
    onSelect: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewmodel.get('PContract.id'));
        data.append('parentid_link', viewmodel.get('pcontract_po_parentid_link'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload('/api/v1/pcontract_po/upload_po', data,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode != 200){
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải PO",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    var store = viewmodel.getStore('PContractPOList');
                    store.load();
                }
            })
    },
    onSelectParentPO: function(m, rec){
        var viewModel = this.getViewModel();
        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        productStore.removeAll();
        var storeSku = viewModel.getStore('PContractSKUStore');
        storeSku.removeAll();
        var skuView = Ext.getCmp('PContractSKUView');
        var cmbSanPham = skuView.down('#cmbSanPham');
        cmbSanPham.clearValue();


    },
    onSelectPO: function(m, rec){
        var viewModel = this.getViewModel();
        viewModel.set('pcontract_poid_link', rec.data.id);
        var productid_link = rec.data.productid_link;

        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        productStore.loadStore_bypairid_Async(productid_link, rec.data.po_quantity, true);
        productStore.load({
			scope: this,
			callback: function(records, operation, success) {
				var record = productStore.getAt(0);
                var skuView = Ext.getCmp('PContractSKUView');
                var cmbSanPham = skuView.down('#cmbSanPham');
                cmbSanPham.select(record);
                viewModel.set('IdProduct', record.get('id'));
                viewModel.set('Product_pquantity', record.data.pquantity); 
                // console.log(record);
                //clear sku list
                var storeSku = viewModel.getStore('PContractSKUStore');
                storeSku.removeAll();
                storeSku.loadStoreByPO_and_Product(record.get('id'), rec.data.id);
			}
		});
    },
    onThemPO: function (rec) {
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới PO',
            closeAction: 'destroy',
            height: 400,
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
                            pcontractid_link: viewmodel.get('PContract.id'),
                            parentpoid_link: rec == null ? 0 : rec.data.id
                        },
                        productid_link: viewmodel.get('IdProduct_filterPO'),

                    }
                }
            }]
        });
        form.show();

        form.down('#InsertPO_Main').down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            var storePO = viewmodel.getStore('PContractPOList');
            storePO.load();
            form.close();
        })
    },
    onXoaPO: function (rec) {
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Đơn hàng', 'Bạn có thực sự muốn xóa Đơn hàng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var PContractPOList = viewmodel.getStore('PContractPOList');
                    var params = new Object();
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
            });
    },
    onEdit: function (rec) {
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin PO',
            closeAction: 'destroy',
            height: 400,
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

        form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            var storePO = viewModel.getStore('PContractPOList');
            storePO.load();

            var store_porder_req = viewModel.getStore('porderReqStore');
            var po_id = rec.get('id');
            store_porder_req.loadByPO(po_id);
            form.close();
        })
    },
    onFOBPO: function (rec) {
        console.log(rec);
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin FOB',
            closeAction: 'destroy',
            height: 400,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'FOBPricePODetail',
                viewModel: {
                    data: {
                        record: rec
                    }
                }
            }]
        });
        form.show();
    },
    onMenu_PO: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            minWidth: 150,
            items: [
                {
                    text: 'Sửa PO',
                    itemId: 'btnEditPO_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-pencil brownIcon',
                    handler: function () {
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
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onXoaPO(record);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    onMenu_PO_Parent: function(grid, rowIndex, colIndex, item, e, record){
        var me = this;

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            minWidth: 150,
            items: [
                {
                    text: 'Thêm PO',
                    itemId: 'btnInsert_PO',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-plus brownIcon',
                    handler: function () {
                        me.onThemPO(record);
                    }
                },
                {
                    text: 'Tải DS PO',
                    itemId: 'btnUpload_PO',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-upload brownIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        if(record.get('po_buyer') == 'TBD'){
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Bạn không được upload cho PO có mã TBD! Bạn phải cập nhật số PO trước khi upload",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                        else {
                            me.onUpload(record);
                        }
                    }
                },
                {
                    text: 'Chi tiết FOB',
                    itemId: 'btnDetailFOB_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-book greenIcon',
                    handler: function () {
                        me.onFOBPO(record.data);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    renderShipping: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewmodel = this.getViewModel();
            var ShipModeStore = viewmodel.getStore('ShipModeStore');
            if (null!=ShipModeStore){
                var objUnit = ShipModeStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.name;
            }
        }
     },
     onPOListEdit: function(editor, e){
        if (e.originalValue != e.value){
            e.record.data[e.field] = e.value;
            var params=new Object();
            params.data = e.record.data;
            console.log(params);
            GSmartApp.Ajax.post('/api/v1/pcontract_po/update', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success){
                    e.record.commit();
                } 
                else {
                    Ext.MessageBox.show({
                        title: "PO",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });                        
        }
    }
})