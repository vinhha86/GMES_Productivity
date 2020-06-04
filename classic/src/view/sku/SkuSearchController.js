Ext.define('GSmartApp.view.sku.SkuSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.skusearch',
    onActivate: function () {
        var viewModel = this.getViewModel();
        var producttypeStore = viewModel.getStore('ProductTypeStore');

        if (viewModel.get('searchtype') == 0)
            producttypeStore.getAll();
        else if (viewModel.get('searchtype') == 1)
            producttypeStore.getall_CompleteProductTypes();
        else if (viewModel.get('searchtype') == 2)
            producttypeStore.getall_MainMaterialTypes();
        else if (viewModel.get('searchtype') == 3)
            producttypeStore.getall_SubMaterialTypes();
        else if (viewModel.get('searchtype') == 4)
            producttypeStore.getall_MaterialTypes();
        else if(viewModel.get('searchtype') == 5)
            producttypeStore.get_not_type_product();
        if (null != viewModel.get('skucode')) {
            var store_sku = Ext.data.StoreManager.lookup('store_sku');
            if (null != store_sku && viewModel.get('skucode').length > 0) {
                store_sku.loadByCode(viewModel.get('skucode'));
            }
        }
   
        if(viewModel.get('productid_link') != 0){
            var SkuStore = viewModel.getStore('SkuStore');
            var productid_link = viewModel.get('productid_link');
            SkuStore.loadByProduct(productid_link);

            var SkuAtributesStore = this.getViewModel().getStore('SkuAtributesStore');    
            SkuAtributesStore.loadDefaultAttr(10);

            this.onSearchButton();
        }
        else if (viewModel.get('sourceview') == 'PContractListProductView'){
            var SkuAtributesStore = this.getViewModel().getStore('SkuAtributesStore');        
            SkuAtributesStore.loadDefaultAttr(10);
            this.onSearchButton();
        }
    },
    control: {
        '#btnChonSanPham': {
            click: 'createPContractProduct'
        }
    },
    onCreateSKU: function(){
        var viewmodel = this.getViewModel();

        var params = new Object();
        params.productid_link = viewmodel.get('productid_link_notsearch');

        params.listMau = listMau;
        params.listCo = listCo;
        params.msgtype = "PCONTRACT_PRODUCT_ATTRIBUTE_CREATE";
        params.message = "Tạo thuộc tính sản phẩm đơn hàng";

        GSmartApp.Ajax.post('/api/v1/productattribute/createvalue_fromsearch', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        mainView = Ext.getCmp('PContractAttributeView');
                        mainView.getStore().load();

                        SKUView = Ext.getCmp('PContractSKUView');
                        SKUView.getStore().load();

                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onSearchButton: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();

        skusearch_ProductType = viewmodel.get('type');
        skusearch_code = me.down('#SkuSearchCriteria').lookupReference('skusearch_code').getValue();
        skusearch_partnercode = me.down('#SkuSearchCriteria').lookupReference('skusearch_partnercode').getValue();
        productid_link = viewmodel.get('productid_link');
        orgcustomerid_link = viewmodel.get('orgcustomerid_link');
        var SkuAtributesStore = viewmodel.getStore('SkuAtributesStore');
        var ProductStore = viewmodel.getStore('ProductStore');
        var SkuStore = viewmodel.getStore('SkuStore');
        ProductStore.removeAll();
        SkuStore.removeAll();

        var attributes =new Array();
        Ext.Array.each(SkuAtributesStore.data.items, function(rc) {
            if (rc.data.selectedids != '')
                attributes.push(rc.data);
        });
        ProductStore.loadFilter(
            skusearch_ProductType,
            skusearch_code,
            skusearch_partnercode,
            attributes,
            productid_link,
            orgcustomerid_link
        )
   
    },
    onCloseButton: function () {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function (button) {
        var viewModel = this.getViewModel();
        if (viewModel.get('sourceview') == 'stockoutforcheck') {
            this.createStockoutForCheck();
        }
        //Tab san pham trong don hang
        if (viewModel.get('sourceview') == 'PContractListProductView') {
            this.createPContractProduct_WithSKU();
        }
        //Tab phan loai san pham trong don hang
        if (viewModel.get('sourceview') == 'PContractSKU_ListProductView') {
            this.createPContractProductSKU();
        }   
        //Tab nguyen phu lieu trong don hang
        if (viewModel.get('sourceview') == 'PContractProductBomView') {
            this.createContractBOM();
        } 
        
        //Invoice
        if (viewModel.get('sourceview') == 'InvoiceEdit_D') {
            this.InsertSKU_to_invoice();
        } 
    },
    createPContractProduct: function () {
        var me = this.getView().down('#ProductList');
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('pcontractid_link');
        var select = me.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var listIdProduct = [];
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                listIdProduct.push(data.id);
            }
            params.listIdProduct = listIdProduct;

            GSmartApp.Ajax.post('/api/v1/pcontractproduct/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Có lỗi trong quá trình chọn sản phẩm',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else {
                            var viewProduct = Ext.getCmp('PContractListProductView');
                            viewProduct.getStore().load();
                            me.up('window').close();
                        }
                    }
                })
        }
    },
    createPContractProduct_WithSKU: function () {
        var me = this.getView().down('#grid_skusearch');
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('pcontractid_link');
        params.productid_link = viewModel.get('productid_link_notsearch');
        var select = me.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn SKU',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var listskuid_link = [];
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                listskuid_link.push(data.id);
            }
            params.listskuid = listskuid_link;

            GSmartApp.Ajax.post('/api/v1/pcontractproduct/create_with_sku', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Có lỗi trong quá trình chọn sản phẩm',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else {
                            var viewProduct = Ext.getCmp('PContractListProductView');
                            viewProduct.getStore().load();

                            var storeAttValue = Ext.getCmp('PContractAttributeView').getStore();
                            storeAttValue.loadStore(viewModel.get('pcontractid_link'), viewModel.get('productid_link_notsearch'));

                            //load lai ds sku
                            var storeSKU = Ext.getCmp('PContractSKUView').getStore();
                            storeSKU.loadStore(viewModel.get('pcontractid_link'), viewModel.get('productid_link_notsearch'));

                            me.up('window').close();
                        }
                    }
                })
        }
    },
    InsertSKU_to_invoice: function () {
        var me = this.getView().down('#grid_skusearch');
        var viewModel = this.getViewModel();
        var params = new Object();

        params.invoiceid_link = viewModel.get('invoiceid_link');
        var select = me.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn SKU',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var listskuid_link = [];
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                listskuid_link.push(data.id);
            }
            params.list_skuid_link = listskuid_link;

            GSmartApp.Ajax.post('/api/v1/invoice/invoice_insertsku', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Có lỗi trong quá trình chọn NPL',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else {
                            var viewInvoice = Ext.getCmp('InvoiceEdit');
                            viewInvoice.getController().getInfo(params.invoiceid_link);

                            me.up('window').close();
                        }
                    }
                })
        }
    },
    createPContractProductSKU: function () {
        var me = this.getView().down('#grid_skusearch');
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('pcontractid_link');
        params.productid_link = viewModel.get('productid_link_notsearch');
        var select = me.getSelectionModel().getSelection();

        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn SKU',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var listskuid_link = [];
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;
                listskuid_link.push(data.id);
            }
            params.listskuid_link = listskuid_link;

            GSmartApp.Ajax.post('/api/v1/pcontractsku/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: 'Có lỗi trong quá trình chọn sản phẩm',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else {
                            //load lai ds san pham
                            var viewProduct = Ext.getCmp('PContractSKUView');
                            viewProduct.getStore().load();

                            //load lai danh sach thuoc tinh
                            var storeAttValue = Ext.getCmp('PContractAttributeView').getStore();
                            storeAttValue.loadStore(viewModel.get('pcontractid_link'), viewModel.get('productid_link_notsearch'));

                            //load lai ds sku
                            var storeSKU = Ext.getCmp('PContractSKUView').getStore();
                            storeSKU.loadStore(viewModel.get('pcontractid_link'), viewModel.get('productid_link_notsearch'));

                            me.up('window').close();
                        }
                    }
                })
        }
    },
    createContractBOM: function () {
        var viewModel = this.getViewModel();
        var pcontractid_link = viewModel.get('pcontractid_link');
        var productid_link = viewModel.get('productid_link_notsearch');

        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            var params = new Object();
            var data = [];
            for (var i = 0; i < records.length; i++) {
                data.push(records[i].data.id);
            }
            params.productid_link = productid_link;
            params.pcontractid_link = pcontractid_link;
            params.listnpl = data;

            GSmartApp.Ajax.post('/api/v1/pcontractproductbom/create_pcontract_productbom', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var storebom = Ext.getCmp('PContractProductBomView').getStore();
                        storebom.loadStore(pcontractid_link, productid_link);

                        var storebomcolor = Ext.getCmp('PContractView').getViewModel().getStore('PContractBomColorStore');
                        storebomcolor.load();

                        var mywin = Ext.WindowManager.getActive();
                        if (mywin) {
                            mywin.close();
                        }
                    } else {
                        Ext.MessageBox.show({
                            title: "Đơn hàng",
                            msg: "Lỗi thêm nguyên phụ liệu, liên hệ kỹ thuật để trợ giúp",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        }
    },
    createStockoutForCheck: function () {
        var viewModel = this.getViewModel();
        var grid_skusearch = this.getView().items.get('grid_skusearch');
        var records = grid_skusearch.getSelection();
        if (records.length > 0) {
            console.log(records[0].get('code'));
            var params = new Object();
            var stockout = new GSmartApp.model.Stockout({
                id: -1,
                orgrootid_link: null,
                stockoutorderid_link: null,
                stockoutcode: null,
                stockoutdate: viewModel.get('stockoutdate'),
                stockouttypeid_link: viewModel.get('stockouttypeid_link'),
                orgid_from_link: null,
                orgid_to_link: null,
                porderid_link: null,
                pordercode: null,
                shipperson: null,
                totalpackage: null,
                totalyds: null,
                totalpackagecheck: null,
                totalydscheck: null,
                totalpackageprocessed: null,
                totalydsprocessed: null,
                totalm3: null,
                totalnetweight: null,
                totalgrossweight: null,
                p_skuid_link: records[0].get('id'),
                p_skucode: records[0].get('code'),
                extrainfo: null,
                status: null,
                usercreateid_link: null,
                timecreate: null,
                lastuserupdateid_link: null,
                lasttimeupdate: null
            });
            params.data = stockout.data;
            params.skudata = records[0].data;


            GSmartApp.Ajax.post('/api/v1/stockout/createstockoutforcheck_withsku', Ext.JSON.encode(params),
                function (success, response, options) {
                    var response = Ext.decode(response.responseText);
                    if (success) {
                        var store_stockout_d_forcheck = Ext.data.StoreManager.lookup('store_stockout_d_forcheck');
                        if (store_stockout_d_forcheck) {
                            store_stockout_d_forcheck.reload();
                        }
                        var mywin = Ext.WindowManager.getActive();
                        if (mywin) {
                            mywin.close();
                        }
                    } else {
                        Ext.MessageBox.show({
                            title: "Kiểm đo/Khử co",
                            msg: "Thẻ vải không đúng",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                });
        }
    },
    onProductItemSelected: function (sender, record) {
        // console.log(record.get('id'));
        var viewModel = this.getViewModel();
        var SkuStore = viewModel.getStore('SkuStore');
        if (record.get('id') > 0) {
            //Chỉ gán khi tìm kiếm sản phẩm
            if(viewModel.get('searchtype') == 1){
                viewModel.set('productid_link_notsearch', record.data.id);
            }
            SkuStore.loadByProduct(record.get('id'));
        }
    },
    onCreateProduct: function(){
        var form = Ext.create('Ext.window.Window', {
            height: 500,
            closable: true,
            title: 'Thêm mới sản phẩm',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 1200,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'ProductDetailView',
                viewModel: {
                    data: {
                        btnQuayLai: true
                    }
                }
            }]
        });
        form.show();

        form.down('#ProductDetailView').on('CreateProduct', function () {
            
            form.close();
        })
    }
});
