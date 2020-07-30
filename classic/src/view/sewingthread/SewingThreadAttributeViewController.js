Ext.define('GSmartApp.view.sewingtrim.SewingTrimAttributeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SewingThreadAttributeViewController',
    init: function () {
        var me = this.getView();
    },
    control:{
        '#SewingTrimAttributeView':{
            itemdblclick :'onitemdblclick'
        },
        '#btnThemMoi':{
            click: 'onThemMoiAtt'
        },
        '#btnXoa':{
            click: 'onXoa'
        }
    },
    onXoa: function(grid, row, col){
        var me = this.getView();
        var rec = grid.getStore().getAt(row);
        var name = rec.get('attributeName');

        var id = rec.get('attributeid_link');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa thuộc tính ' + name + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.attributeid_link = id;
                    params.productid_link = me.IdProduct;

                    GSmartApp.Ajax.post('/api/v1/productattribute/deleteatt', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Xóa thành công',
                                    buttons: [{
                                        itemId: 'cancel',
                                        text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                                    }]
                                });
                                var store = me.getStore();
                                store.remove(rec);
                            } else {
                                Ext.Msg.show({
                                    title: 'Xóa thất bại',
                                    msg: null,
                                    buttons: [{
                                        itemId: 'cancel',
                                        text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                                    }]
                                });
                            }
                            me.setLoading(false);
                        })
                }
            }
        });
    },
    onAddValue: function(grid, row, col){
        var me = this.getView();
        var record = grid.getStore().getAt(row);
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thuộc tính : ' + record.data.attributeName,
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'SewingTrimSelectAttributeValueView',
                IdAttribute: record.data.attributeid_link,
                IdProduct: me.IdProduct
            }]
        });
        form.show();
    },
    onitemdblclick : function(m, record, item, index, e, eOpts){
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thuộc tính : ' + record.data.attributeName,
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'SewingTrimSelectAttributeValueView',
                IdAttribute: record.data.attributeid_link,
                IdProduct: me.IdProduct
            }]
        });
        form.show();
    },
    onThemMoiAtt: function(){
        var me = this.getView();
        if(me.IdProduct ==0 ){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo chỉ may trước khi chọn thuộc tính',
                buttons: [{
                    itemId: 'cancel',
                    text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                }]
            });
            var viewInfo = Ext.getCmp('SewingTrimInfoView');
            viewInfo.down('#code').focus();
            return;
        }

        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thêm mới thuộc tính ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'SewingTrimSelectAttribueView',
                IdProduct: me.IdProduct
            }]
        });
        form.show();
    }
})