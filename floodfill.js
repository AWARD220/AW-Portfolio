// Use a UInt32 array for faster operations
// Derived from:
// http://jsfiddle.net/greggman/wpfd8he1/
//

function getPixel(pixelData, x, y) {
	if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
		return -1; // impossible color
	} else {
		return pixelData.data[y * pixelData.width + x];
	}
}

function p5ColorToHex(c, useHash) {
	// Get the Hex color rep from a p5.js color object
	let val = c.toString("#rrggbbaa");
	if (useHash) return val;

	// For casting to integer -- order is 0xAABBGGRR
	return "0x" + val.substring(7, 9) + val.substring(5, 7) + val.substring(3, 5) + val.substring(1, 3);
}

function p5ColorToUInt32(c) {
	return parseInt(p5ColorToHex(c, false));
}

function floodFill(ctx, x, y, fillColor) {
	// fillColor should be a p5.js color object
	fillColor = p5ColorToUInt32(fillColor);
	//console.log(fillColor)
	const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

	const pixelData = {
		width: imageData.width,
		height: imageData.height,
		data: new Uint32Array(imageData.data.buffer),
	};

	const targetColor = getPixel(pixelData, x, y);

	if (targetColor !== fillColor) {
		const pixelsToCheck = [x, y];
		const edgePixels = [];

		while (pixelsToCheck.length > 0) {
			const y = pixelsToCheck.pop();
			const x = pixelsToCheck.pop();
			const currentColor = getPixel(pixelData, x, y);

			if (currentColor === targetColor) {
				pixelData.data[y * pixelData.width + x] = fillColor;
				pixelsToCheck.push(x + 1, y);
				pixelsToCheck.push(x - 1, y);
				pixelsToCheck.push(x, y + 1);
				pixelsToCheck.push(x, y - 1);

				// Corners
				pixelsToCheck.push(x + 1, y + 1);
				pixelsToCheck.push(x - 1, y + 1);
				pixelsToCheck.push(x + 1, y - 1);
				pixelsToCheck.push(x - 1, y - 1);
			} else if (currentColor !== fillColor) {
				const final_color = specialLerpColors(currentColor, fillColor, edgeColorLerpPct);
				edgePixels.push(x);
				edgePixels.push(y);
				edgePixels.push(final_color);
			}
		}

		while (edgePixels.length > 0) {
			const col = edgePixels.pop();
			const yedge = edgePixels.pop();
			const xedge = edgePixels.pop();
			pixelData.data[yedge * pixelData.width + xedge] = col;
		}

		ctx.putImageData(imageData, 0, 0);
	}
}


function specialLerpColors(col1, col2, t) {
	const c1_alpha = col1 >> 24;
	const c2_alpha = col2 >> 24;
	const alpha = (1 - t) * c1_alpha + t * c2_alpha;

	const c1_blue = (col1 & 0x00FF0000) >> 16;
	const c2_blue = (col2 & 0x00FF0000) >> 16;
	const blue = (1 - t) * c1_blue + t * c2_blue;

	const c1_green = (col1 & 0x0000FF00) >> 8;
	const c2_green = (col2 & 0x0000FF00) >> 8;
	const green = (1 - t) * c1_green + t * c2_green;

	const c1_red = col1 & 0x000000FF;
	const c2_red = col2 & 0x000000FF;
	const red = (1 - t) * c1_red + t * c2_red;

	const lerped = (alpha << 24) | (blue << 16) | (green << 8) | red;
	return lerped;
}