Ext.define('GSmartApp.store.sync.SyncTaskDetailStore', {
    extend: 'Ext.data.Store',
    storeId: 'SyncTaskDetailStore',
    alias: 'store.SyncTaskDetailStore',
    fields: [
        'id',
        'taskid_link',
        {
            name: 'start_time', type: 'date', format: 'c'
        },
        {
            name: 'finish_time', type: 'date', format: 'c'
        },
        'status',
        {
            name: 'status_name',
            calculate: function (data) {
                if (data.status == 0) {
                    return "Đang chạy"
                }
                else if (data.status == 1) {
                    return "Đã kết thúc";
                }
                else if (data.status == -1) {
                    return "Có lỗi";
                }
            }
        },
        {
            name: 'percent',
            calculate: function (data) {
                if (data.percent_done == null) return 0;
                return data.percent_done / 100;
            }
        },
        'percent_done',
        'jobid',
        {
            name: 'last_updated', type: 'date'
        }
    ],
    sorters: [{
        property: 'date_created',
        direction: 'DESC'
    }, {
        property: 'status',
        direction: 'ASC'
    }],
    loadtaskdetail_by_task: function (taskid_link) {
        var params = new Object();
        params.taskid_link = taskid_link;

        this.setProxy({
            type: 'ajax',
            //url: config.getBack() + 'menuperm',
            url: config.getAppBaseUrl_demo() + 'sync/getlist_taskdetail',
            actionMethods: {
                read: 'POST'
            },
            extraParams: params,
            paramsAsJson: true,
            noCache: false,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            timeout: 60000,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        });
        this.load();
    }
});