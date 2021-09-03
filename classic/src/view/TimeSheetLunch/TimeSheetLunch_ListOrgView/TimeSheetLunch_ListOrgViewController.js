Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListOrgViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_ListOrgViewController',
    init: function () {
        this.onload();
    },
    control: {
        '#TimeSheetLunch_ListOrgView': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        // console.log(record);
        var viewModel = this.getViewModel();
        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');

        var orgtypeid_link = record.get('orgtypeid_link');
        var orgid_link = record.get('id');
        
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();

        viewModel.set('orgtypeid_link', orgtypeid_link);
        viewModel.set('orgid_link', orgid_link);

        // if(orgtypeid_link == 1 || orgtypeid_link == 13){
        //     TimeSheetLunchStore.removeAll();
        //     return;
        // }

        // load danh sách nhân viên và ca
        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        TimeSheetLunchStore.loadStore(orgid_link, date);

        // check status xác nhận của ngày và của đơn vị
        this.checkStatus(orgid_link, date);
        //gọi function CreateColumns
        var controler = Ext.getCmp('TimeSheetLunch_ListView').getController();
        controler.CreateColumns(record.get('id'));
    },
    checkStatus: function(orgid_link, date){
        var viewModel = this.getViewModel();
        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;

        GSmartApp.Ajax.post('/api/v1/timesheetlunch/isconfirm', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    // set hidden and disabled btnConfirm...
                    // console.log(response);
                    var isConfirm = response.isConfirm;
                    if(isConfirm){
                        viewModel.set('isBtnConfirmHidden', true);
                        viewModel.set('isBtnUnconfirmHidden', false);
                    }else{
                        viewModel.set('isBtnConfirmHidden', false);
                        viewModel.set('isBtnUnconfirmHidden', true);
                    }

                    var isToday = viewModel.get('isToday');
                    if(isToday){
                        viewModel.set('isBtnUnconfirmHiddenDisabled', false);
                    }else{
                        viewModel.set('isBtnUnconfirmHiddenDisabled', true);
                    }

                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Lấy status thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
        })

    },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        OrgStore.loadStore();

        this.activeOnlyFilter = Ext.create('Ext.util.Filter', {
            id: 'activeOnlyFilter',
            property: 'status',
            value: 1
        });
        OrgStore.getFilters().add(this.activeOnlyFilter);
        
        OrgStore.getSorters().add('orgtypeid_link');
        OrgStore.getSorters().add('is_manufacturer');
        OrgStore.getSorters().add('id');
    }
})