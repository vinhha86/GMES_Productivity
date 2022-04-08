Ext.define('GSmartApp.view.DashboardMer.DashboardMer_Progress.DashboardMer_ProgressView', {
    extend: 'Ext.panel.Panel',
    xtype: 'DashboardMer_ProgressView',
    controller: 'DashboardMer_ProgressViewController',
    requires: ['Ext.chart.theme.Muted'],
    layout: 'fit',

    items: [
    {
        xtype: 'cartesian',
        itemId: 'BarChartProductShipDateView_Chart',
        width: '100%',
        height: '100%',
        plugins: {
            ptype: 'chartitemevents',
            moveEvents: true
        },
        captions: {
            // title: {
            //     text: 'Số lượng ra chuyền/ngày tháng hiện tại',
            //     alignTo: 'chart'
            // },
            subtitle: {
                text: 'Biểu đồ theo dõi mã hàng sắp cần giao',
                alignTo: 'chart'
            }
        },
        theme: 'Muted',
        interactions: ['itemhighlight'],
        // interactions: [
        //     {
        //         type: 'itemhighlight'
        //     },
        //     {
        //         type: 'iteminfo',
        //         tooltip: {
        //             renderer: 'onEditTipRender'
        //         },
        //     }
        // ],
        animation: {
            duration: 200
        },
        bind:{
            store:'{ProductShipDateChartStore2}',
            // store:'{POrderStatusChartStore}',
            // captions: '{captions}'
        },
        // legend: {
        //     type: 'dom',
        //     docked: 'bottom'
        // },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['sum'],
            grid: true,
            // maximum: 1,
            // minimum: 1,
            // title: 'Số lượng',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'statusName',
            // title: {
            //     text: 'Phân xưởng',
            //     translationX: -30
            // },
            grid: true,
            label: {
                rotate: {
                    degrees: -20,
                    // degrees: 0
                }
            },
        }],
        series: {
            type: 'bar',
            stacked: true,
            fullStack: true,
            title: ['Số lượng', 'Số lượng 2'],
            xField: 'statusName',
            yField: ['sum', 'sum2'],
            label: {
                field: ['sum', 'sum2'],
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            highlight: false,
            style: {
                inGroupGapWidth: -7,
                minGapWidth: 25,
                maxBarWidth: 50,
            },
            tooltip: {
                trackMouse: false,
                // width: 140,
                // height: 28,
                renderer: 'onTooltipRender',
                // renderer: function (toolTip, record, ctx) {
                //     toolTip.setHtml(record.get('sum'));
                // },
            },
            // renderer: 'onBarRender',
        }
    }
    ]
});