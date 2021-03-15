Ext.define('GSmartApp.view.pcontract.PContractMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractMainViewController',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var PContractStore = viewmodel.getStore('PContractStore');
        PContractStore.getSorters().remove('deliverydate');
        PContractStore.getSorters().add('vendorname');
        PContractStore.getSorters().add('buyername');
        PContractStore.getSorters().add('contractcode');

        var search = new Object();
        var po = GSmartApp.util.State.get('po');
        if(po == null){
            search = viewmodel.get('value');
        }
        else {
            search = po;
            viewmodel.set('value', search);
        }
        PContractStore.loadStore(search.productbuyer_code, search.po_code, search.orgbuyerid_link, 
            search.orgvendorid_link,search.contractbuyer_code, search.contractbuyer_yearfrom, search.contractbuyer_yearto);
        

        this.onActivate();
        common.Check_Object_Permission();
    },
    control: {
        '#PContractMainView': {
            activate: 'onActivate',
            itemdblclick: 'ondblClick',
            select: 'onPContractSelect'
        },
        '#btnThemMoi_PContractMainView': {
            click: 'onThemMoi'
        },
        // '#orgcustomerid_link': {
        //     select: 'onloadPage'
        // },
        // '#orgbuyerid_link': {
        //     select: 'onloadPage'
        // }, 
        // '#orgvendorid_link': {
        //     select: 'onloadPage'
        // },
        '#btnTimKiem': {
            click: 'onloadPage'
        },
        '#contractcode': {
            specialkey: 'onSpecialkey'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
    },
    onActivate: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        // var KHStore = viewmodel.getStore('CustomerStore');
        // KHStore.loadStore(10, true);

        var EndBuyer = viewmodel.getStore('EndBuyer');
        var Vendor = viewmodel.getStore('Vendor');
        EndBuyer.loadStore(12);
        EndBuyer.sort('name','ASC');
        Vendor.loadStore(11);
        Vendor.sort('name','ASC');

        if (me.isActivate) {
            me.onloadPage();
        }
        me.isActivate = true;
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('PContractStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var PContractStore = viewmodel.getStore('PContractStore');

        var productbuyer_code = me.down('#productbuyer_code').getValue();
        var po_code = me.down('#po_code').getValue();
        var orgbuyerid_link = me.down('#orgbuyerid_link').getValue();
        var orgvendorid_link = me.down('#orgvendorid_link').getValue();
        var contractbuyer_code = me.down('#contractbuyer_code').getValue();
        var contractbuyer_yearfrom = me.down('#contractbuyer_yearfrom').getValue();
        var contractbuyer_yearto = me.down('#contractbuyer_yearto').getValue();

        if (productbuyer_code == null) {
            productbuyer_code = "";
        }

        if (po_code == null) {
            po_code = "";
        }

        if (orgbuyerid_link == null) {
            orgbuyerid_link = 0;
        }

        if (orgvendorid_link == null) {
            orgvendorid_link = 0;
        }

        if (contractbuyer_code == null) {
            contractbuyer_code = "";
        }

        if (contractbuyer_yearfrom == null) {
            contractbuyer_yearfrom = "";
        }

        if (contractbuyer_yearto == null) {
            contractbuyer_yearto = "";
        }

        PContractStore.loadStore(productbuyer_code, po_code, orgbuyerid_link, 
            orgvendorid_link, contractbuyer_code, 
            contractbuyer_yearfrom, contractbuyer_yearto);
        var PContractPOList = viewmodel.getStore('PContractPOList');
        PContractPOList.removeAll();
        me.getSelectionModel().deselectAll();
    },
    onThemMoi: function () {
        var me = this.getView();
        var idpcontract = 0;

        this.redirectTo("lspcontract/" + idpcontract + "/edit");
    },
    onEdit: function(rec){
        var viewmodel = this.getViewModel();
        var data = new Object();
        data.productbuyer_code = viewmodel.get('value.productbuyer_code');
        data.po_code = viewmodel.get('value.po_code');
        data.orgbuyerid_link = viewmodel.get('value.orgbuyerid_link');
        data.orgvendorid_link = viewmodel.get('value.orgvendorid_link');
        data.contractbuyer_code = viewmodel.get('value.contractbuyer_code');
        data.contractbuyer_yearfrom = viewmodel.get('value.contractbuyer_yearfrom');
        data.contractbuyer_yearto = viewmodel.get('value.contractbuyer_yearto');
        
        GSmartApp.util.State.set('po',data);

        var id = rec.get('id');
        this.redirectTo("lspcontract/" + id + "/edit");
    },
    ondblClick: function (m, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        var data = new Object();
        data.productbuyer_code = viewmodel.get('value.productbuyer_code');
        data.po_code = viewmodel.get('value.po_code');
        data.orgbuyerid_link = viewmodel.get('value.orgbuyerid_link');
        data.orgvendorid_link = viewmodel.get('value.orgvendorid_link');
        data.contractbuyer_code = viewmodel.get('value.contractbuyer_code');
        data.contractbuyer_yearfrom = viewmodel.get('value.contractbuyer_yearfrom');
        data.contractbuyer_yearto = viewmodel.get('value.contractbuyer_yearto');
        
        GSmartApp.util.State.set('po',data);
        var id = record.data.id;
        this.redirectTo("lspcontract/" + id + "/edit");
    },
    onXoa: function (rec) {
        // var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');

        var params = new Object();
        params.id = id;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa đơn hàng "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    GSmartApp.Ajax.post('/api/v1/pcontract/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            var store = grid.getStore();
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
                                store.removeAt(rowIndex);
                            }
                        } else {
                            var response = Ext.decode(response.responseText);
                            Ext.Msg.show({
                                title: 'Xóa hợp đồng',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    })
                }
            }
        });
    },
    checkActionColumnPermission: function (view, rowIndex, colIndex, item, record) { 
        return common.Check_ActionColum_Permission(item.itemId); 
    },
    onPContractSelect: function(e, selected, eOpts){
        if (null != selected){
            var me = this.getView();
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('PContractPOList');

            var productbuyer_code = me.down('#productbuyer_code').getValue();
            var po_code = me.down('#po_code').getValue();

            if (productbuyer_code == null) {
                productbuyer_code = "";
            }
    
            if (po_code == null) {
                po_code = "";
            }

            // store.loadLeafOnly_ByContract(selected.id, 0);
            store.loadStoreBySearch(selected.id, productbuyer_code, po_code);
        }
    },
    onMenu_ContractList: function(grid, rowIndex, colIndex, item, e, record){
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Chi tiết đơn hàng',
                itemId: 'btnEditPContract_PContract_PO_List',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-edit brownIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onEdit(record);
                },
            }, 
            {
                text: 'Xóa đơn hàng',
                itemId: 'btnDeletePO_PContract_PO_List',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-trash redIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onXoa(record);
                }
            }, 
            {
                text: 'Quyết toán đơn hàng',
                itemId: 'btnEditPO_PContract_PO_List',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-calculator greenIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    // me.onPOInfoEdit(record);
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
                    var record = this.parentMenu.record;
                    me.onShowBalance(record);
                }
            },           
        ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX()-10, e.getY()-10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    onContractCodeFilterKeyup: function() {
        var viewmodel = this.getViewModel();
        var PContractStore = viewmodel.get('PContractStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('contractcodeFilterField'),
            filters = PContractStore.getFilters();

        if (filterField.value) {
            this.contractcodeFilter = filters.add({
                id: 'contractcodeFilter',
                property: 'contractcode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.contractcodeFilter) {
            filters.remove(this.contractcodeFilter);
            this.contractcodeFilter = null;
        }
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
                        pcontractid_link: rec.data.id,
                        pcontract_poid_link: null
                    }
                }
            }]
        });
        form.show();
    },   
})