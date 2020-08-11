Ext.define('GSmartApp.view.TaskBoard.Comment', {
    extend       : 'Ext.DataView',
    xtype        : 'Comment',
    itemSelector : 'div.comment-wrap',
    itemId       : 'Comment',
    cls          : 'commentview',
    
    itemTpl : '<tpl for=".">' +
    '<div class="comment-wrap">' +
    '<div class="comment-header"><h4>{userName}</h4><span class="date">{[Ext.util.Format.date(values.Date, "d/m/y G:i")]}</span></div>' +
    '<div class="comment-body"><img src="{userImgUrl}"/><p>{Text}</p></div>' +
    '</div>' +
    '</tpl>',

    collectData : function (comments) {
        var collected = this.callParent(arguments),
            userStore = Ext.StoreManager.lookup('TaskUser_Store'),
            result    = [];
        
        for (var i = 0; i < collected.length; i++) {
            var renderData = Ext.apply({}, collected[ i ]);
            var comment    = comments[ i ];
            var user       = userStore.getById(comment.get('UserId'));
            var userImgUrl = user.getImageUrl();

            renderData.userName         = user.getName();
            renderData.userImgUrl = userImgUrl || Ext.BLANK_IMAGE_URL;

            result.push(renderData);
        }

        return result;
    }
});
