Ext.define('GSmartApp.view.porders.POrder_Grant_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Controller',
    init: function(){
        var me = this.getView();
        var viewmodel =  this.getViewModel();

        viewmodel.set('granttoorgid_link', me.granttoorgid_link);
        viewmodel.set('granttoorg_name', me.granttoorg_name);

        //Lay thong tin POrder
        if (null != me.porderid_link){
            var params = new Object();
            params.porderid_link = me.porderid_link;
            GSmartApp.Ajax.post('/api/v1/porder/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        viewmodel.set('porder', response.data);
                        
                        //Lay danh sach POrders_SKU
                        var porderSKUStore = viewmodel.getStore('porderSKUStore');
                        porderSKUStore.loadByPorderID(me.porderid_link);

                        //Lay danh sach Grantt SKU
                    }
                }
            })
        }        
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
        this.getView().up('window').destroy();
    },
    onLuu: function () {
        var me = this.getView();
        var porderid_link = me.porderid_link;
        var granttoorgid_link = me.granttoorgid_link;

        var newGrant = new Object();
        newGrant.id = null;
        newGrant.porderid_link = porderid_link;
        newGrant.granttoorgid_link = granttoorgid_link;

        var params = new Object();
        params.data = newGrant;

        GSmartApp.Ajax.post('/api/v1/porder_grant/create', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                console.log(response);
            }
        })        
        me.fireEvent("GrantSave");
    }
})