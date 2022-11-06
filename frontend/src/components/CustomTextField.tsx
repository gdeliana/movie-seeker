import TextField, {TextFieldProps} from "@mui/material/TextField";
type valueTypes = string | number
interface ICustomTextField<T extends valueTypes>{
	value?: T
	setparentvalue?: (v:T) => void;
}

function CustomTextField <T extends valueTypes>({value, setparentvalue, onChange, ...restProps}:ICustomTextField<T> & TextFieldProps) {
	return <TextField value={value} onChange={e => setparentvalue ? setparentvalue(e.target.value as T) : (onChange && onChange(e))} {...restProps}/>
}
export default CustomTextField