img = ""
status = ""
objects = []


function preload() {
    img = loadImage("dog_cat.jpg")
}

function setup() {
    canvas = createCanvas(640, 420)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(640,420)
    video.hide()
}

function start(){
    object_detector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects"
}

function modelLoaded() {
    console.log("modelLoaded")
    status = true
    object_detector.detect(video, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.log(error)

    } else {
        console.log(result)
        objects = result
    }
}

function draw() {
    image(video, 0, 0, 640, 420)
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("black");
            textSize(13)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " - " + percent + " % ", objects[i].x, objects[i].y);
            noFill();
            stroke("black");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
   

}