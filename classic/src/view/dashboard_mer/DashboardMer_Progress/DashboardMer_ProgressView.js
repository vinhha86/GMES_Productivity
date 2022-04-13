Ext.define('GSmartApp.view.DashboardMer.DashboardMer_Progress.DashboardMer_ProgressView', {
    extend: 'Ext.panel.Panel',
    xtype: 'DashboardMer_ProgressView',
    controller: 'DashboardMer_ProgressViewController',
    cls: 'DashboardMer_ProgressView',
    requires: ['Ext.chart.theme.Muted'],
    layout: 'fit',

    items: [
    {
        xtype: 'cartesian',
        itemId: 'BarChartProductShipDateView_Chart',
        scrollable: true,
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
                text: 'Biểu đồ tiến độ sản xuất',
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
        // store: {
        //     type: 'DashboardMer_ProgressStore'
        // },
        bind:{
            store:'{DashboardMer_ProgressStore}',
            // captions: '{captions}'
        },
        // legend: {
        //     type: 'dom',
        //     docked: 'bottom'
        // },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['sumDone', 'sumNotDone'],
            grid: true,
            majorTickSteps: 10,
            maximum: 100,
            minimum: 0,
            // title: 'Số lượng',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'orgName',
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
            colors:['#ffc000','#92d050'],
            // scrollable: true,
            stacked: true,
            fullStack: true,
            title: ['Số lượng HT', 'Số lượng còn'],
            xField: 'orgName',
            yField: ['sumDone', 'sumNotDone'],
            label: {
                field: ['sumDone', 'sumNotDone'],
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
            // renderer: 'onBarRender',
        }
    }
    ],
    dockedItems: [
        {
            dock: 'bottom',
            layout: 'vbox',
            border: false,
            items: [
                {
                    layout: 'hbox',
                    border: false,
                    items: [
                        {
                            html: '<div class="color-box">'
                                + '<div class="color-square done"></div>Đã hoàn thành'
                                + '</div>',
                            margin: '2'
                        },
                        {
                            html: '<div class="color-box">'
                                + '<div class="color-square not-done"></div>Chưa hoàn thành'
                                + '</div>',
                            margin: '2'
                        },
                    ]
                }
            ]
        }
    ]
});