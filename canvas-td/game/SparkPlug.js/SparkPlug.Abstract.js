SparkPlug = new Object();

// assume all coordinates are in the following form:
// positive x-axis points right (East)
// positive y-axis points down (South)
SparkPlug.Abstract = (function() {

// =============================================================================
//	CLASS:	Point
// =============================================================================
/**@
 * #Crafty.math.Vector2D
 *
 * @class This is a general purpose 2D vector class
 *
 * Vector2D uses the following form:
 * <x, y>
 *
 * @public
 * @sign public {Vector2D} Vector2D();
 * @sign public {Vector2D} Vector2D(Vector2D);
 * @sign public {Vector2D} Vector2D(Number, Number);
 * @param {Vector2D|Number=0} x
 * @param {Number=0} y
 */
function Vector2D(x, y) {
	if (x instanceof Vector2D) {
		this.x = x.x;
		this.y = x.y;
	} else if (arguments.length === 2) {
		this.x = x;
		this.y = y;
	} else if (arguments.length > 0)
		throw "Unexpected number of arguments for Vector2D()";
} // class Vector2D

Vector2D.prototype.x = 0;
Vector2D.prototype.y = 0;

/**@
 * #.add( )
 *
 * Adds the passed vector to this vector
 *
 * @public
 * @sign public {Vector2D} add(Vector2D);
 * @param {vector2D} vecRH
 * @returns {Vector2D} this after adding
 */
Vector2D.prototype.add = function(vecRH) {
	this.x += vecRH.x;
	this.y += vecRH.y;
	return this;
} // add( )

/**@
 * #.angleBetween( )
 *
 * Calculates the angle between the passed vector and this vector, using <0,0> as the point of reference.
 * Angles returned have the range (−π, π].
 *
 * @public
 * @sign public {Number} angleBetween(Vector2D);
 * @param {Vector2D} vecRH
 * @returns {Number} the angle between the two vectors in radians
 */
Vector2D.prototype.angleBetween = function(vecRH) {
	return Math.atan2(this.x * vecRH.y - this.y * vecRH.x, this.x * vecRH.x + this.y * vecRH.y);
} // angleBetween( )

/**@
 * #.angleTo( )
 *
 * Calculates the angle to the passed vector from this vector, using this vector as the point of reference.
 *
 * @public
 * @sign public {Number} angleTo(Vector2D);
 * @param {Vector2D} vecRH
 * @returns {Number} the angle to the passed vector in radians
 */
Vector2D.prototype.angleTo = function(vecRH) {
	return Math.atan2(vecRH.y - this.y, vecRH.x - this.x);
};

/**@
 * #.clone( )
 *
 * Creates and exact, numeric copy of this vector
 *
 * @public
 * @sign public {Vector2D} clone();
 * @returns {Vector2D} the new vector
 */
Vector2D.prototype.clone = function() {
	return new Vector2D(this);
} // clone( )

/**@
 * #.distance( )
 *
 * Calculates the distance from this vector to the passed vector.
 *
 * @public
 * @sign public {Number} distance(Vector2D);
 * @param {Vector2D} vecRH
 * @returns {Number} the distance between the two vectors
 */
Vector2D.prototype.distance = function(vecRH) {
	return Math.sqrt((vecRH.x - this.x) * (vecRH.x - this.x) + (vecRH.y - this.y) * (vecRH.y - this.y));
} // distance( )

/**@
 * #.distanceSq( )
 *
 * Calculates the squared distance from this vector to the passed vector.
 * This function avoids calculating the square root, thus being slightly faster than .distance( ).
 *
 * @public
 * @sign public {Number} distanceSq(Vector2D);
 * @param {Vector2D} vecRH
 * @returns {Number} the squared distance between the two vectors
 * @see Vector2D.distance( )
 */
Vector2D.prototype.distanceSq = function(vecRH) {
	return (vecRH.x - this.x) * (vecRH.x - this.x) + (vecRH.y - this.y) * (vecRH.y - this.y);
} // distanceSq( )

/**@
 * #.divide( )
 *
 * Divides this vector by the passed vector.
 *
 * @public
 * @sign public {Vector2D} divide(Vector2D);
 * @param {Vector2D} vecRH
 * @returns {Vector2D} this vector after dividing
 */
Vector2D.prototype.divide = function(vecRH) {
	this.x /= vecRH.x;
	this.y /= vecRH.y;
	return this;
} // divide( )

/**@
 * #.dotProduct( )
 *
 * Calculates the dot product of this and the passed vectors
 *
 * @public
 * @sign public {Number} dotProduct(Vector2D);
 * @param {Vector2D} vecRH
 * @returns {Number} the resultant dot product
 */
Vector2D.prototype.dotProduct = function(vecRH) {
	return this.x * vecRH.x + this.y * vecRH.y;
} // dotProduct( )

/**@
 * #.equals( )
 *
 * Determines if this vector is numerically equivalent to the passed vector.
 *
 * @public
 * @sign public {Boolean} equals(Vector2D);
 * @param {Vector2D} vecRH
 * @returns {Boolean} true if the vectors are equivalent
 */
Vector2D.prototype.equals = function(vecRH) {
	return vecRH instanceof Vector2D &&
		this.x == vecRH.x && this.y == vecRH.y;
} // equals( )

/**@
 * #.getNormal( )
 *
 * Calculates a new right-handed normal vector for the line created by this and the passed vectors.
 *
 * @public
 * @sign public {Vector2D} getNormal([Vector2D]);
 * @param {Vector2D=<0,0>} [vecRH]
 * @returns {Vector2D} the new normal vector
 */
Vector2D.prototype.getNormal = function(vecRH) {
	if (vecRH === undefined)
		return new Vector2D(-this.y, this.x); // assume vecRH is <0, 0>
	return new Vector2D(vecRH.y - this.y, this.x - vecRH.x).normalize();
} // getNormal( )

/**@
 * #.isZero( )
 *
 * Determines if this vector is equal to <0,0>
 *
 * @public
 * @sign public {Boolean} isZero();
 * @returns {Boolean} true if this vector is equal to <0,0>
 */
Vector2D.prototype.isZero = function() {
	return this.x === 0 && this.y ===0;
} // isZero( )

/**@
 * #.magnitude( )
 *
 * Calculates the magnitude of this vector.
 * Note: Function objects in JavaScript already have a 'length' member, hence the use of magnitude instead.
 *
 * @public
 * @sign public {Number} magnitude();
 * @returns {Number} the magnitude of this vector
 */
Vector2D.prototype.magnitude = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
} // magnitude( )

/**@
 * #.magnitudeSq( )
 *
 * Calculates the square of the magnitude of this vector.
 * This function avoids calculating the square root, thus being slightly faster than .magnitude( ).
 *
 * @public
 * @sign public {Number} magnitudeSq();
 * @returns {Number} the square of the magnitude of this vector
 * @see Vector2D.magnitude( )
 */
Vector2D.prototype.magnitudeSq = function() {
	return this.x * this.x + this.y * this.y;
} // magnitudeSq( )

/**@
 * #.multiply( )
 *
 * Multiplies this vector by the passed vector
 *
 * @public
 * @sign public {Vector2D} multiply(Vector2D);
 * @param {Vector2D} vecRH
 * @returns {Vector2D} this vector after multiplying
 */
Vector2D.prototype.multiply = function(vecRH) {
	this.x *= vecRH.x;
	this.y *= vecRH.y;
	return this;
} // multiply( )

/**@
 * #.negate( )
 *
 * Negates this vector (ie. <-x,-y>)
 *
 * @public
 * @sign public {Vector2D} negate();
 * @returns {Vector2D} this vector after negation
 */
Vector2D.prototype.negate = function() {
	this.x = -this.x;
	this.y = -this.y;
	return this;
} // negate( )

/**@
 * #.normalize( )
 *
 * Normalizes this vector (scales the vector so that its new magnitude is 1)
 * For vectors where magnitude is 0, <1,0> is returned.
 *
 * @public
 * @sign public {Vector2D} normalize();
 * @returns {Vector2D} this vector after normalization
 */
Vector2D.prototype.normalize = function() {
	var lng = Math.sqrt(this.x * this.x + this.y * this.y);

	if (lng === 0) {
		// default due East
		this.x = 1;
		this.y = 0;
	} else {
		this.x /= lng;
		this.y /= lng;
	} // else

	return this;
} // normalize( )

/**@
 * #.scale( )
 *
 * Scales this vector by the passed amount(s)
 * If scalarY is omitted, scalarX is used for both axes
 *
 * @public
 * @sign public {Vector2D} scale(Number[, Number]);
 * @param {Number} scalarX
 * @param {Number} [scalarY]
 * @returns {Vector2D} this after scaling
 */
Vector2D.prototype.scale = function(scalarX, scalarY) {
	if (scalarY === undefined)
		scalarY = scalarX;

	this.x *= scalarX;
	this.y *= scalarY;

	return this;
} // scale( )

/**@
 * #.scaleToMagnitude( )
 *
 * Scales this vector such that its new magnitude is equal to the passed value.
 *
 * @public
 * @sign public {Vector2D} scaleToMagnitude(Number);
 * @param {Number} mag
 * @returns {Vector2D} this vector after scaling
 */
Vector2D.prototype.scaleToMagnitude = function(mag) {
	var k = mag / this.magnitude();
	this.x *= k;
	this.y *= k;
	return this;
} // scaleToMagnitude( )

/**@
 * #.setValues( )
 *
 * Sets the values of this vector using a passed vector or pair of numbers.
 *
 * @public
 * @sign public {Vector2D} setValues(Vector2D);
 * @sign public {Vector2D} setValues(Number, Number);
 * @param {Number|Vector2D} x
 * @param {Number} y
 * @returns {Vector2D} this vector after setting of values
 */
Vector2D.prototype.setValues = function(x, y) {
	if (x instanceof Vector2D) {
		this.x = x.x;
		this.y = x.y;
	} else {
		this.x = x;
		this.y = y;
	} // else

	return this;
} // setValues( )

/**@
 * #.subtract( )
 *
 * Subtracts the passed vector from this vector.
 *
 * @public
 * @sign public {Vector2D} subtract(Vector2D);
 * @param {Vector2D} vecRH
 * @returns {vector2D} this vector after subtracting
 */
Vector2D.prototype.subtract = function(vecRH) {
	this.x -= vecRH.x;
	this.y -= vecRH.y;
	return this;
} // subtract( )

/**@
 * #.toString( )
 *
 * Returns a string representation of this vector.
 *
 * @public
 * @sign public {String} toString();
 * @returns {String}
 */
Vector2D.prototype.toString = function() {
	return "Vector2D(" + this.x + ", " + this.y + ")";
} // toString( )

/**@
 * #.translate( )
 *
 * Translates (moves) this vector by the passed amounts.
 * If dy is omitted, dx is used for both axes.
 *
 * @public
 * @sign public {Vector2D} translate(Number[, Number]);
 * @param {Number} dx
 * @param {Number} [dy]
 * @returns {Vector2D} this vector after translating
 */
Vector2D.prototype.translate = function(dx, dy) {
	if (dy === undefined)
		dy = dx;

	this.x += dx;
	this.y += dy;

	return this;
} // translate( )

/**@
 * #.tripleProduct( )
 *
 * Calculates the triple product of three vectors.
 * triple vector product = b(a•c) - a(b•c)
 *
 * @public
 * @static
 * @sign public {Vector2D} tripleProduct(Vector2D, Vector2D, Vector2D);
 * @param {Vector2D} a
 * @param {Vector2D} b
 * @param {Vector2D} c
 * @return {Vector2D} the triple product as a new vector
 */
Vector2D.tripleProduct = function(a, b, c) {
	var ac = a.dotProduct(c);
	var bc = b.dotProduct(c);
	return new Crafty.math.Vector2D(b.x * ac - a.x * bc, b.y * ac - a.y * bc);
};



// =============================================================================
//	CLASS:	Matrix2D
// =============================================================================
/**@
 * #Crafty.math.Matrix2D
 *
 * @class This is a 2D Matrix2D class. It is 3x3 to allow for affine transformations in 2D space.
 * The third row is always assumed to be [0, 0, 1].
 *
 * Matrix2D uses the following form, as per the whatwg.org specifications for canvas.transform():
 * [a, c, e]
 * [b, d, f]
 * [0, 0, 1]
 *
 * @public
 * @sign public {Matrix2D} new Matrix2D();
 * @sign public {Matrix2D} new Matrix2D(Matrix2D);
 * @sign public {Matrix2D} new Matrix2D(Number, Number, Number, Number, Number, Number);
 * @param {Matrix2D|Number=1} a
 * @param {Number=0} b
 * @param {Number=0} c
 * @param {Number=1} d
 * @param {Number=0} e
 * @param {Number=0} f
 */
Matrix2D = function(a, b, c, d, e, f) {
	if (a instanceof Matrix2D) {
		this.a = a.a;
		this.b = a.b;
		this.c = a.c;
		this.d = a.d;
		this.e = a.e;
		this.f = a.f;
	} else if (arguments.length === 6) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.e = e;
		this.f = f;
	} else if (arguments.length > 0)
		throw "Unexpected number of arguments for Matrix2D()";
} // class Matrix2D

