var registJS = (function() {
    var scripts = {};
    return {
      add: function(key, func) {
        if (key.indexOf('.') > -1) {
          key = key.substr(0, key.lastIndexOf('.'));
        }
        var attr = key.split('/');
        if(attr.length == 1){
          scripts[key] = func;  
        }else{
          var tempScript = scripts;
          for(var i=0,il=attr.length; i<il; i++){
            if(i < il - 1){
              if(tempScript[attr[i]] === undefined){
                tempScript[attr[i]] = {};
              }
            }else{
              tempScript[attr[i]] = func;
            }
            tempScript = tempScript[attr[i]];
          }
        }
      },
      get: function(key) {
        if (key.indexOf('.') > -1) {
          key = key.substr(0, key.lastIndexOf('.'));
        }
        var attr = key.split('/');
        if(attr.length == 1){
          return scripts[key];
        }else{
          var tempScript = scripts;
          for(var i=0,il=attr.length; i<il; i++){
            if(i < il - 1){
              if(tempScript[attr[i]] === undefined){
                return null;
              }
            }else{
              return tempScript[attr[i]];
            }
            tempScript = tempScript[attr[i]];
          }
        }
        return null;
      }
    };
  })();
  
registJS.add("components/test.js", function(){
console.log("test.js");
});
registJS.add("data/data.js", function(){
console.log("this is a data.js");
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiY29tcG9uZW50cy90ZXN0LmpzIiwiZGF0YS9kYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaERBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZWdpc3RKUyA9IChmdW5jdGlvbigpIHtcclxuICAgIHZhciBzY3JpcHRzID0ge307XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhZGQ6IGZ1bmN0aW9uKGtleSwgZnVuYykge1xyXG4gICAgICAgIGlmIChrZXkuaW5kZXhPZignLicpID4gLTEpIHtcclxuICAgICAgICAgIGtleSA9IGtleS5zdWJzdHIoMCwga2V5Lmxhc3RJbmRleE9mKCcuJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYXR0ciA9IGtleS5zcGxpdCgnLycpO1xyXG4gICAgICAgIGlmKGF0dHIubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgc2NyaXB0c1trZXldID0gZnVuYzsgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdmFyIHRlbXBTY3JpcHQgPSBzY3JpcHRzO1xyXG4gICAgICAgICAgZm9yKHZhciBpPTAsaWw9YXR0ci5sZW5ndGg7IGk8aWw7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGkgPCBpbCAtIDEpe1xyXG4gICAgICAgICAgICAgIGlmKHRlbXBTY3JpcHRbYXR0cltpXV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICB0ZW1wU2NyaXB0W2F0dHJbaV1dID0ge307XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0ZW1wU2NyaXB0W2F0dHJbaV1dID0gZnVuYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wU2NyaXB0ID0gdGVtcFNjcmlwdFthdHRyW2ldXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgaWYgKGtleS5pbmRleE9mKCcuJykgPiAtMSkge1xyXG4gICAgICAgICAga2V5ID0ga2V5LnN1YnN0cigwLCBrZXkubGFzdEluZGV4T2YoJy4nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhdHRyID0ga2V5LnNwbGl0KCcvJyk7XHJcbiAgICAgICAgaWYoYXR0ci5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICByZXR1cm4gc2NyaXB0c1trZXldO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdmFyIHRlbXBTY3JpcHQgPSBzY3JpcHRzO1xyXG4gICAgICAgICAgZm9yKHZhciBpPTAsaWw9YXR0ci5sZW5ndGg7IGk8aWw7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGkgPCBpbCAtIDEpe1xyXG4gICAgICAgICAgICAgIGlmKHRlbXBTY3JpcHRbYXR0cltpXV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHJldHVybiB0ZW1wU2NyaXB0W2F0dHJbaV1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRlbXBTY3JpcHQgPSB0ZW1wU2NyaXB0W2F0dHJbaV1dO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9KSgpO1xyXG4gICIsInJlZ2lzdEpTLmFkZChcImNvbXBvbmVudHMvdGVzdC5qc1wiLCBmdW5jdGlvbigpe1xuY29uc29sZS5sb2coXCJ0ZXN0LmpzXCIpO1xufSk7IiwicmVnaXN0SlMuYWRkKFwiZGF0YS9kYXRhLmpzXCIsIGZ1bmN0aW9uKCl7XG5jb25zb2xlLmxvZyhcInRoaXMgaXMgYSBkYXRhLmpzXCIpO1xufSk7Il19
