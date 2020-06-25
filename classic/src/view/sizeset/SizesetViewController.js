Ext.define('GSmartApp.view.sizeset.SizesetViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SizesetViewController',
    isActivate: false,
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#SizesetView': {
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
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('SizesetStore');
        store.loadStore();
    },
    onThemMoi: function (m, record) {
        var me = this.getView();
        var id = 0;
        this.redirectTo("lssizeset/" + id + "/edit");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("lssizeset/" + id + "/edit");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lssizeset/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('name');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa dải size "' + name + '" ?',
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

        GSmartApp.Ajax.post('/api/v1/sizeset/deletesizeset', Ext.JSON.encode(params),
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
    onSizesetNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('sizesetNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    }
})