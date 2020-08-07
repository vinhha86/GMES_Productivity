Ext.define('GSmartApp.view.pcontract.PContractProduct_Bom2_TabColorViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProduct_Bom2_TabColorViewController',
    init: function () {
        common.Check_Object_Permission();
    },
    control: {
        '#PContractProduct_Bom2_TabColorView': {
            tabchange: 'onTabChange'
        },
        '#cmbSanPham': {
            select: 'onChangeProduct'
        },
        '#btnAddMaterial_Bom2' : {
            click: 'onThemMoiNPL'
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
        
        th.createTab();
        common.Check_Object_Permission();
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
    onThemMoiNPL: function(){
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();

        var productid_link = viewmodel.get('IdProduct');

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
            width: 1200,
            height: 500,       
            reference: 'skusearchwindow',
            viewModel: {
                data: {
                    sourceview: 'PContractProduct_Bom2_TabColorView',
                    searchtype: 5,
                    pcontractid_link: viewmodel.get('PContract.id'),
                    productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
                }
            }
        });
        form.show();
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