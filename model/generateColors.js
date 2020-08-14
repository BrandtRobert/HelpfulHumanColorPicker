/**
 * Script to generate some random colors for the database.
 * This script picks random numbers for red, green and blue values,
 * it then uses a simple distance algorithm to compare these to a set of primary hues.
 * This allows us to assign a color family to any random color. However, the algorithm doesn't
 * work super well currently. This is partially because the process of automatically identifying
 * and classifying color is trickier than it seems.
 */

const fs = require("fs");
const NUM_COLORS = 100
const primaryHues = JSON.parse(fs.readFileSync('./primaryHues.json'))

// Using color distance algorithm 
// https://stackoverflow.com/questions/9018016/how-to-compare-two-colors-for-similarity-difference
const distanceBetweenColors = (primaryHue, newColor) => {
    const [r1, g1, b1] = [primaryHue.red, primaryHue.green, primaryHue.blue];
    const [r2, g2, b2] = newColor
    let cR = r1 - r2
    let cG = g1 - g2
    let cB = b1 - b2
    let uR = (r1 + r2)
    let dist = cR*cR*(2+uR/256) + cG*cG*4 + cB*cB*(2+(255-uR)/256)
    return dist
}

const rgbToStr = (color) => {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
      
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    return rgbToHex(...color)
}

let writer = fs.createWriteStream('COLORS.sql')
writer.write(`
CREATE TABLE IF NOT EXISTS Colors (
    color TEXT NOT NULL,
    family TEXT NOT NULL
);
INSERT INTO Colors (color, family) VALUES
`)

for (let i = 0; i < NUM_COLORS; i++) {
    let newColor = Array.from({length: 3}, () => Math.floor(Math.random() * 255));
    let minDistance = Number.MAX_SAFE_INTEGER;
    let closestPrimaryHue = "";
    for (let j = 0; j < primaryHues.length; j++){
        let distance = distanceBetweenColors(primaryHues[j], newColor)
        if (distance < minDistance) {
            closestPrimaryHue = primaryHues[j];
            minDistance = distance;
        }
    }
    if (i < 99) {
        writer.write(`\t("${rgbToStr(newColor)}", "${closestPrimaryHue.name}"),\n`)
    } else {
        writer.write(`\t("${rgbToStr(newColor)}", "${closestPrimaryHue.name}");\n`)
    }
}

