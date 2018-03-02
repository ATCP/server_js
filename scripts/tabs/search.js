/* See license.txt for terms of usage */

define("tabs/search",["domplate/domplate","core/lib","i18n!nls/search","domplate/toolbar","domplate/popupMenu","core/cookies","core/dragdrop"],function(t,e,s,n,r,i,a){var o=t.domplate,c=t.INPUT,h=t.SPAN,u={};return u.Box=o({tag:h({class:"searchBox"},h({class:"toolbarSeparator resizer"},"&nbsp;"),h({class:"searchTextBox"},c({class:"searchInput",type:"text",placeholder:s.search,onkeydown:"$onKeyDown"}),h({class:"arrow",onclick:"$onOpenOptions"},"&nbsp;"))),onKeyDown:function(t){var s=$.event.fix(t||window.event),n=e.getAncestorByClass(s.target,"tabBody"),r=e.getElementByClass(n,"searchInput");setTimeout(e.bindFixed(this.search,this,n,s.keyCode,r.value))},initialize:function(t){var s=e.getElementByClass(t,"searchInput"),n=e.getElementByClass(t,"resizer");u.Resizer.initialize(s,n)},search:function(t,s,n){var r=e.getElementByClass(t,"searchInput");r.removeAttribute("status");var i=r.value;if(!(i===n&&13!==s||13!==s&&e.isWebkit)){t.repObject.onSearch(i,s)||r.setAttribute("status","notfound")}},onOpenOptions:function(t){var s=e.fixEvent(t);if(e.cancelEvent(t),e.isLeftClick(t)){var n=s.target,i=this.getMenuItems(n);new r({id:"searchOptions",items:i}).showPopup(n)}},getMenuItems:function(t){var n=e.getAncestorByClass(t,"tabBody"),r=n.repObject.getSearchOptions();return r.push("-"),r.push({label:s.caseSensitive,checked:i.getBooleanCookie("searchCaseSensitive"),command:e.bindFixed(this.onOption,this,"searchCaseSensitive")}),r},onOption:function(t){i.toggleCookie(t),e.getElementByClass(document.documentElement,"searchInput").removeAttribute("status")}}),u.ObjectSearch=function(t,e,s,n){this.text=t,this.reverse=s,this.caseSensitive=n,this.stack=[],this.stack.push({object:e,propIndex:0,startOffset:-1}),this.matches=[]},u.ObjectSearch.prototype={findNext:function(t){for(;this.stack.length>0;){var e=this.getCurrentScope(),s=this.find(e);if(s)return s}return!1},find:function(t){var e=0;for(var s in t.object)if(e++,!(t.propIndex>=e)){var n=t.object[s];if(n){if(t.propIndex=e,"object"==typeof n)return this.stack.push({propIndex:0,object:n,startOffset:-1}),!1;var r=this.text,a=String(n);i.getBooleanCookie("searchCaseSensitive")||(a=a.toLowerCase(),r=r.toLowerCase());var o=t.startOffset<0?0:t.startOffset,c=a.indexOf(r,o);if(c>=0)return t.propIndex+=-1,t.startOffset=c+r.length,this.matches.push({value:n,startOffset:c}),!0}}return this.stack.pop(),!1},getCurrentScope:function(){return this.stack[this.stack.length-1]},getCurrentMatch:function(){return this.matches[this.matches.length-1]},selectText:function(t){var s=this.getCurrentMatch();e.selectElementText(t,s.startOffset,s.startOffset+this.text.length)}},u.Resizer=o({initialize:function(t,s){this.searchInput=t,this.tracker=new a.Tracker(s,{onDragStart:e.bind(this.onDragStart,this),onDragOver:e.bind(this.onDragOver,this),onDrop:e.bind(this.onDrop,this)})},onDragStart:function(t){e.getBody(this.searchInput.ownerDocument).setAttribute("vResizing","true"),this.startWidth=this.searchInput.clientWidth-20},onDragOver:function(t,s){var n=this.startWidth-t.x;n>e.getAncestorByClass(this.searchInput,"toolbar").clientWidth-40||(this.searchInput.style.width=n+"px")},onDrop:function(t){e.getBody(this.searchInput.ownerDocument).removeAttribute("vResizing")}}),u});