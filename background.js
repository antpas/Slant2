//handling url pull from each active chrome tab
chrome.tabs.onUpdated.addListener(function(id,activeInfo,tab)
{


  	var tablink = tab.url;

    console.log(tablink.substring(0,4)); //display url on console

     	if (tablink.substring(0,4) == 'http')
     	{
     		var request = new XMLHttpRequest(); // initiate http request

				// Open a new connection, use GET method on the api endpoint
				request.open('POST', 'https://3xe435ebm9.execute-api.us-east-2.amazonaws.com/Dev/classifyurl', true);

				var temp = '{"data": "'+tablink+'"}' //append url in a new variable for expected format

				var payload = JSON.parse(temp)

				console.log(payload);

				var output = request.send(temp);

				request.onreadystatechange = function()
				{
					//Wow this is ugly
					var out = request.responseText;
					out = out.substr(1).slice(0, -1);
					out = out.replace(/u'(?=[^:]+')/g, "'")
					out = JSON.parse(out);
					//console.log(out);
					var prob = out.prob
					prob = Math.trunc(prob[0] * 100)
					console.log(prob)
					var party = out.label
					party = party[0]
					party = party.replace("__label__", "")
					console.log(party)
					var x = document.getElementById("SlantPopup");
					x.querySelector('.score').innerHTML = prob + "%"; //current way to display labels in popup
					var y = document.getElementById("SlantPopup2");
					y.querySelector('.party').innerHTML = party;
				};
	    }

});
