Ext.define('GSmartApp.store.stockout.StockoutDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockoutdetailstore',
	fields: [
         {name: 'skuname', type: 'string'},
         {name: 'skucode',  type: 'string'},
         {name: 'colorname',   type: 'string'},
	     {name: 'unitname',type:'string'},
		 {name: 'totalpackage',  type: 'number'},
		 {name: 'totalyds',  type: 'number'},
		 {name: 'foc',  type: 'number'},
		 {name: 'totalpackagecheck',  type: 'number'},
		 {name: 'totalydscheck',  type: 'number'}
		 
		 
     ]
   
});
