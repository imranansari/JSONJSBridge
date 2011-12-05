/*
 Copyright (c) 2010, Dante Torres All rights reserved.
 
 Redistribution and use in source and binary forms, with or without 
 modification, are permitted provided that the following conditions 
 are met:
 
 * Redistributions of source code must retain the above copyright 
 notice, this list of conditions and the following disclaimer.
 
 * Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in the 
 documentation and/or other materials provided with the distribution.
 
 * Neither the name of the author nor the names of its 
 contributors may be used to endorse or promote products derived from 
 this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 POSSIBILITY OF SUCH DAMAGE.
 */

/*
 This javascript code is part of the JSBridge api. It is used to communicate 
 data to Objective-C code through a UIWebView.
 */

// Counts the number of objects communicated to the Objective-C code. 
// It is used to index data in the JSBridge_objArray.
var JSBridge_objCount = 0;

// Keeps the objects that should be communicated to the Objective-C code.
var JSBridge_objArray = new Array();

/*
 Receives as input an image object and returns its data
 encoded in a base64 string.
 
 This piece of code was based on Matthew Crumley's post
 at http://stackoverflow.com/questions/934012/get-image-data-in-javascript.
 */
function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
	
	var newImg = new Image();
	newImg.src = img.src;
    canvas.width = newImg.width;
    canvas.height = newImg.height;
	
    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(newImg, 0, 0);
	
    // Get the data-URL formatted image
    var dataURL = canvas.toDataURL("image/png");
	
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


/*
	Builds an empty instance of a JSBridge object. 
 */
function JSBridgeObj()
{
	this.objectJson = "";
	this.addObject = JSBridgeObj_AddObject;
	this.sendBridgeObject = JSBridgeObj_SendObject;
}

/*
	This mnethod receives as input a javascript object, and returns 
	a string with the json representation for the object. The return string is similar to:
 
	"<objectId>" : { "value": "<object_value>", "type": "<object_type>" }
 */
function JSBridgeObj_AddObjectAuxiliar(id, obj)
{
	var result = "";
	if(typeof(obj) != "undefined")
	{
		if(isObjAnArray(obj))
		{
			var objStr;
			var length = obj.length;
			
			objStr = "{";
			for(i = 0; i < length; i++)
			{
				if(objStr != "{")
				{
					objStr += ", ";
				}
				objStr += JSBridgeObj_AddObjectAuxiliar(("obj" + i), obj[i]);
			}
			
			objStr += "}";
			
			result = "\"" + id + "\": { \"value\":" + objStr + ", \"type\": \"array\"}";
		}
		else
		{
			var objStr;
			var objType;
			if(typeof(obj) == "object" && obj.nodeName == "IMG")
			{
				objStr = getBase64Image(obj);
				objType = "image";
			} else
			{
				objStr = obj;
				objType = typeof(obj);
			}
			
			result = "\"" + id + "\": { \"value\":" + "\"" + objStr + "\", \"type\": \"" + objType + "\"}";
		}
	}
	return result;
}

/*
	The addObject method implementation for the JSBridge object.
 */
function JSBridgeObj_AddObject(id, obj)
{
	var result = JSBridgeObj_AddObjectAuxiliar(id, obj);
	if(result != "")
	{
		if(this.objectJson != "")
		{
			this.objectJson += ", ";
		}
		this.objectJson += result;
	}
}


/*
	This method sends the object to the Objective-C code. Basically, 
	it tries to load a special URL, which passes the object id.
 */
function JSBridgeObj_SendObject()
{
	JSBridge_objArray[JSBridge_objCount] = this.objectJson;
	
	window.location.href= "JSBridge://ReadNotificationWithId=" + JSBridge_objCount;
	
	JSBridge_objCount++;
}

/*
	This method is invoked by the Objective-C code. It retrieves the json string representation
	of a JSBridge object given its id.
 */
function JSBridge_getJsonStringForObjectWithId(objId)
{
	var jsonStr = JSBridge_objArray[objId];
	
	JSBridge_objArray[objId] = null;
	
	return "{" + jsonStr + "}";
}


/*
	Checks if an object is an array.
 
	This piece of code was based on a code rertrieved from
	http://www.planetpdf.com/developer/article.asp?ContentID=testing_for_object_types_in_ja.
 */
function isObjAnArray(obj) {
	
	if (typeof(obj) == 'object') {  
		var criterion = obj.constructor.toString().match(/array/i); 
 		return (criterion != null);  
	}
	return false;
}