# Listeners

Listeners are (obviously) counter-parts of corresponding event (or events). Each and every file
in this directory (`/src/listeners`) will be automatically initialized whenever it exports an
initialization method. Preferably as default export.
The instance of the registrar event bus will be passed as the first argument of the initialization
method to register (`bus.$on`) callbacks.

On initialization process the listener SHOULD register its appropriate callback to the event or
the events interested in. One thing to note here those callbacks SHOULD NOT be exported. Also know
that the listeners can emit events too.

Listeners aren't meant for replace with the store. They may and should run in co-operation. Mostly
a listener dispatches an action on the store to affect the application state. For example ...
Also they aren't for replace with the component-parent event mechanism. They are primarily meant
for un-related, loosely coupled JavaScript modules (files). For example when user logs in and
the routes were calculated one might reduce the application's routes in order to show them in a
component. Even though the process finally handled by a component, intermediary steps are handled
by a listener; a reduce-listener.

It is not advised to use listeners with real-time data as the reactive propagation capabilities of
Vue.js might provide better performance than the event bus. Primary use-case is to bootstrap the
application. That is when the store and the router is ready rely on them mostly. And do NOT emit any
event from store mutations or actions.

Naturally, any listener that depends on other event(s) MUST be initialized, therefore registered
before the depending ones. This can be achieved by numbering the listener file names
(e.g. 10_listener-1, 11_listener-2, 20_reduce_listener_12).

## Reduce Listeners

Whenever there is a need to emit an event as a consequence of other events (there is a one-to-many
relation between emitted and listened events) a listener MUST listen the required events and keep
track of them. When all the listened events were emitted the very listener emits its event. This
kind of listeners are called 'reduce listeners'.
