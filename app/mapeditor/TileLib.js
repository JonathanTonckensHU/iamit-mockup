var TileLib = {
	render: function(ctx, map, tileData, screenWidth, screenHeight, cameraX, cameraY, zoom) {
			var tileSize = tileData.tileSize;
			var tiles = tileData.tiles;
			TileLib.translate(ctx, screenWidth, screenHeight, cameraX, cameraY, zoom);
			for(var i=0;i<map.length;i++)
			{
				for(var j=0;j<map[i].length;j++)
				{
					ctx.drawImage(tiles[map[i][j]].image, i*tileSize, j*tileSize);
				}
			}
			ctx.restore();
		},
	translate: function(ctx, screenWidth, screenHeight, cameraX, cameraY, zoom) {
			ctx.save();
			ctx.translate(screenWidth/2, screenHeight/2);
			ctx.scale(zoom, zoom);
			ctx.translate(-cameraX, -cameraY);
		},
	screenToMapX: function(x, screenWidth, cameraX, zoom) {
			return (x-screenWidth/2)/zoom+cameraX;
		},
	screenToTileX: function(x, tileData, screenWidth, cameraX, zoom) {
			return Math.floor(TileLib.screenToMapX(x, screenWidth, cameraX, zoom)/tileData.tileSize);
		},
	worldToTileX: function(x, tileData) {
			return Math.floor(x/tileData.tileSize);
		},
	screenToMapY: function(y, screenHeight, cameraY, zoom) {
			return (y-screenHeight/2)/zoom+cameraY;
		},
	screenToTileY: function(y, tileData, screenHeight, cameraY, zoom) {
			return Math.floor(TileLib.screenToMapY(y, screenHeight, cameraY, zoom)/tileData.tileSize);
		},
	worldToTileY: function(y, tileData) {
			return Math.floor(y/tileData.tileSize);
		},
	loadImages: function(tileData) {
			var image = new Image();
			image.src = tileData.tileSet;
			//create canvasses
			tileData.tiles.forEach(function(tile) {
					var canvas = document.createElement("canvas");
					canvas.width = tileData.tileSize;
					canvas.height = tileData.tileSize;
					tile.image = canvas;
				});
			//draw the images on the canvasses when the images are loaded
			image.onload = function() {
				var tileSize = tileData.tileSize;
				tileData.tiles.forEach(function(tile) {
						var ctx = tile.image.getContext("2d");
						ctx.drawImage(image, tile.x*tileSize, tile.y*tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);
					});
				};
		},
};