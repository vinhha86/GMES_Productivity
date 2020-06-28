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
        '#btnLuu': {
            click: 'onLuu'
        },
        '#SizesetView': {
            activate: 'onActivate',
            itemdblclick: 'onitemdblclick',
            itemclick: 'onitemclick'
        }
    },
    onThemMoi: function(){
        var me = this.getView();
        me.IdSizeset = 0;
        me.down('#txtname').reset();
        me.down('#txtcomment').reset();
        me.down('#txtname').focus();
    },
    Luu_CapNhat: function (params) {
        var me = this.getView();
        GSmartApp.Ajax.post('/api/v1/sizeset/createsizeset', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var store = me.getViewModel().getStore('SizesetStore');
                    me.IdSizeset = 0;
                    me.down('#txtname').reset();
                    me.down('#txtcomment').reset();
                    me.down('#txtname').focus();
                    store.loadStore();
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
     },
    onLuu: function(){
        var me = this.getView();
        if (me.down('#txtname').getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập tên dải size",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtname').focus();
            return;
        }
        else {
            var check = this.checkValidate(me.down('#txtname').getValue());
            if(!check) {
                me.down('#txtname').focus();
                return;
            }

            var data = new Object();
            data.id = me.IdSizeset;
            data.orgrootid_link = 0;
            data.name = me.down('#txtname').getValue();
            data.comment = me.down('#txtcomment').getValue();

            var params = new Object();
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.Luu_CapNhat(params);
        }
    },
    checkValidate: function(name){
        var store = this.getViewModel().getStore('SizesetStore');
        for(var i=0; i< store.data.length;i++){
            var data = store.data.items[i].data;
            if(data.name == name){
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Dữ liệu đã tồn tại ở dòng "+ (i+1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });

                return false;
            }
        }
        return true;
    },
    onitemclick: function(row, record, element, rowIndex, e, eOpts){
        // console.log(record);
        var me = this.getView();
        me.IdSizeset = record.id;
        me.down('#txtname').setValue(record.data.name);
        me.down('#txtcomment').setValue(record.data.comment);
        me.down('#txtname').focus();
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
        var storeSizeset = viewmodel.getStore('SizesetStore');
        storeSizeset.loadStore();
        var storeAttributeValue = viewmodel.getStore('AttributeValueStore');
        storeAttributeValue.loadStore(30);

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
            me.IdSizeset = 0;
            me.down('#txtname').reset();
            me.down('#txtcomment').reset();
            me.down('#txtname').focus();
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
    },
    onitemdblclick:function(row, record, element, rowIndex, e, eOpts){
        var viewModel = this.getViewModel();
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thuộc tính : Cỡ',
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
                xtype: 'SizesetSelectAttributeView',
                IdSizeset: record.id,
                IdAttribute: 30
            }]
        });
        form.show();
    },
})