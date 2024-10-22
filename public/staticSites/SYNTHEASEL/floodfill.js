function getPixel(pixelData, x, y) {
    if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
        return -1; // Impossible color (out of bounds)
    }
    return pixelData.data[y * pixelData.width + x];
}

function p5ColorToHex(c, useHash) {
    // Convert p5.js color object to hex string
    let val = c.toString("#rrggbbaa");
    if (useHash) return val;

    // For casting to integer -- order is 0xAABBGGRR
    return "0x" + val.substring(7, 9) + val.substring(5, 7) + val.substring(3, 5) + val.substring(1, 3);
}

function p5ColorToUInt32(c) {
    return parseInt(p5ColorToHex(c, false));
}

function inBounds(pixelData, x, y) {
    // Consolidated boundary checking
    return x >= 0 && y >= 0 && x < pixelData.width && y < pixelData.height;
}

function floodFill(ctx, x, y, fillColor) {
    // Convert fillColor to a UInt32 format for comparison
    fillColor = p5ColorToUInt32(fillColor);
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    const pixelData = {
        width: imageData.width,
        height: imageData.height,
        data: new Uint32Array(imageData.data.buffer),
    };

    const targetColor = getPixel(pixelData, x, y);

    // Exit early if the target color is the same as fill color
    if (targetColor === fillColor) {
        return;
    }

    const pixelsToCheck = [[x, y]]; // Store pairs of coordinates
    const edgePixels = [];
    const checkedPixels = new Set(); // Track processed pixels

    // Helper to generate a unique key for each pixel (x, y)
    function pixelKey(x, y) {
        return `${x},${y}`;
    }

    while (pixelsToCheck.length > 0) {
        const [x, y] = pixelsToCheck.pop(); // Pop the pair

        // Ensure the pixel is within bounds and hasn't been checked yet
        if (inBounds(pixelData, x, y) && !checkedPixels.has(pixelKey(x, y))) {
            const currentColor = getPixel(pixelData, x, y);

            if (currentColor === targetColor) {
                // Set new color and mark pixel as processed
                pixelData.data[y * pixelData.width + x] = fillColor;
                checkedPixels.add(pixelKey(x, y));

                // Add adjacent pixels to the stack
                pixelsToCheck.push([x + 1, y]);
                pixelsToCheck.push([x - 1, y]);
                pixelsToCheck.push([x, y + 1]);
                pixelsToCheck.push([x, y - 1]);

                // Optional: Add corners for diagonal filling
                pixelsToCheck.push([x + 1, y + 1]);
                pixelsToCheck.push([x - 1, y + 1]);
                pixelsToCheck.push([x + 1, y - 1]);
                pixelsToCheck.push([x - 1, y - 1]);
            } else {
                // Handle edge colors
                const finalColor = specialLerpColors(currentColor, fillColor, edgeColorLerpPct);
                edgePixels.push([x, y, finalColor]);
            }
        }
    }

    // Fill in the edge pixels after flood fill
    while (edgePixels.length > 0) {
        const [xEdge, yEdge, col] = edgePixels.pop(); // Pop the triplet
        if (inBounds(pixelData, xEdge, yEdge)) {
            pixelData.data[yEdge * pixelData.width + xEdge] = col;
        }
    }

    // Update the canvas with new pixel data
    ctx.putImageData(imageData, 0, 0);
}

function specialLerpColors(col1, col2, t) {
    const c1Alpha = col1 >> 24;
    const c2Alpha = col2 >> 24;
    const alpha = (1 - t) * c1Alpha + t * c2Alpha;

    const c1Blue = (col1 & 0x00FF0000) >> 16;
    const c2Blue = (col2 & 0x00FF0000) >> 16;
    const blue = (1 - t) * c1Blue + t * c2Blue;

    const c1Green = (col1 & 0x0000FF00) >> 8;
    const c2Green = (col2 & 0x0000FF00) >> 8;
    const green = (1 - t) * c1Green + t * c2Green;

    const c1Red = col1 & 0x000000FF;
    const c2Red = col2 & 0x000000FF;
    const red = (1 - t) * c1Red + t * c2Red;

    return (alpha << 24) | (blue << 16) | (green << 8) | red;
}
