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

        var select = me.getSelectionModel().getSelection();
        if(select.length > 0){
            m.SelectPorderGrant(select);
        }else{
            // console.log('not select');
            m.SelectNoPorderGrant();
        }
    },
    SelectPorderGrant: function(select){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var list_po = viewModel.get('list_po');

        console.log(list_po);
        console.log(select);

        var pordergrant_id = select[0].get('id');
        var list_pcontract_po = new Array();
        for(var i=0; i<list_po.length; i++){
            list_pcontract_po.push(list_po[i].data);
        }

        var params = new Object();
        params.pordergrant_id = pordergrant_id;
        params.list_pcontract_po = list_pcontract_po;
        params.colorid_link = viewModel.get('colorid_link') == null ? 0 : viewModel.get('colorid_link');
        params.sizesetid_link = viewModel.get('sizesetid_link') == null ? 0 : viewModel.get('sizesetid_link');

        GSmartApp.Ajax.post('/api/v1/schedule/create_many_porder_and_grant_byLenhKeHoach', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // success fire event etc...
                        console.log('successed');
                    }
                }else{
                    console.log('failed');
                }
            })
    },
    SelectNoPorderGrant: function(){
        console.log('SelectNoPorderGrant');
    }
})