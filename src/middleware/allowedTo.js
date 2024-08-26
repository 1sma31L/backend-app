export default (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.currentuser.role)) {
			return next({
				status: "fail",
				message: "You are not allowed to access this route",
				statusCode: 403,
			});
		}
		next();
	};
};
