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
            // itemdblclick: 'onitemdblclick',
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
        store.loadStore();
        let store2 = viewmodel.getStore('POrder_ListVendorStore');
        store2.loadStore();
        let store3 = viewmodel.getStore('POrder_ListBuyerStore');
        store3.loadStore();
    },
    onTimKiemClick: function () {
        // console.log('click tim kiem');
        var me = this.getView();
        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('POrder_ListStore');
        
        let ordercode, po, style, buyername, vendorname, orderdatefrom, orderdateto;
        if (me.down('#txtordercode').getValue() == "") {
            ordercode = null;
        }else ordercode = me.down('#txtordercode').getValue();
        if (me.down('#txtpo').getValue() == "") {
            po = null;
        }else po = me.down('#txtpo').getValue();
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

        // store.loadStore('Sub1',null,'9010',null,null,null,null);
        store.loadStore(ordercode, po, style, buyerid, vendorid, orderdatefrom, orderdateto);
    },
    onRefreshClick: function(){
        var me = this.getView();
        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('POrder_ListStore');
        store.loadStore();
        me.down('#txtordercode').setValue();
        me.down('#txtpo').setValue();
        me.down('#txtstyle').setValue();
        me.down('#txtbuyerid').setValue();
        me.down('#txtvendorid').setValue();
        me.down('#txtdatefrom').setValue();
        me.down('#txtdateto').setValue();
    }
})