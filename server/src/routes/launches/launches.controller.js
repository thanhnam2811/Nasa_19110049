const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunch,
} = require('../../models/launches.model');

const httpGetAllLaunches = (req, res) => {
    return res.status(200).json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
    const launch = req.body;

    if (
        !launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target
    ) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }

    addNewLaunch(launch);

    return res.status(201).json(launch);
};

const httpDeleteLaunch = (req, res) => {
    const id = Number(req.params.id);

    if (!existsLaunchWithId(id))
        res.status(404).json({
            error: 'Launch not found',
        });

    const aborted = abortLaunch(id);
    return res.status(200).json(aborted);
};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpDeleteLaunch,
};