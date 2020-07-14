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
        var objDel = grid.getStore().getAt (rowIndex);

        //Chi xoa cac Sizeset != ALL
        if (objDel.data.sizesetid_link != 1){
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
                        
                        var colDel = grid.getStore().query('sizesetid_link',objDel.data.sizesetid_link);
                        console.log(colDel);
                        grid.getStore().remove(colDel.items);
                    }
                }
            });
        }
    },
    
    onItemSelect: function(m, rec){
        var viewModel = this.getViewModel();
        viewModel.set('po_price', rec.data);

        var Price_DStore = viewModel.getStore('Price_DStore');
        Price_DStore.loadData(rec.data.pcontract_price_d);
    },
    onSizesetItemEdit: function(editor, e){
        var viewmodel = this.getViewModel();
        var priceStore = viewmodel.getStore('PriceStore');
        var price_data = e.record.data;

        priceStore.clearFilter();
        priceStore.each(function (record) {
            //Neu la lenh moi (sencha tu sinh id) --> set = null
            if(record.data.sizesetid_link == price_data.sizesetid_link) record.data.quantity = price_data.quantity;
        });
        priceStore.filter('productid_link',viewmodel.get('product_selected_id_link'));
    },
    onSizesetBeforeEdit: function(editor, context, eOpts){
        if (context.record.data.sizesetid_link ==1) context.cancel = true;
    },
    renderSum: function(value, summaryData, dataIndex){
        var viewmodel = this.getViewModel();
        var po_totalorder = viewmodel.get('po.po_quantity');
        if (null == po_totalorder) po_totalorder = 0;
        if (null == value) value = 0;
        if (po_totalorder != value){
            viewmodel.set('isSizeset_CheckOK', false);
            return '<div style="font-weight: bold; color:red;">' + Ext.util.Format.number(value, '0,000') + '</div>';   
        }
        else {
            viewmodel.set('isSizeset_CheckOK', true);
            return '<div style="font-weight: bold; color:black;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
        }
    }
})