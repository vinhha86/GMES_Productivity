Ext.define('GSmartApp.view.pcontract.PContract_Bom_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_ViewController',
    control: {
        '#fileUploadBom': {
            change: 'onSelectFile'
        },
        '#fileUploadBomSizeset': {
            change: 'onSelectFile_Sizeset'
        },

        '#fileUploadBomNew': {
            change: 'onSelectFileNew'
        },
        '#fileUploadBomSizesetNew': {
            change: 'onSelectFile_SizesetNew'
        },
        '#cmbSanPham': {
            select: 'onChangeProduct'
        },
        '#btndownloadsize': {
            click: 'onDownTemp'
        },
        '#btndownloadsizeset': {
            click: 'onDownTempSizeSet'
        },

        '#btndownloadsize_new': {
            click: 'onDownTempNew'
        },
        '#btndownloadsizeset_new': {
            click: 'onDownTempSizeSetNew'
        },

        '#btn_UploadBomSize': {
            click: 'onUpload'
        },
        '#btn_UploadBomSizeSet': {
            click: 'onUploadSizeset'
        },

        '#btn_UploadBomSize_New': {
            click: 'onUploadNew'
        },
        '#btn_UploadBomSizeSet_New': {
            click: 'onUploadSizesetNew'
        },

        '#btnConfirmBOM': {
            click: 'onConfirmBOM2'
        },
        '#btnAddMaterial_Bom': {
            click: 'onThemMoiNPL'
        },
        '#PContract_Bom_View': {
            celldblclick: 'onCellDblClick',
            cellcontextmenu: 'onCellMenu'
        },
        '#btnDeleteBOM': {
            click: 'onDeleteBom'
        },
    },
    listen: {
        store: {
            'PContractBom2ColorStore': {
                'loaddone': 'onLoadBomDone'
            }
        }
    },
    init: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var PContractBom2Store_New = viewModel.getStore('PContractBom2Store_New');
        PContractBom2Store_New.getSorters().removeAll();
        PContractBom2Store_New.getSorters().add({
            property: 'materialid_link',
            direction: 'ASC'
        },{
            property: 'colorid_link',
            direction: 'ASC'
        });
    },
    onSelectCellmodel: function(cellModel, record, row, column, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // console.log(record);
        // console.log(row);
        // console.log(column);

        if(column == 5){
            viewModel.set('recordToSelect', record);
            viewModel.set('recordToSelectCol', column);
        }else{
            viewModel.set('recordToSelect', record);
            viewModel.set('recordToSelectCol', null);
            // recordToSelect: null,
            // recordToSelectCol: null,
            // recordToCopy: null,
            // recordToCopyCol: null,
            // recordToPaste: null,
            // recordToPasteCol: null,
        }
    },
    doCopy: function(){
        // console.log('ctrl c');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var recordToSelect = viewModel.get('recordToSelect');
        var recordToSelectCol = viewModel.get('recordToSelectCol');

        if(recordToSelectCol!=5){ // PO
            // Ext.Msg.show({
            //     title: 'Thông báo',
            //     msg: 'Bạn phải chọn cột PO',
            //     buttons: Ext.Msg.YES,
            //     buttonText: {
            //         yes: 'Có',
            //     },
            // });
            return;
        }else{
            viewModel.set('recordToCopy', recordToSelect);
            viewModel.set('recordToCopyCol', recordToSelectCol);
            Ext.toast('Data copied');
        }
    },
    doPaste: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var recordToSelect = viewModel.get('recordToSelect');
        var recordToSelectCol = viewModel.get('recordToSelectCol');
        var recordToCopy = viewModel.get('recordToCopy');
        var recordToCopyCol = viewModel.get('recordToCopyCol');

        if(recordToSelect.get('id') == recordToCopy.get('id')){
            // Ext.Msg.show({
            //     title: 'Thông báo',
            //     msg: 'Bạn phải chọn NPL khác',
            //     buttons: Ext.Msg.YES,
            //     buttonText: {
            //         yes: 'Có',
            //     },
            // });
            return;
        }

        if(recordToSelectCol!=5){ // PO
            // Ext.Msg.show({
            //     title: 'Thông báo',
            //     msg: 'Bạn phải chọn cột PO',
            //     buttons: Ext.Msg.YES,
            //     buttonText: {
            //         yes: 'Có',
            //     },
            // });
            return;
        }else{
            viewModel.set('recordToPaste', recordToSelect);
            viewModel.set('recordToPasteCol', recordToSelectCol);
            Ext.toast('Data pasted');
            m.onPaste_CtrlV();
        }
    },
    onDeleteBom: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('PContractBom2Store_New');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa định mức ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.pcontractid_link = viewModel.get('PContract.id');
                    params.productid_link = viewModel.get('IdProduct');
                    GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/delete_bom', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        }
                                    });
                                }
                                else {
                                    store.removeAll();
                                }
                            } else {
                                var response = Ext.decode(response.responseText);
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onCellMenu: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if (cellIndex == 5) {
            var me = this;
            var viewModel = this.getViewModel();
            var hiddenPaste = viewModel.get('obj_copy_poline') == null ? true : false;

            var menu_grid = new Ext.menu.Menu({
                xtype: 'menu',
                anchor: true,
                minWidth: 150,
                items: [
                    {
                        text: 'Copy PO Line',
                        itemId: 'menuCopyPOline',
                        separator: true,
                        iconCls: 'x-fa fas fa-copy brownIcon',
                        handler: function () {
                            me.onCopy(record);
                        }
                    }, {
                        text: 'Paste',
                        itemId: 'menuPastePOLine',
                        separator: true,
                        hidden: hiddenPaste,
                        iconCls: 'x-fa fas fa-paste redIcon',
                        handler: function () {
                            me.onPaste(record);
                        }
                    }
                ]
            });
            // HERE IS THE MAIN CHANGE
            var position = [e.getX() - 10, e.getY() - 10];
            e.stopEvent();
            menu_grid.showAt(position);
            common.Check_Menu_Permission(menu_grid);
        }
    },
    onCopy: function (record) {
        var viewModel = this.getViewModel();
        viewModel.set('obj_copy_poline', record);
    },
    onPaste_CtrlV: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var pcontractid_link = viewModel.get('PContract.id');
        var recordToCopy = viewModel.get('recordToCopy');
        var recordToPaste = viewModel.get('recordToPaste');
        var material_skuid_link = recordToCopy.get('materialid_link');
        var material_skuid_link_des = recordToPaste.get('materialid_link');

        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.material_skuid_link = material_skuid_link;
        params.material_skuid_link_des = material_skuid_link_des;

        me.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/copy_poline', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var store = viewModel.getStore('PContractBom2Store_New');
                        var po_line = viewModel.get('recordToCopy').get('po_line');
                        var sldh = viewModel.get('recordToCopy').get('sldh');
                        for (var i = 0; i < store.data.length; i++) {
                            var rec = store.data.items[i];
                            if (rec.get('materialid_link') == recordToPaste.get('materialid_link')) {
                                rec.set('po_line', po_line);
                                rec.set('sldh', sldh);
                            }
                        }
                        store.commitChanges();
                        // viewModel.set('obj_copy_poline', null);
                    }
                }
            })
    },
    onPaste: function (record) {
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.material_skuid_link = viewModel.get('obj_copy_poline').get('materialid_link');
        params.material_skuid_link_des = record.get('materialid_link');

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/copy_poline', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var store = viewModel.getStore('PContractBom2Store_New');
                        var po_line = viewModel.get('obj_copy_poline').get('po_line');
                        for (var i = 0; i < store.data.length; i++) {
                            var rec = store.data.items[i];
                            if (rec.get('materialid_link') == record.get('materialid_link')) {
                                rec.set('po_line', po_line);
                            }
                        }
                        store.commitChanges();
                        viewModel.set('obj_copy_poline', null);
                    }
                }
            })
    },
    onCellDblClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        if (cellIndex == 5) {
            me.ShowPO(record);
        }
    },
    ShowPO: function (record) {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('PContractBom2Store_New');

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            title: 'Danh sách PO sử dụng NPL ' + record.get('materialName') + "(" + record.get('materialCode') + ")",
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .99,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_Bom_PO_MainView',
                viewModel: {
                    data: {
                        pcontractid_link: viewModel.get('PContract.id'),
                        productid_link: viewModel.get('IdProduct'),
                        material_skuid_link: record.get('materialid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('PContract_Bom_PO_MainView').getController().on('Thoat', function () {
            form.close();
        });

        form.down('PContract_Bom_PO_MainView').on('SelectDone', function (data) {
            // var po_line = record.get('po_line');
            // po_line += ", " + data;
            // if (po_line[0] == ",")
            //     po_line = po_line.substr(1);
            // // record.set('po_line', po_line);
            // for (var i = 0; i < store.data.length; i++) {
            //     var rec = store.data.items[i];
            //     if (rec.get('materialid_link') == record.get('materialid_link')) {
            //         rec.set('po_line', po_line);
            //     }
            // }
            // store.commitChanges();

            store.load();
        });

        form.down('PContract_Bom_PO_MainView').on('DeSelectDone', function (data) {
            // var po_line = record.get('po_line');
            // po_line = po_line.replace(', ' + data, '').replace(data + ", ", '').replace(data, '');
            // // record.set('po_line', po_line);

            // for (var i = 0; i < store.data.length; i++) {
            //     var rec = store.data.items[i];
            //     if (rec.get('materialid_link') == record.get('materialid_link')) {
            //         rec.set('po_line', po_line);
            //     }
            // }
            // store.commitChanges();

            store.load();
        })
    },
    onThemMoiNPL: function () {
        var me = this.getView();
        var t = this;
        var viewModel = this.getViewModel();

        var productid_link = viewModel.get('IdProduct');

        if (productid_link == 0) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                    me.down('#cmbSanPham').expand();
                }
            });
            return;
        }

        var form = Ext.create({
            xtype: 'skusearchwindow',
            width: Ext.getBody().getViewSize().width * .99,
            height: Ext.getBody().getViewSize().height * .99,
            reference: 'skusearchwindow',
            viewModel: {
                data: {
                    sourceview: 'PContract_Bom_View',
                    searchtype: 5,
                    pcontractid_link: viewModel.get('PContract.id'),
                    productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
                }
            }
        });
        form.show();

        form.getController().on('reload', function () {
            var store = viewModel.getStore('PContractBom2Store_New');
            store.load();
        })
    },
    onUpload: function (record) {
        console.log('here yet bro 1');
        var me = this.getView();
        me.down('#fileUploadBom').fileInputEl.dom.click();
    },
    onUploadSizeset: function () {
        console.log('here yet bro 2');
        var me = this.getView();
        me.down('#fileUploadBomSizeset').fileInputEl.dom.click();
    },

    onUploadNew: function (record) { 
        console.log('here yet bro 3');
        var me = this.getView();
        me.down('#fileUploadBomNew').fileInputEl.dom.click();
    },
    onUploadSizesetNew: function(){
        console.log('here yet bro 4');
        var me = this.getView();
        me.down('#fileUploadBomSizesetNew').fileInputEl.dom.click();
    },

    onSelectFile: function (m, value) {
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewModel.get('PContract.id'));
        data.append('productid_link', viewModel.get('IdProduct'));

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
                    var store = viewModel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },
    onSelectFile_Sizeset: function (m, value) {
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewModel.get('PContract.id'));
        data.append('productid_link', viewModel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom_sizeset/bom_candoi_sizeset', data, 2 * 60 * 1000,
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
                    var store = viewModel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },

    onSelectFileNew: function (m, value) {
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewModel.get('PContract.id'));
        data.append('productid_link', viewModel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom/bom_candoi_multicolor', data, 2 * 60 * 1000,
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
                    var store = viewModel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },
    onSelectFile_SizesetNew: function(m, value){
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewModel.get('PContract.id'));
        data.append('productid_link', viewModel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom_sizeset/bom_candoi_sizeset_multicolor', data, 2 * 60 * 1000,
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
                    var store = viewModel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },

    onFilterValueKeyup: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.get('PContractBom2Store_New');
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
    },
    onFilterValueMaNPLKeyup: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('PContractBom2Store_New');
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
    onFilterValueTenNPLKeyup: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.get('PContractBom2Store_New');
        var filterField = this.lookupReference('ValueFilterFieldTenNPL'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldTenNPL = filters.add({
                id: 'ValueFilterFieldTenNPL',
                property: 'materialName',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldTenNPL) {
            filters.remove(this.ValueFilterFieldTenNPL);
            this.ValueFilterFieldTenNPL = null;
        }
    },
    onFilterValuePoLineKeyup: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.get('PContractBom2Store_New');
        var filterField = this.lookupReference('ValueFilterFieldPoLine'),
            filters = store.getFilters();

        if (filterField.value) {
            this.ValueFilterFieldPoLine = filters.add({
                id: 'ValueFilterFieldPoLine',
                property: 'po_line',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.ValueFilterFieldPoLine) {
            filters.remove(this.ValueFilterFieldPoLine);
            this.ValueFilterFieldPoLine = null;
        }
    },
    onDownTemp: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.productid_link = viewModel.get('IdProduct');

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
    onDownTempSizeSet: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.productid_link = viewModel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_candoi_sizeset', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Bom_CanDoi_SizeSet.xlsx", response.data);
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
    onDownTempNew: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.productid_link = viewModel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_candoi_new', Ext.JSON.encode(params),
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
    onDownTempSizeSetNew: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.productid_link = viewModel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_candoi_sizeset_new', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Bom_CanDoi_SizeSet.xlsx", response.data);
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
        var viewModel = this.getViewModel();
        if (viewModel.get('IdProduct') > 0) {
            var me = this;
            me.CreateColumns();
            viewModel.set('hidden_chotdinhmuc', false);
            viewModel.set('disabled_chotdinhmuc', true);
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
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa nguyên phụ liệu "' + rec.data.materialCode + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'no') {
                    return;
                }
                else {
                    var params = new Object();
                    params.pcontractid_link = viewModel.get('PContract').id;
                    params.productid_link = viewModel.get('IdProduct');
                    params.materialid_link = rec.data.materialid_link;
                    params.colorid_link = rec.data.colorid_link;

                    // console.log(rec);

                    GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/deletematerial', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                                else {
                                    grid.getStore().removeAt(rowIndex);
                                    // var storebom = viewModel.getStore('PContractProductBom2Store');
                                    var storebom = viewModel.getStore('PContractBom2Store_New');
                                    storebom.load();
                                }
                            }
                        })
                }
            }
        });
    },
    CreateColumns: function () {
        var viewModel = this.getViewModel();
        var grid = this.getView();
        var length = 10;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];
        var listid = [];

        var productid_link = viewModel.get('IdProduct');
        var pcontractid_link = viewModel.get('PContract.id');

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
                        if ("" + listtitle[i] == "") continue;

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
                    grid.headerCt.gridDataColumns[0].locked = true;
                    grid.headerCt.gridDataColumns[1].locked = true;
                    grid.headerCt.gridDataColumns[2].locked = true;

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
                    storeBOM.load_bom_by_product_multithread(pcontractid_link, productid_link);
                    // storeBOM.load_bom_by_product_withcallback(pcontractid_link, productid_link);
                }
            })
    },
    onConfirmBOM2: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();

        var productid_link = viewModel.get('IdProduct');
        me.setLoading('Đang xử lý dữ liệu');
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
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
                        viewModel.set('disabled_chotdinhmuc', true);
                        viewModel.set('text_chotdinhmuc', 'Định mức đã chốt');
                    }
                }
            })
    },
    onLoadBomDone: function (isbomdone) {
        var viewModel = this.getViewModel();
        if (!isbomdone)
            viewModel.set('text_chotdinhmuc', 'Chốt định mức');
        else
            viewModel.set('text_chotdinhmuc', 'Định mức đã chốt');
        viewModel.set('disabled_chotdinhmuc', isbomdone);
    },
    onEdit: function (editor, context, e) {
        var viewModel = this.getViewModel();

        if (context.value == context.originalValue) {
            var store = viewModel.getStore('PContractBom2ColorStore');
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
        var viewModel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;
        params.colorid_link = data.colorid_link;
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
                        var storebom = viewModel.getStore('PContractBom2Store_New');

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
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = record.record.data;
        params.colorid_link = record.record.data.colorid_link;
        params.sizeid_link = record.field;
        params.value = record.value;

        GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/update_pcontract_productbomsku', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewModel.getStore('PContractBom2Store_New');
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: response.message,
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