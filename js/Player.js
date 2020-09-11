class Player {
    constructor(){
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = 0;

    }
    getCount(){
        var dbRef = database.ref("playerCount");
        dbRef.on("value",function(data){
                playerCount = data.val();
        })
    }
    
    updateCount(count){
         database.ref("/").update({
             playerCount:count
         });
    }

    update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
                name:this.name,
                distance:this.distance,
                rank:this.rank
        });
    }
    getCarsAtEnd(){
        var dbref = database.ref("carsAtEnd");
        dbref.on("value", (data)=>{
            this.rank = data.val();
            carsAtEnd = data.val();
        });
    }
    static updateCarsAtEnd(rank){
        database.ref("/").update({
            carsAtEnd:rank
        });
    }
    static getPlayerINFO(){
        var playerInfo = database.ref("players");
        playerInfo.on("value",(data)=>{
            allPlayers = data.val();
        });
    }
}