Ext.define('GSmartApp.view.endbuyer.EndBuyerViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EndBuyerViewController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#delete': {
            click: 'onXoa'
        },
        '#edit': {
            click: 'onCapNhat'
        },
        '#EndBuyerView': {
            activate: 'onActivate',
            itemdblclick: 'onCapNhatdbl'
        }
    },
    onActivate: function () {
        var me = this;
        if (me.isActivate) {
            this.onloadPage();
        }
        me.isActivate = true;
        // var viewmodel = this.getViewModel();
        // var store = viewmodel.getStore('PortStore');
        // store.loadStore();
    },
    onThemMoi: function (m, record) {
        var me = this.getView();
        var Id = 0;

        this.redirectTo("lsendbuyer/create");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("lsendbuyer/" + id + "/edit");
        console.log("dbclk here");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lsendbuyer/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('name');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa end buyer "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id, rec);
                }
            }
        });
    },
    Xoa: function (id, rec) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/orgmenu/deleteOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
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
     },
     onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('OrgStore');
        store.GetOrgByTypeId(12);
    }
})