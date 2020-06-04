Ext.define('GSmartApp.view.stockin.StockInListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockinlist',
    init: function() {
        this.callParent(arguments);
		
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onUrlBack'
            }
        }
    },
	onUrlBack:function(type){
		var me=this;
		if(type.getId()=='lsnhapkhomoi'||type.getId()=='lsnhaptunhacat'||type.getId()=='lsnhapdieuchuyen'
		||type.getId()=='lsnhaptugiacong'||type.getId()=='lsnhapcapbu'||type.getId()=='lsnhapxavai'){
			Ext.getStore('OrgStore').GetOrgDest('lsnhapdieuchuyen');
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			viewModel.set('stockintypeid_link',type.data.type);
			var gridStockin = this.lookupReference('gridStockin').getStore().removeAll();
			if(type.getId()=='lsnhapkhomoi'){
				viewModel.set('isNhapmoi',true);
			}else{
				viewModel.set('isNhapmoi',false);
			}
			
			var formStockin = this.lookupReference('formStockin');
			var values = formStockin.getValues();
			var gridStockin = this.lookupReference('gridStockin');
			var url=config.getAppBaseUrl()+ '/api/v1/stockin/stockin_list';
			var store = gridStockin.getStore();
			values.stockintypeid_link=viewModel.get('stockintypeid_link');
			values.stockindate_from = new Date();
			values.stockindate_to = new Date();
			me.getView().setLoading(true);
			GSmartApp.Ajax.setProxy(store,'/api/v1/stockin/stockin_list',values,function(records, operation, success) {me.getView().setLoading(false);})
			
		}
	},
	onEdit:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry= viewModel.get('urlback');
		this.redirectTo(entry.get('urlc')+"/"+id+"/edit");
	},
	onItemdblclick:function(grid, record, item, index, e, eOpts ){
		var id = record.get('id');
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry= viewModel.get('urlback');
		this.redirectTo(entry.get('urlc')+"/"+id+"/edit");
	},
	onSearch:function(){
		var me=this;
		var view =this.getView();
		var viewModel = view.getViewModel();
		var params = new Object();
		var view = this.getView();
		var formStockin = this.lookupReference('formStockin');
		var values = formStockin.getValues();
		var gridStockin = this.lookupReference('gridStockin');
		var url=config.getAppBaseUrl()+ '/api/v1/stockin/stockin_list';
		var store = gridStockin.getStore();
		values.stockintypeid_link=viewModel.get('stockintypeid_link');
		values.stockindate_from =  new Date(values.stockindate_from);
		values.stockindate_to =  new Date(values.stockindate_to);
		me.getView().setLoading(true);
		GSmartApp.Ajax.setProxy(store,'/api/v1/stockin/stockin_list',values,function(records, operation, success) {me.getView().setLoading(false);})
	},
	onStockInCreate:function(){
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry = viewModel.get('urlback');
		this.redirectTo(entry.get('urlc')+"/create");
	},
	onDelete:function(grid, rowIndex, colIndex){
		var gridStockin = this.lookupReference('gridStockin');
		Ext.Msg.show({
			title:GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale],
			message:GSmartApp.Locales.title_xoa[GSmartApp.Locales.currentLocale],
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					var record = grid.getStore().getAt(rowIndex);
					var id = record.get('id');  
					if(!isNaN(id)){
						GSmartApp.Ajax.post('/api/v1/stockin/stockin_deleteid','{"id": '+id+'}',function(success,response,options ) {})
					}
					gridStockin.getStore().remove(record);
				}
			}
		});
	}

});
