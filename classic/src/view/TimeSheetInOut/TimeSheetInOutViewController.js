Ext.define('GSmartApp.view.TimeSheetInOut.TimeSheetInOutViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetInOutViewController',
    init: function (view) {
        var viewmodel = view.getViewModel();
        //gán giá trị mặc định cho lọc từ ngày - đến ngày
        var fromdate = new Date();
        viewmodel.set('timesheetinout.fromdate', fromdate);
        var todate = new Date(fromdate.getFullYear(),fromdate.getMonth()-1,fromdate.getDate());
        viewmodel.set('timesheetinout.todate', todate);

          var TimeSheetInoutStore =viewmodel.getStore('TimeSheetInoutStore');
          TimeSheetInoutStore.loadStore(viewmodel.get('timesheetinout.todate'),viewmodel.get('timesheetinout.fromdate'));
    },
    control:{
        "#onToDate":{
            change:'onToDate'
        },
        '#btnSearch':{
            click:'onSearch'
        }
    },
    onToDate:function(datefield,newValue, oldValue, eOpts){
        console.log(newValue);
    },
    onSearch:function(){
        var viewmodel = this.getViewModel();
        var todate = new Date(viewmodel.get('timesheetinout.todate'));
        var fromdate = new Date(viewmodel.get('timesheetinout.fromdate'));
        var number_space = (fromdate - todate)/1000/60/60/24;
        if(number_space<0){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Thời gian tìm kiếm không hợp lệ !',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        console.log(fromdate);
        console.log(todate);
        if(number_space>32){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Thời gian tìm kiếm quá 1 tháng!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        var TimeSheetInoutStore =viewmodel.getStore('TimeSheetInoutStore');
        TimeSheetInoutStore.loadStore(todate,fromdate);
    },
     //lọc - filter
     onCodeFilter: function () {
        let filterField = this.lookupReference('CodeFilter'),
            filters = this.getView().store.getFilters();

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
    onNameFilter: function () {
        let filterField = this.lookupReference('NameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
})