Ext.define('GSmartApp.view.org.ListOrgViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ListOrgViewModel',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore', 'GSmartApp.store.OrgTypeStore','GSmartApp.store.ColorStore'],
    stores: {
        MenuStore: {
            type: 'ListOrgMenuTreeStore'
        },
        OrgTypeStore: {
            type: 'orgtypestore'
        },
        ColorStore: {
            type: 'ColorStore'
        }
    },
    data: {
        id: 0,
        parentid_link: null,
        name: '',
        currentRec:null,
        fieldState: false
    },
    formulas: {
        title: function (get) {
            if (get('id') == 0 && get('parentid_link') == null) {
                return 'Chi tiết đơn vị';
            }else if(get('id') == 0 && get('parentid_link') != null){
                return 'Thêm mới đơn vị trực thuộc \'' + this.get('name') + '\'';
            }
            else {
                return this.get('name');
            }
        },
        btnThemState: function(get){
            if (get('id')==0){
                return 1;
            }else{
                return null;
            }
        }
    }
})