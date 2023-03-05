status="";
objects=[];

function preload(){
    load_sound=loadSound("alarm_sound.mp3");
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.position(200,300);
    video=createCapture(VIDEO);
    video.size(500,400);
    video.hide();
}

function modelLoaded(){
    console.log("Model loaded");
    status=true;

}

function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,500,400);
    if(status!=""){
        object_detector.detect(video, gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(var i=0; i<objects.length; i++){
           document.getElementById("status").innerHTML="Status: Detected Objects";
           document.getElementById("name_of_obj").innerHTML="Name of object: "+find;
           fill(r,g,b);
           percent=Math.round(objects[i].confidence*100);
           text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
           noFill();
           stroke(r,g,b);
           rect(objects[i].x-20,objects[i].y-20,objects[i].width,objects[i].height); 
        if(objects[i].label==find){
            document.getElementById("status").innerHTML="Status: Object Found";
            load_sound.stop();
        }else{
            load_sound.play();
            document.getElementById("status").innerHTML="Status: Object Not Found";
        }
        if(objects.length==0){
            load_sound.play();
            document.getElementById("status").innerHTML="Status: Object Not Found";
        }  
    }
    }
}
    function enter(){
        object_detector=ml5.objectDetector('cocossd',modelLoaded);
        document.getElementById("status").innerHTML="Status: Detecting Objects";
        find=document.getElementById("object").value;
}