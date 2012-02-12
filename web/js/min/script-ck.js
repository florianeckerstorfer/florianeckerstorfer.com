/**
* Bootstrap.js by @fat & @mdo
* plugins: bootstrap-transition.js, bootstrap-tooltip.js, bootstrap-popover.js
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/function prettyDate(a){var b=new Date((a||"").replace(/-/g,"/").replace(/[TZ]/g," ")),c=((new Date).getTime()-b.getTime())/1e3,d=Math.floor(c/86400);if(isNaN(d)||d<0||d>=31)return;return d===0&&(c<60&&"just now"||c<120&&"1 minute ago"||c<3600&&Math.floor(c/60)+" minutes ago"||c<7200&&"1 hour ago"||c<86400&&Math.floor(c/3600)+" hours ago")||d===1&&"Yesterday"||d<7&&d+" days ago"||d<31&&Math.ceil(d/7)+" weeks ago"}!function(a){a(function(){"use strict",a.support.transition=function(){var b=document.body||document.documentElement,c=b.style,d=c.transition!==undefined||c.WebkitTransition!==undefined||c.MozTransition!==undefined||c.MsTransition!==undefined||c.OTransition!==undefined;return d&&{end:function(){var b="TransitionEnd";return a.browser.webkit?b="webkitTransitionEnd":a.browser.mozilla?b="transitionend":a.browser.opera&&(b="oTransitionEnd"),b}()}}()})}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,this.options.trigger!="manual"&&(e=this.options.trigger=="hover"?"mouseenter":"focus",f=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(e,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f,this.options.selector,a.proxy(this.leave,this))),this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,b,this.$element.data()),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.show?c.show():(c.hoverState="in",setTimeout(function(){c.hoverState=="in"&&c.show()},c.options.delay.show))},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);!c.options.delay||!c.options.delay.hide?c.hide():(c.hoverState="out",setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide))},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip(),this.setContent(),this.options.animation&&a.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement,b=/in/.test(f),a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body),c=this.getPosition(b),d=a[0].offsetWidth,e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip();a.find(".tooltip-inner").html(this.getTitle()),a.removeClass("fade in top bottom left right")},hide:function(){function b(){var b=setTimeout(function(){d.off(a.support.transition.end).remove()},500);d.one(a.support.transition.end,function(){clearTimeout(b),d.remove()})}var c=this,d=this.tip();d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?b():d.remove()},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,delay:0,selector:!1,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery),!function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var b=this.tip(),c=this.getTitle(),d=this.getContent();b.find(".popover-title")[a.type(c)=="object"?"append":"html"](c),b.find(".popover-content > *")[a.type(d)=="object"?"append":"html"](d),b.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content),a=a.toString().replace(/(^\s*|\s*$)/,""),a},tip:function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip}}),a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;e||d.data("popover",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery);Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|after|from)/i,subtract:/^(\-|before|ago)/i,yesterday:/^yesterday/i,today:/^t(oday)?/i,tomorrow:/^tomorrow/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^min(ute)?s?/i,hour:/^h(ou)?rs?/i,week:/^w(ee)?k/i,month:/^m(o(nth)?s?)?/i,day:/^d(ays?)?/i,year:/^y((ea)?rs?)?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a|p)/i},abbreviatedTimeZoneStandard:{GMT:"-000",EST:"-0400",CST:"-0500",MST:"-0600",PST:"-0700"},abbreviatedTimeZoneDST:{GMT:"-000",EDT:"-0500",CDT:"-0600",MDT:"-0700",PDT:"-0800"}};Date.getMonthNumberFromName=function(a){var b=Date.CultureInfo.monthNames,c=Date.CultureInfo.abbreviatedMonthNames,d=a.toLowerCase();for(var e=0;e<b.length;e++)if(b[e].toLowerCase()==d||c[e].toLowerCase()==d)return e;return-1};Date.getDayNumberFromName=function(a){var b=Date.CultureInfo.dayNames,c=Date.CultureInfo.abbreviatedDayNames,d=Date.CultureInfo.shortestDayNames,e=a.toLowerCase();for(var f=0;f<b.length;f++)if(b[f].toLowerCase()==e||c[f].toLowerCase()==e)return f;return-1};Date.isLeapYear=function(a){return a%4===0&&a%100!==0||a%400===0};Date.getDaysInMonth=function(a,b){return[31,Date.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]};Date.getTimezoneOffset=function(a,b){return b||!1?Date.CultureInfo.abbreviatedTimeZoneDST[a.toUpperCase()]:Date.CultureInfo.abbreviatedTimeZoneStandard[a.toUpperCase()]};Date.getTimezoneAbbreviation=function(a,b){var c=b||!1?Date.CultureInfo.abbreviatedTimeZoneDST:Date.CultureInfo.abbreviatedTimeZoneStandard,d;for(d in c)if(c[d]===a)return d;return null};Date.prototype.clone=function(){return new Date(this.getTime())};Date.prototype.compareTo=function(a){if(isNaN(this))throw new Error(this);if(a instanceof Date&&!isNaN(a))return this>a?1:this<a?-1:0;throw new TypeError(a)};Date.prototype.equals=function(a){return this.compareTo(a)===0};Date.prototype.between=function(a,b){var c=this.getTime();return c>=a.getTime()&&c<=b.getTime()};Date.prototype.addMilliseconds=function(a){this.setMilliseconds(this.getMilliseconds()+a);return this};Date.prototype.addSeconds=function(a){return this.addMilliseconds(a*1e3)};Date.prototype.addMinutes=function(a){return this.addMilliseconds(a*6e4)};Date.prototype.addHours=function(a){return this.addMilliseconds(a*36e5)};Date.prototype.addDays=function(a){return this.addMilliseconds(a*864e5)};Date.prototype.addWeeks=function(a){return this.addMilliseconds(a*6048e5)};Date.prototype.addMonths=function(a){var b=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+a);this.setDate(Math.min(b,this.getDaysInMonth()));return this};Date.prototype.addYears=function(a){return this.addMonths(a*12)};Date.prototype.add=function(a){if(typeof a=="number"){this._orient=a;return this}var b=a;(b.millisecond||b.milliseconds)&&this.addMilliseconds(b.millisecond||b.milliseconds);(b.second||b.seconds)&&this.addSeconds(b.second||b.seconds);(b.minute||b.minutes)&&this.addMinutes(b.minute||b.minutes);(b.hour||b.hours)&&this.addHours(b.hour||b.hours);(b.month||b.months)&&this.addMonths(b.month||b.months);(b.year||b.years)&&this.addYears(b.year||b.years);(b.day||b.days)&&this.addDays(b.day||b.days);return this};Date._validate=function(a,b,c,d){if(typeof a!="number")throw new TypeError(a+" is not a Number.");if(a<b||a>c)throw new RangeError(a+" is not a valid value for "+d+".");return!0};Date.validateMillisecond=function(a){return Date._validate(a,0,999,"milliseconds")};Date.validateSecond=function(a){return Date._validate(a,0,59,"seconds")};Date.validateMinute=function(a){return Date._validate(a,0,59,"minutes")};Date.validateHour=function(a){return Date._validate(a,0,23,"hours")};Date.validateDay=function(a,b,c){return Date._validate(a,1,Date.getDaysInMonth(b,c),"days")};Date.validateMonth=function(a){return Date._validate(a,0,11,"months")};Date.validateYear=function(a){return Date._validate(a,1,9999,"seconds")};Date.prototype.set=function(a){var b=a;!b.millisecond&&b.millisecond!==0&&(b.millisecond=-1);!b.second&&b.second!==0&&(b.second=-1);!b.minute&&b.minute!==0&&(b.minute=-1);!b.hour&&b.hour!==0&&(b.hour=-1);!b.day&&b.day!==0&&(b.day=-1);!b.month&&b.month!==0&&(b.month=-1);!b.year&&b.year!==0&&(b.year=-1);b.millisecond!=-1&&Date.validateMillisecond(b.millisecond)&&this.addMilliseconds(b.millisecond-this.getMilliseconds());b.second!=-1&&Date.validateSecond(b.second)&&this.addSeconds(b.second-this.getSeconds());b.minute!=-1&&Date.validateMinute(b.minute)&&this.addMinutes(b.minute-this.getMinutes());b.hour!=-1&&Date.validateHour(b.hour)&&this.addHours(b.hour-this.getHours());b.month!==-1&&Date.validateMonth(b.month)&&this.addMonths(b.month-this.getMonth());b.year!=-1&&Date.validateYear(b.year)&&this.addYears(b.year-this.getFullYear());b.day!=-1&&Date.validateDay(b.day,this.getFullYear(),this.getMonth())&&this.addDays(b.day-this.getDate());b.timezone&&this.setTimezone(b.timezone);b.timezoneOffset&&this.setTimezoneOffset(b.timezoneOffset);return this};Date.prototype.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this};Date.prototype.isLeapYear=function(){var a=this.getFullYear();return a%4===0&&a%100!==0||a%400===0};Date.prototype.isWeekday=function(){return!this.is().sat()&&!this.is().sun()};Date.prototype.getDaysInMonth=function(){return Date.getDaysInMonth(this.getFullYear(),this.getMonth())};Date.prototype.moveToFirstDayOfMonth=function(){return this.set({day:1})};Date.prototype.moveToLastDayOfMonth=function(){return this.set({day:this.getDaysInMonth()})};Date.prototype.moveToDayOfWeek=function(a,b){var c=(a-this.getDay()+7*(b||1))%7;return this.addDays(c===0?c+=7*(b||1):c)};Date.prototype.moveToMonth=function(a,b){var c=(a-this.getMonth()+12*(b||1))%12;return this.addMonths(c===0?c+=12*(b||1):c)};Date.prototype.getDayOfYear=function(){return Math.floor((this-new Date(this.getFullYear(),0,1))/864e5)};Date.prototype.getWeekOfYear=function(a){var b=this.getFullYear(),c=this.getMonth(),d=this.getDate(),e=a||Date.CultureInfo.firstDayOfWeek,f=8-(new Date(b,0,1)).getDay();f==8&&(f=1);var g=(Date.UTC(b,c,d,0,0,0)-Date.UTC(b,0,1,0,0,0))/864e5+1,h=Math.floor((g-f+7)/7);if(h===e){b--;var i=8-(new Date(b,0,1)).getDay();i==2||i==8?h=53:h=52}return h};Date.prototype.isDST=function(){console.log("isDST");return this.toString().match(/(E|C|M|P)(S|D)T/)[2]=="D"};Date.prototype.getTimezone=function(){return Date.getTimezoneAbbreviation(this.getUTCOffset,this.isDST())};Date.prototype.setTimezoneOffset=function(a){var b=this.getTimezoneOffset(),c=Number(a)*-6/10;this.addMinutes(c-b);return this};Date.prototype.setTimezone=function(a){return this.setTimezoneOffset(Date.getTimezoneOffset(a))};Date.prototype.getUTCOffset=function(){var a=this.getTimezoneOffset()*-10/6,b;if(a<0){b=(a-1e4).toString();return b[0]+b.substr(2)}b=(a+1e4).toString();return"+"+b.substr(1)};Date.prototype.getDayName=function(a){return a?Date.CultureInfo.abbreviatedDayNames[this.getDay()]:Date.CultureInfo.dayNames[this.getDay()]};Date.prototype.getMonthName=function(a){return a?Date.CultureInfo.abbreviatedMonthNames[this.getMonth()]:Date.CultureInfo.monthNames[this.getMonth()]};Date.prototype._toString=Date.prototype.toString;Date.prototype.toString=function(a){var b=this,c=function(b){return b.toString().length==1?"0"+b:b};return a?a.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,function(a){switch(a){case"hh":return c(b.getHours()<13?b.getHours():b.getHours()-12);case"h":return b.getHours()<13?b.getHours():b.getHours()-12;case"HH":return c(b.getHours());case"H":return b.getHours();case"mm":return c(b.getMinutes());case"m":return b.getMinutes();case"ss":return c(b.getSeconds());case"s":return b.getSeconds();case"yyyy":return b.getFullYear();case"yy":return b.getFullYear().toString().substring(2,4);case"dddd":return b.getDayName();case"ddd":return b.getDayName(!0);case"dd":return c(b.getDate());case"d":return b.getDate().toString();case"MMMM":return b.getMonthName();case"MMM":return b.getMonthName(!0);case"MM":return c(b.getMonth()+1);case"M":return b.getMonth()+1;case"t":return b.getHours()<12?Date.CultureInfo.amDesignator.substring(0,1):Date.CultureInfo.pmDesignator.substring(0,1);case"tt":return b.getHours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator;case"zzz":case"zz":case"z":return""}}):this._toString()};Date.now=function(){return new Date};Date.today=function(){return Date.now().clearTime()};Date.prototype._orient=1;Date.prototype.next=function(){this._orient=1;return this};Date.prototype.last=Date.prototype.prev=Date.prototype.previous=function(){this._orient=-1;return this};Date.prototype._is=!1;Date.prototype.is=function(){this._is=!0;return this};Number.prototype._dateElement="day";Number.prototype.fromNow=function(){var a={};a[this._dateElement]=this;return Date.now().add(a)};Number.prototype.ago=function(){var a={};a[this._dateElement]=this*-1;return Date.now().add(a)};(function(){var a=Date.prototype,b=Number.prototype,c="sunday monday tuesday wednesday thursday friday saturday".split(/\s/),d="january february march april may june july august september october november december".split(/\s/),e="Millisecond Second Minute Hour Day Week Month Year".split(/\s/),f,g=function(a){return function(){if(this._is){this._is=!1;return this.getDay()==a}return this.moveToDayOfWeek(a,this._orient)}};for(var h=0;h<c.length;h++)a[c[h]]=a[c[h].substring(0,3)]=g(h);var i=function(a){return function(){if(this._is){this._is=!1;return this.getMonth()===a}return this.moveToMonth(a,this._orient)}};for(var j=0;j<d.length;j++)a[d[j]]=a[d[j].substring(0,3)]=i(j);var k=function(a){return function(){a.substring(a.length-1)!="s"&&(a+="s");return this["add"+a](this._orient)}},l=function(a){return function(){this._dateElement=a;return this}};for(var m=0;m<e.length;m++){f=e[m].toLowerCase();a[f]=a[f+"s"]=k(e[m]);b[f]=b[f+"s"]=l(f)}})();Date.prototype.toJSONString=function(){return this.toString("yyyy-MM-ddThh:mm:ssZ")};Date.prototype.toShortDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern)};Date.prototype.toLongDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.longDatePattern)};Date.prototype.toShortTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern)};Date.prototype.toLongTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.longTimePattern)};Date.prototype.getOrdinal=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}};(function(){Date.Parsing={Exception:function(a){this.message="Parse error at '"+a.substring(0,10)+" ...'"}};var a=Date.Parsing,b=a.Operators={rtoken:function(b){return function(c){var d=c.match(b);if(d)return[d[0],c.substring(d[0].length)];throw new a.Exception(c)}},token:function(a){return function(a){return b.rtoken(new RegExp("^s*"+a+"s*"))(a)}},stoken:function(a){return b.rtoken(new RegExp("^"+a))},until:function(a){return function(b){var c=[],d=null;while(b.length){try{d=a.call(this,b)}catch(e){c.push(d[0]);b=d[1];continue}break}return[c,b]}},many:function(a){return function(b){var c=[],d=null;while(b.length){try{d=a.call(this,b)}catch(e){return[c,b]}c.push(d[0]);b=d[1]}return[c,b]}},optional:function(a){return function(b){var c=null;try{c=a.call(this,b)}catch(d){return[null,b]}return[c[0],c[1]]}},not:function(b){return function(c){try{b.call(this,c)}catch(d){return[null,c]}throw new a.Exception(c)}},ignore:function(a){return a?function(b){var c=null;c=a.call(this,b);return[null,c[1]]}:null},product:function(){var a=arguments[0],c=Array.prototype.slice.call(arguments,1),d=[];for(var e=0;e<a.length;e++)d.push(b.each(a[e],c));return d},cache:function(b){var c={},d=null;return function(e){try{d=c[e]=c[e]||b.call(this,e)}catch(f){d=c[e]=f}if(d instanceof a.Exception)throw d;return d}},any:function(){var b=arguments;return function(c){var d=null;for(var e=0;e<b.length;e++){if(b[e]==null)continue;try{d=b[e].call(this,c)}catch(f){d=null}if(d)return d}throw new a.Exception(c)}},each:function(){var b=arguments;return function(c){var d=[],e=null;for(var f=0;f<b.length;f++){if(b[f]==null)continue;try{e=b[f].call(this,c)}catch(g){throw new a.Exception(c)}d.push(e[0]);c=e[1]}return[d,c]}},all:function(){var a=arguments,b=b;return b.each(b.optional(a))},sequence:function(c,d,e){d=d||b.rtoken(/^\s*/);e=e||null;return c.length==1?c[0]:function(b){var f=null,g=null,h=[];for(var i=0;i<c.length;i++){try{f=c[i].call(this,b)}catch(j){break}h.push(f[0]);try{g=d.call(this,f[1])}catch(k){g=null;break}b=g[1]}if(!f)throw new a.Exception(b);if(g)throw new a.Exception(g[1]);if(e)try{f=e.call(this,f[1])}catch(l){throw new a.Exception(f[1])}return[h,f?f[1]:b]}},between:function(a,c,d){d=d||a;var e=b.each(b.ignore(a),c,b.ignore(d));return function(a){var b=e.call(this,a);return[[b[0][0],r[0][2]],b[1]]}},list:function(a,c,d){c=c||b.rtoken(/^\s*/);d=d||null;return a instanceof Array?b.each(b.product(a.slice(0,-1),b.ignore(c)),a.slice(-1),b.ignore(d)):b.each(b.many(b.each(a,b.ignore(c))),px,b.ignore(d))},set:function(c,d,e){d=d||b.rtoken(/^\s*/);e=e||null;return function(f){var g=null,h=null,i=null,j=null,k=[[],f],l=!1;for(var m=0;m<c.length;m++){i=null;h=null;g=null;l=c.length==1;try{g=c[m].call(this,f)}catch(n){continue}j=[[g[0]],g[1]];if(g[1].length>0&&!l)try{i=d.call(this,g[1])}catch(o){l=!0}else l=!0;!l&&i[1].length===0&&(l=!0);if(!l){var p=[];for(var q=0;q<c.length;q++)m!=q&&p.push(c[q]);h=b.set(p,d).call(this,i[1]);if(h[0].length>0){j[0]=j[0].concat(h[0]);j[1]=h[1]}}j[1].length<k[1].length&&(k=j);if(k[1].length===0)break}if(k[0].length===0)return k;if(e){try{i=e.call(this,k[1])}catch(r){throw new a.Exception(k[1])}k[1]=i[1]}return k}},forward:function(a,b){return function(c){return a[b].call(this,c)}},replace:function(a,b){return function(c){var d=a.call(this,c);return[b,d[1]]}},process:function(a,b){return function(c){var d=a.call(this,c);return[b.call(this,d[0]),d[1]]}},min:function(b,c){return function(d){var e=c.call(this,d);if(e[0].length<b)throw new a.Exception(d);return e}}},c=function(a){return function(){var b=null,c=[];arguments.length>1?b=Array.prototype.slice.call(arguments):arguments[0]instanceof Array&&(b=arguments[0]);if(!b)return a.apply(null,arguments);for(var d=0,e=b.shift();d<e.length;d++){b.unshift(e[d]);c.push(a.apply(null,b));b.shift();return c}}},d="optional not ignore cache".split(/\s/);for(var e=0;e<d.length;e++)b[d[e]]=c(b[d[e]]);var f=function(a){return function(){return arguments[0]instanceof Array?a.apply(null,arguments[0]):a.apply(null,arguments)}},g="each any all".split(/\s/);for(var h=0;h<g.length;h++)b[g[h]]=f(b[g[h]])})();(function(){var a=function(b){var c=[];for(var d=0;d<b.length;d++)b[d]instanceof Array?c=c.concat(a(b[d])):b[d]&&c.push(b[d]);return c};Date.Grammar={};Date.Translator={hour:function(a){return function(){this.hour=Number(a)}},minute:function(a){return function(){this.minute=Number(a)}},second:function(a){return function(){this.second=Number(a)}},meridian:function(a){return function(){this.meridian=a.slice(0,1).toLowerCase()}},timezone:function(a){return function(){var b=a.replace(/[^\d\+\-]/g,"");b.length?this.timezoneOffset=Number(b):this.timezone=a.toLowerCase()}},day:function(a){var b=a[0];return function(){this.day=Number(b.match(/\d+/)[0])}},month:function(a){return function(){this.month=a.length==3?Date.getMonthNumberFromName(a):Number(a)-1}},year:function(a){return function(){var b=Number(a);this.year=a.length>2?b:b+(b+2e3<Date.CultureInfo.twoDigitYearMax?2e3:1900)}},rday:function(a){return function(){switch(a){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=!0}}},finishExact:function(a){a=a instanceof Array?a:[a];var b=new Date;this.year=b.getFullYear();this.month=b.getMonth();this.day=1;this.hour=0;this.minute=0;this.second=0;for(var c=0;c<a.length;c++)a[c]&&a[c].call(this);this.hour=this.meridian=="p"&&this.hour<13?this.hour+12:this.hour;if(this.day>Date.getDaysInMonth(this.year,this.month))throw new RangeError(this.day+" is not a valid value for days.");var d=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);this.timezone?d.set({timezone:this.timezone}):this.timezoneOffset&&d.set({timezoneOffset:this.timezoneOffset});return d},finish:function(b){b=b instanceof Array?a(b):[b];if(b.length===0)return null;for(var c=0;c<b.length;c++)typeof b[c]=="function"&&b[c].call(this);if(this.now)return new Date;var d=Date.today(),e=null,f=this.days!=null||!!this.orient||!!this.operator;if(f){var g,h,i;i=this.orient=="past"||this.operator=="subtract"?-1:1;if(this.weekday){this.unit="day";g=Date.getDayNumberFromName(this.weekday)-d.getDay();h=7;this.days=g?(g+i*h)%h:i*h}if(this.month){this.unit="month";g=this.month-d.getMonth();h=12;this.months=g?(g+i*h)%h:i*h;this.month=null}this.unit||(this.unit="day");if(this[this.unit+"s"]==null||this.operator!=null){this.value||(this.value=1);if(this.unit=="week"){this.unit="day";this.value=this.value*7}this[this.unit+"s"]=this.value*i}return d.add(this)}this.meridian&&this.hour&&(this.hour=this.hour<13&&this.meridian=="p"?this.hour+12:this.hour);this.weekday&&!this.day&&(this.day=d.addDays(Date.getDayNumberFromName(this.weekday)-d.getDay()).getDate());this.month&&!this.day&&(this.day=1);return d.set(this)}};var b=Date.Parsing.Operators,c=Date.Grammar,d=Date.Translator,e;c.datePartDelimiter=b.rtoken(/^([\s\-\.\,\/\x27]+)/);c.timePartDelimiter=b.stoken(":");c.whiteSpace=b.rtoken(/^\s*/);c.generalDelimiter=b.rtoken(/^(([\s\,]|at|on)+)/);var f={};c.ctoken=function(a){var c=f[a];if(!c){var d=Date.CultureInfo.regexPatterns,e=a.split(/\s+/),g=[];for(var h=0;h<e.length;h++)g.push(b.replace(b.rtoken(d[e[h]]),e[h]));c=f[a]=b.any.apply(null,g)}return c};c.ctoken2=function(a){return b.rtoken(Date.CultureInfo.regexPatterns[a])};c.h=b.cache(b.process(b.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),d.hour));c.hh=b.cache(b.process(b.rtoken(/^(0[0-9]|1[0-2])/),d.hour));c.H=b.cache(b.process(b.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),d.hour));c.HH=b.cache(b.process(b.rtoken(/^([0-1][0-9]|2[0-3])/),d.hour));c.m=b.cache(b.process(b.rtoken(/^([0-5][0-9]|[0-9])/),d.minute));c.mm=b.cache(b.process(b.rtoken(/^[0-5][0-9]/),d.minute));c.s=b.cache(b.process(b.rtoken(/^([0-5][0-9]|[0-9])/),d.second));c.ss=b.cache(b.process(b.rtoken(/^[0-5][0-9]/),d.second));c.hms=b.cache(b.sequence([c.H,c.mm,c.ss],c.timePartDelimiter));c.t=b.cache(b.process(c.ctoken2("shortMeridian"),d.meridian));c.tt=b.cache(b.process(c.ctoken2("longMeridian"),d.meridian));c.z=b.cache(b.process(b.rtoken(/^(\+|\-)?\s*\d\d\d\d?/),d.timezone));c.zz=b.cache(b.process(b.rtoken(/^(\+|\-)\s*\d\d\d\d/),d.timezone));c.zzz=b.cache(b.process(c.ctoken2("timezone"),d.timezone));c.timeSuffix=b.each(b.ignore(c.whiteSpace),b.set([c.tt,c.zzz]));c.time=b.each(b.optional(b.ignore(b.stoken("T"))),c.hms,c.timeSuffix);c.d=b.cache(b.process(b.each(b.rtoken(/^([0-2]\d|3[0-1]|\d)/),b.optional(c.ctoken2("ordinalSuffix"))),d.day));c.dd=b.cache(b.process(b.each(b.rtoken(/^([0-2]\d|3[0-1])/),b.optional(c.ctoken2("ordinalSuffix"))),d.day));c.ddd=c.dddd=b.cache(b.process(c.ctoken("sun mon tue wed thu fri sat"),function(a){return function(){this.weekday=a}}));c.M=b.cache(b.process(b.rtoken(/^(1[0-2]|0\d|\d)/),d.month));c.MM=b.cache(b.process(b.rtoken(/^(1[0-2]|0\d)/),d.month));c.MMM=c.MMMM=b.cache(b.process(c.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),d.month));c.y=b.cache(b.process(b.rtoken(/^(\d\d?)/),d.year));c.yy=b.cache(b.process(b.rtoken(/^(\d\d)/),d.year));c.yyy=b.cache(b.process(b.rtoken(/^(\d\d?\d?\d?)/),d.year));c.yyyy=b.cache(b.process(b.rtoken(/^(\d\d\d\d)/),d.year));e=function(){return b.each(b.any.apply(null,arguments),b.not(c.ctoken2("timeContext")))};c.day=e(c.d,c.dd);c.month=e(c.M,c.MMM);c.year=e(c.yyyy,c.yy);c.orientation=b.process(c.ctoken("past future"),function(a){return function(){this.orient=a}});c.operator=b.process(c.ctoken("add subtract"),function(a){return function(){this.operator=a}});c.rday=b.process(c.ctoken("yesterday tomorrow today now"),d.rday);c.unit=b.process(c.ctoken("minute hour day week month year"),function(a){return function(){this.unit=a}});c.value=b.process(b.rtoken(/^\d\d?(st|nd|rd|th)?/),function(a){return function(){this.value=a.replace(/\D/g,"")}});c.expression=b.set([c.rday,c.operator,c.value,c.unit,c.orientation,c.ddd,c.MMM]);e=function(){return b.set(arguments,c.datePartDelimiter)};c.mdy=e(c.ddd,c.month,c.day,c.year);c.ymd=e(c.ddd,c.year,c.month,c.day);c.dmy=e(c.ddd,c.day,c.month,c.year);c.date=function(a){return(c[Date.CultureInfo.dateElementOrder]||c.mdy).call(this,a)};c.format=b.process(b.many(b.any(b.process(b.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(a){if(c[a])return c[a];throw Date.Parsing.Exception(a)}),b.process(b.rtoken(/^[^dMyhHmstz]+/),function(a){return b.ignore(b.stoken(a))}))),function(a){return b.process(b.each.apply(null,a),d.finishExact)});var g={},h=function(a){return g[a]=g[a]||c.format(a)[0]};c.formats=function(a){if(a instanceof Array){var c=[];for(var d=0;d<a.length;d++)c.push(h(a[d]));return b.any.apply(null,c)}return h(a)};c._formats=c.formats(["yyyy-MM-ddTHH:mm:ss","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","d"]);c._start=b.process(b.set([c.date,c.time,c.expression],c.generalDelimiter,c.whiteSpace),d.finish);c.start=function(a){try{var b=c._formats.call({},a);if(b[1].length===0)return b}catch(d){}return c._start.call({},a)}})();Date._parse=Date.parse;Date.parse=function(a){var b=null;if(!a)return null;try{b=Date.Grammar.start.call({},a)}catch(c){return null}return b[1].length===0?b[0]:null};Date.getParseFunction=function(a){var b=Date.Grammar.formats(a);return function(a){var c=null;try{c=b.call({},a)}catch(d){return null}return c[1].length===0?c[0]:null}};Date.parseExact=function(a,b){return Date.getParseFunction(b)(a)};$(document).ready(function(){$.getJSON("/instagram.php",function(a){$("#instagram").popover({placement:"top",title:"Latest Photo",content:function(){var b=new Date(a.data[0].created_time*1e3);return'<img src="'+a.data[0].images.low_resolution.url+'" width="306px" height="306px"></p><p>'+a.data[0].caption.text+" <small><em>"+prettyDate(b.toString("yyyy-MM-ddTHH:mm:ssZ"))+"</em></small>"},delay:{show:0,hide:0}})});$.getJSON("/miso.php",function(a){$("#miso").popover({placement:"top",title:"Latest Episode Watched",content:function(){var b=a[0].checkin;return'<img src="'+b.episode_poster_url+'" style="text-align:center;width:100%"></p><p><strong>'+b.media_title+"</strong> "+b.episode_label+" <em>"+b.episode_title+"</em>"+" <small><em>"+prettyDate(b.created_at)+"</em></small>"}})});$.getJSON("/twitter.php",function(a){$("#twitter").popover({placement:"top",title:"Latest Tweet",content:function(){var b=Date.parse(a[0].created_at);return a[0].text+" <small><em>"+prettyDate(b.toString("yyyy-MM-ddTHH:mm:ssZ"))+"</em></small>"}})});$.getJSON("/lastfm.php",function(a){$("#lastfm").popover({placement:"top",title:"Latest Song",content:function(){var b=a.recenttracks.track[0];if(b["@attr"]&&b["@attr"].nowplaying==="true")var c=Date.parse("now");else var c=Date.parse(b.date["#text"]);var d="";b.image&&b.image[1]&&b.image[1]["#text"]&&(d='<img src="'+b.image[1]["#text"]+'" style="float:left;margin:0 8px 8px 0;">');return'<span style="clear:left;">'+d+"<strong>"+b.artist["#text"]+"</strong> - "+b.name+"<br><small><em>"+prettyDate(c.toString("yyyy-MM-ddTHH:mm:ssZ"))+"</em></small></span>"}})})});