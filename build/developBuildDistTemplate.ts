(()=>{
    const webSocket = new WebSocket("ws://localhost:5001");
    webSocket.onmessage = (event)=>{
        if(event.data === "reload"){
            window.location.reload();
        }
    }
})()

