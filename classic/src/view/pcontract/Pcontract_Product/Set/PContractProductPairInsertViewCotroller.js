Ext.define('GSmartApp.view.pcontract.PContractProductPairInsertViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProductPairInsertViewCotroller',
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractProductPairStore');
        if (me.productpairid_link == 0)
            store.load_product_not_pair(me.pcontractid_link, me.productpairid_link);
        else
            store.load_product_pair_detail(me.pcontractid_link, me.productpairid_link);
    },
    control: {
        '#btnChon': {
            click: 'onChon'
        },
        '#btnThoat': {
            click: 'onThoat'
        }
    },
    onThoat: function () {
        var me = this.getView();
        me.up('window').close();
    },
    onChon: function () {
        var viewmodel = this.getViewModel();
        var me = this.getView();

        var params = new Object();
        params.pcontractid_link = me.pcontractid_link;
        params.productpairid_link = me.productpairid_link;

        var data = [];
        var select = me.getStore().data.items;
        for (var i = 0; i < select.length; i++) {
            var obj = select[i].data
            if(obj.amount > 0)
                data.push(obj);
        }
        if(data.length < 2){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải nhập ít nhất 2 sản phẩm để ghép bộ',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else{
            params.listpair = data;

            GSmartApp.Ajax.post('/api/v1/pcontractproductpairing/create', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if(response.mesErr != ""){
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: response.mesErr,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                        else{
                            var main = Ext.getCmp('PContractPairProductView');
                            var store = main.getStore();
                            store.load();
                            me.up('window').close();
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
                })
        }
    }
})