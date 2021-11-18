Ext.define('GSmartApp.view.pcontract.PContract_Bom_KT.POrderBomKyThuatViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderBomKyThuatViewController',
    init: function () {

    },
    control: {
        '#btnDongBo': {
            click: 'onDongBo'
        },
        '#cmbSanPham': {
            select: 'onSelectSP'
        },
        '#btnCutPlan': {
            click: 'onCutPlan'
        }
    },
    listen: {
        controller: {
            'CutPlan_ViewController': {
                'ReloadBOM': 'onReloadBOM'
            }
        }
    },
    onSelectSP: function (cmb, rec, e) {
        var me = this;
        me.CreateColumns();
        me.onReloadBOM();
    },
    onReloadBOM: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrderBom2Store');
        var porderid_link = 0;
        var pcontractid_link = viewmodel.get('PContract.id');
        var productid_link = viewmodel.get('IdProduct');

        if (productid_link == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn sản phẩm",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            store.getbom_by_porder(porderid_link, pcontractid_link, productid_link);
        }
    },
    onDongBo: function () {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        grid.setLoading('Đang đồng bộ');
        var pcontractid_link = viewmodel.get('PContract.id');
        var productid_link = viewmodel.get('IdProduct');
        var params = new Object();
        params.porderid_link = 0;
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/porderbom/sync', Ext.JSON.encode(params),
            function (success, response, options) {
                var mes = "Đồng bộ thành công";
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        mes = "Đồng bộ thất bại";
                    }
                    else {
                        if (!response.isbomdone) {
                            mes = response.message;
                        }
                        var store = viewmodel.getStore('POrderBom2Store');
                        store.getbom_by_porder(porderid_link, pcontractid_link, productid_link);
                    }
                } else {
                    mes = "Đồng bộ thất bại";
                }


            })
    },
    onCutPlan: function () {
        var viewmodel = this.getViewModel();
        var pcontractid_link = viewmodel.get('PContract.id');
        var productid_link = viewmodel.get('IdProduct');

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Kế hoạch cắt',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'CutPlan_MainView',
                viewModel: {
                    data: {
                        pcontractid_link: pcontractid_link,
                        productid_link: productid_link
                    }
                }
            }]
        });
        form.show();

        form.down('#CutPlan_MainView').getController().on('Thoat', function () {
            form.close();
        })
    },
    onFilterValueMaNPLKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POrderBom2Store');
        var filterField = this.lookupReference('ValueFilterFieldMaNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldMaNPL = filters.add({
                id: 'ValueFilterFieldMaNPL',
                property: 'materialCode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldMaNPL) {
            filters.remove(this.ValueFilterFieldMaNPL);
            this.ValueFilterFieldMaNPL = null;
        }
    },
    CreateColumns: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();
        var length = 5;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var pcontractid_link = viewmodel.get('PContract.id');
        var productid_link = viewmodel.get('IdProduct');

        if (productid_link != 0 && productid_link != null) {
            grid.setLoading('Đang lấy dữ liệu');
            //kiem tra mau co trong sku khong thi moi sinh tab 
            var params = new Object();
            params.pcontractid_link = pcontractid_link;
            params.productid_link = productid_link;

            GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
                function (success, response, options) {
                    grid.setLoading(false);
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
                            if ("" + listtitle[i] == "") continue;

                            var column = Ext.create('Ext.grid.column.Column', {
                                text: listtitle[i],
                                columns: [{
                                    text: 'CĐ',
                                    dataIndex: listid[i].toString(),
                                    width: 65,
                                    format: '0.0000',
                                    align: 'right',
                                    renderer: function (value, metaData, record) {
                                        if (value == 0) return "";
                                        return Ext.util.Format.number(value, '0.0000')
                                    }
                                }, {
                                    text: 'KT',
                                    dataIndex: listid[i] + "_KT",
                                    cls: 'titleRed',
                                    width: 65,
                                    format: '0.0000',
                                    align: 'right',
                                    renderer: function (value, metaData, record) {
                                        if (value == 0) return "";
                                        return Ext.util.Format.number(value, '0.0000')
                                    }
                                }, {
                                    text: 'SX',
                                    dataIndex: listid[i] + "_SX",
                                    cls: 'titleRed',
                                    width: 65,
                                    format: '0.0000',
                                    align: 'right',
                                    renderer: function (value, metaData, record) {
                                        if (value == 0) return "";
                                        return Ext.util.Format.number(value, '0.0000')
                                    }
                                }]
                            })
                            grid.headerCt.insert(length, column);
                            length++;
                        }

                        var storeBOM = grid.getStore();

                        var model = storeBOM.getModel();
                        var fields = model.getFields();
                        for (var i = 0; i < fields.length; i++) {
                            if (i > 21) {
                                model.removeFields(fields[i].name);
                            }
                        }

                        var fieldnew = [];
                        for (var i = 0; i < listid.length; i++) {
                            fieldnew.push({ name: listid[i], type: 'number' });
                        }

                        model.addFields(fieldnew);
                        // storeBOM.getbom_by_porder(porderid_link);
                    }
                })
        }


    },
    onFilterValueKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('POrderBom2Store');
        var filterField = this.lookupReference('ValueFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.valueFilter = filters.add({
                id: 'valueFilter',
                property: 'color_name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.valueFilter) {
            filters.remove(this.valueFilter);
            this.valueFilter = null;
        }
    }
})