Ext.define('GSmartApp.view.stockout.Stockout_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_Controller',
    init: function() {
        // this.callParent(arguments);
        var me = this.getView();
        var StockoutType = this.getViewModel().getStore('StockoutTypeStore');
        StockoutType.loadStore();

        var listidtype = "4,8,9,11,12";
        var fromStore = this.getViewModel().getStore('OrgFromStore');
        fromStore.loadStore_allchildren_byorg(listidtype);
 
        var orgtostore = this.getViewModel().getStore('OrgToStore');
        orgtostore.loadStore_byRoot(listidtype);
        
        var StockoutType = this.getViewModel().getStore('StockoutTypeStore');
        StockoutType.loadStore();

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
		me.down('#stockoutdate_from').setValue(new Date(priorDate));

        this.onSearch();
        
        // var store_stockout = this.getViewModel().getStore('Stockout');
        // if (store_stockout) {
        //     var page = store_stockout.currentPage;
        //     if (page == null) {
        //         page = 1;
        //     }
        //      store_stockout.loadByDate(0,'', new Date(),new Date(), page, 25, 0 ,0);
        // }
    },
    onActivate: function () {
        this.onSearch();
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            }
        }
    },        
    control:{
        '#btnThemMoi':{
            click: 'onStockoutNew'
        },
		'#Stockout_M_List':{
            itemdblclick: 'onCapNhat'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        }
    },
    onXuatTo: function(){
        this.redirectTo('stockout_m_main/11/create');
    },
    onXuatCat: function(){
        this.redirectTo('stockout_m_main/1/create');
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('Stockout');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },
    onSearch: function(){
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Stockout');

        var limit = me.down('#limitpage').getValue();
        var stockouttypeid = me.down('#stockouttypeid').getValue();
        var stockindate_from = me.down('#stockoutdate_from').getValue();
        var stockindate_to = me.down('#stockoutdate_to').getValue();
        // var OrgToStore = me.down('#OrgToStore').getValue();
        // var OrgFromStore = me.down('#OrgFromStore').getValue();
        var stockoutcode = '';

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }
        store.loadByDate(stockouttypeid, stockoutcode, stockindate_from, stockindate_to, page, limit,null,null);
    },
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    },
    onStockoutEdit: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("stockout_m_main/"+id+"/edit");
    },
    onCapNhat: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("stockout_m_main/" + id + "/edit");
    },
    onStockoutItemDelete: function(grid, rowIndex, colIndex){
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('stockoutcode');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa phiếu xuất '+name+'?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa dữ liệu");
                    var params = new Object();
                    params.id = id;
                    params.status = 1;

                    GSmartApp.Ajax.postJitin('/api/v1/stockout/stockout_deleteid', Ext.JSON.encode(params),
                    function (success, response, options) {
                        me.setLoading(false);
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Xóa thành công",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                                grid.getStore().remove(rec);
                            }
                        }
                    })
                }
            }
        });
    },
    onStockoutNew: function(){
        this.redirectTo("stockout_m_main/create");
    }
});
