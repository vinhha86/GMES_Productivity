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
        titleName: '',
        currentRec:null,
        isDisplayInactive: false,
        // Form
        code: null,
        name: null,
        city: null,
        address: null,
        contactperson: null,
        email: null,
        phone: null,
        linecost: null,
        orgtypeid_link: null,
        colorid_link: null,
        status: null,
        //
        fieldState: false
    },
    formulas: {
        title: function (get) {
            if (get('id') == 0 && get('parentid_link') == null) {
                return 'Chi tiết đơn vị';
            }else if(get('id') == 0 && get('parentid_link') != null){
                return 'Thêm mới đơn vị trực thuộc \'' + this.get('titleName') + '\'';
            }
            else {
                return this.get('titleName');
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