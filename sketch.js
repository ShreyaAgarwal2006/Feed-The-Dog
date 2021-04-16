var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed
var fedTime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedthedog=createButton("Feed the Dog");
  feedthedog.position(800,140);
  feedthedog.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  
  if(lastFed>=12){
    fill("white");
    text("Last Fed :  " + lastFed  % 12 +"PM",350,30);
  }else if(lastFed === 0){
    fill("white");
    text("Last Fed :  12 AM",350,30);
  }else{
    fill("white");
    text("Last Fed :  " + lastFed   +"AM",350,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  fedTime = hour();

  //write code here to update food stock and last fed time
    var food_stoke_val = foodObj.getFoodStock();
    if(food_stoke_val <=0 ){
      foodObj.updateFoodStock(food_stoke_val *0);
    }else{
      foodObj.updateFoodStock(food_stoke_val -1);
    }
    

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
    
  })
}
