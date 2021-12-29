song="";
leftwristx=0;
leftwristy=0;
scoreleftwrist=0;
rightwristx=0;
rightwristy=0;
scorerightwrist=0;

function preload(){
song=loadSound("music.mp3");
}                                                                                                                                                                                                                                                                                                                                                                           

function setup(){
    canvas=createCanvas(500,300);
    canvas.center();
     video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotPoses);

}

function modelLoaded(){
    console.log("Posenet is initialized");
}

function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("score leftwrist "+ scoreleftwrist);
    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("score rightwrist "+ scorerightwrist);
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log('leftwrist x = '+ leftwristx+'   leftwrist y = '+ leftwristy);
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log('rightwrist x = '+ rightwristx+'   rightwrist y = '+ rightwristy);
  

    
}
}

function draw(){
    image(video,0,0,500,300);
    fill("#000000")
    stroke("#ffffff");
    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        if(rightwristy>0 && rightwristy<=100){
 document.getElementById("leftone").innerHTML="speed = 0.5X";
 song.rate(0.5);
        }
        else if (rightwristy>100 && rightwristy<=200){
            document.getElementById("leftone").innerHTML="speed = 1X";
            song.rate(1);
                   }   
                   else if (rightwristy>200 && rightwristy<=300){
                    document.getElementById("leftone").innerHTML="speed = 1.5X";
                    song.rate(1.5);
                }        
                else if (rightwristy>300 && rightwristy<=400){
                    document.getElementById("leftone").innerHTML="speed = 2X";
                    song.rate(2);
                }        
                else if (rightwristy>400 && rightwristy<=500){
                    document.getElementById("leftone").innerHTML="speed = 2.5X";
                    song.rate(2.5);
                }        
    }
    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        numberleftwristy=Number(leftwristy);
        remove_decimal=floor(numberleftwristy);
        volume=remove_decimal/500;
        document.getElementById("rightone").innerHTML="volumn="+volume;
        song.setVolume(volume);
    }
    }

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
