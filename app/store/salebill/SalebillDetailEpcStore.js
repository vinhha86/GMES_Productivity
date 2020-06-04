Ext.define('GSmartApp.store.salebill.SalebillDetailEpcStore', {
    extend: 'Ext.data.Store',
    alias: 'store.salebilldetailepcstore',
	fields: [
		 {name: 'epc', type: 'string'},
	     {name: 'oldepc', type: 'string'},
		 {name: 'tid', type: 'string'},
         {name: 'skuname', type: 'string'},
         {name: 'skucode',  type: 'string'},
         {name: 'unitname',   type: 'string'},
		 {name: 'amount',  type: 'number'},
		 {name: 'unitprice',  type: 'number'},
		 {name: 'discountpercent',  type: 'number'},
		 {name: 'discount',  type: 'number'},
		 {name: 'totalamount',  type: 'number'},
		 {name: 'vatpercent',  type: 'number'},
		 {name: 'totalvat',  type: 'number'},
		 {name: 'totalsum',  type: 'number'},
		 
     ]
   
});
