// ==UserScript==
// @name       Bigger Tasks in GMail
// @namespace  http://neiti.at
// @version    1.0
// @description  Makes the tasks frame in GMail 500px high
// @match      https://mail.google.com/*
// @copyright  2013+, Markus Neubrand
// ==/UserScript==

var executed = false;

function enlarge() {
  if(!executed) {
    var iframe = document.getElementById('tasksiframe');
    if(iframe != null && iframe.parentNode != null) {
      // configuration of the observer:
      var config = { attributes: true, attributeFilter: [ "style" ] };
        
      // create an observer instance
      var observer = new WebKitMutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(iframe.parentNode.style.height != 0) {
                observer.takeRecords();
                observer.disconnect();
            	iframe.parentNode.style.height = '660px';
                iframe.contentDocument.getElementById(':sd.fc').style.height = '630px';
                observer.observe(iframe.parentNode, config);
            }
        });    
      });
  
      // pass in the target node, as well as the observer options
      observer.observe(iframe.parentNode, config);
        
      executed = true;
    }
    window.setTimeout(enlarge, 100);
  }
}

window.onload = enlarge;
