Ext.define('GSmartApp.view.pcontract.PContractMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractMainViewController',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractStore');
        store.loadStore(0, 0, "", "");

        this.onActivate();
        common.Check_Object_Permission();
    },
    control: {
        '#PContractMainView': {
            activate: 'onActivate',
            itemdblclick: 'ondblClick',
            select: 'onPContractSelect'
        },
        '#btnThemMoi_PContractMainView': {
            click: 'onThemMoi'
        },
        // '#orgcustomerid_link': {
        //     select: 'onloadPage'
        // },
        // '#orgbuyerid_link': {
        //     select: 'onloadPage'
        // }, 
        // '#orgvendorid_link': {
        //     select: 'onloadPage'
        // },
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
        EndBuyer.sort('name','ASC');
        Vendor.loadStore(11);
        Vendor.sort('name','ASC');

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

        var orgbuyerid_link = me.down('#orgbuyerid_link').getValue();
        var orgvendorid_link = me.down('#orgvendorid_link').getValue();
        var contractbuyer_code = me.down('#contractbuyer_code').getValue();
        var contractbuyer_year = me.down('#contractbuyer_year').getValue();

        if (orgbuyerid_link == null) {
            orgbuyerid_link = 0;
        }

        if (orgvendorid_link == null) {
            orgvendorid_link = 0;
        }

        if (contractbuyer_code == null) {
            contractbuyer_code = "";
        }

        if (contractbuyer_year == null) {
            contractbuyer_year = "";
        }

        store.loadStore(orgbuyerid_link, orgvendorid_link, contractbuyer_code, contractbuyer_year);
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
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
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
    },
    onPContractSelect: function(e, selected, eOpts){
        if (null != selected){
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('PContractPOList');
            store.loadLeafOnly_ByContract(selected.data.id);
        }
    }
})