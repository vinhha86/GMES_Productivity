Ext.define('GSmartApp.view.qcorg.ChartsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.ChartsStore',
    storeId:'ChartsStore',

    fields:[
      {name: 'To', type: 'string'},
      {name: 'Tong', type: 'int'},
      {name: 'HoanThanh', type: 'int'},
      {
        name: 'ChuaHoanThanh',
        calculate: function (data) {
          if(data.Tong == null) {
            return 0
          }
          return data.Tong - data.HoanThanh;
        }
      }, {
        name: 'phantram',
        calculate: function (data) {
          if(data.Tong == null || data.Tong == 0 || data.HoanThanh == null || data.HoanThanh == 0) {
            return 0;
          }
          return ((data.HoanThanh / data.Tong) * 100).toFixed(2)
        }
      }
    ],
    data:[
      { To: 'To 1', Tong: 800, HoanThanh: 500 },
      { To: 'To 2', Tong: 700, HoanThanh: 400},
      { To: 'To 3', Tong: 500, HoanThanh: 200},
      { To: 'To 4', Tong: 550, HoanThanh: 300 },
      { To: 'To 5', Tong: 600, HoanThanh: 400 },     
    ],
});