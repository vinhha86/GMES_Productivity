Ext.define('GSmartApp.view.porders.POrder_List.Stockout_order.Detai.Stockout_Detail_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Detail_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        this.getInfo(viewmodel.get('order.id'));
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    },
    getInfo: function (id) {
        if (id != null) {
            var params = new Object();
            var viewmodel = this.getViewModel();
            params.id = viewmodel.get('order.id');

            GSmartApp.Ajax.post('/api/v1/stockoutorder/getby_id', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var res = Ext.decode(response.responseText);
                        viewmodel.set('order', res.data);
                        var store = viewmodel.getStore('Stockout_order_d_Store');
                        store.setData(res.detail);
                    }
                })
        }
    },
    onLuu: function () {
        var grid = this.getView();
        grid.setLoading('Đang lưu dữ liệu');

        var me = this;
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockout_order_d_Store');
        var params = new Object();
        var list_d = [];
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            list_d.push(data);
        }
        params.data = viewmodel.get('order');
        params.detail = list_d;

        GSmartApp.Ajax.post('/api/v1/stockoutorder/create', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {

                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thông tin thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        me.getInfo(res.id);
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})