Matrix2D.prototype.a = 1;
Matrix2D.prototype.b = 0;
Matrix2D.prototype.c = 0;
Matrix2D.prototype.d = 1;
Matrix2D.prototype.e = 0;
Matrix2D.prototype.f = 0;

/**@
 * #.apply( )
 *
 * Applies the matrix transformations to the passed object
 *
 * @public
 * @sign public {Vector2D} apply(Vector2D);
 * @param {Vector2D} vecRH - vector to be transformed
 * @returns {Vector2D} the passed vector object after transforming
 */
Matrix2D.prototype.apply = function(vecRH) {
	// I'm not sure of the best way for this function to be implemented. Ideally
	// support for other objects (rectangles, polygons, etc) should be easily
	// addable in the future. Maybe a function (apply) is not the best way to do
	// this...?

	var tmpX = vecRH.x;
	vecRH.x = tmpX * this.a + vecRH.y * this.c + this.e;
	vecRH.y = tmpX * this.b + vecRH.y * this.d + this.f;
	// no need to homogenize since the third row is always [0, 0, 1]

	return vecRH;
} // apply( )

/**@
 * #.clone( )
 *
 * Creates an exact, numeric copy of the current matrix
 *
 * @public
 * @sign public {Matrix2D} clone();
 * @returns {Matrix2D}
 */
