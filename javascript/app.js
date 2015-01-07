(function(global, $) {
  "use strict";


  // namespace
  var application = {
    editor: "",
    apiLimit: 1500,
    enabeAutoReload: false,
    enableShortcut: false,
    md: "",
    viewer: "",
    db: localStorage,
    converter: "marked", // default converter is `marked`
    isRendering: false,
  };
  global.URL = global.URL || global.webkitURL;

  global.marked.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: false
  });

  // Dom Ready
  $(function() {

    $(".select-theme").on("click", function(){
      if (!application.editor) return false;
      $(".select-theme").removeClass("active");
      var theme  = $(this).addClass("active").data("theme"),
          cssPath = "bower_components/codemirror/theme/"+theme+".css";
      if (theme === "default") {
        cssPath = "css/empty.css";
      }
      application.editor.setOption("theme", theme);
      $("#htmlStyle").attr("href", cssPath);
    });

    // handle file
    $("#lefile").change(function() {
      $("#fileinput").val($(this).val());
    });

    $("[data-toggle='tooltip']").tooltip({
      placement: "bottom",
      delay: {
        show: 100,
        hide: 100
      },
      container: "body",
      html: true
    });

    // button binding
    $(".btn, .input-group-addon").each(function() {
      var $self = $(this);
      $self
        .on("click", function(event) {
          event.preventDefault();
          handleOnClick($self.attr("id"));
        });
    });

    // checkbox binding
    $("#autoReload").change(function() {
      application.enabeAutoReload = $(this).is(":checked");
      autoReload();
    });

    // checkbox binding
    $("#enableShortcut").change(function() {
      application.enableShortcut = $(this).is(":checked");
    });


    // checkbox binding
    $("[name='optionsConverter']").change(function() {
      application.converter = $(this).val();
      convert();
    });

    $("body").keydown(function(event) {
      if (application.enableShortcut) {
        var code = (event.keyCode ? event.keyCode : event.which),
          ctrl = event.ctrlKey,
          alt = event.altKey,
          // shift = event.shiftKey,
          cmd = event.metaKey;
        // browse file `ctrl + o`
        if ((ctrl || cmd) && code === 79) {
          event.preventDefault();
          $("#lefile").click();
          return;
        }
        // read file `ctrl + r`
        if ((ctrl || cmd) && code === 82) {
          event.preventDefault();
          readFile();
          return;
        }
        // raw .md file `ctrl + m`
        if ((ctrl || cmd) && code === 77) {
          event.preventDefault();
          viewRaw("md");
          return;
        }
        // raw .html file `ctrl + alt + h`
        if ((ctrl || cmd) && !alt && code === 72) {
          event.preventDefault();
          viewRaw("html");
          return;
        }
        // view .html file `ctrl + alt + h`
        if ((ctrl || cmd) && alt && code === 72) {
          event.preventDefault();
          openViewer();
          return;
        }
        // exec convert `ctrl + e`
        if ((ctrl || cmd) && code === 69) {
          event.preventDefault();
          convert();
          return;
        }
      }
    });

    // Initilize CodeMirror Editor
    application.editor = global.CodeMirror.fromTextArea(document.getElementById("in"), {
      mode: "gfm", // github-flavored-markdown
      lineNumbers: true,
      matchBrackets: true,
      theme: "default",
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true,
      styleActiveLine: true,
      onFocus: function() {
        $(".CodeMirror-scroll").addClass("focus");
      },
      onBlur: function() {
        $(".CodeMirror-scroll").removeClass("focus");
      },
      onCursorActivity: function() {}
    });

    // read cache
    var cache = application.db.getItem("#in");
    if (cache) {
      $("#in").val = cache;
      application.editor.setValue(cache);
    }
    // Initialize html view
    convert();
  });

  function handleOnClick(id) {
    switch (id) {
      case "btnBrowse":
        // show file browse dialogue
        $("#lefile").click();
        break;
      case "btnRead":
        // read local file
        readFile();
        break;
      case "btnRawMd":
        // show Raw .md file
        viewRaw("md");
        break;
      case "btnRawHtml":
        // show Raw .html file
        viewRaw("html");
        break;
      case "btnHtml":
        // view .html
        openViewer();
        break;
      case "btnConv":
        // exec convert
        convert();
        break;
      case "applyCss":
        // apply css
        applyCss();
        break;
      default:
        break;
    }
  }

  // read local file
  function readFile(f) {
    var fileData = f || document.getElementById("lefile").files[0];
    if (!fileData) {
      showAlert("File was not found.");
      return;
    }
    if (fileData.type && !fileData.type.match("text.*")) {
      showAlert("Cannot read file. Please set plain text file.");
      return;
    }
    var reader = new FileReader();
    reader.onerror = function() {
      showAlert("Cannot read file, some eroor occuerd.");
      return;
    };
    reader.onload = function(evt) {
      $("#in").val(evt.target.result);
      application.editor.setValue(evt.target.result);
      convert();
    };
    reader.readAsText(fileData, "utf-8");
    // console.log("start read");
  }

  // save file to data url
  function viewRaw(file) {
    var text,
      blob;
    switch (file) {
      case "md":
        text = application.editor.getValue();
        break;
      case "html":
        text = $("#out").html();
        break;
      default:
        console.log("invalid param");
        return;
    }
    blob = new Blob([text], {
      type: "text/plain",
      charset: "utf-8"
    });
    global.open(global.URL.createObjectURL(blob), "_blank", "width=800,height=800,titlebar=no,toolbar=yes,scrollbar=yes");
  }

  // exec auto reload per 5(sec) if markdown was changed
  function autoReload() {
    if (application.enabeAutoReload) {
      setTimeout(function() {
        if (application.md !== application.editor.getValue()) convert();
        autoReload();
      }, 5000);
    }
  }

  // convert markdown to html
  function convert() {
    //$("#alertMessage").alert("close");
    if (application.md === application.editor.getValue()) return showAlert("Nothing was changed", "alert-info");
    if (application.isRendering) return showAlert("Now rendering", "alert-info nowRendering");

    application.isRendering = true;
    // save CodeMirror to textarea
    application.editor.save();
    application.md = $("#in").val();
    application.db.setItem("#in", application.md);

    // hide html
    $("#out").fadeOut("fast").empty();

    var convertCallback = function(data, opttionCallback) {
      $("#out")
        .addClass("display-none")
        .append(data)
        .fadeIn("fast");
      opttionCallback();
      application.isRendering = false;
      $("#alertMessage.nowRendering").alert("close");
      if (application.viewer) application.viewer.location.reload();
    };

    switch (application.converter) {
      case "githubAPI":
        // call github's API
        $.ajax({
            "url": "https://api.github.com/markdown/raw",
            "type": "POST",
            "contentType": "text/plain",
            "data": application.md
          })
          .done(function(data) {
            // console.log("done");
            // render html data
            convertCallback(data, function() {
              // $("#out").addClass("markdown-body");
            });
          })
          .fail(function() {
            // console.log("fail");
            showAlert("failed to ajax request. Try again.");
          })
          .always(function(data, status, xhr) {
            // console.log("always");
            application.apiLimit = xhr.getResponseHeader("X-RateLimit-Remaining");
            if (application.apiLimit < 50) {
              showAlert("X-RateLimit-Remaining is less than 50. It was limited 5000 request per hour from same IP");
            }
            application.isRendering = false;
          });
        break;
      case "marked":
        // user marked.js
        var data = global.marked(application.md);
        convertCallback(data, function() {
          // $("#out").removeClass("markdown-body");
          $("#out pre code").each(function(i, e) {
            global.hljs.highlightBlock(e);
          });
        });
        break;
      default:
        console.log("invalid param");
        return;
    }
  }

  // showAlert
  function showAlert(msg, option) {
    //$("#alertMessage").alert("close");
    if (!option) option = "alert-error";
    $("#alertMessage>p").text(msg);
    $("#alertMessage")
      .removeClass("display-none")
      .removeClass("out")
      .addClass(option)
      .addClass("in")
      .bind("close.bs.alert", function(evt) {
        evt.preventDefault();
        $(this)
          .removeClass("in")
          .addClass("out")
          .trigger("closed");
      })
      .bind("closed.bs.alert", function() {
        var self = this;
        $(self)
          .addClass("display-none")
          .removeClass(option);
      });
  }

  // open view window
  function openViewer() {
    if (application.viewer) application.viewer.close();
    application.viewer = global.open("view.html", "_blank','width=800,height=800,titlebar=no,toolbar=no,scrollbar=yes");
  }

})(window, $);