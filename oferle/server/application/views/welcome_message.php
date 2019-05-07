<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
  $("button").click(function(){
  	//window.location.href = "https://test.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9Gmy2zmPB01ql_FYDk4WvpIbsZuZTsR7Rd3WB.iy8XwssLXER4XBa7dA_8u3cd6QdE603otcdZmR8lKYN&username=test.salesforce.com&password=Junior32&redirect_uri=http%3A%2F%2Flocalhost%2Fofferlane%2Fsales_force%2Fsales_force_callback";
    /*$.ajax({
    	url: "http://localhost/offerlane/sales_force/sales_force_oauth",
    	success: function(result){
    		$("#div1").html(result);
    		//window.location.href = result;
    	}
	});*/
	$.ajax({
		url: 'https://test.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9Gmy2zmPB01ql_FYDk4WvpIbsZuZTsR7Rd3WB.iy8XwssLXER4XBa7dA_8u3cd6QdE603otcdZmR8lKYN&username=test.salesforce.com&password=Junior32&redirect_uri=http%3A%2F%2Flocalhost%2Fofferlane%2Fsales_force%2Fsales_force_callback',
		type:'POST',
		dataType: 'json',
		crossDomain : true,
		success: function(result) {
			alert("Hhel")
    		$("#div1").html(result);
		}
	    
	});
  });
});
</script>
</head>
<body>

<!-- <div id="div1"><h2>Let jQuery AJAX Change This Text</h2></div>

<button>Get External Content</button> -->
<h1>Offerlane</h1>

</body>
</html>
