Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit.CutplanProcessing_Edit_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_Edit_Controller',
    init: function () {
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        // tải những bàn cắt thuộc tổ cắt của user
        OrgStore.loadOrgByTypeBanCat();

        var SkuStore = viewModel.getStore('Sku');
        SkuStore.getSorters().add('product_code');
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
    control: {
        '#btnBack': {
            click: 'onBackPage'
        },
        // '#btnLuu': {
        //     click: 'onSave'
        // },
        // '#btnAdd': {
        //     click: 'onBtnAdd'
        // },
    },
    onLoadData: function (id, type) {
        // console.log('onLoadData: ' + id + ' ' + type);
        var me = this;
        var viewModel = this.getViewModel();
        if (id == 0) {
            viewModel.set('cutplanProcessing.processingdate', new Date());
        } else {
            me.getInfo(id);
        }
    },
    onBackPage: function () {
        this.redirectTo('cutplan_processing');
    },
    getInfo: function (id) {
        var m = this;
        var viewModel = this.getViewModel();
        // var CutplanProcessingDStore = viewModel.getStore('CutplanProcessingDStore');

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/cutplan_processing/cutplan_processing_getbyid', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    // console.log(response.data);
                    viewModel.set('cutplanProcessing', response.data);

                    var date = Ext.Date.parse(response.data.processingdate, 'c');
                    if (date == null) date = new Date(response.data.processingdate);
                    viewModel.set('cutplanProcessing.processingdate', date);

                    // dựa vào thông tin cutplan_processing để load store sku và color
                    if (response.data.porderId != null || response.data.porderId != 0) {
                        var porderid_link = response.data.porderid_link;
                        var pcontractid_link = response.data.pcontractid_link;
                        var productid_link = response.data.productid_link;
                        var producttypeid_link = 20;
                        viewModel.set('porderid_link', porderid_link);
                        // load sku store (npl)
                        if (pcontractid_link != null) {
                            var SkuStore = viewModel.getStore('Sku');
                            SkuStore.load_by_type_and_pcontract(producttypeid_link, pcontractid_link);
                        }

                        // load color store
                        if (pcontractid_link != null && productid_link != null) {
                            m.loadColorStore(pcontractid_link, productid_link);
                        }


                    }

                    // CutplanProcessingDStore.setData(response.data.cutplanProcessingD);

                }
            })
    },
    onSave: function () {
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.data = [];
        var cutplanProcessing = viewModel.get('cutplanProcessing');

        var cutplanProcessingD = cutplanProcessing.cutplanProcessingD;
        if (cutplanProcessingD != null) {
            for (var i = 0; i < cutplanProcessingD.length; i++) {
                if (cutplanProcessingD[i].id == 0 || typeof cutplanProcessingD[i].id === 'string') {
                    cutplanProcessingD[i].id = null;
                }
            }
        }
        // console.log(stockin);
        params.data.push(cutplanProcessing);
        params.porderid_link = viewModel.get('porderid_link');
        params.material_skuid_link = viewModel.get('cutplanProcessing.material_skuid_link');
        params.colorid_link = viewModel.get('cutplanProcessing.colorid_link');

        // console.log(params);
        me.setMasked({
            xtype: 'loadmask',
            message: 'Đang tải'
        });

        GSmartApp.Ajax.post('/api/v1/cutplan_processing/cutplan_processing_create', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setMasked(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.toast('Lưu thành công', 3000);
                        this.redirectTo("cutplan_processing/" + response.id + "/edit");
                        m.getInfo(response.id);
                    } else{
                        Ext.toast('Lỗi ' + response.message, 3000);
                    }
                } else {
                    Ext.toast('Lỗi ' + response.message, 3000);
                }
            })

    },

    
    onlotnumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        // console.log(newValue.toUpperCase());
        // viewModel.set('lotnumberTxt', newValue.toUpperCase());
        field.setValue(newValue.toUpperCase());
    },
    onlotnumberTxtAndpackageidTxtleave: function(textfield, event, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        var skuid_link = viewModel.get('cutplanProcessing.material_skuid_link');
        var lotnumber = viewModel.get('cutplanProcessingDObj.lotnumber');
        var packageid = viewModel.get('cutplanProcessingDObj.packageid');

        if(skuid_link == null){
            viewModel.set('cutplanProcessingDObj.packageid', null);
            viewModel.set('cutplanProcessingDObj.lotnumber', lotnumber);
            Ext.toast('Cần chọn mã vải (thông tin chung)', 3000);
            return;
        }

        if( // nếu chưa đủ thông tin hoặc chưa chọn loại vải, return
            lotnumber == '' || packageid == '' ||
            lotnumber == null || packageid == null
        ){
            viewModel.set('cutplanProcessingDObj.lotnumber', lotnumber);
            viewModel.set('cutplanProcessingDObj.packageid', null);
            return;
        }else{ // tìm cây vải theo lot và package

            me.setMasked({
                xtype: 'loadmask',
                message: 'Đang tải'
            });

            var params = new Object();
            // params.stockoutorderdid_link = stockoutorderdid_link;
            params.skuid_link = skuid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;

            GSmartApp.Ajax.postJitin('/api/v1/warehouse/getByLotAndPackageIdForStockout', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    me.setMasked(false);
                    var response = Ext.decode(response.responseText);
                    viewModel.set('cutplanProcessingDObj.warehouseid_link', null);
                    viewModel.set('cutplanProcessingDObj.epc', null);
                    viewModel.set('cutplanProcessingDObj.met', null);
                    if (success) {
                        if (response.respcode == 200) {
                            console.log(response);
                            if(response.data.length == 0){
                                // Ext.toast('Không tìm thấy cây vải có số lot và cây này', 3000);
                                Ext.toast('Cây vải không tồn tại', 3000);
                                viewModel.set('cutplanProcessingDObj.lotnumber', lotnumber);
                                viewModel.set('cutplanProcessingDObj.packageid', null);

                            }else{
                                // tìm thấy cây vải, set thông tin cho các trường
                                // warehouseid_link, epc

                                var responseObj = response.data[0];
                                // kiểm tra status cây vải (2 == đã cắt)
                                if(responseObj.status == 2){
                                    Ext.toast('Cây vải đã cắt (status = 2)', 3000);
                                    return;
                                }
                                // kiểm tra cây vải đã có ở danh sách cutplan_processing_d chưa
                                var isExist = m.checkEpcExist(responseObj);
                                if(isExist){
                                    Ext.toast('Cây vải đã có trong danh sách', 3000);
                                    return;
                                }
                                // set gia tri
                                viewModel.set('cutplanProcessingDObj.warehouseid_link', responseObj.id);
                                viewModel.set('cutplanProcessingDObj.epc', responseObj.epc);
                                viewModel.set('cutplanProcessingDObj.met', responseObj.met);
                                
                            }
                        }else{
                            Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 3000);
                        }
                    } else {
                        
                        if(response.message == 'Cây vải không tồn tại'){
                            Ext.toast('Lỗi khi tìm cây vải: ' + response.message + ' ở tổ cắt', 3000);
                        }else{
                            Ext.toast('Lỗi khi tìm cây vải: ' + response.message, 3000);
                        }
                    }
            })        
        }
    },
    checkEpcExist: function(responseObj){
        var viewModel = this.getViewModel();
        var cutplanProcessing = viewModel.get('cutplanProcessing');
        var cutplanProcessingD = viewModel.get('cutplanProcessing.cutplanProcessingD');
        var epc = responseObj.epc;
        var id = responseObj.id;

        console.log(cutplanProcessing);
        console.log(epc);

        for(var i = 0; i < cutplanProcessingD.length; i++){
            if(cutplanProcessingD[i].warehouseid_link == id){
                // warehouseid_link
                return true;
            }
        }
        return false;
    },

    onBtnAdd: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var CutplanProcessingDStore = viewModel.getStore('CutplanProcessingDStore');
        var store = Ext.getCmp('CutplanProcessing_Edit_D').getStore();

        var cutplanProcessing = viewModel.get('cutplanProcessing');
        var cutplanProcessingD = viewModel.get('cutplanProcessing.cutplanProcessingD');

        // Nếu cây vải ko tồn tại hoặc đã nằm trong danh sách -> epc = null -> return
        if(viewModel.get('cutplanProcessingDObj.epc') == null){
            return;
        }

        var cutplanProcessingDObj = new Object();
        cutplanProcessingDObj.lotnumber = viewModel.get('cutplanProcessingDObj.lotnumber');
        cutplanProcessingDObj.packageid = viewModel.get('cutplanProcessingDObj.packageid');
        cutplanProcessingDObj.la_vai = viewModel.get('cutplanProcessingDObj.la_vai');
        cutplanProcessingDObj.tieu_hao = viewModel.get('cutplanProcessingDObj.tieu_hao');
        cutplanProcessingDObj.con_lai = viewModel.get('cutplanProcessingDObj.con_lai');
        cutplanProcessingDObj.ps = viewModel.get('cutplanProcessingDObj.ps');
        cutplanProcessingDObj.met = viewModel.get('cutplanProcessingDObj.met');
        cutplanProcessingDObj.warehouseid_link = viewModel.get('cutplanProcessingDObj.warehouseid_link');
        cutplanProcessingDObj.epc = viewModel.get('cutplanProcessingDObj.epc');

        if ( 
            viewModel.get('cutplanProcessingDObj.lotnumber') == null ||
            viewModel.get('cutplanProcessingDObj.lotnumber') == '') {
            me.down('#lotnumber').focus();
            return;
        }
        if (
            viewModel.get('cutplanProcessingDObj.packageid') == null ||
            viewModel.get('cutplanProcessingDObj.packageid') == '') {
            me.down('#packageid').focus();
            return;
        }
        if (
            viewModel.get('cutplanProcessingDObj.met') == null ||
            viewModel.get('cutplanProcessingDObj.met') == '') {
            me.down('#met').focus();
            return;
        }
        if (
            viewModel.get('cutplanProcessingDObj.la_vai') == null ||
            viewModel.get('cutplanProcessingDObj.la_vai') == '') {
            me.down('#la_vai').focus();
            return;
        }
        if (
            viewModel.get('cutplanProcessingDObj.tieu_hao') == null ||
            viewModel.get('cutplanProcessingDObj.tieu_hao') == '') {
            me.down('#tieu_hao').focus();
            return;
        }
        if (
            viewModel.get('cutplanProcessingDObj.con_lai') == null ||
            viewModel.get('cutplanProcessingDObj.con_lai') == '') {
            me.down('#con_lai').focus();
            return;
        }
        if (
            viewModel.get('cutplanProcessingDObj.ps') == null ||
            viewModel.get('cutplanProcessingDObj.ps') == '') {
            me.down('#ps').setValue(0);
            // return;
        }

        cutplanProcessingD.push(cutplanProcessingDObj);
        store.removeAll();
        store.insert(0, cutplanProcessingD);

        viewModel.set('cutplanProcessingDObj.lotnumber', '');
        viewModel.set('cutplanProcessingDObj.packageid', '');
        viewModel.set('cutplanProcessingDObj.la_vai', '');
        viewModel.set('cutplanProcessingDObj.tieu_hao', '');
        viewModel.set('cutplanProcessingDObj.con_lai', '');
        viewModel.set('cutplanProcessingDObj.ps', '');
        viewModel.set('cutplanProcessingDObj.met', '');
        viewModel.set('cutplanProcessingDObj', new Object());

        // console.log(cutplanProcessing);
        // console.log(cutplanProcessingD);
        // console.log(store);
    },
    onla_vai_change: function (sender, value, oldValue, eOpts) {
        var viewModel = this.getViewModel();
        var dai_so_do = viewModel.get('cutPlanRow.dai_so_do');
        var tieu_hao = value * dai_so_do;
        viewModel.set('cutplanProcessingDObj.tieu_hao', tieu_hao);
    },
    ondau_tam_change: function (sender, value, oldValue, eOpts) {
        var viewModel = this.getViewModel();
        var dai_cay = viewModel.get('cutplanProcessingDObj.met');
        var tieu_hao = viewModel.get('cutplanProcessingDObj.tieu_hao');
        var con_lai = dai_cay - tieu_hao;
        var PS = value - con_lai;
        viewModel.set('cutplanProcessingDObj.ps', PS);
    }
})