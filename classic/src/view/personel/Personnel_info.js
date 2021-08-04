Ext.define('GSmartApp.view.personel.Personnel_info', {
    extend: 'Ext.form.Panel',
    xtype: 'Personnel_info',
    id: 'Personnel_info',
    controller: 'Personnel_info_ViewController',
    layout: 'hbox',
    items: [{
        layout: 'vbox',
        items: [{
            layout: 'hbox',
            items: [{
                layout: 'vbox',
                items: [{
                    xtype: 'textfield',
                    itemId: 'code',
                    labelWidth: 78,
                    fieldLabel: 'Mã NV:',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.code}'
                    }
                }, {
                    xtype: 'textfield',
                    labelWidth: 78,
                    fieldLabel: 'Họ và tên',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.fullname}'
                    }
                }, {
                    xtype: 'datefield',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    itemId:'NgaySinh',
                    fieldLabel: 'Ngày sinh:',
                    labelAlign: 'left',
                    labelWidth: 78,
                    flex: 1,
                    margin: 1,
                    format: 'd/m/Y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    bind: {
                        value: '{personnel.birthdate}'
                    }
                }, {
                    xtype: 'combo',
                    labelWidth: 78,
                    fieldLabel: 'Giới tính',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    displayField: 'name',
                    valueField: 'id',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.gender}',
                        store: '{GenderStore}'
                    }
                },{
                    xtype: 'textfield',
                    labelWidth: 78,
                    fieldLabel: 'Email:',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    flex: 1,
                    margin: 1,
                    vtype: 'email',
                    bind: {
                        value: '{personnel.email}'
                    }
                }
            ]
            }, {
                layout: 'vbox',
                items: [
                    {
                        xtype: 'textfield',
                        labelWidth: 78,
                        fieldLabel: 'Điện thoại',
                        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                        fieldStyle: 'font-size:11px;',
                        flex: 1,
                        margin: 1,
                        maskRe: /[0-9]/,
                        bind: {
                            value: '{personnel.tel}'
                        }
                    },{
                        xtype: 'numberfield',
                        labelWidth: 78,
                        fieldLabel: 'Tuổi:',
                        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                        fieldStyle: 'font-size:11px;',
                        flex: 1,
                        margin: 1,
                        readOnly:true,
                        bind: {
                            value: '{personnel.age}'
                        }
                    },{
                        xtype: 'textfield',
                        labelWidth: 78,
                        fieldLabel: 'Số CMT:',
                        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                        fieldStyle: 'font-size:11px;',
                        flex: 1,
                        margin: 1,
                        bind: {
                            value: '{personnel.idnumber}'
                        }
                    }, {
                        xtype: 'datefield',
                        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                        fieldStyle: 'font-size:11px;',
                        fieldLabel: 'Ngày cấp CMT:',
                        labelAlign: 'left',
                        labelWidth: 78,
                        itemId: 'NgaySinh',
                        flex: 1,
                        margin: 1,
                        format: 'd/m/Y',
                        altFormats: "Y-m-d\\TH:i:s.uO",
                        bind: {
                            value: '{personnel.dateof_idnumber}'
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Nơi cấp :',
                        labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                        fieldStyle: 'font-size:11px;',
                        labelAlign: 'left',
                        labelWidth: 78,
                        flex: 1,
                        margin: 1,
                        bind: {
                            value: '{personnel.place_idnumber}'
                        }
                    }
            ]
            }, {
                layout: 'vbox',
                items: [{
                    xtype: 'combo',
                    itemId: 'cmbQuocTich',
                    queryMode: 'local',
                    anyMatch: true,
                    labelWidth: 78,
                    fieldLabel: 'Quốc tịch',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    displayField: 'name',
                    valueField: 'id',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.countryid_link}',
                        store: '{OrgCountryStore}'
                    }
                }, {
                    xtype: 'combo',
                    itemId: 'cmbThanhPho',
                    queryMode: 'local',
                    anyMatch: true,
                    labelWidth: 78,
                    fieldLabel: 'Tỉnh, TP',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    displayField: 'name',
                    valueField: 'id',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.provinceid_link}',
                        store: '{OrgProvinceStore}'
                    }
                }, {
                    xtype: 'combo',
                    itemId: 'cmbQuanHuyen',
                    labelWidth: 78,
                    fieldLabel: 'Quận, huyện',
                    queryMode: 'local',
                    anyMatch: true,
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    displayField: 'name',
                    valueField: 'id',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.districtid_link}',
                        store: '{OrgDistrictStore}'
                    }
                }, {
                    xtype: 'combo',
                    labelWidth: 78,
                    fieldLabel: 'Xã',
                    queryMode: 'local',
                    anyMatch: true,
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    displayField: 'name',
                    valueField: 'id',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.communeid_link}',
                        store: '{OrgCommuneStore}'
                    }
                },,{
                    xtype: 'textfield',
                    labelWidth: 78,
                    fieldLabel: 'Thôn:',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.village}'
                    }
                }
            ]
            }, {
                layout: 'vbox',
                items: [ {
                    xtype: 'combo',
                    itemId: 'cmbDonViQuanLy',
                    queryMode: 'local',
                    anyMatch: true,
                    labelWidth: 78,
                    fieldLabel: 'ĐV Quản lý',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    displayField: 'name',
                    valueField: 'id',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.orgmanagerid_link}',
                        store: '{OrgManagerStore}'
                    }
                }, {
                    xtype: 'combo',
                    labelWidth: 78,
                    queryMode: 'local',
                    anyMatch: true,
                    fieldLabel: 'Phòng ban',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    displayField: 'name',
                    valueField: 'id',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.orgid_link}',
                        store: '{OrgStore}'
                    }
                },
                {
                    xtype: 'combo',
                    labelWidth: 78,
                    fieldLabel: 'Loại Nh.viên',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    displayField: 'name',
                    valueField: 'id',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.personnel_typeid_link}',
                        store: '{PersonnelTypeStore}'
                    }
                }, 
                {
                    xtype: 'combo',
                    labelWidth: 78,
                    fieldLabel: 'Trạng thái',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    displayField: 'name',
                    valueField: 'id',
                    flex: 1,
                    margin: 1,
                    bind: {
                        value: '{personnel.status}',
                        store: '{PersonnelStatus_Store}'
                    }
                }, {
                    xtype: 'checkbox',
                    labelWidth: 78,
                    fieldLabel: 'Xe đạp',
                    labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                    fieldStyle: 'font-size:11px;',
                    flex: 1,
                    margin: 1,
                    inputValue: true,
                    itemId: 'checkmoto',
                    bind: {
                        value: '{personnel.isbike}'
                    }
                }]
            }]
        }, {
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                margin: 1,
                labelWidth: 78,
                fieldLabel: 'Địa chỉ:',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                bind: {
                    value: '{personnel.address}'
                },
                width: 763
            }, {
                xtype: 'textfield',
                labelWidth: 78,
                fieldLabel: 'Biển số xe',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                flex: 1,
                margin: 1,
                bind: {
                    value: '{personnel.bike_number}',
                    editable: '{personnel.is_motobike}'
                }
            }]
        }]
    },{
        layout: 'vbox',
        items: [
            {
                xtype: 'datefield',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                fieldLabel: 'Ngày vào công ty:',
                labelAlign: 'left',
                labelWidth: 78,
                flex: 1,
                margin: 1,
                format: 'd/m/Y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                bind: {
                    value: '{personnel.date_startworking}'
                }
            },
            {
                xtype: 'datefield',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                fieldLabel: 'Ngày nghỉ việc:',
                labelAlign: 'left',
                labelWidth: 78,
                flex: 1,
                margin: '3 0 3 0',
                format: 'd/m/Y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                bind: {
                    value: '{personnel.date_endwordking}'
                }
            },{
                xtype: 'textfield',
                labelWidth: 78,
                fieldLabel: 'Lý do nghỉ việc',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                flex: 1,
                margin: 1,
                bind: {
                    value: '{personnel.reason}'
                }
            },{
                xtype: 'datefield',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                fieldLabel: 'Ngày kí HĐ t.việc:',
                labelAlign: 'left',
                labelWidth: 78,
                flex: 1,
                margin: 1,
                format: 'd/m/Y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                bind: {
                    value: '{personnel.date_probation_contract}'
                }
            },{
                xtype: 'datefield',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                fieldLabel: 'Ngày kí HĐ có thời hạn:',
                labelAlign: 'left',
                labelWidth: 78,
                flex: 1,
                margin: 1,
                format: 'd/m/Y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                bind: {
                    value: '{personnel.date_limit_contract}'
                }
            }

        ]
    },{
        layout:'vbox',
        items:[
            {
                xtype: 'datefield',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                fieldLabel: 'Ngày kí HĐ KTH:',
                labelAlign: 'left',
                labelWidth: 60,
                flex: 1,
                margin: 1,
                format: 'd/m/Y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                bind: {
                    value: '{personnel.date_unlimit_contract}'
                }
            },
            {
                xtype: 'textfield',
                labelWidth: 60,
                itemId:'TGCongTac',
                fieldLabel: 'TG công tác',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                flex: 1,
                readOnly:true,
                margin: 1,
                bind: {
                    value: '{personnel.time_work}'
                }
            },
            {
                xtype: 'textfield',
                labelWidth: 60,
                fieldLabel: 'Loại sức khỏe',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                flex: 1,
                margin: 1,
                bind: {
                    value: '{personnel.healthinfo}'
                }
            },
            {
                xtype: 'textfield',
                labelWidth: 60,
                fieldLabel: 'Số sổ bảo hiểm',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                flex: 1,
                margin: 1,
                bind: {
                    value: '{personnel.insurance_number}'
                }
            },{
                xtype: 'datefield',
                labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                fieldStyle: 'font-size:11px;',
                fieldLabel: 'Ngày đóng bảo hiểm:',
                labelAlign: 'left',
                labelWidth: 60,
                flex: 1,
                margin: 1,
                format: 'd/m/Y',
                altFormats: "Y-m-d\\TH:i:s.uO",
                bind: {
                    value: '{personnel.date_insurance}'
                }
            }
        ]
    },
    
    {
        layout: 'vbox',
        items: [{
            xtype: 'image',
            itemId: 'img',
            width: 130,
            height: 130,
            margin: 1,
            bind: {
                src: 'data:image/gif;base64,' + '{personnel.image}'
            },
            listeners: {
                afterrender: function (img, a, obj) {
                    img.getEl().dom.style.border = '1px solid black';
                }
            }
        }, {
            xtype: 'filefield',
            buttonText: '+',
            buttonOnly: true,
            itemId: 'btnFile',
            tooltip: 'Upload File',
            accept: 'image/*',
            hidden: true
        }, {
            xtype: 'button',
            itemId: 'btnUploadImage',
            ui: 'header',
            margin: '10 5 0 0',
            text: 'Tải ảnh',
            iconCls: 'x-fa fa-upload'
        }]
    },
        // {
        //     layout: 'vbox',
        //     items: [{
        //         xtype: 'image',
        //         itemId: 'qrperson',
        //         width: 130,
        //         height: 130,
        //         margin: 1,
        //         bind: {
        //             src: "{qr_person}"
        //         },
        //         listeners: {
        //             afterrender: function (img, a, obj) {
        //                 img.getEl().dom.style.border = '1px solid black';
        //             }
        //         }
        //     }]
        // },
        // {
        //     layout: 'vbox',
        //     items: [{
        //         xtype: 'image',
        //         itemId: 'qrbike',
        //         width: 130,
        //         height: 130,
        //         margin: 1,
        //         bind: {
        //             src: "{qr_bike}"
        //         },
        //         listeners: {
        //             afterrender: function (img, a, obj) {
        //                 img.getEl().dom.style.border = '1px solid black';
        //             }
        //         }
        //     }]
        // }
    ]
})