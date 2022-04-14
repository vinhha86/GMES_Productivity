Ext.define('GSmartApp.view.DashboardMer.BarChartProductShipDate.BarChartProductShipDateView', {
    extend: 'Ext.panel.Panel',
    xtype: 'BarChartProductShipDateView',
    controller: 'BarChartProductShipDateViewController',
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
        interactions: [
            {
                type: 'itemhighlight'
            },
            // {
            //     type: 'panzoom',
            //     zoomOnPanGesture: true
            // }
        ],
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
            store:'{ProductShipDateChartStore}',
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
            majorTickSteps: 1,
            // maximum: 1,
            minimum: 0,
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
            stacked: false,
            title: ['Số lượng'],
            xField: 'statusName',
            yField: ['sum'],
            label: {
                field: ['sum'],
                display: 'insideEnd',
                orientation: 'horizontal',
                renderer: 'onSeriesLabelRender'
            },
            highlight: false,
            style: {
                inGroupGapWidth: -7,
                minGapWidth: 20,
                maxBarWidth: 70,
                minBarWidth: 60,
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
            renderer: 'onBarRender',
        }
    }
    ]
});