Matrix2D.prototype.clone = function() {
	return new Matrix2D(this);
} // clone( )

/**@
 * #.combine( )
 *
 * Multiplies this matrix with another, overriding the values of this matrix.
 * The passed matrix is assumed to be on the right-hand side.
 *
 * @public
 * @sign public {Matrix2D} combine(Matrix2D);
 * @param {Matrix2D} mtrxRH
 * @returns {Matrix2D} this matrix after combination
 */
Matrix2D.prototype.combine = function(mtrxRH) {
	var tmp = this.a;
	this.a = tmp * mtrxRH.a + this.b * mtrxRH.c;
	this.b = tmp * mtrxRH.b + this.b * mtrxRH.d;
	tmp = this.c;
	this.c = tmp * mtrxRH.a + this.d * mtrxRH.c;
	this.d = tmp * mtrxRH.b + this.d * mtrxRH.d;
	tmp = this.e;
	this.e = tmp * mtrxRH.a + this.f * mtrxRH.c + mtrxRH.e;
	this.f = tmp * mtrxRH.b + this.f * mtrxRH.d + mtrxRH.f;
	return this;
} // combine( )

/**@
 * #.equals( )
 *
 * Checks for the numeric equality of this matrix versus another.
 *
 * @public
 * @sign public {Boolean} equals(Matrix2D);
 * @param {Matrix2D} mtrxRH
 * @returns {Boolean} true if the two matrices are numerically equal
 */
