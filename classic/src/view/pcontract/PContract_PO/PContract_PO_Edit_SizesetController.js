Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_SizesetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_SizesetController',
    control: {      
        '#btnSizesetSelect': {
            click: 'onSizesetSelect'
        },
        'PContract_PO_Edit_Sizeset': {
            select: 'onItemSelect'
        }
    },    
    onSizesetSelect: function(){
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('product_selected_typeid_link') && 5 != viewmodel.get('product_selected_typeid_link')){
            var form = Ext.create('Ext.window.Window', {
                height: 400,
                closable: true,
                title: 'Thêm mới dải cỡ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 300,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'PContract_PO_Edit_SizesetSelect',
                    // productid_link: viewmodel.get('productid_link')
                }]
            });
            form.show();
        } else {
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Không được thêm mới Dải cỡ cho bộ?',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                },
            });
        }
    },
    onXoa: function(grid, rowIndex, colIndex){
        var th=this;
        
        Ext.Msg.show({
            title: "Thông báo",
            msg: 'bạn có chắc chắn muốn xóa dải cỡ?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function(btn){
                if(btn==='yes'){
                    var objDel = grid.getStore().getAt (rowIndex);
                    var colDel = grid.getStore().query('sizesetid_link',objDel.data.sizesetid_link);
                    console.log(colDel);
                    grid.getStore().remove(colDel.items);
                }
            }
        });
    },
    
    onItemSelect: function(m, rec){
        var viewModel = this.getViewModel();
        viewModel.set('po_price', rec.data);

        var Price_DStore = viewModel.getStore('Price_DStore');
        Price_DStore.loadData(rec.data.pcontract_price_d);
    },
})