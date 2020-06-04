Ext.define('GSmartApp.view.invcheck.InvCheckListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.invchecklist',
	init: function() {
        this.callParent(arguments);
		//Ext.getStore('WareHouseStore').invCheckLoadStore(3);
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onUrlBack',
            }
        }
    },
	onUrlBack:function(type){
		var me=this;
		if(type.getId()=='lsinvcheck'){
			Ext.getStore('WareHouseStore').GetOrgDest('lsinvcheck');
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			
			var formInvCheckList = this.lookupReference('formInvCheckList');
			var values = formInvCheckList.getValues();
			values.invdateto_from = new Date();
			values.invdateto_to = new Date();
			var gridInvCheckList = this.lookupReference('gridInvCheckList');
			var url=config.getAppBaseUrl()+ '/api/v1/invcheck/invcheck_list';
			var store = gridInvCheckList.getStore();
			me.getView().setLoading(true);
			GSmartApp.Ajax.setProxy(store,'/api/v1/invcheck/invcheck_list',values,function(records, operation, success) {me.getView().setLoading(false);})
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
		var view =this.getView();
		var viewModel = view.getViewModel();
		var params = new Object();
		var view = this.getView();
		var formInvCheckList = this.lookupReference('formInvCheckList');
		var values = formInvCheckList.getValues();
		values.invdateto_from =  new Date(values.invdateto_from);
		values.invdateto_to =  new Date(values.invdateto_to);
		var gridInvCheckList = this.lookupReference('gridInvCheckList');
		var url=config.getAppBaseUrl()+ '/api/v1/invcheck/invcheck_list';
		var store = gridInvCheckList.getStore();
		me.getView().setLoading(true);
		GSmartApp.Ajax.setProxy(store,'/api/v1/invcheck/invcheck_list',values,function(records, operation, success) {me.getView().setLoading(false);})
	},
	onEdit:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry= viewModel.get('urlback');
		this.redirectTo(entry.get('urlc')+"/"+id+"/edit");
	},
	onDelete:function(grid, rowIndex, colIndex){
		var record = grid.getStore().getAt(rowIndex);
		var id = record.get('id');
		var gridInvCheckList = this.lookupReference('gridInvCheckList');
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
							var store = gridInvCheckList.getStore();
							store.load();
						})
					}  
					gridInvCheckList.getStore().remove(info.record);
				}
			}
		});
	}
})