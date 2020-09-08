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
        // console.log(data.records[0]);
        //Chi cho phep keo phan xuong
        if (data.records[0].get('parentId') == 'root') {
            var orgId = data.records[0].get('id_origin');
            var orgCode = data.records[0].get('code');
            var pcontractid_link = viewmodel.get('po.pcontractid_link');
            var pcontract_poid_link = viewmodel.get('po.id');

            var porderReqStore = viewmodel.getStore('porderReqStore');
            var po = viewmodel.get('po');

            var lstCheck = porderReqStore.queryBy(function (record, id) {
                return (record.get('granttoorgid_link') == orgId );
            }).items;

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

            if (lstCheck.length < list_product.length) {

                for (var j = 0; j < list_product.length; j++) {
                    var data = list_product[j];
                    console.log(data);

                    var porder_New = new Object({
                        id: null,
                        pcontractid_link: pcontractid_link,
                        pcontract_poid_link: pcontract_poid_link,
                        // sizesetid_link : price_data.sizesetid_link,
                        // sizesetname: price_data.sizesetname,
                        granttoorgid_link: orgId,
                        granttoorgcode: orgCode,
                        productid_link : data.id,
                        product_code : data.code
                        // totalorder: po.po_quantity
                    });
                    // console.log(porder_New);
                    porderReqStore.insert(0, porder_New);
                    // porderReqStore.sort('is_calculate','DESC');

                    var count = 0;
                    var amount_fix = 0;
                    for (var i = 0; i < porderReqStore.data.length; i++) {
                        var record = porderReqStore.data.items[i];
                        if(record.get('productid_link') != data.id) continue;
                        
                        if (record.get('is_calculate')) {
                            amount_fix += record.get('totalorder');
                        }
                        else
                            count++;
                    }

                    // //Chia deu so luong cho cac phan xuong
                    var po_quantity = viewmodel.get('po.po_quantity') == null ? 0 : parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi, ''));
                    po_quantity = po_quantity * data.pairamount;

                    po_quantity -= amount_fix;
                    var org_quantity = Math.round(po_quantity / count);

                    var dis_quantity = 0;

                    for (i = 0; i < porderReqStore.data.length; i++) {
                        var rec = porderReqStore.data.items[i];
                        if (rec.get('is_calculate')) continue;
                        if(rec.get('productid_link') != data.id) continue;

                        rec.beginedit;
                        if (i < porderReqStore.data.length - 1)
                            rec.set('totalorder', org_quantity);
                        else
                            rec.set('totalorder', po_quantity - dis_quantity);
                        rec.endedit;
                        rec.commit();
                        dis_quantity = dis_quantity + org_quantity;
                    }
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

            var count = 0;
            var amount_fix = 0;
            for (var i = 0; i < porderReqStore.data.length; i++) {
                var rec = porderReqStore.data.items[i];
                if (rec.get('is_calculate')) {
                    amount_fix += rec.get('totalorder');
                }
                else
                    count++;
            }
            var po_quantity = parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi, ''));

            var amount = (po_quantity - amount_fix) / count;

            for (var i = 0; i < porderReqStore.data.length; i++) {
                var rec = porderReqStore.data.items[i];
                if (!rec.get('is_calculate')) {
                    rec.set('totalorder', amount);
                }
            }
        }
    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('po.isauto_calculate')) {
            var porderReqStore = viewmodel.getStore('porderReqStore');

            var count = 0;
            var amount_fix = 0;
            for (var i = 0; i < porderReqStore.data.length; i++) {
                var rec = porderReqStore.data.items[i];
                if (rec.get('is_calculate')) {
                    amount_fix += rec.get('totalorder');
                }
                else
                    count++;
            }

            var po_quantity = viewmodel.get('po.po_quantity') == null ? 0 : parseFloat(viewmodel.get('po.po_quantity').toString().replace(/,/gi, ''));

            var amount = (po_quantity - amount_fix - context.value) / (count - 1);

            var curRec = porderReqStore.getAt(context.rowIdx);
            if (po_quantity - amount_fix >= context.value) {
                for (var i = 0; i < porderReqStore.data.length; i++) {
                    var rec = porderReqStore.data.items[i];
                    if (!rec.get('is_calculate') && rec.get('granttoorgcode') != curRec.get('granttoorgcode')) {
                        rec.set('totalorder', amount);
                    }
                }
            }
            else {
                curRec.set('totalorder', context.originalValue);
            }
        }


    }
})