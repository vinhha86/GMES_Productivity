Ext.define('GSmartApp.view.pcontract.PContractProduct_Bom2_TabColorViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProduct_Bom2_TabColorViewController',
    init: function () {
    },
    control: {
        '#PContractProduct_Bom2_TabColorView': {
            tabchange: 'onTabChange'
        },
        '#cmbSanPham': {
            change: 'onChangeProduct'
        }
    },
    onChangeProduct: function (combo, newValue, oldValue, eOpts) {
        var me = this.getView();
        var th = this;
        var viewmodel = this.getViewModel();
        var storeBOM = viewmodel.getStore('PContractProductBom2Store');
        var pcontractid_link = viewmodel.get('PContract.id');
        var productid_link = viewmodel.get('IdProduct');

        storeBOM.loadStore(pcontractid_link, productid_link);

        var data = combo.findRecord('productid_link', newValue);

        var productview = Ext.getCmp('PContractListProductView');
        productview.getSelectionModel().select(data);
        th.createTab();
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        var storeBOM = viewmodel.getStore('PContractBom2ColorStore');

        var pcontractid_link = viewmodel.get('PContract').id;
        var productid_link = viewmodel.get('IdProduct');
        var colorid_link = newCard.colorid_link;
        storeBOM.removeAll();
        storeBOM.loadStoreColor(pcontractid_link, productid_link, colorid_link);
        var gridsize = Ext.getCmp(tabPanel.getActiveTab().id).getController();
        gridsize.CreateColumns();
    },
    createTab: function () {        
        newActiveItem = this.getView();
        var grid = this.getView();
        var viewmodel = this.getViewModel();
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
                    var listtitle = [];
                    var listid = [];
                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listid.includes(data.color_id)) {
                            listid.push(data.color_id);
                            listtitle.push(data.mauSanPham);
                        }
                    }
                    newActiveItem.removeAll();
                    for (var i = 0; i < listtitle.length; i++) {
                        newActiveItem.add({
                            title: listtitle[i],
                            xtype: 'PContract_Bom2_Color_View',
                            id: 'PContract_Bom2_Color_View_' + productid_link + "_" + i,
                            colorid_link: listid[i]
                        });
                    }
                    newActiveItem.setActiveTab(0);
                }
            })
    }
})