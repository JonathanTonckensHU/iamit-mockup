var canvas = document.getElementById("stage");
canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-10;

var ctx = canvas.getContext("2d");
var output = document.getElementById("output");


var tileCanvas = document.getElementById("tilechoosercanvas");

var tileCtx = tileCanvas.getContext("2d");
var tileSetImage = new Image();
tileSetImage.src = tileData.tileSet;
tileSetImage.onload = function() {
		tileCanvas.width = tileSetImage.width;
		tileCanvas.height = tileSetImage.height;
		update();
	};

var entityCanvas = document.getElementById("entitychoosercanvas");

var entityCtx = entityCanvas.getContext("2d");
var entityImage = new Image();
entityImage.src = tileData.entityTileSet;
entityImage.onload = function() {
		entityCanvas.width = entityImage.width;
		entityCanvas.height = entityImage.height;
		update();
	};

var zoom = 1;

var mapData = {map: [], entities: []}
var map = mapData.map;
//make a standard map
for(var i=0;i<7;i++)
{
	map[i] = [];
	for(var j=0;j<7;j++)
	{
		map[i][j] = 0;
	}
}
TileLib.loadImages(tileData);

var tileSize = tileData.tileSize;

var cameraX = map.length*tileData.tileSize/2;
var cameraY = map[0].length*tileData.tileSize/2;
var mouseDown = false;
var lastX, lastY;
var tileX, tileY;
var currentTile = 0;
var entityMode = false;
var currentEntity = 0;

function update()
{
	output.value = JSON.stringify(mapData);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//render the map
	TileLib.render(ctx, map, tileData, canvas.width, canvas.height, cameraX, cameraY, zoom);

	//render selection
	TileLib.translate(ctx, canvas.width, canvas.height, cameraX, cameraY, zoom);
	if(!entityMode)
	{
		ctx.strokeRect(tileX*tileSize, tileY*tileSize, tileSize, tileSize);
	}
	
	//render buttons for expansion
	ctx.strokeRect(0, -tileSize, map.length*tileSize, tileSize);
	ctx.strokeRect(-tileSize, 0, tileSize, map[0].length*tileSize);
	ctx.strokeRect(0, map[0].length*tileSize, map.length*tileSize, tileSize);
	ctx.strokeRect(map.length*tileSize, 0, tileSize, map[0].length*tileSize);
	//render entities
	mapData.entities.forEach(function(e) {
			ctx.drawImage(entityImage, 0, e.id*tileSize, tileSize, tileSize, e.x-tileSize/2, e.y-tileSize/2, tileSize, tileSize);
		});
	ctx.restore();

	//update selected tile
	tileCtx.drawImage(tileSetImage, 0, 0);
	tileCtx.lineWidth = 10;
	tileCtx.strokeRect(tileData.tiles[currentTile].x*tileSize, tileData.tiles[currentTile].y*tileSize, tileSize, tileSize);

	//update selected entity
	entityCtx.clearRect(0, 0, entityCanvas.width, entityCanvas.height);
	entityCtx.drawImage(entityImage, 0, 0);
	entityCtx.strokeRect(0, currentEntity*tileSize, tileSize, tileSize);
}

output.addEventListener("input", function(e)
	{
		mapData = JSON.parse(output.value);
		map = mapData.map;
		update();
	});

