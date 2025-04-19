# EV Charging Dashboard

The app contains a Dashboard that shows:

- The input parameters to find out power and consumption of EV Charging points over a day/week/month/year
- Charts(lazy loaded) to visualize the data after form submission
- A responsive design that supports Mobile, Tablet and Desktop(Chrome, Firefox, Safari, Edge)
- Bonus Covered: Create a UI to allow creating different types of chargepoints
- Unit test setup for form

# DIRECTORY STRUCTURE

```- src
	- components
		- Button, Loader, IconButton, etc. (shared(storybook) and app components)
	- containers
		- ChargingPointForm
		- DashboardCharts
	- context
	- Icons
		- svg components
	- pages
		- Dasboard
	-tests(unit)
		-ChargePointForm.tsx
	- data
		- dummy data files
```

# Setup

```bash
npm install
npm run dev
```

# Assumptions

- data to be visualized in Charts is dummy. script from Task 1 is not connected to Frontend task
- Storybook components to be extracted out in a separate repo

# Additions

- Playwright and more Unit tests
