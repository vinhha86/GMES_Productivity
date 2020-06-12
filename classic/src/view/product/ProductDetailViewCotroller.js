Ext.define('GSmartApp.view.product.ProductDetailViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductDetailViewCotroller',
    IdProduct: 0,
    init: function () {
        var me = this.getView();
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                urlBack: 'onUrlBack'
            }
        }
    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnNPL': {
            click: 'onViewNPL'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onLuu: function () {
        var m = this;

        var me = this.getView();
        var viewModel = this.getViewModel();
        // main.setLoading("Đang lưu dữ liệu");

        var params = new Object();
        var data = new Object();
        data = viewModel.get('product');
        data.producttypeid_link = 10;
        data.id = m.IdProduct;
        data.status = 1;
        data.usercreateid_link = 0;
        data.timecreate = '';

        delete data.designerName;
        delete data.productAttribute;

        params.data = data;
        params.msgtype = "PRODUCT_CREATE";
        params.message = "Tạo sản phẩm";

        GSmartApp.Ajax.post('/api/v1/product/createproduct', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                if(!viewModel.get('isWindow'))
                                    m.redirectTo("lsproduct/" + response.id + "/edit");
                                else
                                {
                                    //Tạo event để form gọi lên hứng khi thêm sản phẩm thành công với trường hợp tạo sản phẩm trong đơn hàng
                                    m.fireEvent("CreateProduct");
                                }
                            }
                        });
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            buttons: [{
                                itemId: 'cancel',
                                text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                            }]
                        });
                        me.down('#code').focus();
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: null,
                        buttons: [{
                            itemId: 'cancel',
                            text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                        }]
                    });
                }
                me.setLoading(false);
            })
    },
    onQuayLai: function () {
        this.redirectTo('lsproduct');
    },
    onLoadData: function (id, type) {
        this.IdProduct = id;

        viewInfo = Ext.getCmp('ProductInfoView');
        viewInfo.IdProduct = id;
        viewInfo.getController().loadInfo(id);

        viewAttribute = Ext.getCmp('ProductAttributeView');
        viewAttribute.IdProduct = id;

        imgView = Ext.getCmp('ProductImageView');
        imgView.IdProduct = id;
        
        var storeAtt = this.getViewModel().getStore('ProductAttributeValueStore');
        var storeSKU = this.getViewModel().getStore('SKUStore');
        if (id != 0) {
            storeAtt.loadStore(id);
            storeSKU.loadStore(id);
        }
        else {
            storeAtt.removeAll();
            storeSKU.removeAll();
        }
    },
    onViewNPL: function(){
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();
        var data = viewmodel.get('product');

        var form = Ext.create('Ext.window.Window', {
            height: 600,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Định mức nguyên phụ liệu "sản phẩm ' + data.name +'"',
            closeAction: 'destroy',
            width: 1100,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'ProductBOMMainView',
                IdProduct: t.IdProduct
            }]
        });
        form.show();
    },
    onUrlBack: function (type) {

    }
})