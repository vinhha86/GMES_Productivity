Ext.define('GSmartApp.store.pcontract.PContract_porder_gantt_store', {
    extend: 'Gnt.data.TaskStore',
	alias: 'store.PContract_porder_gantt_store',
	requires: ['GSmartApp.model.pcontract.PContract_porder_gantt_model'],
	model: 'GSmartApp.model.pcontract.PContract_porder_gantt_model',
	sorters: [{
        property: 'id_origin',
        direction: 'ASC'
    }],
    loadStore: function(porder_from, porder_to, listid){
		var me=this;
        var params = new Object();
        params.porder_from = porder_from;
        params.porder_to = porder_to;
        params.listid = listid;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/gantt/getporder_po_gantt',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'children'
			}
		});
		this.load();
	}
});
