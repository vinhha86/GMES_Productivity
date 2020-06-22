Ext.define('GSmartApp.view.pcontract.PContract_POrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrderController',
    init: function () {
        
    },
    control:{
        '#btnSKUSelect':{
            click: 'onSKUSelect'
        },
        'PContract_POList': {
            itemclick: 'onSelectPO'
        },
        'PContract_POrder_Porders': {
            itemclick: 'onSelectPOrder'
        }
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
    onSKUSelect: function(){
        var viewmodel = this.getViewModel();
        var po_data = viewmodel.get('po_selected');
        if (null != po_data){
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
                    pcontract_poid_link: po_data.id,
                    pcontractid_link: po_data.pcontractid_link
                }]
            });
            form.show();
        }
    },    
})