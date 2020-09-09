Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_PordersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_PordersController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('porderReqStore');
        store.setGroupField('product_code');
    },
    onDropOrg: function (node, data, dropRec, dropPosition) {

    },
    onBeforeDropOrg: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var viewmodel = this.getViewModel();
        //Chi cho phep keo phan xuong
        if (data.records[0].get('parentId') == 'root') {
            var orgId = data.records[0].get('id_origin');
            var orgCode = data.records[0].get('code');
            var pcontractid_link = viewmodel.get('po.pcontractid_link');
            var pcontract_poid_link = viewmodel.get('po.id');

            var porderReqStore = viewmodel.getStore('porderReqStore');
            var po = viewmodel.get('po');

            var ProductStore = viewmodel.getStore('ProductStore');
            var list_product = [];

            if (ProductStore.data.length == 1) {
                //San pham don chiec
                list_product.push(ProductStore.data.items[0].data);
            }
            else {
                //San pham bo
                for (var i = 1; i < ProductStore.data.length; i++) {
                    list_product.push(ProductStore.data.items[i].data);
                }
            }

            for (var j = 0; j < list_product.length; j++) {
                var data = list_product[j];
                data.pairamount = data.pairamount == null ? 1 : data.pairamount;

                var lstCheck = porderReqStore.queryBy(function (record, id) {
                    return (record.get('granttoorgid_link') == orgId && record.get('productid_link') == data.id);
                }).items;

                //Chi thuc hien tinh toan khi chua co Phan xuong va San pham trong POrder_req
                if (lstCheck.length == 0){
                    var porder_New = new Object({
                        id: null,
                        pcontractid_link: pcontractid_link,
                        pcontract_poid_link: pcontract_poid_link,
                        // sizesetid_link : price_data.sizesetid_link,
                        // sizesetname: price_data.sizesetname,
                        granttoorgid_link: orgId,
                        granttoorgcode: orgCode,
                        productid_link : data.id,
                        product_code : data.code,
                        amount_inset: data.pairamount
                        // totalorder: po.po_quantity
                    });
                    porderReqStore.insert(0, porder_New);

                    //Tinh tong so cac Row duoc danh dau fix (ko tinh tu dong) va tong so luong fix
                    var count = 0;
                    var amount_fix = 0;
                    for (var i = 0; i < porderReqStore.data.length; i++) {
                        var record = porderReqStore.data.items[i];
                        if(record.get('productid_link') == data.id){
                            if (record.get('is_calculate')) {
                                amount_fix += record.get('totalorder');
                            }
                            else
                                count++;
                        }
                    }

                    //Chia deu so luong cho cac phan xuong
                    var po_quantity = viewmodel.get('po.po_quantity') == null ? 0 : parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi, ''));
                    po_quantity = po_quantity * data.pairamount;
                    po_quantity -= amount_fix;
                    var org_quantity = Math.round(po_quantity / count);

                    porderReqStore.each(function (record) {
                        if (!record.get('is_calculate') && record.get('productid_link') == data.id) {
                            if (po_quantity-org_quantity >= org_quantity ){
                                record.set('totalorder', org_quantity);
                                po_quantity = po_quantity - org_quantity;
                            }
                            else
                                record.set('totalorder', po_quantity);//Lay phan con lai
                        }
                    });  

                }
            }
        }
        //Huy bo de khong bi mat thogn tin ben Gantt
        dropHandlers.cancelDrop();
    },
    renderSum: function (value, summaryData, dataIndex) {
        var viewmodel = this.getViewModel();
        var po_totalorder = viewmodel.get('po.po_quantity');
        if (null == po_totalorder) po_totalorder = 0;
        if (null == value) value = 0;
        if (po_totalorder != value) {
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
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var viewmodel = this.getViewModel();
        var objDel = grid.getStore().getAt(rowIndex);

        Ext.Msg.confirm('Yêu cầu SX', 'Bạn có thực sự muốn xóa Yêu cầu SX? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {

                    if (Ext.isNumber(objDel.data.id)) {
                        var porderReqStore = viewmodel.getStore('porderReqStore');
                        var params = new Object();
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
                                else {
                                    grid.getStore().remove(objDel);
                                    me.reCalculate();
                                }
                                // porderReqStore.reload();
                            });
                    } else {
                        grid.getStore().remove(objDel);
                        me.reCalculate();
                    }
                }
            });
    },
    reCalculate: function () {
        var viewmodel = this.getViewModel();

        if (viewmodel.get('po.isauto_calculate')) {
            var porderReqStore = viewmodel.getStore('porderReqStore');

            var ProductStore = viewmodel.getStore('ProductStore');
            var list_product = [];

            if (ProductStore.data.length == 1) {
                list_product.push(ProductStore.data.items[0].data);
            }
            else {
                for (var i = 1; i < ProductStore.data.length; i++) {
                    list_product.push(ProductStore.data.items[i].data);
                }
            }

            for(var j=0; j< list_product.length; j++){
                var data = list_product[j];
                var count = 0;
                var amount_fix = 0;
                for (var i = 0; i < porderReqStore.data.length; i++) {
                    var rec = porderReqStore.data.items[i];
                    if(rec.get('productid_link') != data.id) continue;

                    if (rec.get('is_calculate')) {
                        amount_fix += rec.get('totalorder');
                    }
                    else
                        count++;
                }
                var po_quantity = viewmodel.get('po.po_quantity') == null ? 0 : parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi, ''));
                po_quantity = po_quantity * data.pairamount;
                var amount = (po_quantity - amount_fix) / count;

                for (var i = 0; i < porderReqStore.data.length; i++) {
                    var rec = porderReqStore.data.items[i];
                    if(rec.get('productid_link') != data.id) continue;
                    if (!rec.get('is_calculate')) {
                        rec.set('totalorder', amount);
                    }
                }
            }

            
        }
    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('po.isauto_calculate')) {
            var porderReqStore = viewmodel.getStore('porderReqStore');

            var ProductStore = viewmodel.getStore('ProductStore');
            var list_product = [];

            if (ProductStore.data.length == 1) {
                list_product.push(ProductStore.data.items[0].data);
            }
            else {
                for (var i = 1; i < ProductStore.data.length; i++) {
                    list_product.push(ProductStore.data.items[i].data);
                }
            }

            for(var j =0; j < list_product.length; j++){
                var count = 0;
                var amount_fix = 0;
                var data = list_product[j];

                for (var i = 0; i < porderReqStore.data.length; i++) {
                    var rec = porderReqStore.data.items[i];
                    if(rec.get('productid_link') != data.id) continue;
                    if (rec.get('is_calculate')) {
                        amount_fix += rec.get('totalorder');
                    }
                    else
                        count++;
                }
    
                var po_quantity = viewmodel.get('po.po_quantity') == null ? 0 : parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi, ''));
                po_quantity = po_quantity * data.pairamount;
                var amount = (po_quantity - amount_fix - context.value) / (count - 1);
    
                var curRec = porderReqStore.getAt(context.rowIdx);
                if (po_quantity - amount_fix >= context.value) {
                    for (var i = 0; i < porderReqStore.data.length; i++) {
                        var rec = porderReqStore.data.items[i];
                        if(rec.get('productid_link') != curRec.get('productid_link')) continue;
                        if (!rec.get('is_calculate') && 
                        rec.get('granttoorgcode') != curRec.get('granttoorgcode')) {
                            rec.set('totalorder', amount);
                        }
                    }
                }
                else {
                    curRec.set('totalorder', context.originalValue);
                }
            }
        }
    }
})