

import "./Header.scss";
import { useTranslation } from "react-i18next";

import { Container } from "../../theme";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import Navigation from "../navigaion";


const Header = () => {
	const { t } = useTranslation();
	const navigationObject = [
		{
			navigationAnchorId: "history",
			navigationAnchor: "#history",
			navigationLabel: `01. ${t("History")}`,
			navigationSlotComponet: "history",
		},
		{
			navigationAnchorId: "team",
			navigationAnchor: "#team",
			navigationLabel: `02. ${t("Team")}`,
			navigationSlotComponet: "climb",
		},
	];

	return (
		<>
			<Container className="df aic g1 p1">
				<Navigation />
				<div className="mla">
					<LanguageSelector />
				</div>

			</Container>
		</>
	);
};

export default Header;
