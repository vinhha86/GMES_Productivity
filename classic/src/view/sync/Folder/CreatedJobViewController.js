Ext.define('GSmartApp.view.sync.Folder.CreatedJobViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CreatedJobViewController',
    init: function () {
        var viewmodel = this.getViewModel();

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var grid = this.getView();

        var session = GSmartApp.util.State.get('session');
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.classname = viewmodel.get('classname');
        params.des_path = viewmodel.get('des_path').replace('{driver}:', '');
        params.src_path = viewmodel.get('src_path');
        params.jobname = viewmodel.get('jobname');
        params.time_format = viewmodel.get('time_format');
        params.userid = session.id;

        GSmartApp.Ajax.post_demo('sync/create_syncjob', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'OK'
                            }
                        });
                        grid.fireEvent('ThanhCong');
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'OK'
                            }
                        });
                    }
                }
            })
    }
})