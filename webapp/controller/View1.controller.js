/* eslint-disable */
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	
	"use strict";

	return Controller.extend("FioriSTK.TwitterFiori.controller.View1", {
	
		onInit: function (oEvent) {
			
			// Values for the Twitter API
			var customer_key = "SHlNwpltvYEsg1BC1diuKot31";
			var customer_secret = "1eN9mGy5vX6ABo2XHDLINpyQfUxbhS0QU80VvTGPNHM6I3MAJ4";
			var access_token = "90091282-akPR3mBoo5VxS1SMJ4ccJPYulSZdtmNHBLDfaEHZA";
			var access_token_secret = "5AjES1HTT0f6M5h0tEL4c8bVN4FHgvAwE9YlgGLu5ItO0";
			 
			var signing_key = customer_secret + "&"  +access_token_secret;
			
			var signature_method = "HMAC-SHA1";
			var authorization_version = "1.0";
			var method = "GET";
			var protocol = "https";
			var server = "api.twitter.com";
			var version = "1.1";
			var service = "search/tweets.json";
			
			var BaseURL = protocol + "://" +  server + "/" + version + "/" + service;
			
			// collecting parameters
			var callback = "callback=twitterCallback";
			var count = "count" + this.count;
			var languaje = "lang=" + this.lang;
			var oauth_consumer_key = "oauth_timestamp=" + customer_key + "&";
			var oauth_nonce = "oauth_nonce=" + "h0tEL4c8bV" + "&";
			var oauth_signature_method = "oauth_signature_method=" + signature_method + "&";
			var oauth_timestamp = "oauth_timestamp=" + Math.floor(Date.now()/ 1000) + "&";
			var oauth_token = "oauth_token=" + access_token + "&";
			var oauth_version = "oauth_version=" + access_token + "&";
			var query = "q=" + encodeURIComponent(oEvent.getParameter("query"));
			var result_type = "result_type=" + this.resultType;
			
			// create authorization parameters string
			var oauth_parameters = oauth_consumer_key + oauth_nonce + oauth_signature_method + oauth_timestamp + oauth_token + oauth_version;
			var searchOption = query + "&" + count + "&" + result_type;
			
			// create parameter string
			var parametersString = callback + "&" + count + "&" + languaje + "&" + oauth_parameters + query + "&" + result_type;
			
			// create signature string
			var signatureBaseString = method + "&" + encodeURIComponent(BaseURL) + "&" + encodeURIComponent(parametersString);
			
			window.console.log(" parametersString ::: " + parametersString);
			window.console.log(" SignatureString::::: " + signatureBaseString);
			
			jQuery.sap.require("FioriSTK.TwitterFiori.util.crypto-js-develop.src.hmac");
			jQuery.sap.require("FioriSTK.TwitterFiori.util.crypto-js-develop.src.enc-base64");
			
			//jQuery.sap.includeScript("http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/enc-base64-min.js");
			//jQuery.sap.includeScript("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.min.js");
			//jQuery.sap.includeScript("http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha1.js");
			//jQuery.sap.includeScript("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha1.js");
			
			var hash = CryptoJS.HmacSHA1(signatureBaseString, signing_key);
			var base64String = hash.toString(CryptoJS.enc.Base64);
			var oauth_signature = encodeURIComponent(base64String);
			
			var URL = BaseURL + "?" + searchOption + "&" + oauth_parameters + "oauth_signature=" + oauth_signature + "&" + language + "&" + callback;	
			
			var socialGetter = (function() {
			/* just a utility to do the script injection */
			function addScript(url) {
			var script = document.createElement('script');
			script.async = true;
			script.src = url;
			document.body.appendChild(script);
			}
			return {
			getTwitterTweets: function(url) {
			addScript(url);
			}
			};
			})();
			
			window.twitterCallback = function(data) {
			    if (data) {
	                var twitterResult = new sap.ui.model.json.JSONModel();
	                twitterResult.setData(data);
	                sap.ui.getCore().byId("__xmlview0").setModel(twitterResult, "twitterResult");
			    }
			};
			
			sap.ui.getCore().byId("__xmlview0").setModel(twitterResult, "twitterResult")
			socialGetter.getTwitterTweets(URL);
			
			
			/*
			var event = {
				"eventName": "SAPPHIRENOW"
			};
			var searchTerm = new sap.ui.model.JSONModel();
			searchTerm.setData(event);
			sap.ui.getCore().byId("__xmlview0").setModel(searchTerm);
			
			var twitterResult = new sap.ui.model.json.JSONModel();
			this.getView().setModel(twitterResult, "twitterResult");
			
			//this is the function we are going to define in the next steps
			this.callTwitter();
			*/
		}
	});
});