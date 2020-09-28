Ext.define('GSmartApp.view.pcontract.PContract_Product_SKU.InsertPO.ListPO_OfferController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListPO_OfferController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractProductPOStore');
        var pcontractid_link = viewmodel.get('po.pcontractid_link');
        var productid_link = viewmodel.get('productid_link');
        store.loadAccept_ByContract(pcontractid_link,productid_link);
    },
    control:{
        'ListPO_Offer' : {
            select: 'onSelectOffer'
        }
    },
    onSelectOffer: function( grid, record, index, eOpts){
        var viewmodel = this.getViewModel();
        viewmodel.set('po.parentpoid_link', record.get('id'));

        var new_po = new GSmartApp.model.pcontract.PContractPO();
            new_po.data.id = null;

            //Lay thong tin parent po
            var params = new Object();
            params.id = viewmodel.get('po.parentpoid_link');
            GSmartApp.Ajax.post('/api/v1/pcontract_po/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if(response.respcode == 200){
                        var parent_po = response.data;
                        new_po.data.pcontractid_link = parent_po.pcontractid_link;
                        new_po.data.productid_link = parent_po.productid_link;
                        new_po.data.shipdate = parent_po.shipdate;
                        new_po.data.matdate = parent_po.matdate;
                        new_po.data.productiondate = parent_po.productiondate;
                        new_po.data.productiondays = parent_po.productiondays;
                        new_po.data.merchandiserid_link = parent_po.merchandiserid_link;
                        new_po.data.packingnotice = parent_po.packingnotice;
                        new_po.data.parentpoid_link = parent_po.id;
                        new_po.data.sewtarget_percent = parent_po.sewtarget_percent;
                        new_po.data.shipmodeid_link = parent_po.shipmodeid_link;
                        new_po.data.qcorgname = parent_po.qcorgname;
                        new_po.data.plan_productivity = parent_po.plan_productivity;
                        
                        var packing_str = response.data.packingnotice;
                        if(packing_str!=null){
                            new_po.data.packingnotice = packing_str.split(';');
                        }
                        viewmodel.set('po',  new_po.data);
                        // viewmodel.set('po.po_buyer', record.get('po_buyer'));
                        // viewmodel.set('po.po_vendor', record.get('po_vendor'));
                        viewmodel.set('po.productid_link', record.get('productid_link'));

                        //Lay danh sach POrder_Req
                        // console.log(viewmodel.get('parentpoid_link'));
                        var porderReqStore = viewmodel.getStore('porderReqStore');
                        porderReqStore.loadByPO_Async(viewmodel.get('po.parentpoid_link'));
                        porderReqStore.load({
                            scope: this,
                            callback: function(records, operation, success) {
                                if(!success){
                                    //  this.fireEvent('logout');
                                } else {
                                    porderReqStore.each(function (record) {
                                        record.data.id = null
                                    });
                                }
                            }
                        });                                
                        
                        
                        var productStore = viewmodel.getStore('ProductStore');
                        if(productStore != null){
                            if(record.get('productid_link') > 0)
                                productStore.loadStore_bypairid_Async(record.get('productid_link'));
                                productStore.load();
                        }
                    }
                }
            })  
    }
})