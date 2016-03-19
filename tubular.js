var ver = "1.1.5";
//var getSliderMax() = 100;
var slider_max = 100;
var str_dir = "right";
var rembrandt_cry = false;
var defaults = {
    // Plugin init params
    width: 450, //212, // the width of the player
    height: 200, //177, // the height of the player
    allowFullScreen: "true", // true by default, allow user to go full screen
    initialVideo: "5bueZoYhUlg", // the video that is loaded into the player
    start: 0,
    preferredQuality: "auto", // preferred quality: auto, small, medium, large, hd720
    showControls: true, // whether the player should have the controls visible, 0 or 1
    showRelated: false, // show the related videos when the player ends, 0 or 1 
    playsinline: false, // setting for ipad
    autoPlay: false, // whether the player should autoplay the video, 0 or 1
    autoHide: true,
    theme: "dark", // possible options: "dark" or "light"
    color: "red", // possible options: "red" or "white"
    showinfo: false, // if you want the player to include details about the video
    modestbranding: true, // specify to include/exclude the YouTube watermark
    annotations: true, // show annotations?
    loop: 0, // whether or not the player will loop
    protocol: 'http',
    // the location to the swfobject import for the flash player, default to Google's CDN
    wmode: "transparent", // note: transparent maintains z-index, but disables GPU acceleration
    swfobjectURL: "http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
    loadSWFObject: true, // if you include swfobject, set to false
    // HTML5 specific attrs
    iframed: true, // iframed can be: true, false; iframed: HTML5 compliant player
    // Player Trigger Specific Functionality
    onPlay: function(id) {}, // after the play method is called
    onPause: function() {}, // after the pause method is called
    onStop: function() {}, // after the player is stopped
    onSeek: function(time) {}, // after the video has been seeked to a defined point
    onMute: function() {}, // after the player is muted
    onUnMute: function() {}, // after the player is unmuted
    // Player State Change Specific Functionality
    onPlayerUnstarted: function() {}, // when the player returns a state of unstarted
    onPlayerEnded: function() {}, // when the player returns a state of ended
    onPlayerPlaying: function() {}, //when the player returns a state of playing
    onPlayerPaused: function() {}, // when the player returns a state of paused
    onPlayerBuffering: function() {}, // when the player returns a state of buffering
    onPlayerCued: function() {}, // when the player returns a state of cued
    onQualityChange: function(quality) {}, // a function callback for when the quality of a video is determined
    // Error State Specific Functionality
    onErrorNotFound: function() {}, // if a video cant be found
    onErrorNotEmbeddable: function() {}, // if a video isnt embeddable
    onErrorInvalidParameter: function() {} // if we've got an invalid param
};
var player_mode = "automagical";
var obj_yt_0 = {
    b_playing: false,
    yt_player: jQuery("#player0 .yt_player"),
    video_id: jQuery("#player0").attr('data-serialnum')
}
var obj_yt_1 = {
    b_playing: false,
    yt_player: jQuery("#player1 .yt_player"),
    video_id: jQuery("#player1").attr('data-serialnum')
}

function dj(player, volume) {
    player.tubeplayer();
}

