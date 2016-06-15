//alert($('.row-account_id').find("td").html());
//alert($('.row-access_token').find("td").html());

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'get_admob_info') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument		
		console.log($('.row-account_id'));
        sendResponse({acc_id: $('.row-account_id').find("td").html(), access_token: $('.row-access_token').find("td").html()});
		
    }
});