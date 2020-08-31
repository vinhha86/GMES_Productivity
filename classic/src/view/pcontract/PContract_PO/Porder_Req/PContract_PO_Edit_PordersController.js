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
            var pcontractid_link = viewmodel.get('po.pcontractid_link');
            var pcontract_poid_link = viewmodel.get('po.id');

            var porderReqStore = viewmodel.getStore('porderReqStore');
            var po = viewmodel.get('po');

            var lstCheck = porderReqStore.queryBy(function(record,id){
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
                    // totalorder: po.po_quantity
                });
                // console.log(porder_New);
                porderReqStore.insert(0,porder_New);

                // //Chia deu so luong cho cac phan xuong
                var po_quantity = parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi,''));
                var org_quantity = Math.round(po_quantity/porderReqStore.data.length);

                var dis_quantity=0;

                for(i=0; i< porderReqStore.data.length; i++){
                    var rec = porderReqStore.data.items[i];
                    rec.beginedit;
                    if (i < porderReqStore.data.length -1)
                        rec.set('totalorder', org_quantity);
                    else
                        rec.set('totalorder',  po_quantity - dis_quantity);
                    rec.endedit;
                    rec.commit();
                    dis_quantity = dis_quantity + org_quantity;
                }
            }
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
    renderValue: function (value, metaData, record, rowIndex) {
        if (null == value) value = 0;
        return Ext.util.Format.number(value, '0,000');    
    } ,
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
                            // porderReqStore.reload();
                        }); 
                    }
                }
            } );        
    },  
    onEdit: function(editor, context, e){

        var viewmodel = this.getViewModel();
        var porderReqStore = viewmodel.getStore('porderReqStore');

        var total = 0;
        for(var i=0; i<porderReqStore.data.length-1;i++){
            var rec = porderReqStore.data.items[i];
            total += rec.get('totalorder');
        }

        var po_quantity = parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi,''));
        var record = porderReqStore.data.items[porderReqStore.data.length-1];

        if(po_quantity >= total){
            record.set('totalorder', po_quantity - total);
        }            
        else
        {
            var curRec = porderReqStore.getAt(context.rowIdx);
            curRec.set('totalorder', context.originalValue);
        }
        
    }  
})