function loadit() {}
$(function() {
    $("#player_0_vol").attr("data-volume", getSliderMax()).find(".volly").val(getSliderMax());
    //    $("#player_0_vol .volly").attr("data-yt",obj_yt_0.yt_player.tubeplayer);
    //    $("#player_1_vol .volly").attr("data-yt",obj_yt_1.yt_player.tubeplayer);
    $("#search_me_form").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            //$("form").submit();
            youtubeApiCall();
        }
    });
    $("input.volly").blur(function() {
        volley_ball($(this));
    }).keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            volley_ball($(this));
        }
    });
    $(".id_override").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            //$("form").submit();
            $(this).find('.yt_player').tubeplayer("cue", $(this).find(".serial_number").val());
            $(this).find(".titler").text($(this).find('.yt_player').tubeplayer("player").F.videoData);
            //// // console.log($(this).find('.yt_player').tubeplayer("player"), $(this).find('.yt_player').tubeplayer("player").F.videoData);
            $(this).find('.serial_number').val($(this).find(".serial_number").val());
        }
    });
    /* */
    obj_yt_0.yt_player.tubeplayer({
        initialVideo: obj_yt_0.video_id,
        width: defaults.width,
        height: defaults.height,
        volume: str_dir == "right" ? player_0_vol : 0,
        onPause: function() {
            obj_yt_0.b_playing = false;
            $("#player0").removeClass("borderBlink");
            ////// // console.log("|-o-| pause:");
        },
        onStop: function() {
            obj_yt_0.b_playing = false;
            $("#player0").removeClass("borderBlink");
            ////// // console.log("|-o-| stop:");
        },
        onPlayerEnded: function() {
            $("#player0").removeClass("borderBlink");
            ////// // console.log("|-o-| stop:");
        },
        onPlayerUnstarted: function() {
            if (str_dir == "right") {
                obj_yt_0.yt_player.tubeplayer("volume", getSliderMax());
            } else {
                obj_yt_0.yt_player.tubeplayer("volume", 0);
            }
            //// // console.log("|-o-| onPlayerUnstarted: yt0", obj_yt_0.yt_player.tubeplayer("volume"));
        },
        onPlayerCued: function() {
            if (str_dir == "right") {
                obj_yt_0.yt_player.tubeplayer("volume", getSliderMax());
            } else {
                obj_yt_0.yt_player.tubeplayer("volume", 0);
            }
            //// // console.log("|-o-| onPlayerCued: yt0", obj_yt_0.yt_player.tubeplayer("volume"));
        },
        onPlayerPlaying: function() {
            obj_yt_0.b_playing = true;
            var time_left_0 = obj_yt_0.yt_player.tubeplayer("data").duration - obj_yt_0.yt_player.tubeplayer("data").currentTime;
            //////// // console.log("|-o-| play:",time_left_0);
            $("#player0").addClass("borderBlink");
            $("#player_0_time").attr("data-time", time_left_0).text("Time: " + time_left_0);
        },
        onPlayerPaused: function() {
            $("#player0").removeClass("borderBlink");
            ////// // console.log("|-o-| stop:");
        },
        onPlayerStopped: function() {
            $("#player0").removeClass("borderBlink");
            ////// // console.log("|-o-| stop:");
        },
    });
    obj_yt_1.yt_player.tubeplayer({
        initialVideo: obj_yt_1.video_id,
        width: defaults.width,
        height: defaults.height,
        volume: str_dir == "right" ? 0 : player_0_vol,
        onPlayerUnstarted: function() {
            obj_yt_1.yt_player.tubeplayer("volume", 0);
            ////// // console.log("~~~~", $(this))
        },
        onPause: function() {
            obj_yt_1.b_playing = false;
            $("#player1").removeClass("borderBlink");
            ////// // console.log("|-o-| pause:");
        },
        onStop: function() {
            obj_yt_1.b_playing = false;
            $("#player1").removeClass("borderBlink");
            ////// // console.log("|-o-| stop:");
        },
        onPlayerEnded: function() {
            $("#player1").removeClass("borderBlink");
            ////// // console.log("|-o-| stop:");
        },
        onPlay: function() {
            var time_left_1 = obj_yt_1.yt_player.tubeplayer("data").duration - obj_yt_1.yt_player.tubeplayer("data").currentTime;
            //////// // console.log("|-o-| play:",time_left_1);
            $("#player1").addClass("borderBlink");
            $("#player_1_time").attr("data-time", time_left_1).text("Time: " + time_left_1);
        },
        onPlayerUnstarted: function() {
            if (str_dir == "right") {
                obj_yt_1.yt_player.tubeplayer("volume", 0);
            } else {
                obj_yt_1.yt_player.tubeplayer("volume", getSliderMax());
            }
            //// // console.log("|-o-| onPlayerUnstarted: yt1", obj_yt_1.yt_player.tubeplayer("volume"));
        },
        onPlayerCued: function() {
            if (str_dir == "right") {
                obj_yt_1.yt_player.tubeplayer("volume", 0);
            } else {
                obj_yt_1.yt_player.tubeplayer("volume", getSliderMax());
            }
            //// // console.log("|-o-| onPlayerCued: yt1", obj_yt_1.yt_player.tubeplayer("volume"));
        },
        onPlayerPlaying: function() {
            obj_yt_1.b_playing = true;
            var time_left_1 = obj_yt_1.yt_player.tubeplayer("data").duration - obj_yt_1.yt_player.tubeplayer("data").currentTime;
            ////// // console.log("|-o-| play:",time_left_1);
            $("#player1").addClass("borderBlink");
            $("#player_1_time").attr("data-time", time_left_1).text("Time: " + time_left_1);
        },
        onPlayerPaused: function() {
            $("#player1").removeClass("borderBlink");
            ////// // console.log("|-o-| stop:");
        },
        onPlayerStopped: function() {
            $("#player1").removeClass("borderBlink");
            ////// // console.log("|-o-| stop:");
        },
        volume: 0 //,
            // muted: true
    });
    /* */
    $("#slider").slider({
        value: 0,
        //        range: true,
        //        values: [0, getSliderMax()],
        min: 0,
        max: getSliderMax(),
        step: 1,
        animate: 7500,
        change: function(event, ui) {
            if (rembrandt_cry) {
                // console.log("CHANGE HAPPENING");
                if (player_mode == "automagical") {
                    if (!obj_yt_0.yt_player.b_playing) {
                        obj_yt_0.yt_player.tubeplayer("play");
                    }
                    if (!obj_yt_1.yt_player.b_playing) {
                        obj_yt_1.yt_player.tubeplayer("play");
                    }
                }
                obj_yt_0.yt_player.tubeplayer("volume", (getSliderMax() - ui.value));
                obj_yt_1.yt_player.tubeplayer("volume", ui.value);
                $("#player_0_vol").attr("data-volume", (getSliderMax() - ui.value)).find(".volly").val(((getSliderMax() - ui.value)));
                $("#player_1_vol").attr("data-volume", ui.value).find(".volly").val(ui.value);
                //          // // console.log("change", getSliderMax());
                if (ui.value == 0) {
                    str_dir = "right";
                    obj_yt_1.yt_player.tubeplayer("pause");
                } else if (ui.value == getSliderMax()) {
                    str_dir = "left";
                    obj_yt_0.yt_player.tubeplayer("pause");
                }
                // // console.log("DELTA: ",ui.value, " || ", ui);
                //                rembrandt_cry = false;
            }
        },
        slide: function(event, ui) {
            // console.log("SLIDE HAPPENING");
            if (player_mode == "automagical") {
                if (!obj_yt_0.yt_player.b_playing) {
                    obj_yt_0.yt_player.tubeplayer("play");
                }
                if (!obj_yt_1.yt_player.b_playing) {
                    obj_yt_1.yt_player.tubeplayer("play");
                }
            }
            obj_yt_0.yt_player.tubeplayer("volume", (getSliderMax() - ui.value));
            obj_yt_1.yt_player.tubeplayer("volume", ui.value);
            $("#player_0_vol").attr("data-volume", (getSliderMax() - ui.value)).find(".volly").val(((getSliderMax() - ui.value)));
            $("#player_1_vol").attr("data-volume", ui.value).find(".volly").val(ui.value);
            if (ui.value == 0) {
                str_dir = "right";
                obj_yt_1.yt_player.tubeplayer("pause");
            } else if (ui.value == getSliderMax()) {
                str_dir = "left";
                obj_yt_0.yt_player.tubeplayer("pause");
            }
            //            ////// // console.log(ui.value, " || ", jQuery("#player0 .yt_player").tubeplayer("volume"), jQuery("#player1 .yt_player").tubeplayer("volume"));
        }
    });
    $(".player_mode").click(function() {
        $(".player_mode").removeClass("selected");
        $(this).addClass("selected");
        player_mode = $(this).attr("id");
    });
    jQuery(".serial_number").autocomplete({
        source: function(request, response) {
            //////// // console.log(request.term);
            var sqValue = [];
            jQuery.ajax({
                type: "POST",
                url: "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1",
                dataType: 'jsonp',
                data: jQuery.extend({
                    q: request.term
                }, {}),
                success: function(data) {
                    ////// // console.log(data[1]);
                    obj = data[1];
                    jQuery.each(obj, function(key, value) {
                        sqValue.push(value[0]);
                    });
                    response(sqValue);
                    $(".ui-menu-item").parent().css({
                        'background': '#99004d'
                    });
                    //// // console.log(data, sqValue, response(sqValue));
                }
            });
        },
        select: function(event, ui) {
            setTimeout(function() {
                youtubeApiCall();
            }, 300);
        }
    });
});

