Ext.define('GSmartApp.view.stockout.StockoutToCutDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockouttocutd',
    init: function() {
        this.callParent(arguments);
    },
    onActivate: function(){
        //Neu la vai Mex, cho nhap truc tiep khong qua khu co
        var stockout_d = this.getViewModel().get('stockout_d');
        txtydsprocessed = this.lookupReference('txtydsprocessed');
        txttotalerror = this.lookupReference('txttotalerror');
        btnaddtocut = this.lookupReference('btnaddtocut');

        if (stockout_d.get('skutypeid_link') == 4){
            if (btnaddtocut) btnaddtocut.setHidden(false);
            if (txttotalerror) txttotalerror.setHidden(false);
            if (txtydsprocessed){
                txtydsprocessed.setHidden(false);
                txtydsprocessed.focus();
            }
        } else {
            if (btnaddtocut) btnaddtocut.setHidden(true);
            if (txttotalerror) txttotalerror.setHidden(true);
            if (txtydsprocessed) txtydsprocessed.setHidden(true);
        }
    },
    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onClose: function(panel, eOpts){
        var store_stockout_d = Ext.data.StoreManager.lookup('store_stockout_d');
        if (store_stockout_d) store_stockout_d.reload();
    },
    renderSummary: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    onAddPklistToStockout: function(){
        stockouttocutdavailable = this.lookupReference('stockouttocutdavailable');
        var records = stockouttocutdavailable.getSelection();
        if (records.length > 0){
            var stockout_d = this.getViewModel().get('stockout_d');

            var data =new Array();
            Ext.Array.each(records, function(rc) {
                var order=new Object();
                order.stockoutid_link = stockout_d.get('stockoutid_link');
                order.stockoutdid_link = stockout_d.get('id');
                order.skucode = stockout_d.get('skucode');
                order.skutypeid_link = stockout_d.get('skutypeid_link');
                order.colorid_link = stockout_d.get('colorid_link');
                order.unitid_link = stockout_d.get('unitid_link');
                order.ydsorigin = rc.data.ydsorigin;
                order.ydscheck = rc.data.ydscheck;
                order.ydsprocessed = rc.data.ydsprocessed;
                order.widthorigin = rc.data.widthorigin;
                order.widthcheck = rc.data.widthcheck;
                order.widthprocessed = rc.data.widthprocessed;
                order.totalerror = rc.data.totalerror;
                order.epc = rc.data.epc;

                data.push(order);
            });

            var params=new Object();
            params.data = data; 

            GSmartApp.Ajax.post('/api/v1/stockout/pklist_stockoutbatch', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
				if (success) {
                    var store_stockout_pklist_tocut = Ext.data.StoreManager.lookup('store_stockout_pklist_tocut');
                    if (store_stockout_pklist_tocut) store_stockout_pklist_tocut.reload();
                    var store_stockout_pklist_available = Ext.data.StoreManager.lookup('store_stockout_pklist_available');
                    if (store_stockout_pklist_available) store_stockout_pklist_available.reload();
				} else {
                    Ext.MessageBox.show({
                        title: "Xuất cắt",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });   
        }         
    },

    onRemovePklistFromStockout: function(){
        stockouttocutpklist = this.lookupReference('stockouttocutpklist');
        var records = stockouttocutpklist.getSelection();
        if (records.length > 0){
            var stockout_d = this.getViewModel().get('stockout_d');

            var data =new Array();
            Ext.Array.each(records, function(rc) {
                var order=new Object();
                order.id = rc.data.id;
                order.stockoutid_link = rc.data.stockoutid_link;
                order.stockoutdid_link = rc.data.stockoutdid_link;
                order.skucode = rc.data.skucode;
                order.epc = rc.data.epc;

                data.push(order);
            });

            var params=new Object();
            params.data = data;     

            GSmartApp.Ajax.post('/api/v1/stockout/pklist_stockoutreversebatch', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
				if (success) {
                    var store_stockout_pklist_tocut = Ext.data.StoreManager.lookup('store_stockout_pklist_tocut');
                    if (store_stockout_pklist_tocut) store_stockout_pklist_tocut.reload();
                    var store_stockout_pklist_available = Ext.data.StoreManager.lookup('store_stockout_pklist_available');
                    if (store_stockout_pklist_available) store_stockout_pklist_available.reload();
				} else {
                    Ext.MessageBox.show({
                        title: "Xuất cắt",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });   
        }         
    },
    onPklistItemEdit: function(editor, e){
                
        var params=new Object();
        params.msgtype = 'stockout_updatepklist';
        params.message = '';
        params.token = '';
        params.data = e.record.data;
        //console.log(Ext.JSON.encode(params));

        GSmartApp.Ajax.post('/api/v1/stockout/pklist_update', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (success) {
                e.record.beginedit;
                //Nếu update thành công cập nhật lại số old theo số vừa sửa
                e.record.set('ydscheckold', e.record.get('ydscheck'));
                e.record.set('ydsprocessedold', e.record.get('ydsprocessed'));
                e.record.set('widthcheckold', e.record.get('widthcheck'));
                e.record.set('widthprocessedold', e.record.get('widthprocessed'));
                e.record.set('totalerrorold', e.record.get('totalerror'));
                e.record.endedit;
            } else {
                Ext.MessageBox.show({
                    title: "Xuất cắt",
                    msg: response.message,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
        });   
    }, 
    onAddPklistItemTap: function(){
        // var txtwidthorigin = this.lookupReference('txtwidthorigin');
        // var txtydsorigin = this.lookupReference('txtydsorigin');
        // var txtwidthcheck = this.lookupReference('txtwidthcheck');
        // var txtydscheck = this.lookupReference('txtydscheck');
        var txttotalerror = this.lookupReference('txttotalerror');
        var txtwidthprocessed = this.lookupReference('txtwidthprocessed');
        var txtydsprocessed = this.lookupReference('txtydsprocessed');
        var stockout_d = this.getViewModel().get('stockout_d');
        if (null == txttotalerror.getValue() && null == txtwidthprocessed.getValue() && null == txtydsprocessed.getValue()){
            Ext.Msg.alert("Kiểm đo/Khử co", "Cần phải có thông tin xuất của cuộn vải");
        }
        else
        if (txtydsprocessed.getValue()){
            var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
            var params =new GSmartApp.model.Stockout_pklist({
                id: null, 
                orgrootid_link: null,
                stockoutid_link: stockout_d.get('stockoutid_link'),
                stockoutdid_link: stockout_d.get('id'),
                skuid_link: null,
                skucode: stockout_d.get('skucode'),
                skutype: stockout_d.get('skutype'),
                skutypeid_link: stockout_d.get('skutypeid_link'),
                colorid_link: stockout_d.get('colorid_link'),
                color_name: stockout_d.get('color_name'),
                color_code: stockout_d.get('color_code'),
                unitid_link: stockout_d.get('unitid_link'),
                lotnumber: null,
                packageid: null,
                ydsorigin: null,
                ydscheck: null,
                ydsprocessed: txtydsprocessed.getValue(),
                widthorigin: null,
                widthcheck: null,
                widthprocessed: txtwidthprocessed.getValue(),
                totalerror: txttotalerror.getValue(),
                netweight: null,
                grossweight: null,
                epc: null,
                rssi: null,
                encryptdatetime: null,
                usercheckid_link: null,
                timecheck: null,
                userprocessedkid_link: null,
                timeprocessed: null,
                usercreateid_link: null,
                timecreate: null,                           
                lastuserupdateid_link: null,
                lasttimeupdate: null            
            });
            // store_stockout_pklist_forcheck.insert(0, newItem);
            GSmartApp.Ajax.post('/api/v1/stockout/pklist_stockoutmex', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    var store_stockout_pklist_tocut = Ext.data.StoreManager.lookup('store_stockout_pklist_tocut');
                    if (store_stockout_pklist_tocut) store_stockout_pklist_tocut.reload();
                } else {
                    Ext.MessageBox.show({
                        title: "Xuất cắt",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });               
             
        }
        
        //Neu la vai Mex, cho nhap truc tiep khong qua khu co
        if (stockout_d.get('skutypeid_link') == 4){
            txtydsprocessed = this.lookupReference('txtydsprocessed');
            if (txttotalerror) txttotalerror.setValue(null);
            txttotalerror = this.lookupReference('txttotalerror');
            if (txtydsprocessed) {
                txtydsprocessed.setValue(null);
                txtydsprocessed.focus();
            }
        }
    },
    onSearchTap: function(){
        var store_stockout_pklist_available = Ext.data.StoreManager.lookup('store_stockout_pklist_available');
        if (store_stockout_pklist_available){
            var stockout_d = this.getViewModel().get('stockout_d');
            var txtskucode_forfilter = this.lookupReference('txtskucode_forfilter');
            store_stockout_pklist_available.loadFilter(stockout_d.get('skuid_link'),txtskucode_forfilter.getValue(),stockout_d.get('skutypeid_link'));
        }
    },
    onYdsProcessedKeyup: function(my, e) {
        if (e.getKey() == 13){
            txttotalerror = this.lookupReference('txttotalerror');
            txttotalerror.focus();
        }
    },
    onTotalErrorKeyup: function(my, e) {
        if (e.getKey() == 13){
            this.onAddPklistItemTap();
        }
    }
});
