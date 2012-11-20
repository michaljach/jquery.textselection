/*!
 * jquery.textselection Plugin v1.0
 * https://github.com/michaljach/jquery.textselection
 *
 * Copyright 2012, Michal Jach
 * License Info:
 * Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
 */

(function($){

    function selectText(element, param1, param2){
        var range, selection;

        if(document.createRange){
            var textNode = element.firstChild;
            if (textNode.data.length > 0){
                selection = window.getSelection();
                selection.removeAllRanges();
                range = document.createRange();
                if(typeof param1 != 'undefined' && typeof param2 != 'undefined'){
                    if(param1 <= param2 && param1 <= textNode.data.length && param2 <= textNode.data.length && param1 > 0 && param2 > 0){
                        range.setStart(textNode, param1-1);
                        range.setEnd(textNode, param2);
                    }
                    else {
                        $.error('Wrong range parameters');
                    }
                }
                else {
                    range.selectNodeContents(element);
                }
                selection.addRange(range);
            }
        }
        else {
            range = document.body.createTextRange();
            range.moveToElementText(element);
            if(typeof param1 != 'undefined' && typeof param2 != 'undefined'){
                if(param1 <= param2 && param1 <= textNode.data.length && param2 <= textNode.data.length && param1 > 0 && param2 > 0){
                    range.moveStart("character", param1);
                    range.collapse(true);
                    range.moveEnd("character", param2);
                }
                else {
                    $.error('Wrong range parameters');
                }
            }
            range.select();
        }
    }

    var methods = {
        init : function(){ 
            return this.each(function(){
                selectText(this);
            });    
        },
        range : function(param1, param2){
            return this.each(function(){
                if(typeof param2 == "undefined"){
                    selectText(this, 1, param1);
                }
                else {
                    selectText(this, param1, param2);
                }
            }); 
        },
        find : function(substring, param1){
            return this.each(function(){
                var string = $(this).prop('innerHTML');
                var end = substring.length;
                if(typeof param1 == "undefined"){
                    var start = string.indexOf(substring) + 1;
                    selectText(this, start, start+end-1);
                }
                else {
                    var pos = 0, num = -1, i = -1;
                    while(pos != -1){
                        pos = string.indexOf(substring, i + 1);
                        num += 1;
                        i = pos;
                        if(num == param1-1){
                            selectText(this, pos + 1, pos + end);
                        }
                    }
                }
            });
        },
        clear : function(){
            return this.each(function(){
                selection = window.getSelection();
                selection.removeAllRanges();
            }); 
        }
    };

    $.fn.textselection = function(method){
    
        // Method calling logic
        if (methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || ! method){
            return methods.init.apply(this, arguments);
        }
        else{
            $.error('Method ' +  method + ' does not exist on jQuery.textselection');
        }
    };

})(jQuery);