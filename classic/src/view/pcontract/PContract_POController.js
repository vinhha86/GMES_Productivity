Ext.define('GSmartApp.view.pcontract.PContract_POController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POController',
    onFactoriesTap: function(){
        var panel_factories = this.getView().items.get('panel_factories');
        console.log(panel_factories);
        if (null != panel_factories){
            if (panel_factories.getHidden())
            panel_factories.setHidden(false);
            else
            panel_factories.setHidden(true);
        }
    },
    onAddPOTap: function(){
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Kế hoạch giao hàng',
            closeAction: 'destroy',
            height: 650,
            width: 1200,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_PO_Edit',
                viewModel: {
                    data: {
                        plan: {
                            plan_type: type,
                            porderid_link: data.porderid_link,
                            id: id,
                            plan_date_start: time,
                            plan_date_end: new Date(time.getFullYear(), time.getMonth(), time.getDate() + 1)
                        },
                        parentId: data.id
                    }
                }
            }]
        });
        form.show();
    }
});

