Ext.define('GSmartApp.view.pcontract.PContractPairProductViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractPairProductViewCotroller',
    init: function () {
        // var me = this.getView();
        common.Check_Object_Permission();
    },
    control: {
        '#btnPair_PContractPairProductView': {
            click: 'onThemMoi'
        }
    },
    onThemMoi: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var pcontractid_link = viewmodel.get('PContract').id;

        if (pcontractid_link == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo đơn hàng trước khi ghép bộ sản phẩm',
                buttons: [{
                    itemId: 'cancel',
                    text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                }]
            });
            var viewInfo = Ext.getCmp('PContractInfoView');
            viewInfo.down('#cust_contractcode').focus();
            return;
        }

        var form = Ext.create('Ext.window.Window', {
            height: 300,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách sản phẩm',
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContractProductPairInsertView',
                pcontractid_link: pcontractid_link,
                productpairid_link: 0
            }]
        });
        form.show();
    },
    onEdit: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var pcontractid_link = viewmodel.get('PContract').id;
        var productpairid_link = grid.getStore().getAt(rowIndex).get('productpairid_link');

        var form = Ext.create('Ext.window.Window', {
            height: 300,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chi tiêt bộ sản phẩm',
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContractProductPairInsertView',
                pcontractid_link: pcontractid_link,
                productpairid_link: productpairid_link
            }]
        });
        form.show();
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa sản phẩm bộ "' + rec.data.productpairName + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = rec.data.id;

                    GSmartApp.Ajax.post('/api/v1/pcontractproductpairing/deleteproductpair', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thất bại',
                                        buttons: [{
                                            itemId: 'cancel',
                                            text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                                        }]
                                    });
                                }
                                else {
                                    grid.getStore().removeAt(rowIndex);
                                }
                            }
                        })
                }
            }
        });
    },
    onUpdate: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var mes = "";
        if (data.productpairCode == "" || data.productpairCode == null) {
            mes = "Bạn chưa nhập mã của bộ sản phẩm";
        }

        if (mes == "") {
            var params = new Object();
            params.id = data.productpairid_link;
            params.name = data.productpairName;
            params.code = data.productpairCode;

            GSmartApp.Ajax.post('/api/v1/product/update_productpair', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        var store = viewmodel.getStore('PContractProductPairStore');
                        if (response.respcode != 200) {
                            Ext.Msg.show({
                                title: "Thông báo",
                                msg: response.message,
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
        }
        else {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: mes,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }

    }
})