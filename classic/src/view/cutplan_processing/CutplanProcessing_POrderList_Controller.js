Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_POrderList_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_POrderList_Controller',
    init: function() {
        var viewModel = this.getViewModel();
        var ListOrgStore = viewModel.getStore('ListOrgStore');
        ListOrgStore.loadStore_Async(13, false);
        ListOrgStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 this.fireEvent('logout');
				} else {
                    var session = GSmartApp.util.State.get('session');
                    console.log(session);
                    if(session.orgid_link != 1 && session.orgid_link != null){
                        viewModel.set('porderSearchObj.donvi', session.orgid_link);
                        viewModel.set('iscombo_DonVi_editable', false);
                    }
				}
			}
        });

        // test
        // var POrder_ListStore = viewModel.getStore('POrder_ListStore');
        // POrder_ListStore.loadStoreBySearch_for_cutplanprocessing(8, 'bell', 'bell');
    },
    control: {
        '#btnSearchPorder': {
            click: 'onBtnSearchPorder'
        },
        '#POrder_AutoComplete': {
            beforeQuery: 'POrder_AutoComplete_beforeQuery'
        },
        '#Product_AutoComplete': {
            beforeQuery: 'Product_AutoComplete_beforeQuery'
        },
        '#CutplanProcessing_POrderList':{
            itemclick: 'onPorderClick'
        }
    },
    listen: {
        store: {
            'POrder_ListStore': {
                'POrder_ListStore_Done': 'onPOrder_ListStore_Done'
            }
        }
    },
    onBtnSearchPorder: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var porderSearchObj = viewModel.get('porderSearchObj');
        var POrder_ListStore = viewModel.getStore('POrder_ListStore');

        var donvi = porderSearchObj.donvi;
        // var lenhsx = porderSearchObj.lenhsx;
        // var sanpham = porderSearchObj.sanpham;
        var lenhsx_cb = me.down('#POrder_AutoComplete').getValue();
        var sanpham_cb = me.down('#Product_AutoComplete').getValue();

        var mainView = Ext.getCmp('cutplan_processing');
        mainView.setLoading(true);
        POrder_ListStore.loadStoreBySearch_for_cutplanprocessing(donvi, lenhsx_cb, sanpham_cb);
    },
    onPOrder_ListStore_Done: function(){
        var mainView = Ext.getCmp('cutplan_processing');
        mainView.setLoading(false);
    },
    POrder_AutoComplete_beforeQuery: function(){
        var viewModel = this.getViewModel();
        var POrder_AutoComplete = viewModel.getStore('POrder_AutoComplete');
        var donvi = viewModel.get('porderSearchObj.donvi');
        POrder_AutoComplete.proxy.extraParams = {
            granttoorgid_link: donvi
        }
    },
    Product_AutoComplete_beforeQuery: function(){
        var viewModel = this.getViewModel();
        var Product_AutoComplete = viewModel.getStore('Product_AutoComplete');
        var producttypeid_link = 10;
        Product_AutoComplete.proxy.extraParams = {
            producttypeid_link: producttypeid_link
        }
    },
    onPorderClick: function (m, rec) {
        // console.log(rec);
        var m = this;
        var mainView = Ext.getCmp('cutplan_processing');
        var viewModel = this.getViewModel();
        viewModel.set('porder', rec);
        var porderid_link = rec.get('id');

        // load combo sku cac npl
        var pcontractid_link = rec.get('pcontractid_link');
        var producttypeid_link = 20;
        var SkuStore = viewModel.getStore('Sku');
        SkuStore.load_by_type_and_pcontract_async(producttypeid_link, pcontractid_link);
        SkuStore.load({
            scope: this,
            callback: function (records, operation, success) {
                if (!success) {
                    this.fireEvent('logout');
                } 
                else {
                    // 
                    if(records.length > 0){
                        // set gia tri combo dau tien
                        var maNPL_id = records[0].get('id');
                        viewModel.set('maNPL_id', maNPL_id);

                        // load ds theo doi cat
                        var CutplanProcessingStore = viewModel.getStore('CutplanProcessingStore');
                        var fromDate = viewModel.get('fromDate');
                        var toDate = viewModel.get('toDate');
                        if(CutplanProcessingStore) CutplanProcessingStore.loadStore(fromDate, toDate, 100, 1, porderid_link, maNPL_id);

                        // load chart tien do cat
                        if(mainView){
                            var chartView = Ext.getCmp('CutplanProcessing_Chart_TienDoCat');
                            var chartViewController = chartView.getController();
                            var chart = Ext.getCmp('Chart_TienDoCat');
                            chartViewController.onChartRendered(chart);
                        }
                    }
                }
            }
        })

        // load chart tien do lenh
        if(mainView){
            // vi ly do nao day ma ko dung duoc down itemId, phai choi getCmp
            // var chartView = mainView.down('#CutplanProcessing_Chart_TienDoCat');
            var chartView = Ext.getCmp('CutplanProcessing_Chart_TienDoLenhSX');
            var chartViewController = chartView.getController();
            var chart = Ext.getCmp('Chart_TienDoLenhSX');
            chartViewController.onChartRendered(chart);
        }
    },
});
