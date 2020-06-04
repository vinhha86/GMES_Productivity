Ext.define('GSmartApp.view.product.ProductMaterialViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductMaterialViewController',
    init: function () {

    },
    control: {
        '#btnChon': {
            click: 'onChon'
        }
    },
    onChon: function () {
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();

        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn nguyên phụ liệu',
                buttons: [{
                    itemId: 'cancel',
                    text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                }]
            });
            return;
        }

        var params = new Object();
        var data = [];

        for (var i = 0; i < select.length; i++) {
            var npl = select[i].data;
            data.push(npl.id);
        }

        params.productid_link = me.IdProduct;
        params.listnpl = data;

        GSmartApp.Ajax.post('/api/v1/product/createproductbom', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Có lỗi trong quá trình chọn NPL',
                            buttons: [{
                                itemId: 'cancel',
                                text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                            }]
                        });
                    }
                    else {
                        var storenpl = viewmodel.getStore('productStore');
                        var storebom = viewmodel.getStore('ProductBom');
                        storenpl.remove(select);
                        storebom.load();
                    }
                }
            })
    },
    onViewImg: function(){
        
    }
})