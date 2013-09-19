<?php

// ______________________________________________________________________(timer)
/**
 * A simple timer class with microsecond precision
 */
class timer {

	/* PRIVATE MEMBERS */
	private $t0; // holds the starting time
	private $t1; // holds the last delta time

	public function __construct() {
		$this->t0 = microtime(true);
		$this->t1 = $this->t0;
	} // __construct( void )
	public function start() {
		$this->t0 = microtime(true);
		$this->t1 = $this->t0;
	} // start( void )
	public function reset() {
		$this->start();
	} // reset( void )
	public function getMicroseconds($_decimals) {
		return number_format((microtime(true) - $this->t0)*1000000, $_decimals);
	} // getMicroseconds( int )
	public function getMilliseconds($_decimals) {
		return number_format((microtime(true) - $this->t0)*1000, $_decimals);
	} // getMilliseconds( int )
	public function getSeconds($_decimals) {
		return number_format((microtime(true) - $this->t0), $_decimals);
	} // getSeconds( int )
	public function getMicrosecondsDelta($_decimals) {
		$tOld = $this->t1;
		$this->t1 = microtime(true);
		return number_format(($this->t1 - $tOld)*1000000, $_decimals);
	} // getMicrosecondsDelta( int )
	public function getMillisecondsDelta($_decimals) {
		$tOld = $this->t1;
		$this->t1 = microtime(true);
		return number_format(($this->t1 - $tOld)*1000, $_decimals);
	} // getMillisecondsDelta( int )
	public function getSecondsDelta($_decimals) {
		$tOld = $this->t1;
		$this->t1 = microtime(true);
		return number_format(($this->t1 - $tOld), $_decimals);
	} // getSecondsDelta( int )

} // class cTimer

?>
