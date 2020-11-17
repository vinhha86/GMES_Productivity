Ext.define('GSmartApp.view.DashBoardView.LineChartRegisterCodeCount', {
    extend: 'Ext.panel.Panel',
    xtype: 'LineChartRegisterCodeCount',
    controller: 'LineChartRegisterCodeCountController',
    layout: 'fit',

    items: [{
            xtype: 'cartesian',
            reference: 'chart',
            width: '100%',
            height: '100%',
            legend: {
                type: 'sprite',
                docked: 'bottom'
            },
            // store: {
            //     type: 'browsers'
            // },
            bind: {
                store: '{LineChartRegisterCodeCountStore}'
            },
            captions: {
                // title: 'Line Charts - Marked Lines',
                subtitle: 'SL công nhân đi làm'
            },
            axes: [{
                type: 'numeric',
                fields: ['registerCodeCount'],
                position: 'left',
                grid: true,
                minimum: 0,
                renderer: 'onAxisLabelRender'
            }, {
                type: 'category',
                fields: 'registerDate',
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                },
                renderer: function (axis, label){
                    return Ext.Date.format(label, 'd/m');
                }
            }],
            series: [{
                type: 'line',
                title: 'Số lượng',
                xField: 'registerDate',
                yField: 'registerCodeCount',
                // marker: {
                //     // type: 'square',
                //     // animation: {
                //     //     duration: 200,
                //     //     easing: 'backOut'
                //     // }
                //     radius: 4,
                //     lineWidth: 2
                // },
                highlightCfg: {
                    scaling: 2
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }]
    }]
});