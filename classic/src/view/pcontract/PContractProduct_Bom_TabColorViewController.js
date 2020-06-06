Ext.define('GSmartApp.view.pcontract.PContractProduct_Bom_TabColorViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProduct_Bom_TabColorViewController',
    init: function () {
    },
    control:{
        '#PContractProduct_Bom_TabColorView':{
            tabchange: 'onTabChange'
        },
        '#cmbSanPham': {
            change: 'onChangeProduct'
        }
    },
    onChangeProduct: function (combo, newValue, oldValue, eOpts) {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var storeBOM = viewmodel.getStore('PContractProductBomStore');
        var pcontractid_link = viewmodel.get('PContract.id');
        var productid_link = viewmodel.get('IdProduct');

        storeBOM.loadStore(pcontractid_link,productid_link );

        var data = combo.findRecord('productid_link', newValue);

        var productview = Ext.getCmp('PContractListProductView');
        productview.getSelectionModel().select(data);
    },
    onTabChange: function(tabPanel, newCard, oldCard, eOpts){
        var viewmodel = this.getViewModel();
        var storeBOM = viewmodel.getStore('PContractBomColorStore');

        var pcontractid_link = viewmodel.get('PContract').id;
        var productid_link  = viewmodel.get('IdProduct');
        var colorid_link = newCard.colorid_link;
        storeBOM.removeAll();
        storeBOM.loadStoreColor(pcontractid_link, productid_link, colorid_link);
        var gridsize = Ext.getCmp(tabPanel.getActiveTab().id).getController();
        gridsize.CreateColumns();
    },
    createTab: function () {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var productid_link = viewmodel.get('IdProduct');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        
        var storeSKU = viewmodel.getStore('PContractSKUStore');
        var listtitle = [];
        var listid = [];
        for (var i = 0; i < storeSKU.data.length; i++) {
            var data = storeSKU.data.items[i].data;
            if (!listid.includes(data.color_id)) {
                listid.push(data.color_id);
                listtitle.push(data.mauSanPham);
            }
        }
            newActiveItem = this.getView();
            newActiveItem.removeAll();
            for (var i = 0; i < listtitle.length; i++) {
                newActiveItem.add({
                    title: listtitle[i],
                    xtype: 'PContract_Bom_Color_View',
                    id: 'PContract_Bom_Color_View_' + productid_link + "_" + i,
                    colorid_link: listid[i]
                });           
            }
            newActiveItem.setActiveTab(0);
    }
})