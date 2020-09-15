Ext.define('GSmartApp.view.pcontract.PContract_POrder_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_POrder_Detail',
    id: 'PContract_POrder_Detail',
    itemId: 'PContract_POrder_Detail',
    controller: 'PContract_POrder_Detail_Controller',

    layout: 'border',
    items: [
        {
            region: 'north',
            height: 75,
            border: true,
            xtype: 'panel',
            padding: 1,
            layout: 'vbox',
            items:[
                {
                    xtype: 'panel',
                    margin: 2,
                    width: '100%',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textfield',
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;font-weight:bold;text-align:right;background-color:azure',                            
                            fieldLabel: "Mã lệnh",
                            bind: {
                                value: '{porder_selected.ordercode}'
                            },
                            labelWidth: 80,
                            width: '50%',
                        },
                        {
                            xtype: 'textfield',
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;text-align:right;background-color:azure',                            
                            fieldLabel: "Trạng thái",
                            bind: {
                                value: '{porder_selected.statusName}'
                            },
                            labelWidth: 80,
                            width: '50%',
                        },                
                    ]      
                },
                {
                    xtype: 'panel',
                    margin: 2,
                    width: '100%',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'datefield',
                            hideTrigger: true,
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;text-align:right;background-color:azure',
                            fieldLabel: "Ngày VC",
                            bind: {
                                value: '{porder_selected.productiondate}'
                            },
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            labelWidth: 80,
                            width: '50%',
                        },                        
                        {
                            xtype: 'datefield',
                            hideTrigger: true,
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;text-align:right;background-color:azure',
                            fieldLabel: "Ngày giao",
                            bind: {
                                value: '{porder_selected.shipdate}'
                            },
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            labelWidth: 80,
                            width: '50%',
                        }                    
                    ]                        
                }
            ]
        },
        {
            region: 'center',
            border: true,
            // title: 'Yêu cầu sản xuất',
            xtype: 'PContract_POrder_Edit_PorderSKU',
            padding: 1,
            // width: '25%',       
        },
        {
            region: 'south',
            layout:'hbox',
            items:[
                {
                    xtype: 'button',
                    itemId: 'btnAddSKU',
                    text: 'Thêm SKU',
                    margin: 1,
                    iconCls: 'x-fa fa-plus'
                },
                {
                    xtype: 'button',
                    itemId: 'btnDeletePorder',
                    text: 'Xóa lệnh',
                    margin: 1,
                    iconCls: 'x-fa fa-trash'
                }            
            ]
        }
    ]
})