Matrix2D.prototype.equals = function(mtrxRH) {
	return mtrxRH instanceof Matrix2D &&
		this.a == mtrxRH.a && this.b == mtrxRH.b && this.c == mtrxRH.c &&
		this.d == mtrxRH.d && this.e == mtrxRH.e && this.f == mtrxRH.f;
} // equals( )

/**@
 * #.determinant( )
 *
 * Calculates the determinant of this matrix
 *
 * @public
 * @sign public {Number} determinant();
 * @returns {Number} det(this matrix)
 */
Matrix2D.prototype.determinant = function() {
	return this.a * this.d - this.b * this.c;
} // determinant( )

/**@
 * #.invert( )
 *
 * Inverts this matrix if possible
 *
 * @public
 * @sign public {Matrix2D} invert();
 * @returns {Matrix2D} this inverted matrix or the original matrix on failure
 * @see Matrix2D.isInvertible( )
 */
Matrix2D.prototype.invert = function() {
	var det = this.determinant();

	// matrix is invertible if its determinant is non-zero
	if (det !== 0) {
		var old = {
			a: this.a,
			b: this.b,
			c: this.c,
			d: this.d,
			e: this.e,
			f: this.f
		};
		this.a = old.d / det;
		this.b = -old.b / det;
		this.c = -old.c / det;
		this.d = old.a / det;
		this.e = (old.c * old.f - old.e * old.d) / det;
		this.f = (old.e * old.b - old.a * old.f) / det;
	} // if

	return this;
} // invert( )

