Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_M_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        var orgstore = this.getViewModel().getStore('OrgStore');
		orgstore.loadStore(5);

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();

		var listidtype = "13,4,8,9";
        // var listidtype = "4,8,9,11,12";
		// var orgfromstore = this.getViewModel().getStore('OrgFromStore');
		// orgfromstore.loadStore_byRoot(listidtype);

		var orgtostore = this.getViewModel().getStore('OrgToStore');
		orgtostore.loadStore_allchildren_byorg(listidtype);

		var currencyStore = this.getViewModel().getStore('CurrencyStore');
		currencyStore.loadStore();

		var vattypeStore = this.getViewModel().getStore('VatTypeStore');
		vattypeStore.loadStore();
		
		var stockintype = this.getViewModel().getStore('StockinTypeStore');
		stockintype.loadStore();
	},
	control:{
		'#loaitien':{
            select: 'onSelectCurency'
		},
		'#btnInvoice_Search':{
            click: 'onInvoice_Search'
        }
    },
    onSelectCurency: function(combo, record, eOpts ){
       var viewModel = this.getViewModel();
	   viewModel.set('stockin.vat_exchangerate', record.data.exchangerate);
	   viewModel.set('curencycode',record.data.code);
	},
	onInvoice_Search:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var invoice_number = viewModel.get('stockin.invoice_number');
		var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chọn Invoice',
            closeAction: 'destroy',
			height: Ext.getBody().getViewSize().height * .95,
			width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'InvoicePickup_Main'
            }],
            viewModel: {
                data: {
                    invoice_number: invoice_number,
                }
            }
        });
        form.show();

        form.down('#InvoicePickup_Main').getController().on('Thoat', function () {
            form.close();
        });

        form.down('#InvoicePickup_Main').getController().on('InvoicePickupSelect', function (invoice, invoice_ds) {
            // console.log(invoice);
            // console.log(invoice_ds);

            viewModel.set('stockin.invoice_number', invoice.invoicenumber);
            viewModel.set('stockin.invoice_date', invoice.invoicedate);
            viewModel.set('stockin.material_invoiceid_link', invoice.id);
            viewModel.set('stockin.stockin_d', null);

            var stockin = viewModel.get('stockin');
            var stockin_d = viewModel.get('stockin.stockin_d');
            if(stockin_d == null){
                stockin_d = new Array();
            }

            for(var i = 0; i < invoice_ds.length; i++){
                var invoice_d = invoice_ds[i];
                // var found = stockin_d.some(item => item.skuid_link === npl.get('id'));
                var found = false;
                if(!found){
                    var stockin_dObj = new Object();
                    stockin_dObj.skuid_link = invoice_d.get('skuid_link');
                    stockin_dObj.skucode = invoice_d.get('skucode');
                    stockin_dObj.skuname = invoice_d.get('skuname');
                    stockin_dObj.color_name = invoice_d.get('color_name');
                    stockin_dObj.size_name = invoice_d.get('size_name');
                    stockin_dObj.totalpackage = invoice_d.get('totalpackage');
                    stockin_dObj.netweight = invoice_d.get('netweight');
                    stockin_dObj.grossweight = invoice_d.get('grossweight');
                    stockin_dObj.m3 = invoice_d.get('m3');
                    stockin_dObj.unitprice = invoice_d.get('unitprice');
                    stockin_dObj.totalamount = invoice_d.get('totalamount');
                    stockin_dObj.totalydsorigin = invoice_d.get('yds');
                    stockin_dObj.totalydscheck = 0;
                    stockin_dObj.totalmet_origin = invoice_d.get('yds') * 0.9144;
                    stockin_dObj.totalmet_check = 0;
                    stockin_dObj.unitid_link = invoice_d.get('unitid_link');
                    stockin_dObj.unit_name = invoice_d.get('unitname');

                    //
                    var packinglist = invoice_d.get('packinglist');
                    var stockin_packinglist = new Array();

                    for(var j = 0; j < packinglist.length; j++){
                        var pkl = packinglist[j]; 
                        // console.log(pkl);
                        var stockin_packinglistObj = new Object();
                        stockin_packinglistObj.grossweight = pkl.grossweight;
                        stockin_packinglistObj.netweight = pkl.netweight;
                        stockin_packinglistObj.width = pkl.width;
                        stockin_packinglistObj.width_check = 0;
                        stockin_packinglistObj.m3 = pkl.m3;
                        stockin_packinglistObj.sizenumber = pkl.sizenumber;
                        stockin_packinglistObj.skuid_link = pkl.skuid_link;
                        stockin_packinglistObj.skucode = pkl.skucode;
                        stockin_packinglistObj.skuname = pkl.skuname;
                        stockin_packinglistObj.lotnumber = pkl.lotnumber;
                        stockin_packinglistObj.packageid = pkl.packageid;
                        stockin_packinglistObj.ydsorigin = pkl.ydsorigin;
                        stockin_packinglistObj.ydscheck = 0;
                        stockin_packinglistObj.met_origin = pkl.ydsorigin * 0.9144;
                        stockin_packinglistObj.met_check = 0;

                        stockin_packinglist.push(stockin_packinglistObj);
                    }

                    stockin_dObj.stockin_packinglist = stockin_packinglist;

                    stockin_d.push(stockin_dObj);
                }
            }

            viewModel.set('stockin.stockin_d', stockin_d);

            // console.log(invoice_ds);
            // console.log(stockin);

            form.close();
        });
	},
})