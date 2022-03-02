Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVaoView_Detail_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoRaVaoView_Detail_Controller',

    init: function () {
        
    },
	listen: {
        controller: {

        }
    },    
    control: {
        '#BaoCaoRaVaoView_Detail': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var dataObj = viewModel.get('dataObj');
        dataObj.in_time_original = dataObj.in_time;
        dataObj.out_time_original = dataObj.out_time;
        dataObj.lunchstart_time_original = dataObj.lunchstart_time;
        dataObj.lunchend_time_original = dataObj.lunchend_time;
        dataObj.totalworking_time_original = dataObj.totalworking_time;
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var dataObj = viewModel.get('dataObj');
        console.log(dataObj);

        var params = new Object();
        params.row_day = dataObj.row_day;
        params.row_month = dataObj.row_month;
        params.row_year = dataObj.row_year;
        
        params.in_time_rowid = dataObj.in_time_rowid;
        params.out_time_rowid = dataObj.out_rowid;
        params.lunchstart_rowid = dataObj.lunchstart_rowid;
        params.lunchend_rowid = dataObj.lunchend_rowid;
        params.totalworking_time_rowid = dataObj.totalworking_time_rowid;

        if(dataObj.in_time == dataObj.in_time_original){
            params.in_time = dataObj.in_time;
        }else{
            params.in_time = dataObj.in_time + '/1';
        }
        if(dataObj.out_time == dataObj.out_time_original){
            params.out_time = dataObj.out_time;
        }else{
            params.out_time = dataObj.out_time + '/1';
        }
        if(dataObj.lunchstart_time == dataObj.lunchstart_time_original){
            params.lunchstart_time = dataObj.lunchstart_time;
        }else{
            params.lunchstart_time = dataObj.lunchstart_time + '/1';
        }
        if(dataObj.lunchend_time == dataObj.lunchend_time_original){
            params.lunchend_time = dataObj.lunchend_time;
        }else{
            params.lunchend_time = dataObj.lunchend_time + '/1';
        }
        if(dataObj.totalworking_time == dataObj.totalworking_time_original){
            params.totalworking_time = dataObj.totalworking_time;
        }else{
            params.totalworking_time = dataObj.totalworking_time + '/1';
        }


        GSmartApp.Ajax.post('/api/v1/timesheetinout/update_daily', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    console.log('successed');
                    console.log(dataObj);
                    console.log(response);
                }else{
                    console.log('failed');
                    console.log(response);
                }
        })     
    },
})