(function(){try{var c="selectedcontent",a={pluginName:c};G_DEPlugin[c]=a;if(DEXTTOP.DEXT5.browser.ie&&7>=DEXTTOP.DEXT5.browser.ieVersion){var g=DEXTTOP.G_CURREDITOR._config.toolBar1.indexOf("p_selectedcontent"),h=DEXTTOP.G_CURREDITOR._config.toolBar2.indexOf("p_selectedcontent");-1<g&&DEXTTOP.G_CURREDITOR._config.toolBar1.splice(g,1);-1<h&&DEXTTOP.G_CURREDITOR._config.toolBar2.splice(h,1)}a.onInit=function(){};a.onClickToolIcon=function(k){try{1!=a.isProcess&&(a.isProcess=!0,command_p_selectedcontent_click())}catch(c){}finally{a.isProcess=
!1}};a.onDisableToolIcon=function(a){switch(a){case "cellSelectText":case "selectArea":return!0;default:return["p_selectedcontent"]}};a.onLoaded=function(){DEXT5_CONTEXT._setMenuOrg=DEXT5_CONTEXT._setMenu;DEXT5_CONTEXT._setMenu=function(a){DEXT5_CONTEXT._setMenuOrg(a);a=DEXTTOP.DEXT5.GetSelectedContent();if(""!==a.text){var f=getDialogDocument().getElementById("dext_context_iframe");if(f){var b=this._context_document.createElement("dd");b.id=id="context_p_selectedcontent";b.innerHTML='<div class="s_left"><span style="background: url('+
(DEXTTOP.G_CURREDITOR._config.webPath.plugin+c+"/images/icon.png")+') transparent no-repeat;"></span></div><div class="s_right">'+dext5_lang.plugins.selectedcontent.title+"</div>";var d=this._context_document.getElementById("ul_context_main"),e=this._context_document.createElement("dd");e.className="b_border";d.appendChild(e);d.appendChild(b);b.className=""!==a.text?"":"item_disabled";d=function(a){return function(b){var c=a.className.replace("on_mouseover","");a.className=c+(-1<a.className.indexOf("item_disabled")?
"":" on_mouseover");DEXTTOP.DEXT5.util.stopEvent(b)}}(b);e=function(a){return function(b){a.className=a.className.replace("on_mouseover","");DEXTTOP.DEXT5.util.stopEvent(b)}}(b);DEXTTOP.DEXT5.util.addEvent(b,"mouseover",d);DEXTTOP.DEXT5.util.addEvent(b,"mouseout",e);""!==a.text&&DEXTTOP.DEXT5.util.addEvent(b,"click",command_p_selectedcontent_click);window.setTimeout(function(){var a=DEXTTOP.DEXT5.util.parseIntOr0(f.style.height);f.style.height=a+26+"px"},1)}}}}}catch(l){}command_p_selectedcontent_click=
function(){"undefined"!==typeof DEXTTOP.dext_editor_plugin_custom_action&&DEXTTOP.dext_editor_plugin_custom_action({pluginName:c})}})();