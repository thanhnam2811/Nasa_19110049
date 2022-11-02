const launches = new Map();

let lastestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
    return Array.from(launches.values());
};

const addNewLaunch = (launch) => {
    lastestFlightNumber++;
    launches.set(
        lastestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            flightNumber: lastestFlightNumber,
            customers: ['ZTM', 'NASA'],
        })
    );
};

const existsLaunchWithId = (id) => {
    return launches.has(id);
};

const abortLaunch = (id) => {
    const launch = launches.get(id);

    launch.upcoming = false;
    launch.success = false;

    return launch;
};

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunch,
};
