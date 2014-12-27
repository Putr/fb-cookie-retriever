Facebook cookie retriever
=========================

This phantomjs scripts logs a user into facebook and saves the asociated cookies. You can than use these cookies to send reverse enginered ajax requests to facebook with proper login credentials.

How to use
----------

1. Copy config.json.dist to config.json and add login credentials

2. Run with:

  phantomjs --ssl-protocol=tlsv1 main.js

Cookies will be dumped into cookiejar.js

You can use the '--print' option to also print the json encoded cookie data.

