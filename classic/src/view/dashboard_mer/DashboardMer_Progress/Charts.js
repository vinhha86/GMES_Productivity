Ext.define('GSmartApp.view.qcorg.Charts', {
  extend: 'Ext.Panel',
  xtype: 'Charts',
  controller: 'column-stacked-100',
  requires: ['Ext.chart.theme.Muted'],
  // layout: {
  //   type: 'fit'
  // },

  items: {
    xtype: 'cartesian',
    itemId: 'bieudo',
    // store: {
    //   type: 'ChartsStore'
    // },
    bind: {
      store: '{ChartsStore}'
    },
    insetPadding: {
      top: 50,
      left: 25,
      right: 25,
      bottom: 15
    },
    interactions: 'itemhighlight',
    captions: {
      title: 'Tiến độ sản xuất',
    },
    axes: [{
      type: 'numeric',
      position: 'left',
      grid: true,
      rederer: 'onAxisLabelRender',
      fields: ['HoanThanh', 'ChuaHoanThanh'],
    }, {
      type: 'category',
      position: 'bottom',
      // title: {
      //   text: 'Sales by Branch',
      //   fontSize: 18,
      //   fillStyle:'#277cc0'
      // },
      fields: 'To',
      rotate: {
        degrees: -45
    }
    }],
    series: [{
      type: 'bar',
      stacked: true,
      fullStack: true,

      title: [ 'HoanThanh', 'ChuaHoanThanh'],

      xField: 'To',
      yField: [ 'HoanThanh', 'ChuaHoanThanh'],

      style: {
        minGapWidth: 15
      },
      highlight: {
        config: true,
      },
      tooltip: {
        trackMouse: false,
        renderer: 'onBarTipRender'
      },
      label: {
        field: ['HoanThanh', 'ChuaHoanThanh'],
        display: 'insideEnd',
        orientation: 'horizontal',
    }
    }],
    legend: {
      type: 'sprite',
      docked: 'bottom',
  },
  }

});