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
        '#date': {
            collapse: 'loadData'
        }
    },
    onloadDetail: function (grid, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        viewModel.set('orgid_link', record.data.id);
        viewModel.set('org_name', record.get('name'));
        this.loadData();
    },
    loadData: function () {
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('orgid_link');

        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = viewmodel.get('date');

        GSmartApp.Ajax.post('/api/v1/timesheetlunch/getForTimeSheetLunch', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Có lỗi trong quá trình lấy dữ liệu",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    } else {
                        var ca1 = 0, ca2 = 0, ca3 = 0, ca4 = 0;
                        for (var i = 0; i < response.data.length; i++) {
                            var rec = response.data[i];
                            if (rec.lunchShift1)
                                ca1++;
                            else if (rec.lunchShift2)
                                ca2++;
                            else if (rec.lunchShift3)
                                ca3++;
                            else if (rec.lunchShift4)
                                ca4++;
                        }
                        viewmodel.set('ca1', ca1);
                        viewmodel.set('ca2', ca2);
                        viewmodel.set('ca3', ca3);
                        viewmodel.set('ca4', ca4);
                    }
                }
            })
    }
})