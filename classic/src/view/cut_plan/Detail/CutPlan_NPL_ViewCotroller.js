Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_NPL_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutPlan_NPL_ViewCotroller',
    init: function () {
        var viewmodel = this.getViewModel();
        
        
    },
    control: {
        '#btnHideNPL' : {
            click: 'onHideNPL'
        },
        '#CutPlan_NPL_View' :{
            itemclick : 'onSelectNPL'
        },
        '#btnAdd_CutPlan' : {
            click: 'onThemKeHoach'
        }
    },
    onHideNPL: function(){
        var viewmodel = this.getViewModel();
        var form = this.getView();
        form.collapse('left', 0);    

        viewmodel.set('isHiddenNPL', true);
    },
    onSelectNPL: function(grid, record, item, index, e, eOpts ){
        var viewmodel = this.getViewModel();
        viewmodel.set('npl', record.data);
    },
    onThemKeHoach: function(){
        var viewmodel = this.getViewModel();
        var npl = viewmodel.get('npl');

        if(npl.id == null) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn nguyên liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            
        }
    }
})