function getSliderMax() {
    // // console.log("sliderMax",slider_max);
    return slider_max;
}
/**/
function rembrandt(speed) {
    rembrandt_cry = true;
    //// // console.log(speed, speed / 100);
    if (str_dir == "right") {
        $("#slider").slider("option", "animate", speed);
        var val = 0;
        var timer = setInterval(function() {
            if (val <= getSliderMax()) {
                $("#slider").slider("value", val);
                val += 1;
                // console.log("|-o-|",rembrandt_cry,$("#slider").slider("value"),val);
            } else {
                $("#slider").slider("value", getSliderMax());
                str_dir = "left"
                clearInterval(timer);
            }
        }, speed / getSliderMax());
    } else {
        $("#slider").slider("option", "animate", speed);
        var val = getSliderMax();
        var timer = setInterval(function() {
            if (val >= 0) {
                $("#slider").slider("value", val);
                val -= 1;
                // console.log("|-o-|",rembrandt_cry,$("#slider").slider("value"),val);
            } else {
                $("#slider").slider("value", 0);
                str_dir = "right";
                clearInterval(timer);
            }
        }, speed / getSliderMax());
    }
}

function resetSlider(objPlayer) {
    var $slider = $("#slider");
    //  $slider.slider("values", 0, 0);
    //  $slider.slider("max", getSliderMax());
    /* */
    $('#slider').slider('option', {
        max: getSliderMax()
    }); //.slider('value', getSliderMax());
    if (objPlayer == "obj_yt_1") {
        $('#slider').slider('value', getSliderMax());
    }
    /* 
        $('#slider').slider('option', {
            max: getSliderMax()
        }).slider('value', getSliderMax());

    */
}

