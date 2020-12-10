Ext.define('GSmartApp.view.Schedule.Plan.FilterFieldPorder', {
    extend : 'Ext.form.TextField',
    xtype  : 'FilterFieldPorder',

    enableKeyEvents : true,
    store    : null,
    property : '',

    initComponent : function () {
        this.callParent(arguments);
    },

    triggers : {
        clear : {
            cls     : 'fa-times',
            handler : function () {
                this.doHighlight('');
                this.setValue('');
            },
            scope   : 'this'
        }
    },

    onKeyUp : function (e) {
        var value = this.getValue();

        this.doHighlight(value);
    },

    doHighlight : function (value) {
        var store = this.store;
        if (!value) {
            store.clearFilter();
            // store.each(function(task) {
            //     task.set('Cls', task.get('cls'));
            // })
        } else {
            store.each(function(task) {
                if(task.get('productbuyercode') != null){
                    if (task.get('productbuyercode').indexOf(value) >= 0) {
                        task.set('Cls', task.get('cls')+ ' match');
                        Ext.getCmp('treeplan').getSchedulingView().scrollEventIntoView(task, true, true);
                        Ext.getCmp('treeplan').getEventSelectionModel().select(task);
                    } else {
                        task.set('Cls', task.get('cls'));
                    }
                }
            });
        }

        Ext.getCmp('treeplan')[value.length > 0 ? 'addCls' : 'removeCls']('highlighting');
    },

    listeners : {
        keyup  : 'onKeyUp',
        buffer : 200
    }

});