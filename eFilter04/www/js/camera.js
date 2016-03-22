var ctx;
var myImg;
var imgData;
var imgP;
var w=382;
var h=382;
var frontCamera = true;
var firstPhoto = true;



//////clmtracker script///////
        var IndexCount = 0;
        var emotionIndex = [];
        var cc = document.getElementById('image').getContext('2d');
        var overlay = document.getElementById('overlay');
        var overlayCC = overlay.getContext('2d');
        var er;
      
        var img = new Image();
        img.onload = function() {
          cc.drawImage(img,0,0,w, h);
        };      
        img.src = 'img/franck_04117.jpg';

        // var img = document.getElementById('previewPicture');
        function drawEmotionImg(){
          cc.drawImage(myImg,0,0,w, h);
           document.getElementById('convergence').innerHTML = "";
          // document.getElementById('convergence').style.backgroundColor = "#00FF00";
        }
      
        var ctrack = new clm.tracker({stopOnConvergence : true});
        ctrack.init(pModel);

        var emotionData;
        var ec;
         ec = new emotionClassifier();
         ec.init(emotionModel);
         emotionData = ec.getBlank();  
        
        var drawRequest;
        
        function animateClean() {
          ctrack.start(document.getElementById('image'));
          drawLoop();

        }

        function drawLoop() {
          drawRequest = requestAnimFrame(drawLoop);
       
          if (ctrack.getCurrentParameters()) {         
              var cp = ctrack.getCurrentParameters();
              er = ec.meanPredict(cp);        
              
            if (er){       
              printEmotion();        
              //   console.log(er[0].value);///angry
              //   console.log(er[1].value);///sad
              //   console.log(er[2].value);///surprised
              //   console.log(er[3].value);///happy
              }
          }
        }
        
        // detect if tracker fails to find a face
        document.addEventListener("clmtrackrNotFound", function(event) {
          ctrack.stop();
          alert("The tracking had problems with finding a face in this image. Try selecting the face in the image manually.")
        }, false);
        
        // detect if tracker loses tracking of face
        document.addEventListener("clmtrackrLost", function(event) {
          ctrack.stop();
          alert("The tracking had problems converging on a face in this image. Try selecting the face in the image manually.")
        }, false);
        

        // detect if tracker has converged
        document.addEventListener("clmtrackrConverged", function(event) {
          document.getElementById('convergence').innerHTML = "CONVERGED";
          // document.getElementById('convergence').style.backgroundColor = "#00FF00";
          // stop drawloop
          cancelRequestAnimFrame(drawRequest);
        }, false);
        
        function printEmotion(){
          var ttt='';
          for (i=0; i<4; i++){
          ttt += er[i].emotion + ': ' + er[i].value.toFixed(3) + '<br/>' ;
          }
          document.getElementById("emotionText").innerHTML = ttt;
        }
        

//////end clmtracker script///////
      
////filter 

window.onload = function(){                         
};


function drawOringinal(){
   // ctx.drawImage(myImg,0,0,w,h); 
}

function grayFilter(){
    imgData = ctx.getImageData(0,0,w,h);
    imgP = imgData.data;
    
     for(var i = 0; i < imgP.length; i += 4) {
          var grayscale= 0.33*imgP[i]+0.5*imgP[i+1]+0.15*imgP[i+2];
          imgP[i]=grayscale;
          imgP[i+1]=grayscale;
          imgP[i+2]=grayscale;
     }
    ctx.putImageData(imgData,0,0);
}////end grayFilter

function rFilter(x){
   // drawOringinal();
   
   imgData = ctx.getImageData(0,0,w,h);
    var p = imgData.data;
     for(var i = 0; i < p.length; i += 4) {
          p[i]= p[i] + p[i+1]*x + p[i+2]*x;
          p[i+2] = p[i]*(-x)/4 + p[i+1]*x/3 + p[i+2];
     }
    ctx.putImageData(imgData,0,0);
}

function gFilter(x){
   // drawOringinal();
   
   imgData = ctx.getImageData(0,0,w,h);
    var p = imgData.data;
     for(var i = 0; i < p.length; i += 4) {
          p[i]= p[i] + p[i+2]*x;
          p[i+2] =  p[i+1]*x + p[i+2];
     }
    ctx.putImageData(imgData,0,0);
}
///////////////

