Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_Main_Controller',
    init: function() {
        var me = this.getView();
        var viewModel = this.getViewModel();

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
        priorDate = new Date(priorDate);
        viewModel.set('fromDate', priorDate);
        viewModel.set('toDate', today);
		// me.down('#fromDate').setValue(new Date(priorDate));
        this.loadData();
    },
    control: {
        '#btnThem': {
            click: 'onBtnThemTap'
        },
        '#btnTimKiem': {
            click: 'onBtnTimKiemTap'
        },
        '#CutplanProcessing_List': {
            select: 'onCutplanProcessingSelect',
            itemdblclick: 'onCutplanProcessingItemDblCLick'
        },
    },
    onDelete(grid, rowIndex, colIndex, item, e, record){
        var m = this;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    m.Delete(grid, rowIndex, record);
                }
            }
        });
    },
    Delete:function(grid, rowIndex, record){
        var id = record.data.id;

        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/cutplan_processing/cutplan_processing_delete', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if(success){
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xoá thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store = grid.getStore();
                        store.removeAt(rowIndex);
                    }else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xoá thất bại: ' + response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }else{
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Xoá thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onCutplanProcessingItemEditClick: function (grid, rowIndex, colIndex, item, e, record) {
        var id = record.data.id;
        this.redirectTo("cutplan_processing/" + id + "/edit");
    },
    onCutplanProcessingItemDblCLick: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("cutplan_processing/" + id + "/edit");
    },
    onBtnThemTap: function (){
        var viewModel = this.getViewModel();
        this.redirectTo('cutplan_processing/0/edit');
    },
    onBtnTimKiemTap: function(){
        this.loadData();
    },
    loadData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var fromDate = viewModel.get('fromDate');
        var toDate = viewModel.get('toDate');

        var CutplanProcessingStore = viewModel.getStore('CutplanProcessingStore');
        CutplanProcessingStore.loadStore(fromDate, toDate, 100, 1);

        var CutplanProcessingDStore = viewModel.getStore('CutplanProcessingDStore');
        if(null!=CutplanProcessingDStore) CutplanProcessingDStore.removeAll();
    },
    onBtnThemTap: function ( btn, e, eOpts ){
        var viewModel = this.getViewModel();
        this.redirectTo('cutplan_processing/0/edit');
    },
    onCutplanProcessingSelect: function(e, selected, eOpts) {
        var viewModel = this.getViewModel();
        var CutplanProcessingDStore = viewModel.getStore('CutplanProcessingDStore');
        CutplanProcessingDStore.setData(selected.data.cutplanProcessingD);
        console.log(selected.data.cutplanProcessingD);
    },

    onCutplanProcessing_pordercodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('cutplanProcessing_pordercodeFilter'),
            store = this.getViewModel().getStore('CutplanProcessingStore'),
            filters = store.getFilters();

        if (filterField.value) {
            this.cutplanProcessing_pordercodeFilter = filters.add({
                id: 'cutplanProcessing_pordercodeFilter',
                property: 'pordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.cutplanProcessing_pordercodeFilter) {
            filters.remove(this.cutplanProcessing_pordercodeFilter);
            this.cutplanProcessing_pordercodeFilter = null;
        }
    },
    onCutplanProcessing_maSPFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('cutplanProcessing_maSPFilter'),
            store = this.getViewModel().getStore('CutplanProcessingStore'),
            filters = store.getFilters();

        if (filterField.value) {
            this.cutplanProcessing_maSPFilter = filters.add({
                id: 'cutplanProcessing_maSPFilter',
                property: 'maSP',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.cutplanProcessing_maSPFilter) {
            filters.remove(this.cutplanProcessing_maSPFilter);
            this.cutplanProcessing_maSPFilter = null;
        }
    },
});
