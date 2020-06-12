Ext.define('GSmartApp.view.pcontract.PContractListProductViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractListProductViewCotroller',
    init: function () {

    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnExcel': {
            click: 'onExcel'
        },
        '#PContractListProductView': {
            select: 'onSelectProduct'
        }
    },
    onExcel: function(){
        var grid = this.getView();
        grid.saveDocumentAs({
            type: 'pdf',
            title: 'My export',
            fileName: 'myExport.pdf'
        });
    },
    onThemMoi: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        if (viewmodel.get('PContract.id') == 0) {
            Ext.MessageBox.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo đơn hàng trước khi chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            var viewInfo = Ext.getCmp('PContractInfoView');
            viewInfo.down('#cust_contractcode').focus();
            return;
        }

        var form =Ext.create({
            xtype: 'skusearchwindow',
            reference:'skusearchwindow',
            viewModel: {
                data: {
                    sourceview: 'PContractListProductView',
                    searchtype: 1,
                    pcontractid_link: viewmodel.get('PContract.id'),
                    orgcustomerid_link: viewmodel.get('PContract.orgcustomerid_link'),
                    type: 10
                }
            }
        });
        form.show();
    },
    onSelectProduct: function (t, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var storeAttValue = viewmodel.getStore('PContractAttValueStore');
        var storeDoc = viewmodel.getStore('PContractDocumentStore');

        var me = this.getView();
        var PContractId = me.IdPContract;
        var productid = record.data.productid_link;
        var productName = record.data.productName;

        storeAttValue.loadStore(PContractId, productid);
        storeDoc.loadStore(PContractId, productid);

        viewmodel.set('titleAttvalue', 'Thuộc tính : ' + productName);
        viewmodel.set('titleDoccument', 'Tài liệu : ' + productName);
        viewmodel.set('IdProduct', productid);
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var params = new Object();
        var rec = grid.getStore().getAt(rowIndex);
        params.id = grid.getStore().getAt(rowIndex).get('id');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa sản phẩm "' + rec.data.productName + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    GSmartApp.Ajax.post('/api/v1/pcontractproduct/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                var store = grid.getStore();
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Lưu thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                                else {
                                    store.removeAt(rowIndex);
                                }
                            }
                        })
                }
            }
        });


    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/pcontractproduct/update', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractProductStore');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        store.commitChanges();
                    }
                }
            })
    },
    onEditSoLuong: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var data = grid.getStore().getAt(rowIndex);
        var productid_link = data.get('productid_link');
        var name = data.get('productName');
        me.getSelectionModel().select(data);

        var form = Ext.create('Ext.window.Window', {
            height: 300,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Cập nhật số lượng sản phẩm ' + name,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContractProductColorView',
                IdProduct: productid_link,
                IdPContract: me.IdPContract
            }]
        });
        form.show();
    },
    viewImg: function (grid, metadata, rowIndex) {
        var me = this.getView();
        var data = grid.getStore().getAt(rowIndex);
        var id = data.get('productid_link');
        var name = data.get('productName');
        me.getSelectionModel().select(data);

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/product/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var form = Ext.create('Ext.window.Window', {
                            height: 400,
                            width: 380,
                            closable: true,
                            resizable: false,
                            modal: true,
                            border: false,
                            title: 'Ảnh sản phẩm ' + name,
                            closeAction: 'destroy',
                            bodyStyle: 'background-color: transparent',
                            layout: {
                                type: 'fit', // fit screen for window
                                padding: 5
                            },
                            items: [{
                                xtype: 'PContractImageView',
                                IdProduct: id,
                                viewModel: {
                                    data: {
                                        img: response.img
                                    }
                                }
                            }]
                        });
                        form.show();
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})