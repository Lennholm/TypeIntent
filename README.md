TypeIntent
==========

Tracks when a user types in a text field and determines when the user is finished typing and then fires a bound handler

It is common to add event listeners to user interaction on text input fields, such as the `keyup` and `keydown` events in order to pre-process the input from the user. However, it's not always necessary or even desirable to do this on every single key press while the user is till typing. For instance, when making ajax calls or other requests which may result in many requests being made simultaneously and choke the connection.

This script will add a timeout for the handler after every key press and if an additional key press is made before this time runs out the timeout is renewed. The script adapts this timeout to the speed the user is typing by measuring how much time passes between key presses and using this value plus an additional grace peroid when renewing the timeout.
This means that the faster the typing, the more the delay before the handler is fired is reduced.


TypeIntent needs to be bound to an element to work on that element, this is done with the `TypeIntent.on()` function. The function takes the element as the first argument and an object with parameters as the second, here are the possible parameters:

`handler`: The function that is to be executed when the user stops typing. Required.

`maxWait`: The max timeout (ms) before the handler is being executed, the timeout will never exceed this value. Default is 800 ms.

`grace`: The time (ms) that will be added to the typing speed when it's applied as the timeout. Negative values are possible but not recommended. Default is 150 ms.

If you don't need to specify the `maxWait` and `grace` parameters, the second argument can be the handler itself rather than the object.


Imagine if a user is typing with a speed of two key presses per second, that means 500 ms between every key press. With a grace period of 150 ms this means the timeout will be set to 650 ms. If a key press happens within those 650 milliseconds the timeout will be recalculated and renewed, otherwise the handler will be executed when the 650 ms timeout runs out.

If the user is typing with a speed that means 750 ms between key presses the timeout will be calculated to 900 ms with the 150 ms grace period added. However, since the max timeout is 800 ms, the timeout will still be 800 ms.

It's recommended to set the `maxWait` a bit higher in scripts that run on mobile devices since typing is usually slower there.


TypeIntent also works as a jQuery plugin if jQuery is loaded on the the same page. A `typeIntent()` method is added to the jQuery object which takes the same object (or handler function) as `TypeIntent.on()` as an argument.

Ex: `jQuery("input#search").typeIntent({handler: typeHandler});`
