Ext.define('GSmartApp.view.TimeSheetInOut.TimeSheetInOutViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetInOutViewController',
    init: function (view) {
        var viewmodel = view.getViewModel();
        //gán giá trị mặc định cho lọc từ ngày - đến ngày
        var fromdate = new Date();
        viewmodel.set('timesheetinout.fromdate', fromdate);
        var todate = new Date(fromdate.getFullYear(), fromdate.getMonth() - 1, fromdate.getDate());
        viewmodel.set('timesheetinout.todate', todate);

        var TimeSheetInoutStore = viewmodel.getStore('TimeSheetInoutStore');
        TimeSheetInoutStore.loadStore(viewmodel.get('timesheetinout.todate'), viewmodel.get('timesheetinout.fromdate'));
    },
    control: {
        "#onToDate": {
            change: 'onToDate'
        },
        '#btnSearch': {
            click: 'onSearch'
        }
    },
    onToDate: function (datefield, newValue, oldValue, eOpts) {
        console.log(newValue);
    },
    onSearch: function () {
        var viewmodel = this.getViewModel();

        //từ ngày
        var to_hour = new Date(viewmodel.get('timesheetinout.to_hour'));
        var tohour = to_hour.getHours();
        var tominute = to_hour.getMinutes();
        var todate = new Date(viewmodel.get('timesheetinout.todate'));
        
         //giờ - từ ngày để trống 
        if(to_hour.getFullYear() == 1970){
            tohour ="00";
            tominute="00"
        }
        var todate_hour = todate.toDateString() + " " + tohour + ":" + tominute;
        var dateto = new Date(todate_hour);


        //đến ngày
        var from_hour = new Date(viewmodel.get('timesheetinout.from_hour'));
        var fromhour = from_hour.getHours();
        var fromminute = from_hour.getMinutes();
        var fromdate = new Date(viewmodel.get('timesheetinout.fromdate'));

         //giờ - đến ngày để trống 
         if(from_hour.getFullYear() == 1970){
            fromhour = "00";
            fromminute = "00"
        }
        var fromdate_hour = fromdate.toDateString() + " " + fromhour + ":" + fromminute;
        var datefrom = new Date(fromdate_hour);

        var number_space = (datefrom - dateto) / 1000 / 60 / 60 / 24;
       
        //kiểm tra "đến ngày " không được nhỏ hơn "từ ngày"
        if (number_space < 0) {
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
        //nếu khoảng thời gia tìm kiếm quá 1 tháng thì thông báo lỗi - chỉ được tìm kiếm trong khoảng 1 tháng
        if (number_space > 32) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Thời gian tìm kiếm chỉ trong 1 tháng!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        var TimeSheetInoutStore = viewmodel.getStore('TimeSheetInoutStore');
        TimeSheetInoutStore.loadStore(dateto, datefrom);
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