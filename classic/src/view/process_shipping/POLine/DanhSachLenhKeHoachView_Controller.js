Ext.define('GSmartApp.view.process_shipping.POLine.DanhSachLenhKeHoachView_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DanhSachLenhKeHoachView_Controller',
    isActivate: false,
    init: function () {
        
    },
	listen: {
        controller: {

        }
    },    
    control: {
        '#DanhSachLenhKeHoachView': {
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

        var productbuyercode = viewModel.get('productbuyercode');
        var productid_link = viewModel.get('productid_link');
        var list_po  = viewModel.get('list_po');
        // var colorid_link  = viewModel.get('colorid_link');
        // var sizesetid_link  = viewModel.get('sizesetid_link');

        console.log(productbuyercode);
        console.log(list_po);
        // console.log(colorid_link);
        // console.log(sizesetid_link);

        // return;

        var POrder_Grant= viewModel.getStore('POrder_Grant');
        POrder_Grant.loadDanhSachLenhKeHoach(productid_link);
        POrder_Grant.getSorters().add({
            property: 'donvi',
            direction: 'ASC'
        },{
            property: 'granttoorgname',
            direction: 'ASC'
        },{
            property: 'start_date_plan',
            direction: 'ASC'
        },{
            property: 'finish_date_plan',
            direction: 'ASC'
        });
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        return;

        var action = viewModel.get('action');
        if(action == 'confirm'){
            m.onSelectConfirm();
        }
        if(action == 'autoGetInfo'){
            m.onSelectAutoGetInfo();
        }
    },
    onSelectConfirm: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        var select = me.getSelectionModel().getSelection();
        var data = TimesheetShiftTypeOrgStore.getData().items;

        // console.log(select);
        // console.log(data);

        var unselect = new Array();
        for(var i = 0; i < data.length; i++){
            var isSelect = false;
            for(var j = 0; j < select.length; j++){
                if(data[i].get('id') == select[j].get('id')){
                    isSelect = true;
                    break;
                }
            }
            if(!isSelect){
                unselect.push(data[i]);
            }
        }
        // console.log(select);
        // console.log(unselect);

        m.fireEvent('SelectConfirm', select, unselect);
    },
    onSelectAutoGetInfo: function(){
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