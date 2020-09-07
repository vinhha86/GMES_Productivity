Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_MainController',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListStore');
        store.sort('orderdate','DESC');
        store.loadStoreBySearch(null, null, null, null, null, null, null, [1, 2, 3, 0, -1], 25, 1);

        this.onActivate();
    },
    control: {
        '#porderlistmain': {
            activate: 'onActivate',
            itemdblclick: 'onitemdblclick',
        },
        '#btnTimKiem': {
            click: 'onBtnTimKiem'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
    },
    onActivate: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        var VendorStore = viewmodel.getStore('POrder_ListVendorStore');
        VendorStore.loadStore();
        VendorStore.sort('vendorname','ASC');
        var BuyerStore = viewmodel.getStore('POrder_ListBuyerStore');
        BuyerStore.loadStore();
        BuyerStore.sort('buyername','ASC');
        var ListStatusStore = viewmodel.getStore('POrder_ListStatusStore');
        ListStatusStore.loadStore();

        var startField = this.lookupReference('startdate');
        var endField = this.lookupReference('enddate');
        startField.getPicker().monthYearFormat = 'm-Y';
        endField.getPicker().monthYearFormat = 'm-Y';

        if (me.isActivate) {
            me.onloadPage();
        }
        me.isActivate = true;
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('POrder_ListStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListStore');
        //
        var pobuyer, povendor, style, buyerid, vendorid, orderdatefrom, orderdateto, status;
        if (me.down('#txtpobuyer').getValue() == "") {
            pobuyer = null;
        }else pobuyer = me.down('#txtpobuyer').getValue();
        if (null==me.down('#txtpovendor') || me.down('#txtpovendor').getValue() == "") {
            povendor = null;
        }else povendor = me.down('#txtpovendor').getValue();
        if (me.down('#txtstyle').getValue() == "") {
            style = null;
        }else style = me.down('#txtstyle').getValue();
        if (me.down('#txtbuyerid').getValue() == "") {
            buyerid = null;
        }else buyerid = me.down('#txtbuyerid').getValue();
        if (me.down('#txtvendorid').getValue() == "") {
            vendorid = null;
        }else vendorid = me.down('#txtvendorid').getValue();
        if (me.down('#txtdatefrom').getValue() == "") {
            orderdatefrom = null;
        }else orderdatefrom = me.down('#txtdatefrom').getValue();
        if (me.down('#txtdateto').getValue() == "") {
            orderdateto = null;
        }else orderdateto = me.down('#txtdateto').getValue();
        if(me.down('#txtstatus').getValue() == null || me.down('#txtstatus').getValue() == ""){
            status = [];
        }else status = me.down('#txtstatus').getValue();


        var limit = me.down('#limitpage').getValue();
        var page = store.currentPage;
        if (limit == null) {
            limit = 25;
        }
        if (page == null) {
            page = 1;
        }
        store.loadStoreBySearch(pobuyer, povendor, style, buyerid, vendorid, orderdatefrom, orderdateto, status, limit, page);
    },
    onBtnTimKiem: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListStore');
        //
        var pobuyer, povendor, style, buyerid, vendorid, orderdatefrom, orderdateto, status;
        if (me.down('#txtpobuyer').getValue() == "") {
            pobuyer = null;
        }else pobuyer = me.down('#txtpobuyer').getValue();
        if (null==me.down('#txtpovendor') || me.down('#txtpovendor').getValue() == "") {
            povendor = null;
        }else povendor = me.down('#txtpovendor').getValue();
        if (me.down('#txtstyle').getValue() == "") {
            style = null;
        }else style = me.down('#txtstyle').getValue();
        if (me.down('#txtbuyerid').getValue() == "") {
            buyerid = null;
        }else buyerid = me.down('#txtbuyerid').getValue();
        if (me.down('#txtvendorid').getValue() == "") {
            vendorid = null;
        }else vendorid = me.down('#txtvendorid').getValue();
        if (me.down('#txtdatefrom').getValue() == "") {
            orderdatefrom = null;
        }else orderdatefrom = me.down('#txtdatefrom').getValue();
        if (me.down('#txtdateto').getValue() == "") {
            orderdateto = null;
        }else orderdateto = me.down('#txtdateto').getValue();
        if(me.down('#txtstatus').getValue() == null || me.down('#txtstatus').getValue() == ""){
            status = [];
        }else status = me.down('#txtstatus').getValue();


        var limit = me.down('#limitpage').getValue();
        var page = 1;
        if (limit == null) {
            limit = 25;
        }
        // if (page == null) {
        //     page = 1;
        // }
        store.loadStoreBySearch(pobuyer, povendor, style, buyerid, vendorid, orderdatefrom, orderdateto, status, limit, page);
    },
    // onPOBuyerFilterKeyup:function(){
    //     var grid = this.getView(),
    //         filterField = this.lookupReference('POBuyerFilter'),
    //         filters = this.getView().store.getFilters();

    //     if (filterField.value) {
    //         this.POBuyerFilter = filters.add({
    //             id: 'POBuyerFilter',
    //             property: 'po_buyer',
    //             value: filterField.value,
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //     }
    //     else if (this.POBuyerFilter) {
    //         filters.remove(this.POBuyerFilter);
    //         this.POBuyerFilter = null;
    //     }
    // },
    onitemdblclick: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("porderlistmain/" + id + "/edit");
    },
})