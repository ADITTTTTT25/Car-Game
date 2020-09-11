class Game {
    constructor(){

    }
    getState(){
        var dbRef = database.ref("gameState");
        dbRef.on("value",function(data){
                gameState = data.val();
        })
    }

    updateState(state){
         database.ref("/").update({
             gameState:state
         });
    }
    async start(){
        if(gameState === 0){
            player = new Player();
            var pcref = await database.ref("playerCount").once("value");
            if(pcref.exists()){
                playerCount = pcref.val();
                player.getCount();
            }
            form = new Form();
            form.display();
            car1 = createSprite(100,200);
            car2 = createSprite(200,200);
            car3 = createSprite(400,200);
            car4 = createSprite(600,200);
            cars = [car1,car2,car3,car4];
            car1.addImage(car1_img);
            car2.addImage(car2_img);
            car3.addImage(car3_img);
            car4.addImage(car4_img);
        }
    }

    play(){
        Player.getPlayerINFO();
        player.getCarsAtEnd();
        console.log(carsAtEnd);

        form.hide();
        textSize(25);
        text("Game Start",120,100);
        if(allPlayers!== undefined){
            var index = 0;
            var carX = 430;
            var carY;
            
            background(ground_img);
            image(track_img,0,-displayHeight*4,displayWidth,displayHeight*5);
            for(var p in allPlayers){
                carX = carX + 350;
                carY = displayHeight - allPlayers[p].distance;
                index = index + 1;

                cars[index - 1].x = carX;
                cars [ index - 1].y = carY;
                if(index === player.index){
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index - 1].y;
                    stroke(10);
                    fill("Red");
                    ellipse(carX,carY,60,60);
                }
                
            }
        }
        if(keyIsDown(UP_ARROW) && player.index != null){
            player.distance = player.distance + 50;
            player.update();

        }

        if(player.distance > 7000){
            gameState = 2;
            player.rank = player.rank + 1;
            Player.updateCarsAtEnd(player.rank);
            player.update();
        }
        drawSprites();
    }  
    
    end(){
        player.getCarsAtEnd();
        console.log(player.rank);
    }
}