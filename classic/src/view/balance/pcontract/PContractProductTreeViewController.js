Ext.define('GSmartApp.view.balance.PContractProductTreeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProductTreeViewController',
    init: function () {
    },
    control: {
        '#PContractProductTreeView': {
            itemclick: 'onItemclick'
        }
    },

    onItemclick: function(grid, record, item, index, e, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var PContract_PO = viewModel.getStore('PContract_PO');
        var PContract = viewModel.get('PContract');
        var pcontractid_link = PContract.id;
        
        var parent_id = record.get('parent_id')
        var children = record.get('children')
        var isSpBo = false;
        if(parent_id == 0){
            // sp don hoac sp bo
            if(children.length == 0){
                // sp don
                isSpBo = false;
            }else{
                // sp bo
                isSpBo = true;
            }
        }else{
            // sp don nam trong sp bo
            isSpBo = true;
        }
        
        var pcontract_product_id = record.get('pcontract_product_id');
        if(pcontract_product_id == null){
            pcontract_product_id = record.get('productid_link');
        }
        var obj = new Object();
        obj.pcontract_product_id = pcontract_product_id;
        obj.pcontractid_link = pcontractid_link;
        obj.isSpBo = isSpBo;

        PContract_PO.loadPolineByPcontractProduct_async(obj);
        PContract_PO.load({
			scope: PContract_PO,
			callback: function(records, operation, success) {
				if(!success){
				} else {
                    //set gia tri cho combo thang (poline)
                    // console.log(records);
                    var monthArr = new Array();
                    for(var i=0;i<records.length;i++){
                        var shipmonth = records[i].get('shipmonth');
                        if(shipmonth != null && !monthArr.includes(shipmonth)){
                            monthArr.push(shipmonth);
                        }
                    }
                    monthArr.sort();
                    for(var i=0;i<monthArr.length;i++){
                        var monthYearArr = monthArr[i].split('/');
                        var monthYear = monthYearArr[1] + '/' + monthYearArr[0];
                        monthArr[i] = monthYear;
                    }
                    monthArr.unshift('Tất cả');
                    viewModel.set('monthBalanceArray', monthArr);
                    // console.log(monthArr);
				}
			}
        });
    },
    onStyleCodeFilterKeyup: function () {
        var viewModel = this.getViewModel();
        var filterField = this.lookupReference('styleCodeFilter');
        store = viewModel.getStore('PContractProductTreeStoreBalance'),
            filters = store.getFilters();

        store.filterer = 'bottomup';
        store.getRoot().expandChildren(true);

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onCalBalance_ManyProduct: function () {
        var me = this.getView();
        var select = me.getSelectionModel().getSelection();
        var viewModel = this.getViewModel();
        var SKUBalanceStore = viewModel.getStore('SKUBalanceStore');

        //Nếu không chọn NPL --> Chỉ cho tính riêng từng mã hàng
        if (viewModel.get('Balance.p_selection_mode') == 'SINGLE' && select.length > 1){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Nếu không chọn Nguyên phụ liệu, bạn chỉ được chọn 1 mã hàng để tính cân đối',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }

        // lấy danh sách poline, nếu có, type string poline1, poline2...
        var ls_po = '';
        var PContractView = Ext.getCmp('PContractView');
        if(PContractView){
            var PContractProduct_PoLineView = PContractView.down('#PContractProduct_PoLineView');
            if(PContractProduct_PoLineView){
                var selectPoLine = PContractProduct_PoLineView.getSelectionModel().getSelection();
                for(var i=0; i<selectPoLine.length; i++){
                    if(ls_po == ''){
                        ls_po+=selectPoLine[i].get('id');
                    }else{
                        ls_po+=';'+selectPoLine[i].get('id');
                    }
                }
            }
        }

        // console.log(selectPoLine);
        // console.log(ls_po);
        // return;

        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.pcontract_poid_link = null;
        params.materialid_link =viewModel.get('Balance.materialid_link');
        params.ls_po = ls_po;
        if (params.materialid_link < 0) params.materialid_link = null;

        var list_id_product = '';
        for (k=0;k<select.length;k++){
            p_select = select[k];
            if (p_select.get('children').length > 0) {
                for (var i = 0; i < p_select.get('children').length; i++) {
                    var data = p_select.get('children')[i];
                    if (i == 0) {
                        list_id_product = data.productid_link;
                    }
                    else {
                        list_id_product += data.productid_link + ";";
                    }
                }
            }
            else {
                list_id_product +=  p_select.get('productid_link') + ";";
            }
        }
        // console.log(list_id_product);
        params.list_productid = list_id_product;

        me.setLoading("Đang tính cân đối");
        if (null != params.pcontract_poid_link && 0 != params.pcontract_poid_link) {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bypo', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            SKUBalanceStore.setData(response.data);
                        }
                    }
                })
        } else {
            GSmartApp.Ajax.post('/api/v1/balance/cal_balance_bycontract', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            SKUBalanceStore.setData(response.data);
                        }
                    }
                })
        }
    }
})