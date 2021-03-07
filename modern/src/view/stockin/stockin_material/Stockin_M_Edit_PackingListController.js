Ext.define('GSmartApp.view.stockin.Stockin_M_Edit_PackingListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_PackingListController',
	init: function() {
        var viewModel = this.getViewModel();
        
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
                // newdata: 'onNewData',
				// urlBack:'onUrlBack'
            }
        }
	},
    control:{
        '#btnBack':{
            tap: 'onBackPage'
        },
        // '#btnLuu':{
        //     tap: 'onSave'
        // },
        // '#btnConfirm':{
        //     tap: 'onConfirm'
        // }
    },
    onUrlBack: function(type){
        
    },
    onLoadData:function(id,type){
        console.log('onLoadData: ' + id + ' ' + type);
        var viewModel = this.getViewModel();

        // this.getInfo(id);
    },
    onBackPage: function(){
        // console.log('onBackPage');
        var viewModel = this.getViewModel();
        // this.redirectTo('stockin_m');
    },
    getInfo: function(id){
        var me = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('StockinDetailStore');
        var listepc = viewModel.get('listepc');

        var params = new Object();
        params.id = id ;
        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_getbyid',Ext.JSON.encode(params),
		function(success,response,options ) {
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
                console.log(response.data);
                viewModel.set('stockin', response.data);
                for(var i=0; i<response.listepc.length; i++){
                    listepc.set(response.listepc[i].epc, response.listepc[i].epc);
                }
                store.setData(response.data.stockin_d);

                // set store org from
                if(response.data.stockintypeid_link == 1) {// mua moi va cap bu thi là nha cung cap
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore(5, false);
                }else{
                    var listidtype = "13,4,8,9";
                    var orgfromstore = viewModel.getStore('OrgFromStore');
                    orgfromstore.loadStore_byRoot(listidtype);
                }
            }
		})
    },
})