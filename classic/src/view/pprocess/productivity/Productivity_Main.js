Ext.define('GSmartApp.view.pprocess.Productivity_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Productivity_Main',
    itemId:'Productivity_Main',
    viewModel:{
        type:'Productivity_Model'
    },
    layout: 'border',
    items: [
        {
            region: 'north',
            height: 35,
            items:[
                {
                    xtype: 'radiogroup',
                    // fieldLabel: 'Auto Layout',
                    flex: 1,
                    cls: 'x-check-group-alt',
                    name: 'rb-auto',
                    items: [
                        { boxLabel: 'Ca 1 ', inputValue: 1, checked: true, margin: 5},
                        { boxLabel: 'Ca 2 ', inputValue: 2, margin: 5},
                        { boxLabel: 'Ca 3 ', inputValue: 3, margin: 5}
                    ]
                }
            ]
        },
        {
            region: 'center',
            layout: 'border',
            items:[
                {
                    region: 'west',
                    width: 200,
                    title: 'Danh sách công nhân',
                    xtype: 'panel',
                    border: true,
                    margin: 1
                
                }, 
                {
                    region: 'center',
                    title: 'Năng suất công đoạn',
                    xtype: 'panel',
                    border: true,
                    margin: 1
                }
            ]
        }

    ]
})