canvas.addEventListener("mousedown", function(e)
	{
		lastX = e.x;
		lastY = e.y;
		mouseDown = true;
		if(e.button == 1) //middle mouse button, pan
		{
			update();
			return;
		}
		var tx = TileLib.screenToTileX(e.x, tileData, canvas.width, cameraX, zoom);
		var ty = TileLib.screenToTileX(e.y, tileData, canvas.height, cameraY, zoom);
		if(tx == -1 && ty >= 0 && ty < map[0].length) //add a collum on the left side
		{
			var collum = [];
			for(var i=0;i<map[0].length;i++)
			{
				collum[i] = currentTile;
			}
			map.unshift(collum);
			mapData.entities.forEach(function(e) {
				e.x += tileSize;
			});
			update();
			return;
		}
		if(tx == map.length && ty >= 0 && ty < map[0].length) //add a collum on the right side
		{
			var collum = [];
			for(var i=0;i<map[0].length;i++)
			{
				collum[i] = currentTile;
			}
			map.push(collum);
			update();
			return;
		}
		if(ty == -1 && tx >= 0 && tx < map.length) //add a row at the top
		{
			for(var i=0;i<map.length;i++)
			{
				map[i].unshift(currentTile);
			}
			mapData.entities.forEach(function(e) {
				e.y += tileSize;
			});
			update();
			return;
		}
		if(ty == map[0].length && tx >= 0 && tx < map.length) //add a row at the bottom
		{
			for(var i=0;i<map.length;i++)
			{
				map[i].push(currentTile);
			}
			update();
			return;
		}
		if(entityMode)
		{
			var ex = TileLib.screenToMapX(e.x, canvas.width, cameraX, zoom);
			var ey = TileLib.screenToMapX(e.y, canvas.height, cameraY, zoom);
			mapData.entities.push({id: currentEntity, x: ex, y: ey});
		}
		else if(e.button == 0) //left button, change tile
		{
			map[tileX][tileY] = currentTile;
		}
		update();
	});
canvas.addEventListener("mousemove", function(e)
	{
		var tx = TileLib.screenToTileX(e.x, tileData, canvas.width, cameraX, zoom);
		var ty = TileLib.screenToTileX(e.y, tileData, canvas.height, cameraY, zoom);
		if(tx >= 0 && ty >= 0 && tx < map.length && ty < map[0].length)
		{
			tileX = tx;
			tileY = ty;
		}
		if(!mouseDown)
		{
			update();
			return false;
		}
		else
		{
			if(e.button == 0) //left button, change tile
			{
				map[tileX][tileY] = currentTile;
			}
			else if(e.button == 1) //middle button, pan
			{
				cameraX -= e.x-lastX;
				cameraY -= e.y-lastY;
				lastX = e.x;
				lastY = e.y;
			}
		}
		update();
		return false;
	});
addEventListener("mouseup", function(e)
	{
		mouseDown = false;
		return false;
	});
addEventListener("keydown", function(e)
	{
		if(e.keyCode == 32) //space, switch mode
		{
			entityMode = !entityMode;
			document.getElementById("tilechooser").style.display = entityMode?"none":"block";
			document.getElementById("entitychooser").style.display = entityMode?"block":"none";
			update();
			return;
		}
		if(entityMode)
		{
			var types = Math.ceil(entityImage.height/tileSize);
			if(e.keyCode == 87) //W, up
			{
				currentEntity--;
				if(currentEntity < 0)
				{
					currentEntity = types-1;
				}
			}
			else if(e.keyCode == 83) //S, down
			{
				currentEntity = (currentEntity+1)%types;
			}
			update();
			return;
		}
		var x = tileData.tiles[currentTile].x;
		var y = tileData.tiles[currentTile].y;
		if(e.keyCode == 87 && y > 0) //W, up
		{
			y--;
		}
		else if(e.keyCode == 83 && y < map[0].length) //S, down
		{
			y++;
		}
		else if(e.keyCode == 65 && x > 0) //A, left
		{
			x--;
		}
		else if(e.keyCode == 68 && x < map.length) //D, right
		{
			x++;
		}
		var id = 0;
		tileData.tiles.forEach(function(tile) {
				if(tile.x == x && tile.y == y)
				{
					currentTile = id;
					return;
				}
				id++;
			});
		update();
	});
addEventListener("mousewheel", function(e) {
		zoom += e.wheelDelta*.001;
		update();
	});
canvas.onselect = function(){return false;};
canvas.oncontextmenu = function(){
		var fill = map[tileX][tileY];
		floodFill(map, tileX, tileY, currentTile, function(x, y) {return map[x][y] == fill;});
		update();
		return false;
	};
canvas.onselectstart = function(){return false;};

function floodFill(array, x, y, value, shouldFill)
{
	if(x < 0 || y < 0 || x >= array.length || y >= array.length || array[x][y] == value || !shouldFill(x, y))
	{
		return;
	}
	array[x][y] = value;
	floodFill(array, x-1, y, value, shouldFill);
	floodFill(array, x+1, y, value, shouldFill);
	floodFill(array, x, y+1, value, shouldFill);
	floodFill(array, x, y-1, value, shouldFill);
}