Ext.define('GSmartApp.view.invoice.InvoiceEdit_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceEdit_D_Controller',
	init: function() {
    },
    control: {
        '#btnTimNPL': {
            click: 'onSearch'
        },
        '#skucode': {
            specialkey: 'onSpecialkey'
        }
    },
    renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    onSearch: function(){
        var viewmodel = this.getViewModel();

        if(viewmodel.get('invoice.id') == null){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn phải tạo invoice trước khi thêm Nguyên phụ liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else{
            var form =Ext.create({
                xtype: 'skusearchwindow',
                reference:'skusearchwindow',
                viewModel: {
                    data: {
                        sourceview: 'InvoiceEdit_D',
                        searchtype: 5,
                        pcontractid_link: 0,
                        orgcustomerid_link: 0,
                        invoiceid_link: viewmodel.get('invoice.id')
                        // cust_contractcode: viewmodel.get('PContract.cust_contractcode'),
                        // contractcode: viewmodel.get('PContract.contractcode')
                    }
                }
            });
            form.show();
        }
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
      }
})