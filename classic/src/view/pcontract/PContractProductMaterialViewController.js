Ext.define('GSmartApp.view.pcontract.PContractProductMaterialViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProductMaterialViewController',
    init: function () {
        
    },
    control: {
        '#btnChon': {
            click: 'onChon'
        },
        '#product_type':{
            select : 'onSearch'
        },
        '#name':{
            specialkey: 'onSpecialkey'
        },
        '#code':{
            specialkey: 'onSpecialkey'
        },
        '#tenmaunpl':{
            specialkey: 'onSpecialkey'
        },
        '#btnTimKiem':{
            click: 'onSearch'
        },
        '#btnThoat':{
            click: 'onThoat'
        }
    },
    onSpecialkey: function(field, e){
        var t = this;
        if (e.getKey() == e.ENTER) {
            t.onSearch();
        }
    },
    onSearch : function(){
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();

        var name = me.down('#name').getValue();
        var code = me.down('#code').getValue();
        var tenmaunpl = me.down('#tenmaunpl').getValue();
        var product_type = me.down('#product_type').getValue();

        var storeNPL = viewmodel.getStore('productStore');
        storeNPL.loadStore_NPL_NotinPContractProductBom(product_type, name, code, tenmaunpl, me.productid_link, me.pcontractid_link, me);
    },
    onThoat: function(){
        var me = this.getView();
        me.up('window').close();
    },
    onChon: function () {
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();
        var pcontractid_link = me.pcontractid_link;
        var productid_link = me.productid_link;

        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn nguyên phụ liệu',
                buttons: [{
                    itemId: 'cancel',
                    text: App.Locales.btn_dong[App.Locales.currentLocale],
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

        params.productid_link = productid_link;
        params.listnpl = data;
        params.pcontractid_link = pcontractid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractproductbom/create_pcontract_productbom', Ext.JSON.encode(params),
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
                        storenpl.remove(select);

                        var storebom = Ext.getCmp('PContractProductBomView').getStore();
                        storebom.loadStore(pcontractid_link, productid_link);
                        //console.log(Ext.getCmp('PContractView').getViewModel());
                        var storebomcolor = Ext.getCmp('PContractView').getViewModel().getStore('PContractBomColorStore');

                        storebomcolor.load();
                    }
                }
            })
    },
    onViewImg: function(){
        
    }
})