function volley_ball(obj) {
    slider_max = parseInt($(obj).val());
    console.log("BLUR", $(obj).attr("data-yt"), getSliderMax());
    if ($(obj).attr("data-yt") == "obj_yt_0") {
        obj_yt_0.yt_player.tubeplayer("volume", getSliderMax());
    } else {
        obj_yt_1.yt_player.tubeplayer("volume", getSliderMax());
    }
    resetSlider($(obj).attr("data-yt"));
}
/**/
function youtubeApiCall() {
    $.ajax({
        cache: false,
        data: $.extend({
            key: 'AIzaSyCCzUx17p52ufNXsQ_jwQFp02n3p5pzuW0',
            q: $('.search_me_box').val(),
            part: 'snippet'
        }, {
            maxResults: 20,
            pageToken: $("#pageToken").val()
        }),
        dataType: 'json',
        type: 'GET',
        timeout: 5000,
        url: 'https://www.googleapis.com/youtube/v3/search'
    }).done(function(data) {
        $('.btn-group').show();
        if (typeof data.prevPageToken === "undefined") {
            $("#pageTokenPrev").hide();
        } else {
            $("#pageTokenPrev").show();
        }
        if (typeof data.nextPageToken === "undefined") {
            $("#pageTokenNext").hide();
        } else {
            $("#pageTokenNext").show();
        }
        var items = data.items,
            videoList = "";
        $("#pageTokenNext").val(data.nextPageToken);
        $("#pageTokenPrev").val(data.prevPageToken);
        $.each(items, function(index, e) {
            videoList = videoList + '<li class="draggable hyv-video-list-item" data-ytid="' + e.id.videoId + '" data-yttitle="' + e.snippet.title + '"><span class="title" data-ytid="' + e.id.videoId + '" data-yttitle="' + e.snippet.title + '">' + e.snippet.title + '</span><span class="hyv-simple-thumb-wrap"><img alt="' + e.snippet.title + '" src="' + e.snippet.thumbnails.default.url + '" width="120" height="90"></span></li>';
        });
        $("#hyv-watch-related").html(videoList);
        $(".draggable").draggable();
        $(".droppable").droppable({
            drop: function(event, ui) {
                // $(this).find('.yt_player').tubeplayer("play", $(ui.draggable).attr("data-ytid"));
                // $(this).find('.yt_player').tubeplayer("stop");
                $(this).find('.yt_player').tubeplayer("cue", $(ui.draggable).attr("data-ytid"));
                $(this).find(".titler").text($(ui.draggable).attr("data-yttitle"));
                ////// // console.log( $(this).find(".titler"), $(this).find(".titler").text(),$(ui.draggable).attr("data-yttitle"));
                $(this).find('.serial_number').val($(ui.draggable).attr("data-ytid"));
                $(ui.draggable).remove();
                $("#hyv-watch-related").empty();
                $("#player0-hyv-search").val("");
            }
        });
    });
}