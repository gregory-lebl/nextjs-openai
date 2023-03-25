import React from "react";
import { Bars } from "react-loader-spinner";

type LoaderProps = {
	isVisible: boolean;
};

const Loader = ({ isVisible }: LoaderProps) => {
	return (
		<Bars
			height="80"
			width="80"
			color="#6366F1"
			ariaLabel="bars-loading"
			visible={isVisible}
		/>
	);
};

export default Loader;
