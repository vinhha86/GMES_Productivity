Ext.define('GSmartApp.view.pcontract.FOBPricePODetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FOBPricePODetailController',
    init: function(){
        var viewModel = this.getViewModel();
        var store  =  viewModel.getStore('FOBPricePODetailStore');
        // console.log(viewModel);
        var pcontract_poid_link = viewModel.get('record.id');
        console.log(pcontract_poid_link);
        // console.log(viewModel.get('record.data.id'));
        store.loadStore(pcontract_poid_link);
        store.getSorters().add('sizesetSortValue');
        store.getSorters().add('fobprice_name');
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnAddFOB': {
            click: 'onAddFOB'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onAddFOB: function(){
        var viewModel = this.getViewModel();
        var pcontract_poid_link = viewModel.get('record.id');

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách giá',
            closeAction: 'destroy',
            height: 400,
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_FOB_Price'
            }]
        });
        form.show();

        form.down('#PContract_FOB_Price').getController().on('SelectPrice', function (select) {
            console.log(pcontract_poid_link);
            var params = new Object();
            var data = new Array();
            for(var i=0;i<select.length;i++){
                var id = select[i].data.id;
                if(id != 1){
                    data.push(select[i].data);
                }
                console.log(id);
            }

            params.data = data;
            params.pcontract_poid_link = pcontract_poid_link;

            GSmartApp.Ajax.post('/api/v1/pcontract_price_d/createPContractPriceD', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var store  =  viewModel.getStore('FOBPricePODetailStore');
                        store.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thông tin thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thông tin thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })

            form.close();
        })
    }
})