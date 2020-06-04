Ext.define('GSmartApp.store.stockout.StockoutListStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockoutliststore',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'stockoutcode',  type: 'string'},
		{
			name: 'stockoutdate', 
			convert: function (value) {
				 var date =  new Date(value)
				return date.toLocaleDateString(GSmartApp.util.State.get('dataFormatList'));
			 }
		},
		{name: 'orgfrom_code',   type: 'string'},
		{name: 'orgfrom_name',   type: 'string'},
		{name: 'stockcode',   type: 'string'},
		{name: 'shipperson',   type: 'string'},
		{name: 'productcode',   type: 'string'},
		{name: 'productname',   type: 'string'},
		{name: 'totalpackage',   type: 'number'},
		{
			name: 'status',   
			convert: function (value) {
				 if(1==value){
					 return "Đã nhâp kho";
				 }else{
					 return "Chưa nhâp kho"
				 }
			 }}
	]
});
