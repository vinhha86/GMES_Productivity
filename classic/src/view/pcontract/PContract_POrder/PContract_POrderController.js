Ext.define('GSmartApp.view.pcontract.PContract_POrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrderController',
    init: function () {
        
    },
    control:{
        '#btnSKUSelect':{
            click: 'onSKUSelect'
        },
        '#productFilter': {
            select: 'onFilterProduct'
        },
        'PContract_POList': {
            itemclick: 'onSelectPO'
        },
        'PContract_POrder_Porders': {
            itemclick: 'onSelectPOrder'
        }
    },
    onFilterProduct: function(combo, record, eOpts ){
        var store = this.getViewModel().getStore('PContractPOList');
        var productid_link = record.get('productid_link');
        var pcontractid_link = this.getViewModel().get('PContract.id');

        store.loadStore(pcontractid_link , productid_link);
    },
    onSelectPO: function(m, rec){
        var viewmodel = this.getViewModel();
        var po_id = rec.data.id;
        var pcontractid_link = rec.data.pcontractid_link;
        viewmodel.set('po_selected', rec.data);

        //Lay danh sach POrders
        var porderStore = viewmodel.getStore('porderStore');
        porderStore.loadByPO(pcontractid_link,po_id);

    },
    onSelectPOrder: function(m, rec){
        var viewmodel = this.getViewModel();
        var porder_id = rec.data.id;

        //Lay danh sach POrders_SKU
        var porderSKUStore = viewmodel.getStore('porderSKUStore');
        porderSKUStore.loadByPorderID(porder_id);

    },
    onXoaSKU: function(rid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Lệnh sản xuất', 'Bạn có thực sự muốn xóa SKU? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var porderSKUStore = viewmodel.getStore('porderSKUStore');
                    var record = porderSKUStore.getAt(rowIndex);
                    var params=new Object();
                    params.data = record.data;
                    GSmartApp.Ajax.post('/api/v1/porder/delete_sku', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            var porderSKUStore = viewmodel.getStore('porderSKUStore');
                            porderSKUStore.reload();
                        } else {
                            Ext.MessageBox.show({
                                title: "Lệnh sản xuất",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    }); 
                }
            } );        

    },
    onSKUSelect: function(){
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po_selected');
        var porderView = Ext.getCmp('PContract_POrder_Porders');
        var porder_data = porderView.getView().selection.data;
        if (null != porder_data){
            var form = Ext.create('Ext.window.Window', {
                height: 500,
                closable: true,
                title: 'Chi tiết màu, cỡ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 400,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'PContract_POrder_SKUSelect',
                    pcontract_poid_link: porder_data.pcontract_poid_link,
                    pcontractid_link: porder_data.pcontractid_link,
                    porderid_link: porder_data.id
                }]
            });
            form.show();
         
        }
    },    
})