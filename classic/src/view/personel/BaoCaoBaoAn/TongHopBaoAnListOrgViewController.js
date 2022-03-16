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
        var setCa6 = false;
        var setCa7 = false;
        var setCa8 = false;
        var setCa9 = false;
        var setCa10 = false;
        var setCa11 = false;
        var setCa12 = false;
        var setCa13 = false;
        var setCa14 = false;
        var setCa15 = false;
        var setCa16 = false;
        var setCa17 = false;
        var setCa18 = false;
        var setCa19 = false;
        var setCa20 = false;
        var setCa21 = false;
        var setCa22 = false;
        var setCa23 = false;
        var setCa24 = false;
        var setCa25 = false;
        var setCa26 = false;
        var setCa27 = false;
        var setCa28 = false;
        var setCa29 = false;
        var setCa30 = false;

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
            }else if(data.timesheet_shift_type_id_link == 9){
                str = 'Ca 6';
                setCa6 = true;
                viewModel.set('column_Ca6_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 10){
                str = 'Ca 7';
                setCa7 = true;
                viewModel.set('column_Ca7_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 11){
                str = 'Ca 8';
                setCa8 = true;
                viewModel.set('column_Ca8_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 12){
                str = 'Ca 9';
                setCa9 = true;
                viewModel.set('column_Ca9_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 13){
                str = 'Ca 10';
                setCa10 = true;
                viewModel.set('column_Ca10_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 14){
                str = 'Ca 11';
                setCa11 = true;
                viewModel.set('column_Ca11_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 15){
                str = 'Ca 12';
                setCa12 = true;
                viewModel.set('column_Ca12_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 16){
                str = 'Ca 13';
                setCa13 = true;
                viewModel.set('column_Ca13_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 17){
                str = 'Ca 14';
                setCa14 = true;
                viewModel.set('column_Ca14_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 18){
                str = 'Ca 15';
                setCa15 = true;
                viewModel.set('column_Ca15_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 19){
                str = 'Ca 16';
                setCa16 = true;
                viewModel.set('column_Ca16_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 20){
                str = 'Ca 17';
                setCa17 = true;
                viewModel.set('column_Ca17_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 21){
                str = 'Ca 18';
                setCa18 = true;
                viewModel.set('column_Ca18_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 22){
                str = 'Ca 19';
                setCa19 = true;
                viewModel.set('column_Ca19_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 23){
                str = 'Ca 20';
                setCa20 = true;
                viewModel.set('column_Ca20_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 24){
                str = 'Ca 21';
                setCa21 = true;
                viewModel.set('column_Ca21_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 25){
                str = 'Ca 22';
                setCa22 = true;
                viewModel.set('column_Ca22_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 26){
                str = 'Ca 23';
                setCa23 = true;
                viewModel.set('column_Ca23_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 27){
                str = 'Ca 24';
                setCa24 = true;
                viewModel.set('column_Ca24_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 28){
                str = 'Ca 25';
                setCa25 = true;
                viewModel.set('column_Ca25_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 29){
                str = 'Ca 26';
                setCa26 = true;
                viewModel.set('column_Ca26_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 30){
                str = 'Ca 27';
                setCa27 = true;
                viewModel.set('column_Ca27_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 31){
                str = 'Ca 28';
                setCa28 = true;
                viewModel.set('column_Ca28_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 32){
                str = 'Ca 29';
                setCa29 = true;
                viewModel.set('column_Ca29_time', str + time);
            }else if(data.timesheet_shift_type_id_link == 33){
                str = 'Ca 30';
                setCa30 = true;
                viewModel.set('column_Ca30_time', str + time);
            }
            // console.log(str + time);
        }

        if(!setCa1){
            viewModel.set('column_Ca1_time', 'Ca 1');
            viewModel.set('column_Ca1_hidden', true);
        }else{
            viewModel.set('column_Ca1_hidden', false);
        }
        if(!setCa2){
            viewModel.set('column_Ca2_time', 'Ca 2');
            viewModel.set('column_Ca2_hidden', true);
        }else{
            viewModel.set('column_Ca2_hidden', false);
        }
        if(!setCa3){
            viewModel.set('column_Ca3_time', 'Ca 3');
            viewModel.set('column_Ca3_hidden', true);
        }else{
            viewModel.set('column_Ca3_hidden', false);
        }
        if(!setCa4){
            viewModel.set('column_Ca4_time', 'Ca 4');
            viewModel.set('column_Ca4_hidden', true);
        }else{
            viewModel.set('column_Ca4_hidden', false);
        }
        if(!setCa5){
            viewModel.set('column_Ca5_time', 'Ca 5');
            viewModel.set('column_Ca5_hidden', true);
        }else{
            viewModel.set('column_Ca5_hidden', false);
        }
        if(!setCa6){
            viewModel.set('column_Ca6_time', 'Ca 6');
            viewModel.set('column_Ca6_hidden', true);
        }else{
            viewModel.set('column_Ca6_hidden', false);
        }
        if(!setCa7){
            viewModel.set('column_Ca7_time', 'Ca 7');
            viewModel.set('column_Ca7_hidden', true);
        }else{
            viewModel.set('column_Ca7_hidden', false);
        }
        if(!setCa8){
            viewModel.set('column_Ca8_time', 'Ca 8');
            viewModel.set('column_Ca8_hidden', true);
        }else{
            viewModel.set('column_Ca8_hidden', false);
        }
        if(!setCa9){
            viewModel.set('column_Ca9_time', 'Ca 9');
            viewModel.set('column_Ca9_hidden', true);
        }else{
            viewModel.set('column_Ca9_hidden', false);
        }
        if(!setCa10){
            viewModel.set('column_Ca10_time', 'Ca 10');
            viewModel.set('column_Ca10_hidden', true);
        }else{
            viewModel.set('column_Ca10_hidden', false);
        }
        if(!setCa11){
            viewModel.set('column_Ca11_time', 'Ca 11');
            viewModel.set('column_Ca11_hidden', true);
        }else{
            viewModel.set('column_Ca11_hidden', false);
        }
        if(!setCa12){
            viewModel.set('column_Ca12_time', 'Ca 12');
            viewModel.set('column_Ca12_hidden', true);
        }else{
            viewModel.set('column_Ca12_hidden', false);
        }
        if(!setCa13){
            viewModel.set('column_Ca13_time', 'Ca 13');
            viewModel.set('column_Ca13_hidden', true);
        }else{
            viewModel.set('column_Ca13_hidden', false);
        }
        if(!setCa14){
            viewModel.set('column_Ca14_time', 'Ca 14');
            viewModel.set('column_Ca14_hidden', true);
        }else{
            viewModel.set('column_Ca14_hidden', false);
        }
        if(!setCa15){
            viewModel.set('column_Ca15_time', 'Ca 15');
            viewModel.set('column_Ca15_hidden', true);
        }else{
            viewModel.set('column_Ca15_hidden', false);
        }
        if(!setCa16){
            viewModel.set('column_Ca16_time', 'Ca 16');
            viewModel.set('column_Ca16_hidden', true);
        }else{
            viewModel.set('column_Ca16_hidden', false);
        }
        if(!setCa17){
            viewModel.set('column_Ca17_time', 'Ca 17');
            viewModel.set('column_Ca17_hidden', true);
        }else{
            viewModel.set('column_Ca17_hidden', false);
        }
        if(!setCa18){
            viewModel.set('column_Ca18_time', 'Ca 18');
            viewModel.set('column_Ca18_hidden', true);
        }else{
            viewModel.set('column_Ca18_hidden', false);
        }
        if(!setCa19){
            viewModel.set('column_Ca19_time', 'Ca 19');
            viewModel.set('column_Ca19_hidden', true);
        }else{
            viewModel.set('column_Ca19_hidden', false);
        }
        if(!setCa20){
            viewModel.set('column_Ca20_time', 'Ca 20');
            viewModel.set('column_Ca20_hidden', true);
        }else{
            viewModel.set('column_Ca20_hidden', false);
        }
        if(!setCa21){
            viewModel.set('column_Ca21_time', 'Ca 21');
            viewModel.set('column_Ca21_hidden', true);
        }else{
            viewModel.set('column_Ca21_hidden', false);
        }
        if(!setCa22){
            viewModel.set('column_Ca22_time', 'Ca 22');
            viewModel.set('column_Ca22_hidden', true);
        }else{
            viewModel.set('column_Ca22_hidden', false);
        }
        if(!setCa23){
            viewModel.set('column_Ca23_time', 'Ca 23');
            viewModel.set('column_Ca23_hidden', true);
        }else{
            viewModel.set('column_Ca23_hidden', false);
        }
        if(!setCa24){
            viewModel.set('column_Ca24_time', 'Ca 24');
            viewModel.set('column_Ca24_hidden', true);
        }else{
            viewModel.set('column_Ca24_hidden', false);
        }
        if(!setCa25){
            viewModel.set('column_Ca25_time', 'Ca 25');
            viewModel.set('column_Ca25_hidden', true);
        }else{
            viewModel.set('column_Ca25_hidden', false);
        }
        if(!setCa26){
            viewModel.set('column_Ca26_time', 'Ca 26');
            viewModel.set('column_Ca26_hidden', true);
        }else{
            viewModel.set('column_Ca26_hidden', false);
        }
        if(!setCa27){
            viewModel.set('column_Ca27_time', 'Ca 27');
            viewModel.set('column_Ca27_hidden', true);
        }else{
            viewModel.set('column_Ca27_hidden', false);
        }
        if(!setCa28){
            viewModel.set('column_Ca28_time', 'Ca 28');
            viewModel.set('column_Ca28_hidden', true);
        }else{
            viewModel.set('column_Ca28_hidden', false);
        }
        if(!setCa29){
            viewModel.set('column_Ca29_time', 'Ca 29');
            viewModel.set('column_Ca29_hidden', true);
        }else{
            viewModel.set('column_Ca29_hidden', false);
        }
        if(!setCa30){
            viewModel.set('column_Ca30_time', 'Ca 30');
            viewModel.set('column_Ca30_hidden', true);
        }else{
            viewModel.set('column_Ca30_hidden', false);
        }
    }
})