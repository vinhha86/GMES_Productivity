Ext.define('GSmartApp.view.pcontract.PContract_Bom_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_ViewController',
    control: {
        '#fileUploadBom': {
            change: 'onSelectFile'
        },
        '#cmbSanPham': {
            select: 'onChangeProduct'
        },
        '#btndownloadsize': {
            click: 'onDownTemp'
        },
        '#btn_UploadBomSize': {
            click: 'onUpload'
        },
        '#btnConfirmBOM': {
            click: 'onConfirmBOM2'
        }
    },
    listen: {
        store: {
            'PContractBom2ColorStore': {
                'loaddone': 'onLoadBomDone'
            }
        }
    },
    init: function () {
    },
    onUpload: function (record) {
        var me = this.getView();
        me.down('#fileUploadBom').fileInputEl.dom.click();
    },
    onSelectFile: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewmodel.get('PContract.id'));
        data.append('productid_link', viewmodel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom/bom_candoi', data, 2 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải định mức",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    var store = viewmodel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },
    onDownTemp: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        params.productid_link = viewmodel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_candoi', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Bom_CanDoi.xlsx", response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);

        var blob = new Blob([byte], { type: "application/xlsx" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    },
    base64ToArrayBuffer: function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    },
    onChangeProduct: function (combo, rec, eOpts) {
        var viewmodel = this.getViewModel();
        if (viewmodel.get('IdProduct') > 0) {
            var me = this;
            me.CreateColumns();
            viewmodel.set('hidden_chotdinhmuc', false);
            viewmodel.set('disabled_chotdinhmuc', true);
        }

    },
    checkActionColumnPermission: function (view, rowIndex, colIndex, item, record) {
        return common.Check_ActionColum_Permission(item.itemId);
    },
    renderUnit: function (value, metaData, record, rowIdx, colIdx, store) {
        var me = this;
        var storeUnit = me.getViewModel().getStore('UnitStore');
        if (value != null) {
            var rec = storeUnit.findRecord("id", value, 0, false, false, true);
            if (rec != null) {
                return rec.data.code;
            } else {
                return record.data.unitName;
            }
        } else {
            return '';
        }
    },
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 7;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var productid_link = viewmodel.get('IdProduct');
        var pcontractid_link = viewmodel.get('PContract.id');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);

                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listid.includes(data.sizeid_link)) {
                            listid.push(data.sizeid_link);
                            listtitle.push(data.coSanPham);
                        }
                    }

                    for (var i = 0; i < listtitle.length; i++) {

                        var column = Ext.create('Ext.grid.column.Number', {
                            text: listtitle[i],
                            xtype: 'numbercolumn',
                            dataIndex: listid[i].toString(),
                            width: 65,
                            format: '0.0000',
                            align: 'right',
                            editor: {
                                xtype: 'textfield',
                                selectOnFocus: true,
                                maskRe: /[0-9.]/
                            },
                            renderer: function (value, metaData, record) {
                                if (value == 0) return "";
                                return Ext.util.Format.number(value, '0.0000')
                            }
                        });
                        grid.headerCt.insert(length, column);
                        length++;
                    }

                    var storeBOM = grid.getStore();

                    var model = storeBOM.getModel();
                    var fields = model.getFields();
                    for (var i = 0; i < fields.length; i++) {
                        if (i > 24) {
                            model.removeFields(fields[i].name);
                        }
                    }

                    var fieldnew = [];
                    for (var i = 0; i < listid.length; i++) {
                        fieldnew.push({ name: listid[i], type: 'number' });
                    }

                    model.addFields(fieldnew);
                    storeBOM.removeFilter();
                    storeBOM.load_bom_by_product_withcallback(pcontractid_link, productid_link);
                }
            })
    },
    onConfirmBOM2: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var productid_link = viewmodel.get('IdProduct');
        me.setLoading('Đang xử lý dữ liệu');
        var params = new Object();
        params.pcontractid_link = viewmodel.get('PContract.id');
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/confim_bom2', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.alert({
                            title: "Thông báo",
                            msg: 'Thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        viewmodel.set('disabled_chotdinhmuc', true);
                        viewmodel.set('text_chotdinhmuc', 'Định mức đã chốt');
                    }
                }
            })
    },
    onLoadBomDone: function (isbomdone) {
        var viewmodel = this.getViewModel();
        if (!isbomdone)
            viewmodel.set('text_chotdinhmuc', 'Chốt định mức');
        else
            viewmodel.set('text_chotdinhmuc', 'Định mức đã chốt');
        viewmodel.set('disabled_chotdinhmuc', isbomdone);
    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();

        if (context.value == context.originalValue) {
            var store = viewmodel.getStore('PContractBom2ColorStore');
            store.rejectChanges();
            return;
        }

        var me = this;

        if (context.field == "unitid_link" || context.field == "lost_ratio") {
            me.updateMaterial(context);
        }
        else {
            me.updateSKU(context);
        }
    },
    updateMaterial: function (context) {
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;
        params.isUpdateBOM = false;

        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/update_pcontract_productbom', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }
                    else {
                        var storebom = viewmodel.getStore('PContractBom2Store_New');

                        for (var i = 0; i < storebom.data.length; i++) {
                            var rec = storebom.data.items[i];
                            if (rec.get('id') == data.id) {
                                rec.set('unitid_link', data.unitid_link);
                                rec.set('lost_ratio', data.lost_ratio);
                            }
                        }
                        storebom.commitChanges();
                    }
                }
            })
    },
    updateSKU: function (record) {
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = record.record.data;
        params.colorid_link = record.record.data.colorid_link;
        params.sizeid_link = record.field;
        params.value = record.value;

        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/update_pcontract_productbomsku', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('PContractBom2Store_New');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        store.commitChanges();
                    }
                }
            })
    }
})