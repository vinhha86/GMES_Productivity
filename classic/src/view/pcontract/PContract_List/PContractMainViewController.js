Ext.define('GSmartApp.view.pcontract.PContractMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractMainViewController',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractStore');
        store.loadStore_ByPage(25, 1, "", "", 0, 0, "", "");

        this.onActivate();
        common.Check_Object_Permission();
    },
    control: {
        '#PContractMainView': {
            activate: 'onActivate',
            itemdblclick: 'ondblClick'
        },
        '#btnThemMoi_PContractMainView': {
            click: 'onThemMoi'
        },
        '#orgcustomerid_link': {
            select: 'onloadPage'
        },
        '#orgendbuyerid_link': {
            select: 'onloadPage'
        }, 
        '#orgvendorid_link': {
            select: 'onloadPage'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        },
        '#contractcode': {
            specialkey: 'onSpecialkey'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
    },
    onActivate: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var KHStore = viewmodel.getStore('CustomerStore');
        KHStore.loadStore(10, true);

        var EndBuyer = viewmodel.getStore('EndBuyer');
        var Vendor = viewmodel.getStore('Vendor');
        EndBuyer.loadStore(12);
        Vendor.loadStore(11);

        if (me.isActivate) {
            me.onloadPage();
        }
        me.isActivate = true;
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('PContractStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractStore');

        var limit = me.down('#limitpage').getValue();
        var cust_contractcode = "";
        var contractcode = me.down('#contractcode').getValue();
        var orgendbuyerid_link = me.down('#orgendbuyerid_link').getValue();
        var orgvendorid_link = me.down('#orgvendorid_link').getValue();
        var style = me.down('#style').getValue();
        var po = me.down('#po').getValue();

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (cust_contractcode == null) {
            cust_contractcode = "";
        }

        if (contractcode == null) {
            contractcode = "";
        }

        if (orgendbuyerid_link == null) {
            orgendbuyerid_link = 0;
        }

        if (orgvendorid_link == null) {
            orgvendorid_link = 0;
        }

        if (style == null) {
            style = "";
        }

        if (po == null) {
            po = "";
        }

        store.loadStore_ByPage(limit, page, cust_contractcode, contractcode, orgendbuyerid_link,
            orgvendorid_link, style, po);
    },
    onThemMoi: function () {
        var me = this.getView();
        var idpcontract = 0;

        this.redirectTo("lspcontract/" + idpcontract + "/edit");
    },
    onEdit: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lspcontract/" + id + "/edit");
    },
    ondblClick: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("lspcontract/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');

        var params = new Object();
        params.id = id;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa đơn hàng "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    GSmartApp.Ajax.post('/api/v1/pcontract/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            var store = grid.getStore();
                            if (response.respcode != 200) {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: 'Xóa thất bại',
                                    buttons: [{
                                        itemId: 'cancel',
                                        text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
                                    }]
                                });
                            }
                            else {
                                store.removeAt(rowIndex);
                            }
                        } else {
                            var response = Ext.decode(response.responseText);
                            Ext.Msg.show({
                                title: 'Xóa hợp đồng',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    })
                }
            }
        });
    },
    checkActionColumnPermission: function (view, rowIndex, colIndex, item, record) { 
        return common.Check_ActionColum_Permission(item.itemId); 
    }
})