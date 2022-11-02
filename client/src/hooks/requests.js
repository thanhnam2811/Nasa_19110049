const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
    return await fetch(`${API_URL}/planets`).then((res) => res.json());
}

async function httpGetLaunches() {
    return await fetch(`${API_URL}/launches`).then((res) => res.json());
}

async function httpSubmitLaunch(launch) {
    try {
        const res = await fetch(`${API_URL}/launches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(launch),
        }).then((res) => res.json());
        return {
            ok: true,
            ...res,
        };
    } catch (err) {
        console.log(err);
        return {
            ok: false,
        };
    }
}

async function httpAbortLaunch(id) {
    try {
        const res = await fetch(`${API_URL}/launches/${id}`, {
            method: 'DELETE',
        }).then((res) => res.json());
        return {
            ok: true,
            ...res,
        };
    } catch (err) {
        console.log(err);
        return {
            ok: false,
        };
    }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
