Ext.define('GSmartApp.view.porders.POrder_List.POrder_List_MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_List_MainController',
    isActivate: false,
    init: function () {
        this.onloadPage();
        let startField = this.lookupReference('startdate');
        let endField = this.lookupReference('enddate');
        startField.getPicker().monthYearFormat = 'm-Y';
        endField.getPicker().monthYearFormat = 'm-Y';
    },
    control: {
        '#porderlistmain': {
            // activate: 'onActivate',
            itemdblclick: 'onitemdblclick',
            // itemclick: 'onItemClick',
            // celldblclick: 'onCellDblclick',
        },
        '#btnTimKiem': {
            click: 'onTimKiemClick'
        },
        '#btnRefresh': {
            click: 'onRefreshClick'
        }
    },
    onActivate: function () {
        let me = this;
        if (me.isActivate) {
            this.onloadPage();
        }
        me.isActivate = true;
    },
    onloadPage: function () {
        let me = this.getView();
        let t = this;

        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('POrder_ListStore');
        store.loadStoreBySearch(null, null, null, null, null, null, null, [1, 2, 3, 0, -1]);
        store.sort('productiondate_plan', 'ASC');
        let store2 = viewmodel.getStore('POrder_ListVendorStore');
        store2.loadStore();
        store2.sort('vendorname','ASC');
        let store3 = viewmodel.getStore('POrder_ListBuyerStore');
        store3.loadStore();
        store3.sort('buyername','ASC');
        let store4 = viewmodel.getStore('POrder_ListStatusStore');
        store4.loadStore();
    },
    onTimKiemClick: function () {
        // console.log('click tim kiem');

        ///////////////////////////////////
        let me = this.getView();
        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('POrder_ListStore');
        
        // console.log(me.down('#txtstatus').getValue());
        // console.log(typeof(me.down('#txtstatus').getValue()));

        let pobuyer, povendor, style, buyerid, vendorid, orderdatefrom, orderdateto, status;
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
        status = me.down('#txtstatus').getValue();

        store.loadStoreBySearch(pobuyer, povendor, style, buyerid, vendorid, orderdatefrom, orderdateto, status);
    },
    onRefreshClick: function(){
        var me = this.getView();
        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('POrder_ListStore');
        store.loadStoreBySearch(null, null, null, null, null, null, null, [1, 2, 3, 0, -1]);
        me.down('#txtpobuyer').setValue();
        me.down('#txtstyle').setValue();
        me.down('#txtbuyerid').setValue();
        me.down('#txtvendorid').setValue();
        me.down('#txtdatefrom').setValue();
        me.down('#txtdateto').setValue();
        me.down('#txtstatus').setValue();
    },
    onOrdercodeFilterKeyup: function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('ordercodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onStylebuyerFilterKeyup: function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('stylebuyerFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'styleFilter',
                property: 'stylebuyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onitemdblclick: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("porderlistmain/" + id + "/edit");
    },
})