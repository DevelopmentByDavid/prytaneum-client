import { rest } from 'msw';

export default [
    rest.post('/api/rating/rate-townhall', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
