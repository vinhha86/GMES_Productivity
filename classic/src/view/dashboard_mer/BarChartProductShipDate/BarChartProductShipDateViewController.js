Ext.define('GSmartApp.view.DashboardMer.BarChartProductShipDate.BarChartProductShipDateViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BarChartProductShipDateViewController',
    init: function () {
        // var viewModel = this.getViewModel();
        // var objSearch = viewModel.get('objSearch');
        // var ProductShipDateChartStore = viewModel.getStore('ProductShipDateChartStore');
        // ProductShipDateChartStore.loadStore(objSearch);
    },

    //___________________________________________
    control: {
        '#BarChartProductShipDateView_Chart': {
            itemclick: 'onItemclick'
        }
    },
    listen: {
        controller: {
            'Dashboard_Mer_ViewController': {
                'dashboard_search': 'on_dashboard_search'
            },
        },
        store: {
            'ProductShipDateChartStore': {
                'ProductShipDateChartStore_Done': 'onProductShipDateChartStore_Done'
            }
        }
    },

    onItemclick: function(series, item, event, eOpts){
        console.log(item);
    },

    on_dashboard_search: function(){
        var m = this;
        var me = this.getView();
        me.setLoading(true);
    },
    onProductShipDateChartStore_Done: function(){
        var m = this;
        var me = this.getView();
        me.setLoading(false);
    },

    onAxisLabelRender: function(axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except adding a thousands separator, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        var value = layoutContext.renderer(label);

        return value === 0 ? '0' : Ext.util.Format.number(value, '0,000');
    },

    onSeriesLabelRender: function(value) {
        return Ext.util.Format.number(value, '0,000');
    },

    onGridColumnRender: function(v) {
        return Ext.util.Format.number(v, '0,000');
    },
    onTooltipRender: function(toolTip, record, ctx){
        // console.log(record);
        var productBuyerCodeList = record.get('productBuyerCodeList');
        var html = '';
        for(var i=0; i<productBuyerCodeList.length; i++){
            html+= '<div>';
            html+= productBuyerCodeList[i];
            // html+= ' : '
            // html+= productBuyerCodeList[i].sum;
            html+= '</div>';
        }
        // console.log(html);
        // toolTip.setHtml(record.get('sum'));
        toolTip.setHtml(html);
    },
    onBarRender: function(sprite, config, rendererData, index){
        var status = rendererData.store.data.items[index].get('status') + ''; 
        var statusName = rendererData.store.data.items[index].get('statusName'); 
        var fillStyle = '#FFFFFF';
        switch (status){
            case '0':
            // case 'Chậm giao hàng':
                fillStyle = '#FF0000';
                break;
            case '1':
            // case 'Giao trong 3 ngày':
                fillStyle = '#FFFF00';
                break;
            case '2':
            // case 'Giao trong 5 ngày':
                fillStyle = '#4472C4';
                break;
            case '3':
            // case 'Giao trong 10 ngày':
                fillStyle = '#92D050';
                break;
        }
        // console.log(status);
        // console.log(typeof status);
        // console.log(fillStyle);
        return Ext.apply(rendererData, {
            fill: fillStyle
         });
    },

    onItemclick: function(chart, item, event, eOpts){
        // console.log(chart);
        // console.log(item);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var dashboard_mer = Ext.getCmp('dashboard_mer');
        var Dashboard_KhoTP_POLine_Main = dashboard_mer.down('#Dashboard_KhoTP_POLine_Main');
        if(Dashboard_KhoTP_POLine_Main){
            // Dashboard_KhoTP_POLine_Main.setDisabled(false);
            // load ds poline theo cot tuong ung
            var productIdList = item.record.get('productIdList');
            var status = item.record.get('status');
            var statusName = item.record.get('statusName');

            //
            // console.log(productIdList);
            if(productIdList != null && productIdList.length > 0){
                m.loadPoLineList(productIdList, status);
            }
        }

        m.fireEvent('dashboard_selectBarChartProduct');
    },
    loadPoLineList: function(productIdList, status){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var objSearch = viewModel.get('objSearch');

        m.fireEvent('dashboard_loadPoLineList', productIdList, status, objSearch);
        // console.log('fire dashboard_loadPoLineList');
    },
});