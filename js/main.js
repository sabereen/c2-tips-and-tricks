"use strict";window.parse={image_urls:function(n,t){return n.replace(/{\|\d+\|.+\|}/gi,function(n){return"images/"+t+"."+n.split("|")[1]+n.split("|")[2]})},jodakon:function(n){return n.replace(".:'jodakon':.","<hr>")}};var db=new Object,database={};console.log("URL Hash: "+window.location.hash),window.location.hash?$.get("db/"+window.location.hash.substring(1)+".db",{},function(n,t,o){console.log(t),db=new Nedb({filename:"learning",autoload:!0}),localStorage.setItem("learning",n),db.find({}).sort({title:1}).exec(function(n,t){database=t,console.info(t);var o="<button onclick=\"window.location.hash = ''; window.location.reload();\">بازگشت</button><br>";for(var i in t)o+="<br><button id="+i+">"+t[i].title+"</button>\n";o+="<div id=\"content\"></div>\r\n\r\n<script>\r\n    $('button').click(function() {\r\n        var contents = database[$(this).attr('id')];\r\n        content = parse.jodakon(parse.image_urls(contents.content, contents.topic));\r\n        $('#content').html(content);\r\n    });\r\n    $('button').addClass('fluid ui button');\r\n</script>",$(".main-container").html(o)})},"text"):$(".link").click(function(){window.location.hash=$(this).attr("id"),window.location.reload()});