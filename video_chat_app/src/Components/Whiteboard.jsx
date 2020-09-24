import React, { useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styling/styles";
import CreateIcon from '@material-ui/icons/Create';


const Whiteboard = (props) => {
  const whiteboardRef = useRef();
  const colorsRef = useRef();
  const { connection, pair, roomLobby, isYourGo } = props;
  let drawing = false;
  let current = { color: "black" };

  useEffect(() => {
    let canvas = whiteboardRef.current;
    let context = canvas.getContext("2d");

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

    connection.on("recieveDrawing", onDrawingEvent);

    window.addEventListener("resize", onResize, false);
    onResize();

    function drawLine(x0, y0, x1, y1, color, emit) {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();
      if (!emit) {
        return;
      }
      let w = canvas.width;
      let h = canvas.height;
      const data = {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
      };
      sendDrawing(data);
    }

    function onMouseDown(e) {
      if (isYourGo) {
        drawing = true;
        current.x = e.clientX;
        current.y = e.clientY;
      }
    }

    function onMouseUp(e) {
      if (isYourGo) {
        if (!drawing) {
          return;
        }
        drawing = false;
        drawLine(
          current.x,
          current.y,
          e.clientX,
          e.clientY,
          current.color,
          true
        );
      }
    }

    function onMouseMove(e) {
      if (isYourGo) {
        if (!drawing) {
          return;
        }
        drawLine(
          current.x,
          current.y,
          e.clientX,
          e.clientY,
          current.color,
          true
        );
        current.x = e.clientX;
        current.y = e.clientY;
      }
    }

    // limit the number of events per second
    function throttle(callback, delay) {
      let previousCall = new Date().getTime();
      return function () {
        let time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    }

    function onDrawingEvent(data) {
      let w = canvas.width;
      let h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    // make the canvas fill its parent
    function onResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, [current]);

  function onColorUpdate(e) {
    current = { color: e.target.className.split(" ")[1] };
  }

  function sendDrawing(data) {
    connection.emit("drawing", { pair, roomLobby, data });
  }

  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={1} >
      <Grid item  xs={1} ref={colorsRef} className="colors" direction="column" alignItems="flex-start" >
        <button className="color icon" ><CreateIcon/></button>
        <button className="color black" onClick={onColorUpdate}></button>
        <button className="color red" onClick={onColorUpdate}></button>
        <button className="color green" onClick={onColorUpdate}></button>
        <button className="color blue" onClick={onColorUpdate}></button>
        <button className="color yellow" onClick={onColorUpdate}></button>
      </Grid>
      <Grid item xs={11} >
      <canvas ref={whiteboardRef} className="whiteboard"></canvas>
      </Grid>
    </Grid>
  );
};

export default Whiteboard;
