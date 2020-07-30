Ext.define('GSmartApp.view.attribute.attributeValueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attributeValueViewController',
    oldValue: '', // Lưu giá trị cũ trước khi sửa . Nếu giá trị mới không validate thì trả về giá trị cũ
    idAttribute: 0,
    init: function () {
        var me = this.getView();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnXoa': {
            click: 'onXoa'
        },
        '#txtValue': {
            focus: 'onfocus',
            focusleave: 'onfocusleave'
        },
        '#txtThemMoi': {
            keydown: 'onKeyUp'
        }
    },
    onKeyUp: function (m, e, eOpts) {
       
    },
    load_AttributeValue: function (id) {
        this.idAttribute = id;
        var store = this.getViewModel().getStore('AttributeValueStore');
        store.loadStore(id);
    },
    ThemMoi_CapNhat: function (params) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = me.getViewModel().getStore('AttributeValueStore');
                    if (params.data.id == 0) {
                        me.down('#txtThemMoi').reset();
                        me.down('#txtThemMoi').focus();
                    }
                    store.loadStore(params.data.attributeid_link);
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
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
    onThemMoi: function () {
        var me = this.getView();
        if (me.down('#txtThemMoi').getValue() == "") {
            Ext.Msg.alert(GSmartApp.Locales.title_thongbao[App.Locales.currentLocale], App.Locales.error_trongdauvao[App.Locales.currentLocale]);
        }
        else {
            var check = this.checkValidate(me.down('#txtThemMoi').getValue());
            if (!check) return;

            var data = new Object();
            data.id = 0;
            data.orgid_link = 0;
            data.value = me.down('#txtThemMoi').getValue();
            data.attributeid_link = this.idAttribute;
            data.description = "";
            data.categoryid_link = 0;
            data.usercreateid_link = 0;
            data.timecreate = "";
            data.isproduct = false;
            data.ismaterial = false;
            data.issewingtrims = false;
            data.ispackingtrims = false;

            var params = new Object();
            params.msgtype = "ATTRIBUTEVALUE_CREATE";
            params.message = "Tạo giá trị thuộc tính";
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    onXoaAtt: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        
        if (rec.get('isdefault')) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn không được xóa giá trị mặc định',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else{
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có chắc chắn xóa giá trị thuộc tính ' + rec.data.value + '?',
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
                        params.id = rec.data.id;
    
                        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_delete', Ext.JSON.encode(params),
                            function (success, response, options) {
                                if (success) {
                                    var store = me.getViewModel().getStore('AttributeValueStore');
                                    store.remove(rec);
                                    if (rec.removedFrom == store.data.length) {
                                        me.getSelectionModel().select(store.data.length - 1);
                                    } else {
                                        me.getSelectionModel().select(rec.removedFrom);
                                    }
                                } else {
                                    Ext.Msg.show({
                                        title: 'Thông báo',
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                                me.setLoading(false);
                            })
                    }
                }
            });
        }

        
    },
    onXoa: function () {
        var me = this.getView();
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn thông tin để xóa",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có chắc chắn xóa giá trị thuộc tính ' + select[0].data.value + '?',
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
                        params.id = select[0].data.id;

                        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_delete', Ext.JSON.encode(params),
                            function (success, response, options) {
                                if (success) {
                                    var store = me.getViewModel().getStore('AttributeValueStore');
                                    store.remove(select);
                                    if (select[0].removedFrom == store.data.length) {
                                        me.getSelectionModel().select(store.data.length - 1);
                                    } else {
                                        me.getSelectionModel().select(select[0].removedFrom);
                                    }
                                } else {
                                    Ext.Msg.show({
                                        title: 'Thông báo',
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                                me.setLoading(false);
                            })
                    }
                }
            });
        }
    },
    onfocus: function (m, event, eOpts) {
        this.oldValue = m.getValue();
    },
    onfocusleave: function (m, event, eOpts) {
        if (m.getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn không được bỏ trống giá trị thuộc tính",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function () {
                    m.setValue(this.oldValue);
                }
            });
        }
        else {
            if (m.getValue() == this.oldValue) return;

            var check = this.checkValidate(m.getValue());
            if (!check) {
                m.setValue(this.oldValue);
                return;
            }

            var select = this.getView().getSelectionModel().getSelection();
            var data = new Object();
            data = select[0].data;
            // data.id = select[0].data.id;
            data.orgid_link = 0;
            data.attributeid_link = this.idAttribute;
            data.value = m.getValue();
            data.description = "";
            data.categoryid_link = 0;
            data.usercreateid_link = 0;
            data.timecreate = "";

            var params = new Object();
            params.msgtype = "ATTRIBUTEVALUE_UPDATE";
            params.message = "Cập nhật giá trị thuộc tính";
            params.data = data;

            this.getView().setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    checkValidate: function (name) {
        var store = this.getViewModel().getStore('AttributeValueStore');
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            if (data.name == name) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Dữ liệu đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });

                return false;
            }
        }
        return true;
    }
})