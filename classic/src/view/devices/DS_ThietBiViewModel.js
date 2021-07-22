Ext.define('GSmartApp.view.devices.DS_ThietBiViewModel',{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.DS_ThietBiViewModel',
    requires: ['GSmartApp.store.DeviceInvStore','GSmartApp.store.device.devices_type_store','GSmartApp.store.DeviceGroupStore','GSmartApp.store.org.ListOrgStore','GSmartApp.store.DeviceTreeStore'],

    stores:{
        ds_thietbi_store : {
            type:'DeviceInvStore'
        },
        loai_thietbi_store:{
            type:'devices_type_store'
        },
        nhom_thietbi_store:{
            type:'devicegroupstore'
        },
        ds_cuahang_kho_store:{
            type:'ListOrgStore'
        },
        ds_search:{
            type:'devicetreestore'
        }
    },
    data:{
        thongtin_chitiet:{
            id:'',
            devicegroupid_link:'',
            code:'',
            name:'',
            type:'',
            org_governid_link:''
        },
        timkiem:{
            org_governid_link:'',
            name_code:''
        }
    }
   
})