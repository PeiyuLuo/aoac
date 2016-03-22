/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        alert("Here");
        document.getElementById('page1').addEventListener('load',
            function() {

                var tapEnabled = true; //enable tap take picture
                var dragEnabled = false; //enable preview box drag across the screen
                var toBack = false; //send preview box to the back of the webview
                var rect = {x: 100, y: 100, width: 200, height:200};
                cordova.plugins.camerapreview.startCamera(rect, "front", tapEnabled, dragEnabled, toBack)

        } ,false);

        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        app.receivedEvent('deviceready');

        cordova.plugins.camerapreview.setOnPictureTakenHandler(function(result){
            document.getElementById('originalPicture').src = result[0];//originalPicturePath;
            document.getElementById('previewPicture').src = result[1];//previewPicturePath;
      });

        
        document.getElementById('takePictureButton').addEventListener('mousedown', 
            function() {
                cordova.plugins.camerapreview.takePicture({maxWidth:640, maxHeight:640});
            }
            ,false);        
    },

    onStartCamera: function() {
      var tapEnabled = true;
      var dragEnabled = true;
      var toBa ck = false;
      var rect={x:0,y:0,width:375,height:500};
      cordova.plugins.camerapreview.startCamera(rect, "rear", tapEnabled, dragEnabled, toBack);
    },

    onTakePicture: function() {
      cordova.plugins.camerapreview.takePicture({maxWidth:350, maxHeight:500});
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
