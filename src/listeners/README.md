# Listeners

Listeners are (obviously) counter-parts of corresponding event (or events). Each and every file
in this directory (`/src/listeners`) will be automatically initialized whenever it exports an
initialization function. Preferably as default export.

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

## Reduce Listeners

Whenever there is a need to emit an event as a consequence of other events (there is a one-to-many
relation between emitted and listened events) a listener MUST listen the required events and keep
track of them. When all the listened events were emitted the very listener emits its event. This
kind of listeners are called 'reduce listeners'.
