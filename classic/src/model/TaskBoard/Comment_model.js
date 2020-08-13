Ext.define('GSmartApp.model.TaskBoard.Comment_model', {
    extend : 'Ext.data.Model',

    fields : [
        { name : 'Date', type : 'date', dateFormat : 'c' },
        { name : 'TaskId', type : 'string', reference : 'GSmartApp.model.TaskBoard.TaskBoard_Model' },
        { name : 'UserId', type : 'int' },
        { name : 'Text'},
        { name : 'date', type : 'date', dateFormat : 'c' },
        { name : 'userId', type : 'int' },
        { name : 'text'}
    ]
});