// This class implements a 1st order Butterworth digital fiter
// with a difference equation described by y[n] = ωcTs ∗ x[n] + e−ωcTs ∗ y[n − 1]
// where: 
// ωc: cutoff frequency in rad/s
// Ts: sampling period
// y[n]: current filtered output
// y[n-1]: previous filtered output
// x[n]: newest sample

class Filter {
    constructor(firstSample, cutOffFrequency, samplingPeriod, debug) {

        this.cutoffFrequency = cutOffFrequency * 2 * Math.PI;
        this.out = firstSample
        this.samplingPeriod = samplingPeriod
        this.debug = debug
    }

    update(newSample) {
        this.out = (this.cutoffFrequency * this.samplingPeriod * newSample) + Math.exp(-this.cutoffFrequency * this.samplingPeriod) * this.out;

        if (this.debug == true) {
            console.log("New sample: " + newSample + "")
            console.log("Sampling Period: " + this.samplingPeriod + "")
            console.log("Current out: " + this.out + "\n")
        }
        return this.out;
    }
}