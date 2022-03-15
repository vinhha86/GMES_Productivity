Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.TongHopBaoAnListOrgViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TongHopBaoAnListOrgViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('OrgStore');
        store.loadlistorg();
    },
    control: {
        '#TongHopBaoAnListOrgView': {
            itemclick: 'onloadDetail'
        },
        '#date_from': {
            collapse: 'loadData'
        },
        '#date_to': {
            collapse: 'loadData'
        }
    },
    onloadDetail: function (grid, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        viewModel.set('orgid_link', record.data.id);
        viewModel.set('org_name', record.get('name'));
        this.loadData();

        // set columns name

        this.getShiftTime(record.data.id);

    },
    loadData: function () {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('orgid_link');
        var date_from = viewmodel.get('date_from');
        var date_to = viewmodel.get('date_to');
        var store = viewmodel.getStore('BaoAnStore');
        var detail = grid.up('#TongHopBaoAnView');
        detail.setLoading('Đang tải dữ liệu');
        store.loadStore(orgid_link, date_from, date_to);
    },

    getShiftTime: function(orgid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        
        // viewModel.set('column_Ca1_time', '');
        // viewModel.set('column_Ca2_time', '');
        // viewModel.set('column_Ca3_time', '');
        // viewModel.set('column_Ca4_time', '');
        // viewModel.set('column_Ca5_time', '');

        var params = new Object();
        params.orgid_link = orgid_link;
        params.is_ca_an = true;
        GSmartApp.Ajax.post('/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        m.setShiftTime(response);
                        
                    }
                }
            })
    },
    setShiftTime: function(response){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var setCa1 = false;
        var setCa2 = false;
        var setCa3 = false;
        var setCa4 = false;
        var setCa5 = false;

        for (var i = 0; i < response.data.length; i++) {
            var data = response.data[i];
            // console.log(data);
            // var str = data.name.trim() + ' ';
            var str = '';
            var time = '<br>';
            time += data.from_hour < 10 ? '0' + data.from_hour : data.from_hour;
            time += data.from_minute < 10 ? ':0' + data.from_minute : ':' + data.from_minute;
            time += ' - ';
            time += data.to_hour < 10 ? '0' + data.to_hour : data.to_hour;
            time += data.to_minute < 10 ? ':0' + data.to_minute : ':' + data.to_minute;
            // str += time;

            
            if(data.timesheet_shift_type_id_link == 4){
                str = 'Ca 1';
                setCa1 = true;
                viewModel.set('column_Ca1_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 5){
                str = 'Ca 2';
                setCa2 = true;
                viewModel.set('column_Ca2_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 6){
                str = 'Ca 3';
                setCa3 = true;
                viewModel.set('column_Ca3_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 7){
                str = 'Ca 4';
                setCa4 = true;
                viewModel.set('column_Ca4_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 8){
                str = 'Ca 5';
                setCa5 = true;
                viewModel.set('column_Ca5_time', str + time);
            }
            console.log(str + time);
            // listtitle.push(str);

        }

        if(!setCa1){
            viewModel.set('column_Ca1_time', 'Ca 1');
        }
        if(!setCa2){
            viewModel.set('column_Ca2_time', 'Ca 2');
        }
        if(!setCa3){
            viewModel.set('column_Ca3_time', 'Ca 3');
        }
        if(!setCa4){
            viewModel.set('column_Ca4_time', 'Ca 4');
        }
        if(!setCa5){
            viewModel.set('column_Ca5_time', 'Ca 5');
        }
    }
})