Ext.define('GSmartApp.view.DashboardMer.BarChartProductShipDate.BarChartProductShipDateViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BarChartProductShipDateViewController',
    init: function () {
        var viewModel = this.getViewModel();
        var objSearch = viewModel.get('objSearch');
        var ProductShipDateChartStore = viewModel.getStore('ProductShipDateChartStore');
        ProductShipDateChartStore.loadStore(objSearch);
    },

    //___________________________________________

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
        console.log(record);
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
    }
});