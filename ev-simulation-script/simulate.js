// === CONFIGURATION CONSTANTS ===
const CHARGEPOINTS = 20;              // Total number of chargepoints
const POWER_KW = 11;                  // Power rating per chargepoint in kilowatts
const INTERVALS = 365 * 24 * 4;       // 15-minute intervals in a year (365 days × 24 hrs × 4 intervals per hour)
const ENERGY_PER_KM = 0.18;           // Energy required to drive 1 km, in kWh
const INTERVAL_HOURS = 0.25;          // Each simulation interval is 15 minutes = 0.25 hours

// === T1: Arrival probabilities by hour (in %) ===
const arrivalProbabilities = [
  0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94,   // Midnight to 8am (low arrivals)
  2.83, 2.83, 5.66, 5.66, 5.66, 7.55, 7.55, 7.55,   // Work start hours to late afternoon
  10.38, 10.38, 10.38, 4.72, 4.72, 4.72, 0.94, 0.94 // Evening and night taper off
];

// === T2: Cumulative distribution of EV charging needs (in km) ===
// These represent how far an EV wants to charge. The cumulative threshold ensures 
// a probabilistic mapping from [0, 100] to different charge distances.
const chargingDistribution = [
  { threshold: 34.31, km: 0 },
  { threshold: 39.21, km: 5 },
  { threshold: 49.01, km: 10 },
  { threshold: 60.77, km: 20 },
  { threshold: 69.59, km: 30 },
  { threshold: 81.35, km: 50 },
  { threshold: 92.13, km: 100 },
  { threshold: 97.03, km: 200 },
  { threshold: 99.97, km: 300 }
];

// Returns the hourly probability (0.0 - 1.0) of an EV arriving at this interval
function getArrivalProbability(interval) {
  const hour = Math.floor((interval % 96) / 4); // 96 intervals per day → 4 intervals per hour
  return arrivalProbabilities[hour] / 100;
}

// Translates a random value to a realistic charging need using the cumulative distribution
function getChargingNeedKm() {
  const rand = Math.random() * 100;
  for (let i = 0; i < chargingDistribution.length; i++) {
    if (rand <= chargingDistribution[i].threshold) {
      return chargingDistribution[i].km;
    }
  }
  return 0;
}

// === ChargePoint logic ===
class ChargePoint {
  constructor() {
    this.busyUntil = -1; // Indicates when this chargepoint becomes free again
  }

  isBusy(interval) {
    return interval < this.busyUntil;
  }

  // Attempts to start charging if the chargepoint is free and an EV has arrived
  tryStartCharging(interval, force = 1) {
    if (this.isBusy(interval)) return 0;

    // force = 1 means the EV has already "decided" to charge here
    if (Math.random() < force) {
      const km = getChargingNeedKm(); // How far the EV wants to charge

      if (km === 0) return 0; // Some EVs may just park but not charge

      const energyKWh = km * ENERGY_PER_KM; // Total energy needed
      const durationHrs = energyKWh / POWER_KW; // Charging time in hours = energy ÷ power
      const durationTicks = Math.ceil(durationHrs / INTERVAL_HOURS); // Convert hours to 15-min intervals

      this.busyUntil = interval + durationTicks; // Mark chargepoint as busy for that duration
      return energyKWh; // Energy charged this session
    }

    return 0; // No charging initiated
  }
}

// === Utility: Shuffle an array (Fisher-Yates algorithm) ===
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// === Utility: Rounds a decimal up with a probability matching its fractional part ===
// e.g., probabilisticRound(2.7) will return 3 with 70% probability, 2 with 30%
function probabilisticRound(x) {
  const floor = Math.floor(x);
  return Math.random() < (x - floor) ? floor + 1 : floor;
}

// === Main Simulation Function ===
function simulate() {
  const chargepoints = Array.from({ length: CHARGEPOINTS }, () => new ChargePoint());

  let totalEnergy = 0;       // Total energy consumed by EVs over the year
  let maxActualPower = 0;    // Max simultaneous power draw observed

  for (let interval = 0; interval < INTERVALS; interval++) {
    const probability = getArrivalProbability(interval); // Arrival chance for this hour
    const arrivals = probabilisticRound(CHARGEPOINTS * probability * INTERVAL_HOURS); 
    // Expected number of EV arrivals in this 15-minute window

    const freeChargepoints = chargepoints.filter(cp => !cp.isBusy(interval));
    const selected = shuffle(freeChargepoints).slice(0, arrivals); 
    // Randomly assign EVs to available chargepoints (no queuing logic)

    for (const cp of selected) {
      const energy = cp.tryStartCharging(interval, 1); // Force charging attempt
      totalEnergy += energy;
    }

    // Count active chargepoints for concurrency tracking
    const activeCount = chargepoints.filter(cp => cp.isBusy(interval)).length;
    const currentPower = activeCount * POWER_KW;
    maxActualPower = Math.max(maxActualPower, currentPower);
  }

  const theoreticalMax = CHARGEPOINTS * POWER_KW;
  const concurrencyFactor = maxActualPower / theoreticalMax;

  // === Final Report ===
  console.log("=== Simulation Results ===");
  console.log("Total energy consumed (kWh):", totalEnergy.toFixed(2));
  console.log("Theoretical max power demand (kW):", theoreticalMax);
  console.log("Actual max power demand (kW):", maxActualPower);
  console.log("Concurrency factor:", (concurrencyFactor * 100).toFixed(2) + "%");
}

simulate();
