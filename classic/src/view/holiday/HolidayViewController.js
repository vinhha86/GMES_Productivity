Ext.define('GSmartApp.view.holiday.HolidayViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HolidayViewController',
    isActivate: false,
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnXoa': {
            click: 'onXoaNhieu'
        },
        '#HolidayView': {
            itemclick: 'onItemClick'
        }
    },
    onThemMoi: function(){
        let viewModel = this.getViewModel();
        let me = this.getView();
        let form = Ext.create('Ext.window.Window', {
            height: 250,
            width: 600,
            closable: true,
            title: 'Thêm mới ngày nghỉ',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'HolidayFormView'
            }]
        });
        form.show();
    },
    onloadPage: function () {
        let me = this.getView();
        let t = this;

        let viewmodel = this.getViewModel();
        let storeHoliday = viewmodel.getStore('HolidayStore');
        storeHoliday.loadStoreByYear(new Date().getFullYear());
        storeHoliday.sort('day', 'DESC');

        let storeHolidayYears = viewmodel.getStore('HolidayYearStore');
        storeHolidayYears.loadStore();
    },
    onChange: function( cbbox, newValue, oldValue, eOpts ) {
        // console.log(newValue);
        let viewmodel = this.getViewModel();
        let storeHoliday = viewmodel.getStore('HolidayStore');
        if(newValue == 'Tất cả')
            storeHoliday.loadStore();
        else
            storeHoliday.loadStoreByYear(newValue);
        storeHoliday.sort('day', 'DESC');
    },
    onXoa: function (grid, rowIndex, colIndex) {
        let me = this;
        let rec = grid.getStore().getAt(rowIndex);
        let id = rec.get('id');
        let data = [];
        data.push({'id': id});
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(data);
                }
            }
        });
    },
    Xoa: function (data) {
        let me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        let params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/holiday/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });

                    let store = me.getStore();
                    store.load();
                    me.getViewModel().getStore('HolidayYearStore').load();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onXoaNhieu: function(){
        let m = this.getView();
        let me = this;
        let data = [];
        let select = m.getSelectionModel().getSelection();
        if(select.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn ít nhất một ngày nghỉ",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        for (let i = 0; i < select.length; i++) {
            data.push({'id': select[i].data.id});
        }
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(data);
                }
            }
        });
    },
    onDateFocus: function(dateField, event, eOpts){
        // show picker
        let picker = dateField.getPicker();
        picker.monthYearFormat = 'm-yy';
        dateField.expand();
    },
    onDateChange: function(dateField, newValue, oldValue, eOpts){
        // set date to data.day
        let view = this.getView();
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        data.day = newValue;
        viewModel.set('isChanged', true);
        // console.log(oldValue);
        // console.log(newValue);
    },
    onCommentChange: function(textField, newValue, oldValue, eOpts ){
        let view = this.getView();
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        data.comment = newValue;
        viewModel.set('isChanged', true);
        // console.log(oldValue);
        // console.log(newValue);
    },
    onFocusLeave: function(){
        // save to db
        let me = this.getView();
        let viewModel = this.getViewModel();

        if(!viewModel.get('isChanged')) return;
        else{
            let params = new Object();
            let data = viewModel.get('data');

            // console.log(data.day);
            // console.log(data.day.getTime());

            let time = data.day.getTime();
            params.data = data;
            params.time = time;
            ////////////////////////////////////////////

            params.msgtype = "HOLIDAY_CREATE";
            params.message = "Lưu ngày nghỉ lễ";

            GSmartApp.Ajax.post('/api/v1/holiday/save', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        let res = Ext.decode(response.responseText);
                        if (res.respcode == 200) {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Lưu thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            mainView = Ext.getCmp('HolidayView');
                            mainView.getStore().load();
                            mainView.getViewModel().getStore('HolidayYearStore').load();
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Lưu thất bại',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }

                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        }
    },
    onItemClick: function(thisItem, record, item, index, e, eOpts){
        let view = this.getView();
        let viewModel = this.getViewModel();
        viewModel.set('data', record.data);
        viewModel.set('isChanged', false);

        // console.log(record.data);
    },

    //////////////////////////////// POPUP WINDOW

    onPopupWindowClicked: function(){
        let window = Ext.create('Ext.window.Window', {
            height: '90%',
            width: '90%',
            closable: true,
            title: 'Thông tin chung',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            viewModel: {
                type: 'PContractViewModel'
            },
            items: [
                {
                    // title: 'Thông tin chung',
                    layout: 'border',
                    items: [{
                        region: 'north',
                        height: 115,
                        border: true,
                        xtype: 'PContractInfoView',
                        margin: 1
                    }, {
                        region: 'center',
                        margin: 1,
                        // border: true,
                        layout: 'border',
                        items: [{
                            region: 'center',
                            xtype: 'PContractAttributeView',
                            margin: 1,
                            border: true
                        }, {
                            region: 'west',
                            width: '65%',
                            layout: 'border',
                            items:[
                                {
                                    region: 'center',
                                    margin: 1,
                                    border: true,
                                    xtype: 'PContractListProductView',
                                },
                                {
                                    region: 'south',
                                    margin: 1,
                                    height: 200,
                                    layout: 'border',
                                    items: [{
                                        region: 'center',
                                        xtype: 'PContractDocumentView',
                                        border: true,
                                        margin: 1
                                    }, {
                                        region: 'east',
                                        width: '50%',
                                        margin: 1,
                                        border: true,
                                        xtype: 'PContractPairProductView'
                                    }]
                                }         
                            ]
        
                        }]
                    }]
                }
            ]
        });

        this.loadStoreForPopUpWindow(window);
        this.loadDataForPopUpWindow(window);
        this.disableInfoViewBtn(window);
        this.disableListProductViewBtn(window);
        this.disablePairProductViewBtn(window);
        this.disableDocumentViewBtn(window);
        this.disableAttributeViewBtn(window);

        window.show();
    },

    loadStoreForPopUpWindow: function(window){
        let viewmodel = window.getViewModel();

        let KHStore = viewmodel.getStore('CustomerStore');
        let VenderStore = viewmodel.getStore('Vender');
        let EndBuyerStore = viewmodel.getStore('EndBuyer');
        let BranchStore = viewmodel.getStore('BranchStore');
        let SeasonStore = viewmodel.getStore('SeasonStore');
        let UnitStore = viewmodel.getStore('UnitStore');
        let MarketStore = viewmodel.getStore('MarketStore');
        let PContractTypeStore = viewmodel.getStore('ContractTypes');

        KHStore.loadStore(10, false);
        VenderStore.loadStore(11, false);
        EndBuyerStore.loadStore(12, false);
        BranchStore.loadStore(false);
        SeasonStore.loadStore(false);
        UnitStore.loadStore();
        MarketStore.loadStore(1);
        PContractTypeStore.loadStore();
    },

    loadDataForPopUpWindow: function(window){
        let viewmodel = window.getViewModel();

        window.IdPContract = 34;

        let infoView = window.down('#PContractInfoView');
        infoView.IdPContract = window.IdPContract;
        infoView.getController().loadInfo(window.IdPContract);

        let listProducView = window.down('#PContractListProductView');
        listProducView.IdPContract = window.IdPContract;

        let productpair = window.down('#PContractPairProductView');
        productpair.IdPcontract = window.IdPContract;

        let storepair = viewmodel.getStore('PContractProductPairStore');
        let store = viewmodel.getStore('PContractProductStore');
        store.loadStore(window.IdPContract);
        storepair.loadStore(window.IdPContract);
    },

    disableInfoViewBtn: function(window){
        let infoView = window.down('#PContractInfoView');
        infoView.down('#contractcode').setReadOnly(true);
        infoView.down('#contractdate').setReadOnly(true);
        infoView.down('#confirmdate').setReadOnly(true);
        infoView.down('#orgbuyerid_link').setReadOnly(true); // duplicate id
        infoView.down('#orgvenderid_link').setReadOnly(true);
        infoView.down('#contracttypeid_link').setReadOnly(true);
        infoView.down('#orgpayerid_link').setReadOnly(true); // duplicate id
        infoView.down('#orgshowid_link').setReadOnly(true);
        infoView.down('#market').setReadOnly(true);
        infoView.down('#contractcode').setReadOnly(true);
    },

    disableListProductViewBtn: function(window){
        let listProductView = window.down('#PContractListProductView');
        listProductView.down('#btnThemMoi').setVisible(false);
        let col = listProductView.getColumns()[6];
        col.hide();
    },

    disablePairProductViewBtn: function(window){
        let pairProductView = window.down('#PContractPairProductView');
        pairProductView.down('#btnThemMoi').setVisible(false);
        let col = pairProductView.getColumns()[2];
        col.hide();
        let cellEditing = pairProductView.getPlugins()[0];
        cellEditing.destroy();
    },

    disableDocumentViewBtn: function(window){
        // let documentView = window.down('#PContractDocumentView');
        // documentView.down('#btnThemMoi').setVisible(false);
        // let col = documentView.getColumns()[2];
        // col.hide();
        // let cellEditing = documentView.getPlugins()[0];
        // cellEditing.destroy();
    },

    disableAttributeViewBtn: function(window){
        let attributeView = window.down('#PContractAttributeView');
        attributeView.down('#btnThemMoi').setVisible(false);
        let col = attributeView.getColumns()[2];
        col.hide();
    },

})