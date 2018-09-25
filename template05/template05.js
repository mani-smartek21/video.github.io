/*!
 * HTML5 Video Player Template 06 - number navigator at bottom
 * http://html5videoplayer.net/
 *
 * Copyright 2012, socusoft.com
 */
 
 $(function() {
	 

   var videoBox = [];
   
   function pauseAllVideo()
   {
   
   $("#VideoWrapper").find("video").each(function() 
                                         {
                                         if(  $(this)[0].pluginType == "native")
                                         {
                                         
                                         
                                         
                                         $(this)[0].pause();
                                         
                                         }
                                         else
                                         {
                                         
                                         $(this)[0].player.pause();
                                         
                                         }				
                                         });
   
   }
   
   function showVideo(vitem){
   
   
   var videoID = vitem.attr('alt');
   var widthHeight = vitem.attr('rel').split('x');
    var bAutoPlay = vitem.attr('autoplay');
	var bLoop	=  vitem.attr('loop');
	
	var strAutoPlay,strLoop;
	
	if(bAutoPlay != null)
	{
		strAutoPlay = ' autoplay="autoplay" ';
	}
	else
	{
		strAutoPlay = ' ';
	}
	
	if(bLoop != null)
	{
		strLoop = ' loop="loop" ';
	}
	else
	{
		strLoop = ' ';
	} 
   //hide all videos
   $("#VideoWrapper").find("div[class=videoNode]").hide();
   
   //video is does not exist
   if(videoBox[videoID] == null)
   {
   
   var PlayerSkin;
   if(widthHeight[2] =="TED")
   PlayerSkin =  'class="mejs-ted"';
   else if(widthHeight[2] =="WMP")
   PlayerSkin =  'class="mejs-wmp"';
   else
   PlayerSkin = ' ';
   
   var videoStr =   '<div class="videoNode" id="VideoBox_'+videoID+'">\n<video '+PlayerSkin+strAutoPlay + strLoop +' id="'+videoID+'" controls preload="none" width="'+widthHeight[0]+'" height="'+widthHeight[1]+'"\n'+
   '\tposter="poster/'+videoID+'.jpg"">\n'+
   '\t<source src="./videos/'+videoID+'.mp4" type="video/mp4" />\n'+
   '\t<source src="./videos/'+videoID+'.webm" type="video/webm" />\n'+
   '\t<source src="./videos/'+videoID+'.ogv" type="video/ogg" />\n'+
   '</video>\n</div>';
   
   var vbox = $("#VideoWrapper").append(videoStr);
   
   videoBox[videoID] = vbox;
   
   
   
   $("#"+videoID).mediaelementplayer({
                                     success: function(player, node) {
                                     
                                     }
                                     });
   
   
   }
   else
   {
   
   $("#VideoBox_"+videoID).show();
   }   
   }
   
 
 
 
    $("#foo1").carouFredSel({
    
   
    items		: 1,
	scroll		: {
		fx			: "crossfade",
         onBefore: function(oldItems, newItems) {
			    pauseAllVideo();
            },
            onAfter	: function(oldItems, newItems) {
			   
				var videoItem = $(newItems);
                showVideo(videoItem);
            }
            
	},
	auto		: false,
	pagination	: {
		container		: "#foo1_pag",
		anchorBuilder	: function( nr, item ) {
             
			var src = $(item).attr( "alt" );
				 
			return '<img src="./thumbnail/' + src + '.jpg" />';
		}
	},
    onCreate: function(items) {
            items.each(function() { 
                showVideo($(this));
            });
			 			
			
		}
    });


	 
		
	function setNavi( $c, $i ) {
	var title = $i.attr( 'title' );
	$('#title').text( title );

	var current = $c.triggerHandler( 'currentPosition' );
	$('#pagenumber span').text( current+1 );

	var $prev = ($i.is(':first-child')) ? $c.children().last() : $i.prev();
	var small = $prev.attr('alt') ;
	$('#prev').html('<img src="./thumbnail/' + small + '.jpg" width="100" height="75"/>');

	var $next = $i.next();
	var small = $next.attr('alt') ;
	$('#next').html('<img src="./thumbnail/' + small + '.jpg" width="100" height="75"/>');
}
$(function() {
	$("#carousel").carouFredSel({
		items: 1,
		prev: '#prev',
		next: '#next',
        auto		: false,
		pagination: {
			container: '#pager span',
			anchorBuilder: function( nr, $img ) {
				var small = $img.attr('alt');
				return '<a href="#" title="Go to video '+nr+'.">'+nr+'<img src="./thumbnail/' + small + '.jpg" width="100" height="75"/></a>';
			}
		},
		scroll: {
			onBefore: function( $oI, $nI ) {
				setNavi( $(this), $nI );
                 pauseAllVideo();
			},
            onAfter	: function(oldItems, newItems) {
			   
				var videoitem = $(newItems);
                showVideo(videoitem);
            }
		},
		onCreate: function( $vI ) {
			setNavi( $(this), $vI );
            $vI.each(function() { 
                showVideo($(this));
            });

		}
	});
});	
	 


	 
});