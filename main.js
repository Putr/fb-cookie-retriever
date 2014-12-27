/**
 * Facebook login cookie retriever
 * 
 * @author Rok Andrée <rok@andree.si>
 */

var fs     = require('fs');
var page   = require('webpage').create();
var system = require('system');

var args = system.args;

var CookieJar  = "cookiejar.json";
var ConfigFile = "config.json";
var LoginData  = {};

page.settings.userAgent = 'Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/534.34 (KHTML, like Gecko)';

// Reads configuraton file
if(fs.isFile(ConfigFile)) {
	var LoginData = JSON.parse(fs.read(ConfigFile));
} else {
	console.log("Missing config.json file");
}

/**
 * Event handler that trigers after page is loaded
 * @return {null} 
 */
page.onLoadFinished = function(){
	if(page.title == "Welcome to Facebook - Log In, Sign Up or Learn More"){
		page.evaluate(function(LoginData){
			console.log(LoginData.email);
		  	var frm = document.getElementById("login_form");
			frm.elements["email"].value = LoginData.email;
			frm.elements["pass"].value  = LoginData.pass;
		    frm.submit();
		}, LoginData);
		return;
	} else {
		var cookieJson = JSON.stringify(phantom.cookies);
		if (args[1] === '--print') {
			console.log(cookieJson);
		}

		fs.write(CookieJar, cookieJson, "w");
		
	}
	phantom.exit();
}

// Loads and exsisting cookie set
// This let's you call this script as often as you like to refresh the cookies,
// but it will not try to login everytime thereby triggering failsafes.
if(fs.isFile(CookieJar)) {
	Array.prototype.forEach.call(JSON.parse(fs.read(CookieJar)), function(x){
	    phantom.addCookie(x);
	});
}

// Actually start the script. 
page.open('https://www.facebook.com/');