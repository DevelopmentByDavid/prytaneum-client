import { rest } from 'msw';

export default [
    rest.post('/api/townhalls/:townhallId/ratings', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
