Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_PordersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_PordersController',
    onDropOrg: function(node, data, dropRec, dropPosition){

    },    
    onBeforeDropOrg:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
        var viewmodel = this.getViewModel();
        var orgId = data.records[0].get('Id');
        var orgCode = data.records[0].get('Code');
        var orgName = data.records[0].get('Name');
        var pcontractid_link = viewmodel.get('po.pcontractid_link');
        var pcontract_poid_link = viewmodel.get('po.id');

        var porderStore = viewmodel.getStore('POrderStore');
        var priceStore = viewmodel.getStore('PriceStore');
        var rootproductid_link = viewmodel.get('productpairid_link');

        var lstSizeset = priceStore.queryBy(function(record,id){
            return (record.get('productid_link') == rootproductid_link);
        }).items;

        for(i=0; i<lstSizeset.length; i++){
            var price_data = lstSizeset[i].data;
            //Check xem co trung thong tin khong
            var lstCheck = porderStore.queryBy(function(record,id){
                return (record.get('granttoorgid_link') == orgId
                    && record.get('sizesetid_link') == price_data.sizesetid_link
                );
            }).items;
            if (lstCheck.length == 0){
                var porder_New = new Object({
                    pcontractid_link : pcontractid_link,
                    pcontract_poid_link: pcontract_poid_link,
                    sizesetid_link : price_data.sizesetid_link,
                    sizesetname: price_data.sizesetname,
                    granttoorgid_link: orgId,
                    granttoorgname: orgCode,
                    totalorder: price_data.quantity
                });
                // console.log(porder_New);
                porderStore.insert(0,porder_New);
            }
        }

        //Huy bo de khong bi mat thogn tin ben Gantt
        dropHandlers.cancelDrop();
    },
})