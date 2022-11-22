const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');
const { getPagination } = require('../../services/query');

const httpGetAllLaunches = async (req, res) => {
    const { skip, limit } = getPagination(req.query);

    return res.status(200).json(await getAllLaunches(skip, limit));
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

const httpDeleteLaunch = async (req, res) => {
    const id = Number(req.params.id);

    if (!existsLaunchWithId(id))
        res.status(404).json({
            error: 'Launch not found',
        });

    const aborted = await abortLaunchById(id);
    return res.status(200).json(aborted);
};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpDeleteLaunch,
};
