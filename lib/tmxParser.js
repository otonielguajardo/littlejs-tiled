export default function (tmxString) {
    const xmlString = tmxString;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    let tmj = {
        type: "map",
        compressionlevel: -1,
        infinite: false,
        tilesets: [],
        layers: []
    };

    const map = xmlDoc.getElementsByTagName("map")[0];
    tmj.orientation = map.getAttribute("orientation");
    tmj.tiledversion = map.getAttribute("tiledversion");
    tmj.renderorder = map.getAttribute("renderorder");
    tmj.width = parseInt(map.getAttribute("width"));
    tmj.height = parseInt(map.getAttribute("height"));
    tmj.tilewidth = parseInt(map.getAttribute("tilewidth"));
    tmj.tileheight = parseInt(map.getAttribute("tileheight"));
    tmj.nextlayerid = parseInt(map.getAttribute("nextlayerid"));
    tmj.nextobjectid = parseInt(map.getAttribute("nextobjectid"));
    tmj.version = map.getAttribute("version");

    for (let tileset of xmlDoc.getElementsByTagName("tileset")) {
        tmj.tilesets.push({
            firstgid: parseInt(tileset.getAttribute("firstgid")),
            source: tileset.getAttribute("source"),
        })
    }

    for (let layer of xmlDoc.getElementsByTagName("layer")) {
        tmj.layers.push({
            id: parseInt(layer.getAttribute('id')),
            name: layer.getAttribute('name'),
            width: parseInt(layer.getAttribute('width')),
            height: parseInt(layer.getAttribute('height')),
            data: layer.querySelector('data').textContent.trim().split(',').map(Number),
            opacity: 1,
            type: "tilelayer",
            visible: true,
            x: 0,
            y: 0,
        });
    }

    return tmj;
}