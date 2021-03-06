import * as helpers from './'
import {
    BBox,
    feature,
    featureCollection,
    geometry,
    point,
    polygon,
    lineString,
    multiLineString,
    multiPoint,
    multiPolygon,
    geometryCollection,
    radiansToLength,
    lengthToRadians,
    lengthToDegrees,
    bearingToAzimuth,
    radiansToDegrees,
    degreesToRadians,
    round,
    convertLength,
    convertArea,
    isNumber,
    isObject,
    earthRadius,
    // Typescript types
    Point,
    LineString,
    Polygon,
    MultiPoint,
    MultiLineString,
    MultiPolygon
} from './'

// Fixtures
const bbox: BBox = [-180, -90, 180, 90]
const properties = {foo: 'bar'}
const pt = point([0, 1])
const line = lineString([[0, 1], [2, 3]])
const poly = polygon([[[0, 1], [0, 0], [2, 3], [0, 1]]])
const feat = feature({coordinates: [1, 0], type: 'point'})
const multiPt = multiPoint([[0, 1], [2, 3], [0, 1]])
const multiLine = multiLineString([[[0, 1], [2, 3], [0, 1]]])
const multiPoly = multiPolygon([[[[0, 1], [0, 0], [2, 3], [0, 1]]]])

// radiansToLength & lengthToRadians
helpers.radiansToLength(5)
helpers.lengthToRadians(10)
helpers.lengthToDegrees(45)

// default import & import * as
point([0, 1])
lineString([[0, 1], [2, 3]])
polygon([[[0, 1], [0, 0], [2, 3], [0, 1]]])
feature({coordinates: [1, 0], type: 'point'})
multiPoint([[0, 1], [2, 3], [0, 1]])
multiLineString([[[0, 1], [2, 3], [0, 1]]])
multiPolygon([[[[0, 1], [0, 0], [2, 3], [0, 1]]]])
helpers.point([0, 1])
helpers.lineString([[0, 1], [2, 3]])
helpers.polygon([[[0, 1], [0, 0], [2, 3], [0, 1]]])
helpers.feature({coordinates: [1, 0], type: 'point'})
helpers.multiPoint([[0, 1], [2, 3], [0, 1]])
helpers.multiLineString([[[0, 1], [2, 3], [0, 1]]])
helpers.multiPolygon([[[[0, 1], [0, 0], [2, 3], [0, 1]]]])

// Mixed collection is defiend as FeatureCollection<any>
const mixed = helpers.featureCollection([pt, poly])
mixed.features.push(pt)
mixed.features.push(line)
mixed.features.push(poly)

// Blank collection is defined as FeatureCollection<any>
const blank = helpers.featureCollection([])
blank.features.push(pt)
blank.features.push(line)
blank.features.push(poly)

// Collection with only Points
const points = helpers.featureCollection<GeoJSON.Point>([])
points.features.push(pt)
// points.features.push(line) // Argument of type 'Feature<LineString>' is not assignable to parameter of type 'Feature<Point>'.

// Collection with only LineStrings
const lines = helpers.featureCollection([line])
lines.features.push(line)
// lines.features.push(pt) // Argument of type 'Feature<Point>' is not assignable to parameter of type 'Feature<LineString>'.

// Collection with only Polygons
const polygons = helpers.featureCollection<GeoJSON.Polygon>([])
polygons.features.push(poly)

// Geometry Collection
const geomCollection = helpers.geometryCollection([pt.geometry])
geomCollection.geometry.geometries

// bbox & id
helpers.point(pt.geometry.coordinates, properties, {bbox, id: 1})
helpers.lineString(line.geometry.coordinates, properties, {bbox, id: 1})
helpers.polygon(poly.geometry.coordinates, properties, {bbox, id: 1})
helpers.multiPoint(multiPt.geometry.coordinates, properties, {bbox, id: 1})
helpers.multiLineString(multiLine.geometry.coordinates, properties, {bbox, id: 1})
helpers.multiPolygon(multiPoly.geometry.coordinates, properties, {bbox, id: 1})
helpers.geometryCollection([pt.geometry], properties, {bbox, id: 1})

// properties
helpers.point(pt.geometry.coordinates, {foo: 'bar'})
helpers.point(pt.geometry.coordinates, {1: 2})
helpers.point(pt.geometry.coordinates, {1: {foo: 'bar'}})

// isNumber -- true
helpers.isNumber(123)
helpers.isNumber(1.23)
helpers.isNumber(-1.23)
helpers.isNumber(-123)
helpers.isNumber('123')
helpers.isNumber(+'123')
helpers.isNumber('1e10000')
helpers.isNumber(1e10000)
helpers.isNumber(Infinity)
helpers.isNumber(-Infinity)

// isNumber -- false
helpers.isNumber(+'ciao')
helpers.isNumber('foo')
helpers.isNumber('10px')
helpers.isNumber(NaN)
helpers.isNumber(undefined)
helpers.isNumber(null)
helpers.isNumber({a: 1})
helpers.isNumber({})
helpers.isNumber([1, 2, 3])
helpers.isNumber([])
helpers.isNumber(helpers.isNumber)

// isObject -- true
helpers.isObject({a: 1})
helpers.isObject({})
helpers.isObject(helpers.point([0, 1]))

// isObject -- false
helpers.isObject(123)
helpers.isObject(Infinity)
helpers.isObject(-123)
helpers.isObject('foo')
helpers.isObject(NaN)
helpers.isObject(undefined)
helpers.isObject(null)
helpers.isObject([1, 2, 3])
helpers.isObject([])
helpers.isObject(helpers.isNumber)

// Geometry
const ptGeom: Point = geometry('Point', pt.geometry.coordinates);
const lineGeom: LineString = geometry('LineString', line.geometry.coordinates);
const polyGeom: Polygon = geometry('Polygon', poly.geometry.coordinates);
const multiPtGeom: MultiPoint = geometry('MultiPoint', multiPt.geometry.coordinates);
const multiLineGeom: MultiLineString = geometry('MultiLineString', multiLine.geometry.coordinates);
const multiPolyGeom: MultiPolygon = geometry('MultiPolygon', multiPoly.geometry.coordinates);
