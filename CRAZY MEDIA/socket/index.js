const io = require('socket.io')(8400,{
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

const addUser = (userId, socketId) =>{
    !users.some((user)=>user.userId === userId) && users.push({userId, socketId});
};


const getUser = (userId)=> {
    return users.find(user=>user.userId === userId)
}

const removeUser = (socketId)=>{
    users= users.filter((user)=>user.socketId !== socketId)
}

io.on("connection",(socket)=>{
    console.log("A user connected");

    // take userId and socketId from user
    socket.on("addUser", userId=>{
        if(userId!==null){
            addUser(userId, socket.id);
        }
        io.emit("getUsers",users);
    })

    // send and get message
    socket.on("sendMessage",({id, senderId, receiverId, text, createdAt})=>{
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage",{
            id,
            senderId,
            text,
            createdAt
        })
    })
    
    // when disconnect
    socket.on("disconnect",()=>{
        console.log("a user disconnected!")
        removeUser(socket.id);
        io.emit("getUsers",users);
    })

    socket.on("forceDisconnect",()=>{
        console.log("a user disconnected!")
        removeUser(socket.id);
        io.emit("getUsers",users);
    })
})