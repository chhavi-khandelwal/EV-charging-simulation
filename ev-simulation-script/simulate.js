const CHARGEPOINTS = 20;
const POWER_KW = 11;
const INTERVALS = 365 * 24 * 4; // 35040 intervals
const ENERGY_PER_KM = 0.18;
const INTERVAL_HOURS = 0.25; //15 minutes in hrs

// T1: Hourly arrival probabilities (%)
const arrivalProbabilities = [
  0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94,
  2.83, 2.83, 5.66, 5.66, 5.66, 7.55, 7.55, 7.55,
  10.38, 10.38, 10.38, 4.72, 4.72, 4.72, 0.94, 0.94
];

// T2: Cumulative probability distribution for charging needs
const chargingDistribution = [
	{ threshold: 34.31, km: 0 },    // 34.31%
	{ threshold: 39.21, km: 5 },    // 34.31 + 4.90
	{ threshold: 49.01, km: 10 },   // +9.80
	{ threshold: 60.77, km: 20 },   // +11.76
	{ threshold: 69.59, km: 30 },   // +8.82
	{ threshold: 81.35, km: 50 },   // +11.76
	{ threshold: 92.13, km: 100 },  // +10.78
	{ threshold: 97.03, km: 200 },  // +4.90
	{ threshold: 99.97, km: 300 }, 
];

// you're on day 2 and it's the 5th interval of that day (i.e., interval 101), this would return 101 % 96 = 5.
// Groups 4 intervals together 
function getArrivalProbability(interval) {
  const hour = Math.floor((interval % 96) / 4);
  return arrivalProbabilities[hour] / 100;
}

// Translates random chance into a realistic charging need using T2.
function getChargingNeedKm() {
  const rand = Math.random() * 100;
  for (let i = 0; i < chargingDistribution.length; i++) {
    if (rand <= chargingDistribution[i].threshold) {
      return chargingDistribution[i].km;
    }
  }
  return 0; 
}

class ChargePoint {
  constructor() {
    this.busyUntil = -1;
  }

  isBusy(interval) {
    return interval < this.busyUntil;
  }

  tryStartCharging(interval, probability) {

    if (this.isBusy(interval)) return 0;

	//without this, Then every chargepoint would start charging whenever it's free, regardless of whether an EV actually arrives 
    //If probability = 0.0094, So on average, only 0.94% of the time, this condition will be true, and the chargepoint will attempt to start charging.
	if (Math.random() < probability) {
	// Randomly selects how many kilometers of range the EV wants to charge using T2 (charging need distribution).
      const km = getChargingNeedKm();
	//   If the EV just parks but doesn't need charging (e.g. km = 0), nothing is done.
      if (km === 0) return 0;

      const energyKWh = km * ENERGY_PER_KM;
	//   Calculates how long (in hours) it will take to charge that much energy, based on the charger’s power (11 kW).
      const durationHrs = energyKWh / POWER_KW;
      const durationTicks = Math.ceil(durationHrs / INTERVAL_HOURS); //multiply by 4

      this.busyUntil = interval + durationTicks;
      return energyKWh;
    }
	// If no EV arrives,
    return 0;
  }
}

function simulate() {
  const chargepoints = Array.from({ length: CHARGEPOINTS }, () => new ChargePoint());

  let totalEnergy = 0;
  let maxActualPower = 0;

  for (let interval = 0; interval < INTERVALS; interval++) {
    const probability = getArrivalProbability(interval);
    let activeCount = 0;

    for (const cp of chargepoints) {
      const energy = cp.tryStartCharging(interval, probability)/CHARGEPOINTS;
      totalEnergy += energy;
      if (cp.isBusy(interval)) activeCount++;
    }

    const currentPower = activeCount * POWER_KW;
    if (currentPower > maxActualPower) {
      maxActualPower = currentPower;
    }
  }

  const theoreticalMax = CHARGEPOINTS * POWER_KW;
  const concurrencyFactor = maxActualPower / theoreticalMax;

  console.log("=== Simulation Results ===");
  console.log("Total energy consumed (kWh):", totalEnergy.toFixed(2));
  console.log("Theoretical max power demand (kW):", theoreticalMax);
  console.log("Actual max power demand (kW):", maxActualPower);
  console.log("Concurrency factor:", (concurrencyFactor * 100).toFixed(2) + "%");
}

simulate();
