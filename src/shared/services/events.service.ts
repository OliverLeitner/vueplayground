export class EventsHandler {
    public addTouchHandler(
        setPickPosition: Function, 
        clearPickPosition: Function
        ) {

        // mouse
        window.addEventListener('mousemove', setPickPosition.bind(this));
        window.addEventListener('mouseout', clearPickPosition.bind(this));
        window.addEventListener('mouseleave', clearPickPosition.bind(this));

        // mobile
        window.addEventListener('touchstart', (event) => {
            // prevent the window from scrolling
            event.preventDefault();
            setPickPosition(event.touches[0]);
        }, {passive: false});
           
        window.addEventListener('touchmove', (event) => {
          setPickPosition(event.touches[0]);
        });
           
        window.addEventListener('touchend', clearPickPosition.bind(this));
    }
}