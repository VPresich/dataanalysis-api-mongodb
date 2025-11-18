export function fixEmptyAvatar(req, _res, next) {
  if (req.body?.avatar === '') delete req.body.avatar;
  next();
}
