Ext.define('GSmartApp.view.pcontract.PContractSKU_ListProductViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractSKU_ListProductViewCotroller',
    init: function () {

    },
    control: {
        '#PContractSKU_ListProductView': {
            select: 'onSelectProduct'
        },
        '#btnThemSKU': {
            click: 'onThemSKU'
        }
    },
    onThemSKU: function(){
        var viewmodel = this.getViewModel();
        if(viewmodel.get('IdProduct') == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else{
            var form =Ext.create({
                xtype: 'skusearchwindow',
                reference:'skusearchwindow',
                viewModel: {
                    data: {
                        sourceview: 'PContractSKU_ListProductView',
                        pcontractid_link: viewmodel.get('PContract.id'),
                        searchtype: 1,
                        orgcustomerid_link: viewmodel.get('PContract.orgcustomerid_link'),
                        productid_link : viewmodel.get('IdProduct'),
                        productid_link_notsearch: viewmodel.get('IdProduct'),
                        type: 10
                    }
                }
            });
            form.show();
        }
        
    },
    onSelectProduct: function (t, record, index, eOpts) {
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');
        var pcontractid_link = viewmodel.get('PContract').id;
        viewmodel.set('IdProduct', record.data.productid_link);
        var productid_link = viewmodel.get('IdProduct');

        storeSku.loadStore(pcontractid_link, productid_link);

        var productview = Ext.getCmp('PContractListProductView');
        productview.getSelectionModel().select(record);
    },
    viewImg: function (grid, metadata, rowIndex) {
        var me = this.getView();
        var data = grid.getStore().getAt(rowIndex);
        var id = data.get('productid_link');
        var name = data.get('productName');
        me.getSelectionModel().select(data);

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/product/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var form = Ext.create('Ext.window.Window', {
                            height: 250,
                            closable: true,
                            resizable: false,
                            modal: true,
                            border: false,
                            title: 'Ảnh sản phẩm ' + name,
                            closeAction: 'destroy',
                            width: 250,
                            bodyStyle: 'background-color: transparent',
                            layout: {
                                type: 'fit', // fit screen for window
                                padding: 5
                            },
                            items: [{
                                xtype: 'PContractImageView',
                                IdProduct: id,
                                viewModel: {
                                    data: {
                                        img: response.img
                                    }
                                }
                            }]
                        });
                        form.show();
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})