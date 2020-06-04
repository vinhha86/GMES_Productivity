Ext.define('GSmartApp.view.pcontract.PContractProductBomMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProductBomMainViewController',
    isThemMoi: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var unitStore = viewmodel.getStore('UnitStore');
        unitStore.loadStore();
    },
    control: {
        '#btnNPL': {
            click: 'onThemNPL'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#cmbSanPham': {
            change: 'onChangeProduct'
        }
    },
    onChangeProduct: function (combo, newValue, oldValue, eOpts) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var storeBOM = viewmodel.getStore('PContractProductBomStore');
        var pcontractid_link = viewmodel.get('PContract').id;
        var productid_link = viewmodel.get('IdProduct');

        var data = combo.findRecord('productid_link', newValue);
        storeBOM.loadStore(pcontractid_link,productid_link );

        var productview = Ext.getCmp('PContractListProductView');
        productview.getSelectionModel().select(data);

        var productskuview = Ext.getCmp('PContractSKU_ListProductView');
        productskuview.getSelectionModel().select(data);
    },
    onThoat: function () {
        var me = this.getView();
        me.up('window').close();
    },
    onThemNPL: function (m) {
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();

        var productid_link = viewmodel.get('IdProduct');
        var pcontractid_link = viewmodel.get('PContract').id;

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
        var storeNPL = viewmodel.getStore('productStore');

        var main = me.down('#PContractProductBomView');
        var north = me.down('#PContractProductBomFilter');

        var form = Ext.create('Ext.window.Window', {
            height: 400,
            closable: true,
            title: 'Thêm mới thuộc tính ',
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
                xtype: 'PContractProductMaterialView',
                productid_link: productid_link,
                pcontractid_link: pcontractid_link
            }]
        });
        form.show();
    }
})