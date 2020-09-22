
import React, { useEffect, useRef} from "react";


const Whiteboard = (props) => {
    
    const whiteboardRef = useRef()
    const colorsRef = useRef()
    const {connection, pair, roomLobby} = props
    console.log(connection, "<<<--- connection")

    let drawing = false;
    let current = {color:'black'}
    
    useEffect(()=>{

        let canvas = whiteboardRef.current;
        let context = canvas.getContext('2d');

        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mouseout', onMouseUp, false);
        canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
        
        //Touch support for mobile devices
        canvas.addEventListener('touchstart', onMouseDown, false);
        canvas.addEventListener('touchend', onMouseUp, false);
        canvas.addEventListener('touchcancel', onMouseUp, false);
        canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);
    
        connection.on('recieveDrawing', onDrawingEvent);
    
        window.addEventListener('resize', onResize, false);
        onResize();
  
        function drawLine(x0, y0, x1, y1, color, emit){
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.stroke();
            context.closePath();
        if (!emit) { return; }
        let w = canvas.width;
        let h = canvas.height;
        const data = {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
        }
        sendDrawing(data)
        // connection.emit("drawing", { pair, roomLobby, data});
        }
    
        function onMouseDown(e){
            drawing = true;
            current.x = e.clientX||e.touches[0].clientX;
            current.y = e.clientY||e.touches[0].clientY;
        }
    
        function onMouseUp(e){
            if (!drawing) { return; }
            drawing = false;
            drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
        }
    
        function onMouseMove(e){
            if (!drawing) { return; }
            drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
            current.x = e.clientX||e.touches[0].clientX;
            current.y = e.clientY||e.touches[0].clientY;
        }
    
       
    
        // limit the number of events per second
        function throttle(callback, delay) {
            let previousCall = new Date().getTime();
            return function() {
                let time = new Date().getTime();
        
                if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
                }
            };
        }
    
        function onDrawingEvent(data){
            console.log(data, "<<<--- drawing event client")
            let w = canvas.width;
            let h = canvas.height;
            drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
        }
    
        // make the canvas fill its parent
        function onResize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

    },[current])    

    function onColorUpdate(e){
        current = {color: e.target.className.split(' ')[1]};
    }

    function sendDrawing(data){
        console.log('here')
        connection.emit("drawing", data);
    }


    return (
        <>
            <canvas ref={whiteboardRef} className="whiteboard" ></canvas>

            <div ref={colorsRef} className="colors">
                <button className="color black" onClick={onColorUpdate} ></button>
                <button className="color red" onClick={onColorUpdate} ></button>
                <button className="color green" onClick={onColorUpdate} ></button>
                <button className="color blue" onClick={onColorUpdate} ></button>
                <button className="color yellow" onClick={onColorUpdate} ></button>
            </div>
        </>
    )
  
  };

  export default Whiteboard;