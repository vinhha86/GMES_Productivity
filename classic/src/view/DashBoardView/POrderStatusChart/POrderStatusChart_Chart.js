Ext.define('GSmartApp.view.DashBoardView.POrderStatusChart.POrderStatusChart_Chart', {
    extend: 'Ext.panel.Panel',
    xtype: 'POrderStatusChart_Chart',
    controller: 'POrderStatusChart_ChartController',
    requires: ['Ext.chart.theme.Muted'],
    layout: 'fit',

    items: [
    {
        xtype: 'cartesian',
        width: '100%',
        height: '100%',
        captions: {
            // title: {
            //     text: 'Số lượng ra chuyền/ngày tháng hiện tại',
            //     alignTo: 'chart'
            // },
            subtitle: {
                text: 'Trạng thái lệnh',
                alignTo: 'chart'
            }
        },
        theme: 'Muted',
        interactions: ['itemhighlight'],
        animation: {
            duration: 200
        },
        bind:{
            store:'{POrderStatusChartStore}'
        },
        legend: {
            type: 'dom',
            docked: 'bottom'
        },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            fields: ['sum'],
            grid: true,
            // title: 'Số lượng',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category3d',
            position: 'bottom',
            fields: 'statusName',
            // title: {
            //     text: 'Phân xưởng',
            //     translationX: -30
            // },
            grid: true,
            label: {
                rotate: {
                    degrees: 0
                }
            },
        }],
        series: {
            type: 'bar3d',
            stacked: false,
            title: ['Số lượng'],
            xField: 'statusName',
            yField: ['sum'],
            label: {
                field: ['sum'],
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            highlight: true,
            style: {
                inGroupGapWidth: -7
            }
        }
    }
    ]
});