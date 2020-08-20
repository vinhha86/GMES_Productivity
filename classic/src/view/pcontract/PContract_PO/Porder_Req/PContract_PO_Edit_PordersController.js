Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_PordersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_PordersController',
    onDropOrg: function(node, data, dropRec, dropPosition){

    },    
    onBeforeDropOrg:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
        var viewmodel = this.getViewModel();
        // console.log(data.records[0]);
        //Chi cho phep keo phan xuong
        if (data.records[0].get('parentId') == 'root') {
            var orgId = data.records[0].get('id_origin');
            var orgCode = data.records[0].get('code');
            // var orgName = data.records[0].get('Name');
            var pcontractid_link = viewmodel.get('po.pcontractid_link');
            var pcontract_poid_link = viewmodel.get('po.id');

            // var porderStore = viewmodel.getStore('POrderStore');
            var porderReqStore = viewmodel.getStore('porderReqStore');
            var priceStore = viewmodel.getStore('PriceStore');
            var rootproductid_link = viewmodel.get('productpairid_link');
            var po = viewmodel.get('po');

            var lstSizeset = priceStore.queryBy(function(record,id){
                return (record.get('productid_link') == rootproductid_link);
            }).items;

            // for(i=0; i<lstSizeset.length; i++){
            //     var price_data = lstSizeset[i].data;
                //Check xem co trung thong tin khong
                var lstCheck = porderReqStore.queryBy(function(record,id){
                    // return (record.get('granttoorgid_link') == orgId
                    //     && record.get('sizesetid_link') == price_data.sizesetid_link
                    // );
                    return (record.get('granttoorgid_link') == orgId
                );
                }).items;
                if (lstCheck.length == 0){
                    var porder_New = new Object({
                        id: null,
                        pcontractid_link : pcontractid_link,
                        pcontract_poid_link: pcontract_poid_link,
                        // sizesetid_link : price_data.sizesetid_link,
                        // sizesetname: price_data.sizesetname,
                        granttoorgid_link: orgId,
                        granttoorgcode: orgCode,
                        totalorder: po.po_quantity
                    });
                    // console.log(porder_New);
                    porderReqStore.insert(0,porder_New);
                }
            // }
        }
        //Huy bo de khong bi mat thogn tin ben Gantt
        dropHandlers.cancelDrop();
    },
    renderSum: function(value, summaryData, dataIndex){
        var viewmodel = this.getViewModel();
        var po_totalorder = viewmodel.get('po.po_quantity');
        if (null == po_totalorder) po_totalorder = 0;
        if (null == value) value = 0;
        if (po_totalorder != value){
            viewmodel.set('isPorderReq_CheckOK', false);
            return '<div style="font-weight: bold; color:red;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
        }
        else {
            viewmodel.set('isPorderReq_CheckOK', true);
            return '<div style="font-weight: bold; color:black;">' + Ext.util.Format.number(value, '0,000') + '</div>';
        }
    },
    onXoa: function(grid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        var objDel = grid.getStore().getAt (rowIndex);

        Ext.Msg.confirm('Yêu cầu SX', 'Bạn có thực sự muốn xóa Yêu cầu SX? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    grid.getStore().remove(objDel);

                    if(Ext.isNumber(objDel.data.id)){
                        var porderReqStore = viewmodel.getStore('porderReqStore');
                        var params=new Object();
                        params.id = objDel.data.id;
                        GSmartApp.Ajax.post('/api/v1/porder_req/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (!success) {
                                Ext.MessageBox.show({
                                    title: "Yêu cầu SX",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                            porderReqStore.reload();
                        }); 
                    }
                }
            } );        
    },     
})