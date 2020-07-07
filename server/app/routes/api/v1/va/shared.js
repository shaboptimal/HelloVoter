import { Router } from 'express';

import {
  _400, geoCode
} from '../../../../lib/utils';

async function checkAddress(req, res) {
  if (!req.body.address) {
    return _400(res, "Address not provided");
  }

  let coordinates = await geoCode(req.body.address);
  return res.json({ valid: coordinates !== null });
}

module.exports = Router({mergeParams: true})
.post('/shared/check-address', (req, res) => {
  if (!req.user) return _401(res, 'Permission denied.')
  return checkAddress(req, res);
})
