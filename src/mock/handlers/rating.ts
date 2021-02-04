import { rest } from 'msw';

export default [
    rest.put('/api/townhalls/:townhallId/rating', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
