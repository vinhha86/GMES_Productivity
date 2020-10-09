Ext.define('GSmartApp.view.invcheck.InvCheckListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.invchecklist',
	init: function() {
        this.callParent(arguments);
		Ext.getStore('WareHouseStore').invCheckLoadStore(8);
	},
	onActivate: function(){
		console.log('Activate');
		this.onSearch();
	},
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            }
        }
	},
	onCreate:function(){
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry = viewModel.get('urlback');
		this.redirectTo("invcheck/create");
	},
	onSearch:function(){
		var me=this;
		var params = new Object();
		var invdateto_from = this.lookupReference('invdateto_from');
		var invdateto_to = this.lookupReference('invdateto_to');
		var orgfrom_code = this.lookupReference('orgfrom_code');
		var status = this.lookupReference('status');
		
		params.invdateto_from = invdateto_from.getValue();
		params.invdateto_to = invdateto_to.getValue();
		params.orgfrom_code = orgfrom_code.getValue();
		params.status = status.getValue();

		var store = this.getView().getStore();
		me.getView().setLoading(true);
		GSmartApp.Ajax.setProxy(store,'/api/v1/invcheck/invcheck_list',params,function(records, operation, success) {me.getView().setLoading(false);})
	},
	onItemdblclick: function(grid, record, index, e, eOpts ){
		var id = record.get('id');
		this.redirectTo("invcheck/"+id+"/edit");
	},
	onEdit:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		this.redirectTo("invcheck/"+id+"/edit");
	},
	onDelete:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		var store = this.getView().getStore();
		Ext.Msg.show({
			title:GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale],
			message:GSmartApp.Locales.title_dongkiemke[GSmartApp.Locales.currentLocale],
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					var record = grid.getStore().getAt(rowIndex);
					if(!isNaN(id)){
						GSmartApp.Ajax.post('/api/v1/invcheck/invcheck_deactive','{"id": '+id+'}',function(success,response,options ) {
							store.reload();
						})
					}  
				}
			}
		});
	}
})