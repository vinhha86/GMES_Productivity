Ext.define('GSmartApp.view.invoice.InvoiceEdit_M_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceEdit_M_Controller',
	init: function() {
        var viewmodel = this.getViewModel();
        var OrgProviderStore = viewmodel.getStore('OrgProviderStore');
        OrgProviderStore.loadStore(5, false);
        
        var listidtype = "4,8,9,11,12";
        var orgtostore = viewmodel.getStore('OrgToStore');
        orgtostore.loadStore_allchildren_byorg(listidtype);
        
        var portfromstore = viewmodel.getStore('PortFromStore');
        portfromstore.loadStore(15, false);

        var porttostore = viewmodel.getStore('PortToStore');
        porttostore.loadStore(15, false);
    },
    control: {
		'#btnPContract_Search': {
			click: 'onBtnPContract_Search'
        },
        '#btnPcontract_Plus': {
			click: 'onBtnPContract_Plus'
		},
    },
    onBtnPContract_Plus: function (){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pcontractcode = viewModel.get('invoice.pcontractcode');

        if(pcontractcode == null || pcontractcode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã đơn hàng không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var params = new Object();
        params.contractcode = pcontractcode;

        GSmartApp.Ajax.post('/api/v1/pcontract/findByExactContractcode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response);
                        if(response.message == 'Mã đơn hàng không tồn tại'){
                            Ext.Msg.show({
                                title: 'Lấy thông tin thất bại',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }else{
                            var pcontract = response.data[0];
                            // console.log(pcontract);  
                            var pcontractId = pcontract.id;
                            var pcontractCode = pcontract.contractcode;
                            var pcontractDate = pcontract.get('contractdate');

                            viewModel.set('invoice.pcontractid_link', pcontractId);
                            viewModel.set('invoice.pcontractcode', pcontractCode);
                            viewModel.set('invoice.contractdate', pcontractDate);
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lấy thông tin thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lấy thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onBtnPContract_Search: function(){
        // hien danh sach pcontract
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pcontractcode = viewModel.get('invoice.pcontractcode');
        // console.log(pcontractSearch);

        if(pcontractcode == null || pcontractcode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã đơn hàng không được bỏ trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 400,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            // title: 'Danh sách lệnh',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'invoice_pcontractlist',
                viewModel: {
                    type: 'invoice_pcontractlist_ViewModel',
                    data: {
                        pcontractSearch: pcontractcode
                    }
                }
            }]
        });
        form.show();

        form.down('#invoice_pcontractlist').getController().on('pcontractlistThoat', function () {
            form.close();
        });

        form.down('#invoice_pcontractlist').getController().on('pcontractlistLuu', function (select) {
            // console.log(select);
            // id, contractcode
            var pcontract = select[0];
            var pcontractId = pcontract.get('id');
            var pcontractCode = pcontract.get('contractcode');
            var pcontractDate = pcontract.get('contractdate');

            viewModel.set('invoice.pcontractid_link', pcontractId);
            viewModel.set('invoice.pcontractcode', pcontractCode);
            viewModel.set('invoice.contractdate', pcontractDate);

            // console.log(viewModel.get('invoice'));

            form.close();
        });

        form.down('#invoice_pcontractlist').getController().on('pcontractlistNotSelect', function () {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Phải chọn một đơn hàng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        });
    },
    onPressEnterBtnPContract_Search: function(textfield, e, eOpts){
        var m = this;
        if(e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            m.onBtnPContract_Search();
        }
    },
})