Ext.define('GSmartApp.view.salary.Salary_Def_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_Def_Main_Controller',
    control: {
        '#tabmain': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        var SalTypeLaborLevelStore = viewmodel.getStore('SalTypeLaborLevelStore');
        SalTypeLaborLevelStore.removeAll();
        console.log(SalTypeLaborLevelStore);
    }
})