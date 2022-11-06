import LoginFeature from "../features/LoginFeature";
import { SearchFeature } from "../features/SearchFeature"
import { useAppSelector } from "../redux/store";
const HomePage = () => {

	const logged_in = useAppSelector(({authentication}) => authentication.logged_in)

	if(!logged_in) {
		return <LoginFeature />
	}
	return <SearchFeature />
}
export default HomePage