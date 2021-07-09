Ext.define('GSmartApp.view.process_shipping.POLine.POLineChart.POLineChart_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POLineChart_Controller',

    onChartRendered: function(chart) {
        var viewModel = this.getViewModel();
        var po = viewModel.get('po'); // console.log(po);
        var dataIndex = viewModel.get('dataIndex'); // console.log(dataIndex);
        var pcontract_poid_link = po.get('id');

        var store = chart.getStore();
        store.removeAll();

        var me = this.getView();
        var POrderLineChart = this.getViewModel().getStore('POrderLineChart');
        POrderLineChart.LoadPorderProcessing_byPO(pcontract_poid_link);
        POrderLineChart.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    this.fireEvent('logout');
                }
                else{
                    store.removeAll();
                    if(POrderLineChart.data.length == 0){
                        store.add({
                            processingdate: null                                        
                        });
                    }else{
                        for (var i = 0; i < POrderLineChart.data.length; i++) {
                            var data = POrderLineChart.data.items[i].data;
                            store.add({
                                processingdate: data.processingdate_str,
                                amountinput: null==data.amountinput?0:data.amountinput,
                                amountinputsum: null==data.amountinputsum?0:data.amountinputsum,
                                amountoutput: null==data.amountoutput?0:data.amountoutput,
                                amountoutputsum: null==data.amountoutputsum?0:data.amountoutputsum,
                                amountpacked: null==data.amountpacked?0:data.amountpacked,
                                amountpackedsum: null==data.amountpackedsum?0:data.amountpackedsum,
                                amountpackstocked: null==data.amountpackstocked?0:data.amountpackstocked,
                                amountpackstockedsum: null==data.amountpackstockedsum?0:data.amountpackstockedsum,
                                amountstocked: null==data.amountstocked?0:data.amountstocked,
                                amountstockedsum: null==data.amountstockedsum?0:data.amountstockedsum                                                        
                            });
                        }
                    }
               
                }
            }
        });        


    },
    onAxisLabelRender: function(axis, label, layoutContext) {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label);
    },

    onTooltipRender_Input: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- VC: ' + record.get('amountinput'));
    },
    onTooltipRender_Output: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- RC: ' + record.get('amountoutput'));
    },
    onTooltipRender_Packed: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- ĐG: ' + record.get('amountpacked'));
    },
    onTooltipRender_Stocked: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- NK: ' + record.get('amountstocked'));
    },
    onTooltipRender_Packstocked: function(tooltip, record, item) {
        tooltip.setHtml(record.get('processingdate') + '- HT: ' + record.get('amountpackstocked'));
    },
    onItemHighlight: function(chart, newHighlightItem, oldHighlightItem) {
        this.setSeriesLineWidth(newHighlightItem, 4);
        this.setSeriesLineWidth(oldHighlightItem, 2);
    },

    setSeriesLineWidth: function(item, lineWidth) {
        if (item) {
            item.series.setStyle({
                lineWidth: lineWidth
            });
        }
    }
});