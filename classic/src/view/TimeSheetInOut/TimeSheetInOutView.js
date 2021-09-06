Ext.define('GSmartApp.view.TimeSheetInOut.TimeSheetInOutView', {
    extend: 'Ext.grid.Panel',
    xtype: 'TimeSheetInOutView',

    viewModel:{
        type:'TimeSheetInOutViewModel'
    },
    bind:'{TimeSheetInoutStore}',
    controller:'TimeSheetInOutViewController',
    columns:[
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text:"Mã nhân viên",
            flex:1,
            dataIndex:'code',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'CodeFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onCodeFilter',
                    buffer: 500
                }
            },
        },
        {
            text:"Tên nhân viên",
            flex:1,
            dataIndex:'name',
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'NameFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onNameFilter',
                    buffer: 500
                }
            },
        },
        {
            text:"Giờ làm",
            flex:1,
            dataIndex:'hour'
        },
    ],
    dockedItems:[
        {
            layout:'hbox',
            dock:'top',
            items:[
                {
                    xtype:'datefield',
                    labelWidth:65,
                    fieldLabel:'Từ ngày',
                    format: 'd/m/Y',
                    margin:5,
                    itemId:'onToDate',
                    bind:{
                        value: '{timesheetinout.todate}',
                    },
                },
                {
                    xtype:'datefield',
                    labelWidth:65,
                    fieldLabel:'Đến ngày',
                   // value: new Date(),
                    format: 'd/m/Y',
                    itemId:'onFromDate',
                    bind:{
                        value: '{timesheetinout.fromdate}',
                    },
                    margin:5
                },
                {
                    xtype:'button',
                    text:'Tìm kiếm',
                    iconCls:'x-fa fa-filter',
                    format: 'd/m/Y',
                    itemId:'btnSearch',
                    margin:5
                }
            ]
        }
    ]
})