
// namespace
Window.application = {
  editor:"",
  apiLimit:1500
};

// Dom Ready
$(function(){

  // Initilize CodeMirror Editor
  Window.application.editor = CodeMirror.fromTextArea(document.getElementById("in"), {
    mode: 'gfm',// github-flavored-markdown
    lineNumbers: true,
    matchBrackets: true,
    theme: "default",
    onFocus:function(){
      $(".CodeMirror-scroll").addClass("focus");
    },
    onBlur:function(){
      $(".CodeMirror-scroll").removeClass("focus");
    },
    onCursorActivity: function() {
      Window.application.editor.setLineClass(hlLine, null, null);
      hlLine = Window.application.editor.setLineClass(Window.application.editor.getCursor().line, null, "activeline");
    }
  });
  var hlLine = Window.application.editor.setLineClass(0, "activeline");

  // Initialize html view
  convert();
})

// convert markdown to html
function convert(){
  // save CodeMirror to textarea
  Window.application.editor.save();

  // hide html
  var progressbar="<div id='progress' class='progress progress-info progress-striped active'><div id='bar' class='bar' style='width: 100%'></div></div>";
  $("#out").fadeOut().empty().append(progressbar); 
  
  // call github's API
  $.ajax({
    "url":"https://api.github.com/markdown/raw",
    "type":"POST",
    "contentType":"text/plain",
    "data":$("#in").val(),
    "complete":function(jqXHR, textStatus){
      // api limit count
      // console.log(jqXHR.getResponseHeader("X-RateLimit-Remaining"));
      Window.application.apiLimit = jqXHR.getResponseHeader("X-RateLimit-Remaining");
    }
  })
  .done(function(data){
    // console.log("done");
    // render html data
    $("#out").addClass("display-none").append(data).fadeIn();    
    $("#progress").remove();
  })
  .fail(function(data){
    // console.log("fail");
    // alert dialogue
  })
  .always(function(data){
    // console.log("always");
    // do nothing.
  })
}
