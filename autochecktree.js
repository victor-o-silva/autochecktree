(function($) {
    $.fn.autochecktree = function(options) {
        var settings = $.extend({
            auto_uncheck_ancestors: true
        }, options );
        
        any = function(array){
            for (i=0; i<array.length; i++)
                if (array[i])
                    return true;
            return false;
        }
        get_descendants = function(chk){
            return $(chk).siblings('ul,ol').find(':checkbox');
        }
        check_descendants = function(chk){
            get_descendants(chk).prop('checked', true);
        }
        uncheck_descendants = function(chk){
            get_descendants(chk).prop('checked', false);
        }
        get_ancestors = function(chk) {
            return $(chk).parent().parentsUntil('ul.autochecktree_root,ol.autochecktree_root').children(':checkbox')
        }
        check_ancestors = function(chk){
            get_ancestors(chk).prop('checked', true);
        }
        uncheck_ancestors_without_checks = function(chk){
            var chks_ancestors = $($(chk).parent().parentsUntil('ul.autochecktree_root,ol.autochecktree_root').siblings(':checkbox').get().reverse());
            $.each(chks_ancestors, function(i, c_box){
                $(c_box).prop('checked', false);
                if (any_sibling_checked(c_box))
                    return false;
            });
        }
        get_siblings = function(chk){
            return $(chk).parent('li').siblings('li').children(':checkbox');
        }
        any_sibling_checked = function(chk){
            var estados_siblings = $.map(get_siblings(chk), function(c, i){ return $(c).prop('checked'); });
            return any(estados_siblings);
        }
        
        this.addClass('autochecktree_root');
        this.find(':checkbox').click(function(){
            var checked = $(this).prop('checked');
            if (checked){
                check_descendants(this);
                check_ancestors(this);
            }
            else {
                uncheck_descendants(this);
                if (settings.auto_uncheck_ancestors && !any_sibling_checked(this))
                    uncheck_ancestors_without_checks(this);
            }
        });
        
        return this;
    };
}(jQuery));
