Ext.define('GSmartApp.store.invcheck.InvCheckDetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.invcheckdetailstore',
	fields: [
         {name: 'skuname', type: 'string'},
         {name: 'skucode',  type: 'string'},
         {name: 'colorname',   type: 'string'},
	     {name: 'unitname',type:'string'},
		 {name: 'unitprice',  type: 'number'},
		 {name: 'ydsorigin',  type: 'number'},
		 {name: 'ydscheck',  type: 'number'},
		 {name: 'epcs'},
		 {name: 'totalpackage',  type: 'number'},
		 {name: 'totalpackagecheck',  type: 'number'},
		 {name: 'totalamount',  type: 'number'},
		 {
			name: 'totalamountcheck',
            type: 'number',
            calculate: function(data) {
                return data.unitprice*data.ydscheck;
			}
		 },
		 {
			name: 'ydsdiff',
            type: 'number',
            calculate: function(data) {
                return data.ydsorigin - data.ydscheck;
			}
		 },
		 {
			name: 'totalamountdiff',
            type: 'number',
            calculate: function(data) {
                return data.unitprice*(data.ydsorigin - data.ydscheck);
			}
		 }
     ]
   
});
