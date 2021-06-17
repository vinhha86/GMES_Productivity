Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit.CutplanProcessing_Edit_D_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.CutplanProcessing_Edit_D_Controller',
	channel: { cmd: null, dta: null },
	init: function () {

	},
	control: {
		'#lotnumber': {
			change: 'onlotnumberTxtType'
		},
		'#packageid': {
			focusleave: 'onlotnumberTxtAndpackageidTxtleave',
		},
        '#la_vai': {
            change : 'onla_vai_change'
        },
        '#con_lai': {
            change : 'ondau_tam_change'
        },
        '#btnAddCutplanProcessingD': {
            click: 'onBtnAddCutplanProcessingD'
        },
	},
	onlotnumberTxtType: function(field, newValue, oldValue, eOpts){
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
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
			Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần chọn mã vải',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
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

            me.setLoading(true);

            var params = new Object();
            // params.stockoutorderdid_link = stockoutorderdid_link;
            params.skuid_link = skuid_link;
            params.lotnumber = lotnumber;
            params.packageid = packageid;

            GSmartApp.Ajax.postJitin('/api/v1/warehouse/getByLotAndPackageIdForStockout', Ext.JSON.encode(params),
                function (success, response, options) {
                    // me.setLoading(false);
                    me.setLoading(false);
                    var response = Ext.decode(response.responseText);
                    viewModel.set('warehouseObj', null);
                    viewModel.set('cutplanProcessingDObj.warehouseid_link', null);
                    viewModel.set('cutplanProcessingDObj.epc', null);
                    viewModel.set('cutplanProcessingDObj.met', null);
                    if (success) {
                        if (response.respcode == 200) {
                            console.log(response);
                            if(response.data.length == 0){
								Ext.Msg.show({
									title: 'Thông báo',
									msg: 'Cây vải không tồn tại',
									buttons: Ext.MessageBox.YES,
									buttonText: {
										yes: 'Đóng',
									}
								});
                                viewModel.set('cutplanProcessingDObj.lotnumber', lotnumber);
                                viewModel.set('cutplanProcessingDObj.packageid', null);

                            }else{
                                // tìm thấy cây vải, set thông tin cho các trường
                                // warehouseid_link, epc

                                var responseObj = response.data[0];
                                // kiểm tra status cây vải (2 == đã cắt)
                                if(responseObj.status == 2){
									Ext.Msg.show({
										title: 'Thông báo',
										msg: 'Cây vải đã cắt (status = 2)',
										buttons: Ext.MessageBox.YES,
										buttonText: {
											yes: 'Đóng',
										}
									});
                                    return;
                                }
                                // kiểm tra cây vải đã có ở danh sách cutplan_processing_d chưa
                                var isExist = m.checkEpcExist(responseObj);
                                if(isExist){
									Ext.Msg.show({
										title: 'Thông báo',
										msg: 'Cây vải đã có trong danh sách',
										buttons: Ext.MessageBox.YES,
										buttonText: {
											yes: 'Đóng',
										}
									});
                                    return;
                                }
                                // set gia tri
                    			viewModel.set('warehouseObj', responseObj);
                                viewModel.set('cutplanProcessingDObj.warehouseid_link', responseObj.id);
                                viewModel.set('cutplanProcessingDObj.epc', responseObj.epc);
                                viewModel.set('cutplanProcessingDObj.met', responseObj.met);
                                
                            }
                        }else{
							Ext.Msg.show({
								title: 'Thông báo',
								msg: 'Lỗi khi tìm cây vải: ' + response.message,
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
							return;
                        }
                    } else {
                        
                        if(response.message == 'Cây vải không tồn tại'){
							Ext.Msg.show({
								title: 'Thông báo',
								msg: 'Lỗi khi tìm cây vải: ' + response.message + ' ở tổ cắt',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
                        }else{
							Ext.Msg.show({
								title: 'Thông báo',
								msg: 'Lỗi khi tìm cây vải',
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
                        }
						return;
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

        for(var i = 0; i < cutplanProcessingD.length; i++){
            if(cutplanProcessingD[i].warehouseid_link == id){
                // warehouseid_link
                return true;
            }
        }
        return false;
    },

    onla_vai_change: function (sender, value, oldValue, eOpts) {
        var viewModel = this.getViewModel();
        var dai_so_do = viewModel.get('cutPlanRow.dai_so_do'); // Dài bàn

		if(dai_so_do != null && value != null){
			var tieu_hao = value * dai_so_do;
			tieu_hao = tieu_hao.toFixed(2); // 2 decimal
			viewModel.set('cutplanProcessingDObj.tieu_hao', tieu_hao);
		}
    },
    ondau_tam_change: function (sender, value, oldValue, eOpts) {
        var viewModel = this.getViewModel();
        var dai_cay = viewModel.get('cutplanProcessingDObj.met'); // Dài cây
        var tieu_hao = viewModel.get('cutplanProcessingDObj.tieu_hao'); // tiêu hao

		if(dai_cay != null && tieu_hao != null && value != null){
			var con_lai = dai_cay - tieu_hao;
			var ps = value - con_lai;
			ps = ps.toFixed(2);  // 2 decimal
			viewModel.set('cutplanProcessingDObj.ps', ps);
		}
    },

	onBtnAddCutplanProcessingD: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('CutplanProcessingDStore');
        // var store = Ext.getCmp('CutplanProcessing_Edit_D').getStore();

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

		var warehouseObj = viewModel.get('warehouseObj');
		cutplanProcessingDObj.skucode = warehouseObj.skucode;
		cutplanProcessingDObj.skuname = warehouseObj.skuname;

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

        viewModel.set('cutplanProcessingDObj.lotnumber', null);
        viewModel.set('cutplanProcessingDObj.packageid', null);
        viewModel.set('cutplanProcessingDObj.la_vai', null);
        viewModel.set('cutplanProcessingDObj.tieu_hao', null);
        viewModel.set('cutplanProcessingDObj.con_lai', null);
        viewModel.set('cutplanProcessingDObj.ps', null);
        viewModel.set('cutplanProcessingDObj.met', null)
		viewModel.set('cutplanProcessingDObj.warehouseid_link', null);
		viewModel.set('cutplanProcessingDObj.epc', null);
        viewModel.set('cutplanProcessingDObj', new Object());

        // console.log(cutplanProcessing);
        // console.log(cutplanProcessingD);
        // console.log(store);
    },
})