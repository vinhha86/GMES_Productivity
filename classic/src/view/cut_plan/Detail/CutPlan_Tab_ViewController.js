Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_Tab_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_Tab_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        this.CreateTab();
        
    },
    control: {
        '#CutPlan_Tab_View': {
            tabchange: 'onTabChange'
        },
    },
    CreateTab: function(){
        var viewmodel = this.getViewModel();

        newActiveItem = this.getView();
        var npl = viewmodel.get('npl');

        var productid_link = viewmodel.get('porder.productid_link');
        var pcontractid_link = viewmodel.get('porder.pcontractid_link');

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
                            xtype: 'CutPlan_View',
                            id: 'CutPlan_View' + npl.id + "_" + i,
                            colorid_link: listid[i]
                        });
                    }
                    newActiveItem.setActiveTab(0);
                }
            })
    },
    onTabChange: function(tabPanel, newCard, oldCard, eOpts){
        var gridsize = Ext.getCmp(tabPanel.getActiveTab().id).getController();
        gridsize.CreateColumns();
    }
})