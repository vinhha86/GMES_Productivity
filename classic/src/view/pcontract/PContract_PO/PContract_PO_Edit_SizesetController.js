Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_SizesetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_SizesetController',
    control: {      
        '#btnSizesetSelect': {
            click: 'onSizesetSelect'
        }
    },    
    onSizesetSelect: function(){
        // var viewmodel = this.getViewModel();
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
    },
    onXoa: function(grid, rowIndex, colIndex){
        var th=this;
        
        Ext.Msg.show({
            title: "Thông báo",
            msg: 'bạn có chắc chắn muốn xóa SKU ?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function(btn){
                if(btn==='yes'){
                    grid.getStore().removeAt (rowIndex);
                    // // var record = grid.getStore().getAt (rowIndex);
                    var po_pricelist = th.getViewModel().get('po.pcontract_price');
                    Ext.Array.removeAt(po_pricelist,rowIndex);
                    // console.log(po_pricelist);
                }
            }
        });
    }    
})