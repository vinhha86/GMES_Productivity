Ext.define('GSmartApp.view.stockin.Stockin_M_List_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_List_ViewController',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var stockintype = viewmodel.getStore('StockinTypeStore');
        stockintype.loadStore();
        
        var listidtype = "4,8,9,11,12";
        var orgtostore = this.getViewModel().getStore('OrgToStore');
        orgtostore.loadStore_allchildren_byorg(listidtype);

        var fromStore = this.getViewModel().getStore('OrgFromStore');
        fromStore.loadStore_byRoot(listidtype);

        // var store = viewmodel.getStore('StockinStore');
        // store.loadStore(0, null, new Date(), 0, 0, 25, 1);
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            }
        }
    },    
    control: {
        '#StockIn_M_List': {
            itemdblclick: 'onCapNhatdbl',
            activate: 'onActivate'
        },        
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        }
    },
    onActivate: function () {
        this.onSearch();
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('StockinStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },
    onSearch: function () {
        console.log('Searching');
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('StockinStore');

        var limit = me.down('#limitpage').getValue();
        var orgid_from_link = me.down('#OrgFromStore').getValue();
        var stockindate_from = me.down('#stockindate_from').getValue();
        var stockindate_to = me.down('#stockindate_to').getValue();
        var stockintypeid_link = me.down('#stockintypeid_link').getValue();
        var status = 0;

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }
        store.loadStore(orgid_from_link, stockindate_from, stockindate_to, stockintypeid_link, status, limit, page);
    },
    onThemMoi: function(){
        this.redirectTo('stockin_m_main/create');
    },
    onNhapMuaMoi: function(){
        this.redirectTo('stockin_m_main/1/create');
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("stockin_m_main/" + id + "/edit");
    },
    onEdit: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("stockin_m_main/" + id + "/edit");
    },
    onDelete: function(grid, rowIndex){
        var me = this.getView();
        
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('stockincode');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa phiếu nhập "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa");
                    var params = new Object();
                    params.id = id;
                    GSmartApp.Ajax.post('/api/v1/stockin/stockin_deleteid', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            me.setLoading(false);
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                grid.getStore().remove(rec);
                            }
                        }
                })
                }
            }
        });
    }
})