/**@
 * #.isIdentity( )
 *
 * Returns true if this matrix is the identity matrix
 *
 * @public
 * @sign public {Boolean} isIdentity();
 * @returns {Boolean}
 */
Matrix2D.prototype.isIdentity = function() {
	return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.e === 0 && this.f === 0;
} // isIdentity( )

/**@
 * #.isInvertible( )
 *
 * Determines is this matrix is invertible.
 *
 * @public
 * @sign public {Boolean} isInvertible();
 * @returns {Boolean} true if this matrix is invertible
 * @see Matrix2D.invert( )
 */
Matrix2D.prototype.isInvertible = function() {
	return this.determinant() !== 0;
} // isInvertible( )

/**@
 * #.preRotate( )
 *
 * Applies a counter-clockwise pre-rotation to this matrix
 *
 * @public
 * @sign public {Matrix2D} preRotate(Number);
 * @param {number} rads - angle to rotate in radians
 * @returns {Matrix2D} this matrix after pre-rotation
 */
Matrix2D.prototype.preRotate = function(rads) {
	var nCos = Math.cos(rads);
	var nSin = Math.sin(rads);

	var tmp = this.a;
	this.a = nCos * tmp - nSin * this.b;
	this.b = nSin * tmp + nCos * this.b;
	tmp = this.c;
	this.c = nCos * tmp - nSin * this.d;
	this.d = nSin * tmp + nCos * this.d;

	return this;
} // preRotate( )

/**@
 * #.preScale( )
 *
 * Applies a pre-scaling to this matrix
 *
 * @public
 * @sign public {Matrix2D} preScale(Number[, Number]);
 * @param {Number} scalarX
 * @param {Number} [scalarY] scalarX is used if scalarY is undefined
 * @returns {Matrix2D} this after pre-scaling
 */
