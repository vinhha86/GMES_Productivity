Ext.define('GSmartApp.view.invoice.InvoiceEdit_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceEdit_D_Controller',
	init: function() {
        var me = this.getView();
        var store = me.getStore();
        store.getSorters().add('skuname');
        store.getSorters().add('skucode');
    },
    control: {
		'#btnThuGon': {
			click: 'onhiddenMaster'
		},
		'#btnMoRong': {
			click: 'onhiddenMaster'
		},
        '#btnThemNPL': {
            click: 'onBtnThemNPL'
        },
        '#btnTimNPL': {
            click: 'onBtnTimNPL'
        },
        '#skucode': {
            // specialkey: 'onSpecialkey'
        },
		// '#btnTimDonHang': {
		// 	click: 'onBtnTimDonHang'
		// },      
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    onBtnThemNPL: function(){
        console.log('onBtnThemNPL');
    },
    onBtnTimNPL: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var skucode = viewModel.get('skucode');
        // console.log(pcontractSearch);

        if(skucode == null || skucode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã NPL không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 800,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            // title: 'Danh sách lệnh',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'invoice_nplsearch',
                viewModel: {
                    type: 'invoice_nplsearch_ViewModel',
                    data: {
                        skucode: skucode
                    }
                }
            }]
        });
        form.show();

        form.down('#invoice_nplsearch').getController().on('invoice_nplsearchThoat', function () {
            form.close();
        });

        form.down('#invoice_nplsearch').getController().on('invoice_nplsearchLuu', function (select) {
            // console.log(select);
            var invoice = viewModel.get('invoice');
            var invoiced = viewModel.get('invoice.invoice_d');
            if(invoiced == null){
                invoiced = new Array();
            }

            for(var i = 0; i < select.length; i++){
                var npl = select[i];
                var found = invoiced.some(item => item.skuid_link === npl.get('id'));
                // skucode, skuname, color_name, size_name
                // code, name, tenMauNPL, coKho
                if(!found){
                    var invoicedObj = new Object();
                    invoicedObj.skuid_link = npl.get('id');
                    invoicedObj.skucode = npl.get('code');
                    invoicedObj.skuname = npl.get('name');
                    invoicedObj.color_name = npl.get('mauSanPham');
                    invoicedObj.size_name = npl.get('coSanPham');
                    invoiced.push(invoicedObj);
                }
            }

            // invoice.set('invoiced', []);
            // invoice.set('invoiced', invoiced);
            // viewModel.getStore('Price_D_SKUStore').loadData(invoiced);
            // console.log(invoiced);
            me.getStore().loadData(invoiced);

            form.close();
            console.log(invoice);
        });

        // var form = Ext.create({
        //     xtype: 'skusearchwindow',
        //     width: 1200,
        //     height: 500,       
        //     reference: 'skusearchwindow',
        //     closeAction: 'destroy',
        //     viewModel: {
        //         data: {
        //             sourceview: 'InvoiceEdit_D',
        //             searchtype: 5,
        //             // pcontractid_link: viewModel.get('PContract.id'),
        //             // productid_link_notsearch: productid_link,
        //             isAddNPL: true,
        //             isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
        //             isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
        //         }
        //     }
        // });
        // form.show();
    },
    onViewPackingList: function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var data = grid.getStore().getAt(rowIndex);
        var invoicedid_link = data.get('id');

        var form = Ext.create('Ext.window.Window', {
            height: 500,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chi tiết Packing List - SKU : ' + data.get('skucode'),
            closeAction: 'destroy',
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Invoice_packinglist'
            }],
            viewModel: {
                data: {
                    packinglist: {
                        invoicedid_link: invoicedid_link,
                        invoiceid_link: viewmodel.get('invoice.id'),
                        skuid_link: data.get('skuid_link')
                    }
                }
            }
        });
        form.show();
    },
    onXoa: function(){
        
    },
    onSpecialkey: function (field, e) {
        var me = this.getView();
    
        if (e.getKey() == e.ENTER) {
          if (field.itemId == "packageid") {
            me.down('#netweight').focus();
          }
        }
    },
    onhiddenMaster: function () {
		var viewModel = this.getViewModel();
		var formMaster = Ext.getCmp('InvoiceEdit_M');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster', !isHidden);

		formMaster.setHidden(!isHidden);
    },
    
    // tìm đơn hàng > sản phẩm > nguyên phụ liệu > đẩy vào danh sách > điền thông tin ĐVT
    // onBtnTimDonHang: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var invoice = viewModel.get('invoice');
    //     var pcontractSearch = viewModel.get('pcontractSearch');
    //     // console.log(pcontractSearch);

    //     if(pcontractSearch == null || pcontractSearch.length == 0){
    //         Ext.Msg.show({
    //             title: 'Thông báo',
    //             msg: 'Đơn hàng không được bỏ trống',
    //             buttons: Ext.MessageBox.YES,
    //             buttonText: {
    //                 yes: 'Đóng',
    //             }
    //         });
    //         return;
    //     }
    //     var form = Ext.create('Ext.window.Window', {
    //         height: 400,
    //         width: 1000,
    //         closable: true,
    //         resizable: false,
    //         modal: true,
    //         border: false,
    //         // title: 'Danh sách lệnh',
    //         closeAction: 'destroy',
    //         bodyStyle: 'background-color: transparent',
    //         layout: {
    //             type: 'fit', // fit screen for window
    //             padding: 5
    //         },
    //         items: [{
    //             xtype: 'invoice_pcontractsearch',
    //             viewModel: {
    //                 type: 'invoice_pcontractsearch_ViewModel',
    //                 data: {
    //                     pcontractSearch: pcontractSearch
    //                 }
    //             }
    //         }]
    //     });
    //     form.show();

    //     form.down('#invoice_pcontractsearch').getController().on('pcontractsearchThoat', function () {
    //         form.close();
    //     });

    //     form.down('#invoice_pcontractsearch').getController().on('pcontractsearchLuu', function (select) {
    //         // console.log(select);
    //         var invoiced = viewModel.get('invoice.invoice_d');
    //         if(invoiced == null){
    //             invoiced = new Array();
    //         }

    //         for(var i = 0; i < select.length; i++){
    //             var npl = select[i];
    //             var found = invoiced.some(item => item.skuid_link === npl.get('materialid_link'));
    //             // skucode, skuname, color_name, size_name
    //             // materialCode, materialName, tenMauNPL, coKho
    //             if(!found){
    //                 var invoicedObj = new Object();
    //                 invoicedObj.skuid_link = npl.get('materialid_link');
    //                 invoicedObj.skucode = npl.get('materialCode');
    //                 invoicedObj.skuname = npl.get('materialName');
    //                 invoicedObj.color_name = npl.get('tenMauNPL');
    //                 invoicedObj.size_name = npl.get('coKho');
    //                 invoiced.push(invoicedObj);
    //             }
    //         }

    //         // invoice.set('invoiced', []);
    //         // invoice.set('invoiced', invoiced);
    //         // viewModel.getStore('Price_D_SKUStore').loadData(invoiced);
    //         // console.log(invoiced);
    //         me.getStore().loadData(invoiced);

    //         form.close();
    //     });
    // },
    renderUnit: function(val, meta, record, rindex, cindex, store) {
        if (null != val){
            var viewModel = this.getViewModel();
            var UnitStore = viewModel.getStore('UnitStore');
            if (null!=UnitStore){
                var objUnit = UnitStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.code;
            }
        }
    },
})