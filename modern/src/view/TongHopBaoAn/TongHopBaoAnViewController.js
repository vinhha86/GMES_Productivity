Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TongHopBaoAnViewController',
    init: function () {

    },
    control: {
        '#btnBack': {
            tap: 'onBtnBackTap'
        },
        '#btnTest': {
            tap: 'onBtnTest'
        },
        '#cbbox_org': {
            select: 'loadTongHopBaoAnView_Info'
        },
        '#date': {
            select: 'loadTongHopBaoAnView_Info'
        },
        '#tonghop_baoan': {
            painted: 'onPainted'
        }
    },
    onBtnBackTap: function(){
        this.redirectTo("mobilemenu");
    },
    onBtnTest: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var ListOrgStore = viewModel.getStore('ListOrgStore');
        // ListOrgStore.getOrgFor_BaoAn_Mobile();
        ListOrgStore.getOrgFor_BaoAn_Mobile_async();
        ListOrgStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    // console.log(records);
                    if(records.length > 0){
                        // set gia tri dau tien
                        var record = records[0];
                        viewModel.set('orgId', record.get('id'));

                        // load danh sach to
                        m.loadTongHopBaoAnView_Info();
                    }
				}
			}
        });
    },
    onPainted: function(sender, element, eOpts){
        console.log('painted');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var ListOrgStore = viewModel.getStore('ListOrgStore');
        // ListOrgStore.getOrgFor_BaoAn_Mobile();
        ListOrgStore.getOrgFor_BaoAn_Mobile_async();
        ListOrgStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
                    ListOrgStore.fireEvent('logout');
				} else {
                    // console.log(records);
                    if(records.length > 0){
                        // set gia tri dau tien
                        var record = records[0];
                        viewModel.set('orgId', record.get('id'));

                        // load danh sach to
                        m.loadTongHopBaoAnView_Info();
                    }
				}
			}
        });
    },
    loadTongHopBaoAnView_Info: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');

        var orgid_link = viewModel.get('orgId');
        var date = me.down('#date').getValue();
        // viewModel.set('date', date);

        // console.log(orgid_link);
        // console.log(date);

        me.setMasked(true);

        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;

        // return;

        GSmartApp.Ajax.post('/api/v1/timesheetlunch/getForTimeSheetLunch_Mobile', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    TimeSheetLunchStore.removeAll();
                    TimeSheetLunchStore.insert(0,response.data)
                } else {
                    // Ext.toast('Lấy thông tin thất bại', 3000);
                    TimeSheetLunchStore.fireEvent('logout');
                }
            })
    },
    // loadTongHopBaoAnView_Info: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');

    //     var orgid_link = viewModel.get('orgId');
    //     var date = me.down('#date').getValue();
    //     // viewModel.set('date', date);

    //     // console.log(orgid_link);
    //     // console.log(date);

    //     me.setMasked(true);

    //     var params = new Object();
    //     params.orgid_link = orgid_link;
    //     params.date = date;

    //     // return;

    //     GSmartApp.Ajax.post('/api/v1/timesheetlunch/getForTimeSheetLunch_Mobile', Ext.JSON.encode(params),
    //         function (success, response, options) {
    //             me.setMasked(false);
    //             if (success) {
    //                 var response = Ext.decode(response.responseText);
    //                 // console.log(response);
    //                 TimeSheetLunchStore.removeAll();
    //                 TimeSheetLunchStore.insert(0,response.data)
    //             } else {
    //                 // Ext.toast('Lấy thông tin thất bại', 3000);
    //                 TimeSheetLunchStore.fireEvent('logout');
    //             }
    //         })
    // },
    renderSum: function(value ){
        if (null == value) value = 0;
        return Ext.util.Format.number(value, '0,000');    
    },
})