Matrix2D.prototype.preScale = function(scalarX, scalarY) {
	if (scalarY === undefined)
		scalarY = scalarX;

	this.a *= scalarX;
	this.b *= scalarY;
	this.c *= scalarX;
	this.d *= scalarY;

	return this;
} // preScale( )

/**@
 * #.preTranslate( )
 *
 * Applies a pre-translation to this matrix
 *
 * @public
 * @sign public {Matrix2D} preTranslate(Vector2D);
 * @sign public {Matrix2D} preTranslate(Number, Number);
 * @param {Number|Vector2D} dx
 * @param {Number} dy
 * @returns {Matrix2D} this matrix after pre-translation
 */
Matrix2D.prototype.preTranslate = function(dx, dy) {
	if (typeof dx === "number") {
		this.e += dx;
		this.f += dy;
	} else {
		this.e += dx.x;
		this.f += dx.y;
	} // else

	return this;
} // preTranslate( )

/**@
 * #.rotate( )
 *
 * Applies a counter-clockwise post-rotation to this matrix
 *
 * @public
 * @sign public {Matrix2D} rotate(Number);
 * @param {Number} rads - angle to rotate in radians
 * @returns {Matrix2D} this matrix after rotation
 */
Matrix2D.prototype.rotate = function(rads) {
	var nCos = Math.cos(rads);
	var nSin = Math.sin(rads);

	var tmp = this.a;
	this.a = nCos * tmp - nSin * this.b;
	this.b = nSin * tmp + nCos * this.b;
	tmp = this.c;
	this.c = nCos * tmp - nSin * this.d;
	this.d = nSin * tmp + nCos * this.d;
	tmp = this.e;
	this.e = nCos * tmp - nSin * this.f;
	this.f = nSin * tmp + nCos * this.f;

	return this;
} // rotate( )

/**@
 * #.scale( )
 *
 * Applies a post-scaling to this matrix
 *
 * @public
 * @sign public {Matrix2D} scale(Number[, Number]);
 * @param {Number} scalarX
 * @param {Number} [scalarY] scalarX is used if scalarY is undefined
 * @returns {Matrix2D} this after post-scaling
 */
Matrix2D.prototype.scale = function(scalarX, scalarY) {
	if (scalarY === undefined)
		scalarY = scalarX;

	this.a *= scalarX;
	this.b *= scalarY;
	this.c *= scalarX;
	this.d *= scalarY;
	this.e *= scalarX;
	this.f *= scalarY;

	return this;
} // scale( )

/**@
 * #.setValues( )
 *
 * Sets the values of this matrix
 *
 * @public
 * @sign public {Matrix2D} setValues(Matrix2D);
 * @sign public {Matrix2D} setValues(Number, Number, Number, Number, Number, Number);
 * @param {Matrix2D|Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} e
 * @param {Number} f
 * @returns {Matrix2D} this matrix containing the new values
 */
Matrix2D.prototype.setValues = function(a, b, c, d, e, f) {
	if (a instanceof Matrix2D) {
		this.a = a.a;
		this.b = a.b;
		this.c = a.c;
		this.d = a.d;
		this.e = a.e;
		this.f = a.f;
	} else {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.e = e;
		this.f = f;
	} // else

	return this;
} // setValues( )

/**@
 * #.toString( )
 *
 * Returns the string representation of this matrix.
 *
 * @public
 * @sign public {String} toString();
 * @returns {String}
 */
Matrix2D.prototype.toString = function() {
	return "Matrix2D([" + this.a + ", " + this.c + ", " + this.e +
		"] [" + this.b + ", " + this.d + ", " + this.f + "] [0, 0, 1])";
} // toString( )

/**@
 * #.translate( )
 *
 * Applies a post-translation to this matrix
 *
 * @public
 * @sign public {Matrix2D} translate(Vector2D);
 * @sign public {Matrix2D} translate(Number, Number);
 * @param {Number|Vector2D} dx
 * @param {Number} dy
 * @returns {Matrix2D} this matrix after post-translation
 */
