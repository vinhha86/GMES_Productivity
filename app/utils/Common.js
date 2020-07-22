Ext.define('GSmartApp.util.Common', {
    singleton: true,
    alternateClassName: [
        'common'
    ],
    Check_Role_Function: function () {
        var data = GSmartApp.util.State.get('session');
        var list_function = data.list_function;

        for (var i = 0; i < list_function.length; i++) {
            var func = list_function[i];
            var item = Ext.getCmp(func.function_id_item);
            if(item!=null)
                item.setDisabled(func.isreadonly);
        }
    }
})