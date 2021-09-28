<?php
	$to = "bthomson@cinci.rr.com" ;
	$from = $_REQUEST['email'] ;
	$name = $_REQUEST['name'] ;
	$message = $_REQUEST['message'] ;
	$headers = "From: $from";
	$subject = "www.karashaythomson.com Contact Data";
	
	$fields = array();
	$fields{"name"} = "Name";
	$fields{"email"} = "Email";
	$fields{"message"} = "Message";
	
	$body = "We have received the following information:\n\n"; 
	
	foreach ($fields as $a => $b) {
		$body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]);
	}
	
	$headers2 = "From: karashay@karashaythomson.com";
	$subject2 = "Thank you for contacting me";
	$autoreply = "Thank you for contacting me. Somebody will get back to you as soon as possible.";
	
	if ($from == '') {
		print "You have not entered an email, please go back and try again";
	}
	else {
		if ($name == '') {
			print "You have not entered a name, please go back and try again";}
		else {
			$send = mail($to, $subject, $body, $headers);
			$send2 = mail($from, $subject2, $autoreply, $headers2);
			if ($send) {
				header( "Location: http://www.karashaythomson.com/Test/contacts.html" );
			}
			else {
				print "We encountered an error sending your mail, please notify webmaster@karashaythomson.com";
			}
		}
	}
?> 