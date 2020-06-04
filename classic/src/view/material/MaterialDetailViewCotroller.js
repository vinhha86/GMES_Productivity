Ext.define('GSmartApp.view.material.MaterialDetailViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MaterialDetailViewCotroller',
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
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onLuu: function () {
        var viewInfo = Ext.getCmp('MaterialInfoView');
        var viewAttribute = Ext.getCmp('MaterialAttributeView');
        var imgView = Ext.getCmp('MaterialImageView');

        var me = this.getView();
        var viewModel = this.getViewModel();
        // main.setLoading("Đang lưu dữ liệu");

        var params = new Object();
        var data = new Object();
        // console.log(this.getView().down('#designerid_link').getValue());
        data = viewModel.get('product');
        data.id = this.IdProduct;
        //  data.designerid_link = this.getView().down('#designerid_link').getValue();
        data.orgrootid_link = 0;
        data.product_type = 2;
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
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        if (data.id == 0) {
                            var storeAtt = viewModel.getStore('ProductAttributeValueStore');
                            storeAtt.loadStore(response.id);
                            var storeSKU = viewModel.getStore('SKUStore');
                            storeSKU.loadStore(response.id);
                        }
                        viewInfo.IdProduct = response.id;
                        viewAttribute.IdProduct = response.id;
                        imgView.IdProduct = response.id;
                        me.IdProduct = response.id;
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        me.down('#code').focus();
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onQuayLai: function () {
        this.redirectTo('lsmaterial');
    },
    onLoadData: function (id, type) {
        this.IdProduct = id;

        viewInfo = Ext.getCmp('MaterialInfoView');
        viewInfo.IdProduct = id;
        viewInfo.getController().loadInfo(id);

        viewAttribute = Ext.getCmp('MaterialAttributeView');
        viewAttribute.IdProduct = id;

        imgView = Ext.getCmp('MaterialImageView');
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
    onUrlBack: function (type) {

    }
})