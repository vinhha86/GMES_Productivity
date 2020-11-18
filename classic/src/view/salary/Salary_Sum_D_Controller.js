Ext.define('GSmartApp.view.salary.Salary_Sum_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_Sum_D_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('year',Ext.Date.format(new Date(), 'Y'));
    },
    control: {
        '#tabmain': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {

    },
    onCal_SalTable: function(){
        var viewmodel = this.getViewModel();
        // console.log(viewmodel.get('month') + "/" + viewmodel.get('year'));
        // console.log(viewmodel.get('selected_orgid'));
        if (null == viewmodel.get('month')){
            Ext.MessageBox.show({
                title: "Bảng lương",
                msg: 'Tháng tính lương không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        if (null == viewmodel.get('year')){
            Ext.MessageBox.show({
                title: "Bảng lương",
                msg: 'Năm tính lương không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        if (null == viewmodel.get('selected_orgid')){
            Ext.MessageBox.show({
                title: "Bảng lương",
                msg: 'Phải chọn đơn vị trước khi tính lương',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        var SalarySumStore = viewmodel.get('SalarySumStore');
        SalarySumStore.loadStore(viewmodel.get('selected_orgid'),viewmodel.get('year'),viewmodel.get('month'));     
    }
})