/* Canvas Plugin */
$.fn.canvas2D = function(options)
{
	/* Div Info */
	var div_canvas 					= $(this);
	var div_width					= $(this).width();
	var div_height					= $(this).height();
	if($(div_canvas).length 		== 0){return false};
	
	/* Extends */
	var defaults =
	{
		canvas:
		{
			width:div_width,
			height:div_height,
			backgroundImage:"",
			backgroundRepeat:""
		},
		object:
		{
			color:false,
			alpha:1,
			borderWidth:1,
			margin:[0,0],
			lineStyle:"square",
			circle:
			{
				size:10,
				angle:360,
				startAngle:0,
				endAngle:360
			},
			square:
			{
				width:10,
				height:10
			},
			custom:
			{
				move:[[0,50]],
				type:"quadratic"
			},
			text:
			{
				font: "Arial",
				content: "",
				size: 12,
				fontStyle:"",
				textAlign: "center",
				textBaseline: "middle"
			},
			image:
			{
				width:100,
				height:50
			}
		}
	}
	var opts		= $.extend(defaults, options);
	
	/* Canvas append */
	$(div_canvas).append("<canvas width='"+opts['canvas'].width+"' height='"+opts['canvas'].height+"'></canvas>");
	
	/* Get Context */
	var canvas 		= $(div_canvas).find("canvas")[0].getContext("2d");
	canvas.beginPath();
	
	/* Canvas cases */
	if(opts['canvas'].backgroundImage)
	{
		var imageObj = new Image();
		imageObj.onload = function()
		{
			var pattern = canvas.createPattern(imageObj, opts['canvas'].backgroundRepeat);
			canvas.rect(0, 0, opts['canvas'].width, opts['canvas'].height);
			canvas.fillStyle = pattern;
			canvas.fill();
		}
		imageObj.src = opts['canvas'].backgroundImage;
	}
	
	if(opts['object'])
	{
		if(opts['object']['circle'])
		{
			canvas.arc
			(
				Number(opts['object'].margin[0] + opts['object']['circle'].size + opts['object'].borderWidth),
				Number(opts['object'].margin[1] + opts['object']['circle'].size + opts['object'].borderWidth),
				opts['object']['circle'].size,
				Math.PI*(opts['object']['circle'].startAngle*2 / 360),
				Math.PI*(opts['object']['circle'].endAngle*2 / 360),
				false
			);
		}
		
		if(opts['object']['square'])
		{
			canvas.rect
			(
				Number(opts['object'].margin[0] + opts['object'].borderWidth),
				Number(opts['object'].margin[1] + opts['object'].borderWidth),
				opts['object']['square'].width,
				opts['object']['square'].height
			);
		}
		
		if(opts['object']['custom'])
		{
			canvas.moveTo(opts['object']['custom']['move'][0][0],opts['object']['custom']['move'][0][1]);
			for(i=1; i<opts['object']['custom'].move.length; i++)
			{
				switch(opts['object']['custom'].type)
				{
					case "curve":
						canvas.bezierCurveTo(opts['object']['custom']['move'][i][0],opts['object']['custom']['move'][i][1]);
					break;
					
					case "quadratic":
						canvas.quadraticCurveTo(opts['object']['custom']['move'][i][0],opts['object']['custom']['move'][i][1]);
					break;
					
					default:
					break;
				}
			}
		}
		
		if(opts['object']['image'])
		{
			imageObj = new Image();
			
			imageObj.onload = function()
			{canvas.drawImage(imageObj, opts['object'].margin[0], opts['object'].margin[1], opts['object']['image'].width, opts['object']['image'].height)}
			imageObj.src = opts['object']['image'].src;
		}
		
		if(opts['object']['text'])
		{
			canvas.font 		= opts['object']['text'].fontStyle +" "+ opts['object']['text'].size+"pt "+opts['object']['text'].font;
			canvas.textAlign 	= opts['object']['text'].textAlign;
			canvas.textBaseline = opts['object']['text'].verticalAlign;
			canvas.fillText(opts['object']['text'].content, opts['object'].margin[0], opts['object'].margin[1]);
		}
		
		/* Obj props */
		
			canvas.fillStyle 		= opts['object'].color;
		
		canvas.globalAlpha		= opts['object'].alpha;
		canvas.strokeStyle 		= opts['object'].border;
		canvas.lineWidth		= opts['object'].borderWidth;
		canvas.lineCap 			= opts['object'].lineStyle;
	}
	
	/* End */
	if(opts['object'].color != false)
	{canvas.closePath();
		canvas.fill();
	}
	if(opts['object'].border != false)
	{
		canvas.stroke();
	}
}

/*$(".loadCanvas").canvas2D({
	canvas:
	{
		width:500,
		height:200
	},
	object:
	{
		color:"#ff0000",
		alpha:1,
		borderWidth:15,
		border:"black",
		margin:[0,25],
		circle:
		{
			size:50,
			startAngle:0,
			endAngle:180
		}
	}
});*/