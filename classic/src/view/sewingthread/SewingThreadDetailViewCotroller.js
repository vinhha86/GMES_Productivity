Ext.define('GSmartApp.view.sewingtrim.SewingThreadDetailViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SewingThreadDetailViewCotroller',
    IdProduct: 0,
    init: function () {
        var me = this;
        var viewmodel  = this.getViewModel();
        if(viewmodel.get('isWindow')){
            me.onLoadData(viewmodel.get('product.id'), null);
        }
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
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // main.setLoading("Đang lưu dữ liệu");

        var params = new Object();
        var data = new Object();
        // console.log(this.getView().down('#designerid_link').getValue());
        data = viewModel.get('product');
        data.id = this.IdProduct;
        //  data.designerid_link = this.getView().down('#designerid_link').getValue();
        data.orgrootid_link = 0;
        data.producttypeid_link = 50;
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
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                if(!viewModel.get('isWindow'))
                                    m.redirectTo("lssewingtrim/" + response.id + "/edit");
                                else
                                {
                                    //Tạo event để form gọi lên hứng khi thêm sản phẩm thành công với trường hợp tạo sản phẩm trong đơn hàng
                                    m.getView().fireEvent("CreateProduct", response.product);
                                }
                            }
                        });
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
        this.redirectTo('lssewingthread');
    },
    onLoadData: function (id, type) {
        this.IdProduct = id;

        viewInfo = Ext.getCmp('SewingThreadInfoView');
        viewInfo.IdProduct = id;
        viewInfo.getController().loadInfo(id);

        viewAttribute = Ext.getCmp('SewingThreadAttributeView');
        viewAttribute.IdProduct = id;

        imgView = Ext.getCmp('SewingThreadImageView');
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