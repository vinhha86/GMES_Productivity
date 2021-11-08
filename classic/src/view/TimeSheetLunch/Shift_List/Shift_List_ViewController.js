Ext.define('GSmartApp.view.TimeSheetLunch.Shift_List.Shift_List_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Shift_List_ViewController',
    isActivate: false,
    init: function () {
        
    },
	listen: {
        controller: {

        }
    },    
    control: {
        '#Shift_List_View': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onAfterrender: function(){
        var m = this;
        var me= this.getView();
        var viewModel = this.getViewModel();
        var orgid_link = viewModel.get('orgid_link');

        // console.log('onAfterrender');
        // console.log(orgid_link);

        if(!orgid_link){
            return;
        }

        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        TimesheetShiftTypeOrgStore.getbyorgid_link_caAn(orgid_link);
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var date = viewModel.get('date');
        var orgid_link = viewModel.get('orgid_link');
        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn phải chọn ít nhất một ca",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            // console.log(select);
            // console.log(date);
            // console.log(orgid_link);

            var listCa = new Array();
            for(var i = 0; i < select.length; i++){
                listCa.push(select[i].data);
            }

            var params = new Object();
            params.date = date;
            params.orgid_link = orgid_link;
            params.listCa = listCa;

            GSmartApp.Ajax.post('/api/v1/timesheetlunch/getListCheckCaAnAuto', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    // console.log(response.data);
                    m.fireEvent('Select', listCa, response.data);
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thành công',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        }
    },
})