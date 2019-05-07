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