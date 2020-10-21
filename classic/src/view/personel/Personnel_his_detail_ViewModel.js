Ext.define('GSmartApp.view.personel.Personnel_his_detail_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Personnel_his_detail_ViewModel',
    requires: ['GSmartApp.store.Position.PositionStore', 'GSmartApp.store.Labor.LaborStore',
        'GSmartApp.store.org.ListOrgStore'],
    stores: {
        PositionStore: {
            type: 'PositionStore'
        },
        LaborStore: {
            type: 'LaborStore'
        },
        OrgStore: {
            type: 'ListOrgStore'
        }
    },
    data: {
        his: {
            type: 0,
            personnelid_link: 0
        },
        orgmanagerid_link: 0
    },
    formulas: {
        title: function (get) {
            var name = "", type = "";
            if (get('his').id == null) name = "Thêm mới ";
            else name = "Cập nhật ";

            if (get('his').type == 1)
                type = "chức vụ";
            else if (get('his').type == 2)
                type = 'cấp bậc';
            else
                type = 'phòng ban';

            return name + type;
        }
    }
})