Matrix2D.prototype.translate = function(dx, dy) {
	if (typeof dx === "number") {
		this.e += this.a * dx + this.c * dy;
		this.f += this.b * dx + this.d * dy;
	} else {
		this.e += this.a * dx.x + this.c * dx.y;
		this.f += this.b * dx.x + this.d * dx.y;
	} // else

	return this;
} // translate( )



// =============================================================================
//	CLASS:	Rect
// =============================================================================

// Rect Rect(number, number, number, number);
function Rect(_x, _y, _w, _h) {
	this.x = _x;
	this.y = _y;
	this.w = _w;
	this.h = _h;
} // class Rect

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

Rect.prototype.x;
Rect.prototype.y;
Rect.prototype.w;
Rect.prototype.h;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

// Rect Clone();
Rect.prototype.Clone = function() {
	return new Rect(this.x, this.y, this.w, this.h);
} // Clone( )

// --------------------------------------

// bool Equals(Rect);
Rect.prototype.Equals = function(_rect) {
	if (_rect instanceof Rect) {
		return (
			this.x == _rect.x &&
			this.y == _rect.y &&
			this.w == _rect.w &&
			this.h == _rect.h);
	} // if
	return false;
} // Equals( )

// --------------------------------------

// Point GetCenter();
Rect.prototype.GetCenter = function() {
	return new Point(this.x + this.w / 2, this.y + this.h / 2);
} // GetCenter( )

// --------------------------------------

// Point GetPosition();
Rect.prototype.GetPosition = function() {
	return new Point(this.x, this.y);
} // GetPosition( )

// -------------------------------------

// void SetPosition(Point);
Rect.prototype.SetPosition = function(_pt) {
	this.x = _pt.x;
	this.y = _pt.y;
} // SetPosition( )

// -------------------------------------

// string ToString();
Rect.prototype.ToString = function() {
	return "Rect(" + this.x + ", " + this.y + ", " +
		this.w + ", " + this.h + ")";
} // ToString( )

// -------------------------------------

// alias for ToString method since javascript naming conventions use "toString"
// string toString();
Rect.prototype.toString = Rect.prototype.ToString;



// =============================================================================
//	CLASS:	Circle
// =============================================================================

// Circle Circle(number, number, number);
function Circle(_x, _y, _r) {
	this.x = _x;
	this.y = _y;
	this.r = _r;
} // class Circle

// -----------------------------------------------------------------------------
//	class members
// -----------------------------------------------------------------------------

Circle.prototype.x;
Circle.prototype.y;
Circle.prototype.r;

// -----------------------------------------------------------------------------
//	class functions
// -----------------------------------------------------------------------------

// Circle Clone();
Circle.prototype.Clone = function() {
	return new Circle(this.x, this.y, this.r);
} // Clone( )

// --------------------------------------

// bool Equals(Circle);
Circle.prototype.Equals = function(_cir) {
	if (_cir instanceof Circle) {
		return (
			this.x == _cir.x &&
			this.y == _cir.y &&
			this.r == _cir.r);
	} // if
	return false;
} // Equals( )

// --------------------------------------

// Point GetPosition();
Circle.prototype.GetPosition = function() {
	return new Vector2D(this.x, this.y);
} // GetPosition( )

// -------------------------------------

// void SetPosition(Point);
Circle.prototype.SetPosition = function(_pt) {
	this.x = _pt.x;
	this.y = _pt.y;
} // SetPosition( )

// -------------------------------------

// string ToString();
Circle.prototype.ToString = function() {
	return "Circle(" + this.x + ", " + this.y + ", " + this.r + ")";
} // ToString( )

// -------------------------------------

// alias for ToString method since javascript naming conventions use "toString"
// string toString();
Circle.prototype.toString = Circle.prototype.ToString;

// -------------------------------------



// Public Members
return {
	Circle:Circle,
	Matrix2D:Matrix2D,
	Vector2D:Vector2D,
	Rect:Rect
}; // public members

})();
