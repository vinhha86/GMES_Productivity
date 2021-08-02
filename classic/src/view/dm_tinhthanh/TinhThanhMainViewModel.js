Ext.define('GSmartApp.view.dm_tinhthanh.TinhThanhMainViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.TinhThanhMainViewModel',
    
    requires:['GSmartApp.store.org.ListOrgStore'],

    stores:{
        org_store:{
            type:'ListOrgStore'
        }
    },

    data:{
        Tinh:{
            name:'',
            code:'',
            id: null
        },
        Huyen:{
            name:'',
            code:''
        },
        old:''
    },
    formulas: {
        showTitle_Huyen: function (get) {
            if (get('Tinh.name') == "" || get('Tinh.name') == null) {
                return 'Danh sách quận huyện'
            }else{
                return get('Tinh.name')
            }
        },
        showTitle_Xa: function (get) {
            if (get('Huyen.name') == "" || get('Huyen.name') == null) {
                return 'Danh sách xã phường'
            }else{
                return get('Huyen.name')
            }
        }
    }
})