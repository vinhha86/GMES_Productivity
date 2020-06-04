Ext.define('GSmartApp.store.stockin.StockinDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.stockindetailstore',
	fields: [
		 {name: 'skuid_link', type: 'number'},
         {name: 'skuname', type: 'string'},
         {name: 'skucode',  type: 'string'},
         {name: 'colorid_link',   type: 'number'},
		 {name: 'colorname',   type: 'string'},
	     {name: 'unitname',type:'string'},
		 {name: 'unitid_link',type:'number'},
		 {name: 'totalpackage',  type: 'number'},
		 {name: 'totalyds',  type: 'number'},
		 {name: 'ydsorigin',  type: 'number'},
		 {name: 'foc',  type: 'number'},
		 {name: 'totalpackagecheck',  type: 'number'},
		 {name: 'totalydscheck',  type: 'number'},
		 {name: 'epc', type: 'string'},
	     {name: 'oldepc', type: 'string'},
		 {name: 'tid', type: 'string'},
	     {name: 'packinglist'},
		  {name: 'rssi',  type: 'number'}
		 
     ]
   
});
