import { JSONFilePreset } from 'lowdb/node';
import cookieParser from 'cookie-parser';
import path from 'path';
import express from 'express';
import { auth, data } from './routes/index.js';
const app = express();
const port = 3000;
// Read or create db.json
const defaultData = { users: [], pondok: [] };
export const db = Object.assign(await JSONFilePreset('db.json', defaultData), {
    find
});
function find(search, name, ...children) {
    return this.data[name].find(value => {
        let data = value;
        for (let child of children) {
            if (child in data) {
                // @ts-ignore
                data = data[child];
            }
        }
        return data === search;
    });
}
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(auth);
app.use('/data', data);
// app.use(dashboard)
app.get('/', (req, res) => {
    if (req.user) {
        res.sendFile(path.join(import.meta.dirname, 'views', 'dashboard.html'));
        // res.sendFile(path.join(import.meta.dirname, 'views', 'dashboard', 'build', 'index.html'))
        // res.redirect('/dashboard')
    }
    else {
        res.sendFile(path.join(import.meta.dirname, 'views', 'auth.html'));
        // res.end('Nothing was shown here yet. Please go to /data to see the data.')
    }
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
