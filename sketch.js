
var dog,dogImg,dogImg1;
var database;
var foodS,foodStock; 
var lastFed;
var fedTime,feed,addFood,foodObj;

  function preload(){ 
    dogImg=loadImage("images/dogImg.png");
     dogImg1=loadImage("images/dogImg1.png");
     } 
    
     //Function to set initial environment 
     function setup() { 
       database=firebase.database(); 
       createCanvas(1000,400); 
       
      foodObj=new Food();

       dog=createSprite(250,300,150,150);
        dog.addImage(dogImg); 
        dog.scale=0.15; 
        
        foodStock=database.ref('Food');
         foodStock.on("value",readStock); 
         
         feed=createButton("Feed The Dog");
          feed.position(700,95);
      feed.mousePressed(feedDog);

      addFood=createButton("Add Food");
      addFood.position(800,95);
      addFood.mousePressed(addFoods);

        
     }
   

// function to display UI 
function draw() { 
  background(46,139,87); 
  foodObj.display();
fedTime=dataBase.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});



fill(255,255,254);
textSize15();
if(lastFed>=12){
  text("Last Feed :"+lastFed%12+"PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30)
}else{
  text("Last Feed:"+ lastFed+"AM",350,30);
}

    drawSprites(); 
   
     } 
     //Function to read values from DB function
      function readStock(data)
      { 
        foodS=data.val(); 
        foodObj.updateFoodStock(foodS);
      } 

    //Function for feedDog here
    function feedDog(){
      dog.addImage(happyDog)

      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
      database.ref('/').update({
          Food:foodObj.getFoodStock(),
          FeedTime:hour()
      })
    }
     
//Function for addFoods here
function addFoods(){

  foodS++;
database.ref('/').update({
  Food:foodS
})

}