Ext.define('GSmartApp.view.pcontract.PContract_POListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POListController',
    control: {
        '#fileUploadPO': {
            change: 'onSelect'
        },
        '#productFilter': {
            select: 'onFilterProduct',
            change: 'onChangeProduct'
        },
        '#PO_ChildList': {
            itemclick: 'onSelectPO'
        },
        '#PContract_POList': {
            itemclick: 'onSelectParentPO'
        },
        '#btnUploadTemplate': {
            click: 'onDownloadTemplate'
        }
    },
    onSelectOffer: function (rowNode, record, expandRow, eOpts) {
        var grid = this.getView();
        grid.setLoading('Đang tải dữ liệu');

        var params = new Object();
        params.pcontract_poid_link = record.get('id');

        GSmartApp.Ajax.post('/api/v1/pcontract_po/getPOLine_Confirm', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    grid.setLoading(false);
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        record.set('sub_po_confirm', response.data);
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
    onRender_poquantity: function (value, metaData, record, rowIdx, colIdx, stor) {
        var viewmodel = this.getViewModel();
        var cls = viewmodel.get('clspoquantity');
        if (!record.data.checkamount)
            cls = '<div style="color:red; font-weight: bold; align: right">';
        return value == 0 ? "" : cls + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onSPFilterKeyup: function () {
        var filterField = this.lookupReference('MaSPFilter'),
            PContract_POList = this.getView();
        store = PContract_POList.getStore(),
            filters = store.getFilters();

        if (filterField.value) {
            this.spFilter = filters.add({
                id: 'spFilter',
                property: 'productbuyercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.spFilter) {
            filters.remove(this.spFilter);
            this.spFilter = null;
        }
    },
    onPOFilterKeyup: function () {
        var filterField = this.lookupReference('POFilter'),
            PContract_POList = this.getView();
        store = PContract_POList.getStore(),
            filters = store.getFilters();

        if (filterField.value) {
            this.POFilter = filters.add({
                id: 'POFilter',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.POFilter) {
            filters.remove(this.POFilter);
            this.POFilter = null;
        }
    },
    onDownloadTemplate: function () {
        var me = this;
        var params = new Object();
        GSmartApp.Ajax.post('/api/v1/report/download_temp_po', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Upload_PO_Line.xlsx", response.data);
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
    onFilterProduct: function (combo, record, eOpts) {
        // console.log(record);
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PContractPOList');
        var productid_link = record.get('productid_link');
        var pcontractid_link = viewmodel.get('PContract.id');

        store.loadAccept_ByContract(pcontractid_link, productid_link);
    },
    onChangeProduct: function (m, newValue, oldValue) {
        if (newValue == "" || newValue == null) {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('PContractPOList');

            var pcontractid_link = viewmodel.get('PContract.id');

            store.loadAccept_ByContract(pcontractid_link, 0);
        }

    },
    onUpload: function (record) {
        var viewmodel = this.getViewModel();
        viewmodel.set('pcontract_po_parentid_link', record.get('id'));
        var me = this.getView();
        me.down('#fileUploadPO').fileInputEl.dom.click();
    },
    onSelect: function (m, value) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewmodel.get('PContract.id'));
        data.append('parentid_link', viewmodel.get('pcontract_po_parentid_link'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/pcontract_po/upload_po', data, 2 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải PO",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    var store = viewmodel.getStore('PContractPOList');
                    store.load();
                }
            })
    },
    onSelectParentPO: function (m, rec) {
        var viewModel = this.getViewModel();
        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        productStore.removeAll();
        var storeSku = viewModel.getStore('PContractSKUStore');
        storeSku.removeAll();
        var skuView = Ext.getCmp('PContractSKUView');
        var cmbSanPham = skuView.down('#cmbSanPham');
        cmbSanPham.clearValue();
        viewModel.set('isDisable_btnThemSKU', true);
        viewModel.set('isDisable_btnConfirmSKU', true);
    },
    onSelectPO: function (m, rec) {
        var viewModel = this.getViewModel();
        viewModel.set('isDisable_btnThemSKU', false);
        viewModel.set('isDisable_btnConfirmSKU', false);
        viewModel.set('pcontract_poid_link', rec.data.id);
        var productid_link = rec.data.productid_link;

        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        productStore.loadStore_bypairid_Async(productid_link, rec.data.po_quantity, true);
        productStore.load({
            scope: this,
            callback: function (records, operation, success) {
                var record = productStore.getAt(0);
                var skuView = Ext.getCmp('PContractSKUView');
                var cmbSanPham = skuView.down('#cmbSanPham');
                cmbSanPham.select(record);
                viewModel.set('IdProduct', record.get('id'));
                viewModel.set('Product_pquantity', record.data.pquantity);
                // console.log(record);
                //clear sku list
                var storeSku = viewModel.getStore('PContractSKUStore');
                storeSku.removeAll();
                storeSku.loadStoreByPO_and_Product(record.get('id'), rec.data.id);
            }
        });
    },
    onThemPO: function (rec) {
        var plan_productivity = [];
        plan_productivity.push(rec.get('pcontract_po_productivity')[0].plan_productivity);

        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm mới PO',
            closeAction: 'destroy',
            height: 440,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'InsertPO_Main',
                viewModel: {
                    data: {
                        po: {
                            pcontractid_link: viewmodel.get('PContract.id'),
                            parentpoid_link: rec == null ? 0 : rec.data.id,
                            po_typeid_link: 11,
                            pcontract_po_productivity: rec.get('pcontract_po_productivity'),
                        },
                        productid_link: viewmodel.get('IdProduct_filterPO'),
                        pcontract_po_productivity: {
                            plan_productivity: plan_productivity
                        }
                    }
                }
            }]
        });
        form.show();

        form.down('#InsertPO_Main').down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            var storePO = viewmodel.getStore('PContractPOList');
            storePO.load();
            form.close();
        })
    },
    onXoaPO: function (rec) {
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Đơn hàng', 'Bạn có thực sự muốn xóa Đơn hàng? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var PContractPOList = viewmodel.getStore('PContractPOList');
                    var params = new Object();
                    params.id = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/pcontract_po/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                PContractPOList.reload();
                            } else {
                                Ext.MessageBox.show({
                                    title: "Kế hoạch giao hàng",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        });
                }
            });
    },
    onEdit: function (rec, isHidden_req) {
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin PO',
            closeAction: 'destroy',
            height: 440,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit_Info_Main',
                viewModel: {
                    type: 'PContract_PO_Edit_Info_Main_ViewModel',
                    data: {
                        id: rec.data.id,
                        isedit: true,
                        productpairid_link: rec.get('productid_link'),
                        isHidden_req: isHidden_req == null ? false : true,
                        productid_link: rec.get('productid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_Edit_Info_Main').getController().on('Thoat', function () {
            var storePO = viewModel.getStore('PContractPOList');
            storePO.load();

            var store_porder_req = viewModel.getStore('porderReqStore');
            var po_id = rec.get('id');
            store_porder_req.loadByPO(po_id);
            form.close();
        })
    },
    onFOBPO: function (rec) {
        console.log(rec);
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin FOB',
            closeAction: 'destroy',
            height: 400,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'FOBPricePODetail',
                viewModel: {
                    data: {
                        record: rec
                    }
                }
            }]
        });
        form.show();
    },
    onShowBalance: function (rec) {
        console.log(rec);
        var viewmodel = this.getViewModel();

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Bảng cân đối NPL',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Balance_Main',
                viewModel: {
                    data: {
                        pcontractid_link: rec.data.pcontractid_link,
                        pcontract_poid_link: rec.data.id
                    }
                }
            }]
        });
        form.show();
    },
    onMenu_PO: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            minWidth: 150,
            items: [
                {
                    text: 'Sửa PO',
                    itemId: 'btnEditPO_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-pencil brownIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onEdit(record, true);
                    },
                }, {
                    text: 'Xóa PO',
                    itemId: 'btnDelPO_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onXoaPO(record);
                    }
                }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    onMenu_PO_Parent: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            minWidth: 150,
            items: [
                {
                    text: 'Sửa PO',
                    itemId: 'btnEditPO_Parent_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-pencil brownIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onEdit(record);
                    },
                },
                {
                    text: 'Chi tiết FOB',
                    itemId: 'btnDetailFOB_PContract_POList',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-book greenIcon',
                    handler: function () {
                        me.onFOBPO(record.data);
                    }
                },
                {
                    text: 'Đổi Merchandiser phụ trách',
                    itemId: 'btnChange_Merchandiser',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-user greenIcon',
                    handler: function () {
                        me.onChangeMer(record);
                    }
                },
                '-',
                {
                    text: 'Thêm PO Line',
                    itemId: 'btnInsert_PO',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-plus brownIcon',
                    handler: function () {
                        me.onThemPO(record);
                    }
                },
                {
                    text: 'Upload File PO Line(Excel)',
                    itemId: 'btnUpload_PO',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-upload brownIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        if (record.get('po_buyer') == 'TBD') {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Bạn không được upload cho PO có mã TBD! Bạn phải cập nhật số PO trước khi upload",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                        else {
                            me.onUpload(record);
                        }
                    }
                },
                '-',
                {
                    text: 'Bảng cân đối NPL',
                    itemId: 'btnBalance',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-balance-scale blueIcon',
                    handler: function () {
                        me.onShowBalance(record);
                    }
                },
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    onChangeMer: function (rec) {
        console.log(rec);
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 320,
            closable: true,
            title: 'Thay đổi Merchandiser',
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
                xtype: 'PContract_PO_FormAccept',
                viewModel: {
                    data: {
                        po: {
                            po_quantity: rec.get('po_quantity'),
                            po_buyer: rec.get('po_buyer'),
                            po_vendor: rec.get('po_vendor'),
                            shipdate: rec.get('shipdate'),
                            id: rec.get('id'),
                            orgbuyerid_link: viewmodel.get('PContract.orgbuyerid_link'),
                            orgid_link: rec.get('orgmerchandiseid_link'),
                            userid_link: rec.get('merchandiserid_link'),
                            po_quantity: rec.get('po_quantity'),
                            amount_org: rec.get('amount_org')
                        }
                    }
                }
            }]
        });
        form.show();

        form.down('#PContract_PO_FormAccept').getController().on('AcceptSuccess', function () {
            form.close();
        })
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    renderShipping: function (val, meta, record, rindex, cindex, store) {
        if (null != val) {
            var viewmodel = this.getViewModel();
            var ShipModeStore = viewmodel.getStore('ShipModeStore');
            if (null != ShipModeStore) {
                var objUnit = ShipModeStore.data.find('id', val);
                // console.log(objUnit.data);
                return objUnit.data.name;
            }
        }
    },
    onPOListEdit: function (editor, e) {
        if (e.originalValue != e.value) {
            e.record.data[e.field] = e.value;
            var params = new Object();
            params.data = e.record.data;
            console.log(params);
            GSmartApp.Ajax.post('/api/v1/pcontract_po/update', Ext.JSON.encode(params),
                function (success, response, options) {
                    var response = Ext.decode(response.responseText);
                    if (success) {
                        e.record.commit();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "PO",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                });
        }
    }
})